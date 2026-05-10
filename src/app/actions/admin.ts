'use server';

import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function toggleMarketStatus(leagueId: string, newStatus: 'OPEN' | 'LOCKED') {
  const session = await getServerSession(authOptions);
  if (!session?.user) throw new Error("Unauthorized");
  
  const userId = (session.user as any).id;
  const league = await prisma.league.findUnique({ where: { id: leagueId } });
  
  if (!league) throw new Error("League not found");
  if (league.commissionerId !== userId) throw new Error("Only the Commissioner can perform this action.");
  
  await prisma.league.update({
    where: { id: leagueId },
    data: { tradeStatus: newStatus }
  });
  
  return { success: true };
}

export async function injectScore(leagueId: string, playerId: string, statType: 'goals' | 'assists' | 'manualBonus', amount: number) {
  const session = await getServerSession(authOptions);
  if (!session?.user) throw new Error("Unauthorized");
  
  const userId = (session.user as any).id;
  const league = await prisma.league.findUnique({ where: { id: leagueId } });
  
  if (!league) throw new Error("League not found");
  if (league.commissionerId !== userId) throw new Error("Only the Commissioner can perform this action.");

  // Update PlayerScore
  await prisma.playerScore.upsert({
    where: { leagueId_playerId: { leagueId, playerId } },
    update: { [statType]: { increment: amount }, status: 'Playing Now' },
    create: { leagueId, playerId, [statType]: amount, status: 'Playing Now' }
  });

  // Create Audit Log
  const statName = statType === 'goals' ? 'Goal' : (statType === 'assists' ? 'Assist' : 'Manual Bonus');
  const sign = amount >= 0 ? '+' : '';
  const message = `Commish manually injected ${sign}${amount} ${statName}s to Player ID ${playerId}`;

  await prisma.auditLog.create({
    data: {
      leagueId,
      message
    }
  });

  return { success: true };
}

export async function forceTrade(leagueId: string, managerAId: string, playerAId: string, managerBId: string, playerBId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user) throw new Error("Unauthorized");
  
  const userId = (session.user as any).id;
  const league = await prisma.league.findUnique({ where: { id: leagueId } });
  
  if (!league) throw new Error("League not found");
  if (league.commissionerId !== userId) throw new Error("Only the Commissioner can perform this action.");

  // Execute swap
  const pickA = await prisma.pick.findFirst({ where: { leagueId, managerId: managerAId, playerId: playerAId } });
  const pickB = await prisma.pick.findFirst({ where: { leagueId, managerId: managerBId, playerId: playerBId } });

  if (!pickA || !pickB) throw new Error("Picks not found");

  await prisma.$transaction([
    prisma.pick.update({ where: { id: pickA.id }, data: { managerId: managerBId } }),
    prisma.pick.update({ where: { id: pickB.id }, data: { managerId: managerAId } })
  ]);

  // Create Audit Log
  const message = `Commish executed Forced Trade: Player ${playerAId} traded for Player ${playerBId}`;

  await prisma.auditLog.create({
    data: {
      leagueId,
      message
    }
  });

  return { success: true };
}

import { generateRoundRobinSchedule } from '@/lib/schedule-logic';

export async function generateLeagueSchedule(leagueId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user) throw new Error("Unauthorized");
  
  const userId = (session.user as any).id;
  const league = await prisma.league.findUnique({ 
    where: { id: leagueId },
    include: { managers: true, fixtures: true }
  });
  
  if (!league) throw new Error("League not found");
  if (league.commissionerId !== userId) throw new Error("Only the Commissioner can perform this action.");
  if (league.status !== 'POST_DRAFT') throw new Error("League must be POST_DRAFT to generate schedule.");
  if (league.fixtures.length > 0) throw new Error("Schedule already generated.");

  const managerIds = league.managers.map((m: any) => m.id);
  const schedule = generateRoundRobinSchedule(managerIds);

  // Repeat the cycle 5 times to simulate a longer season
  const fullSeason = [];
  const cycleLength = managerIds.length % 2 === 0 ? managerIds.length - 1 : managerIds.length;
  
  for (let cycle = 0; cycle < 5; cycle++) {
    for (const game of schedule) {
      fullSeason.push({
        leagueId,
        roundNumber: game.round + (cycle * cycleLength),
        teamAId: game.teamA,
        teamBId: game.teamB,
      });
    }
  }

  await prisma.fixture.createMany({
    data: fullSeason
  });

  await prisma.auditLog.create({
    data: {
      leagueId,
      message: `Commish generated the League Schedule (${fullSeason.length} total fixtures).`
    }
  });

  return { success: true };
}

export async function toggleKnockoutWildcard(leagueId: string, activate: boolean) {
  const session = await getServerSession(authOptions);
  if (!session?.user) throw new Error("Unauthorized");

  const userId = (session.user as any).id;
  const league = await prisma.league.findUnique({
    where: { id: leagueId },
    include: { managers: true }
  });

  if (!league) throw new Error("League not found");
  if (league.commissionerId !== userId) throw new Error("Only the Commissioner can perform this action.");

  const newCap = activate ? 15 : 2;
  const message = activate
    ? 'The Knockout Wildcard is active! The waiver cap has been lifted. Rebuild your squads.'
    : 'The Knockout Wildcard has been deactivated. Waiver cap is back to 2 per round.';

  // Update league waiverCap
  await prisma.league.update({
    where: { id: leagueId },
    data: { waiverCap: newCap }
  });

  // Notify ALL managers
  await prisma.notification.createMany({
    data: league.managers.map((m: any) => ({
      leagueId,
      userId: m.id,
      type: activate ? 'WILDCARD' : 'ADMIN',
      message,
    })),
  });

  // Log to Transparency Feed
  await prisma.auditLog.create({
    data: {
      leagueId,
      message: `Commish ${activate ? 'ACTIVATED' : 'DEACTIVATED'} the Knockout Wildcard (waiverCap -> ${newCap}).`
    }
  });

  return { success: true };
}

'use server';

import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function proposeTrade(leagueId: string, targetUserId: string, offeredPlayerId: string, targetPlayerId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user) throw new Error("Unauthorized");
  
  const proposingUserId = (session.user as any).id;
  const proposingUser = await prisma.user.findUnique({ where: { id: proposingUserId } });

  // 1. Create Trade Offer
  const offer = await prisma.tradeOffer.create({
    data: {
      leagueId,
      proposingUserId,
      targetUserId,
      offeredPlayerId,
      targetPlayerId
    }
  });

  // 2. Send Notification
  await prisma.notification.create({
    data: {
      leagueId,
      userId: targetUserId,
      type: 'TRADE_OFFER',
      message: `${proposingUser?.displayName} has proposed an official trade. Check Trade Block in league ${leagueId}.`,
    },
  });

  return offer;
}

export async function declareInterest(leagueId: string, targetUserId: string, targetPlayerId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user) throw new Error("Unauthorized");
  
  const proposingUserId = (session.user as any).id;
  const proposingUser = await prisma.user.findUnique({ where: { id: proposingUserId } });

  // Note: We don't have static player names directly in the DB easily joinable here without importing the data array,
  // but for simplicity the UI can render the details. We just send the standard message.
  
  await prisma.notification.create({
    data: {
      leagueId,
      userId: targetUserId,
      type: 'INTEREST',
      message: `${proposingUser?.displayName} has declared interest in your player. Let's discuss!`
    }
  });

  return { success: true };
}

export async function claimFreeAgent(leagueId: string, playerId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user) throw new Error("Unauthorized");
  
  const managerId = (session.user as any).id;

  const league = await prisma.league.findUnique({ where: { id: leagueId } });
  if (!league) throw new Error("League not found");
  if (league.tradeStatus === 'LOCKED') throw new Error("Market is locked");

  // 1. Calculate the current Matchweek / Round (simplification for testing)
  // For standard play, this might come from a global admin setting. 
  // Let's use league.currentRound just as a placeholder for "Current Matchweek".
  const matchweek = league.currentRound;

  // 2. Check Cap Logic: Max 2 voluntary moves per matchweek
  const recentTransactions = await prisma.transaction.count({
    where: {
      leagueId,
      managerId,
      round: matchweek,
      type: 'CLAIM'
    }
  });

  if (recentTransactions >= league.waiverCap) {
    throw new Error("CAP_REACHED");
  }

  // 3. Process Claim
  // Note: Normally, dropping a player is required if roster is full.
  // This assumes the UI handles ensuring there's an open roster spot, or we just allow it for the prototype.
  await prisma.pick.create({
    data: {
      leagueId,
      managerId,
      playerId,
      round: matchweek,
      pickIndex: 999 // indicator it was a FA claim
    }
  });

  // 4. Log Transaction
  await prisma.transaction.create({
    data: {
      leagueId,
      managerId,
      round: matchweek,
      type: 'CLAIM',
      playerId
    }
  });

  return { success: true };
}

// Additional helper to fetch notifications for the Inbox
export async function getMyNotifications(leagueId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return [];
  
  return await prisma.notification.findMany({
    where: { 
      leagueId, 
      userId: (session.user as any).id 
    },
    orderBy: { createdAt: 'desc' }
  });
}

export async function getLeagueTransactions(leagueId: string) {
  return await prisma.transaction.findMany({
    where: { leagueId }
  });
}

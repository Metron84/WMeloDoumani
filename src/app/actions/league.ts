'use server';

import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

function generateInviteCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function createLeague(data: any) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user || !(session.user as any).id) {
    throw new Error('You must be logged in to create a league.');
  }

  const userId = (session.user as any).id;
  const inviteCode = generateInviteCode();

  const league = await prisma.league.create({
    data: {
      name: data.name,
      inviteCode,
      logoUrl: data.logoUrl || null,
      goalPts: parseFloat(data.goalPts),
      assistPts: parseFloat(data.assistPts),
      ratingTier1Pts: parseFloat(data.ratingTier1Pts),
      ratingTier2Pts: parseFloat(data.ratingTier2Pts),
      maxTeams: parseInt(data.maxTeams),
      draftType: data.draftType,
      rosterSize: parseInt(data.rosterSize),
      commissionerId: userId,
      managers: {
        connect: { id: userId }
      }
    }
  });
  
  // Update user's leagueId
  await prisma.user.update({
    where: { id: userId },
    data: { leagueId: league.id }
  });

  return league;
}

export async function getLeagueById(id: string) {
  const league = await prisma.league.findUnique({
    where: { id },
    include: {
      managers: { select: { id: true, displayName: true } },
      picks: true,
      playerScores: true,
      auditLogs: { orderBy: { createdAt: 'desc' }, take: 50 }
    }
  });
  return league;
}

export async function updateLeagueStatus(id: string, status: string) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user || !(session.user as any).id) {
    throw new Error('Unauthorized');
  }

  const league = await prisma.league.findUnique({ where: { id } });
  
  if (league?.commissionerId !== (session.user as any).id) {
    throw new Error('Only the commissioner can update the status');
  }

  return await prisma.league.update({
    where: { id },
    data: { status }
  });
}

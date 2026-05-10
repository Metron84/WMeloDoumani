'use server';

import { prisma } from './prisma';

interface CreateLeaguePayload {
  leagueName: string;
  draftType: string;
  teamCount: number;
  rosterSize: number;
  userId: string;
}

export async function createNewLeague(payload: CreateLeaguePayload) {
  // Generate a random 6-character uppercase alphanumeric string for the inviteCode
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let inviteCode = '';
  for (let i = 0; i < 6; i++) {
    inviteCode += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  // Save this data to the database using Prisma.
  // We use our existing schema: `commissionerId` acts as isCommish, 
  // and connecting to `managers` acts as the members array.
  const league = await prisma.league.create({
    data: {
      name: payload.leagueName,
      draftType: payload.draftType,
      maxTeams: payload.teamCount,
      rosterSize: payload.rosterSize,
      inviteCode: inviteCode,
      commissionerId: payload.userId, // Sets them as Commissioner (isCommish: true)
      managers: {
        connect: { id: payload.userId } // Adds them to the members array
      }
    }
  });

  // Automatically update the user's leagueId reference as well
  await prisma.user.update({
    where: { id: payload.userId },
    data: { leagueId: league.id }
  });

  return league.id;
}

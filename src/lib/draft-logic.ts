'use server';

import { prisma } from './prisma';

export async function draftPlayer(leagueId: string, playerId: string, managerId: string) {
  const league = await prisma.league.findUnique({
    where: { id: leagueId }
  });

  if (!league) throw new Error('League not found');

  // 1. Add draft record to 'picks' table
  const pick = await prisma.pick.create({
    data: {
      leagueId,
      playerId,
      managerId,
      round: league.currentRound,
      pickIndex: league.currentPickIndex
    }
  });

  // Note: Removing the player from the global availablePlayers pool is handled 
  // dynamically by fetching all 'picks' for this league and filtering them out 
  // of the static player list on the client/server side.

  // 2. Increment currentPickIndex
  let nextPickIndex = league.currentPickIndex + 1;
  let nextRound = league.currentRound;

  if (nextPickIndex >= league.maxTeams) {
    nextPickIndex = 0;
    nextRound += 1;
  }

  // 3. Update the database
  await prisma.league.update({
    where: { id: leagueId },
    data: {
      currentPickIndex: nextPickIndex,
      currentRound: nextRound,
      // Automatically end the draft if we exceed the roster size
      status: nextRound > league.rosterSize ? 'POST_DRAFT' : league.status
    }
  });

  return pick;
}

'use server';

import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function getDraftManagers() {
  const session = await getServerSession(authOptions);
  
  // If user is not logged in or not in a league, they can't see the real draft board
  if (!session?.user || !(session.user as any).leagueId) {
    return [];
  }

  const league = await prisma.league.findUnique({
    where: { id: (session.user as any).leagueId },
    include: {
      managers: {
        select: { displayName: true }
      }
    }
  });

  if (!league) return [];
  
  return league.managers.map(m => m.displayName);
}

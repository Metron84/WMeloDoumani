'use server';

import { worldCupPlayers } from '@/lib/data/world-cup-players';

/** Player roster is static (see `src/data/players.ts`); no Player table in schema. */
export async function executeSeed() {
  try {
    return { success: true, count: worldCupPlayers.length };
  } catch {
    return { success: false, error: 'Failed to verify roster data' };
  }
}

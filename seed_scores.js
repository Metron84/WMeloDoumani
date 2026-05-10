const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  const league = await prisma.league.findFirst();
  if (!league) return console.log('No league found');

  // Find picks in this league
  const picks = await prisma.pick.findMany({ where: { leagueId: league.id } });
  if (picks.length === 0) return console.log('No picks found');

  // Let's create a score for the first drafted player
  const firstPick = picks[0];
  
  await prisma.playerScore.upsert({
    where: { leagueId_playerId: { leagueId: league.id, playerId: firstPick.playerId } },
    update: { goals: 2, assists: 1, rating: 8.5, status: 'Playing Now' },
    create: { leagueId: league.id, playerId: firstPick.playerId, goals: 2, assists: 1, rating: 8.5, status: 'Playing Now' }
  });

  console.log('Seeded player score for player: ' + firstPick.playerId);
}

run().catch(console.error).finally(() => prisma.$disconnect());

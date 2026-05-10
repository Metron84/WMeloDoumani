const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  const u1 = await prisma.user.create({ data: { email: 'commish_test@test.com', passwordHash: 'pw', displayName: 'Commish', teamName: 'T1' } });
  const u2 = await prisma.user.create({ data: { email: 'user2_test@test.com', passwordHash: 'pw', displayName: 'User2', teamName: 'T2' } });

  const league = await prisma.league.create({
    data: {
      name: '2-Player Draft',
      inviteCode: 'TEST22',
      status: 'DRAFTING',
      maxTeams: 2,
      rosterSize: 3,
      commissionerId: u1.id,
      managers: { connect: [{ id: u1.id }, { id: u2.id }] }
    }
  });

  console.log(`URL: http://localhost:3101/league/${league.id}/draft`);
}

run()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());

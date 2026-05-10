export function generateRoundRobinSchedule(teamIds: string[]): { round: number, teamA: string, teamB: string }[] {
  const schedule = [];
  const teams = [...teamIds];
  
  if (teams.length % 2 !== 0) {
    teams.push('BYE'); // Dummy team for odd number
  }
  
  const numRounds = teams.length - 1;
  const halfSize = teams.length / 2;

  for (let round = 0; round < numRounds; round++) {
    for (let i = 0; i < halfSize; i++) {
      const teamA = teams[i];
      const teamB = teams[teams.length - 1 - i];
      
      if (teamA !== 'BYE' && teamB !== 'BYE') {
        schedule.push({
          round: round + 1,
          teamA,
          teamB
        });
      }
    }
    // Rotate the array, keeping the first element fixed
    const lastElement = teams.pop()!;
    teams.splice(1, 0, lastElement);
  }

  return schedule;
}

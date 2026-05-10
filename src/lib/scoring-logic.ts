export interface ScoringRules {
  goalPts: number;
  assistPts: number;
  ratingTier1Pts: number; // For rating 7.0 - 7.4
  ratingTier2Pts: number; // For rating 7.5+
}

export interface PlayerStats {
  goals: number;
  assists: number;
  rating: number;
  manualBonus: number;
}

export function calculatePoints(stats: PlayerStats, rules: ScoringRules): number {
  let total = 0;
  
  // Goals
  total += stats.goals * rules.goalPts;
  
  // Assists
  total += stats.assists * rules.assistPts;
  
  // Rating Bonuses
  if (stats.rating >= 7.5) {
    total += rules.ratingTier2Pts;
  } else if (stats.rating >= 7.0) {
    total += rules.ratingTier1Pts;
  }
  
  // Manual Bonus / Penalty
  total += stats.manualBonus;
  
  // Float precision fix (avoid 3.00000000004)
  return Math.round(total * 10) / 10;
}

export function resolveMatchupTie(teamAStats: any[], teamBStats: any[]): 'A' | 'B' | 'TIE' {
  // Priority 1: Total actual goals
  const goalsA = teamAStats.reduce((sum, s) => sum + (s.goals || 0), 0);
  const goalsB = teamBStats.reduce((sum, s) => sum + (s.goals || 0), 0);
  
  if (goalsA > goalsB) return 'A';
  if (goalsB > goalsA) return 'B';

  // Priority 2: Average Rating
  const avgA = teamAStats.length > 0 ? teamAStats.reduce((sum, s) => sum + (s.rating || 0), 0) / teamAStats.length : 0;
  const avgB = teamBStats.length > 0 ? teamBStats.reduce((sum, s) => sum + (s.rating || 0), 0) / teamBStats.length : 0;

  if (avgA > avgB) return 'A';
  if (avgB > avgA) return 'B';

  return 'TIE';
}

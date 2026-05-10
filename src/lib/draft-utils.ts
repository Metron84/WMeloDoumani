/**
 * Calculates the manager index who should pick right now (snake draft).
 */
export function getActivePickerIndex(
  currentPickIndex: number,
  currentRound: number,
  teamCount: number
): number {
  if (currentRound % 2 !== 0) {
    return currentPickIndex;
  }
  return teamCount - 1 - currentPickIndex;
}

export const queryKeys = {
  leaderboard: (leaderboardId: string, limit: number) => ['leaderboard', leaderboardId, limit] as const,
  health: ['health'] as const
};

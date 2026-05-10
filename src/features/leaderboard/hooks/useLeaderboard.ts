import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { appConfig } from '@/app/config';
import { getLeaderboard } from '@/features/leaderboard/api/leaderboardApi';
import { queryKeys } from '@/features/leaderboard/api/queryKeys';

export function useLeaderboard(leaderboardId: string, limit: number) {
  return useQuery({
    queryKey: queryKeys.leaderboard(leaderboardId, limit),
    queryFn: ({ signal }) => getLeaderboard({ leaderboardId, limit, signal }),
    placeholderData: keepPreviousData,
    refetchInterval: () => (document.visibilityState === 'visible' ? appConfig.leaderboardRefreshMs : false),
    refetchIntervalInBackground: false
  });
}

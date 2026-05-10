import { useQuery } from '@tanstack/react-query';
import { appConfig } from '@/app/config';
import { getHealth } from '@/features/leaderboard/api/leaderboardApi';
import { queryKeys } from '@/features/leaderboard/api/queryKeys';

export function useHealth() {
  return useQuery({
    queryKey: queryKeys.health,
    queryFn: ({ signal }) => getHealth(signal),
    refetchInterval: () => (document.visibilityState === 'visible' ? appConfig.healthRefreshMs : false),
    refetchIntervalInBackground: false,
    retry: 1
  });
}

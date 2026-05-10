import { useMutation, useQueryClient } from '@tanstack/react-query';
import { publishScoreEvent } from '@/features/leaderboard/api/leaderboardApi';
import { queryKeys } from '@/features/leaderboard/api/queryKeys';
import type { PublishScoreEventRequest } from '@/features/leaderboard/model/schemas';

export function usePublishScoreEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: PublishScoreEventRequest) => publishScoreEvent(request),
    onSuccess: async (_response, request) => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.leaderboard(request.leaderboardId ?? 'global', 100),
        exact: false
      });
    }
  });
}

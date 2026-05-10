import { appConfig } from '@/app/config';
import { requestJson } from '@/shared/api/httpClient';
import {
  actuatorHealthSchema,
  leaderboardResponseSchema,
  publishScoreEventRequestSchema,
  publishScoreEventResponseSchema,
  type ActuatorHealth,
  type LeaderboardResponse,
  type PublishScoreEventRequest,
  type PublishScoreEventResponse
} from '@/features/leaderboard/model/schemas';

export async function getLeaderboard(input: {
  leaderboardId: string;
  limit: number;
  signal?: AbortSignal;
}): Promise<LeaderboardResponse> {
  return requestJson({
    path: '/leaderboard',
    query: {
      leaderboardId: input.leaderboardId,
      limit: input.limit
    },
    schema: leaderboardResponseSchema,
    ...(input.signal ? { signal: input.signal } : {}),
    timeoutMs: appConfig.requestTimeoutMs
  });
}

export async function publishScoreEvent(input: PublishScoreEventRequest): Promise<PublishScoreEventResponse> {
  const request = publishScoreEventRequestSchema.parse(input);
  return requestJson({
    path: '/leaderboard/events',
    method: 'POST',
    body: request,
    schema: publishScoreEventResponseSchema,
    timeoutMs: appConfig.requestTimeoutMs
  });
}

export async function getHealth(signal?: AbortSignal): Promise<ActuatorHealth> {
  return requestJson({
    path: '/actuator/health',
    schema: actuatorHealthSchema,
    ...(signal ? { signal } : {}),
    timeoutMs: Math.min(appConfig.requestTimeoutMs, 3_000)
  });
}

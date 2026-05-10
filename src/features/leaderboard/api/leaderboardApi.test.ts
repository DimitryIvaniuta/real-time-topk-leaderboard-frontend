import { describe, expect, it, vi } from 'vitest';
import { getLeaderboard } from '@/features/leaderboard/api/leaderboardApi';

function jsonResponse(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'content-type': 'application/json' }
  });
}

describe('leaderboardApi', () => {
  it('loads and validates leaderboard response', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      jsonResponse({
        leaderboardId: 'global',
        limit: 1,
        generatedAt: '2026-05-09T10:00:00Z',
        items: [{ rank: 1, itemId: 'player-1', displayName: 'Player One', score: 50 }]
      })
    );

    const response = await getLeaderboard({ leaderboardId: 'global', limit: 1 });

    expect(response.items[0]?.itemId).toBe('player-1');
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/api/leaderboard?leaderboardId=global&limit=1'), expect.any(Object));
  });

  it('rejects malformed backend response', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(jsonResponse({ invalid: true }));

    await expect(getLeaderboard({ leaderboardId: 'global', limit: 1 })).rejects.toThrow('contract validation failed');
  });
});

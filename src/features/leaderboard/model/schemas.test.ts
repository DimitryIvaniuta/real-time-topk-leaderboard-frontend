import { describe, expect, it } from 'vitest';
import { publishScoreEventRequestSchema } from '@/features/leaderboard/model/schemas';

describe('publishScoreEventRequestSchema', () => {
  it('accepts delta events', () => {
    expect(
      publishScoreEventRequestSchema.parse({
        leaderboardId: 'global',
        itemId: 'player-1',
        delta: 10
      })
    ).toMatchObject({ itemId: 'player-1', delta: 10 });
  });

  it('rejects requests with both delta and absolute score', () => {
    expect(() =>
      publishScoreEventRequestSchema.parse({
        itemId: 'player-1',
        delta: 10,
        absoluteScore: 100
      })
    ).toThrow();
  });
});

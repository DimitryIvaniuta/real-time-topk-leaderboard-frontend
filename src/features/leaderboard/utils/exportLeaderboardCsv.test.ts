import { describe, expect, it } from 'vitest';
import { buildLeaderboardCsv } from '@/features/leaderboard/utils/exportLeaderboardCsv';

const baseResponse = {
  leaderboardId: 'global',
  limit: 2,
  generatedAt: '2026-05-09T10:00:00Z',
  items: [
    { rank: 1, itemId: 'player-1', displayName: 'Alice', score: 100 },
    { rank: 2, itemId: '=cmd', displayName: '+unsafe', score: 90 }
  ]
};

describe('buildLeaderboardCsv', () => {
  it('exports leaderboard rows and protects text cells from spreadsheet formula injection', () => {
    const csv = buildLeaderboardCsv(baseResponse);

    expect(csv).toContain('"rank","itemId","displayName","score","leaderboardId","generatedAt"');
    expect(csv).toContain('"1","player-1","Alice","100","global","2026-05-09T10:00:00Z"');
    expect(csv).toContain('"\'=cmd","\'+unsafe","90"');
  });
});

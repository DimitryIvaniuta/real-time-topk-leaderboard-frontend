import type { LeaderboardResponse } from '@/features/leaderboard/model/schemas';
import { downloadLeaderboardCsv } from '@/features/leaderboard/utils/exportLeaderboardCsv';

export function LeaderboardExportButton({ data }: { data: LeaderboardResponse | undefined }) {
  return (
    <button
      type="button"
      className="button button--secondary"
      disabled={!data || data.items.length === 0}
      onClick={() => {
        if (data) {
          downloadLeaderboardCsv(data);
        }
      }}
    >
      Export CSV
    </button>
  );
}

import type { LeaderboardEntry } from '@/features/leaderboard/model/schemas';
import { EmptyState } from '@/shared/components/EmptyState';
import { scoreFormatter } from '@/shared/utils/formatting';

export function LeaderboardTable({ items }: { items: LeaderboardEntry[] }) {
  if (items.length === 0) {
    return <EmptyState title="No scores yet" description="Publish a score event to populate this leaderboard." />;
  }

  return (
    <div className="table-card">
      <table aria-label="Leaderboard entries">
        <thead>
          <tr>
            <th scope="col">Rank</th>
            <th scope="col">Player / Item</th>
            <th scope="col">Identifier</th>
            <th scope="col" className="numeric">Score</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={`${item.rank}-${item.itemId}`}>
              <td>
                <span className="rank-badge">#{item.rank}</span>
              </td>
              <td>{item.displayName ?? item.itemId}</td>
              <td className="muted mono">{item.itemId}</td>
              <td className="numeric strong">{scoreFormatter.format(item.score)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

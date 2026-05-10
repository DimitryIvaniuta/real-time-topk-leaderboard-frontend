import { useState } from 'react';
import { LeaderboardControls } from '@/features/leaderboard/components/LeaderboardControls';
import { LeaderboardExportButton } from '@/features/leaderboard/components/LeaderboardExportButton';
import { LeaderboardTable } from '@/features/leaderboard/components/LeaderboardTable';
import { useLeaderboard } from '@/features/leaderboard/hooks/useLeaderboard';
import { ErrorBanner } from '@/shared/components/ErrorBanner';
import { LoadingBlock } from '@/shared/components/LoadingBlock';
import { PageHeader } from '@/shared/components/PageHeader';
import { calculateAgeSeconds, formatDateTime } from '@/shared/utils/formatting';

export function LeaderboardPage() {
  const [filters, setFilters] = useState({ leaderboardId: 'global', limit: 100 });
  const leaderboard = useLeaderboard(filters.leaderboardId, filters.limit);
  const ageSeconds = calculateAgeSeconds(leaderboard.data?.generatedAt);

  return (
    <div className="page-stack">
      <PageHeader
        title="Live Top-K leaderboard"
        description="Query a leaderboard by id and limit. Results are refreshed automatically for near real-time operations."
      />
      <LeaderboardControls leaderboardId={filters.leaderboardId} limit={filters.limit} onSubmit={setFilters} />
      <section className="panel">
        <div className="panel__header">
          <div>
            <h2>{filters.leaderboardId} leaderboard</h2>
            <p>
              Limit {filters.limit} · Last generated at {formatDateTime(leaderboard.data?.generatedAt)}
              {ageSeconds !== null ? ` · data age ${ageSeconds}s` : ''}
            </p>
          </div>
          <div className="panel__actions">
            {leaderboard.isFetching ? <span className="status-pill">Refreshing</span> : null}
            <LeaderboardExportButton data={leaderboard.data} />
          </div>
        </div>
        {leaderboard.isLoading ? <LoadingBlock /> : null}
        {leaderboard.error ? <ErrorBanner error={leaderboard.error} /> : null}
        {leaderboard.data ? <LeaderboardTable items={leaderboard.data.items} /> : null}
      </section>
    </div>
  );
}

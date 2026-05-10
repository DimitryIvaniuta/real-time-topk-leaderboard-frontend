import { Link } from 'react-router';
import { LeaderboardTable } from '@/features/leaderboard/components/LeaderboardTable';
import { HealthPanel } from '@/features/leaderboard/components/HealthPanel';
import { useLeaderboard } from '@/features/leaderboard/hooks/useLeaderboard';
import { ErrorBanner } from '@/shared/components/ErrorBanner';
import { LoadingBlock } from '@/shared/components/LoadingBlock';
import { PageHeader } from '@/shared/components/PageHeader';
import { StatCard } from '@/shared/components/StatCard';

export function DashboardPage() {
  const leaderboard = useLeaderboard('global', 5);

  return (
    <div className="page-stack">
      <PageHeader
        title="Leaderboard dashboard"
        description="Near real-time banking-grade view over Kafka score events, Redis Top-K reads and PostgreSQL snapshots."
        actions={<Link className="button button--secondary" to="/publish-event">Publish test event</Link>}
      />
      <section className="stats-grid" aria-label="System capabilities">
        <StatCard label="Read path" value="Redis ZSET" hint="Fast Top-K ordered read model" />
        <StatCard label="Durability" value="PostgreSQL" hint="Idempotent snapshot source of truth" />
        <StatCard label="Ingestion" value="Kafka" hint="High-rate event stream" />
        <StatCard label="Target p95" value="< 50ms" hint="Backend acceptance target" />
      </section>
      <div className="content-grid content-grid--two">
        <section className="panel">
          <div className="panel__header">
            <div>
              <h2>Top 5 global players</h2>
              <p>Automatically refreshed from the backend.</p>
            </div>
            <Link to="/leaderboard">Open full table</Link>
          </div>
          {leaderboard.isLoading ? <LoadingBlock /> : null}
          {leaderboard.error ? <ErrorBanner error={leaderboard.error} /> : null}
          {leaderboard.data ? <LeaderboardTable items={leaderboard.data.items} /> : null}
        </section>
        <section className="panel">
          <div className="panel__header">
            <div>
              <h2>Operational status</h2>
              <p>Current backend health probe.</p>
            </div>
          </div>
          <HealthPanel />
        </section>
      </div>
    </div>
  );
}

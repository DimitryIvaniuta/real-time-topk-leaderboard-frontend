import { Link } from 'react-router';
import { appConfig } from '@/app/config';
import { useHealth } from '@/features/leaderboard/hooks/useHealth';

/** Top banking-style header showing product identity and operational status. */
export function Header() {
  const health = useHealth();
  const healthy = health.data?.status === 'UP';

  return (
    <header className="topbar">
      <Link to="/dashboard" className="brand" aria-label="Open dashboard">
        <span className="brand__mark">TK</span>
        <span>
          <strong>Top-K Leaderboard</strong>
          <small>Banking Operations Console</small>
        </span>
      </Link>
      <div className="topbar__actions">
        <span className={`status-pill ${healthy ? 'status-pill--ok' : 'status-pill--warn'}`}>
          {healthy ? 'Backend UP' : health.isLoading ? 'Checking backend' : 'Backend attention'}
        </span>
        <span className="topbar__environment">{appConfig.environmentName}</span>
      </div>
    </header>
  );
}

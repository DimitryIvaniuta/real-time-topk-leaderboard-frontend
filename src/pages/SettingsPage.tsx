import { appConfig } from '@/app/config';
import { PageHeader } from '@/shared/components/PageHeader';

export function SettingsPage() {
  return (
    <div className="page-stack">
      <PageHeader
        title="Settings"
        description="Read-only frontend runtime settings. In production, override /config.js without rebuilding the bundle."
      />
      <section className="panel">
        <dl className="settings-list">
          <div>
            <dt>Environment</dt>
            <dd>{appConfig.environmentName}</dd>
          </div>
          <div>
            <dt>API base URL</dt>
            <dd>{appConfig.apiBaseUrl || 'same-origin proxy'}</dd>
          </div>
          <div>
            <dt>API path prefix</dt>
            <dd>{appConfig.apiPathPrefix || 'none'}</dd>
          </div>
          <div>
            <dt>Leaderboard refresh interval</dt>
            <dd>{appConfig.leaderboardRefreshMs} ms</dd>
          </div>
          <div>
            <dt>Health refresh interval</dt>
            <dd>{appConfig.healthRefreshMs} ms</dd>
          </div>
          <div>
            <dt>Request timeout</dt>
            <dd>{appConfig.requestTimeoutMs} ms</dd>
          </div>
          <div>
            <dt>Max client-side limit</dt>
            <dd>{appConfig.maxLeaderboardLimit}</dd>
          </div>
        </dl>
      </section>
    </div>
  );
}

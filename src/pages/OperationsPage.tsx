import { HealthPanel } from '@/features/leaderboard/components/HealthPanel';
import { PageHeader } from '@/shared/components/PageHeader';

export function OperationsPage() {
  return (
    <div className="page-stack">
      <PageHeader
        title="Operations"
        description="Runtime checks and links used by support teams during incident triage."
      />
      <div className="content-grid content-grid--two">
        <section className="panel">
          <div className="panel__header">
            <div>
              <h2>Health probe</h2>
              <p>Reads `/actuator/health` through the frontend proxy.</p>
            </div>
          </div>
          <HealthPanel />
        </section>
        <section className="panel">
          <div className="panel__header">
            <div>
              <h2>Metrics</h2>
              <p>Prometheus endpoint exposed by the backend.</p>
            </div>
          </div>
          <a className="button button--secondary" href="/actuator/prometheus" target="_blank" rel="noreferrer">
            Open Prometheus metrics
          </a>
        </section>
      </div>
    </div>
  );
}

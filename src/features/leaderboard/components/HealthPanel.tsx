import { useHealth } from '@/features/leaderboard/hooks/useHealth';
import { ErrorBanner } from '@/shared/components/ErrorBanner';
import { LoadingBlock } from '@/shared/components/LoadingBlock';

export function HealthPanel() {
  const health = useHealth();

  if (health.isLoading) {
    return <LoadingBlock label="Checking backend health..." />;
  }

  if (health.error) {
    return <ErrorBanner error={health.error} />;
  }

  return (
    <article className="health-card">
      <span>Backend health</span>
      <strong>{health.data?.status ?? 'UNKNOWN'}</strong>
      <p>Actuator health is polled every 10 seconds.</p>
    </article>
  );
}

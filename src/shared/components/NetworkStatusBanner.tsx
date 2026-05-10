import { useOnlineStatus } from '@/shared/hooks/useOnlineStatus';

/** Shows a visible warning when the browser is offline and polling/mutations cannot reach the backend. */
export function NetworkStatusBanner() {
  const online = useOnlineStatus();

  if (online) {
    return null;
  }

  return (
    <div className="network-banner" role="status">
      Browser is offline. Cached leaderboard data may be stale until connectivity returns.
    </div>
  );
}

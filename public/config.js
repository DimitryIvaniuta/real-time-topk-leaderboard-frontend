/*
 * Runtime deployment configuration.
 * Override this file in Docker/Kubernetes without rebuilding the React bundle.
 */
window.__LEADERBOARD_CONFIG__ = {
  apiBaseUrl: '',
  apiPathPrefix: '/api',
  leaderboardRefreshMs: 2000,
  healthRefreshMs: 10000,
  requestTimeoutMs: 8000,
  maxLeaderboardLimit: 500,
  environmentName: 'local'
};

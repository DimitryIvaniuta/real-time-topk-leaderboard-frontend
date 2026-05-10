# Frontend production upgrades

## What changed

- Added `/config.js` runtime configuration so Docker/Kubernetes deployments can change backend URLs and polling intervals without rebuilding the React bundle.
- Improved the native `fetch` client with cancellation cleanup, `Accept: application/json`, request timeouts from config, RFC7807-style error message extraction and backend correlation/request id display.
- Added client-generated score event ids by default. This improves backend idempotency and makes retries safer for operators.
- Added explicit form and filter validation for leaderboard ids, item ids and numeric scores.
- Added CSV export for leaderboard results with spreadsheet formula-injection protection.
- Added offline status UX so operators know when polling/mutations cannot reach the backend.
- Added a React error boundary to avoid a blank screen after unexpected rendering failures.
- Tuned polling to stop while the browser tab is hidden and to reuse previous data during refreshes.
- Hardened nginx security headers and cache behavior for `index.html`, `/config.js` and immutable assets.

## Deployment notes

For immutable image deployments, mount or replace `/usr/share/nginx/html/config.js` with environment-specific values:

```js
window.__LEADERBOARD_CONFIG__ = {
  apiBaseUrl: '',
  apiPathPrefix: '/api',
  leaderboardRefreshMs: 2000,
  healthRefreshMs: 10000,
  requestTimeoutMs: 8000,
  maxLeaderboardLimit: 500,
  environmentName: 'prod'
};
```

Use same-origin `/api` proxy for browser security by default. Use an absolute `apiBaseUrl` only when the backend CORS policy is intentionally configured for this frontend origin.

## Security decisions

- No `dangerouslySetInnerHTML`.
- No client token persistence.
- Small dependency surface; native `fetch` stays instead of adding Axios.
- Zod validates both outgoing score events and incoming backend responses.
- CSV export escapes values beginning with `=`, `+`, `-`, `@`, tab or carriage return.
- CSP, frame, MIME-sniffing, referrer and permissions headers are enforced by nginx.

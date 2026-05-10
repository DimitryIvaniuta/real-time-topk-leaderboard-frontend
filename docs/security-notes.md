# Security notes

## Client-side security

- The UI never uses `dangerouslySetInnerHTML`.
- Backend responses are validated with Zod before rendering.
- Score-event requests are validated before network submission.
- Native `fetch` is used instead of a larger HTTP dependency.
- Requests use explicit timeouts and support cancellation through TanStack Query abort signals.
- No access tokens or refresh tokens are stored in localStorage/sessionStorage.
- Validation messages are rendered as text, not HTML.
- CSV export escapes spreadsheet formula prefixes (`=`, `+`, `-`, `@`, tab, carriage return).

## Runtime configuration

- `/config.js` is external to the hashed JS bundle and should be served with `Cache-Control: no-store`.
- Use same-origin `/api` proxy by default.
- Use absolute `apiBaseUrl` only when backend CORS is intentionally configured for this frontend origin.
- Invalid runtime URLs are ignored by the config loader.

## Nginx headers

The production nginx config sets:

- `Content-Security-Policy`
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: no-referrer`
- `Permissions-Policy`
- `Cross-Origin-Opener-Policy`
- `Cross-Origin-Resource-Policy`
- `X-Permitted-Cross-Domain-Policies: none`

## Operational hardening

- React error boundary prevents a blank console after unexpected UI errors.
- Offline banner informs operators when polling/mutations cannot reach the backend.
- Polling pauses in background tabs to reduce backend load.
- Previous leaderboard data is kept during refreshes to avoid flicker during transient backend latency.

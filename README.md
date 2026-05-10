# Real-Time Top-K Leaderboard Frontend

Professional banking-style React console for the `real-time-topk-leaderboard-service` backend.

## Repository

**Name:** `real-time-topk-leaderboard-frontend`

**Description:** React 19.2 + TypeScript banking operations console for a real-time Redis/Kafka/PostgreSQL Top-K Leaderboard service, with live polling, safe score-event publishing, runtime deployment config, CSV export, validation, tests, Docker and CI.

## Technology choice

- React `19.2.6`
- TypeScript `6.0.3`
- Vite `8.0.11`
- TanStack Query `5.100.9` for server-state polling, cancellation and mutations
- React Router `7.15.0`
- Zod `4.4.3` for runtime API validation
- Native `fetch` instead of Axios to reduce dependency and supply-chain surface
- Vitest + Testing Library for unit/component tests
- Playwright for essential E2E tests

## Backend endpoints used

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/leaderboard?leaderboardId=global&limit=100` | Read Top-K leaderboard |
| `POST` | `/leaderboard/events` | Publish local score event to Kafka |
| `GET` | `/actuator/health` | Operational health |
| `GET` | `/actuator/prometheus` | Metrics shortcut |

In dev mode Vite proxies `/api/*` to the backend and strips `/api`, so the frontend calls `/api/leaderboard` and `/api/leaderboard/events`.

## Production-grade updates included

- Runtime `/config.js` deployment configuration.
- Safer native `fetch` client with timeout, cancellation cleanup, request-id aware errors and response contract validation.
- Client-generated event ids for safer backend idempotency.
- CSV export with formula-injection protection.
- Offline status banner and React error boundary.
- Tab-aware polling that stops in background tabs and preserves previous data during refreshes.
- Hardened nginx headers, no-store config, no-store SPA shell and immutable static assets.
- Extra tests for CSV export and validation-sensitive flows.

## Run locally

```bash
npm ci
cp .env.example .env
npm run dev
```

Backend should run on `http://localhost:8080`.

Open:

```text
http://localhost:5173
```

## Validate

```bash
npm run validate
npm run e2e
```

## Runtime configuration

The bundle loads `/config.js` before React starts. This lets operations change environment values without rebuilding the image:

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

Vite environment variables are fallback values only.

## Production Docker

```bash
docker build -t real-time-topk-leaderboard-frontend .
docker run --rm -p 8088:80 real-time-topk-leaderboard-frontend
```

In a full Docker Compose network, the nginx proxy expects the backend service DNS name `leaderboard-api`.

To override runtime config, mount a replacement file:

```bash
docker run --rm -p 8088:80 \
  -v "$PWD/public/config.js:/usr/share/nginx/html/config.js:ro" \
  real-time-topk-leaderboard-frontend
```

## Security notes

- No `dangerouslySetInnerHTML`.
- Runtime response validation with Zod before rendering backend data.
- Client-side request validation before publishing score events.
- Native `fetch` with timeout and JSON content-type checks.
- No tokens are stored in localStorage/sessionStorage.
- CSV export escapes spreadsheet formulas.
- Production nginx adds CSP, frame, content-type, referrer, opener/resource and permissions headers.
- Dependency set is intentionally small.

## Main UX flows

1. Dashboard: overview cards, Top 5 preview, backend health.
2. Leaderboard: live Top-K table with leaderboard id and limit controls, freshness metadata and CSV export.
3. Publish Event: validates and submits delta or absolute score events with generated idempotency ids.
4. Operations: backend health and metrics quick links.
5. Settings: API base URL, proxy prefix, polling and timeout configuration visibility.

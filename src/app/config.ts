const DEFAULT_REFRESH_MS = 2_000;
const DEFAULT_HEALTH_REFRESH_MS = 10_000;
const DEFAULT_REQUEST_TIMEOUT_MS = 8_000;
const DEFAULT_MAX_LIMIT = 500;

export interface RuntimeConfig {
  apiBaseUrl: string;
  apiPathPrefix: string;
  leaderboardRefreshMs: number;
  healthRefreshMs: number;
  requestTimeoutMs: number;
  maxLeaderboardLimit: number;
  environmentName: string;
}

declare global {
  interface Window {
    __LEADERBOARD_CONFIG__?: Partial<Record<keyof RuntimeConfig, string | number | undefined>>;
  }
}

function parsePositiveInteger(raw: string | number | undefined, fallback: number, max = 60_000): number {
  if (raw === undefined || raw === '') {
    return fallback;
  }
  const parsed = typeof raw === 'number' ? raw : Number.parseInt(raw, 10);
  return Number.isFinite(parsed) && parsed > 0 ? Math.min(Math.trunc(parsed), max) : fallback;
}

function readEnv(key: string): string | undefined {
  const env = import.meta.env as Readonly<Record<string, string | undefined>>;
  return env[key];
}

function normalizeApiBaseUrl(raw: string | number | undefined): string {
  const value = String(raw ?? '').trim();
  if (!value) {
    return '';
  }

  try {
    const url = new URL(value, window.location.origin);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      return '';
    }
    url.pathname = url.pathname.replace(/\/+$/, '');
    url.search = '';
    url.hash = '';
    return url.toString().replace(/\/$/, '');
  } catch {
    return '';
  }
}

function normalizePathPrefix(raw: string | number | undefined, fallback: string): string {
  const value = String(raw ?? '').trim();
  if (!value) {
    return fallback;
  }
  const normalized = value.startsWith('/') ? value : `/${value}`;
  return normalized === '/' ? '' : normalized.replace(/\/+$/, '');
}

const runtime = typeof window !== 'undefined' ? window.__LEADERBOARD_CONFIG__ : undefined;
const apiBaseUrl = normalizeApiBaseUrl(runtime?.apiBaseUrl ?? readEnv('VITE_API_BASE_URL'));

/** Runtime configuration resolved from /config.js first, then Vite build-time env variables. */
export const appConfig: RuntimeConfig = {
  apiBaseUrl,
  apiPathPrefix: normalizePathPrefix(runtime?.apiPathPrefix ?? readEnv('VITE_API_PATH_PREFIX'), apiBaseUrl ? '' : '/api'),
  leaderboardRefreshMs: parsePositiveInteger(
    runtime?.leaderboardRefreshMs ?? readEnv('VITE_LEADERBOARD_REFRESH_MS'),
    DEFAULT_REFRESH_MS,
    30_000
  ),
  healthRefreshMs: parsePositiveInteger(runtime?.healthRefreshMs ?? readEnv('VITE_HEALTH_REFRESH_MS'), DEFAULT_HEALTH_REFRESH_MS),
  requestTimeoutMs: parsePositiveInteger(runtime?.requestTimeoutMs ?? readEnv('VITE_REQUEST_TIMEOUT_MS'), DEFAULT_REQUEST_TIMEOUT_MS),
  maxLeaderboardLimit: parsePositiveInteger(runtime?.maxLeaderboardLimit ?? readEnv('VITE_MAX_LEADERBOARD_LIMIT'), DEFAULT_MAX_LIMIT, 10_000),
  environmentName: String(runtime?.environmentName ?? readEnv('VITE_ENVIRONMENT_NAME') ?? 'local').trim() || 'local'
} as const;

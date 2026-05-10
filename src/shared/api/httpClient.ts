import { z } from 'zod';
import { appConfig } from '@/app/config';

const problemDetailsSchema = z.object({
  type: z.string().optional(),
  title: z.string().optional(),
  status: z.number().optional(),
  detail: z.string().optional(),
  instance: z.string().optional(),
  message: z.string().optional()
}).passthrough();

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
    public readonly payload?: unknown,
    public readonly requestId?: string | null
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

function buildUrl(path: string, query?: Record<string, string | number | undefined>): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const url = new URL(`${appConfig.apiBaseUrl}${appConfig.apiPathPrefix}${normalizedPath}`, window.location.origin);

  Object.entries(query ?? {}).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      url.searchParams.set(key, String(value));
    }
  });

  return url.toString();
}

async function parseJsonSafely(response: Response): Promise<unknown> {
  if (response.status === 204) {
    return null;
  }

  const contentType = response.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) {
    const text = await response.text();
    return text ? { message: text.slice(0, 500) } : null;
  }

  try {
    return await response.json();
  } catch {
    return null;
  }
}

function errorMessageFromPayload(status: number, payload: unknown): string {
  const parsedProblem = problemDetailsSchema.safeParse(payload);
  if (parsedProblem.success) {
    const problem = parsedProblem.data;
    return problem.detail ?? problem.message ?? problem.title ?? `Backend request failed with HTTP ${status}`;
  }

  return `Backend request failed with HTTP ${status}`;
}

/**
 * Typed HTTP client using native fetch, timeout, cancellation and runtime schema validation.
 * It deliberately keeps the dependency surface small and rejects malformed backend contracts before rendering.
 */
export async function requestJson<T>(options: {
  path: string;
  method?: 'GET' | 'POST';
  query?: Record<string, string | number | undefined>;
  body?: unknown;
  schema: z.ZodType<T>;
  signal?: AbortSignal;
  timeoutMs?: number;
}): Promise<T> {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => {
    controller.abort();
  }, options.timeoutMs ?? appConfig.requestTimeoutMs);

  const abortHandler = () => {
    controller.abort();
  };
  options.signal?.addEventListener('abort', abortHandler, { once: true });

  try {
    const headers: Record<string, string> = { Accept: 'application/json' };
    const requestInit: RequestInit = {
      method: options.method ?? 'GET',
      signal: controller.signal,
      credentials: 'same-origin',
      headers
    };

    if (options.body !== undefined) {
      headers['Content-Type'] = 'application/json';
      requestInit.body = JSON.stringify(options.body);
    }

    const response = await fetch(buildUrl(options.path, options.query), requestInit);
    const payload = await parseJsonSafely(response);
    const requestId = response.headers.get('x-request-id') ?? response.headers.get('x-correlation-id');

    if (!response.ok) {
      throw new ApiError(errorMessageFromPayload(response.status, payload), response.status, payload, requestId);
    }

    const parsed = options.schema.safeParse(payload);
    if (!parsed.success) {
      throw new ApiError('Backend response contract validation failed', response.status, z.treeifyError(parsed.error), requestId);
    }

    return parsed.data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new ApiError('Backend request timed out');
    }
    throw new ApiError(error instanceof Error ? error.message : 'Unknown backend request error');
  } finally {
    options.signal?.removeEventListener('abort', abortHandler);
    window.clearTimeout(timeoutId);
  }
}

import { ApiError } from '@/shared/api/httpClient';

function getErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'Unexpected error.';
}

function getErrorMeta(error: unknown): string | null {
  if (!(error instanceof ApiError)) {
    return null;
  }
  const details = [error.status ? `HTTP ${error.status}` : null, error.requestId ? `request ${error.requestId}` : null].filter(Boolean);
  return details.length > 0 ? details.join(' · ') : null;
}

export function ErrorBanner({ error, title = 'Request failed.' }: { error: unknown; title?: string }) {
  const meta = getErrorMeta(error);

  return (
    <div className="error-banner" role="alert">
      <strong>{title}</strong>
      <span>{getErrorMessage(error)}</span>
      {meta ? <small>{meta}</small> : null}
    </div>
  );
}

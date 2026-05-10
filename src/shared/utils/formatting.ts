export const scoreFormatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 2
});

export function formatDateTime(value: string | undefined): string {
  if (!value) {
    return 'not loaded yet';
  }
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
}

export function calculateAgeSeconds(value: string | undefined): number | null {
  if (!value) {
    return null;
  }
  const time = new Date(value).getTime();
  if (Number.isNaN(time)) {
    return null;
  }
  return Math.max(0, Math.round((Date.now() - time) / 1000));
}

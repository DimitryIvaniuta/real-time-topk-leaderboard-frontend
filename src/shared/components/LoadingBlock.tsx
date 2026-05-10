export function LoadingBlock({ label = 'Loading data...' }: { label?: string }) {
  return (
    <div className="loading-block" role="status" aria-live="polite">
      <span className="spinner" />
      {label}
    </div>
  );
}

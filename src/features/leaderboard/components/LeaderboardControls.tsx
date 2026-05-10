import { type FormEvent, useState } from 'react';
import { appConfig } from '@/app/config';

const SAFE_LEADERBOARD_ID = /^[A-Za-z0-9._:-]+$/;

export function LeaderboardControls({
  leaderboardId,
  limit,
  onSubmit
}: {
  leaderboardId: string;
  limit: number;
  onSubmit: (next: { leaderboardId: string; limit: number }) => void;
}) {
  const [validationError, setValidationError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const leaderboardField = form.get('leaderboardId');
    const nextLeaderboardId = typeof leaderboardField === 'string' && leaderboardField.trim() ? leaderboardField.trim() : 'global';
    const rawLimit = Number(form.get('limit'));

    if (!SAFE_LEADERBOARD_ID.test(nextLeaderboardId)) {
      setValidationError('Leaderboard ID can contain only letters, numbers, dot, underscore, colon and dash.');
      return;
    }

    const nextLimit = Number.isFinite(rawLimit) ? Math.min(Math.max(1, Math.trunc(rawLimit)), appConfig.maxLeaderboardLimit) : 100;
    setValidationError(null);
    onSubmit({ leaderboardId: nextLeaderboardId, limit: nextLimit });
  }

  return (
    <div className="toolbar-stack">
      {validationError ? <div className="error-banner" role="alert"><strong>Invalid filter.</strong><span>{validationError}</span></div> : null}
      <form className="toolbar-card" onSubmit={handleSubmit} aria-label="Leaderboard filters">
        <label>
          Leaderboard ID
          <input name="leaderboardId" defaultValue={leaderboardId} maxLength={80} autoComplete="off" pattern="[A-Za-z0-9._:-]+" />
        </label>
        <label>
          Limit
          <input name="limit" type="number" min={1} max={appConfig.maxLeaderboardLimit} defaultValue={limit} />
        </label>
        <button type="submit">Apply</button>
      </form>
    </div>
  );
}

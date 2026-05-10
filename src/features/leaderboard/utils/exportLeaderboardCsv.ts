import type { LeaderboardResponse } from '@/features/leaderboard/model/schemas';

function escapeCsvFormula(value: string): string {
  return /^[=+\-@\t\r]/.test(value.trimStart()) ? `'${value}` : value;
}

function csvCell(value: string | number | null | undefined): string {
  const text = escapeCsvFormula(String(value ?? ''));
  return `"${text.replaceAll('"', '""')}"`;
}

export function buildLeaderboardCsv(data: LeaderboardResponse): string {
  const rows = [
    ['rank', 'itemId', 'displayName', 'score', 'leaderboardId', 'generatedAt'].map(csvCell).join(','),
    ...data.items.map((item) => [
      item.rank,
      item.itemId,
      item.displayName ?? '',
      item.score,
      data.leaderboardId,
      data.generatedAt
    ].map(csvCell).join(','))
  ];

  return `${rows.join('\n')}\n`;
}

/** Creates a CSV download without exposing rendered HTML or unsafe formulas. */
export function downloadLeaderboardCsv(data: LeaderboardResponse): void {
  const blob = new Blob([buildLeaderboardCsv(data)], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `leaderboard-${data.leaderboardId}-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

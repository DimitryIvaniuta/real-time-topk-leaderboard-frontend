import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { LeaderboardTable } from '@/features/leaderboard/components/LeaderboardTable';

describe('LeaderboardTable', () => {
  it('renders ordered players and scores', () => {
    render(
      <LeaderboardTable
        items={[
          { rank: 1, itemId: 'player-1', displayName: 'Alice', score: 120 },
          { rank: 2, itemId: 'player-2', displayName: 'Bob', score: 99 }
        ]}
      />
    );

    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('#1')).toBeInTheDocument();
    expect(screen.getByText('120')).toBeInTheDocument();
  });

  it('renders empty state', () => {
    render(<LeaderboardTable items={[]} />);

    expect(screen.getByText('No scores yet')).toBeInTheDocument();
  });
});

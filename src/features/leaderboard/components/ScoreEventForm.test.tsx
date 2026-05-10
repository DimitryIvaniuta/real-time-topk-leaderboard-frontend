import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ScoreEventForm } from '@/features/leaderboard/components/ScoreEventForm';

function renderWithQueryClient() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
  return render(
    <QueryClientProvider client={client}>
      <ScoreEventForm />
    </QueryClientProvider>
  );
}

describe('ScoreEventForm', () => {
  it('publishes a valid delta event', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ eventId: 'evt-1', topic: 'leaderboard.score-events', partition: 0, offset: 42 }), {
        status: 202,
        headers: { 'content-type': 'application/json' }
      })
    );
    const user = userEvent.setup();
    renderWithQueryClient();

    await user.type(screen.getByLabelText('Player / Item ID'), 'player-1');
    await user.type(screen.getByLabelText('Display name'), 'Player One');
    await user.type(screen.getByLabelText('Score delta'), '25');
    await user.click(screen.getByRole('button', { name: /publish event/i }));

    expect(await screen.findByText(/Event accepted:/)).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/leaderboard/events'),
      expect.objectContaining({ method: 'POST' })
    );
  });
});

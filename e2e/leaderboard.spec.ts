import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.route('**/api/leaderboard/events', async (route) => {
    await route.fulfill({
      status: 202,
      contentType: 'application/json',
      body: JSON.stringify({ eventId: 'evt-e2e', topic: 'leaderboard.score-events', partition: 0, offset: 123 })
    });
  });

  await page.route('**/api/leaderboard?**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        leaderboardId: 'global',
        limit: 100,
        generatedAt: '2026-05-09T10:00:00Z',
        items: [
          { rank: 1, itemId: 'player-1', displayName: 'Alice Banker', score: 1550.5 },
          { rank: 2, itemId: 'player-2', displayName: 'Bob Trader', score: 1440 }
        ]
      })
    });
  });

  await page.route('**/api/actuator/health', async (route) => {
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ status: 'UP' }) });
  });

  await page.route('**/actuator/health', async (route) => {
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ status: 'UP' }) });
  });
});

test('shows dashboard and live leaderboard preview', async ({ page }) => {
  await page.goto('/dashboard');

  await expect(page.getByRole('heading', { name: 'Leaderboard dashboard' })).toBeVisible();
  await expect(page.getByText('Alice Banker')).toBeVisible();
  await expect(page.getByText('Backend UP')).toBeVisible();
});

test('publishes a score event from the banking form', async ({ page }) => {
  await page.goto('/publish-event');

  await page.getByLabel('Player / Item ID').fill('player-9');
  await page.getByLabel('Display name').fill('Charlie Risk');
  await page.getByLabel('Score delta').fill('88');
  await page.getByRole('button', { name: 'Publish event' }).click();

  await expect(page.getByText(/Event accepted:/)).toBeVisible();
  await expect(page.getByText(/evt-e2e/)).toBeVisible();
});

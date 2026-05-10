import { Navigate, Route, Routes } from 'react-router';
import { AppShell } from '@/shared/components/AppShell';
import { DashboardPage } from '@/pages/DashboardPage';
import { LeaderboardPage } from '@/pages/LeaderboardPage';
import { PublishEventPage } from '@/pages/PublishEventPage';
import { OperationsPage } from '@/pages/OperationsPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

/** Root route tree for the leaderboard operations console. */
export function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="leaderboard" element={<LeaderboardPage />} />
        <Route path="publish-event" element={<PublishEventPage />} />
        <Route path="operations" element={<OperationsPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

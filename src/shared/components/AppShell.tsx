import { Outlet } from 'react-router';
import { Footer } from '@/shared/components/Footer';
import { Header } from '@/shared/components/Header';
import { Sidebar } from '@/shared/components/Sidebar';
import { NetworkStatusBanner } from '@/shared/components/NetworkStatusBanner';

/** Banking-style application frame with persistent navigation and content area. */
export function AppShell() {
  return (
    <div className="app-shell">
      <Header />
      <NetworkStatusBanner />
      <div className="app-shell__body">
        <Sidebar />
        <main className="app-shell__main" aria-label="Main content">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}

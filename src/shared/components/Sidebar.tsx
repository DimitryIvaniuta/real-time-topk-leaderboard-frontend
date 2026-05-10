import { NavLink } from 'react-router';

const links = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/publish-event', label: 'Publish Event' },
  { to: '/operations', label: 'Operations' },
  { to: '/settings', label: 'Settings' }
] as const;

/** Left navigation optimized for an internal banking operations tool. */
export function Sidebar() {
  return (
    <aside className="sidebar" aria-label="Primary navigation">
      <div className="sidebar__section-title">Workspace</div>
      <nav className="sidebar__nav">
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} className={({ isActive }) => (isActive ? 'nav-link nav-link--active' : 'nav-link')}>
            {link.label}
          </NavLink>
        ))}
      </nav>
      <div className="sidebar__callout">
        <strong>Target SLA</strong>
        <span>Top-K read p95 &lt; 50ms</span>
      </div>
    </aside>
  );
}

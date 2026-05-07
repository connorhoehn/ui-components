// src/components/identity/shared/IdentityAdminLayout.tsx
//
// Main admin layout with sidebar navigation, header bar, and content area.
// Sidebar collapses on narrow viewports via a toggle button.

import { useState, useCallback } from 'react';
import { cn } from '../../../lib/cn';

export interface IdentityAdminLayoutProps {
  children: React.ReactNode;
  activePath?: string;
  adminEmail?: string;
  onNavigate: (path: string) => void;
  onLogout?: () => void;
}

interface NavItem {
  label: string;
  path: string;
  icon: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', path: '/identity/admin', icon: '⌂' },
  { label: 'Pools', path: '/identity/admin/pools', icon: '☰' },
  { label: 'Applications', path: '/identity/admin/applications', icon: '⬚' },
  { label: 'Email Templates', path: '/identity/admin/email-templates', icon: '✉' },
  { label: 'Audit', path: '/identity/admin/audit', icon: '⌸' },
  { label: 'Diagnostics', path: '/identity/admin/diagnostics', icon: '⚙' },
  { label: 'Setup Guide', path: '/identity/admin/setup', icon: '✓' },
];

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function NavLink({
  item,
  active,
  onNavigate,
}: {
  item: NavItem;
  active: boolean;
  onNavigate: (path: string) => void;
}) {
  return (
    <li>
      <button
        type="button"
        className={cn(
          'flex items-center gap-2 w-full text-left px-4 py-2 text-sm font-[inherit] border-none transition-colors duration-150',
          'border-l-[3px]',
          active
            ? 'bg-surface-hover text-primary font-semibold border-l-primary'
            : 'bg-transparent text-text-primary font-normal border-l-transparent hover:bg-surface-hover'
        )}
        onClick={() => onNavigate(item.path)}
      >
        <span>{item.icon}</span>
        <span>{item.label}</span>
      </button>
    </li>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function IdentityAdminLayout({
  children,
  activePath,
  adminEmail,
  onNavigate,
  onLogout,
}: IdentityAdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = useCallback(() => setSidebarOpen((v) => !v), []);

  return (
    <div className="flex min-h-screen bg-surface-panel font-[inherit]">
      <aside
        className={cn(
          'bg-surface border-r border-border flex flex-col shrink-0 transition-[width] duration-200 overflow-hidden',
          sidebarOpen ? 'w-60' : 'w-0 border-r-0'
        )}
      >
        <div className="p-4 font-bold text-lg text-primary border-b border-border">
          Identity Admin
        </div>
        <ul className="list-none m-0 py-2 flex-1">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              item={item}
              active={activePath === item.path}
              onNavigate={onNavigate}
            />
          ))}
        </ul>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="flex items-center justify-between px-4 py-2 bg-surface border-b border-border">
          <button
            type="button"
            className="bg-transparent border-none text-xl cursor-pointer text-text-primary px-2 py-1"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? '←' : '→'}
          </button>

          <div className="flex items-center gap-4">
            {adminEmail && (
              <span className="text-sm text-text-secondary">
                {adminEmail}
              </span>
            )}
            {onLogout && (
              <button
                type="button"
                className="px-3.5 py-1.5 text-sm bg-danger text-white border-none rounded-sm cursor-pointer"
                onClick={onLogout}
              >
                Logout
              </button>
            )}
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

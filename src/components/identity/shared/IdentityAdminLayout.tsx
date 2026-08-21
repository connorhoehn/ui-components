// src/components/identity/shared/IdentityAdminLayout.tsx
//
// Main admin layout with sidebar navigation, header bar, and content area.
// Sidebar collapses on narrow viewports via a toggle button.

import { useState, useCallback } from 'react';
import { Button } from '../../ui/Button';
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
          'flex items-center gap-2 w-full text-left px-3 py-2 text-sm font-medium cursor-pointer',
          'border-none rounded-none border-l-[3px] transition-colors',
          active
            ? 'bg-surface-panel text-info-fg font-semibold border-l-info'
            : 'bg-transparent text-[#334155] border-l-transparent hover:bg-surface-hover'
        )}
        onClick={() => onNavigate(item.path)}
        aria-current={active ? 'page' : undefined}
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
          'bg-white border-r border-border flex flex-col shrink-0 transition-[width] duration-200 overflow-hidden',
          sidebarOpen ? 'w-60' : 'w-0 border-r-0'
        )}
      >
        <div className="p-4 font-bold text-lg text-info-fg border-b border-border">
          Identity Admin
        </div>
        <ul className="list-none m-0 p-0 py-2 flex-1">
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
        <header className="flex items-center justify-between px-4 py-2 bg-white border-b border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? '←' : '→'}
          </Button>

          <div className="flex items-center gap-4">
            {adminEmail && (
              <span className="text-sm text-neutral">
                {adminEmail}
              </span>
            )}
            {onLogout && (
              <Button variant="danger-solid" size="sm" onClick={onLogout}>
                Logout
              </Button>
            )}
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

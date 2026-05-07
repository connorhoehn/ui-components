// src/components/identity/shared/IdentityAdminLayout.tsx
//
// Main admin layout with sidebar navigation, header bar, and content area.
// Sidebar collapses on narrow viewports via a toggle button.

import { useState, useCallback } from 'react';

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
// Styles
// ---------------------------------------------------------------------------

const containerStyle: React.CSSProperties = {
  display: 'flex',
  minHeight: '100vh',
  backgroundColor: 'var(--ui-surfaceAlt)',
  fontFamily: 'inherit',
};

const sidebarStyle: React.CSSProperties = {
  width: '240px',
  backgroundColor: 'var(--ui-surface)',
  borderRight: '1px solid var(--ui-border)',
  display: 'flex',
  flexDirection: 'column',
  flexShrink: 0,
  transition: 'width 0.2s ease',
  overflow: 'hidden',
};

const sidebarCollapsedStyle: React.CSSProperties = {
  ...sidebarStyle,
  width: '0px',
  borderRight: 'none',
};

const sidebarHeaderStyle: React.CSSProperties = {
  padding: 'var(--ui-spacingMd)',
  fontWeight: 700,
  fontSize: 'var(--ui-fontSizeLg)',
  color: 'var(--ui-primaryDark)',
  borderBottom: '1px solid var(--ui-border)',
};

const navListStyle: React.CSSProperties = {
  listStyle: 'none',
  margin: 0,
  padding: 'var(--ui-spacingSm) 0',
  flex: 1,
};

const mainStyle: React.CSSProperties = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  minWidth: 0,
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: 'var(--ui-spacingSm) var(--ui-spacingMd)',
  backgroundColor: 'var(--ui-surface)',
  borderBottom: '1px solid var(--ui-border)',
};

const contentStyle: React.CSSProperties = {
  flex: 1,
  padding: 'var(--ui-spacingLg)',
  overflowY: 'auto',
};

const toggleBtnStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  fontSize: '20px',
  cursor: 'pointer',
  color: 'var(--ui-textPrimary)',
  padding: '4px 8px',
};

const logoutBtnStyle: React.CSSProperties = {
  padding: '6px 14px',
  fontSize: 'var(--ui-fontSizeSm)',
  backgroundColor: 'var(--ui-danger)',
  color: '#fff',
  border: 'none',
  borderRadius: 'var(--ui-radiusSm)',
  cursor: 'pointer',
};

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
  const style: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px var(--ui-spacingMd)',
    cursor: 'pointer',
    backgroundColor: active ? 'var(--ui-surfaceAlt)' : 'transparent',
    color: active ? 'var(--ui-primary)' : 'var(--ui-textPrimary)',
    fontWeight: active ? 600 : 400,
    fontSize: 'var(--ui-fontSizeMd)',
    borderLeft: active ? '3px solid var(--ui-primary)' : '3px solid transparent',
    transition: 'background-color 0.15s ease',
  };

  return (
    <li>
      <button
        type="button"
        style={{ ...style, width: '100%', textAlign: 'left', border: 'none', background: style.backgroundColor, font: 'inherit' }}
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
    <div style={containerStyle}>
      <aside style={sidebarOpen ? sidebarStyle : sidebarCollapsedStyle}>
        <div style={sidebarHeaderStyle}>Identity Admin</div>
        <ul style={navListStyle}>
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

      <div style={mainStyle}>
        <header style={headerStyle}>
          <button type="button" style={toggleBtnStyle} onClick={toggleSidebar} aria-label="Toggle sidebar">
            {sidebarOpen ? '←' : '→'}
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ui-spacingMd)' }}>
            {adminEmail && (
              <span style={{ fontSize: 'var(--ui-fontSizeSm)', color: 'var(--ui-textSecondary)' }}>
                {adminEmail}
              </span>
            )}
            {onLogout && (
              <button type="button" style={logoutBtnStyle} onClick={onLogout}>
                Logout
              </button>
            )}
          </div>
        </header>

        <main style={contentStyle}>{children}</main>
      </div>
    </div>
  );
}

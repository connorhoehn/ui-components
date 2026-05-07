// src/components/identity/shared/PoolScopedLayout.tsx
//
// Layout wrapper for pool-scoped admin pages (Users, Groups, MFA).
// Provides breadcrumb navigation and tab sub-nav.

import { useCallback } from 'react';

export interface PoolScopedLayoutProps {
  children: React.ReactNode;
  poolId: string;
  poolName: string;
  activeSection?: 'users' | 'groups' | 'mfa';
  onNavigate: (path: string) => void;
  onBack: () => void;
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const wrapperStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--ui-spacingMd)',
};

const breadcrumbStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  fontSize: 'var(--ui-fontSizeSm)',
  color: 'var(--ui-textMuted)',
};

const breadcrumbLinkStyle: React.CSSProperties = {
  color: 'var(--ui-primary)',
  cursor: 'pointer',
  background: 'none',
  border: 'none',
  padding: 0,
  font: 'inherit',
  fontSize: 'var(--ui-fontSizeSm)',
  textDecoration: 'underline',
};

const tabBarStyle: React.CSSProperties = {
  display: 'flex',
  gap: '0',
  borderBottom: '2px solid var(--ui-border)',
};

const backBtnStyle: React.CSSProperties = {
  background: 'none',
  border: '1px solid var(--ui-border)',
  borderRadius: 'var(--ui-radiusSm)',
  padding: '6px 12px',
  fontSize: 'var(--ui-fontSizeSm)',
  color: 'var(--ui-textPrimary)',
  cursor: 'pointer',
};

const TABS: Array<{ key: 'users' | 'groups' | 'mfa'; label: string }> = [
  { key: 'users', label: 'Users' },
  { key: 'groups', label: 'Groups' },
  { key: 'mfa', label: 'MFA' },
];

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function Tab({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  const style: React.CSSProperties = {
    padding: '8px 16px',
    cursor: 'pointer',
    fontWeight: active ? 600 : 400,
    color: active ? 'var(--ui-primary)' : 'var(--ui-textSecondary)',
    borderBottom: active ? '2px solid var(--ui-primary)' : '2px solid transparent',
    marginBottom: '-2px',
    background: 'none',
    border: 'none',
    borderBottomWidth: '2px',
    borderBottomStyle: 'solid',
    borderBottomColor: active ? 'var(--ui-primary)' : 'transparent',
    font: 'inherit',
    fontSize: 'var(--ui-fontSizeMd)',
  };

  return (
    <button type="button" style={style} onClick={onClick}>
      {label}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function PoolScopedLayout({
  children,
  poolId,
  poolName,
  activeSection,
  onNavigate,
  onBack,
}: PoolScopedLayoutProps) {
  const handleTabClick = useCallback(
    (section: string) => {
      onNavigate(`/identity/admin/pools/${poolId}/${section}`);
    },
    [onNavigate, poolId],
  );

  const sectionLabel = activeSection
    ? activeSection.charAt(0).toUpperCase() + activeSection.slice(1)
    : '';

  return (
    <div style={wrapperStyle}>
      {/* Breadcrumb */}
      <nav style={breadcrumbStyle}>
        <button type="button" style={breadcrumbLinkStyle} onClick={onBack}>
          Pools
        </button>
        <span>/</span>
        <span style={{ color: 'var(--ui-textPrimary)', fontWeight: 500 }}>{poolName}</span>
        {activeSection && (
          <>
            <span>/</span>
            <span>{sectionLabel}</span>
          </>
        )}
      </nav>

      {/* Back button */}
      <div>
        <button type="button" style={backBtnStyle} onClick={onBack}>
          &larr; Back to Pools
        </button>
      </div>

      {/* Tab bar */}
      <div style={tabBarStyle}>
        {TABS.map((tab) => (
          <Tab
            key={tab.key}
            label={tab.label}
            active={activeSection === tab.key}
            onClick={() => handleTabClick(tab.key)}
          />
        ))}
      </div>

      {/* Content */}
      <div>{children}</div>
    </div>
  );
}

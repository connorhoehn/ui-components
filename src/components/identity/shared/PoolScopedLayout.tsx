// src/components/identity/shared/PoolScopedLayout.tsx
//
// Layout wrapper for pool-scoped admin pages (Users, Groups, MFA).
// Provides breadcrumb navigation and tab sub-nav.

import { useCallback } from 'react';
import { cn } from '../../../lib/cn';

export interface PoolScopedLayoutProps {
  children: React.ReactNode;
  poolId: string;
  poolName: string;
  activeSection?: 'users' | 'groups' | 'mfa';
  onNavigate: (path: string) => void;
  onBack: () => void;
}

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
  return (
    <button
      type="button"
      className={cn(
        'px-4 py-2 cursor-pointer font-[inherit] text-sm bg-transparent border-none -mb-[2px]',
        'border-b-2',
        active
          ? 'font-semibold text-primary border-b-primary'
          : 'font-normal text-text-secondary border-b-transparent'
      )}
      onClick={onClick}
    >
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
    <div className="flex flex-col gap-4">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-text-tertiary">
        <button
          type="button"
          className="text-primary cursor-pointer bg-transparent border-none p-0 font-[inherit] text-sm underline"
          onClick={onBack}
        >
          Pools
        </button>
        <span>/</span>
        <span className="text-text-primary font-medium">{poolName}</span>
        {activeSection && (
          <>
            <span>/</span>
            <span>{sectionLabel}</span>
          </>
        )}
      </nav>

      {/* Back button */}
      <div>
        <button
          type="button"
          className="bg-transparent border border-border rounded-sm px-3 py-1.5 text-sm text-text-primary cursor-pointer"
          onClick={onBack}
        >
          &larr; Back to Pools
        </button>
      </div>

      {/* Tab bar */}
      <div className="flex border-b-2 border-border">
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

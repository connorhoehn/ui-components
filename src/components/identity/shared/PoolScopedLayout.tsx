// src/components/identity/shared/PoolScopedLayout.tsx
//
// Layout wrapper for pool-scoped admin pages (Users, Groups, MFA).
// Provides breadcrumb navigation and tab sub-nav.

import { useCallback } from 'react';
import { Button } from '../../ui/Button';
import { cn } from '../../../lib/cn';
import { handleRovingKeyDown } from '../../../lib/rovingFocus';

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
    <Button
      variant="ghost"
      size="sm"
      className={cn(
        'rounded-none -mb-[2px] border-b-2',
        active
          ? 'font-semibold text-info-fg border-b-info'
          : 'font-normal text-neutral border-b-transparent'
      )}
      onClick={onClick}
      aria-selected={active}
      role="tab"
      // Roving tabindex: one Tab stop for the whole bar, arrows move between
      // the sections. Every tab used to be its own Tab stop.
      tabIndex={active ? 0 : -1}
    >
      {label}
    </Button>
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
      <nav className="flex items-center gap-1.5 text-sm text-text-tertiary" aria-label="Breadcrumb">
        <Button
          variant="ghost"
          size="sm"
          className="p-0 underline text-info-fg"
          onClick={onBack}
          aria-label="Navigate to Pools"
        >
          Pools
        </Button>
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
        <Button variant="secondary" size="sm" onClick={onBack}>
          &larr; Back to Pools
        </Button>
      </div>

      {/* Tab bar. The `role="tab"` children were orphans — ARIA requires a
          `tablist` owner, without which the role is unreliable in AT. */}
      <div
        role="tablist"
        aria-label="Pool sections"
        onKeyDown={handleRovingKeyDown}
        className="flex border-b-2 border-border"
      >
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

// src/components/identity/shared/StatusBadge.tsx
//
// Pill-shaped status badge with color variants.
// Auto-maps common identity statuses to appropriate colors.

import { useMemo } from 'react';

export interface StatusBadgeProps {
  status: string;
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
}

const STATUS_VARIANT_MAP: Record<string, StatusBadgeProps['variant']> = {
  CONFIRMED: 'success',
  ACTIVE: 'success',
  ENABLED: 'success',
  UNCONFIRMED: 'warning',
  PENDING: 'warning',
  FORCE_CHANGE_PASSWORD: 'danger',
  DISABLED: 'danger',
  COMPROMISED: 'danger',
  ARCHIVED: 'neutral',
  UNKNOWN: 'neutral',
};

const VARIANT_STYLES: Record<string, { bg: string; color: string }> = {
  success: { bg: 'var(--ui-success)', color: '#fff' },
  warning: { bg: 'var(--ui-warning)', color: '#fff' },
  danger: { bg: 'var(--ui-danger)', color: '#fff' },
  info: { bg: 'var(--ui-info)', color: '#fff' },
  neutral: { bg: 'var(--ui-border)', color: 'var(--ui-textPrimary)' },
};

export function StatusBadge({ status, variant }: StatusBadgeProps) {
  const resolvedVariant = variant || STATUS_VARIANT_MAP[status] || 'neutral';
  const styles = VARIANT_STYLES[resolvedVariant];

  const badgeStyle: React.CSSProperties = useMemo(
    () => ({
      display: 'inline-block',
      padding: '2px 10px',
      borderRadius: '999px',
      fontSize: 'var(--ui-fontSizeSm)',
      fontWeight: 600,
      backgroundColor: styles.bg,
      color: styles.color,
      lineHeight: 1.6,
      whiteSpace: 'nowrap',
    }),
    [styles],
  );

  return <span style={badgeStyle}>{status}</span>;
}

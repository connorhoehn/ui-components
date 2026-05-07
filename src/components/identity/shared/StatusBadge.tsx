// src/components/identity/shared/StatusBadge.tsx
//
// Pill-shaped status badge with color variants.
// Auto-maps common identity statuses to appropriate colors.

import { cn } from '../../../lib/cn';

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

const variantClasses: Record<string, string> = {
  success: 'bg-success text-white',
  warning: 'bg-warning text-white',
  danger: 'bg-danger text-white',
  info: 'bg-info text-white',
  neutral: 'bg-border text-text-primary',
};

export function StatusBadge({ status, variant }: StatusBadgeProps) {
  const resolvedVariant = variant || STATUS_VARIANT_MAP[status] || 'neutral';

  return (
    <span
      className={cn(
        'inline-block px-2.5 py-0.5 rounded-full text-sm font-semibold leading-relaxed whitespace-nowrap',
        variantClasses[resolvedVariant]
      )}
    >
      {status}
    </span>
  );
}

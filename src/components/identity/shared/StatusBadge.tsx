// src/components/identity/shared/StatusBadge.tsx
//
// Status indicator using the shared Chip component.
// Auto-maps common identity statuses to appropriate tones.

import Chip, { type ChipTone } from '../../shared/Chip';

export interface StatusBadgeProps {
  status: string;
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
}

const STATUS_TONE_MAP: Record<string, ChipTone> = {
  CONFIRMED: 'success',
  ACTIVE: 'success',
  ENABLED: 'success',
  UNCONFIRMED: 'warning',
  PENDING: 'warning',
  FORCE_CHANGE_PASSWORD: 'caution',
  DISABLED: 'danger',
  COMPROMISED: 'danger',
  ARCHIVED: 'neutral',
  UNKNOWN: 'neutral',
};

const VARIANT_TO_TONE: Record<string, ChipTone> = {
  success: 'success',
  warning: 'warning',
  danger: 'danger',
  info: 'info',
  neutral: 'neutral',
};

export function StatusBadge({ status, variant }: StatusBadgeProps) {
  const tone: ChipTone = variant
    ? VARIANT_TO_TONE[variant] || 'neutral'
    : STATUS_TONE_MAP[status] || 'neutral';

  return (
    <Chip tone={tone} size="sm">
      {status}
    </Chip>
  );
}

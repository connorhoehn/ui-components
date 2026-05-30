// src/components/shared/PresenceDot.tsx
//
// Tiny status dot tuned to presence semantics — online / away / busy /
// offline / unknown. A thin wrapper on top of StatusDot that maps named
// states to the right token color so every surface (presence avatars,
// user chips, sidebars, hangout tiles) shows the same color for "online".

import type { CSSProperties, ReactNode } from 'react';
import { StatusDot, type StatusDotSize } from './StatusDot';

export type PresenceState = 'online' | 'away' | 'busy' | 'offline' | 'unknown';

const PRESENCE_COLOR: Record<PresenceState, string> = {
  online: 'var(--color-success, #22c55e)',
  away: 'var(--color-state-pending, #f59e0b)',
  busy: 'var(--color-state-error, #ef4444)',
  offline: 'var(--color-text-tertiary, #94a3b8)',
  unknown: 'var(--color-text-tertiary, #94a3b8)',
};

const PRESENCE_LABEL: Record<PresenceState, string> = {
  online: 'Online',
  away: 'Away',
  busy: 'Busy',
  offline: 'Offline',
  unknown: 'Unknown presence',
};

export interface PresenceDotProps {
  state: PresenceState;
  /** Override the auto-computed accessible label. */
  ariaLabel?: string;
  /** Visible text label after the dot. */
  label?: ReactNode;
  /** Pulse animation. Defaults to true when state === 'online'. */
  pulse?: boolean;
  size?: StatusDotSize;
  className?: string;
  style?: CSSProperties;
  title?: string;
  'data-testid'?: string;
}

export function PresenceDot({
  state,
  ariaLabel,
  label,
  pulse,
  size = 'sm',
  className,
  style,
  title,
  'data-testid': testId,
}: PresenceDotProps) {
  const resolvedPulse = pulse ?? state === 'online';
  const resolvedAria = ariaLabel ?? PRESENCE_LABEL[state];
  return (
    <StatusDot
      color={PRESENCE_COLOR[state]}
      pulse={resolvedPulse}
      size={size}
      label={label}
      className={className}
      style={style}
      title={title}
      data-testid={testId ?? `presence-${state}`}
      aria-label={resolvedAria}
    />
  );
}

export default PresenceDot;

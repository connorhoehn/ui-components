// src/components/shared/StatusPill.tsx
//
// Generic semantic-state pill. Unlike ConnectionPill (domain-specific) and
// Badge (count/dot only), StatusPill is a general label + color chip for any
// named state: success, error, warning, info, neutral, pending.
//
// pending state carries a pulse animation via animate-ping on the dot so the
// pill itself never needs a custom @keyframes block. Color tokens map to
// Tailwind semantic classes only — no hex.

import { type ReactNode } from 'react';
import { cn } from '../../lib/cn';

export type StatusPillState =
  | 'success'
  | 'error'
  | 'warning'
  | 'info'
  | 'neutral'
  | 'pending';

export type StatusPillSize = 'sm' | 'md';

export interface StatusPillProps {
  state: StatusPillState;
  label: string;
  /** Optional icon placed to the left of the label. */
  icon?: ReactNode;
  size?: StatusPillSize;
  className?: string;
  'data-testid'?: string;
}

interface PillTokens {
  pill: string;
  dot: string;
  text: string;
}

const STATE_TOKENS: Record<StatusPillState, PillTokens> = {
  success: {
    pill: 'bg-success-bg border-success-border',
    dot:  'bg-success',
    text: 'text-success-fg',
  },
  error: {
    pill: 'bg-danger-bg border-danger-border',
    dot:  'bg-danger',
    text: 'text-danger-fg',
  },
  warning: {
    pill: 'bg-warning-bg border-warning-border',
    dot:  'bg-warning',
    text: 'text-warning-fg',
  },
  info: {
    pill: 'bg-info-bg border-info-border',
    dot:  'bg-info',
    text: 'text-info-fg',
  },
  neutral: {
    pill: 'bg-surface-hover border-border',
    dot:  'bg-surface-emphasis',
    text: 'text-text-primary',
  },
  pending: {
    pill: 'bg-accent-bg border-accent-border',
    dot:  'bg-accent',
    text: 'text-accent-fg',
  },
};

const SIZE_CLASSES: Record<StatusPillSize, string> = {
  sm: 'px-1.5 py-0.5 text-[10px] gap-1',
  md: 'px-2.5 py-1 text-[12px] gap-1.5',
};

const DOT_SIZE_CLASSES: Record<StatusPillSize, string> = {
  sm: 'w-1.5 h-1.5',
  md: 'w-2 h-2',
};

export function StatusPill({
  state,
  label,
  icon,
  size = 'md',
  className,
  'data-testid': testId,
}: StatusPillProps) {
  const tokens = STATE_TOKENS[state];
  const isPending = state === 'pending';

  return (
    <span
      role="status"
      data-testid={testId}
      data-state={state}
      className={cn(
        'inline-flex items-center rounded-full border font-medium leading-none select-none',
        tokens.pill,
        tokens.text,
        SIZE_CLASSES[size],
        className,
      )}
    >
      {icon ? (
        <span aria-hidden="true" className="shrink-0">{icon}</span>
      ) : (
        // Dot indicator — pending gets a relative container with an animate-ping halo.
        <span className={cn('relative inline-flex shrink-0', DOT_SIZE_CLASSES[size])}>
          {isPending && (
            <span
              aria-hidden="true"
              className={cn(
                'absolute inset-0 rounded-full animate-ping opacity-75',
                tokens.dot,
              )}
            />
          )}
          <span
            aria-hidden="true"
            className={cn('relative rounded-full', DOT_SIZE_CLASSES[size], tokens.dot)}
          />
        </span>
      )}
      {label}
    </span>
  );
}

export default StatusPill;

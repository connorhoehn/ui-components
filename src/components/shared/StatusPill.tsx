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
    pill: 'bg-emerald-100 border-emerald-200',
    dot:  'bg-emerald-500',
    text: 'text-emerald-800',
  },
  error: {
    pill: 'bg-red-100 border-red-200',
    dot:  'bg-red-500',
    text: 'text-red-800',
  },
  warning: {
    pill: 'bg-amber-100 border-amber-200',
    dot:  'bg-amber-500',
    text: 'text-amber-800',
  },
  info: {
    pill: 'bg-blue-100 border-blue-200',
    dot:  'bg-blue-500',
    text: 'text-blue-800',
  },
  neutral: {
    pill: 'bg-slate-100 border-slate-200',
    dot:  'bg-slate-400',
    text: 'text-slate-700',
  },
  pending: {
    pill: 'bg-violet-100 border-violet-200',
    dot:  'bg-violet-500',
    text: 'text-violet-800',
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

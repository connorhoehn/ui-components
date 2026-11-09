// src/components/shared/ErrorState.tsx
//
// Centered error-state card — companion to EmptyState. Same vertical card
// shape, danger-tinted copy, optional retry CTA. Use for "we couldn't load
// this" surfaces — failed fetches, broken renders, etc.

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface ErrorStateProps {
  /** Override the default ⚠️ glyph. Pass a string emoji or a ReactNode. */
  icon?: ReactNode;
  title: string;
  /** Plain-text body (preferred when no markup is needed). */
  body?: string;
  /** Alias for `body` — accepts any ReactNode for richer copy (stack traces, links). */
  description?: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  /** Custom action node (overrides actionLabel/onAction when present). */
  action?: ReactNode;
  testId?: string;
  actionTestId?: string;
  /**
   * Small padding and no 220px minimum height (since 2.511.0): for an error
   * drawn over a media frame or inside a card, where the card shape would
   * overflow the space it covers.
   */
  compact?: boolean;
}

function ErrorState({
  icon = '⚠️',
  title,
  body,
  description,
  actionLabel,
  onAction,
  action,
  testId = 'error-state',
  actionTestId = 'error-state-action',
  compact = false,
}: ErrorStateProps) {
  const resolvedDescription = description ?? body;
  return (
    <div
      role="alert"
      data-testid={testId}
      className={cn(
        'flex flex-col items-center justify-center',
        compact ? 'gap-1 p-3' : 'min-h-[220px] gap-2 p-8',
        'text-text-secondary font-[inherit]',
      )}
    >
      {icon && (
        typeof icon === 'string'
          ? <div className="text-[14px] mb-2" aria-hidden>{icon}</div>
          : <div className="mb-2">{icon}</div>
      )}
      <div className="text-sm font-semibold text-danger-fg">{title}</div>
      {resolvedDescription && (
        <div className="text-sm text-center max-w-[340px] text-text-secondary leading-normal">
          {resolvedDescription}
        </div>
      )}
      {action
        ? <div className="mt-2.5">{action}</div>
        : actionLabel && onAction && (
            <button
              data-ui-part=""
              data-testid={actionTestId}
              onClick={onAction}
              type="button"
              className={cn(
                'mt-2.5 px-[22px] py-[9px] text-sm font-semibold',
                'bg-surface text-text-primary border border-border rounded-lg cursor-pointer font-[inherit]',
                'hover:bg-surface-panel',
              )}
            >
              {actionLabel}
            </button>
          )}
    </div>
  );
}

export default ErrorState;

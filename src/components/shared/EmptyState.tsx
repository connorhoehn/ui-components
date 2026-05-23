// frontend/src/components/shared/EmptyState.tsx
//
// Centered empty-state card. Mirrors the IdlePanel style from
// DocumentTypesPage: 52px emoji, 17px/600 slate-600 headline, 13px/slate-400
// body capped at 340px, optional indigo primary CTA.
//
// Backwards-compat API:
//   - `body` + `actionLabel` + `onAction` — original simple API
//   - `description` + `action` (ReactNode) — new composable API, used by
//     sections that want to pass a custom button or link as the CTA.
// The new fields take precedence when both are provided.

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  /** Plain-text body (preferred when no markup is needed). */
  body?: string;
  /** Alias for `body` — accepts any ReactNode for richer copy. */
  description?: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  /** Custom action node (overrides actionLabel/onAction when present). */
  action?: ReactNode;
  /**
   * Optional testid for the container (defaults to "empty-state").
   * Callers with existing tests targeting a specific id can pass it here.
   */
  testId?: string;
  /**
   * Optional testid for the action button (defaults to "empty-state-action").
   */
  actionTestId?: string;
}

function EmptyState({
  icon, title, body, description, actionLabel, onAction, action,
  testId = 'empty-state', actionTestId = 'empty-state-action',
}: EmptyStateProps) {
  const resolvedDescription = description ?? body;
  return (
    <div
      data-testid={testId}
      className={cn(
        'flex flex-col items-center justify-center min-h-[220px]',
        'text-slate-400 gap-2 p-8 font-[inherit]',
      )}
    >
      {icon && (
        typeof icon === 'string'
          ? <div className="text-[52px] mb-2">{icon}</div>
          : <div className="mb-2">{icon}</div>
      )}
      <div className="text-[17px] font-semibold text-slate-500">{title}</div>
      {resolvedDescription && (
        <div className="text-[13px] text-center max-w-[340px] text-slate-400 leading-normal">
          {resolvedDescription}
        </div>
      )}
      {action
        ? <div className="mt-2.5">{action}</div>
        : actionLabel && onAction && (
            <button
              data-testid={actionTestId}
              onClick={onAction}
              className={cn(
                'mt-2.5 px-[22px] py-[9px] text-sm font-semibold',
                'bg-primary text-white border-none rounded-lg cursor-pointer font-[inherit]',
              )}
            >
              {actionLabel}
            </button>
          )}
    </div>
  );
}

export default EmptyState;

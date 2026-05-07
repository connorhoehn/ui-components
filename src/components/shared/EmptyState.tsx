// frontend/src/components/shared/EmptyState.tsx
//
// Centered empty-state card. Mirrors the IdlePanel style from
// DocumentTypesPage: 52px emoji, 17px/600 slate-600 headline, 13px/slate-400
// body capped at 340px, optional indigo primary CTA.

import { cn } from '../../lib/cn';

export interface EmptyStateProps {
  icon?: string;
  title: string;
  body?: string;
  actionLabel?: string;
  onAction?: () => void;
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
  icon, title, body, actionLabel, onAction,
  testId = 'empty-state', actionTestId = 'empty-state-action',
}: EmptyStateProps) {
  return (
    <div
      data-testid={testId}
      className={cn(
        'flex flex-col items-center justify-center min-h-[220px]',
        'text-slate-400 gap-2 p-8 font-[inherit]',
      )}
    >
      {icon && <div className="text-[52px] mb-2">{icon}</div>}
      <div className="text-[17px] font-semibold text-slate-500">{title}</div>
      {body && (
        <div className="text-[13px] text-center max-w-[340px] text-slate-400 leading-normal">
          {body}
        </div>
      )}
      {actionLabel && onAction && (
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

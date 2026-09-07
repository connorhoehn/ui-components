// src/components/shared/LoadingState.tsx
//
// Centered loading-state card — companion to EmptyState / ErrorState. Same
// vertical card shape, spinner instead of icon, optional label and subtitle.
// Use for "we're fetching this" surfaces where a full skeleton is overkill.

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Spinner, type SpinnerSize } from './Spinner';

export interface LoadingStateProps {
  /** Primary label. Defaults to "Loading…". */
  label?: string;
  /** Optional secondary copy below the label. */
  description?: ReactNode;
  spinnerSize?: SpinnerSize;
  spinnerColor?: string;
  testId?: string;
}

function LoadingState({
  label = 'Loading…',
  description,
  spinnerSize = 'lg',
  spinnerColor,
  testId = 'loading-state',
}: LoadingStateProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      data-testid={testId}
      className={cn(
        'flex flex-col items-center justify-center min-h-[220px]',
        'text-text-secondary gap-3 p-8 font-[inherit]',
      )}
    >
      {/* The container is the live region; a second one inside it would
          make the reader announce the wait twice. */}
      <Spinner size={spinnerSize} color={spinnerColor} decorative />
      <div className="text-[15px] font-medium text-text-primary">{label}</div>
      {description && (
        <div className="text-[13px] text-center max-w-[340px] text-text-secondary leading-normal">
          {description}
        </div>
      )}
    </div>
  );
}

export default LoadingState;

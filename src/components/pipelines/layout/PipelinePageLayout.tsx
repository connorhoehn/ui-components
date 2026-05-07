import { type ReactNode } from 'react';
import { cn } from '../../../lib/cn';

export interface PipelinePageLayoutProps {
  /** Page title shown in the header bar */
  title: string;
  /** Optional badge/count shown next to the title */
  badge?: ReactNode;
  /** Action buttons rendered at the right side of the header */
  actions?: ReactNode;
  /** Show loading skeleton placeholders */
  loading?: boolean;
  /** Error message — shows error banner with optional retry */
  error?: string | null;
  /** Retry handler for the error banner */
  onRetry?: () => void;
  /** Show empty state instead of children */
  empty?: boolean;
  /** Custom empty state message */
  emptyMessage?: string;
  /** Optional className on the root container */
  className?: string;
  /** Page content */
  children: ReactNode;
}

export function PipelinePageLayout({
  title,
  badge,
  actions,
  loading = false,
  error,
  onRetry,
  empty = false,
  emptyMessage = 'No items found.',
  className,
  children,
}: PipelinePageLayoutProps) {
  return (
    <div className={cn('flex flex-col h-full', className)}>
      {/* Header bar */}
      <div className="flex items-center gap-3 px-6 h-12 border-b border-border bg-surface shrink-0">
        <h1 className="text-sm font-semibold text-text-primary m-0">{title}</h1>
        {badge}
        <div className="ml-auto flex items-center gap-2">{actions}</div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-6">
        {error && (
          <div className="mb-4 p-3 rounded-md bg-red-50 text-red-700 text-xs flex items-center gap-2">
            <span className="flex-1">{error}</span>
            {onRetry && (
              <button
                type="button"
                onClick={onRetry}
                className="text-xs font-semibold text-red-700 underline cursor-pointer bg-transparent border-none"
              >
                Retry
              </button>
            )}
          </div>
        )}

        {loading ? (
          <div className="flex flex-col gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-12 rounded-md bg-slate-100 animate-pulse" />
            ))}
          </div>
        ) : empty ? (
          <div className="flex items-center justify-center h-48 text-sm text-text-tertiary">
            {emptyMessage}
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}

// frontend/src/components/observability/components/MetricCard.tsx
//
// Card wrapper for a single metric chart (see PIPELINES_PLAN.md §18.9).
// 10px radius, 1px border, 16px padding; header with title + small time-range
// chip + `⛶` maximize button; body slot for the chart itself.

import type { ReactNode } from 'react';
import { cn } from '../../../lib/cn';

export interface MetricCardProps {
  title: string;
  timeRange?: string;
  children: ReactNode;
  onMaximize?: () => void;
}

function MetricCard({ title, timeRange, children, onMaximize }: MetricCardProps) {
  return (
    <div
      data-testid="metric-card"
      className={cn(
        'bg-surface border border-border rounded-[10px] p-4',
        'flex flex-col gap-2.5 font-[inherit]'
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <div
          className="text-[13px] font-semibold text-text-primary overflow-hidden text-ellipsis whitespace-nowrap"
          title={title}
        >
          {title}
        </div>
        <div className="flex items-center gap-1.5">
          {timeRange && (
            <span className="inline-block px-2 py-0.5 rounded-sm text-[11px] font-semibold bg-surface-hover text-text-secondary leading-[1.4] whitespace-nowrap">
              {timeRange}
            </span>
          )}
          {onMaximize && (
            <button
              data-testid="metric-card-maximize"
              onClick={onMaximize}
              aria-label={`Maximize ${title}`}
              className="border-none bg-transparent text-text-tertiary cursor-pointer text-sm px-1 py-0.5 font-[inherit]"
            >
              ⛶
            </button>
          )}
        </div>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}

export default MetricCard;

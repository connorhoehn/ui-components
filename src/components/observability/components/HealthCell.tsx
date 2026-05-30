// HealthCell — single node-health tile used inside <HealthGrid>.
//
// Renders status-tinted background, border accent, StatusDot + label,
// reason (or status fallback) sub-line. Smooth 300ms transition on status
// change, baked into the primitive (the demos' old hand-rolled grids had
// to set `transition: all 0.3s ease` inline; this primitive does it).

import type { CSSProperties, ReactNode } from 'react';
import { cn } from '../../../lib/cn';
import StatusDot from '../../shared/StatusDot';

export type HealthStatus = 'healthy' | 'degraded' | 'down' | 'unknown';

export interface HealthCellProps {
  status: HealthStatus;
  label: ReactNode;
  /** Detail line under the label. Falls back to the status string. */
  reason?: ReactNode;
  /** Tighter padding when used in dense grids. */
  dense?: boolean;
  className?: string;
  style?: CSSProperties;
  'data-testid'?: string;
}

const DOT_COLOR: Record<HealthStatus, string> = {
  healthy: 'var(--color-success)',
  degraded: 'var(--color-warning)',
  down: 'var(--color-danger)',
  unknown: 'var(--color-text-tertiary)',
};

const BG_CLASS: Record<HealthStatus, string> = {
  healthy: 'bg-[var(--color-success-bg)] border-[var(--color-success-border)]',
  degraded: 'bg-[var(--color-warning-bg)] border-[var(--color-warning-border)]',
  down: 'bg-[var(--color-danger-bg)] border-[var(--color-danger-border)]',
  unknown: 'bg-[var(--color-surface)] border-[var(--color-border)]',
};

export function HealthCell({
  status,
  label,
  reason,
  dense = false,
  className,
  style,
  'data-testid': testId = `health-cell-${status}`,
}: HealthCellProps) {
  return (
    <div
      data-testid={testId}
      data-status={status}
      className={cn(
        'rounded-md border transition-colors duration-300',
        dense ? 'px-2.5 py-2' : 'px-3 py-2.5',
        BG_CLASS[status],
        className,
      )}
      style={style}
    >
      <div className="flex items-center gap-1.5">
        <StatusDot size="xs" color={DOT_COLOR[status]} aria-label={status} />
        <span className="text-[11px] font-semibold text-[var(--color-text-primary)]">
          {label}
        </span>
      </div>
      <div className="mt-1 text-[10px] text-[var(--color-text-tertiary)]">
        {reason ?? status}
      </div>
    </div>
  );
}

export default HealthCell;

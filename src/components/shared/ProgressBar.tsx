// ProgressBar — generic horizontal progress indicator.
//
// Optional label row above the track shows the label on the left and either
// "{value}/{max}" or "{pct}%" on the right.

import type { CSSProperties, ReactNode } from 'react';
import { cn } from '../../lib/cn';

export type ProgressBarSize = 'sm' | 'md';

const TRACK_HEIGHT: Record<ProgressBarSize, string> = {
  sm: 'h-1.5',
  md: 'h-2',
};

export interface ProgressBarProps {
  value: number;
  /** Maximum value. Defaults to 100. */
  max?: number;
  /** Fill color. Defaults to var(--color-primary). */
  color?: string;
  size?: ProgressBarSize;
  label?: ReactNode;
  /** When true (default), shows "{value}/{max}". Otherwise shows percentage. */
  showRatio?: boolean;
  className?: string;
  style?: CSSProperties;
  'data-testid'?: string;
  'aria-label'?: string;
}

export function ProgressBar({
  value,
  max = 100,
  color,
  size = 'md',
  label,
  showRatio = true,
  className,
  style,
  'data-testid': testId,
  'aria-label': ariaLabel,
}: ProgressBarProps) {
  const safeMax = max > 0 ? max : 100;
  const clamped = Math.max(0, Math.min(value, safeMax));
  const pct = Math.min(100, (clamped / safeMax) * 100);
  const fillColor = color ?? 'var(--color-primary)';

  return (
    <div data-testid={testId} className={cn('w-full', className)} style={style}>
      {label != null && (
        <div className="flex items-center justify-between mb-1 text-[12px] text-[var(--color-text-secondary)]">
          <span>{label}</span>
          <span className="text-[var(--color-text-tertiary)] tabular-nums">
            {showRatio ? `${clamped}/${safeMax}` : `${Math.round(pct)}%`}
          </span>
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={safeMax}
        aria-label={ariaLabel}
        className={cn(
          'w-full rounded-full overflow-hidden bg-[var(--color-surface-hover)]',
          TRACK_HEIGHT[size],
        )}
      >
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{ width: `${pct}%`, background: fillColor }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;

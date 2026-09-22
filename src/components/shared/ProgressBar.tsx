// ProgressBar — generic horizontal progress indicator.
//
// Optional label row above the track shows the label on the left and either
// "{value}/{max}" or "{pct}%" on the right.

import type { CSSProperties, ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { TONE_TEXT, toneKey, toneVar, type ToneOrAlias } from './tones';

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
  /**
   * Tone the fill (and the value readout) switches to once the bar is full.
   *
   * A completion bar that turns green at 100% is a different signal from one
   * that just reaches the right-hand edge, and reproducing it meant computing
   * the colour outside and passing `color`, then hand-writing a second
   * coloured `<span>` for the percentage — which is how the checklist reader
   * ended up with its own label row instead of using this one. Default
   * undefined: the bar keeps `color` at every value.
   */
  completeTone?: ToneOrAlias;
  label?: ReactNode;
  /**
   * Right-hand readout, replacing the computed ratio/percentage. Use it for a
   * caption the arithmetic here can't produce (a remaining count, an ETA).
   */
  valueLabel?: ReactNode;
  /** When true (default), shows "{value}/{max}". Otherwise shows percentage. */
  showRatio?: boolean;
  /** Extra classes on the label row, for a caller matching a nearby caption size. */
  labelClassName?: string;
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
  completeTone,
  label,
  valueLabel,
  showRatio = true,
  labelClassName,
  className,
  style,
  'data-testid': testId,
  'aria-label': ariaLabel,
}: ProgressBarProps) {
  const safeMax = max > 0 ? max : 100;
  const clamped = Math.max(0, Math.min(value, safeMax));
  const pct = Math.min(100, (clamped / safeMax) * 100);
  const completeKey = completeTone !== undefined && pct >= 100 ? toneKey(completeTone) : null;
  const fillColor = completeKey
    ? toneVar(completeKey)
    : color ?? 'var(--color-primary)';

  return (
    <div data-testid={testId} className={cn('w-full', className)} style={style}>
      {label != null && (
        <div
          className={cn(
            'flex items-center justify-between mb-1 text-[12px] text-[var(--color-text-secondary)]',
            labelClassName,
          )}
        >
          <span>{label}</span>
          <span
            className={cn(
              'tabular-nums',
              completeKey
                ? TONE_TEXT[completeKey]
                : 'text-[var(--color-text-tertiary)]',
            )}
          >
            {valueLabel ?? (showRatio ? `${clamped}/${safeMax}` : `${Math.round(pct)}%`)}
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

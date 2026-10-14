// DotMeter — a discrete progress meter drawn as filled and hollow dots.
//
//   current  ●●●●●○○○○○  55%  ⟳ 2hr 4min
//
// A continuous bar reads as "roughly half"; ten dots read as "five of ten",
// which is what a budget or a quota actually is. The form comes from terminal
// status lines, where it survives being rendered in a monospace grid.
//
// Deliberately not a `<progress>`: the whole point is the discrete quantum,
// and the label row carries the reset time, which no native control has a
// slot for.

import { cn } from '../../lib/cn';

export type DotMeterTone = 'code' | 'surface';

export interface DotMeterProps {
  /** Row label, e.g. `current` / `weekly`. Omit for a bare meter. */
  label?: string;
  /** 0–1. Values outside the range are clamped rather than overflowing. */
  value: number;
  /** Number of dots. Ten is the default because it reads as a percentage. */
  segments?: number;
  /** Show the value as a percentage after the dots. Default true. */
  showPercent?: boolean;
  /**
   * Trailing note, conventionally the reset time (`⟳ Sun 10:00pm`). This is
   * the field that makes a quota meter actionable — "89% used" is alarming
   * until you know it resets in nine minutes.
   */
  note?: string;
  /**
   * Fraction above which the meter reads as spent. Default 0.85. Below it the
   * meter is neutral: a half-used budget is not a warning.
   */
  warnAbove?: number;
  tone?: DotMeterTone;
  className?: string;
  'data-testid'?: string;
}

const TONE = {
  code: {
    label: 'text-code-muted',
    filled: 'bg-code-blue',
    warn: 'bg-code-peach',
    empty: 'bg-code-raised',
    value: 'text-code-subtle',
    note: 'text-code-muted',
  },
  surface: {
    label: 'text-text-tertiary',
    filled: 'bg-primary',
    warn: 'bg-warning',
    empty: 'bg-border',
    value: 'text-text-secondary',
    note: 'text-text-tertiary',
  },
} as const;

export function DotMeter({
  label,
  value,
  segments = 10,
  showPercent = true,
  note,
  warnAbove = 0.85,
  tone = 'code',
  className,
  'data-testid': testId,
}: DotMeterProps) {
  const palette = TONE[tone];
  const safe = Number.isFinite(value) ? Math.min(1, Math.max(0, value)) : 0;
  const percent = Math.round(safe * 100);
  // Round rather than floor so a nearly-full meter does not sit one dot short
  // of full at 99%, but never claim a full row below 100%.
  const filled = safe >= 1 ? segments : Math.min(segments - 1, Math.round(safe * segments));
  const warn = safe > warnAbove;

  return (
    <div
      data-testid={testId}
      className={cn('flex items-center gap-2 text-[12px] font-mono leading-none', className)}
      role="meter"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label ? `${label}: ${percent}%${note ? `, ${note}` : ''}` : undefined}
    >
      {label != null && <span className={cn('w-14 shrink-0 truncate', palette.label)}>{label}</span>}
      <span aria-hidden="true" className="flex items-center gap-[3px] shrink-0">
        {Array.from({ length: segments }, (_, i) => (
          <span
            key={i}
            className={cn(
              'w-[5px] h-[5px] rounded-full',
              i < filled ? (warn ? palette.warn : palette.filled) : palette.empty,
            )}
          />
        ))}
      </span>
      {showPercent && <span className={cn('w-8 shrink-0 tabular-nums', palette.value)}>{percent}%</span>}
      {note != null && <span className={cn('truncate', palette.note)}>{note}</span>}
    </div>
  );
}

export default DotMeter;

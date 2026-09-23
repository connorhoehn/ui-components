// EstimateRow — one "label · value" row of a run draft's estimate (cost or
// duration), plus the pure formatters behind it.
//
// Why typed numbers only: an estimate is a claim about money and time, so it
// has to come from real data (a pipeline's own completed runs). The row takes
// `{ kind: 'range', low, high, unit }` and formats it itself; there is no
// string escape hatch, so a hard-coded "$0.03" cannot be passed through. With
// no data the host passes `{ kind: 'none', reason }` and the row says the
// reason ("No prior runs") instead of a number.

import { cn } from '../../lib/cn';

export type RunEstimateUnit = 'usd' | 'ms';

export type RunEstimate =
  | { kind: 'range'; low: number; high: number; unit: RunEstimateUnit }
  | { kind: 'none'; reason: string }
  | { kind: 'loading' };

export type RunEstimateConfidenceLevel = 'none' | 'low' | 'medium' | 'high';

/** Sample size → confidence: 0 none, 1–2 low, 3–5 medium, more than 5 high. */
export function confidenceOf(sampleSize: number): RunEstimateConfidenceLevel {
  if (!Number.isFinite(sampleSize) || sampleSize <= 0) return 'none';
  if (sampleSize <= 2) return 'low';
  if (sampleSize <= 5) return 'medium';
  return 'high';
}

/** "No prior runs" for n = 0, else "Low confidence · Based on 2 runs". */
export function confidenceNote(sampleSize: number): string {
  const level = confidenceOf(sampleSize);
  if (level === 'none') return 'No prior runs';
  const n = Math.floor(sampleSize);
  const word = level.charAt(0).toUpperCase() + level.slice(1);
  return `${word} confidence · Based on ${n} ${n === 1 ? 'run' : 'runs'}`;
}

/** Dollars: two decimals, and "<$0.01" for anything above zero but below a cent. */
export function formatUsd(value: number): string {
  if (value > 0 && value < 0.01) return '<$0.01';
  return `$${value.toFixed(2)}`;
}

function trimDecimal(n: number): string {
  return n.toFixed(1).replace(/\.0$/, '');
}

type DurationScale = { divisor: number; suffix: string };

// The unit is picked from the upper bound so both ends share it: seconds under
// a minute, minutes up to 90, hours beyond.
function durationScale(highMs: number): DurationScale {
  if (highMs < 60_000) return { divisor: 1000, suffix: 's' };
  if (highMs <= 90 * 60_000) return { divisor: 60_000, suffix: 'min' };
  return { divisor: 3_600_000, suffix: 'h' };
}

function durationNumber(ms: number, scale: DurationScale): string {
  const v = ms / scale.divisor;
  if (scale.suffix === 's') return v > 0 && v < 1 ? '<1' : String(Math.round(v));
  // Minutes and hours keep one decimal below 10 so 30 s reads "0.5 min", not "1".
  return v < 10 ? trimDecimal(v) : String(Math.round(v));
}

/** Format one duration in ms: "40 s", "6 min", "1.5 h". */
export function formatDuration(ms: number): string {
  const scale = durationScale(ms);
  return `${durationNumber(ms, scale)} ${scale.suffix}`;
}

/**
 * The display text for an estimate. Ranges read "$0.03 – $0.30" or
 * "1 – 6 min"; equal ends collapse to one value. A range whose numbers are
 * not finite or are negative is not an estimate — it reads "Unavailable"
 * rather than printing NaN.
 */
export function formatEstimate(estimate: RunEstimate): string {
  if (estimate.kind === 'loading') return 'Estimating…';
  if (estimate.kind === 'none') return estimate.reason;
  let { low, high } = estimate;
  if (![low, high].every((v) => Number.isFinite(v) && v >= 0)) return 'Unavailable';
  if (low > high) [low, high] = [high, low];
  if (estimate.unit === 'usd') {
    const a = formatUsd(low);
    const b = formatUsd(high);
    return a === b ? a : `${a} – ${b}`;
  }
  const scale = durationScale(high);
  const a = durationNumber(low, scale);
  const b = durationNumber(high, scale);
  return a === b ? `${a} ${scale.suffix}` : `${a} – ${b} ${scale.suffix}`;
}

export interface EstimateRowProps {
  label: string;
  estimate: RunEstimate;
  className?: string;
  'data-testid'?: string;
}

export function EstimateRow({ label, estimate, className, 'data-testid': testId }: EstimateRowProps) {
  const hasValue = estimate.kind === 'range';
  return (
    <div
      className={cn('flex items-center justify-between gap-3 py-2.5 text-[13px]', className)}
      data-testid={testId}
      data-estimate-kind={estimate.kind}
    >
      <span className="text-text-secondary">{label}</span>
      <span
        className={cn(
          'text-right tabular-nums',
          hasValue ? 'font-semibold text-text-primary' : 'text-text-tertiary',
        )}
        aria-busy={estimate.kind === 'loading' || undefined}
      >
        {formatEstimate(estimate)}
      </span>
    </div>
  );
}

export default EstimateRow;

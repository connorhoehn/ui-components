// Histogram — a bare bucket distribution: N bars scaled to the largest bucket,
// opacity following each bucket's share, no axes and no legend. Drawn as SVG so
// the geometry is attributes, not inline style; the colour comes from a
// data-accent (see dataAccent.tsx).

import { cn } from '../../lib/cn';
import { dataAccentProps, type DataAccent } from './dataAccent';

export interface HistogramProps {
  /** Counts per bucket, left to right. */
  buckets: readonly number[];
  /** Per-bucket labels; used for the tooltip and the accessible description. */
  labels?: readonly string[];
  accent?: DataAccent;
  /** Plot height in px (default 48). */
  height?: number;
  className?: string;
  'aria-label'?: string;
  'data-testid'?: string;
}

const VB_W = 100;
const GAP = 3;

export function Histogram({ buckets, labels, accent, height = 48, className, 'aria-label': ariaLabel, 'data-testid': testId }: HistogramProps) {
  const n = Math.max(buckets.length, 1);
  const max = Math.max(...buckets, 1);
  const barW = (VB_W - GAP * (n - 1)) / n;
  const describe = buckets.map((c, i) => `${labels?.[i] ?? i + 1}: ${c}`).join(' | ');
  return (
    <svg
      role="img"
      aria-label={ariaLabel ?? `Distribution — ${describe}`}
      data-testid={testId}
      viewBox={`0 0 ${VB_W} ${height}`}
      preserveAspectRatio="none"
      height={height}
      width="100%"
      {...dataAccentProps(accent)}
      className={cn('block w-full', className)}
    >
      <title>{describe}</title>
      {buckets.map((count, i) => {
        const pct = count / max;
        const h = Math.max(2, Math.round(pct * height));
        return (
          <rect
            key={i}
            data-testid={testId ? `${testId}-bar-${i}` : undefined}
            x={i * (barW + GAP)}
            y={height - h}
            width={barW}
            height={h}
            rx={1}
            opacity={0.15 + 0.85 * pct}
            className="fill-[var(--data-accent,var(--color-primary))]"
          />
        );
      })}
    </svg>
  );
}

export default Histogram;

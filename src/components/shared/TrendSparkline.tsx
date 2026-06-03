import { cn } from '../../lib/cn';

export interface TrendSparklineProps {
  /** Y-values, oldest → newest. Empty array renders an empty placeholder. */
  points: number[];
  /** Optional fixed Y-axis bounds. Defaults to data extent + 5% padding. */
  yMin?: number;
  yMax?: number;
  /** Pixel width / height for the SVG viewbox. Default 120x32. */
  width?: number;
  height?: number;
  /** Stroke color — default uses CSS var so tone can be tinted by parent. */
  stroke?: string;
  /** Stroke width in viewbox units. Default 1.5. */
  strokeWidth?: number;
  /** Render the last-point dot. Default true. */
  showLastPoint?: boolean;
  /** Render a fill under the line. Default true. */
  showFill?: boolean;
  /**
   * aria-label override. When omitted, the component synthesizes a label
   * from point count + first/last values.
   */
  ariaLabel?: string;
  className?: string;
}

/**
 * Generic 0..N-point sparkline. Pure SVG, no canvas / chart library.
 * Used by the judge trend chart, but generic enough to be reused
 * elsewhere (request-rate strips, latency mini-charts, etc.).
 *
 * a11y: rendered with `role="img"` + aria-label. The actual SVG is
 * marked `aria-hidden` because polylines aren't screen-reader-meaningful.
 */
export function TrendSparkline({
  points,
  yMin,
  yMax,
  width = 120,
  height = 32,
  stroke = 'currentColor',
  strokeWidth = 1.5,
  showLastPoint = true,
  showFill = true,
  ariaLabel,
  className,
}: TrendSparklineProps) {
  const safe = points.filter((p) => Number.isFinite(p));

  if (safe.length === 0) {
    return (
      <div
        role="img"
        aria-label={ariaLabel ?? 'No trend data'}
        className={cn(
          'inline-flex items-center justify-center text-[10px] text-text-tertiary',
          className,
        )}
        style={{ width, height }}
      >
        —
      </div>
    );
  }

  const dataMin = Math.min(...safe);
  const dataMax = Math.max(...safe);
  const lo = yMin ?? (dataMin === dataMax ? dataMin - 1 : dataMin);
  const hi = yMax ?? (dataMin === dataMax ? dataMax + 1 : dataMax);
  const range = Math.max(1e-9, hi - lo);

  const stepX = safe.length === 1 ? 0 : width / (safe.length - 1);
  const pad = strokeWidth;
  const innerH = height - pad * 2;

  const xy = safe.map((p, i) => {
    const x = safe.length === 1 ? width / 2 : i * stepX;
    const y = pad + innerH - ((p - lo) / range) * innerH;
    return { x, y };
  });

  const linePath = xy.map((pt, i) => `${i === 0 ? 'M' : 'L'}${pt.x.toFixed(2)},${pt.y.toFixed(2)}`).join(' ');
  const fillPath = `${linePath} L${xy[xy.length - 1].x.toFixed(2)},${(height - pad).toFixed(2)} L${xy[0].x.toFixed(2)},${(height - pad).toFixed(2)} Z`;
  const last = xy[xy.length - 1];

  const synthLabel = `Trend, ${safe.length} points, starts ${formatNum(safe[0])}, ends ${formatNum(safe[safe.length - 1])}`;

  return (
    <div
      role="img"
      aria-label={ariaLabel ?? synthLabel}
      className={cn('inline-block align-middle text-text-secondary', className)}
      style={{ width, height }}
    >
      <svg
        aria-hidden
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        style={{ display: 'block' }}
      >
        {showFill ? (
          <path d={fillPath} fill={stroke} fillOpacity={0.12} stroke="none" />
        ) : null}
        <path
          d={linePath}
          fill="none"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {showLastPoint ? (
          <circle cx={last.x} cy={last.y} r={strokeWidth * 1.5} fill={stroke} />
        ) : null}
      </svg>
    </div>
  );
}

function formatNum(n: number): string {
  if (Math.abs(n) >= 100) return n.toFixed(0);
  if (Math.abs(n) >= 1) return n.toFixed(2);
  return n.toFixed(3);
}

export default TrendSparkline;

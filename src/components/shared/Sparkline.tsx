// frontend/src/components/shared/Sparkline.tsx
//
// Minimal inline-SVG sparkline. Normalizes `data` to a viewBox and renders a
// single polyline. Tiny, dependency-free.

export interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  /**
   * Where the bottom of the plot sits.
   *
   * - `'min'` (default) — the smallest sample is pinned to the bottom edge, so
   *   the line always fills the box. Best for shape-of-the-change questions
   *   ("is it wobbling?") where the absolute level doesn't matter.
   * - `'zero'` — the bottom edge is 0 (or the series minimum, if any sample is
   *   negative). Small variation around a large value then reads as the nearly
   *   flat line it actually is. Use this for rates, counts and anything else
   *   where magnitude carries meaning, otherwise [100, 101, 102] draws the same
   *   dramatic climb as [0, 50, 100].
   * - a number — pin the bottom edge to that value explicitly.
   */
  baseline?: 'min' | 'zero' | number;
}

// Default stroke follows the brand token rather than a literal. The old
// default was 'var(--color-primary)' — Vite-template indigo, not this library's primary —
// and being a string value it was invisible to the tones guard, which scans
// for palette utility classes.
function Sparkline({
  data,
  width = 80,
  height = 20,
  color = 'var(--color-primary)',
  baseline = 'min',
}: SparklineProps) {
  if (!data || data.length === 0) {
    return <svg width={width} height={height} aria-hidden="true" />;
  }

  const dataMin = Math.min(...data);
  const floor =
    baseline === 'min' ? dataMin
    : baseline === 'zero' ? Math.min(0, dataMin)
    : Math.min(baseline, dataMin);

  const min = floor;
  const max = Math.max(...data, floor);
  const range = max - min || 1;
  const stepX = data.length > 1 ? width / (data.length - 1) : 0;

  const points = data
    .map((v, i) => {
      const x = i * stepX;
      const y = height - ((v - min) / range) * height;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(' ');

  return (
    <svg
      data-testid="sparkline"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className="block"
    >
      <polyline fill="none" stroke={color} strokeWidth={1.5} points={points} />
    </svg>
  );
}

export default Sparkline;

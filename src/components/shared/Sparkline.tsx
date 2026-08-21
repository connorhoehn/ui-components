// frontend/src/components/shared/Sparkline.tsx
//
// Minimal inline-SVG sparkline. Normalizes `data` to a viewBox and renders a
// single polyline. Tiny, dependency-free.

export interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
}

// Default stroke follows the brand token rather than a literal. The old
// default was 'var(--color-primary)' — Vite-template indigo, not this library's primary —
// and being a string value it was invisible to the tones guard, which scans
// for palette utility classes.
function Sparkline({ data, width = 80, height = 20, color = 'var(--color-primary)' }: SparklineProps) {
  if (!data || data.length === 0) {
    return <svg width={width} height={height} aria-hidden="true" />;
  }

  const min = Math.min(...data);
  const max = Math.max(...data);
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

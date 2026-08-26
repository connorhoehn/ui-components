import type { CSSProperties } from 'react';
import { cn } from '../../lib/cn';

export interface StreamMetrics {
  bitrateBps: number;
  fps: number;
  resolution: { width: number; height: number };
  packetsLost: number;
  jitter?: number;
}

export interface StatsCardProps {
  metrics: StreamMetrics | null;
  /**
   * Sizing / positioning classes from the caller. Prefer this over `style`:
   * the card has no intrinsic width, so every consumer was wrapping it in a
   * `<div>` purely to size it — inline styles are banned in demos and
   * stories. Applied to BOTH the empty and populated states, and composed
   * through `cn()` so a caller class wins.
   */
  className?: string;
  /** @deprecated Use `className`. Kept so existing callers keep compiling. */
  style?: CSSProperties;
}

function formatBitrate(bps: number): string {
  if (bps >= 1_000_000) return `${(bps / 1_000_000).toFixed(1)} Mbps`;
  if (bps >= 1_000) return `${(bps / 1_000).toFixed(0)} Kbps`;
  return `${bps} bps`;
}

// Surfaces use `bg-call-chrome` (theme-invariant, see styles.css) rather
// than `bg-surface-inverse`: this card overlays the call stage and its
// values are painted in the light `--color-code-text`, so a surface that
// flipped to near-white in dark mode erased them.
export function StatsCard({ metrics, className, style }: StatsCardProps) {
  if (!metrics) {
    return (
      <div className={cn('p-3 bg-call-chrome rounded-lg text-text-tertiary text-xs', className)} style={style}>
        No stream data
      </div>
    );
  }

  const rows: [string, string][] = [
    ['Bitrate', formatBitrate(metrics.bitrateBps)],
    ['FPS', `${metrics.fps}`],
    ['Resolution', `${metrics.resolution.width}×${metrics.resolution.height}`],
    ['Packets Lost', `${metrics.packetsLost}`],
  ];
  if (metrics.jitter !== undefined) {
    rows.push(['Jitter', `${metrics.jitter.toFixed(1)} ms`]);
  }

  return (
    <div className={cn('p-3 bg-call-chrome rounded-lg text-xs text-code-text', className)} style={style}>
      {rows.map(([label, value]) => (
        <div key={label} className={cn('flex justify-between py-[3px]')}>
          <span className={cn('text-text-tertiary')}>{label}</span>
          <span className={cn('font-mono')}>{value}</span>
        </div>
      ))}
    </div>
  );
}

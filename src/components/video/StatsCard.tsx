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
  style?: CSSProperties;
}

function formatBitrate(bps: number): string {
  if (bps >= 1_000_000) return `${(bps / 1_000_000).toFixed(1)} Mbps`;
  if (bps >= 1_000) return `${(bps / 1_000).toFixed(0)} Kbps`;
  return `${bps} bps`;
}

export function StatsCard({ metrics, style }: StatsCardProps) {
  if (!metrics) {
    return (
      <div className={cn('p-3 bg-[#1e293b] rounded-lg text-[#94a3b8] text-xs')} style={style}>
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
    <div className={cn('p-3 bg-[#1e293b] rounded-lg text-xs text-[#e2e8f0]')} style={style}>
      {rows.map(([label, value]) => (
        <div key={label} className={cn('flex justify-between py-[3px]')}>
          <span className={cn('text-[#94a3b8]')}>{label}</span>
          <span className={cn('font-mono')}>{value}</span>
        </div>
      ))}
    </div>
  );
}

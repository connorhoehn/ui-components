import type { CSSProperties } from 'react';

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
      <div style={{ padding: 12, background: '#1e293b', borderRadius: 8, color: '#94a3b8', fontSize: 12, ...style }}>
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
    <div style={{ padding: 12, background: '#1e293b', borderRadius: 8, fontSize: 12, color: '#e2e8f0', ...style }}>
      {rows.map(([label, value]) => (
        <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0' }}>
          <span style={{ color: '#94a3b8' }}>{label}</span>
          <span style={{ fontFamily: 'monospace' }}>{value}</span>
        </div>
      ))}
    </div>
  );
}

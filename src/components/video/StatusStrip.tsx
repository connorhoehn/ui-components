import type { CSSProperties } from 'react';
import type { PlayerPhase } from './VideoPlayer';

export interface StatusStripProps {
  phase: PlayerPhase | 'live' | 'reconnecting';
  bitrateBps?: number;
  viewerCount?: number;
  duration?: number;
  style?: CSSProperties;
}

function formatBitrate(bps: number): string {
  if (bps >= 1_000_000) return `${(bps / 1_000_000).toFixed(1)} Mbps`;
  return `${(bps / 1_000).toFixed(0)} Kbps`;
}

function formatDuration(sec: number): string {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = Math.floor(sec % 60);
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${m}:${String(s).padStart(2, '0')}`;
}

const phaseColors: Record<string, string> = {
  live: '#22c55e',
  playing: '#22c55e',
  connecting: '#eab308',
  reconnecting: '#eab308',
  buffering: '#eab308',
  idle: '#94a3b8',
  error: '#ef4444',
};

export function StatusStrip({ phase, bitrateBps, viewerCount, duration, style }: StatusStripProps) {
  const color = phaseColors[phase] || '#94a3b8';
  const label = phase === 'playing' ? 'LIVE' : phase.toUpperCase();

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '6px 12px',
      background: '#0f172a',
      borderRadius: 6,
      fontSize: 12,
      color: '#e2e8f0',
      fontFamily: 'monospace',
      ...style,
    }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <span style={{
          width: 7,
          height: 7,
          borderRadius: '50%',
          background: color,
          boxShadow: phase === 'live' || phase === 'playing' ? `0 0 6px ${color}` : 'none',
        }} />
        <span style={{ color, fontWeight: 600 }}>{label}</span>
      </span>
      {bitrateBps !== undefined && <span>{formatBitrate(bitrateBps)}</span>}
      {duration !== undefined && <span>{formatDuration(duration)}</span>}
      {viewerCount !== undefined && (
        <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
            <circle cx="5" cy="4" r="2" />
            <path d="M1 9a4 4 0 0 1 8 0" />
          </svg>
          {viewerCount}
        </span>
      )}
    </div>
  );
}

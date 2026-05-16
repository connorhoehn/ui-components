import type { CSSProperties } from 'react';
import { cn } from '../../lib/cn';
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

const phaseDotClasses: Record<string, string> = {
  live: 'bg-green-500 shadow-[0_0_6px_#22c55e]',
  playing: 'bg-green-500 shadow-[0_0_6px_#22c55e]',
  connecting: 'bg-yellow-500',
  reconnecting: 'bg-yellow-500',
  buffering: 'bg-yellow-500',
  idle: 'bg-slate-400',
  error: 'bg-red-500',
};

const phaseTextClasses: Record<string, string> = {
  live: 'text-green-500',
  playing: 'text-green-500',
  connecting: 'text-yellow-500',
  reconnecting: 'text-yellow-500',
  buffering: 'text-yellow-500',
  idle: 'text-slate-400',
  error: 'text-red-500',
};

export function StatusStrip({ phase, bitrateBps, viewerCount, duration, style }: StatusStripProps) {
  const label = phase === 'playing' ? 'LIVE' : phase.toUpperCase();

  return (
    <div className={cn('inline-flex items-center gap-4 px-4 py-2 bg-[#0f172a] rounded-md text-xs text-[#e2e8f0] font-mono')} style={style}>
      <span className={cn('flex items-center gap-1')}>
        <span className={cn('w-[7px] h-[7px] rounded-full', phaseDotClasses[phase] ?? 'bg-slate-400')} />
        <span className={cn('font-semibold', phaseTextClasses[phase] ?? 'text-slate-400')}>{label}</span>
      </span>
      {bitrateBps !== undefined && <span>{formatBitrate(bitrateBps)}</span>}
      {duration !== undefined && <span>{formatDuration(duration)}</span>}
      {viewerCount !== undefined && (
        <span className={cn('flex items-center gap-[3px]')}>
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

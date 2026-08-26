import type { CSSProperties } from 'react';
import { cn } from '../../lib/cn';
import type { PlayerPhase } from './VideoPlayer';

export interface StatusStripProps {
  phase: PlayerPhase | 'live' | 'reconnecting';
  bitrateBps?: number;
  viewerCount?: number;
  duration?: number;
  /**
   * Sizing / positioning classes from the caller. Prefer this over `style`:
   * overlaying the strip on a player or widening it previously needed a
   * wrapper `<div>`, because inline styles are banned in demos and stories.
   * Composed through `cn()`, so a caller class wins.
   */
  className?: string;
  /** @deprecated Use `className`. Kept so existing callers keep compiling. */
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
  live: 'bg-success shadow-[0_0_6px_#22c55e]',
  playing: 'bg-success shadow-[0_0_6px_#22c55e]',
  connecting: 'bg-warning',
  reconnecting: 'bg-warning',
  buffering: 'bg-warning',
  idle: 'bg-surface-emphasis',
  error: 'bg-danger',
};

const phaseTextClasses: Record<string, string> = {
  live: 'text-success-fg',
  playing: 'text-success-fg',
  connecting: 'text-warning-fg',
  reconnecting: 'text-warning-fg',
  buffering: 'text-warning-fg',
  idle: 'text-text-tertiary',
  error: 'text-danger-fg',
};

export function StatusStrip({ phase, bitrateBps, viewerCount, duration, className, style }: StatusStripProps) {
  const label = phase === 'playing' ? 'LIVE' : phase.toUpperCase();

  return (
    // `bg-call-chrome` (theme-invariant) — the strip's text is the light
    // --color-code-text, so a flipping surface hid it in dark mode.
    <div className={cn('inline-flex items-center gap-4 px-4 py-2 bg-call-chrome rounded-md text-xs text-code-text font-mono', className)} style={style}>
      <span className={cn('flex items-center gap-1')}>
        <span className={cn('w-[7px] h-[7px] rounded-full', phaseDotClasses[phase] ?? 'bg-surface-emphasis')} />
        <span className={cn('font-semibold', phaseTextClasses[phase] ?? 'text-text-tertiary')}>{label}</span>
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

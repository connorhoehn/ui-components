// src/components/video/CallStatsOverlay.tsx
//
// Floating diagnostics overlay for an in-progress call. Surfaces
// network-quality, bitrate, latency, and packet-loss in a compact box
// the caller can drop into the corner of the video area. Renders
// `null` when no stats are provided so the caller doesn't need its
// own visibility gate.
//
// Reuses `NetworkQualityBadge` from the same module for the quality
// glyph + label.

import type { CSSProperties } from 'react';
import { cn } from '../../lib/cn';
import { NetworkQualityBadge, type NetworkQuality } from './NetworkQualityBadge';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface CallStatsOverlayStats {
  networkQuality?: NetworkQuality;
  bitrateKbps?: number;
  latencyMs?: number;
  packetLossPct?: number;
}

export type CallStatsOverlayPosition =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

export interface CallStatsOverlayProps {
  /** When undefined or empty (no fields set), the overlay renders nothing. */
  stats?: CallStatsOverlayStats;
  /** Corner to dock the overlay against its positioned parent. */
  position?: CallStatsOverlayPosition;
  /** Stable data-testid (e2e hook). Defaults to `call-stats-overlay`. */
  testId?: string;
  className?: string;
  style?: CSSProperties;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function hasAnyMetric(stats: CallStatsOverlayStats | undefined): stats is CallStatsOverlayStats {
  if (!stats) return false;
  return (
    stats.networkQuality !== undefined ||
    stats.bitrateKbps !== undefined ||
    stats.latencyMs !== undefined ||
    stats.packetLossPct !== undefined
  );
}

const positionClasses: Record<CallStatsOverlayPosition, string> = {
  'top-left': 'top-2 left-2',
  'top-right': 'top-2 right-2',
  'bottom-left': 'bottom-2 left-2',
  'bottom-right': 'bottom-2 right-2',
};

function formatBitrate(kbps: number): string {
  if (kbps >= 1000) return `${(kbps / 1000).toFixed(1)} Mb/s`;
  return `${Math.round(kbps)} kb/s`;
}

// ---------------------------------------------------------------------------
// CallStatsOverlay
// ---------------------------------------------------------------------------

export function CallStatsOverlay({
  stats,
  position = 'top-left',
  testId = 'call-stats-overlay',
  className,
  style,
}: CallStatsOverlayProps) {
  if (!hasAnyMetric(stats)) return null;

  return (
    <div
      data-testid={testId}
      className={cn(
        'absolute z-10 pointer-events-none',
        positionClasses[position],
        'flex flex-col gap-1.5',
        className,
      )}
      style={style}
    >
      {stats.networkQuality && (
        <NetworkQualityBadge quality={stats.networkQuality} />
      )}
      {(stats.bitrateKbps !== undefined ||
        stats.latencyMs !== undefined ||
        stats.packetLossPct !== undefined) && (
        <div
          data-testid="call-stats-overlay-metrics"
          className="inline-flex flex-col gap-0.5 px-2.5 py-1.5 rounded-md bg-black/60 text-white text-[11px] font-medium font-mono"
        >
          {stats.bitrateKbps !== undefined && (
            <span data-testid="call-stats-bitrate">
              <span className="text-white/50 mr-1.5">bitrate</span>
              {formatBitrate(stats.bitrateKbps)}
            </span>
          )}
          {stats.latencyMs !== undefined && (
            <span data-testid="call-stats-latency">
              <span className="text-white/50 mr-1.5">latency</span>
              {Math.round(stats.latencyMs)} ms
            </span>
          )}
          {stats.packetLossPct !== undefined && (
            <span data-testid="call-stats-packet-loss">
              <span className="text-white/50 mr-1.5">loss</span>
              {stats.packetLossPct.toFixed(1)}%
            </span>
          )}
        </div>
      )}
    </div>
  );
}

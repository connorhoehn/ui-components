// src/components/shared/ConnectionPill.tsx
//
// Canonical connection-status pill. Consolidates duplicate pills that
// otherwise appear in app shells, sidebars, and gateway admin surfaces.
// State transitions are announced via aria-live so screen readers hear
// "Reconnecting…" / "Connected" without focus changes.

import type { ConnectionState } from '../../types/gateway';
import { cn } from '../../lib/cn';
import type { SurfaceTone } from './tones';

/** @see SurfaceTone — which colour family the pill paints in. */
export type ConnectionPillTone = SurfaceTone;

export interface ConnectionPillProps {
  state: ConnectionState;
  /**
   * Colour family. `surface` (default) follows the host theme; `code` paints
   * in the permanently-dark terminal palette.
   *
   * A wrapper `className` cannot substitute: the label and dot colours come
   * from the per-state map below, on children the caller never sees.
   */
  tone?: ConnectionPillTone;
  /** Dot-only rendering — no label text. Default false. */
  compact?: boolean;
  /** Render the text label next to the dot. Default true. Set false for dot-only. */
  withLabel?: boolean;
  /** Override label text per state (e.g. localized strings). */
  labels?: Partial<Record<ConnectionState, string>>;
  className?: string;
  'data-testid'?: string;
}

const STATE_CONFIG: Record<
  ConnectionState,
  { label: string; colorClass: string }
> = {
  idle:         { label: 'Idle',          colorClass: 'text-text-secondary' },
  connecting:   { label: 'Connecting…',   colorClass: 'text-warning-fg' },
  connected:    { label: 'Connected',     colorClass: 'text-success-fg' },
  reconnecting: { label: 'Reconnecting…', colorClass: 'text-warning-fg' },
  disconnected: { label: 'Disconnected',  colorClass: 'text-danger-fg' },
};

/** Colour only — the labels are the same words in either family. */
const CODE_STATE_COLORS: Record<ConnectionState, string> = {
  idle:         'text-code-muted',
  connecting:   'text-code-peach',
  connected:    'text-code-green',
  reconnecting: 'text-code-peach',
  disconnected: 'text-code-red',
};

export function ConnectionPill({
  state,
  tone = 'surface',
  compact = false,
  withLabel = true,
  labels,
  className,
  'data-testid': testId = 'connection-pill',
}: ConnectionPillProps) {
  // This renders in the app shell header, so an unrecognised socket state
  // took the entire top bar down — precisely when the user most needed to see
  // the connection state. Fall back to showing the raw value rather than
  // hiding it: "closing" is more useful than a blank header.
  const cfg = STATE_CONFIG[state] as (typeof STATE_CONFIG)[keyof typeof STATE_CONFIG] | undefined;
  const label = labels?.[state] ?? cfg?.label ?? String(state);
  const showLabel = withLabel && !compact;
  // Same fallback reasoning as `cfg`: an unknown state renders uncoloured
  // rather than throwing on an undefined lookup.
  const colorClass = tone === 'code' ? CODE_STATE_COLORS[state] : cfg?.colorClass;

  return (
    <span
      role="status"
      aria-live="polite"
      aria-label={showLabel ? undefined : label}
      data-testid={testId}
      data-state={state}
      className={cn('inline-flex items-center gap-1.5 font-mono', className)}
    >
      <span aria-hidden="true" className={colorClass}>⬤</span>
      {showLabel && (
        <span className={cn(colorClass, 'font-semibold')}>{label}</span>
      )}
    </span>
  );
}

export default ConnectionPill;

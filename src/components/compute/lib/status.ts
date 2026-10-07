// One status vocabulary for the whole surface.
//
// The list, the header, the dock tab strip and the quick-switch each used to
// carry their own colour map and their own wording, so the same box could be
// a green "idle" in one pane and a grey "ready" two inches away. Everything
// that renders a status reads this table.

import type { Tone } from '../../shared/tones';
import type { ComputeStatus, ShellStatus } from '../types';

export interface StatusMeta {
  /** Short word for chips and dots. */
  label: string;
  /**
   * Design-system tone, for any primitive that takes one.
   *
   * Carried here so the status → colour decision is made once. It was
   * previously re-derived as a four-way ternary in the rail, the pane status
   * line and the chooser, which is three places to forget to update.
   */
  tone: Tone;
  /** A sentence an operator can act on — tooltips and empty states. */
  help: string;
  /** CSS colour for `StatusDot`, taken from the theme's tokens. */
  color: string;
  /** Animate the dot. Reserved for states that are genuinely in motion. */
  pulse: boolean;
}

export const COMPUTE_STATUS: Record<ComputeStatus, StatusMeta> = {
  provisioning: {
    tone: 'info',
    label: 'provisioning',
    help: 'The box has been minted and its microVM is starting. It takes work once it is up.',
    color: 'var(--color-info)',
    pulse: true,
  },
  idle: {
    tone: 'success',
    label: 'idle',
    help: 'Session is up and doing nothing. Give it a task or open a terminal.',
    color: 'var(--color-success)',
    pulse: false,
  },
  running: {
    tone: 'info',
    label: 'running',
    help: 'An agent task is in flight. The timeline below is live.',
    color: 'var(--color-primary)',
    pulse: true,
  },
  waiting: {
    tone: 'warning',
    label: 'needs you',
    help: 'The last run ended by asking a question. Reply with a new task, resume on.',
    color: 'var(--color-warning)',
    pulse: false,
  },
  stopped: {
    tone: 'neutral',
    label: 'stopped',
    help: 'Session is down. The workspace persists — the next task or command resumes it.',
    color: 'var(--color-text-tertiary)',
    pulse: false,
  },
  error: {
    tone: 'danger',
    label: 'error',
    help: 'The last run failed. Open the timeline for what it said.',
    color: 'var(--color-danger)',
    pulse: false,
  },
};

export const SHELL_STATUS: Record<ShellStatus, StatusMeta> = {
  connecting: {
    tone: 'neutral',
    label: 'connecting',
    help: 'Minting a presigned URL and attaching to the PTY.',
    color: 'var(--color-code-muted)',
    pulse: true,
  },
  ready: {
    tone: 'success',
    label: 'ready',
    help: 'Attached and quiet.',
    color: 'var(--color-code-green)',
    pulse: false,
  },
  busy: {
    tone: 'caution',
    // Inferred from frame traffic, not reported: the shell protocol has no
    // busy frame. A command that prints nothing looks idle, which is a limit
    // worth naming rather than papering over.
    label: 'output',
    help: 'Bytes are arriving. Inferred from traffic — a silent command still reads as ready.',
    color: 'var(--color-code-peach)',
    pulse: true,
  },
  detached: {
    tone: 'neutral',
    label: 'detached',
    help: 'Socket dropped, shell still running server-side. Reattach to pick it back up.',
    color: 'var(--color-code-muted)',
    pulse: false,
  },
  error: {
    tone: 'danger',
    label: 'error',
    help: 'Could not attach. The runtime may already hold its ten shells.',
    color: 'var(--color-code-red)',
    pulse: false,
  },
};

/** Normalise a possibly-absent status. The server omits it for a fresh box. */
export function statusOf(computer: { status?: ComputeStatus } | null | undefined): ComputeStatus {
  return computer?.status ?? 'idle';
}

/**
 * How close a box is to being reaped, as a 0–1 fraction, plus whether that is
 * worth drawing attention to.
 *
 * `stopsInMs` alone is a number with no scale — "stops in 4m" means nothing
 * without knowing whether the window was five minutes or an hour. The meter
 * needs a denominator, so callers pass the policy window they know about.
 */
export function expiryPressure(stopsInMs: number, windowMs: number): { fraction: number; urgent: boolean } {
  const remaining = Math.max(0, Math.min(stopsInMs, windowMs));
  const fraction = windowMs > 0 ? remaining / windowMs : 0;
  return { fraction, urgent: stopsInMs < 5 * 60_000 };
}

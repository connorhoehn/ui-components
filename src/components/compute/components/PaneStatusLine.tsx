// The status line at the foot of a pane.
//
// Borrowed wholesale from terminal multiplexers, and worth borrowing: in a
// four-pane window there is no room for a card of metadata per pane, but
// there is always room for one dense monospace line. It answers the three
// questions you ask about a box you are not currently looking at — what model
// is it on, what did the last run cost, and how long before it stops.
//
// The expiry meter is the one that earns its place. `stops in 4m` is a number
// with no scale; a meter you can see draining says the same thing at a
// glance, and says it while your eyes are on a different pane.
//
// PALETTE: this line is PANE-side, and stays on the code family even when the
// lab's chrome has taken the host's theme. It was the one component in the
// surface that could plausibly have gone either way, so the reasoning is worth
// recording. It is read with your eyes on the canvas an inch above it, not on
// the chrome; its colours mean things against a dark ground (peach = context
// nearly spent, blue = which project this box is charged to); and flipping it
// would put a light bar between the terminal and the frame's bottom edge —
// a second colour change inside one pane, where there is currently none. The
// boundary the whole lab uses is the frame border, and this sits inside it.
// See `../lib/chromeTokens` for where the remap is applied.

import { Fragment, type ReactNode } from 'react';
import { cn } from '../../../lib/cn';
import DotMeter from '../../shared/DotMeter';
import Chip from '../../shared/Chip';
import { COMPUTE_STATUS, expiryPressure, statusOf } from '../lib/status';
import type { Computer, ComputeModel } from '../types';

/**
 * Denominator for the expiry meter.
 *
 * The reaper's idle window is server policy and is not reported, so the meter
 * needs an assumed full scale. An hour matches the reference deployment; a
 * host running a different policy passes its own rather than watching every
 * box render as permanently nearly-full.
 */
export const DEFAULT_IDLE_WINDOW_MS = 60 * 60_000;

/** `us.anthropic.claude-sonnet-5` is not a name anyone wants in a status line. */
export function shortModelName(id: string | null | undefined, models: ComputeModel[] = []): string {
  if (!id) return '—';
  const known = models.find((m) => m.id === id);
  if (known) return known.label;
  return id
    .replace(/^[a-z]{2,3}\.(anthropic|amazon|meta)\./, '')
    .replace(/-\d{8}-v\d+:\d+$/, '')
    .replace(/-v\d+:\d+$/, '');
}

function formatDuration(ms: number): string {
  const minutes = Math.round(ms / 60_000);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ${minutes % 60}m`;
}

export interface PaneStatusLineProps {
  computer: Computer;
  /** Model this pane is set to run with, if the runtime honours per-task models. */
  modelId?: string | null;
  models?: ComputeModel[];
  /** Denominator for the expiry meter. */
  idleWindowMs?: number;
  /** True when this pane is one of the broadcast targets. */
  broadcasting?: boolean;
  /** Right-hand mode text, e.g. `resume on`. */
  mode?: string;
  /**
   * `full` (default) is the three-row status bar under a classic pane.
   * `meta` is one quiet line of the same facts — model · ctx · cost ·
   * auto-stop · mode — for the workspace lab's pane header, which carries the
   * status as a badge of its own and has no room for a meter.
   */
  variant?: 'full' | 'meta';
  /** Extra trailing fields for `meta` — an agent pane's elapsed time, say. */
  extra?: ReactNode;
  className?: string;
  'data-testid'?: string;
}

export function PaneStatusLine({
  computer,
  modelId,
  models = [],
  idleWindowMs = DEFAULT_IDLE_WINDOW_MS,
  broadcasting = false,
  mode,
  variant = 'full',
  extra,
  className,
  'data-testid': testId,
}: PaneStatusLineProps) {
  if (variant === 'meta') {
    const result = computer.lastResult;
    const cost = result?.costUsd ?? computer.spendUsd;
    const fields: ReactNode[] = [
      <span key="model">{shortModelName(computer.activeModel ?? modelId ?? null, models)}</span>,
    ];
    if (computer.contextUsed != null) {
      fields.push(
        <span
          key="ctx"
          title="Share of the agent's context window in use"
          className={cn('tabular-nums', computer.contextUsed > 0.85 && 'text-warning')}
        >
          ctx {Math.round(computer.contextUsed * 100)}%
        </span>,
      );
    }
    // Absent stays absent: "$—" says "not reported", a confident $0 would
    // say "free".
    fields.push(<span key="cost" className="tabular-nums">{cost != null ? `$${cost.toFixed(4)}` : '$—'}</span>);
    if (computer.stopsInMs != null) {
      fields.push(
        <span key="stop" className="tabular-nums" title="Until the reaper stops this computer">
          auto-stop {formatDuration(computer.stopsInMs)}
        </span>,
      );
    }
    if (extra) fields.push(<span key="extra" className="tabular-nums">{extra}</span>);
    if (broadcasting) fields.push(<span key="bc" className="text-warning">broadcast</span>);
    if (mode) fields.push(<span key="mode" className="uppercase">{mode}</span>);
    return (
      <span
        data-testid={testId}
        className={cn('inline-flex items-center gap-1.5 min-w-0 text-[11px] text-text-tertiary truncate', className)}
      >
        {fields.map((field, i) => (
          <Fragment key={i}>
            {i > 0 && <span aria-hidden="true">·</span>}
            {field}
          </Fragment>
        ))}
      </span>
    );
  }

  const status = statusOf(computer);
  const meta = COMPUTE_STATUS[status];
  const result = computer.lastResult;
  const expiry = computer.stopsInMs != null ? expiryPressure(computer.stopsInMs, idleWindowMs) : null;

  return (
    <div
      data-testid={testId}
      className={cn(
        'flex flex-col gap-0.5 px-2 py-1 border-t border-code-border bg-code-panel font-mono select-none shrink-0',
        className,
      )}
    >
      {/* Identity row — model, context, cost, and what it is working on.
          The project is right-aligned and given the room because it is the
          field that makes a wall of `computer-1..6` readable. */}
      <div className="flex items-center gap-2 text-[10px] leading-none min-w-0">
        <span className="text-code-mauve shrink-0">
          {shortModelName(computer.activeModel ?? modelId ?? null, models)}
        </span>
        {computer.contextUsed != null && (
          <>
            <span aria-hidden="true" className="text-code-raised">│</span>
            <span
              className={cn(
                'shrink-0 tabular-nums',
                computer.contextUsed > 0.85 ? 'text-code-peach' : 'text-code-muted',
              )}
              title="Share of the agent's context window in use"
            >
              ctx {Math.round(computer.contextUsed * 100)}%
            </span>
          </>
        )}
        <span aria-hidden="true" className="text-code-raised">│</span>
        <span className="text-code-subtle shrink-0 tabular-nums">
          {result ? `$${result.costUsd.toFixed(4)}` : '$—'}
        </span>
        <span className="flex-1 min-w-0" />
        {computer.project ? (
          <span
            className="text-code-blue truncate"
            title={computer.workspace ? `${computer.project} — ${computer.workspace}` : computer.project}
          >
            {computer.project}
          </span>
        ) : (
          <span className="text-code-muted truncate">{computer.label}</span>
        )}
      </div>

      {/* The meter that actually changes while you are not looking. */}
      {expiry && (
        <DotMeter
          label="expires"
          // Inverted on purpose: the meter fills as the box runs *out* of
          // time, so a full row is the alarming state in both meters rather
          // than one filling up and one draining down.
          value={1 - expiry.fraction}
          note={computer.stopsInMs != null ? `⟳ stops in ${formatDuration(computer.stopsInMs)}` : undefined}
          warnAbove={0.9}
          tone="code"
        />
      )}

      {/* Mode row — the vim-ish line. Says what typing here will do. */}
      <div className="flex items-center gap-2 text-[10px] leading-none min-w-0">
        <Chip
          size="xs"
          mono
          uppercase
          tone={meta.tone}
          title={meta.help}
          // Transparent because this is a dense status line, not a chip row:
          // the tone should reach the text and stop there.
          className="bg-transparent px-0 shrink-0"
        >
          {meta.label}
        </Chip>
        {broadcasting && (
          <Chip size="xs" mono tone="caution" title="The prompt bar reaches this pane" className="shrink-0">
            ▶▶ broadcast
          </Chip>
        )}
        {mode && <span className="text-code-muted truncate">{mode}</span>}
        <span className="flex-1" />
        {computer.currentTask && (
          <span className="text-code-comment truncate max-w-[60%]" title={computer.currentTask}>
            {computer.currentTask}
          </span>
        )}
      </div>
    </div>
  );
}

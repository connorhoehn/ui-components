// Watch a box without owning it.
//
// This used to be an "agent pane" with its own prompt box, which was a
// mistake: a textarea that looks like a terminal and is not one teaches you
// that Enter means newline, and there is no reason to rebuild a shell badly
// when a real one is one keystroke away. Input belongs in a terminal pane.
//
// What is left is the half that a terminal cannot do — a read-only tail of
// whatever is running on the box, including runs nobody in this browser
// started: a cron bot, the job dispatcher, another operator. It costs no
// shell slot, so you can keep six of them open and watch the fleet.

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { cn } from '../../../lib/cn';
import Chip from '../../shared/Chip';
import { Link } from '../../shared/Link';
import RisingParticles from '../../shared/RisingParticles';
import { useCompute } from '../context/ComputeContext';
import { useComputeTail } from '../hooks/useComputeTail';
import type { TaskStep } from '../hooks/useComputeTask';
import type { PaneKindContext } from '../lib/paneKinds';
import { statusOf } from '../lib/status';
import type { Computer } from '../types';

// `job` and `job_end` render as their own banners below, never through this
// row path — kept here anyway so the Record stays exhaustive over every
// `TaskStep['kind']` rather than silently compiling a gap the next kind adds.
const STEP_TONE: Record<TaskStep['kind'], string> = {
  meta: 'text-code-blue',
  text: 'text-code-subtle',
  tool: 'text-code-green',
  result: 'text-code-mauve',
  error: 'text-code-red',
  job: 'text-code-blue',
  job_end: 'text-code-green',
  gate: 'text-code-peach',
  delivery: 'text-code-green',
};

const STEP_GLYPH: Record<TaskStep['kind'], string> = {
  meta: '›',
  text: '·',
  tool: '⚙',
  result: '✓',
  error: '✗',
  job: '▶',
  job_end: '✓',
  gate: '⚠',
  delivery: '⇪',
};

// A long-running bot can produce thousands of tool steps; keeping every one
// in the DOM is what turns a tail pane into the slowest thing on the page.
// This is a VIEW-layer ring buffer, independent of (and typically smaller
// than) `useComputeTail`'s own `maxSteps` — the hook decides what is still
// worth holding in memory, this decides what is worth paying layout for.
const DOM_STEP_CAP = 200;

/** A stable sky per box: the same pane must not re-shuffle its stars on every frame. */
function seedOf(value: string): number {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

export interface TailPaneProps {
  computer: Computer;
  /** Publish a handle so the lab can put the keyboard here. */
  registerPane?: PaneKindContext['registerPane'];
  className?: string;
}

export function TailPane({ computer, registerPane, className }: TailPaneProps) {
  const { client } = useCompute();
  const tail = useComputeTail({ client, boxId: computer.id });
  const logRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef(true);
  const prevLenRef = useRef(0);
  // Mirrors pinnedRef into render — the ref alone drives the scroll-follow
  // decision (cheap, no re-render per scroll tick), but showing/hiding the
  // "following" indicator and the jump control needs a state transition.
  const [pinned, setPinned] = useState(true);
  const [newCount, setNewCount] = useState(0);

  // Re-pin: jump to the live edge and clear the backlog count. Shared by the
  // "N new" button and the End key, so the two affordances can't drift.
  function repin() {
    const node = logRef.current;
    if (node) node.scrollTop = node.scrollHeight;
    pinnedRef.current = true;
    setPinned(true);
    setNewCount(0);
  }

  // No input to give the keyboard to, but the scroll region is still a real
  // focus target: focused, it takes arrow keys and Page Up. Without this,
  // moving to a tail pane would leave focus wherever it was.
  useEffect(() => {
    if (!registerPane) return;
    registerPane({ focus: () => logRef.current?.focus() });
    return () => registerPane(null);
  }, [registerPane]);

  // Follow the tail only while already at the bottom. Yanking the view down
  // while someone is reading further up is the single most annoying thing a
  // live log can do — so when NOT pinned, arriving steps grow a backlog
  // count instead, surfaced by the "N new ↓" control below.
  useLayoutEffect(() => {
    const node = logRef.current;
    const grew = tail.steps.length - prevLenRef.current;
    prevLenRef.current = tail.steps.length;
    if (!node) return;
    if (pinnedRef.current) {
      node.scrollTop = node.scrollHeight;
      if (newCount !== 0) setNewCount(0);
    } else if (grew > 0) {
      setNewCount((n) => n + grew);
    }
    // newCount is read, not a dependency: this effect only ever WRITES it in
    // response to a step-count change, never in response to its own value.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tail.steps]);

  const trimmed = Math.max(0, tail.steps.length - DOM_STEP_CAP);
  const visibleSteps = trimmed > 0 ? tail.steps.slice(-DOM_STEP_CAP) : tail.steps;

  // The box is working, so the pane says so with its own ground. Keyed on the
  // registry status rather than the tail's `running`, because a box a cron bot
  // is driving is still working when this browser's stream has a gap in it.
  const working = statusOf(computer) === 'running';

  return (
    <RisingParticles
      active={working}
      intensity="low"
      seed={seedOf(computer.id)}
      className={cn('flex flex-col h-full min-h-0 bg-code-bg', className)}
      data-testid="tail-pane-particles"
    >
      <div className="shrink-0 flex items-center gap-2 px-2 py-1 border-b border-code-border">
        <Chip size="xs" mono tone={tail.connected ? 'success' : 'neutral'} dot="static">
          {tail.connected ? 'tailing' : 'not connected'}
        </Chip>
        {tail.running && (
          <Chip size="xs" mono tone="info" dot="pulse">
            running
          </Chip>
        )}
        <span className="flex-1" />
        <span className="text-[10px] font-mono text-code-raised">read-only</span>
      </div>

      {/* Relative wrapper so the follow affordance can float over the scroll
          region's bottom edge without becoming scrollable content itself —
          same shape as ChatPanel's "new messages" pill. */}
      <div className="relative flex-1 min-h-0">
        <div
          ref={logRef}
          onScroll={(e) => {
            const el = e.currentTarget;
            const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 32;
            pinnedRef.current = atBottom;
            setPinned(atBottom);
          }}
          onKeyDown={(e) => {
            // The scroll region already takes the keyboard (registerPane).
            // End normally scrolls a focused region to its native bottom;
            // it does NOT re-pin or clear the backlog count on its own, so
            // this does that explicitly rather than leaving the indicator
            // to drift from where the viewport actually landed.
            if (e.key === 'End') {
              e.preventDefault();
              repin();
            }
          }}
          tabIndex={0}
          role="log"
          aria-label={`Activity on ${computer.label}`}
          data-testid="tail-pane-log"
          className="h-full overflow-y-auto px-2 py-1.5 font-mono text-[11px] leading-[1.5] flex flex-col gap-0.5 outline-none focus-visible:ring-1 focus-visible:ring-code-blue focus-visible:ring-inset"
        >
          {trimmed > 0 && (
            <div data-testid="tail-pane-trimmed" className="text-center text-code-raised py-0.5">
              · earlier steps trimmed ({trimmed}) ·
            </div>
          )}

          {tail.error && <div className="text-code-red">{tail.error}</div>}

          {tail.steps.length === 0 && !tail.error ? (
            <div className="text-code-raised">
              {computer.currentTask
                ? `waiting for output · ${computer.currentTask}`
                : 'nothing running on this box — open a terminal pane to start something'}
            </div>
          ) : (
            visibleSteps.map((step, i) => {
              // `job_started` — the dispatcher claiming the box. Answers "why
              // did this suddenly start working" for a run nobody here drove.
              if (step.kind === 'job') {
                return (
                  <div
                    key={i}
                    data-testid="tail-banner-job"
                    className="my-0.5 flex items-center gap-2 rounded border border-code-blue/40 bg-code-blue/10 px-2 py-1"
                  >
                    <span aria-hidden="true" className="text-code-blue">▶</span>
                    <span className="font-semibold text-code-blue break-words min-w-0">{step.text}</span>
                    {step.jobKind && (
                      <span className="ml-auto shrink-0 text-code-comment">{step.jobKind}</span>
                    )}
                  </div>
                );
              }

              // `job_finished` — closes the arc `job_started` opened. Tone
              // carries ok vs failed; this is the dispatcher's own verdict,
              // independent of whatever `devbox_end`/`devbox_error` said.
              if (step.kind === 'job_end') {
                const ok = step.jobOk !== false;
                return (
                  <div
                    key={i}
                    data-testid="tail-banner-job-end"
                    data-ok={ok}
                    className={cn(
                      'my-0.5 flex items-center gap-2 rounded border px-2 py-1 font-semibold',
                      ok
                        ? 'border-code-green/40 bg-code-green/10 text-code-green'
                        : 'border-code-red/40 bg-code-red/10 text-code-red',
                    )}
                  >
                    <span aria-hidden="true">{ok ? '✓' : '✗'}</span>
                    <span>{step.text}</span>
                  </div>
                );
              }

              // An error is a loud banner, not one more coloured row — this
              // is the box telling you it stopped, and it should not blend
              // into the tool-call chatter above it.
              if (step.kind === 'error') {
                return (
                  <div
                    key={i}
                    data-testid="tail-banner-error"
                    className="my-0.5 flex items-start gap-2 rounded border border-code-red/50 bg-code-red/15 px-2 py-1"
                  >
                    <span aria-hidden="true" className="shrink-0 text-code-red">✗</span>
                    <span className="min-w-0 break-words font-semibold text-code-red">{step.text}</span>
                  </div>
                );
              }

              // A dispatch held at a budget gate: nothing ran, and a person
              // has to raise a limit or confirm past it. A warning, not an
              // error — the gate did its job.
              if (step.kind === 'gate' && step.gate) {
                return (
                  <div
                    key={i}
                    data-testid="tail-banner-gate"
                    className="my-0.5 flex items-start gap-2 rounded border border-code-peach/50 bg-code-peach/10 px-2 py-1"
                  >
                    <span aria-hidden="true" className="shrink-0 text-code-peach">{STEP_GLYPH.gate}</span>
                    <span className="min-w-0 break-words text-code-peach">
                      <span className="font-semibold">Held at the {step.gate.gate} gate</span>
                      {step.gate.workItemTitle && <span className="text-code-subtle"> · {step.gate.workItemTitle}</span>}
                      <span className="block text-code-subtle">{step.gate.error}</span>
                      {step.gate.confirmFlag && <span className="block text-code-comment">needs {step.gate.confirmFlag}</span>}
                    </span>
                  </div>
                );
              }

              // The run's change, captured and posted for review.
              if (step.kind === 'delivery' && step.delivery) {
                const d = step.delivery;
                return (
                  <div
                    key={i}
                    data-testid="tail-banner-delivery"
                    className="my-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 rounded border border-code-green/40 bg-code-green/10 px-2 py-1"
                  >
                    <span aria-hidden="true" className="shrink-0 text-code-green">{STEP_GLYPH.delivery}</span>
                    <span className="font-semibold text-code-green">Change posted for review</span>
                    <span className="min-w-0 break-words text-code-subtle">{d.title}</span>
                    {d.commitSha && (
                      <Chip size="xs" mono palette="code" tone="neutral">{d.commitSha.slice(0, 7)}</Chip>
                    )}
                    {d.prUrl ? (
                      <Link href={d.prUrl} external className="text-code-blue">
                        {d.prNumber !== undefined ? `PR #${d.prNumber}` : 'Open PR'}
                      </Link>
                    ) : d.prNumber !== undefined ? (
                      <span className="text-code-comment">PR #{d.prNumber}</span>
                    ) : null}
                  </div>
                );
              }

              // The run's cost story, as chips: this is a cost-centre
              // product, so turns/duration/$ get compact, tabular-nums
              // treatment rather than being buried in a text sentence.
              if (step.kind === 'result' && step.result) {
                const { turns, durationMs, costUsd } = step.result;
                return (
                  <div key={i} data-testid="tail-result-chips" className="my-0.5 flex flex-wrap items-center gap-1.5">
                    <span aria-hidden="true" className={cn('shrink-0 w-3', STEP_TONE.result)}>
                      {STEP_GLYPH.result}
                    </span>
                    <Chip size="xs" mono palette="code" tone="neutral" className="tabular-nums">
                      {turns} turn{turns === 1 ? '' : 's'}
                    </Chip>
                    <Chip size="xs" mono palette="code" tone="neutral" className="tabular-nums">
                      {(durationMs / 1000).toFixed(0)}s
                    </Chip>
                    <Chip size="xs" mono palette="code" tone="accent" className="tabular-nums">
                      ${costUsd.toFixed(4)}
                    </Chip>
                  </div>
                );
              }

              return (
                <div key={i} className="flex gap-1.5 min-w-0">
                  <span aria-hidden="true" className={cn('shrink-0 w-3', STEP_TONE[step.kind])}>
                    {STEP_GLYPH[step.kind]}
                  </span>
                  {step.tool && <span className="shrink-0 text-code-comment">{step.tool}</span>}
                  <span className={cn('min-w-0 break-words', STEP_TONE[step.kind])}>{step.text}</span>
                </div>
              );
            })
          )}
        </div>

        {/* Follow affordance. Quiet while pinned — a live tail is supposed to
            feel like watching, not like being tracked. Once scrolled up,
            arriving steps grow a backlog count instead of yanking the view,
            surfaced as a jump control that re-pins on click (or End). */}
        {pinned ? (
          <div
            aria-hidden="true"
            data-testid="tail-pane-following"
            className="pointer-events-none absolute bottom-1.5 right-2 text-[10px] font-mono text-code-raised"
          >
            following
          </div>
        ) : newCount > 0 ? (
          <button
            data-ui-part=""
            type="button"
            data-testid="tail-pane-jump"
            onClick={repin}
            className="absolute bottom-1.5 left-1/2 -translate-x-1/2 rounded-full border border-code-blue/40 bg-code-blue/20 px-2.5 py-1 text-[10px] font-mono text-code-blue shadow-sm hover:bg-code-blue/30"
          >
            {newCount} new ↓
          </button>
        ) : null}
      </div>
    </RisingParticles>
  );
}

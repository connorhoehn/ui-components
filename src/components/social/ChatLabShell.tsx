// ChatLabShell — the chat column, borrowed by an agent loop.
//
// A `/agent …` command in a conversation starts a long-running loop in a
// cloud computer. That loop is not a message: it has a model, a context
// budget it is spending, a plan of steps it works through, a stream of tool
// calls, and — when the host can mint one — a real PTY into the box. None of
// that fits in a bubble, and moving it to a separate page costs the reader
// the conversation it came out of.
//
// So the column itself changes mode. Where the message list and composer
// were, this shell renders the same three-part shape every terminal
// multiplexer settled on: a dense status line at the top that answers "what
// is it on, what is it spending, how far in", the work in the middle, and one
// prompt line at the bottom. "Back to chat" hands the column back; the loop
// keeps running and stays reachable through `ChatLabPill`.
//
// PALETTE: the shell paints in the code family (`--color-code-*`), not the
// host theme, for the same reason `PaneStatusLine` does — the body of it is a
// log console and, optionally, an xterm canvas, and a light bar above a dark
// terminal reads as a seam. `ComputerLab` remaps those tokens for a host that
// wants the chrome themed; see `compute/lib/chromeTokens`.
//
// HONESTY: `notice` is a first-class prop rather than something the host
// paints over the top, because every state this shell can be in that is *not*
// the real thing — a planner that did not answer and left one fallback step, a
// mock runtime under Tilt — has to say so where the output is, not in a
// tooltip. Individual events carry `mock` for the same reason.

import {
  Suspense,
  lazy,
  useCallback,
  useMemo,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { cn } from '../../lib/cn';
import Chip from '../shared/Chip';
import DotMeter from '../shared/DotMeter';
import LogStream, { type LogLine } from '../shared/LogStream';
import { AGENT_PARTICLE_COLORS, ParticlesBackground } from '../shared/ParticlesBackground';
import { Tabs } from '../shared/Tabs';
import { Button } from '../ui/Button';
// Both imported from their modules rather than the `./compute` barrel: the
// barrel pulls the provider, the fixtures and the whole pane registry into
// this entry, and all this needs is one formatter and one string tidier.
// Reused rather than re-implemented — a second `formatTokens` that rounded
// differently would make the lab and the compute surface disagree about the
// same number.
import { shortModelName } from '../compute/components/PaneStatusLine';
import { formatTokens } from '../compute/hooks/useComputeProjects';

export { formatTokens };

/**
 * The terminal tab, split out and loaded on demand.
 *
 * `ShellTerminal` pulls xterm.js, its fit addon, its stylesheet and the
 * compute provider. xterm is an external peer so it never lands in a bundle
 * here, but the provider and the pane registry would — in the entry that every
 * chat consumer loads, to serve a tab most loops never open. `lazy` makes it
 * its own chunk, fetched the first time someone clicks Terminal.
 */
const LabTerminal = lazy(() => import('./ChatLabTerminal'));

/** Where a loop is. Mirrors the run status platform-api reports. */
export type LabStatus =
  | 'planning'
  | 'starting'
  | 'running'
  | 'waiting'
  | 'done'
  | 'failed'
  | 'stopped'
  | 'budget';

export interface LabStep {
  id: string;
  title: string;
  kind: string;
  status: 'pending' | 'running' | 'done' | 'failed' | 'skipped';
  iterations?: number;
  contextTokens?: number;
}

export interface LabEvent {
  id: string;
  at: string;
  kind: 'command' | 'text' | 'tool' | 'result' | 'error' | 'status' | 'iteration';
  text: string;
  /** Long form — a tool's arguments and output. Collapsed behind a disclosure. */
  detail?: string;
  /** True when the runtime that produced this frame was a mock. Always shown. */
  mock?: boolean;
}

export interface ChatLabShellProps {
  /** The instruction the loop was started with, already truncated by the host. */
  title: string;
  status: LabStatus;
  model: string;
  contextBudgetTokens: number;
  contextTokens: number;
  iterations: number;
  /** `'fallback'` means the planner did not answer and this is one step. Surfaced. */
  planSource?: 'planner' | 'fallback';
  steps: LabStep[];
  events: LabEvent[];
  /** The `›` prompt. Disabled while the loop is mid-turn — there is nothing to interrupt. */
  onInstruct?: (text: string) => void | Promise<void>;
  onStop?: () => void;
  onBackToChat: () => void;
  onOpenRun?: () => void;
  onOpenGraph?: () => void;
  /**
   * The box behind the loop. Present = a Terminal tab exists. `shellUrl` is
   * minted on demand by the host, so its absence is a button, not an error.
   */
  shell?: { sessionId: string; shellUrl?: string; onRequestShell?: () => void };
  /** Honest state, e.g. "Planner unavailable · single step" or "Mock runtime". */
  notice?: string;
  className?: string;
  'data-testid'?: string;
}

interface StatusMeta {
  label: string;
  dot: string;
  text: string;
  /** True while the loop is mid-turn: the prompt is disabled and the dot breathes. */
  busy: boolean;
}

/**
 * The eight states, their word and their colour.
 *
 * `budget` is deliberately peach rather than red: spending the context budget
 * is the loop obeying its limit, not failing. Reading it as an error is what
 * makes an operator raise the budget when they should read the output.
 */
const LAB_STATUS: Record<LabStatus, StatusMeta> = {
  planning: { label: 'Planning', dot: 'bg-code-mauve', text: 'text-code-mauve', busy: true },
  starting: { label: 'Starting', dot: 'bg-code-blue', text: 'text-code-blue', busy: true },
  running: { label: 'Running', dot: 'bg-code-green', text: 'text-code-green', busy: true },
  waiting: { label: 'Waiting', dot: 'bg-code-yellow', text: 'text-code-yellow', busy: false },
  done: { label: 'Done', dot: 'bg-code-green', text: 'text-code-green', busy: false },
  failed: { label: 'Failed', dot: 'bg-code-red', text: 'text-code-red', busy: false },
  stopped: { label: 'Stopped', dot: 'bg-code-raised', text: 'text-code-muted', busy: false },
  budget: { label: 'Budget spent', dot: 'bg-code-peach', text: 'text-code-peach', busy: false },
};

const STEP_DOT: Record<LabStep['status'], string> = {
  pending: 'bg-code-raised',
  // `motion-reduce:animate-none` throughout: a rail of pulsing chips is the
  // kind of ambient motion a vestibular-disorder setting exists to stop.
  running: 'bg-code-green animate-pulse motion-reduce:animate-none',
  done: 'bg-code-blue',
  failed: 'bg-code-red',
  skipped: 'bg-code-raised',
};

const STEP_TEXT: Record<LabStep['status'], string> = {
  pending: 'text-code-muted',
  running: 'text-code-text',
  done: 'text-code-subtle',
  failed: 'text-code-red',
  skipped: 'text-code-muted line-through',
};

/** Event kinds that are worth a colour. The rest read as plain output. */
const EVENT_TEXT: Record<LabEvent['kind'], string> = {
  command: 'text-code-mauve',
  text: 'text-code-text',
  tool: 'text-code-blue',
  result: 'text-code-green',
  error: 'text-code-red',
  status: 'text-code-subtle',
  iteration: 'text-code-yellow',
};

/**
 * A stable number from a stable string.
 *
 * The backdrop's sky must not re-shuffle on every streamed event, so the seed
 * has to come from something that does not change for the life of the loop —
 * the box's session id, or failing that the instruction it was started with.
 */
function seedOf(value: string): number {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

/** `2026-09-21T10:48:21.024Z` is not a thing anyone reads in a log gutter. */
function clockOf(at: string): string {
  const stamp = new Date(at);
  if (Number.isNaN(stamp.getTime())) return '';
  return stamp.toLocaleTimeString([], { hour12: false });
}

export function ChatLabShell({
  title,
  status,
  model,
  contextBudgetTokens,
  contextTokens,
  iterations,
  planSource,
  steps,
  events,
  onInstruct,
  onStop,
  onBackToChat,
  onOpenRun,
  onOpenGraph,
  shell,
  notice,
  className,
  'data-testid': testId = 'chat-lab-shell',
}: ChatLabShellProps) {
  const [tab, setTab] = useState<'stream' | 'terminal'>('stream');
  const [draft, setDraft] = useState('');
  const [expanded, setExpanded] = useState<readonly string[]>([]);

  const meta = LAB_STATUS[status] ?? LAB_STATUS.running;
  const spent =
    contextBudgetTokens > 0 ? Math.min(1, Math.max(0, contextTokens / contextBudgetTokens)) : 0;
  const busy = meta.busy;

  const toggle = useCallback((id: string) => {
    setExpanded((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  const send = useCallback(() => {
    const text = draft.trim();
    if (!text || busy || !onInstruct) return;
    setDraft('');
    void onInstruct(text);
  }, [draft, busy, onInstruct]);

  // Escape is caught on the root rather than the input so it works with focus
  // anywhere in the shell — including inside the log, where a reader who has
  // scrolled back is most likely to want out.
  const onRootKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key !== 'Escape') return;
      event.stopPropagation();
      onBackToChat();
    },
    [onBackToChat],
  );

  const lines: LogLine[] = useMemo(
    () =>
      events.map((event): LogLine => {
        const open = expanded.includes(event.id);
        const body: ReactNode = (
          <span className="flex flex-wrap items-baseline gap-1.5">
            <span className={cn('whitespace-pre-wrap break-words', EVENT_TEXT[event.kind])}>
              {event.text}
            </span>
            {event.mock && (
              // Chip, not Badge: Badge's three variants are a count and two
              // dots, and this label has to say the word "mock" — a coloured
              // dot beside real-looking output is exactly the ambiguity the
              // flag exists to remove.
              <Chip
                size="xs"
                mono
                uppercase
                palette="code"
                tone="caution"
                title="Produced by a mock runtime, not a real box"
                data-testid={`${testId}-mock`}
              >
                mock
              </Chip>
            )}
            {event.detail && (
              <button
                type="button"
                onClick={() => toggle(event.id)}
                aria-expanded={open}
                data-testid={`${testId}-detail-toggle`}
                className="cursor-pointer border-none bg-transparent p-0 text-[10px] uppercase tracking-wide text-code-muted hover:text-code-text"
              >
                {open ? '− hide' : '+ detail'}
              </button>
            )}
            {event.detail && open && (
              <span
                data-testid={`${testId}-detail`}
                className="mt-1 block w-full whitespace-pre-wrap break-words rounded border border-code-border bg-code-bg px-2 py-1 text-[11px] text-code-subtle"
              >
                {event.detail}
              </span>
            )}
          </span>
        );
        return {
          id: event.id,
          timestamp: clockOf(event.at),
          source: event.kind,
          ...(event.kind === 'error' ? { level: 'error' as const } : {}),
          message: body,
        };
      }),
    [events, expanded, toggle, testId],
  );

  const tabs = useMemo(
    () => [
      { id: 'stream', label: 'Stream' },
      ...(shell ? [{ id: 'terminal', label: 'Terminal' }] : []),
    ],
    [shell],
  );

  // A host can drop `shell` while the terminal tab is showing (the box was
  // reaped). Falling back here rather than in an effect means the tab never
  // renders one frame of nothing.
  const activeTab = tab === 'terminal' && !shell ? 'stream' : tab;

  return (
    <div
      data-testid={testId}
      data-status={status}
      onKeyDown={onRootKeyDown}
      className={cn(
        'flex h-full min-h-0 flex-col bg-code-bg font-mono text-code-text',
        className,
      )}
    >
      {/* Status line. One dense row, in the order you ask the questions:
          where is it, what is it on, what has it spent, how many turns. */}
      <div
        data-testid={`${testId}-status`}
        className="flex shrink-0 flex-wrap items-center gap-x-2 gap-y-1 border-b border-code-border bg-code-panel px-3 py-2 text-[11px] leading-none"
      >
        <span
          aria-hidden="true"
          data-testid={`${testId}-status-dot`}
          className={cn(
            'inline-block h-2 w-2 shrink-0 rounded-full',
            meta.dot,
            busy && 'animate-pulse motion-reduce:animate-none',
          )}
        />
        <span className={cn('shrink-0 font-semibold', meta.text)} data-testid={`${testId}-status-label`}>
          {meta.label}
        </span>
        <span aria-hidden="true" className="text-code-raised">│</span>
        <Chip
          size="xs"
          mono
          palette="code"
          tone="accent"
          title={model}
          data-testid={`${testId}-model`}
        >
          {shortModelName(model)}
        </Chip>
        <span aria-hidden="true" className="text-code-raised">│</span>
        <span
          className="shrink-0 tabular-nums text-code-subtle"
          title="Context spent against this loop's budget"
          data-testid={`${testId}-budget`}
        >
          {formatTokens(contextTokens)} / {formatTokens(contextBudgetTokens)}
        </span>
        <DotMeter
          value={spent}
          segments={8}
          showPercent={false}
          tone="code"
          label="context"
          className="shrink-0"
          data-testid={`${testId}-budget-meter`}
        />
        <span aria-hidden="true" className="text-code-raised">│</span>
        <span className="shrink-0 tabular-nums text-code-muted" data-testid={`${testId}-iterations`}>
          {iterations} {iterations === 1 ? 'turn' : 'turns'}
        </span>
        <span className="min-w-0 flex-1 truncate text-code-comment" title={title} data-testid={`${testId}-title`}>
          {title}
        </span>
        {onOpenGraph && (
          <Button tone="code" variant="ghost" size="sm" onClick={onOpenGraph} data-testid={`${testId}-open-graph`}>
            Graph
          </Button>
        )}
        {onOpenRun && (
          <Button tone="code" variant="ghost" size="sm" onClick={onOpenRun} data-testid={`${testId}-open-run`}>
            Run
          </Button>
        )}
        {onStop && (
          <Button
            tone="code"
            variant="danger"
            size="sm"
            onClick={onStop}
            disabled={!busy && status !== 'waiting'}
            data-testid={`${testId}-stop`}
          >
            Stop
          </Button>
        )}
        <Button tone="code" variant="secondary" size="sm" onClick={onBackToChat} data-testid={`${testId}-back`}>
          Back to chat
        </Button>
      </div>

      {/* The honest banner. Never styled as a warning when it is only a fact
          about the runtime — a mock box is not an error, it is a caveat. */}
      {(notice || planSource === 'fallback') && (
        <div
          role="status"
          data-testid={`${testId}-notice`}
          className="shrink-0 border-b border-code-border bg-code-surface px-3 py-1.5 text-[11px] text-code-peach"
        >
          {notice ?? 'Planner unavailable · single step'}
        </div>
      )}

      {/* Step rail. Horizontal because the plan is short (1–6 steps) and the
          vertical room belongs to the output. */}
      {steps.length > 0 && (
        <ol
          data-testid={`${testId}-steps`}
          aria-label="Loop steps"
          className="flex shrink-0 list-none items-center gap-1.5 overflow-x-auto border-b border-code-border bg-code-panel px-3 py-1.5"
        >
          {steps.map((step) => (
            <li
              key={step.id}
              data-testid={`${testId}-step`}
              data-state={step.status}
              title={`${step.kind} · ${step.status}${step.iterations ? ` · ${step.iterations} turns` : ''}`}
              className="flex shrink-0 items-center gap-1.5 rounded-full border border-code-border bg-code-surface px-2 py-0.5 text-[11px] leading-none"
            >
              <span
                aria-hidden="true"
                className={cn('inline-block h-1.5 w-1.5 shrink-0 rounded-full', STEP_DOT[step.status])}
              />
              <span className={cn('max-w-[16rem] truncate', STEP_TEXT[step.status])}>{step.title}</span>
            </li>
          ))}
        </ol>
      )}

      <div className="shrink-0 border-b border-code-border bg-code-panel px-3">
        <Tabs
          items={tabs}
          value={activeTab}
          onValueChange={(id) => setTab(id === 'terminal' ? 'terminal' : 'stream')}
          variant="underline"
          size="sm"
          aria-label="Lab view"
          className="border-b-0"
        />
      </div>

      {/* The working state, said by the surface itself.
          A shell that is thinking and a shell that has stopped look identical
          — same dark rectangle, same last line — and a corner spinner is too
          small to answer the question from across a desk. While the loop is
          mid-turn the ground under the output rises. It carries no information
          beyond "this is working", which is all the backdrop of a log console
          should carry. The seed is derived from the box so two loops open side
          by side do not wear the same sky. */}
      <ParticlesBackground
        active={busy}
        particleCount={220}
        speed={0.14}
        alphaParticles
        moveParticlesOnHover
        particleHoverFactor={0.6}
        particleColors={AGENT_PARTICLE_COLORS}
        fallbackIntensity="medium"
        seed={seedOf(shell?.sessionId ?? title)}
        className="flex min-h-0 flex-1 flex-col"
        data-testid={`${testId}-particles`}
      >
      <div className="flex min-h-0 flex-1 flex-col">
        {activeTab === 'stream' ? (
          <LogStream
            lines={lines}
            title={null}
            showLevel={false}
            emptyMessage="No output yet."
            // Transparent while the backdrop is up: the scroll region's own
            // opaque ground would hide every star behind it.
            tone={busy ? 'transparent' : 'code'}
            className="min-h-0 flex-1 rounded-none border-none"
            data-testid={`${testId}-stream`}
          />
        ) : shell?.shellUrl ? (
          <Suspense
            fallback={
              <div className="flex flex-1 items-center justify-center text-[11px] text-code-muted">
                Loading terminal…
              </div>
            }
          >
            <LabTerminal
              sessionId={shell.sessionId}
              shellUrl={shell.shellUrl}
              data-testid={`${testId}-terminal`}
            />
          </Suspense>
        ) : (
          // No URL yet is the normal first state, not a failure: the host
          // mints a presigned URL on request and it expires in minutes, so
          // asking for one before anybody wants it would waste it.
          <div className="flex flex-1 flex-col items-center justify-center gap-2 p-6 text-center">
            <p className="text-[11px] text-code-muted">
              The loop is working in a cloud computer. Open a shell to look around its workspace.
            </p>
            <Button
              tone="code"
              variant="primary"
              size="sm"
              onClick={shell?.onRequestShell}
              disabled={!shell?.onRequestShell}
              data-testid={`${testId}-connect-terminal`}
            >
              Connect terminal
            </Button>
          </div>
        )}
      </div>

      {/* The prompt line. One row, and it is the only place in the shell that
          takes typing — which is why it looks like a shell prompt rather than
          a chat composer: what you type here goes to the agent mid-loop. */}
      <div
        data-testid={`${testId}-prompt-row`}
        className={cn(
          'flex shrink-0 items-center gap-2 border-t border-code-border px-3 py-2',
          busy ? 'bg-transparent' : 'bg-code-panel',
        )}
      >
        <span aria-hidden="true" className="shrink-0 text-code-green">›</span>
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key !== 'Enter' || e.shiftKey) return;
            e.preventDefault();
            send();
          }}
          disabled={busy || !onInstruct}
          placeholder={busy ? 'Working — the prompt opens between turns' : 'Continue with…'}
          aria-label="Instruct the agent"
          data-testid={`${testId}-prompt`}
          className="min-w-0 flex-1 border-none bg-transparent text-[12px] text-code-text outline-none placeholder:text-code-muted disabled:cursor-not-allowed disabled:text-code-muted"
        />
        <Button
          tone="code"
          variant="primary"
          size="sm"
          onClick={send}
          disabled={busy || !onInstruct || draft.trim().length === 0}
          data-testid={`${testId}-send`}
        >
          Send
        </Button>
      </div>
      </ParticlesBackground>
    </div>
  );
}

export interface ChatLabPillProps {
  status: LabStatus;
  contextTokens: number;
  contextBudgetTokens: number;
  onOpen: () => void;
  className?: string;
  'data-testid'?: string;
}

/**
 * The loop, shrunk to one line for the composer's chip row.
 *
 * "Back to chat" must not feel like abandoning the run, so the run has to stay
 * visible and one click away once the column is a conversation again.
 */
export function ChatLabPill({
  status,
  contextTokens,
  contextBudgetTokens,
  onOpen,
  className,
  'data-testid': testId = 'chat-lab-pill',
}: ChatLabPillProps) {
  const meta = LAB_STATUS[status] ?? LAB_STATUS.running;
  return (
    <button
      type="button"
      onClick={onOpen}
      data-testid={testId}
      data-status={status}
      className={cn(
        'inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-border bg-surface-inset px-2.5 py-1',
        'font-mono text-[11px] leading-none text-text-secondary hover:bg-surface-hover hover:text-text-primary',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'inline-block h-1.5 w-1.5 shrink-0 rounded-full',
          meta.dot,
          meta.busy && 'animate-pulse motion-reduce:animate-none',
        )}
      />
      <span className="truncate">
        Agent loop · {meta.label.toLowerCase()} · {formatTokens(contextTokens)}/
        {formatTokens(contextBudgetTokens)}
      </span>
      <span className="shrink-0 font-semibold text-text-primary">Open</span>
    </button>
  );
}

export default ChatLabShell;

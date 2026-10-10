// The two read-only pane kinds the workspace lab adds beside the terminal.
//
// Both read the SAME stream the classic tail pane reads (`useComputeTail`,
// i.e. the box's `/tail` SSE), because there is only one honest source for
// "what is happening on that box": whatever it is emitting. They are two
// readings of it, not two feeds.
//
//   Bot logs — every step as a timestamped log line, for skimming a bot's
//              output: follow or pause, filter to one source, search, and a
//              footer with the live byte rate so a silent pane and a stalled
//              stream are told apart.
//   Agent    — the same steps as a task checklist: what the agent has done
//              (✓), what it is doing now (◌), and how long the run has gone.
//
// Neither costs a shell slot, so a window can watch several boxes this way
// while one terminal does the typing.

import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { cn } from '../../../lib/cn';
import Chip from '../../shared/Chip';
import InlineAlert from '../../shared/InlineAlert';
import { Link } from '../../shared/Link';
import { Button } from '../../ui/Button';
import { LogStream, type LogLevel, type LogLine } from '../../shared/LogStream';
import { DropdownMenu } from '../../shared/DropdownMenu';
import { StatusDot } from '../../shared/StatusDot';
import { SearchInput } from '../../shared/SearchInput';
import { SearchIcon } from '../../ui/Icons';
import { useCompute } from '../context/ComputeContext';
import { useComputeTail } from '../hooks/useComputeTail';
import type { PlanItem, TaskStep } from '../hooks/useComputeTask';
import { runInstructionAsTasks, useLabInstruct } from '../context/LabInstructContext';
import { isLocalComputer } from '../lib/fleetSummary';
import type { PaneKindContext } from '../lib/paneKinds';
import { statusOf } from '../lib/status';
import type { Computer } from '../types';

/** `08:08:41` — the log's own clock, local time, seconds resolution. */
export function clockTime(at: number): string {
  const d = new Date(at);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

/** `4:12`, `1:02:09` — elapsed time as a run clock reads it. */
export function elapsed(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const pad = (n: number) => String(n).padStart(2, '0');
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
}

/** Severity of a step, read the way a log reader expects it. */
export function stepLevel(step: TaskStep): LogLevel {
  if (step.kind === 'error') return 'error';
  if (step.kind === 'job_end') return step.jobOk === false ? 'error' : 'info';
  if (step.kind === 'meta') return 'debug';
  if (step.kind === 'gate') return 'warn';
  // Text the agent wrote about a problem is still the agent talking, but a
  // reader scanning for trouble wants it lifted out of the INFO wall.
  if (step.kind === 'text' && /\b(warn|warning|retry|retrying|timed out|slow)\b/i.test(step.text)) return 'warn';
  return 'info';
}

/** What emitted a step — the source column and the filter's vocabulary. */
export function stepSource(step: TaskStep): string {
  if (step.kind === 'tool') return step.tool ?? 'tool';
  if (step.kind === 'job' || step.kind === 'job_end') return step.jobKind ?? 'dispatcher';
  if (step.kind === 'meta') return 'runtime';
  if (step.kind === 'result') return 'result';
  if (step.kind === 'error') return 'error';
  if (step.kind === 'gate') return 'gate';
  if (step.kind === 'delivery') return 'delivery';
  return 'agent';
}

/**
 * Bytes per second over the trailing window, from the steps' own timestamps.
 *
 * Measured on the text that arrived, not guessed from a frame count: "2.4
 * KB/s" means that much log reached this pane in the last ten seconds, and a
 * stream that has gone quiet reads 0 B/s rather than its lifetime average.
 */
export function byteRate(steps: readonly TaskStep[], now: number, windowMs = 10_000): number {
  let bytes = 0;
  for (let i = steps.length - 1; i >= 0; i -= 1) {
    const step = steps[i]!;
    if (now - step.at > windowMs) break;
    bytes += step.text.length + (step.tool?.length ?? 0);
  }
  return bytes / (windowMs / 1000);
}

export function formatRate(bytesPerSecond: number): string {
  if (bytesPerSecond >= 1024) return `${(bytesPerSecond / 1024).toFixed(1)} KB/s`;
  return `${Math.round(bytesPerSecond)} B/s`;
}

/** A clock that ticks only while something is moving. */
function useNow(active: boolean, intervalMs = 1_000): number {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!active) return;
    setNow(Date.now());
    const timer = setInterval(() => setNow(Date.now()), intervalMs);
    return () => clearInterval(timer);
  }, [active, intervalMs]);
  return now;
}

// ── Bot logs ────────────────────────────────────────────────────────────────

export interface LogsPaneProps {
  computer: Computer;
  registerPane?: PaneKindContext['registerPane'];
  className?: string;
}

const ALL_SOURCES = '';

export function LogsPane({ computer, registerPane, className }: LogsPaneProps) {
  const { client } = useCompute();
  const tail = useComputeTail({ client, boxId: computer.id });
  const [paused, setPaused] = useState(false);
  // Paused means the view holds still — not merely that it stops scrolling.
  // The steps keep arriving underneath and are counted, so resuming shows
  // what was missed rather than pretending nothing happened.
  const [frozenAt, setFrozenAt] = useState<number | null>(null);
  const [source, setSource] = useState(ALL_SOURCES);
  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const now = useNow(tail.connected && !paused);

  useEffect(() => {
    if (!registerPane) return;
    registerPane({ focus: () => rootRef.current?.querySelector<HTMLElement>('[role="log"]')?.focus() });
    return () => registerPane(null);
  }, [registerPane]);

  const steps = frozenAt == null ? tail.steps : tail.steps.slice(0, frozenAt);
  const missed = frozenAt == null ? 0 : tail.steps.length - frozenAt;
  const sources = useMemo(
    () => [...new Set(tail.steps.map(stepSource))].sort(),
    [tail.steps],
  );

  const lines = useMemo<LogLine[]>(() => {
    const needle = query.trim().toLowerCase();
    return steps
      .map((step, index) => ({ step, index }))
      .filter(({ step }) => !source || stepSource(step) === source)
      .filter(({ step }) => !needle || `${step.tool ?? ''} ${step.text}`.toLowerCase().includes(needle))
      .map(({ step, index }) => ({
        id: `${index}`,
        timestamp: clockTime(step.at),
        level: stepLevel(step),
        source: stepSource(step),
        // The tool already leads the line as its source; repeating it in the
        // message read "[Bash] Bash npm test".
        message: step.text,
      }));
  }, [steps, source, query]);

  const togglePause = () => {
    if (paused) {
      setPaused(false);
      setFrozenAt(null);
    } else {
      setPaused(true);
      setFrozenAt(tail.steps.length);
    }
  };

  const rate = byteRate(tail.steps, now);

  return (
    <div ref={rootRef} data-testid="logs-pane" className={cn('@container flex flex-col h-full min-h-0 bg-code-bg', className)}>
      <div className="shrink-0 flex items-center gap-2 px-2 py-1 border-b border-code-border text-[11px] font-mono">
        <DropdownMenu
          trigger={<span className="text-[11px] font-mono whitespace-nowrap">{source || 'all sources'} ▾</span>}
          triggerLabel="Log source"
          triggerVariant="link"
          sections={[{
            items: [
              { label: 'All sources', active: !source, onSelect: () => setSource(ALL_SOURCES) },
              ...sources.map((s) => ({ label: s, active: s === source, onSelect: () => setSource(s) })),
            ],
          }]}
        />
        {searching ? (
          <SearchInput
            value={query}
            onChange={setQuery}
            onClear={() => { setQuery(''); setSearching(false); }}
            placeholder="Filter lines…"
            className="w-40"
          />
        ) : (
          <button
            type="button"
            onClick={() => setSearching(true)}
            aria-label="Search the log"
            title="Search the log"
            className="inline-flex bg-transparent border-none cursor-pointer text-code-muted hover:text-code-text p-0"
          >
            <SearchIcon size={13} />
          </button>
        )}
        <span className="flex-1" />
        <span data-testid="logs-pane-following" className="hidden @[16rem]:inline-flex items-center gap-1 text-code-muted whitespace-nowrap">
          <StatusDot size="xs" color={paused ? 'var(--color-text-tertiary)' : 'var(--color-success)'} pulse={!paused && tail.running} />
          {paused ? `Paused${missed > 0 ? ` · ${missed} new` : ''}` : tail.connected ? 'Following live' : 'Not connected'}
        </span>
      </div>

      <LogStream
        lines={lines}
        follow={!paused}
        title={null}
        tone="transparent"
        showSource
        className="flex-1 min-h-0 rounded-none border-0 shadow-none"
        emptyMessage={
          tail.error
            ?? (computer.currentTask ? `waiting for output · ${computer.currentTask}` : 'Nothing has been logged on this computer yet.')
        }
        data-testid="logs-pane-stream"
      />

      <div className="shrink-0 flex items-center gap-2 px-2 py-1 border-t border-code-border text-[11px] font-mono text-code-muted">
        <StatusDot size="xs" color={paused ? 'var(--color-text-tertiary)' : 'var(--color-success)'} />
        <span data-testid="logs-pane-rate" className="tabular-nums">
          {paused ? 'Paused' : 'Following'} · {formatRate(rate)}
        </span>
        <span className="flex-1" />
        <button
          type="button"
          onClick={togglePause}
          aria-pressed={paused}
          data-testid="logs-pane-pause"
          className="bg-transparent border border-code-border rounded px-1.5 py-0.5 cursor-pointer text-code-text hover:bg-code-surface"
        >
          {paused ? '▶ Resume' : '⏸ Pause'}
        </button>
      </div>
    </div>
  );
}

// ── Agent ───────────────────────────────────────────────────────────────────

export interface AgentPaneProps {
  computer: Computer;
  registerPane?: PaneKindContext['registerPane'];
  className?: string;
}

/**
 * The current run's steps — everything since the last run boundary.
 *
 * A box that has run five tasks has five runs in its tail; the checklist is
 * about the one in front of you. A boundary is a dispatcher job start or a
 * `task_started` meta step, whichever came last.
 */
export function currentRun(steps: readonly TaskStep[]): TaskStep[] {
  for (let i = steps.length - 1; i >= 0; i -= 1) {
    const step = steps[i]!;
    if (step.kind === 'job') return steps.slice(i);
  }
  return [...steps];
}

/**
 * The run's plan: the latest `TodoWrite` in these steps. A later one
 * replaces an earlier one outright — the agent rewrites the whole list each
 * time, so merging would resurrect items it dropped.
 */
export function latestPlan(steps: readonly TaskStep[]): PlanItem[] | null {
  for (let i = steps.length - 1; i >= 0; i -= 1) {
    const plan = steps[i]!.plan;
    if (plan) return plan;
  }
  return null;
}

/**
 * What the agent last said — the question a `waiting` box is waiting on.
 *
 * The fleet marks a box `waiting` when its run's last words end with `?`;
 * those words are the last assistant text, or the `result` frame's own
 * summary when the run closed on it. Null when the run said nothing.
 */
export function pendingQuestion(steps: readonly TaskStep[]): string | null {
  for (let i = steps.length - 1; i >= 0; i -= 1) {
    const step = steps[i]!;
    if (step.kind === 'result' && step.summary) return step.summary;
    if (step.kind === 'text' && step.text) return step.text;
    // A new prompt is a run boundary: what came before it was answered.
    if (step.kind === 'meta' && !step.text.startsWith('model: ')) return null;
  }
  return null;
}

const DONE_GLYPH: Partial<Record<TaskStep['kind'], string>> = {
  tool: '✓',
  result: '✓',
  job_end: '✓',
  error: '✗',
  job: '▶',
  meta: '›',
  text: '·',
  gate: '⚠',
  delivery: '⇪',
};

const PLAN_GLYPH: Record<PlanItem['status'], { glyph: string; className: string; word: string }> = {
  completed: { glyph: '✓', className: 'text-code-green', word: 'done' },
  in_progress: { glyph: '◌', className: 'text-code-blue animate-pulse motion-reduce:animate-none', word: 'in progress' },
  pending: { glyph: '○', className: 'text-code-muted', word: 'pending' },
};

function PlanChecklist({ plan }: { plan: readonly PlanItem[] }) {
  const done = plan.filter((item) => item.status === 'completed').length;
  return (
    <section data-testid="agent-pane-plan" aria-label="Plan" className="shrink-0 px-3 py-2 border-b border-code-border">
      <div className="flex items-center gap-2 text-[11px] text-code-muted">
        <span className="font-semibold text-code-text">Plan</span>
        <span data-testid="agent-pane-plan-tally" className="tabular-nums">{done} of {plan.length} done</span>
      </div>
      <ol className="m-0 mt-1 p-0 list-none flex flex-col gap-0.5">
        {plan.map((item, i) => {
          const meta = PLAN_GLYPH[item.status];
          return (
            <li key={`${i}-${item.content}`} data-plan-status={item.status} className="flex gap-2 min-w-0">
              <span aria-hidden="true" className={cn('shrink-0 w-3', meta.className)}>{meta.glyph}</span>
              <span className="sr-only">{meta.word}: </span>
              <span
                className={cn(
                  'min-w-0 break-words',
                  item.status === 'completed' ? 'text-code-muted line-through'
                    : item.status === 'in_progress' ? 'text-code-text' : 'text-code-subtle',
                )}
              >
                {item.status === 'in_progress' && item.activeForm ? item.activeForm : item.content}
              </span>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

interface QuestionReplyProps {
  computer: Computer;
  question: string;
}

/**
 * The question a `waiting` box asked, and a reply that answers it.
 *
 * The reply goes through the lab's instruction route — the host's
 * `onInstruct` when it gave one, the resumed agent task otherwise — so it
 * is exactly what a Nudge aimed at this box would do.
 */
function QuestionReply({ computer, question }: QuestionReplyProps) {
  const { client, notify } = useCompute();
  const labRoute = useLabInstruct();
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);
  const [problem, setProblem] = useState<string | null>(null);
  const laptop = isLocalComputer(computer);

  const send = async (event?: FormEvent) => {
    event?.preventDefault();
    const reply = text.trim();
    if (!reply || sending || laptop) return;
    setSending(true);
    setProblem(null);
    try {
      const outcome = labRoute
        ? await labRoute(reply, [computer])
        : await runInstructionAsTasks(client, reply, [computer]);
      const delivered = outcome?.delivered ?? 1;
      if (delivered > 0) {
        setText('');
        notify({ tone: 'success', title: `Reply sent to ${computer.label}` });
      } else {
        // Kept in the box: a refusal is usually fixed elsewhere, then retried as written.
        setProblem(outcome?.detail ?? `${computer.label} did not take the reply.`);
      }
    } catch (err) {
      setProblem(err instanceof Error ? err.message : 'The reply was not sent.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div data-testid="agent-pane-question" className="shrink-0 px-3 py-2 border-t border-code-border flex flex-col gap-1.5">
      <InlineAlert tone="warning" palette="code" className="text-[12px]">
        <span className="block font-semibold">Needs you</span>
        <span data-testid="agent-pane-question-text" className="block break-words text-code-text">{question}</span>
      </InlineAlert>
      {laptop ? (
        <span className="text-[11px] text-code-muted">
          This laptop has no runtime session to resume — answer it from its own terminal.
        </span>
      ) : (
        <form onSubmit={(e) => void send(e)} className="flex items-end gap-2">
          <textarea
            data-testid="agent-pane-reply"
            aria-label={`Reply to ${computer.label}`}
            rows={2}
            value={text}
            disabled={sending}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                void send();
              }
            }}
            placeholder="Answer the agent — ⏎ to send"
            className="flex-1 min-w-0 resize-none rounded border border-code-border bg-code-surface px-2 py-1 text-[12px] text-code-text caret-code-blue placeholder:text-code-raised outline-none focus-visible:ring-1 focus-visible:ring-code-blue disabled:opacity-60"
          />
          <Button type="submit" size="sm" tone="code" variant="primary" disabled={sending || !text.trim()} data-testid="agent-pane-reply-send">
            {sending ? 'Sending…' : 'Reply'}
          </Button>
        </form>
      )}
      {problem && (
        <InlineAlert tone="error" palette="code" className="text-[12px]" data-testid="agent-pane-reply-error">
          {problem}
        </InlineAlert>
      )}
    </div>
  );
}

function GateRow({ step }: { step: TaskStep }) {
  const gate = step.gate!;
  return (
    <div className="min-w-0 flex-1 rounded border border-code-peach/50 bg-code-peach/10 px-2 py-1 text-code-peach">
      <span className="font-semibold">Held at the {gate.gate} gate</span>
      {gate.workItemTitle && <span className="text-code-subtle"> · {gate.workItemTitle}</span>}
      <span className="block break-words text-code-subtle">{gate.error}</span>
      {gate.confirmFlag && <span className="block text-code-muted">needs {gate.confirmFlag}</span>}
    </div>
  );
}

function DeliveryRow({ step }: { step: TaskStep }) {
  const d = step.delivery!;
  return (
    <div className="min-w-0 flex-1 flex flex-wrap items-center gap-x-2 gap-y-1 rounded border border-code-green/40 bg-code-green/10 px-2 py-1">
      <span className="font-semibold text-code-green">Change posted for review</span>
      <span className="min-w-0 break-words text-code-subtle">{d.title}</span>
      {d.commitSha && <Chip size="xs" mono palette="code" tone="neutral">{d.commitSha.slice(0, 7)}</Chip>}
      {d.prUrl ? (
        <Link href={d.prUrl} external className="text-code-blue" data-testid="agent-pane-pr-link">
          {d.prNumber !== undefined ? `PR #${d.prNumber}` : 'Open PR'}
        </Link>
      ) : d.prNumber !== undefined ? (
        <span className="text-code-muted">PR #{d.prNumber}</span>
      ) : null}
    </div>
  );
}

export function AgentPane({ computer, registerPane, className }: AgentPaneProps) {
  const { client } = useCompute();
  const tail = useComputeTail({ client, boxId: computer.id });
  const listRef = useRef<HTMLOListElement>(null);
  const status = statusOf(computer);
  const running = tail.running || status === 'running';
  const now = useNow(running);

  useEffect(() => {
    if (!registerPane) return;
    registerPane({ focus: () => listRef.current?.focus() });
    return () => registerPane(null);
  }, [registerPane]);

  const run = currentRun(tail.steps);
  const plan = latestPlan(run);
  // The plan is drawn above as a checklist; its TodoWrite calls would only
  // repeat it as "✓ TodoWrite" rows in the log below.
  const rows = run.filter((s) => !s.plan);
  useEffect(() => {
    const node = listRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [rows.length]);

  const toolSteps = rows.filter((s) => s.kind === 'tool');
  const lastToolIndex = running ? rows.map((s) => s.kind).lastIndexOf('tool') : -1;
  const started = run[0]?.at ?? null;
  const failed = run.some((s) => s.kind === 'error');
  const held = run.some((s) => s.kind === 'gate');
  const question = status === 'waiting' ? (pendingQuestion(tail.steps) ?? computer.currentTask ?? null) : null;

  return (
    <div data-testid="agent-pane" className={cn('flex flex-col h-full min-h-0 bg-code-bg font-mono text-[12px]', className)}>
      {computer.currentTask && (
        <div className="shrink-0 px-3 py-1.5 border-b border-code-border text-code-subtle truncate" title={computer.currentTask}>
          {computer.currentTask}
        </div>
      )}
      {plan && plan.length > 0 && <PlanChecklist plan={plan} />}
      <ol
        ref={listRef}
        tabIndex={0}
        aria-label={`Agent steps on ${computer.label}`}
        className="flex-1 min-h-0 overflow-y-auto m-0 px-3 py-2 list-none flex flex-col gap-1 outline-none focus-visible:ring-1 focus-visible:ring-code-blue focus-visible:ring-inset"
      >
        {rows.length === 0 && (
          <li className="text-code-muted">
            {tail.error ?? (status === 'provisioning'
              ? 'Starting the computer — the agent’s steps appear once it is up.'
              : computer.currentTask ? 'Waiting for the agent’s first step…' : 'No agent run on this computer yet.')}
          </li>
        )}
        {rows.map((step, i) => {
          const inFlight = i === lastToolIndex;
          return (
            <li key={`${step.at}-${i}`} data-step-kind={step.kind} className="flex gap-2 min-w-0">
              <span className="shrink-0 text-code-muted tabular-nums">{clockTime(step.at)}</span>
              <span
                aria-hidden="true"
                className={cn(
                  'shrink-0 w-3',
                  inFlight ? 'text-code-blue animate-pulse'
                    : step.kind === 'error' ? 'text-code-red'
                      : step.kind === 'gate' ? 'text-code-peach'
                        : step.kind === 'tool' || step.kind === 'result' || step.kind === 'delivery' ? 'text-code-green'
                          : 'text-code-muted',
                )}
              >
                {inFlight ? '◌' : DONE_GLYPH[step.kind] ?? '·'}
              </span>
              {step.kind === 'gate' && step.gate ? <GateRow step={step} />
                : step.kind === 'delivery' && step.delivery ? <DeliveryRow step={step} />
                  : (
                    <>
                      {step.tool && <span className="shrink-0 text-code-text">{step.tool}</span>}
                      <span className={cn('min-w-0 break-words', step.kind === 'error' ? 'text-code-red' : 'text-code-subtle')}>
                        {step.text}
                      </span>
                    </>
                  )}
            </li>
          );
        })}
      </ol>
      {question && <QuestionReply computer={computer} question={question} />}
      <div className="shrink-0 flex items-center gap-2 px-3 py-1 border-t border-code-border text-[11px] text-code-muted">
        <span data-testid="agent-pane-tally" className="tabular-nums">
          {toolSteps.length - (lastToolIndex >= 0 ? 1 : 0)} done
          {lastToolIndex >= 0 && ' · 1 running'}
          {held && ' · held at a gate'}
          {failed && ' · failed'}
        </span>
        <span className="flex-1" />
        {started != null && (
          <span className="tabular-nums" title="Since this run's first step">
            {running ? '⟳ ' : ''}{elapsed((running ? now : run[run.length - 1]!.at) - started)}
          </span>
        )}
      </div>
    </div>
  );
}

// WorkComputePane — the detail pane for a node that IS a cloud compute session.
//
// A work-graph node whose provenance is an agent loop is not a document with a
// preview or a meeting with a transcript. It is a machine: it has a model, a
// context budget it is spending, money it has spent, an environment it runs
// as, a plan it is working through, a live tail, files it has written, and a
// real PTY you can open. The per-kind bodies in `WorkNodePane` cannot say any
// of that, and a pane that shows a deck preview for a terminal teaches a
// reader to distrust the whole screen.
//
// So `WorkNodePane` hands the body to this module whenever the host attached
// `detail.compute`. Everything around it — the header, the close button, the
// "Reference in chat" footer, the sources and work-item sections — is the
// pane's existing chrome, unchanged. Absent `compute`, this file never runs
// and no existing pane renders one byte differently.
//
// PROVENANCE FIRST, and NOTHING INVENTED. Every number here is host-resolved
// from `GET /api/agent-loops/:runId`. Where a field is missing the pane says
// so (`—`, "No files yet", "No output yet") rather than printing a confident
// zero: a cost of `$0.0000` on a run that never reported one is a lie about
// money, and the pane a demo lingers on is the worst place to tell one.
//
// PALETTE: the gauges, the tail and the shell paint in the code family
// (`--color-code-*`), the cards around them in the host theme — the same
// boundary `ChatLabShell` and `PaneStatusLine` use. The dark blocks are
// terminal surfaces; a light bar inside one reads as a seam.

import { Suspense, lazy, useMemo, useState, type ReactNode } from 'react';
import { cn } from '../../../lib/cn';
import { formatBytes } from '../../../lib/formatBytes';
import Avatar from '../../shared/Avatar';
import Chip from '../../shared/Chip';
import { DropdownMenu } from '../../shared/DropdownMenu';
import LogStream, { type LogLine } from '../../shared/LogStream';
import { AGENT_PARTICLE_COLORS, ParticlesBackground } from '../../shared/ParticlesBackground';
import { StatusPill, type StatusPillState } from '../../shared/StatusPill';
import { Tabs, TabPanel } from '../../shared/Tabs';
import { Button } from '../../ui/Button';
// Imported from their modules rather than the `./compute` barrel: the barrel
// pulls the provider, the fixtures and the whole pane registry into the graph
// entry, and all this needs is one status line, one formatter and one tidier.
import { PaneStatusLine, shortModelName } from '../../compute/components/PaneStatusLine';
import { formatTokens } from '../../compute/hooks/useComputeProjects';
import type { ComputeStatus, Computer } from '../../compute/types';
import type {
  WorkActivityBanner, WorkComputeDetail, WorkComputeEvent, WorkComputeStatus,
  WorkComputeStep, WorkComputeTerminalLine,
} from './types';

/**
 * The shell, split out and loaded on demand.
 *
 * `ShellTerminal` pulls xterm.js, its fit addon, its stylesheet and the
 * compute provider. xterm is an external peer so it never lands in a bundle,
 * but the provider and the pane registry would — in the graph entry that every
 * activity consumer loads, to serve a tab most sessions never open. Reusing
 * `social/ChatLabTerminal` rather than standing up a second one-box provider:
 * the lab already solved "one presigned URL, no fleet behind it", and a second
 * copy would be the one that drifts.
 */
const LabTerminal = lazy(() => import('../../social/ChatLabTerminal'));

interface StatusMeta {
  label: string;
  pill: StatusPillState;
  /** How the box itself reads to the compute surface's own status line. */
  box: ComputeStatus;
  /** True while the session is mid-turn: dots breathe, the cursor blinks. */
  busy: boolean;
  tone: WorkActivityBanner['tone'];
}

/**
 * The eight states, their word and their colour.
 *
 * `budget` is deliberately a warning rather than an error, matching
 * `ChatLabShell`: spending the context budget is the loop obeying its limit,
 * not failing. Reading it as an error is what makes an operator raise the
 * budget when they should read the output.
 */
const COMPUTE_STATUS_META: Record<WorkComputeStatus, StatusMeta> = {
  planning: { label: 'PLANNING', pill: 'info', box: 'running', busy: true, tone: 'info' },
  starting: { label: 'QUEUED', pill: 'pending', box: 'running', busy: true, tone: 'info' },
  running: { label: 'RUNNING', pill: 'info', box: 'running', busy: true, tone: 'info' },
  waiting: { label: 'NEEDS YOU', pill: 'warning', box: 'waiting', busy: false, tone: 'info' },
  done: { label: 'DONE', pill: 'success', box: 'idle', busy: false, tone: 'success' },
  failed: { label: 'FAILED', pill: 'error', box: 'error', busy: false, tone: 'error' },
  stopped: { label: 'STOPPED', pill: 'neutral', box: 'stopped', busy: false, tone: 'info' },
  budget: { label: 'BUDGET', pill: 'warning', box: 'stopped', busy: false, tone: 'info' },
};

const STEP_STATE: Record<WorkComputeStep['status'], { dot: string; text: string; word: string }> = {
  pending: { dot: 'bg-border-emphasis', text: 'text-text-tertiary', word: 'Queued' },
  // `motion-reduce:animate-none` throughout: a list of pulsing dots is the kind
  // of ambient motion a vestibular-disorder setting exists to stop.
  running: { dot: 'bg-info animate-pulse motion-reduce:animate-none', text: 'text-text-primary', word: 'Running' },
  done: { dot: 'bg-success', text: 'text-text-secondary', word: 'Completed' },
  failed: { dot: 'bg-danger', text: 'text-danger-fg', word: 'Failed' },
  skipped: { dot: 'bg-border-emphasis', text: 'text-text-tertiary line-through', word: 'Skipped' },
};

/** The terminal alphabet. Hosts describe a line's KIND; the pane draws it. */
const LINE_GLYPH: Record<WorkComputeTerminalLine['glyph'], { glyph: string; text: string }> = {
  prompt: { glyph: '$', text: 'text-code-green' },
  step: { glyph: '▶', text: 'text-code-blue' },
  done: { glyph: '✓', text: 'text-code-green' },
  pending: { glyph: '○', text: 'text-code-muted' },
  text: { glyph: '·', text: 'text-code-subtle' },
};

/** Same alphabet for streamed frames, matching `TailPane`'s step glyphs. */
const EVENT_GLYPH: Record<WorkComputeEvent['kind'], { glyph: string; text: string }> = {
  command: { glyph: '$', text: 'text-code-mauve' },
  text: { glyph: '·', text: 'text-code-text' },
  tool: { glyph: '⚙', text: 'text-code-blue' },
  result: { glyph: '✓', text: 'text-code-green' },
  error: { glyph: '✗', text: 'text-code-red' },
  status: { glyph: '›', text: 'text-code-subtle' },
  iteration: { glyph: '⟳', text: 'text-code-yellow' },
};

/**
 * A stable number from a stable string.
 *
 * The working backdrop's sky must not re-shuffle on every streamed frame, so
 * its seed comes from the box's own label rather than anything that moves.
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

/** "2m 14s", "30m", "1h 04m". Seconds only matter while they are all there is. */
export function formatElapsed(ms: number | undefined): string {
  if (ms == null || !Number.isFinite(ms) || ms < 0) return '';
  const seconds = Math.round(ms / 1000);
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return seconds % 60 ? `${minutes}m ${seconds % 60}s` : `${minutes}m`;
  return `${Math.floor(minutes / 60)}h ${String(minutes % 60).padStart(2, '0')}m`;
}

/** The plan row's right-hand clause. Never a bare duration with no verb. */
function stepClause(step: WorkComputeStep): string {
  const word = STEP_STATE[step.status].word;
  const elapsed = formatElapsed(step.elapsedMs);
  if (!elapsed) return word;
  return step.status === 'running' ? `${word} · ${elapsed} elapsed` : `${word} · ${elapsed}`;
}

/**
 * The compute detail, as the compute surface's own `Computer`.
 *
 * `PaneStatusLine` is the library's answer to "what is this box on, what has
 * it spent, how long before it stops", and re-deriving that row here would put
 * two status lines in the product that round differently. So the host's loop
 * data is mapped onto the shape that component already reads, and the real
 * component renders it — the same gauges a Computer Lab pane shows.
 */
function asComputer(compute: WorkComputeDetail): Computer {
  const { metrics, task } = compute;
  const budget = metrics.contextBudgetTokens;
  return {
    id: compute.label,
    label: compute.label,
    sessionId: compute.shell?.sessionId ?? '',
    createdAt: task.startedAt ?? '',
    status: COMPUTE_STATUS_META[compute.status].box,
    ...(compute.project ? { project: compute.project } : {}),
    ...(compute.stopsInMs != null ? { stopsInMs: compute.stopsInMs } : {}),
    // Absent budget means the ratio is unknown, not zero — the status line
    // omits the field rather than drawing an empty gauge.
    ...(budget ? { contextUsed: Math.min(1, Math.max(0, metrics.contextTokens / budget)) } : {}),
    ...(metrics.model ? { activeModel: metrics.model } : {}),
    ...(metrics.costUsd != null
      ? { spendUsd: metrics.costUsd, lastResult: { subtype: 'success', turns: 0, durationMs: task.elapsedMs ?? 0, costUsd: metrics.costUsd } }
      : {}),
    currentTask: compute.workItem ? `${compute.workItem.key} · ${task.title}` : task.title,
  };
}

function Metric({ label, value, title }: { label: string; value: ReactNode; title?: string }) {
  return (
    <div className="min-w-0 rounded-md border border-border bg-surface-inset px-2 py-1.5">
      <span className="block text-[10px] font-semibold uppercase tracking-wide text-text-tertiary">{label}</span>
      <span className="block truncate font-mono text-[12px] text-text-primary" title={title}>{value}</span>
    </div>
  );
}

function Card({ label, trailing, children }: { label: string; trailing?: ReactNode; children: ReactNode }) {
  return (
    <section className="space-y-1.5 rounded-md border border-border p-2.5">
      <h4 className="flex items-baseline gap-2 text-[10px] font-semibold uppercase tracking-wide text-text-tertiary">
        <span className="min-w-0 truncate">{label}</span>
        {trailing && <span className="ml-auto shrink-0 normal-case tracking-normal text-text-tertiary">{trailing}</span>}
      </h4>
      {children}
    </section>
  );
}

/**
 * The terminal digest — the last few tail lines, as the box would have printed
 * them. Shown where a full tail would not fit or is not connected yet, so the
 * Shell tab is never an empty rectangle with a button in it.
 */
function TerminalPreview({
  lines, running, label, environment, seed, testId,
}: { lines: WorkComputeTerminalLine[]; running: boolean; label: string; environment: string; seed: number; testId: string }) {
  return (
    <div data-testid={testId} className="overflow-hidden rounded-md border border-code-border bg-code-bg font-mono text-[11px] leading-relaxed">
      <div className={cn('flex items-center gap-2 border-b border-code-border px-2 py-1', running ? 'bg-transparent' : 'bg-code-panel')}>
        <span aria-hidden="true" className="text-code-green">$</span>
        <span className="min-w-0 truncate text-code-text">{label}</span>
        <span className="ml-auto shrink-0 text-code-blue">{environment}</span>
      </div>
      <ParticlesBackground active={running} particleCount={90} speed={0.1} alphaParticles particleColors={AGENT_PARTICLE_COLORS} fallbackIntensity="low" seed={seed} className="space-y-0.5 px-2 py-1.5" data-testid={`${testId}-particles`}>
        {lines.map((line, index) => {
          const glyph = LINE_GLYPH[line.glyph] ?? LINE_GLYPH.text;
          return (
            // Two tail lines may legitimately read the same; the position keeps
            // them apart when the host has no id to give.
            <p key={`${index}-${line.text}`} className="flex gap-1.5">
              <span aria-hidden="true" className={cn('shrink-0', glyph.text)}>{glyph.glyph}</span>
              <span className="min-w-0 whitespace-pre-wrap break-words text-code-subtle">{line.text}</span>
            </p>
          );
        })}
        {!lines.length && <p className="text-code-muted">No output yet.</p>}
        {running && (
          <p aria-hidden="true" className="text-code-green">
            <span className="inline-block animate-pulse motion-reduce:animate-none">▌</span>
          </p>
        )}
      </ParticlesBackground>
    </div>
  );
}

export interface WorkComputePaneProps {
  compute: WorkComputeDetail;
  /**
   * The banner the host authored, if any. Absent, the pane derives the session
   * card from the compute data — the state line every detail pane opens with,
   * said in the words this kind of node has.
   */
  banner?: WorkActivityBanner;
  className?: string;
  'data-testid'?: string;
}

export function WorkComputePane({
  compute, banner, className, 'data-testid': testId = 'work-compute-pane',
}: WorkComputePaneProps) {
  const [tab, setTab] = useState<'activity' | 'shell' | 'workspace'>('activity');
  const [expanded, setExpanded] = useState<readonly string[]>([]);
  const meta = COMPUTE_STATUS_META[compute.status] ?? COMPUTE_STATUS_META.running;
  const { metrics, task } = compute;
  const runtimeLabel = compute.runtime === 'agentcore-microvm' ? 'AgentCore microVM' : 'Local runtime';
  const computer = useMemo(() => asComputer(compute), [compute]);
  const seed = useMemo(() => seedOf(compute.shell?.sessionId ?? compute.label), [compute.shell?.sessionId, compute.label]);

  const budget = metrics.contextBudgetTokens;
  const contextValue = budget
    ? `${Math.round((metrics.contextTokens / budget) * 100)}% (${formatTokens(budget)})`
    : formatTokens(metrics.contextTokens);

  const lines: LogLine[] = useMemo(
    () => compute.events.map((event): LogLine => {
      const open = expanded.includes(event.id);
      const glyph = EVENT_GLYPH[event.kind] ?? EVENT_GLYPH.text;
      return {
        id: event.id,
        timestamp: clockOf(event.at),
        ...(event.kind === 'error' ? { level: 'error' as const } : {}),
        message: (
          <span className="flex flex-wrap items-baseline gap-1.5">
            <span aria-hidden="true" className={cn('shrink-0', glyph.text)}>{glyph.glyph}</span>
            <span className={cn('whitespace-pre-wrap break-words', glyph.text)}>{event.text}</span>
            {event.mock && (
              // Chip, not a dot: the label has to say the word "mock" — a
              // coloured dot beside real-looking output is exactly the
              // ambiguity the flag exists to remove.
              <Chip size="xs" mono uppercase palette="code" tone="caution" title="Produced by a mock runtime, not a real box">mock</Chip>
            )}
            {event.detail && (
              <button
                type="button"
                aria-expanded={open}
                onClick={() => setExpanded((prev) => (prev.includes(event.id) ? prev.filter((x) => x !== event.id) : [...prev, event.id]))}
                className="cursor-pointer border-none bg-transparent p-0 text-[10px] uppercase tracking-wide text-code-muted hover:text-code-text"
              >
                {open ? '− hide' : '+ detail'}
              </button>
            )}
            {event.detail && open && (
              <span className="mt-1 block w-full whitespace-pre-wrap break-words rounded border border-code-border bg-code-bg px-2 py-1 text-[11px] text-code-subtle">
                {event.detail}
              </span>
            )}
          </span>
        ),
      };
    }),
    [compute.events, expanded],
  );

  const card: WorkActivityBanner = banner ?? {
    tone: meta.tone,
    title: task.title,
    description: [
      compute.label,
      runtimeLabel,
      task.startedAt ? `started ${task.startedAt}` : null,
      compute.shared ? 'Shared with you' : 'Yours',
    ].filter(Boolean).join(' · '),
  };
  const cardTone = card.tone === 'error'
    ? { card: 'border-danger-border bg-danger-bg', dot: 'bg-danger', title: 'text-danger-fg' }
    : card.tone === 'success'
      ? { card: 'border-success-border bg-success-bg', dot: 'bg-success', title: 'text-success-fg' }
      : { card: 'border-info-border bg-info-bg', dot: 'bg-info', title: 'text-info-fg' };

  const openShell = () => {
    setTab('shell');
    compute.onOpenShell?.();
  };

  const tabs = [
    { id: 'activity', label: 'Activity' },
    ...(compute.shell ? [{ id: 'shell', label: 'Shell' }] : []),
    { id: 'workspace', label: 'Workspace' },
  ];
  // A host can drop `shell` while the Shell tab is showing (the box was
  // reaped). Falling back here rather than in an effect means the tab never
  // renders one frame of nothing.
  const activeTab = tab === 'shell' && !compute.shell ? 'activity' : tab;

  return (
    <div data-testid={testId} data-status={compute.status} className={cn('space-y-3', className)}>
      {/* The session card. The banner slot, said in this kind's own words. */}
      <div role="status" data-testid={`${testId}-card`} data-tone={card.tone} className={cn('flex gap-2 rounded-md border p-2.5', cardTone.card)}>
        <span aria-hidden="true" className={cn('mt-1.5 h-2 w-2 shrink-0 rounded-full', cardTone.dot, meta.busy && 'animate-pulse motion-reduce:animate-none')} />
        <span className="min-w-0">
          <span className={cn('block text-[13px] font-semibold', cardTone.title)}>{card.title}</span>
          {card.description && <span className="block text-xs text-text-secondary">{card.description}</span>}
          {task.description && <span className="mt-1 block text-xs text-text-secondary">{task.description}</span>}
        </span>
      </div>

      {compute.notice && (
        // Honest state, never styled as an error when it is only a fact about
        // the runtime: a mock box is a caveat, not a failure.
        <p role="status" data-testid={`${testId}-notice`} className="rounded-md border border-warning-border bg-warning-bg px-2 py-1 text-[11px] text-warning-fg">
          {compute.notice}
        </p>
      )}

      {/* Who is running this, and where it is. */}
      <div className="flex items-center gap-2" data-testid={`${testId}-owner`}>
        <Avatar name={compute.owner.name} size={22} {...(compute.owner.avatarUrl ? { src: compute.owner.avatarUrl } : {})} />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[13px] text-text-primary">{compute.owner.name}</span>
          <span className="block truncate text-[11px] text-text-tertiary">{compute.shared ? 'Shared with you' : 'Yours'}</span>
        </span>
        <StatusPill state={meta.pill} label={meta.label} size="sm" data-testid={`${testId}-status`} />
      </div>

      {/* One primary way in, and the rest behind the overflow. */}
      <div className="flex flex-wrap items-center gap-2">
        {compute.shell && (
          <Button size="sm" variant="primary" onClick={openShell} data-testid={`${testId}-open-shell`}>
            <span aria-hidden="true" className="font-mono">{'>_'}</span> Open shell
          </Button>
        )}
        {compute.onOpenLab && (
          <Button size="sm" variant="secondary" onClick={compute.onOpenLab} data-testid={`${testId}-open-lab`}>
            Open in Computer Lab
          </Button>
        )}
        {!!compute.moreActions?.length && (
          <DropdownMenu
            trigger={<span aria-hidden="true">…</span>}
            triggerLabel="More session actions"
            align="end"
            triggerTestId={`${testId}-more`}
            data-testid={`${testId}-more-menu`}
            sections={[{ items: compute.moreActions.map((action) => ({ label: action.label, ...(action.onSelect ? { onSelect: action.onSelect } : {}) })) }]}
          />
        )}
      </div>

      {/* The gauges the compute surface already draws for this same box. */}
      <div className="overflow-hidden rounded-md border border-border bg-code-bg">
        <PaneStatusLine
          computer={computer}
          modelId={metrics.model}
          {...(compute.idleWindowMs ? { idleWindowMs: compute.idleWindowMs } : {})}
          className="border-t-0"
          data-testid={`${testId}-gauges`}
        />
      </div>

      {/* The four numbers the gauges cannot label. Two columns, not a
          breakpoint grid: this pane is a rail, and Tailwind's `sm:` reads the
          VIEWPORT — four columns at 340px is four unreadable columns. */}
      <div className="grid grid-cols-2 gap-2" data-testid={`${testId}-metrics`}>
        <Metric label="Model" value={shortModelName(metrics.model)} title={metrics.model} />
        <Metric label="Cost" value={metrics.costUsd != null ? `$${metrics.costUsd.toFixed(4)}` : '—'} />
        <Metric label="Context" value={contextValue} title={`${metrics.contextTokens} tokens used`} />
        <Metric label="Environment" value={task.environment} />
      </div>

      <div>
        <Tabs
          items={tabs}
          value={activeTab}
          onValueChange={(id) => setTab(id as typeof tab)}
          variant="underline"
          size="sm"
          idPrefix={`${testId}-tab`}
          aria-label="Cloud session view"
        />
      </div>

      <TabPanel idPrefix={`${testId}-tab`} id="activity" when={activeTab} className="space-y-2">
        {/* While the session is mid-turn the ground under the output rises —
            the surface itself says "working", which reads from across a desk
            in a way a corner spinner never has. */}
        <ParticlesBackground
          active={meta.busy}
          particleCount={200}
          speed={0.14}
          alphaParticles
          moveParticlesOnHover
          particleHoverFactor={0.6}
          particleColors={AGENT_PARTICLE_COLORS}
          fallbackIntensity="medium"
          seed={seed}
          className="overflow-hidden rounded-md border border-code-border bg-code-bg"
          data-testid={`${testId}-tail`}
        >
          <div className={cn('flex items-center gap-2 border-b border-code-border px-2 py-1', meta.busy ? 'bg-transparent' : 'bg-code-panel')}>
            <Chip size="xs" mono palette="code" tone={compute.terminalPreview.running ? 'success' : 'neutral'} dot="static">
              {compute.terminalPreview.running ? 'tailing' : 'idle'}
            </Chip>
            {meta.busy && <Chip size="xs" mono palette="code" tone="info" dot="pulse">running</Chip>}
            <span className="ml-auto shrink-0 font-mono text-[10px] text-code-muted">read-only</span>
            {compute.onOpenInNew && (
              <Button tone="code" variant="ghost" size="sm" onClick={compute.onOpenInNew} data-testid={`${testId}-open-in-new`}>
                Open in new
              </Button>
            )}
          </div>
          <div className="flex items-center gap-2 border-b border-code-border px-2 py-1 font-mono text-[11px]">
            <span aria-hidden="true" className="text-code-green">▶</span>
            <span className="min-w-0 truncate text-code-text">{compute.label}</span>
            <span className="ml-auto shrink-0 text-code-blue">{task.environment}</span>
          </div>
          <LogStream
            lines={lines}
            title={null}
            showLevel={false}
            showSource={false}
            maxHeight="16rem"
            emptyMessage="No output yet."
            // Transparent while the backdrop is up: the scroll region's own
            // opaque ground would hide every star behind it.
            tone={meta.busy ? 'transparent' : 'code'}
            className="rounded-none border-none"
            data-testid={`${testId}-stream`}
          />
        </ParticlesBackground>
      </TabPanel>

      {compute.shell && (
        <TabPanel idPrefix={`${testId}-tab`} id="shell" when={activeTab}>
          <ParticlesBackground active={meta.busy} particleCount={90} speed={0.1} alphaParticles particleColors={AGENT_PARTICLE_COLORS} fallbackIntensity="low" seed={seed} className="space-y-2 rounded-md" data-testid={`${testId}-shell-particles`}>
          {compute.shell.shellUrl ? (
            <Suspense fallback={<p className="rounded-md border border-code-border bg-code-bg px-2 py-6 text-center font-mono text-[11px] text-code-muted">Loading terminal…</p>}>
              <LabTerminal
                sessionId={compute.shell.sessionId}
                shellUrl={compute.shell.shellUrl}
                className="flex h-72 min-h-0 flex-col overflow-hidden rounded-md border border-code-border"
                data-testid={`${testId}-terminal`}
              />
            </Suspense>
          ) : (
            // No URL yet is the normal first state, not a failure: the host
            // mints a presigned URL on request and it expires in minutes, so
            // asking for one before anybody wants it would waste it.
            <>
              <TerminalPreview
                lines={compute.terminalPreview.lines}
                running={compute.terminalPreview.running}
                label={compute.label}
                environment={task.environment}
                seed={seed}
                testId={`${testId}-preview`}
              />
              <p className="text-xs text-text-secondary">
                The agent is working in a cloud computer. Open a shell to look around its workspace — the same PTY, the same files.
              </p>
              <Button size="sm" variant="primary" fullWidth onClick={openShell} disabled={!compute.onOpenShell} data-testid={`${testId}-connect`}>
                <span aria-hidden="true" className="font-mono">{'>_'}</span> Open shell
              </Button>
            </>
          )}
          </ParticlesBackground>
        </TabPanel>
      )}

      <TabPanel idPrefix={`${testId}-tab`} id="workspace" when={activeTab} className="space-y-3">
        <Card label="Progress" trailing={`${compute.progress.length} ${compute.progress.length === 1 ? 'step' : 'steps'}`}>
          {compute.progress.length ? (
            <ol className="space-y-1.5" data-testid={`${testId}-progress`}>
              {compute.progress.map((step) => {
                const state = STEP_STATE[step.status];
                return (
                  <li key={step.id} data-state={step.status} className="flex items-baseline gap-2 text-[12px]">
                    <span aria-hidden="true" className={cn('mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full', state.dot)} />
                    <span className={cn('min-w-0 flex-1 truncate', state.text)} title={step.title}>{step.title}</span>
                    <span className="shrink-0 text-[11px] tabular-nums text-text-tertiary">{stepClause(step)}</span>
                  </li>
                );
              })}
            </ol>
          ) : (
            <p className="text-xs text-text-secondary">No plan was recorded for this session.</p>
          )}
        </Card>

        <Card label="Artifacts" trailing={`${compute.artifacts.length} ${compute.artifacts.length === 1 ? 'file' : 'files'}`}>
          {compute.artifacts.length ? (
            <ul className="space-y-1" data-testid={`${testId}-artifacts`}>
              {compute.artifacts.map((file) => (
                <li key={file.id} className="flex items-center gap-2">
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-mono text-[12px] text-text-primary">{file.name}</span>
                    <span className="block truncate text-[11px] text-text-tertiary">
                      {[file.sizeBytes != null ? formatBytes(file.sizeBytes) : null, file.updatedAt].filter(Boolean).join(' · ')}
                    </span>
                  </span>
                  {file.onDownload && (
                    <Button size="sm" variant="ghost" onClick={file.onDownload}>Download</Button>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-text-secondary">This session has not written a file you can see.</p>
          )}
        </Card>

        {compute.workItem && (
          <Card label="Work item">
            {(() => {
              const item = compute.workItem!;
              const body = (
                <>
                  <span className="flex min-w-0 flex-1 flex-col text-left">
                    <span className="flex items-baseline gap-2">
                      <span className="font-mono text-[12px] font-semibold text-text-primary">{item.key}</span>
                      <Chip size="xs">{item.status}</Chip>
                    </span>
                    <span className="truncate text-[12px] text-text-secondary">{item.title}</span>
                  </span>
                  {item.onOpen && <span aria-hidden="true" className="shrink-0 text-text-tertiary">↗</span>}
                </>
              );
              return (
                <>
                  {item.onOpen ? (
                    <button
                      type="button"
                      onClick={item.onOpen}
                      data-testid={`${testId}-work-item`}
                      className="flex w-full items-center gap-2 rounded-md border border-border p-2 text-left hover:border-border-emphasis focus-visible:outline-2 focus-visible:outline-primary"
                    >
                      {body}
                    </button>
                  ) : (
                    <div data-testid={`${testId}-work-item`} className="flex items-center gap-2 rounded-md border border-border p-2">{body}</div>
                  )}
                  {!!item.tags.length && (
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => <Chip key={tag} size="xs" tone="info">{tag}</Chip>)}
                    </div>
                  )}
                </>
              );
            })()}
          </Card>
        )}
      </TabPanel>
    </div>
  );
}

export default WorkComputePane;

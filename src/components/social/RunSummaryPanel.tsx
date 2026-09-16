// RunSummaryPanel — a pipeline run, condensed and read-only, beside a chat.
//
// Clicking a run in the Activity feed used to leave the conversation for the
// full pipeline page. The owner's ask: stay put, show where the run sits in the
// chat, and show the run itself in a short form next to it — with the full run
// and the chat each one click away. This is that short form: the pipeline's
// human name and its status, the command that started it, the steps as a
// vertical timeline, what changed, the document or result it produced, the
// error when it failed, and a footer with the two ways out.
//
// It reuses the AgentRunCard's vocabulary on purpose — the same step statuses,
// the same dot colours, the same `describeAgentRunOp` sentences — so the card
// in the thread and the panel beside it describe one run in one voice. The
// pipelines/steps components (StepTree, StepThread) are the FULL page; they
// are far too heavy for a side pane and are not used here.
//
// `createRunPanelRenderer` is the side-panel body for kind `run`, the way
// `createGraphPanelRenderer` is for `graph`: the host supplies `load` (how a
// ChatSidePanelRef becomes RunPanelData) and the two destinations, and gets
// loading, error and the live refresh for free. The panel id is
// `<pipelineId>:<runId>` — the same shape the app already uses for `graph`.

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { DocumentIcon } from '../ui/Icons';
import Chip from '../shared/Chip';
import { InlineAlert } from '../shared/InlineAlert';
import SkeletonCard from '../shared/SkeletonCard';
import { Button } from '../ui/Button';
import type { ChatSidePanelRef } from './chatCommands';
import type { ChatSidePanelApi, ChatSidePanelRenderer } from './ChatSidePanelRegistry';
import {
  AGENT_RUN_STEP_DOT,
  agentRunTimings,
  describeAgentRunOp,
  type AgentRunOp,
  type AgentRunPhase,
  type AgentRunResult,
  type AgentRunStep,
} from './AgentRunCard';

/** The run's status, in the card's phase vocabulary (mirrors realtime-modules' `PipelineRunPhase`). */
export type RunPanelStatus = AgentRunPhase;

/** What the condensed panel shows. The host builds it from the run snapshot and the pipeline definition. */
export interface RunPanelData {
  pipelineId: string;
  runId: string;
  /** "Call transcription", not `call-transcription`. Falls back to the id. */
  pipelineName?: string;
  /** The chat command that started the run — `/doc`, `/summarize`. */
  command?: string;
  /** What the person asked for, in their words. */
  instruction?: string;
  status: RunPanelStatus;
  /** ISO timestamps. */
  startedAt?: string;
  completedAt?: string;
  /** Why it failed, when it did. */
  error?: string;
  steps: AgentRunStep[];
  /** What the run changed, in the document-ops vocabulary. */
  ops?: AgentRunOp[];
  /** The document the run worked on, when it worked on one. */
  document?: { id: string; title?: string; snippet?: string };
  /** What a finished run produced, when it is something a reader can open. */
  result?: AgentRunResult;
  /** The conversation the run's card was posted in, when known. */
  channel?: string;
  /** The card's message id in that conversation, when known. */
  messageId?: string;
}

export interface CreateRunPanelRendererOptions {
  /** Fetches the run. Called on open, and again every `refreshMs` while the run is not terminal; a throw on open becomes the error state. */
  load: (panel: ChatSidePanelRef) => Promise<RunPanelData>;
  /** The footer's primary action: the full run page. */
  onOpenFull: (panel: ChatSidePanelRef, data: RunPanelData) => void;
  /** The footer's secondary action, offered when the run knows its conversation. */
  onOpenChat?: (panel: ChatSidePanelRef, data: RunPanelData) => void;
  /** "Open beside the chat" on the document row. */
  onOpenDocument?: (documentId: string) => void;
  /** Open the finished run's result — a panel, a document, a link. */
  onOpenResult?: (result: AgentRunResult) => void;
  /** Re-load interval while the run is running / awaiting. Default 2000; `0` disables. */
  refreshMs?: number;
  'data-testid'?: string;
}

/** `<pipelineId>:<runId>` — the panel id for a run. */
export function runPanelId(pipelineId: string, runId: string): string {
  return `${pipelineId}:${runId}`;
}

/** The two halves of a run panel id, split at the first `:`; null when either half is missing. */
export function parseRunPanelId(id: string): { pipelineId: string; runId: string } | null {
  const at = id.indexOf(':');
  if (at <= 0 || at === id.length - 1) return null;
  return { pipelineId: id.slice(0, at), runId: id.slice(at + 1) };
}

/** A run that is still moving — the panel keeps re-reading it. */
export function isRunPanelLive(status: RunPanelStatus): boolean {
  return status === 'received' || status === 'running' || status === 'awaiting_approval';
}

const STATUS_LABEL: Record<RunPanelStatus, string> = {
  received: 'Received',
  running: 'Running',
  awaiting_approval: 'Needs approval',
  completed: 'Completed',
  rejected: 'Rejected',
  failed: 'Failed',
};

const STATUS_TONE: Record<RunPanelStatus, 'neutral' | 'info' | 'warning' | 'success' | 'danger'> = {
  received: 'neutral',
  running: 'info',
  awaiting_approval: 'warning',
  completed: 'success',
  rejected: 'danger',
  failed: 'danger',
};

/** The most ops the panel lists before "+N more". */
const MAX_OPS = 8;

function resultLabel(result: AgentRunResult): string {
  if (result.kind === 'link') return result.label ?? 'Open link';
  if (result.kind === 'panel') return result.panel.title ? `Open ${result.panel.title}` : 'Open result';
  return 'Open beside the chat';
}

export interface RunSummaryPanelProps {
  data: RunPanelData;
  onOpenFull: () => void;
  /** Offered only when the run knows its conversation. */
  onOpenChat?: () => void;
  onOpenDocument?: (documentId: string) => void;
  onOpenResult?: (result: AgentRunResult) => void;
  className?: string;
  'data-testid'?: string;
}

/** The condensed run, given its data. `createRunPanelRenderer` wraps it with loading, error and refresh. */
export function RunSummaryPanel({ data, onOpenFull, onOpenChat, onOpenDocument, onOpenResult, className, 'data-testid': testId = 'run-summary-panel' }: RunSummaryPanelProps) {
  const { status } = data;
  const name = data.pipelineName || data.pipelineId;
  const timings = agentRunTimings({ startedAt: data.startedAt, completedAt: data.completedAt });
  const ops = data.ops ?? [];
  // A document result IS the document row — do not show the same destination twice.
  const showResult = data.result && onOpenResult && !(data.result.kind === 'document' && data.document && onOpenDocument);
  const docTitle = data.document?.title || 'Document';
  const error = status === 'failed' ? data.error || 'The run failed' : undefined;

  return (
    <div className={cn('flex h-full min-h-0 flex-col text-[12px]', className)} data-testid={testId} data-status={status} data-run-id={data.runId} data-pipeline-id={data.pipelineId}>
      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-auto p-3">
        <header className="flex flex-col gap-1" data-testid={`${testId}-header`}>
          <div className="flex min-w-0 items-center gap-2">
            <span className="min-w-0 flex-1 truncate text-[13px] font-semibold text-text-primary" data-testid={`${testId}-name`}>{name}</span>
            <Chip size="xs" tone={STATUS_TONE[status]} dot={status === 'running' ? 'pulse' : undefined} data-testid={`${testId}-status`}>
              {STATUS_LABEL[status]}
            </Chip>
          </div>
          {timings && <span className="text-[11px] text-text-tertiary" data-testid={`${testId}-timings`}>{timings}</span>}
          {(data.command || data.instruction) && (
            <p className="m-0 min-w-0 text-text-primary" data-testid={`${testId}-instruction`}>
              {data.command && <span className="font-mono text-text-tertiary">{data.command}</span>}
              {data.command && data.instruction ? ' ' : ''}
              {data.instruction}
            </p>
          )}
        </header>

        {data.steps.length > 0 && (
          <section aria-label="Steps" data-testid={`${testId}-steps`}>
            <h3 className="m-0 text-[10px] font-semibold uppercase tracking-wide text-text-tertiary">Steps</h3>
            <ol className="m-0 mt-1 flex list-none flex-col p-0">
              {data.steps.map((step, i) => (
                <li key={step.id} className="relative flex items-start gap-2 pb-2 last:pb-0" data-step-id={step.id} data-status={step.status}>
                  {/* The rail between dots — none below the last step. */}
                  {i < data.steps.length - 1 && <span aria-hidden="true" className="absolute left-[3px] top-3 h-[calc(100%-6px)] w-px bg-border" />}
                  <span aria-hidden="true" className={cn('relative mt-[5px] inline-block h-[7px] w-[7px] shrink-0 rounded-full', AGENT_RUN_STEP_DOT[step.status] ?? AGENT_RUN_STEP_DOT.pending)} />
                  <span className="flex min-w-0 flex-1 items-baseline justify-between gap-2">
                    <span className={cn('min-w-0 truncate', step.status === 'failed' ? 'text-danger' : step.status === 'skipped' ? 'text-text-tertiary line-through' : step.status === 'running' ? 'font-medium text-text-primary' : 'text-text-secondary')}>{step.label}</span>
                    <span className="shrink-0 text-[10px] text-text-tertiary">{step.status === 'awaiting' ? 'needs approval' : step.status}</span>
                  </span>
                </li>
              ))}
            </ol>
          </section>
        )}

        {ops.length > 0 && (
          <section data-testid={`${testId}-ops`}>
            <h3 className="m-0 text-[10px] font-semibold uppercase tracking-wide text-text-tertiary">What changed</h3>
            <ul className="m-0 mt-0.5 list-none p-0 text-[11px] text-text-secondary">
              {ops.slice(0, MAX_OPS).map((op, i) => (
                <li key={i} className="truncate" data-op={op.op} title={op.text}>{describeAgentRunOp(op)}</li>
              ))}
            </ul>
            {ops.length > MAX_OPS && <div className="text-[11px] text-text-tertiary" data-testid={`${testId}-more-ops`}>+{ops.length - MAX_OPS} more</div>}
          </section>
        )}

        {data.document && (
          <div className="flex items-start gap-2 rounded-md border border-border bg-surface-inset px-2 py-1.5" data-testid={`${testId}-document`}>
            <DocumentIcon size={14} className="mt-0.5 shrink-0 text-text-tertiary" aria-hidden="true" />
            <span className="min-w-0 flex-1">
              <span className="block truncate font-medium text-text-primary">{docTitle}</span>
              {data.document.snippet && <span className="line-clamp-2 block text-[11px] text-text-secondary">{data.document.snippet}</span>}
            </span>
            {onOpenDocument && (
              <Button size="sm" variant="primary" className="!px-2 !py-0.5 text-[11px] leading-5" onClick={() => onOpenDocument(data.document!.id)} data-testid={`${testId}-open-document`}>
                Open beside the chat
              </Button>
            )}
          </div>
        )}

        {showResult && data.result && (
          <div className="flex items-center gap-2" data-testid={`${testId}-result`} data-result-kind={data.result.kind}>
            <span className="min-w-0 flex-1 text-text-secondary">Result</span>
            <Button size="sm" variant="secondary" className="!px-2 !py-0.5 text-[11px] leading-5" onClick={() => onOpenResult!(data.result!)} data-testid={`${testId}-open-result`}>
              {resultLabel(data.result)}
            </Button>
          </div>
        )}

        {error && (
          <InlineAlert tone="error" className="text-[11px]">
            <span data-testid={`${testId}-error`}>{error}</span>
          </InlineAlert>
        )}
      </div>

      <footer className="flex shrink-0 items-center gap-2 border-t border-border px-3 py-2" data-testid={`${testId}-footer`}>
        <Button size="sm" variant="primary" onClick={onOpenFull} data-testid={`${testId}-open-full`}>Open full run</Button>
        {onOpenChat && data.channel && (
          <Button size="sm" variant="secondary" onClick={onOpenChat} data-testid={`${testId}-open-chat`}>Open chat</Button>
        )}
      </footer>
    </div>
  );
}

// ---------------------------------------------------------------------------

type LoadState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ready'; data: RunPanelData };

interface RunPanelBodyProps {
  panel: ChatSidePanelRef;
  api: ChatSidePanelApi;
  options: CreateRunPanelRendererOptions;
}

export function RunPanelBody({ panel, api, options }: RunPanelBodyProps): ReactNode {
  const { load, onOpenFull, onOpenChat, onOpenDocument, onOpenResult, refreshMs = 2000, 'data-testid': testId = 'run-panel' } = options;
  const [state, setState] = useState<LoadState>({ status: 'loading' });
  const [attempt, setAttempt] = useState(0);
  // The latest `load`, so the refresh never calls a stale closure.
  const loadRef = useRef(load);
  useEffect(() => { loadRef.current = load; }, [load]);

  // First read: loading → ready | error.
  useEffect(() => {
    let cancelled = false;
    setState({ status: 'loading' });
    loadRef.current(panel).then(
      (data) => {
        if (cancelled) return;
        setState({ status: 'ready', data });
        if (data.pipelineName) api.setTitle(data.pipelineName);
      },
      (err: unknown) => {
        if (cancelled) return;
        setState({ status: 'error', message: err instanceof Error ? err.message : String(err) });
      },
    );
    return () => { cancelled = true; };
    // The parent keys the body by kind:id, so `panel` identity is the fetch key; `attempt` is the retry.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [panel.kind, panel.id, attempt]);

  // Live: re-read on a clock while the run is moving, and stop once it is not.
  // A refresh that fails keeps what was on screen — a blip should not replace
  // a run with an error box.
  const live = state.status === 'ready' && isRunPanelLive(state.data.status);
  useEffect(() => {
    if (!live || refreshMs <= 0) return;
    let cancelled = false;
    const t = window.setInterval(() => {
      loadRef.current(panel).then(
        (data) => {
          if (cancelled) return;
          setState({ status: 'ready', data });
          if (data.pipelineName) api.setTitle(data.pipelineName);
        },
        () => { /* keep the last good read */ },
      );
    }, refreshMs);
    return () => { cancelled = true; window.clearInterval(t); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [live, refreshMs, panel.kind, panel.id]);

  const retry = useCallback(() => setAttempt((a) => a + 1), []);

  if (state.status === 'loading') {
    return (
      <div className="flex flex-col gap-3 p-3" data-testid={`${testId}-loading`} aria-busy="true">
        <SkeletonCard height={20} width="60%" rounded="md" />
        <SkeletonCard height={14} width="40%" rounded="md" />
        <SkeletonCard height={96} />
        <SkeletonCard height={44} />
      </div>
    );
  }
  if (state.status === 'error') {
    return (
      <div className="flex flex-col gap-2 p-3" data-testid={`${testId}-error`}>
        <InlineAlert tone="error">Could not load this run: {state.message}</InlineAlert>
        <Button size="sm" variant="secondary" onClick={retry} className="self-start" data-testid={`${testId}-retry`}>Try again</Button>
      </div>
    );
  }
  const { data } = state;
  return (
    <RunSummaryPanel
      data={data}
      onOpenFull={() => onOpenFull(panel, data)}
      onOpenChat={onOpenChat ? () => onOpenChat(panel, data) : undefined}
      onOpenDocument={onOpenDocument}
      onOpenResult={onOpenResult}
      data-testid={testId}
    />
  );
}

/** One line for a host: `renderers={{ run: createRunPanelRenderer({ load, onOpenFull }) }}`. */
export function createRunPanelRenderer(options: CreateRunPanelRendererOptions): ChatSidePanelRenderer {
  return (panel, api) => <RunPanelBody panel={panel} api={api} options={options} />;
}

export default RunSummaryPanel;

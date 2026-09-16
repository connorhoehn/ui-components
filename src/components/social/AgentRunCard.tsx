// AgentRunCard — a "/doc …" command in the thread, and what became of it.
//
// The message IS the command; the card replaces the text the way a document
// share or a call does. It tells the reader three things in order: the
// instruction, who is carrying it out (an agent, named), and where the run
// is — received, running through the pipeline (with the current step),
// waiting for someone to approve a big edit (with Approve / Reject right
// here), done, rejected or failed — so the pipeline is visible without
// leaving the conversation. An edit that landed as suggestions rather than
// changes is done but not decided, so the finished card offers Accept /
// Reject and, once someone has decided, says who.
//
// Collapsed, that is the whole card: two lines. Opened (the chevron, or a
// click anywhere that is not a button), the same card grows a details block —
// the document with "Open beside the chat", what changed op by op, the steps
// as a mini timeline, and the run's timings — so "what did it actually do?"
// is answered in the thread rather than in the pipeline UI.
//
// The card is width-aware of ITSELF (`@container`), because it renders both in
// a document's ~267px conversation column and in the far wider main chat. When
// the status row cannot seat everything, it sheds in a fixed order: the two
// "open" links go first (the disclosure still reaches both), then the sentence
// takes a line of its own so the decision buttons keep their full size. The
// decision buttons are never the thing that gives way — they are the only part
// of the card that asks the reader to do something.

import { useState, type MouseEvent } from 'react';
import { cn } from '../../lib/cn';
import Chip from '../shared/Chip';
import type { ChatSidePanelRef } from './chatCommands';
import { Button } from '../ui/Button';
import { IconButton } from '../ui/IconButton';

export type AgentRunPhase = 'received' | 'running' | 'awaiting_approval' | 'completed' | 'rejected' | 'failed';

export type AgentRunDecision = 'approve' | 'reject';

/** What a reviewer does with an edit that landed as suggestions. */
export type AgentRunReviewDecision = 'accept' | 'reject';

/**
 * The suggestions a finished edit left in the document, waiting for a
 * reviewer. Mirrors realtime-modules' `PipelineRunStatus.suggestion` — keep
 * the field names.
 */
export interface AgentRunSuggestion {
  /** The suggestion key the changes were tagged with; the review resolves everything under it. */
  key: string;
  documentId?: string;
  /** How many changes were suggested. */
  applied: number;
}

/** Who accepted or rejected the suggestions, and when. Mirrors realtime-modules' `PipelineRunStatus.review`. */
export interface AgentRunReview {
  decision: AgentRunReviewDecision;
  /** The reviewer's id. */
  by: string;
  byName?: string;
  /** ISO timestamp. */
  at: string;
}

/**
 * What a finished run produced, when it produced something a reader can open:
 * a side panel (a search graph, a trace), the document it edited, or a link.
 * Read from the message's metadata (`result`) when the run is posted done, or
 * from the live status while the card is watching it.
 */
export type AgentRunResult =
  | { kind: 'panel'; panel: ChatSidePanelRef }
  | { kind: 'document'; documentId: string }
  | { kind: 'link'; href: string; label?: string };

/** One step of the run, for the expanded timeline. Mirrors realtime-modules' step status vocabulary — keep the names. */
export type AgentRunStepStatus = 'pending' | 'running' | 'completed' | 'failed' | 'skipped' | 'awaiting';

export interface AgentRunStep {
  id: string;
  label: string;
  status: AgentRunStepStatus;
}

/**
 * One edit the agent made, in the document-ops vocabulary the pipeline emits
 * (`setTitle`, `appendBlock`, `replaceBlock`, …). The card turns each into a
 * sentence; an op it does not know is shown by name.
 */
export interface AgentRunOp {
  op: string;
  /** The new title, the block's text, the macro's name, the type's name, or a skip's reason — whichever the op carries. */
  text?: string;
  /** The block the op acted on, zero-based. */
  index?: number;
  /** The block an `appendBlock`/`insertBlock` added — 'paragraph' | 'heading' | 'horizontalRule'. */
  kind?: string;
  /** A heading's level (1–6). */
  level?: number;
}

/**
 * What the expanded card shows. Populated by realtime-modules' run hook from
 * the run's steps and the edit it applied — keep the field names.
 */
export interface AgentRunDetails {
  steps?: AgentRunStep[];
  ops?: AgentRunOp[];
  document?: { id: string; title?: string; snippet?: string };
  /** ISO timestamps. */
  startedAt?: string;
  completedAt?: string;
  error?: string;
}

export interface AgentRunStatus {
  phase: AgentRunPhase;
  /** The outcome to open, once `phase === 'completed'`. */
  result?: AgentRunResult;
  /**
   * Set when the run completed but changed nothing — the model declined the
   * instruction. The badge reads "No change" and `detail` carries the reason,
   * so a declined run and a landed edit stop looking identical.
   */
  noop?: boolean;
  /** Everything the expanded card shows: steps, ops, the document, timings. */
  details?: AgentRunDetails;
  /** The step in flight, when known — "Reading the document", "Planning the edit", "Retrying — attempt 2". */
  stepLabel?: string;
  /** A sentence about the outcome — "Renamed to …", the failure, why approval is needed. */
  detail?: string;
  /** The approval step a decision goes to, while `phase === 'awaiting_approval'`. */
  approvalStepId?: string;
  /** Set when a completed edit landed as suggestions rather than changes; the card offers Accept / Reject until `review` is set. */
  suggestion?: AgentRunSuggestion;
  /** Set once someone accepted or rejected the suggestions. */
  review?: AgentRunReview;
}

export interface AgentRunCardProps {
  runId: string;
  instruction: string;
  /** The agent carrying it out, e.g. "Haiku". */
  agentName: string;
  requestedBy?: string;
  /** The command this run is — `/doc`, `recording`, `transcribe`. Shown in mono before the instruction. */
  command?: string;
  status?: AgentRunStatus;
  /** Open the document the edit went into. */
  onOpenDocument?: () => void;
  /** Open the run in the pipeline UI. */
  onOpenRun?: (runId: string) => void;
  /** The result carried in the message's metadata; `status.result` wins when both are set. */
  result?: AgentRunResult;
  /** Open the finished run's result — a panel beside the chat, the document, a link. The action renders only when this is given. */
  onOpenResult?: (result: AgentRunResult) => void;
  /** Approve or reject a run that is waiting; the buttons render only when this is given. */
  onDecide?: (runId: string, decision: AgentRunDecision) => void;
  /** The suggestions carried in the message's metadata; `status.suggestion` wins when both are set. */
  suggestion?: Pick<AgentRunSuggestion, 'key' | 'documentId'>;
  /** Accept or reject a finished edit that landed as suggestions; the buttons render only when this is given. */
  onReview?: (runId: string, decision: AgentRunReviewDecision, suggestion: Pick<AgentRunSuggestion, 'key' | 'documentId'>) => void;
  /** The document's title as the message carried it; the expanded document row falls back to it when the live details have none. */
  documentTitle?: string;
  /** Start expanded. The default is the two-line card; the details are a click away. */
  defaultExpanded?: boolean;
  className?: string;
  'data-testid'?: string;
}

const STEPS: Array<{ phase: AgentRunPhase | 'running'; label: string }> = [
  { phase: 'received', label: 'Received' },
  { phase: 'running', label: 'Processing via pipeline' },
  { phase: 'completed', label: 'Updated' },
];

// The approval wait is a beat inside "processing"; a rejection ends the run where a failure would.
const ORDER: Record<AgentRunPhase, number> = { received: 0, running: 1, awaiting_approval: 1, completed: 2, rejected: 2, failed: 2 };
const PHASE_LABEL: Record<AgentRunPhase, string> = { received: 'Received', running: 'Processing', awaiting_approval: 'Needs approval', completed: 'Updated', rejected: 'Rejected', failed: 'Failed' };

/** The most ops the expanded card lists before "+N more". */
const MAX_OPS = 6;

// The status row's text controls are underlined AT REST, not on hover. They
// were flat tertiary text that only underlined under the pointer, so nothing
// marked them as pressable until you were already on one.
const ROW_LINK = 'shrink-0 whitespace-nowrap underline underline-offset-2';
// …and the two "open" links are the first thing to go when the card is narrow:
// a reader in a 267px column keeps the decision buttons, and reaches the run
// and the document through the disclosure instead.
const ROW_LINK_WIDE_ONLY = `${ROW_LINK} hidden text-text-tertiary hover:text-text-primary @md:inline`;

function clip(text: string, max = 60): string {
  const t = text.trim().replace(/\s+/g, ' ');
  return t.length > max ? `${t.slice(0, max - 1).trimEnd()}…` : t;
}

/** A block index as a reader counts blocks — from one, not zero. */
function blockNo(index: number | undefined): string {
  return typeof index === 'number' ? String(index + 1) : '?';
}

/** One op as a sentence. Exported for the tests and for hosts that render a run outside the card. */
export function describeAgentRunOp(op: AgentRunOp): string {
  const text = op.text ?? '';
  switch (op.op) {
    case 'setTitle': return `Renamed to “${clip(text)}”`;
    case 'appendBlock':
    case 'insertBlock':
      // A divider has no text to quote, and a heading reads better named as one.
      if (op.kind === 'horizontalRule') return 'Added a divider';
      if (op.kind === 'heading') return text.trim() ? `Added heading “${clip(text)}”` : 'Added an empty heading';
      return text.trim() ? `Added: “${clip(text)}”` : 'Added an empty block';
    case 'replaceBlock': return `Rewrote block ${blockNo(op.index)}`;
    case 'deleteBlock': return `Removed block ${blockNo(op.index)}`;
    case 'appendMacro': return text ? `Added a ${clip(text, 40)}` : 'Added a macro';
    case 'copyBlock': return `Carried block ${blockNo(op.index)}`;
    case 'setDocumentType': return `Type: ${clip(text, 40)}`;
    case 'skip': return text ? clip(text, 120) : 'Skipped';
    default: return text ? `${op.op}: ${clip(text)}` : op.op;
  }
}

function timeOfDay(iso: string): string | null {
  const ms = Date.parse(iso);
  if (Number.isNaN(ms)) return null;
  return new Date(ms).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function duration(startedAt: string, completedAt: string): string | null {
  const ms = Date.parse(completedAt) - Date.parse(startedAt);
  if (Number.isNaN(ms) || ms < 0) return null;
  const s = Math.round(ms / 1000);
  return s < 600 ? `${s}s` : `${Math.round(s / 60)}m`;
}

/** "started 21:44 · 80s" — whichever halves the timestamps allow. */
export function agentRunTimings(details: Pick<AgentRunDetails, 'startedAt' | 'completedAt'> | undefined): string | null {
  if (!details?.startedAt) return null;
  const started = timeOfDay(details.startedAt);
  if (!started) return null;
  const took = details.completedAt ? duration(details.startedAt, details.completedAt) : null;
  return took ? `started ${started} · ${took}` : `started ${started}`;
}

// The step dots reuse the tone vocabulary of the three-beat progress row above.
/** The dot class for a step status — shared with RunSummaryPanel so the two timelines read the same. */
export const AGENT_RUN_STEP_DOT: Record<AgentRunStepStatus, string> = {
  pending: 'bg-border',
  running: 'animate-pulse bg-info',
  completed: 'bg-success',
  failed: 'bg-danger',
  skipped: 'bg-border',
  awaiting: 'bg-warning',
};

export function AgentRunCard({ runId, instruction, agentName, requestedBy, command = '/doc', status, onOpenDocument, onOpenRun, result, onOpenResult, onDecide, suggestion: suggestionProp, onReview, documentTitle, defaultExpanded = false, className, 'data-testid': testId = 'agent-run-card' }: AgentRunCardProps) {
  const phase = status?.phase ?? 'received';
  const [expanded, setExpanded] = useState(defaultExpanded);
  // Suggestions are only reviewable once the run is done — before that there is nothing in the document yet.
  const suggestion = phase === 'completed' ? status?.suggestion ?? suggestionProp : undefined;
  const review = phase === 'completed' ? status?.review : undefined;
  const reviewable = Boolean(suggestion) && !review;
  // A completed run that changed nothing is not "Updated": the model declined, and the reason is the detail.
  const noop = phase === 'completed' && status?.noop === true;
  // The result is only openable once the run is done; before that it is a promise, not a link.
  const outcome = phase === 'completed' ? status?.result ?? result : undefined;
  const resultLabel = outcome?.kind === 'link' && outcome.label ? outcome.label : 'Open';
  // A document result IS the document link — do not show the same destination twice.
  const showDocument = onOpenDocument && !(outcome?.kind === 'document' && onOpenResult);
  const at = ORDER[phase];
  const ended = phase === 'failed' || phase === 'rejected';
  // A reviewed edit is settled either way; a rejection of suggestions is not a failed run, so it stays neutral.
  const tone = ended ? 'danger' : review ? (review.decision === 'accept' ? 'success' : 'neutral') : noop ? 'warning' : phase === 'completed' ? (suggestion ? 'warning' : 'success') : phase === 'awaiting_approval' ? 'warning' : 'info';
  const phaseLabel = review ? 'Reviewed' : reviewable ? 'Suggested' : noop ? 'No change' : PHASE_LABEL[phase];
  const reviewer = review ? review.byName ?? review.by : undefined;
  const reviewDetail = review ? `${review.decision === 'accept' ? 'Accepted' : 'Rejected'} by ${reviewer}` : undefined;
  const awaiting = phase === 'awaiting_approval';
  const detailText = phase === 'running'
    ? (status?.stepLabel ? `${agentName} — ${status.stepLabel}` : `${agentName} is working via the pipeline`)
    : awaiting
      ? `Waiting for approval${status?.detail ? ` — ${status.detail}` : ''}`
      : reviewDetail ?? status?.detail ?? (reviewable && status?.suggestion ? `${status.suggestion.applied} ${status.suggestion.applied === 1 ? 'change' : 'changes'} suggested` : phase === 'received' ? 'Received' : phaseLabel);

  const details = status?.details;
  const ops = details?.ops ?? [];
  const steps = details?.steps ?? [];
  const docTitle = details?.document?.title || documentTitle || 'Document';
  // The document row shows whenever there IS a document — named in the details, or openable through the host.
  const hasDocumentRow = Boolean(details?.document) || Boolean(onOpenDocument);
  const error = details?.error ?? (phase === 'failed' ? status?.detail : undefined);
  const timings = agentRunTimings(details);
  const detailsId = `${testId}-details-${runId}`;
  // Does the status row carry anything that must keep its full size? Only then
  // is the width worth spending a second line on: a plain "Updated" card in a
  // narrow column should stay exactly as short as it is today.
  const hasRowActions = Boolean(
    (reviewable && suggestion && onReview) || (awaiting && onDecide) || (outcome && onOpenResult) || (outcome?.kind === 'link' && !onOpenResult),
  );

  // Clicking the card toggles it — but not a click on one of its buttons or
  // links, which already do something.
  const toggleFromBody = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('button, a')) return;
    setExpanded((v) => !v);
  };

  // Two lines, no more, until it is opened: the command, and where the run
  // is. A command in a conversation is a small thing that happened, not a
  // panel — the panel is a click away, inside the same card.
  return (
    <div
      // `@container`: the same card sits in a document's ~267px conversation
      // column and in the ~576px main chat, so the status row has to re-rank
      // itself by the CARD's width, not the viewport's — a media query would
      // read the window and get the narrow column wrong every time.
      className={cn('@container flex w-full max-w-[36rem] cursor-default flex-col gap-0.5 rounded-md border border-border bg-surface px-2 py-1 text-left text-[12px]', className)}
      data-testid={testId}
      data-phase={phase}
      data-run-id={runId}
      data-expanded={expanded ? 'true' : undefined}
      title={requestedBy ? `${requestedBy} asked ${agentName}: ${instruction}` : `${agentName}: ${instruction}`}
      onClick={toggleFromBody}
    >
      <div className="flex min-w-0 items-center gap-1.5">
        <span aria-hidden="true" className="shrink-0">🪄</span>
        <span className="min-w-0 flex-1 truncate text-text-primary" data-testid={`${testId}-instruction`}>
          <span className="font-mono text-text-tertiary">{command}</span> {instruction}
        </span>
        <Chip size="xs" tone={tone} data-testid={`${testId}-phase`}>{phaseLabel}</Chip>
        <IconButton
          size="sm"
          aria-label={expanded ? 'Hide details' : 'Show details'}
          aria-expanded={expanded}
          aria-controls={expanded ? detailsId : undefined}
          onClick={() => setExpanded((v) => !v)}
          className="!h-5 !w-5 shrink-0 text-[10px] text-text-tertiary"
          data-testid={`${testId}-toggle`}
          icon={<span aria-hidden="true" className={cn('inline-block transition-transform duration-150', expanded && 'rotate-90')}>▶</span>}
        />
      </div>
      {/* The status row is the one row that can run out of room: progress, what
          happened, a decision pair and two ways out, all competing for the
          267px of a document's conversation column. Its ranking, narrowest
          first: the decision buttons never shrink and never hide (they are the
          thing a person must act on), the sentence truncates (and gets the
          whole line to itself once anything shares the row with it), and the
          two "open" links are dropped below `@md` — the disclosure below leads
          to both of those destinations, so nothing becomes unreachable. */}
      <div className="flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-1 text-[11px] text-text-secondary">
        {/* Progress and the sentence travel as one block so the wrap can never
            separate the dots from what they are describing. `basis-full` gives
            that block its own line while there is something to wrap below it;
            `@sm:basis-0` hands the row back to a single line once the card is
            wide enough to seat everything. */}
        <div className={cn('flex min-w-0 grow items-center gap-1.5', hasRowActions && 'basis-full @sm:basis-0')}>
          <ol className="m-0 flex shrink-0 list-none items-center gap-1 p-0" aria-label="Run progress" data-testid={`${testId}-steps`}>
            {STEPS.map((s, i) => {
              const done = ended ? i < at : i < at || (i === at && phase === 'completed');
              const active = i === at && phase !== 'completed' && !ended;
              const failedHere = ended && i === at;
              return (
                <li key={s.phase} className="flex items-center" title={s.label} data-state={failedHere ? 'failed' : done ? 'done' : active ? 'active' : 'pending'}>
                  <span
                    aria-hidden="true"
                    className={cn('inline-block h-1.5 w-1.5 rounded-full', failedHere ? 'bg-danger' : done ? (noop && i === at ? 'bg-warning' : 'bg-success') : active ? (awaiting ? 'bg-warning' : 'animate-pulse bg-info') : 'bg-border')}
                  />
                  <span className="sr-only">{failedHere ? phaseLabel : s.label}</span>
                </li>
              );
            })}
          </ol>
          <span
            className={cn('min-w-0 flex-1 truncate', review && (review.decision === 'accept' ? 'text-success' : 'text-text-tertiary'), phase === 'failed' && 'text-danger', noop && 'text-warning-fg')}
            data-testid={`${testId}-detail`}
            data-review={review?.decision}
            // The full sentence on hover: the line truncates, and a declined
            // run's reason or a failure's message is exactly what gets cut.
            title={status?.detail}
          >
            {detailText}
          </span>
        </div>
        {reviewable && suggestion && onReview && (
          // The same inline pair as approval: accepting the suggestions is the next thing to do.
          <span className="flex shrink-0 items-center gap-1" data-testid={`${testId}-review`}>
            <Button size="sm" variant="primary" className="!px-2 !py-0 text-[11px] leading-5" onClick={() => onReview(runId, 'accept', { key: suggestion.key, ...(suggestion.documentId ? { documentId: suggestion.documentId } : {}) })} data-testid={`${testId}-accept`}>Accept</Button>
            <Button size="sm" variant="ghost" className="!px-2 !py-0 text-[11px] leading-5" onClick={() => onReview(runId, 'reject', { key: suggestion.key, ...(suggestion.documentId ? { documentId: suggestion.documentId } : {}) })} data-testid={`${testId}-reject-review`}>Reject</Button>
          </span>
        )}
        {awaiting && onDecide && (
          // Inline, small, on the status line: the decision is the next thing
          // to do and the card is still two lines tall.
          <span className="flex shrink-0 items-center gap-1" data-testid={`${testId}-decide`}>
            <Button size="sm" variant="primary" className="!px-2 !py-0 text-[11px] leading-5" onClick={() => onDecide(runId, 'approve')} data-testid={`${testId}-approve`}>Approve</Button>
            <Button size="sm" variant="ghost" className="!px-2 !py-0 text-[11px] leading-5" onClick={() => onDecide(runId, 'reject')} data-testid={`${testId}-reject`}>Reject</Button>
          </span>
        )}
        {/* The run's own outcome, not navigation — it stays at every width.
            It is one short word and there is nowhere else to reach a panel or
            an external link from the collapsed card. */}
        {outcome && onOpenResult && (
          <button type="button" onClick={() => onOpenResult(outcome)} className={cn(ROW_LINK, 'font-medium text-info')} data-testid={`${testId}-open-result`} data-result-kind={outcome.kind}>
            {resultLabel}
          </button>
        )}
        {outcome?.kind === 'link' && !onOpenResult && (
          <a href={outcome.href} target="_blank" rel="noopener noreferrer" className={cn(ROW_LINK, 'font-medium text-info')} data-testid={`${testId}-open-result`} data-result-kind="link">
            {resultLabel}
          </a>
        )}
        {onOpenRun && (
          <button type="button" onClick={() => onOpenRun(runId)} className={ROW_LINK_WIDE_ONLY} data-testid={`${testId}-open-run`}>
            Open run
          </button>
        )}
        {showDocument && (
          <button type="button" onClick={onOpenDocument} className={ROW_LINK_WIDE_ONLY} data-testid={`${testId}-open-document`}>
            Open document
          </button>
        )}
      </div>
      {expanded && (
        <div id={detailsId} className="mt-1 flex flex-col gap-2 border-t border-border pt-1.5" data-testid={`${testId}-details`}>
          {hasDocumentRow && (
            <div className="flex items-start gap-2" data-testid={`${testId}-details-document`}>
              <span aria-hidden="true" className="shrink-0">📄</span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-medium text-text-primary">{docTitle}</span>
                {details?.document?.snippet && (
                  <span className="line-clamp-2 block text-[11px] text-text-secondary" data-testid={`${testId}-details-snippet`}>{details.document.snippet}</span>
                )}
              </span>
              {onOpenDocument && (
                <Button size="sm" variant="primary" className="!px-2 !py-0.5 text-[11px] leading-5" onClick={onOpenDocument} data-testid={`${testId}-details-open-document`}>
                  Open beside the chat
                </Button>
              )}
            </div>
          )}
          {ops.length > 0 && (
            <div data-testid={`${testId}-details-ops`}>
              <div className="text-[10px] font-semibold uppercase tracking-wide text-text-tertiary">What changed</div>
              <ul className="m-0 mt-0.5 list-none p-0 text-[11px] text-text-secondary">
                {ops.slice(0, MAX_OPS).map((op, i) => (
                  <li key={i} className="truncate" data-op={op.op} title={op.text}>{describeAgentRunOp(op)}</li>
                ))}
              </ul>
              {ops.length > MAX_OPS && (
                <div className="text-[11px] text-text-tertiary" data-testid={`${testId}-details-more-ops`}>+{ops.length - MAX_OPS} more</div>
              )}
            </div>
          )}
          {steps.length > 0 && (
            <ol className="m-0 flex list-none flex-col gap-0.5 p-0 text-[11px]" aria-label="Steps" data-testid={`${testId}-details-steps`}>
              {steps.map((step) => (
                <li key={step.id} className="flex items-center gap-1.5" data-step-id={step.id} data-status={step.status}>
                  <span aria-hidden="true" className={cn('inline-block h-1.5 w-1.5 shrink-0 rounded-full', AGENT_RUN_STEP_DOT[step.status] ?? AGENT_RUN_STEP_DOT.pending)} />
                  <span className={cn('min-w-0 truncate', step.status === 'failed' ? 'text-danger' : step.status === 'skipped' ? 'text-text-tertiary line-through' : step.status === 'running' ? 'text-text-primary' : 'text-text-secondary')}>{step.label}</span>
                </li>
              ))}
            </ol>
          )}
          {error && (
            <div className="text-[11px] text-danger" data-testid={`${testId}-details-error`}>{error}</div>
          )}
          <div className="flex min-w-0 items-center gap-2 text-[11px] text-text-tertiary">
            {/* Named apart from the status row's "Open run": both are on screen
                at once on an expanded wide card, and two controls announcing
                the same words is a coin-toss for anyone moving by control. */}
            {onOpenRun && (
              <button type="button" onClick={() => onOpenRun(runId)} className={cn(ROW_LINK, 'hover:text-text-primary')} data-testid={`${testId}-details-open-run`}>
                Open run in the pipeline
              </button>
            )}
            {outcome && onOpenResult && (
              <button type="button" onClick={() => onOpenResult(outcome)} className={cn(ROW_LINK, 'font-medium text-info')} data-testid={`${testId}-details-open-result`}>
                {resultLabel}
              </button>
            )}
            {timings && <span className="ml-auto min-w-0 truncate" data-testid={`${testId}-details-timings`}>{timings}</span>}
          </div>
        </div>
      )}
    </div>
  );
}

/** Reads a `/doc` command message's metadata; null for anything else. */
export function agentRunRefFromMetadata(
  metadata: Record<string, unknown> | undefined,
): { runId: string; documentId: string; documentTitle?: string; instruction: string; agentName: string; pipelineId?: string; command: string; result?: AgentRunResult; suggestionKey?: string } | null {
  if (!metadata || metadata.kind !== 'agent-run') return null;
  const runId = typeof metadata.runId === 'string' ? metadata.runId : '';
  // A document is what /doc acts on; a recording or transcription run has none.
  const documentId = typeof metadata.documentId === 'string' ? metadata.documentId : '';
  if (!runId) return null;
  const result = agentRunResultFromMetadata(metadata.result);
  return {
    runId,
    documentId,
    instruction: typeof metadata.instruction === 'string' ? metadata.instruction : '',
    agentName: typeof metadata.agentName === 'string' && metadata.agentName ? metadata.agentName : 'Agent',
    command: typeof metadata.command === 'string' && metadata.command ? metadata.command : '/doc',
    ...(typeof metadata.pipelineId === 'string' ? { pipelineId: metadata.pipelineId } : {}),
    // The title as the message carried it, for the expanded card's document row before any live details arrive.
    ...(typeof metadata.documentTitle === 'string' && metadata.documentTitle ? { documentTitle: metadata.documentTitle } : {}),
    ...(result ? { result } : {}),
    // An edit posted as suggestions names the key so the card can offer the review even before a live status arrives.
    ...(typeof metadata.suggestionKey === 'string' && metadata.suggestionKey ? { suggestionKey: metadata.suggestionKey } : {}),
  };
}

/** Reads a run result out of untrusted metadata; null for anything malformed. */
export function agentRunResultFromMetadata(value: unknown): AgentRunResult | null {
  if (!value || typeof value !== 'object') return null;
  const r = value as Record<string, unknown>;
  if (r.kind === 'document' && typeof r.documentId === 'string' && r.documentId) return { kind: 'document', documentId: r.documentId };
  if (r.kind === 'link' && typeof r.href === 'string' && r.href) {
    return { kind: 'link', href: r.href, ...(typeof r.label === 'string' && r.label ? { label: r.label } : {}) };
  }
  if (r.kind === 'panel' && r.panel && typeof r.panel === 'object') {
    const p = r.panel as Record<string, unknown>;
    if (typeof p.kind !== 'string' || !p.kind || typeof p.id !== 'string' || !p.id) return null;
    const panel: ChatSidePanelRef = { kind: p.kind, id: p.id };
    if (typeof p.title === 'string' && p.title) panel.title = p.title;
    if (p.params && typeof p.params === 'object') {
      const params: Record<string, string> = {};
      for (const [k, v] of Object.entries(p.params as Record<string, unknown>)) if (typeof v === 'string') params[k] = v;
      panel.params = params;
    }
    return { kind: 'panel', panel };
  }
  return null;
}

export default AgentRunCard;

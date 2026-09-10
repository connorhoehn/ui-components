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

import { cn } from '../../lib/cn';
import Chip from '../shared/Chip';
import type { ChatSidePanelRef } from './chatCommands';
import { Button } from '../ui/Button';

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

export interface AgentRunStatus {
  phase: AgentRunPhase;
  /** The outcome to open, once `phase === 'completed'`. */
  result?: AgentRunResult;
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

export function AgentRunCard({ runId, instruction, agentName, requestedBy, command = '/doc', status, onOpenDocument, onOpenRun, result, onOpenResult, onDecide, suggestion: suggestionProp, onReview, className, 'data-testid': testId = 'agent-run-card' }: AgentRunCardProps) {
  const phase = status?.phase ?? 'received';
  // Suggestions are only reviewable once the run is done — before that there is nothing in the document yet.
  const suggestion = phase === 'completed' ? status?.suggestion ?? suggestionProp : undefined;
  const review = phase === 'completed' ? status?.review : undefined;
  const reviewable = Boolean(suggestion) && !review;
  // The result is only openable once the run is done; before that it is a promise, not a link.
  const outcome = phase === 'completed' ? status?.result ?? result : undefined;
  const resultLabel = outcome?.kind === 'link' && outcome.label ? outcome.label : 'Open';
  // A document result IS the document link — do not show the same destination twice.
  const showDocument = onOpenDocument && !(outcome?.kind === 'document' && onOpenResult);
  const at = ORDER[phase];
  const ended = phase === 'failed' || phase === 'rejected';
  // A reviewed edit is settled either way; a rejection of suggestions is not a failed run, so it stays neutral.
  const tone = ended ? 'danger' : review ? (review.decision === 'accept' ? 'success' : 'neutral') : phase === 'completed' ? (suggestion ? 'warning' : 'success') : phase === 'awaiting_approval' ? 'warning' : 'info';
  const phaseLabel = review ? 'Reviewed' : reviewable ? 'Suggested' : PHASE_LABEL[phase];
  const reviewer = review ? review.byName ?? review.by : undefined;
  const reviewDetail = review ? `${review.decision === 'accept' ? 'Accepted' : 'Rejected'} by ${reviewer}` : undefined;
  const awaiting = phase === 'awaiting_approval';
  // Two lines, no more: the command, and where the run is. A command in a
  // conversation is a small thing that happened, not a panel.
  return (
    <div
      className={cn('flex w-full max-w-[36rem] flex-col gap-0.5 rounded-md border border-border bg-surface px-2 py-1 text-left text-[12px]', className)}
      data-testid={testId}
      data-phase={phase}
      data-run-id={runId}
      title={requestedBy ? `${requestedBy} asked ${agentName}: ${instruction}` : `${agentName}: ${instruction}`}
    >
      <div className="flex min-w-0 items-center gap-1.5">
        <span aria-hidden="true" className="shrink-0">🪄</span>
        <span className="min-w-0 flex-1 truncate text-text-primary" data-testid={`${testId}-instruction`}>
          <span className="font-mono text-text-tertiary">{command}</span> {instruction}
        </span>
        <Chip size="xs" tone={tone} data-testid={`${testId}-phase`}>{phaseLabel}</Chip>
      </div>
      <div className="flex min-w-0 items-center gap-1.5 text-[11px] text-text-secondary">
        <ol className="m-0 flex shrink-0 list-none items-center gap-1 p-0" aria-label="Run progress" data-testid={`${testId}-steps`}>
          {STEPS.map((s, i) => {
            const done = ended ? i < at : i < at || (i === at && phase === 'completed');
            const active = i === at && phase !== 'completed' && !ended;
            const failedHere = ended && i === at;
            return (
              <li key={s.phase} className="flex items-center" title={s.label} data-state={failedHere ? 'failed' : done ? 'done' : active ? 'active' : 'pending'}>
                <span
                  aria-hidden="true"
                  className={cn('inline-block h-1.5 w-1.5 rounded-full', failedHere ? 'bg-danger' : done ? 'bg-success' : active ? (awaiting ? 'bg-warning' : 'animate-pulse bg-info') : 'bg-border')}
                />
                <span className="sr-only">{failedHere ? phaseLabel : s.label}</span>
              </li>
            );
          })}
        </ol>
        <span className={cn('min-w-0 flex-1 truncate', review && (review.decision === 'accept' ? 'text-success' : 'text-text-tertiary'))} data-testid={`${testId}-detail`} data-review={review?.decision}>
          {phase === 'running'
            ? (status?.stepLabel ? `${agentName} — ${status.stepLabel}` : `${agentName} is working via the pipeline`)
            : awaiting
              ? `Waiting for approval${status?.detail ? ` — ${status.detail}` : ''}`
              : reviewDetail ?? status?.detail ?? (reviewable && status?.suggestion ? `${status.suggestion.applied} ${status.suggestion.applied === 1 ? 'change' : 'changes'} suggested` : phase === 'received' ? 'Received' : phaseLabel)}
        </span>
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
        {outcome && onOpenResult && (
          <button type="button" onClick={() => onOpenResult(outcome)} className="shrink-0 font-medium text-info underline-offset-2 hover:underline" data-testid={`${testId}-open-result`} data-result-kind={outcome.kind}>
            {resultLabel}
          </button>
        )}
        {outcome?.kind === 'link' && !onOpenResult && (
          <a href={outcome.href} target="_blank" rel="noopener noreferrer" className="shrink-0 font-medium text-info underline-offset-2 hover:underline" data-testid={`${testId}-open-result`} data-result-kind="link">
            {resultLabel}
          </a>
        )}
        {onOpenRun && (
          <button type="button" onClick={() => onOpenRun(runId)} className="shrink-0 text-text-tertiary underline-offset-2 hover:text-text-primary hover:underline" data-testid={`${testId}-open-run`}>
            run
          </button>
        )}
        {showDocument && (
          <button type="button" onClick={onOpenDocument} className="shrink-0 text-text-tertiary underline-offset-2 hover:text-text-primary hover:underline" data-testid={`${testId}-open-document`}>
            document
          </button>
        )}
      </div>
    </div>
  );
}

/** Reads a `/doc` command message's metadata; null for anything else. */
export function agentRunRefFromMetadata(
  metadata: Record<string, unknown> | undefined,
): { runId: string; documentId: string; instruction: string; agentName: string; pipelineId?: string; command: string; result?: AgentRunResult; suggestionKey?: string } | null {
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

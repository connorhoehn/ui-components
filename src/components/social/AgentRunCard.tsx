// AgentRunCard — a "/doc …" command in the thread, and what became of it.
//
// The message IS the command; the card replaces the text the way a document
// share or a call does. It tells the reader three things in order: the
// instruction, who is carrying it out (an agent, named), and where the run
// is — received, running through the pipeline (with the current step),
// waiting for someone to approve a big edit (with Approve / Reject right
// here), done, rejected or failed — so the pipeline is visible without
// leaving the conversation.

import { cn } from '../../lib/cn';
import Chip from '../shared/Chip';
import { Button } from '../ui/Button';

export type AgentRunPhase = 'received' | 'running' | 'awaiting_approval' | 'completed' | 'rejected' | 'failed';

export type AgentRunDecision = 'approve' | 'reject';

export interface AgentRunStatus {
  phase: AgentRunPhase;
  /** The step in flight, when known — "Reading the document", "Planning the edit", "Retrying — attempt 2". */
  stepLabel?: string;
  /** A sentence about the outcome — "Renamed to …", the failure, why approval is needed. */
  detail?: string;
  /** The approval step a decision goes to, while `phase === 'awaiting_approval'`. */
  approvalStepId?: string;
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
  /** Approve or reject a run that is waiting; the buttons render only when this is given. */
  onDecide?: (runId: string, decision: AgentRunDecision) => void;
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

export function AgentRunCard({ runId, instruction, agentName, requestedBy, command = '/doc', status, onOpenDocument, onOpenRun, onDecide, className, 'data-testid': testId = 'agent-run-card' }: AgentRunCardProps) {
  const phase = status?.phase ?? 'received';
  const at = ORDER[phase];
  const ended = phase === 'failed' || phase === 'rejected';
  const tone = ended ? 'danger' : phase === 'completed' ? 'success' : phase === 'awaiting_approval' ? 'warning' : 'info';
  const phaseLabel = PHASE_LABEL[phase];
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
        <span className="min-w-0 flex-1 truncate" data-testid={`${testId}-detail`}>
          {phase === 'running'
            ? (status?.stepLabel ? `${agentName} — ${status.stepLabel}` : `${agentName} is working via the pipeline`)
            : awaiting
              ? `Waiting for approval${status?.detail ? ` — ${status.detail}` : ''}`
              : status?.detail ?? (phase === 'received' ? 'Received' : phaseLabel)}
        </span>
        {awaiting && onDecide && (
          // Inline, small, on the status line: the decision is the next thing
          // to do and the card is still two lines tall.
          <span className="flex shrink-0 items-center gap-1" data-testid={`${testId}-decide`}>
            <Button size="sm" variant="primary" className="!px-2 !py-0 text-[11px] leading-5" onClick={() => onDecide(runId, 'approve')} data-testid={`${testId}-approve`}>Approve</Button>
            <Button size="sm" variant="ghost" className="!px-2 !py-0 text-[11px] leading-5" onClick={() => onDecide(runId, 'reject')} data-testid={`${testId}-reject`}>Reject</Button>
          </span>
        )}
        {onOpenRun && (
          <button type="button" onClick={() => onOpenRun(runId)} className="shrink-0 text-text-tertiary underline-offset-2 hover:text-text-primary hover:underline" data-testid={`${testId}-open-run`}>
            run
          </button>
        )}
        {onOpenDocument && (
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
): { runId: string; documentId: string; instruction: string; agentName: string; pipelineId?: string; command: string } | null {
  if (!metadata || metadata.kind !== 'agent-run') return null;
  const runId = typeof metadata.runId === 'string' ? metadata.runId : '';
  // A document is what /doc acts on; a recording or transcription run has none.
  const documentId = typeof metadata.documentId === 'string' ? metadata.documentId : '';
  if (!runId) return null;
  return {
    runId,
    documentId,
    instruction: typeof metadata.instruction === 'string' ? metadata.instruction : '',
    agentName: typeof metadata.agentName === 'string' && metadata.agentName ? metadata.agentName : 'Agent',
    command: typeof metadata.command === 'string' && metadata.command ? metadata.command : '/doc',
    ...(typeof metadata.pipelineId === 'string' ? { pipelineId: metadata.pipelineId } : {}),
  };
}

export default AgentRunCard;

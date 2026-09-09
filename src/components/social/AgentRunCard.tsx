// AgentRunCard — a "/doc …" command in the thread, and what became of it.
//
// The message IS the command; the card replaces the text the way a document
// share or a call does. It tells the reader three things in order: the
// instruction, who is carrying it out (an agent, named), and where the run
// is — received, running through the pipeline (with the current step), done
// or failed — so the pipeline is visible without leaving the conversation.

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import Chip from '../shared/Chip';

export type AgentRunPhase = 'received' | 'running' | 'completed' | 'failed';

export interface AgentRunStatus {
  phase: AgentRunPhase;
  /** The step in flight, when known — "Reading the document", "Planning the edit". */
  stepLabel?: string;
  /** A sentence about the outcome — "Renamed to …", the failure. */
  detail?: string;
}

export interface AgentRunCardProps {
  runId: string;
  instruction: string;
  /** The agent carrying it out, e.g. "Haiku". */
  agentName: string;
  requestedBy?: string;
  status?: AgentRunStatus;
  /** Open the document the edit went into. */
  onOpenDocument?: () => void;
  /** Open the run in the pipeline UI. */
  onOpenRun?: (runId: string) => void;
  className?: string;
  'data-testid'?: string;
}

const STEPS: Array<{ phase: AgentRunPhase | 'running'; label: string }> = [
  { phase: 'received', label: 'Received' },
  { phase: 'running', label: 'Processing via pipeline' },
  { phase: 'completed', label: 'Updated' },
];

const ORDER: Record<AgentRunPhase, number> = { received: 0, running: 1, completed: 2, failed: 2 };

export function AgentRunCard({ runId, instruction, agentName, requestedBy, status, onOpenDocument, onOpenRun, className, 'data-testid': testId = 'agent-run-card' }: AgentRunCardProps) {
  const phase = status?.phase ?? 'received';
  const at = ORDER[phase];
  const tone = phase === 'failed' ? 'danger' : phase === 'completed' ? 'success' : 'info';
  const phaseLabel = phase === 'failed' ? 'Failed' : phase === 'completed' ? 'Updated' : phase === 'running' ? 'Processing' : 'Received';
  // Two lines, no more: the command, and where the run is. A command in a
  // conversation is a small thing that happened, not a panel.
  return (
    <div
      className={cn('flex w-full max-w-[36rem] flex-col gap-0.5 rounded-md border border-border bg-surface px-2 py-1 text-left text-[12px]', className)}
      data-testid={testId}
      data-phase={phase}
      data-run-id={runId}
      title={requestedBy ? `${requestedBy} asked ${agentName} to edit the document` : `${agentName} is editing the document`}
    >
      <div className="flex min-w-0 items-center gap-1.5">
        <span aria-hidden="true" className="shrink-0">🪄</span>
        <span className="min-w-0 flex-1 truncate text-text-primary" data-testid={`${testId}-instruction`}>
          <span className="font-mono text-text-tertiary">/doc</span> {instruction}
        </span>
        <Chip size="xs" tone={tone} data-testid={`${testId}-phase`}>{phaseLabel}</Chip>
      </div>
      <div className="flex min-w-0 items-center gap-1.5 text-[11px] text-text-secondary">
        <ol className="m-0 flex shrink-0 list-none items-center gap-1 p-0" aria-label="Run progress" data-testid={`${testId}-steps`}>
          {STEPS.map((s, i) => {
            const done = phase === 'failed' ? i < at : i < at || (i === at && phase === 'completed');
            const active = i === at && phase !== 'completed' && phase !== 'failed';
            const failedHere = phase === 'failed' && i === at;
            return (
              <li key={s.phase} className="flex items-center" title={s.label} data-state={failedHere ? 'failed' : done ? 'done' : active ? 'active' : 'pending'}>
                <span
                  aria-hidden="true"
                  className={cn('inline-block h-1.5 w-1.5 rounded-full', failedHere ? 'bg-danger' : done ? 'bg-success' : active ? 'animate-pulse bg-info' : 'bg-border')}
                />
                <span className="sr-only">{failedHere ? 'Failed' : s.label}</span>
              </li>
            );
          })}
        </ol>
        <span className="min-w-0 flex-1 truncate" data-testid={`${testId}-detail`}>
          {phase === 'running'
            ? (status?.stepLabel ? `${agentName} — ${status.stepLabel}` : `${agentName} is working via the pipeline`)
            : status?.detail ?? (phase === 'received' ? 'Received' : phaseLabel)}
        </span>
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
): { runId: string; documentId: string; instruction: string; agentName: string; pipelineId?: string } | null {
  if (!metadata || metadata.kind !== 'agent-run') return null;
  const runId = typeof metadata.runId === 'string' ? metadata.runId : '';
  const documentId = typeof metadata.documentId === 'string' ? metadata.documentId : '';
  if (!runId || !documentId) return null;
  return {
    runId,
    documentId,
    instruction: typeof metadata.instruction === 'string' ? metadata.instruction : '',
    agentName: typeof metadata.agentName === 'string' && metadata.agentName ? metadata.agentName : 'Agent',
    ...(typeof metadata.pipelineId === 'string' ? { pipelineId: metadata.pipelineId } : {}),
  };
}

export default AgentRunCard;

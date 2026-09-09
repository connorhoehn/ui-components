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
import { Button } from '../ui/Button';

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
  return (
    <div
      className={cn('flex w-full max-w-[36rem] flex-col gap-2 rounded-lg border border-border bg-surface px-3 py-2', className)}
      data-testid={testId}
      data-phase={phase}
      data-run-id={runId}
    >
      <div className="flex items-start gap-2">
        <span aria-hidden="true" className="mt-0.5 text-base">🪄</span>
        <div className="min-w-0 flex-1">
          <div className="text-[13px] text-text-primary" data-testid={`${testId}-instruction`}>
            <span className="font-mono text-text-tertiary">/doc</span> {instruction}
          </div>
          <div className="text-[12px] text-text-secondary">
            {requestedBy ? `${requestedBy} asked ` : ''}<span className="font-medium text-text-primary">{agentName}</span> to edit the document
          </div>
        </div>
        <Chip size="xs" tone={tone} data-testid={`${testId}-phase`}>
          {phase === 'failed' ? 'Failed' : phase === 'completed' ? 'Updated' : phase === 'running' ? 'Processing' : 'Received'}
        </Chip>
      </div>

      {/* The pipeline, in three beats. The step in flight names itself. */}
      <ol className="m-0 flex list-none items-center gap-1 p-0 text-[11px]" aria-label="Run progress" data-testid={`${testId}-steps`}>
        {STEPS.map((s, i) => {
          const done = phase === 'failed' ? i < at : i < at || (i === at && phase === 'completed');
          const active = i === at && phase !== 'completed' && phase !== 'failed';
          const failedHere = phase === 'failed' && i === at;
          return (
            <li key={s.phase} className="flex items-center gap-1" data-state={failedHere ? 'failed' : done ? 'done' : active ? 'active' : 'pending'}>
              {i > 0 && <span aria-hidden="true" className="mx-0.5 h-px w-4 bg-border" />}
              <span
                aria-hidden="true"
                className={cn(
                  'inline-block h-2 w-2 rounded-full',
                  failedHere ? 'bg-danger' : done ? 'bg-success' : active ? 'animate-pulse bg-info' : 'bg-border',
                )}
              />
              <span className={cn(done || active || failedHere ? 'text-text-primary' : 'text-text-tertiary')}>
                {failedHere ? 'Failed' : s.label}
                {active && status?.stepLabel ? <span className="text-text-tertiary"> — {status.stepLabel}</span> : null}
              </span>
            </li>
          );
        })}
      </ol>

      {status?.detail && (
        <p className={cn('m-0 text-[12px]', phase === 'failed' ? 'text-danger' : 'text-text-secondary')} data-testid={`${testId}-detail`}>{status.detail}</p>
      )}

      {(onOpenDocument || onOpenRun) && (
        <div className="flex items-center gap-1">
          {onOpenDocument && <Button variant="ghost" size="sm" onClick={onOpenDocument} data-testid={`${testId}-open-document`}>Open document</Button>}
          {onOpenRun && <Button variant="ghost" size="sm" onClick={() => onOpenRun(runId)} data-testid={`${testId}-open-run`}>View run</Button>}
        </div>
      )}
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

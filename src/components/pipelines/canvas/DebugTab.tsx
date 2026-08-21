// frontend/src/components/pipelines/canvas/DebugTab.tsx
//
// Debug tab for ConfigPanel showing step execution details during replay.
// Displays input/output/errors/duration/LLM metadata from StepExecution.

import type { StepExecution } from '../../../types/pipeline';
import { formatDuration } from '../utils/formatTime';
import { cn } from '../../../lib/cn';

export interface DebugTabProps {
  stepExecution: StepExecution | null | undefined;
  nodeId: string;
}

const STATUS_BADGE_CLASSES: Record<string, string> = {
  completed: 'bg-success-bg text-success-fg',
  failed:    'bg-danger-bg text-danger-fg',
  cancelled: 'bg-surface-hover text-text-secondary',
  running:   'bg-info-bg text-info-fg',
  pending:   'bg-surface-hover text-text-secondary',
  skipped:   'bg-surface-inset text-neutral',
};

function formatTimestamp(iso: string | undefined): string {
  if (!iso) return '—';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '—';
  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
  }).format(d);
}

function formatJSON(value: unknown): string {
  if (value === null || value === undefined) return '—';
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

export default function DebugTab({ stepExecution, nodeId }: DebugTabProps) {
  if (!stepExecution) {
    return (
      <div className="px-4 py-6 text-center text-text-tertiary text-[13px]">
        <p>No execution data available for this node.</p>
        <p className="mt-2 text-xs">
          Run the pipeline to see debug information.
        </p>
      </div>
    );
  }

  const { status, startedAt, completedAt, durationMs, input, output, error, llm } = stepExecution;

  return (
    <div>
      {/* Status & Timing */}
      <div className="px-4 py-3 border-b border-border">
        <div className="text-[11px] font-semibold text-neutral uppercase tracking-[0.5px] mb-1.5">Status</div>
        <div className={cn('inline-block px-2 py-0.5 text-[11px] font-semibold rounded', STATUS_BADGE_CLASSES[status] ?? STATUS_BADGE_CLASSES.pending)}>
          {status}
        </div>

        <div className="mt-3">
          <div className="flex justify-between py-1 text-xs">
            <span className="text-neutral">Started</span>
            <span className="font-semibold text-text-primary">{formatTimestamp(startedAt)}</span>
          </div>
          <div className="flex justify-between py-1 text-xs">
            <span className="text-neutral">Completed</span>
            <span className="font-semibold text-text-primary">{formatTimestamp(completedAt)}</span>
          </div>
          <div className="flex justify-between py-1 text-xs">
            <span className="text-neutral">Duration</span>
            <span className="font-semibold text-text-primary">{formatDuration(durationMs)}</span>
          </div>
        </div>
      </div>

      {/* Error (if present) */}
      {error && (
        <div className="px-4 py-3 border-b border-border">
          <div className="text-[11px] font-semibold text-neutral uppercase tracking-[0.5px] mb-1.5">Error</div>
          <div className="text-[13px] font-mono whitespace-pre-wrap break-words text-danger-fg bg-danger-bg p-2 rounded border border-danger-border">
            {error}
          </div>
        </div>
      )}

      {/* Input */}
      {input !== undefined && (
        <div className="px-4 py-3 border-b border-border">
          <div className="text-[11px] font-semibold text-neutral uppercase tracking-[0.5px] mb-1.5">Input</div>
          <pre className="text-[13px] text-text-primary font-mono whitespace-pre-wrap break-words">{formatJSON(input)}</pre>
        </div>
      )}

      {/* Output */}
      {output !== undefined && (
        <div className="px-4 py-3 border-b border-border">
          <div className="text-[11px] font-semibold text-neutral uppercase tracking-[0.5px] mb-1.5">Output</div>
          <pre className="text-[13px] text-text-primary font-mono whitespace-pre-wrap break-words">{formatJSON(output)}</pre>
        </div>
      )}

      {/* LLM Metadata (if present) */}
      {llm && (
        <div className="px-4 py-3 border-b border-border">
          <div className="text-[11px] font-semibold text-neutral uppercase tracking-[0.5px] mb-1.5">LLM Details</div>

          <div className="flex justify-between py-1 text-xs">
            <span className="text-neutral">Tokens In</span>
            <span className="font-semibold text-text-primary">{llm.tokensIn.toLocaleString()}</span>
          </div>
          <div className="flex justify-between py-1 text-xs">
            <span className="text-neutral">Tokens Out</span>
            <span className="font-semibold text-text-primary">{llm.tokensOut.toLocaleString()}</span>
          </div>
          {llm.firstTokenLatencyMs !== undefined && (
            <div className="flex justify-between py-1 text-xs">
              <span className="text-neutral">First Token Latency</span>
              <span className="font-semibold text-text-primary">{formatDuration(llm.firstTokenLatencyMs)}</span>
            </div>
          )}

          {llm.prompt && (
            <div className="mt-3">
              <div className="text-[11px] font-semibold text-neutral uppercase tracking-[0.5px] mb-2">Prompt</div>
              <pre className="text-[13px] text-text-primary font-mono whitespace-pre-wrap break-words">{llm.prompt}</pre>
            </div>
          )}

          {llm.response && (
            <div className="mt-3">
              <div className="text-[11px] font-semibold text-neutral uppercase tracking-[0.5px] mb-2">Response</div>
              <pre className="text-[13px] text-text-primary font-mono whitespace-pre-wrap break-words">{llm.response}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

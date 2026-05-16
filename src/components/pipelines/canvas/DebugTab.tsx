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
  completed: 'bg-[#f0fdf4] text-[#16a34a]',
  failed:    'bg-[#fef2f2] text-[#dc2626]',
  cancelled: 'bg-[#f1f5f9] text-[#475569]',
  running:   'bg-[#eff6ff] text-[#2563eb]',
  pending:   'bg-[#f1f5f9] text-[#475569]',
  skipped:   'bg-[#fafafa] text-[#71717a]',
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
      <div className="px-4 py-6 text-center text-[#94a3b8] text-[13px]">
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
      <div className="px-4 py-3 border-b border-[#e2e8f0]">
        <div className="text-[11px] font-semibold text-[#64748b] uppercase tracking-[0.5px] mb-1.5">Status</div>
        <div className={cn('inline-block px-2 py-0.5 text-[11px] font-semibold rounded', STATUS_BADGE_CLASSES[status] ?? STATUS_BADGE_CLASSES.pending)}>
          {status}
        </div>

        <div className="mt-3">
          <div className="flex justify-between py-1 text-xs">
            <span className="text-[#64748b]">Started</span>
            <span className="font-semibold text-[#0f172a]">{formatTimestamp(startedAt)}</span>
          </div>
          <div className="flex justify-between py-1 text-xs">
            <span className="text-[#64748b]">Completed</span>
            <span className="font-semibold text-[#0f172a]">{formatTimestamp(completedAt)}</span>
          </div>
          <div className="flex justify-between py-1 text-xs">
            <span className="text-[#64748b]">Duration</span>
            <span className="font-semibold text-[#0f172a]">{formatDuration(durationMs)}</span>
          </div>
        </div>
      </div>

      {/* Error (if present) */}
      {error && (
        <div className="px-4 py-3 border-b border-[#e2e8f0]">
          <div className="text-[11px] font-semibold text-[#64748b] uppercase tracking-[0.5px] mb-1.5">Error</div>
          <div className="text-[13px] font-mono whitespace-pre-wrap break-words text-[#dc2626] bg-[#fef2f2] p-2 rounded border border-[#fecaca]">
            {error}
          </div>
        </div>
      )}

      {/* Input */}
      {input !== undefined && (
        <div className="px-4 py-3 border-b border-[#e2e8f0]">
          <div className="text-[11px] font-semibold text-[#64748b] uppercase tracking-[0.5px] mb-1.5">Input</div>
          <pre className="text-[13px] text-[#0f172a] font-mono whitespace-pre-wrap break-words">{formatJSON(input)}</pre>
        </div>
      )}

      {/* Output */}
      {output !== undefined && (
        <div className="px-4 py-3 border-b border-[#e2e8f0]">
          <div className="text-[11px] font-semibold text-[#64748b] uppercase tracking-[0.5px] mb-1.5">Output</div>
          <pre className="text-[13px] text-[#0f172a] font-mono whitespace-pre-wrap break-words">{formatJSON(output)}</pre>
        </div>
      )}

      {/* LLM Metadata (if present) */}
      {llm && (
        <div className="px-4 py-3 border-b border-[#e2e8f0]">
          <div className="text-[11px] font-semibold text-[#64748b] uppercase tracking-[0.5px] mb-1.5">LLM Details</div>

          <div className="flex justify-between py-1 text-xs">
            <span className="text-[#64748b]">Tokens In</span>
            <span className="font-semibold text-[#0f172a]">{llm.tokensIn.toLocaleString()}</span>
          </div>
          <div className="flex justify-between py-1 text-xs">
            <span className="text-[#64748b]">Tokens Out</span>
            <span className="font-semibold text-[#0f172a]">{llm.tokensOut.toLocaleString()}</span>
          </div>
          {llm.firstTokenLatencyMs !== undefined && (
            <div className="flex justify-between py-1 text-xs">
              <span className="text-[#64748b]">First Token Latency</span>
              <span className="font-semibold text-[#0f172a]">{formatDuration(llm.firstTokenLatencyMs)}</span>
            </div>
          )}

          {llm.prompt && (
            <div className="mt-3">
              <div className="text-[11px] font-semibold text-[#64748b] uppercase tracking-[0.5px] mb-2">Prompt</div>
              <pre className="text-[13px] text-[#0f172a] font-mono whitespace-pre-wrap break-words">{llm.prompt}</pre>
            </div>
          )}

          {llm.response && (
            <div className="mt-3">
              <div className="text-[11px] font-semibold text-[#64748b] uppercase tracking-[0.5px] mb-2">Response</div>
              <pre className="text-[13px] text-[#0f172a] font-mono whitespace-pre-wrap break-words">{llm.response}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

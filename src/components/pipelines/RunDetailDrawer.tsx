// frontend/src/components/pipelines/RunDetailDrawer.tsx
//
// Expanded view of a single pipeline run showing step list, context, cost
// breakdown. Renders as an overlay within the runs panel when a run is selected.
// Extracted from PipelineRunsPanel.tsx.

import { useNavigate } from 'react-router';

import { cn } from '../../lib/cn';
import Chip from '../shared/Chip';
import type { ChipTone } from '../shared/Chip';
import type { PipelineRun, RunStatus } from '../../types/pipeline';
import { formatDuration } from './utils/formatTime';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatCost(usd?: number): string {
  if (usd == null || usd === 0) return '--';
  if (usd < 0.001) return '<$0.001';
  if (usd < 0.01) return `$${usd.toFixed(4)}`;
  if (usd < 1) return `$${usd.toFixed(3)}`;
  return `$${usd.toFixed(2)}`;
}

function costColor(usd?: number): string {
  if (usd == null || usd === 0) return 'text-text-tertiary';
  if (usd < 0.01) return 'text-success-fg';
  if (usd < 0.10) return 'text-warning-fg';
  if (usd < 1.00) return 'text-caution-fg';
  return 'text-danger-fg';
}

function statusBadgeTone(s: RunStatus): ChipTone {
  switch (s) {
    case 'completed':         return 'success';
    case 'rejected':          return 'danger';
    case 'failed':            return 'danger';
    case 'cancelled':         return 'neutral';
    case 'running':           return 'info';
    case 'pending':           return 'neutral';
    case 'awaiting_approval': return 'warning';
    case 'stuck':             return 'warning';
    default:                  return 'neutral';
  }
}

function statusLabel(s: RunStatus): string {
  switch (s) {
    case 'completed':         return 'Completed';
    case 'rejected':          return 'Rejected';
    case 'failed':            return 'Failed';
    case 'cancelled':         return 'Cancelled';
    case 'running':           return 'Running';
    case 'pending':           return 'Pending';
    case 'awaiting_approval': return 'Awaiting';
    case 'stuck':             return 'Stuck';
    default:                  return s;
  }
}

function triggerLabel(run: PipelineRun): string {
  if (run.triggeredBy.userId) return run.triggeredBy.userId;
  return run.triggeredBy.triggerType || 'manual';
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface RunDetailDrawerProps {
  pipelineId: string;
  run: PipelineRun;
  onBack: () => void;
}

// ---------------------------------------------------------------------------
// Detail row helper
// ---------------------------------------------------------------------------

function DetailRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="min-w-[80px] text-[11px] font-semibold uppercase text-text-tertiary">
        {label}
      </span>
      <span className="text-[13px] text-text-primary">{children}</span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function RunDetailDrawer({ pipelineId, run, onBack }: RunDetailDrawerProps) {
  const navigate = useNavigate();

  return (
    <div className="absolute inset-0 z-[2] flex flex-col overflow-hidden bg-surface">
      {/* Header */}
      <div className="flex shrink-0 items-center gap-2 border-b border-border px-4 py-2.5">
        <button
          data-ui-part=""
          type="button"
          onClick={onBack}
          className="cursor-pointer border-none bg-transparent p-0 font-inherit text-[13px] text-primary"
        >
          &larr; Back
        </button>
        <span className="font-mono text-xs text-text-tertiary">
          {run.id.slice(0, 12)}
        </span>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-col gap-3">
          <DetailRow label="Status">
            <Chip
              tone={statusBadgeTone(run.status)}
              aria-label={`Status: ${statusLabel(run.status)}`}
            >
              {statusLabel(run.status)}
            </Chip>
          </DetailRow>
          <DetailRow label="Started">
            {new Date(run.startedAt).toLocaleString()}
          </DetailRow>
          {run.completedAt && (
            <DetailRow label="Completed">
              {new Date(run.completedAt).toLocaleString()}
            </DetailRow>
          )}
          <DetailRow label="Duration">
            {formatDuration(run.durationMs)}
          </DetailRow>
          <DetailRow label="Triggered by">
            {triggerLabel(run)}
          </DetailRow>
          <DetailRow label="Trigger type">
            {run.triggeredBy.triggerType}
          </DetailRow>

          {/* Estimated cost */}
          {run.estimatedCostUsd != null && run.estimatedCostUsd > 0 && (
            <DetailRow label="Est. Cost">
              <span className={cn('font-semibold', costColor(run.estimatedCostUsd))}>
                {formatCost(run.estimatedCostUsd)}
              </span>
              {run.estimatedCostUsd > 1.0 && (
                <span className="ml-1.5 rounded-sm bg-warning-bg px-1 py-px text-[9px] font-bold uppercase text-warning-fg">
                  Budget Warning
                </span>
              )}
            </DetailRow>
          )}

          {/* Cost breakdown by model */}
          {run.tokenUsage && Object.keys(run.tokenUsage).length > 0 && (
            <div className="mt-2">
              <div className="mb-1.5 text-[11px] font-semibold uppercase text-text-secondary">
                Cost Breakdown
              </div>
              {Object.entries(run.tokenUsage).map(([model, usage]) => (
                <div
                  key={model}
                  className="flex items-center gap-2 py-0.5 text-[11px]"
                >
                  <span className="min-w-[100px] font-mono text-text-secondary">
                    {model}
                  </span>
                  <span className="text-text-tertiary">
                    {usage.tokensIn.toLocaleString()} in / {usage.tokensOut.toLocaleString()} out
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Error */}
          {run.error && (
            <div className="mt-2">
              <div className="mb-1 text-[11px] font-semibold uppercase text-state-failed">
                Error
              </div>
              <div className="whitespace-pre-wrap break-words rounded-md bg-danger-bg px-2.5 py-2 font-mono text-xs text-danger-fg">
                {run.error.message}
                {run.error.nodeId && (
                  <div className="mt-1 text-[11px] text-danger-fg">
                    at node: {run.error.nodeId}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* View full run button */}
          <button
            data-ui-part=""
            type="button"
            onClick={() => navigate(`/pipelines/${pipelineId}/runs/${run.id}`)}
            data-testid="runs-panel-replay-btn"
            className="mt-3 w-full cursor-pointer rounded-md border-none bg-primary px-3.5 py-2 font-inherit text-[13px] font-semibold text-white"
          >
            View Full Run
          </button>

          {/* Steps summary */}
          {Object.keys(run.steps).length > 0 && (
            <div className="mt-2">
              <div className="mb-1.5 text-[11px] font-semibold uppercase text-text-secondary">
                Steps ({Object.keys(run.steps).length})
              </div>
              {Object.entries(run.steps).map(([stepId, step]) => {
                const tone = statusBadgeTone(step.status as RunStatus);
                const label = statusLabel(step.status as RunStatus);
                const output = step.output as Record<string, unknown> | undefined;
                const llmResponse = output?.response as string | undefined;
                return (
                  <div key={stepId} className="mb-2">
                    <div className="flex items-center gap-2 py-1 text-xs">
                      <Chip tone={tone} aria-label={`Status: ${label}`}>
                        {label}
                      </Chip>
                      <span className="font-mono text-[11px] text-text-secondary">
                        {stepId.slice(0, 10)}
                      </span>
                      {step.durationMs != null && (
                        <span className="ml-auto text-[11px] text-text-tertiary">
                          {formatDuration(step.durationMs)}
                        </span>
                      )}
                    </div>
                    {llmResponse && (
                      <div className="mt-1 max-h-40 overflow-y-auto whitespace-pre-wrap break-words rounded-md border border-border bg-surface-inset px-2.5 py-2 text-xs leading-relaxed text-text-primary">
                        {llmResponse}
                      </div>
                    )}
                    {output && !llmResponse && Object.keys(output).length > 0 && (
                      <div className="mt-1 max-h-[120px] overflow-y-auto whitespace-pre-wrap break-words rounded-md border border-border bg-surface-inset px-2.5 py-1.5 font-mono text-[11px] text-text-secondary">
                        {JSON.stringify(output, null, 2)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Raw JSON for debugging */}
          <div className="mt-3">
            <details>
              <summary className="cursor-pointer select-none text-[11px] text-text-tertiary">
                Raw snapshot JSON
              </summary>
              <pre className="mt-1.5 max-h-[300px] overflow-auto whitespace-pre-wrap break-all rounded-md border border-border bg-surface-inset p-2.5 text-[10px]">
                {JSON.stringify(run, null, 2)}
              </pre>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}

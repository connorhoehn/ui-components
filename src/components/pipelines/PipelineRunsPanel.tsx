// frontend/src/components/pipelines/PipelineRunsPanel.tsx
//
// Side panel showing pipeline run history. Fetches from the backend API on mount
// and subscribes to WebSocket events for live status updates. Toggled from the
// "Runs" button in the PipelineEditorPage top bar.

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { listPipelineRuns } from '../../api/pipelineRuns';
import { useEventStream } from './context/EventStreamContext';
import type { WildcardEvent } from './context/EventStreamContext';
import type { PipelineRun, RunStatus } from '../../types/pipeline';
import { cn } from '../../lib/cn';
import Chip from '../shared/Chip';
import type { ChipTone } from '../shared/Chip';
import RunDetailDrawer from './RunDetailDrawer';
import { formatDuration } from './utils/formatTime';
import { Checkbox } from '../forms/Checkbox';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface PipelineRunsPanelProps {
  pipelineId: string;
  onClose: () => void;
}

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

function costColorClass(usd?: number): string {
  if (usd == null || usd === 0) return 'text-text-tertiary';
  if (usd < 0.01) return 'text-success-fg';
  if (usd < 0.10) return 'text-warning-fg';
  if (usd < 1.00) return 'text-caution-fg';
  return 'text-danger-fg';
}

function relativeTime(iso: string): string {
  const d = Date.now() - new Date(iso).getTime();
  if (d < 60_000) return 'just now';
  if (d < 3_600_000) return `${Math.floor(d / 60_000)}m ago`;
  if (d < 86_400_000) return `${Math.floor(d / 3_600_000)}h ago`;
  if (d < 259_200_000) return `${Math.floor(d / 86_400_000)}d ago`;
  return new Date(iso).toLocaleDateString();
}

function statusBadgeTone(s: RunStatus): ChipTone {
  switch (s) {
    case 'completed':         return 'success';
    case 'failed':            return 'danger';
    case 'cancelled':         return 'neutral';
    case 'running':           return 'info';
    case 'pending':           return 'neutral';
    case 'awaiting_approval': return 'warning';
    default:                  return 'neutral';
  }
}

function statusLabel(s: RunStatus): string {
  switch (s) {
    case 'completed':         return 'Completed';
    case 'failed':            return 'Failed';
    case 'cancelled':         return 'Cancelled';
    case 'running':           return 'Running';
    case 'pending':           return 'Pending';
    case 'awaiting_approval': return 'Awaiting';
    default:                  return s;
  }
}

function triggerLabel(run: PipelineRun): string {
  if (run.triggeredBy.userId) return run.triggeredBy.userId;
  return run.triggeredBy.triggerType || 'manual';
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function PipelineRunsPanel({ pipelineId, onClose }: PipelineRunsPanelProps) {
  const navigate = useNavigate();
  const [runs, setRuns] = useState<PipelineRun[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRunId, setSelectedRunId] = useState<string | null>(null);
  const [compareMode, setCompareMode] = useState(false);
  const [comparePair, setComparePair] = useState<string[]>([]);
  const fetchedRef = useRef<string | null>(null);

  // Fetch runs from API
  const fetchRuns = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await listPipelineRuns(pipelineId, { limit: 50 });
      setRuns(response.runs);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load runs');
    } finally {
      setLoading(false);
    }
  }, [pipelineId]);

  // Fetch on mount and when pipelineId changes
  useEffect(() => {
    if (fetchedRef.current !== pipelineId) {
      fetchedRef.current = pipelineId;
      void fetchRuns();
    }
  }, [pipelineId, fetchRuns]);

  // Subscribe to WebSocket events for live updates
  useEventStream('*', useCallback((env: unknown) => {
    const { eventType, payload } = env as WildcardEvent;
    if (!payload || typeof payload !== 'object') return;
    const p = payload as { runId?: string; pipelineId?: string } & Record<string, unknown>;

    // Only handle events for this pipeline
    if (p.pipelineId && p.pipelineId !== pipelineId) return;

    switch (eventType) {
      case 'pipeline.run.started': {
        const ev = payload as {
          runId: string;
          pipelineId: string;
          triggeredBy: PipelineRun['triggeredBy'];
          at: string;
        };
        if (ev.pipelineId !== pipelineId) return;
        const newRun: PipelineRun = {
          id: ev.runId,
          pipelineId: ev.pipelineId,
          pipelineVersion: 0,
          status: 'running',
          triggeredBy: ev.triggeredBy,
          ownerNodeId: 'local',
          startedAt: ev.at,
          currentStepIds: [],
          steps: {},
          context: {},
        };
        setRuns((prev) => [newRun, ...prev.filter((r) => r.id !== ev.runId)]);
        break;
      }
      case 'pipeline.run.completed': {
        const ev = payload as { runId: string; at: string; durationMs: number };
        setRuns((prev) =>
          prev.map((r) =>
            r.id === ev.runId
              ? { ...r, status: 'completed' as RunStatus, completedAt: ev.at, durationMs: ev.durationMs }
              : r,
          ),
        );
        break;
      }
      case 'pipeline.run.failed': {
        const ev = payload as { runId: string; at: string; error: PipelineRun['error'] };
        setRuns((prev) =>
          prev.map((r) =>
            r.id === ev.runId
              ? { ...r, status: 'failed' as RunStatus, completedAt: ev.at, error: ev.error }
              : r,
          ),
        );
        break;
      }
      case 'pipeline.run.cancelled': {
        const ev = payload as { runId: string; at: string };
        setRuns((prev) =>
          prev.map((r) =>
            r.id === ev.runId
              ? { ...r, status: 'cancelled' as RunStatus, completedAt: ev.at }
              : r,
          ),
        );
        break;
      }
      default:
        break;
    }
  }, [pipelineId]));

  // Detail view for a selected run
  const selectedRun = useMemo(
    () => runs.find((r) => r.id === selectedRunId) ?? null,
    [runs, selectedRunId],
  );

  // Compare selection helpers
  const toggleCompareSelection = useCallback((runId: string) => {
    setComparePair((prev) => {
      if (prev.includes(runId)) return prev.filter((id) => id !== runId);
      if (prev.length >= 2) return [prev[1], runId];
      return [...prev, runId];
    });
  }, []);

  const handleCompare = useCallback(() => {
    if (comparePair.length !== 2) return;
    const [a, b] = comparePair;
    navigate(`/pipelines/${pipelineId}/compare?a=${a}&b=${b}`);
  }, [comparePair, navigate, pipelineId]);

  // ---- Render ----

  return (
    <div
      className="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-surface"
      data-testid="pipeline-runs-panel"
    >
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between border-b border-border px-4 py-3">
        <span className="text-sm font-bold text-text-primary">
          Run History
        </span>
        <div className="ml-auto flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => {
              setCompareMode(!compareMode);
              if (compareMode) setComparePair([]);
            }}
            data-testid="runs-panel-compare-toggle"
            className={cn(
              'cursor-pointer rounded px-2 py-0.5 font-inherit text-[11px] font-medium',
              compareMode
                ? 'border border-primary bg-primary text-white'
                : 'border border-border bg-surface text-text-secondary',
            )}
          >
            Compare
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close runs panel"
            className="cursor-pointer rounded border-none bg-transparent px-1.5 py-0.5 text-base text-text-tertiary"
          >
            x
          </button>
        </div>
      </div>

      {/* Compare action bar */}
      {compareMode && (
        <div
          className="flex shrink-0 items-center gap-2 border-b border-border bg-surface-inset px-4 py-2"
          data-testid="runs-panel-compare-bar"
        >
          <span className="text-[11px] text-text-secondary">
            {comparePair.length}/2 selected
          </span>
          <button
            type="button"
            disabled={comparePair.length !== 2}
            onClick={handleCompare}
            data-testid="runs-panel-compare-action"
            className={cn(
              'ml-auto rounded px-2.5 py-0.5 font-inherit text-[11px] font-semibold',
              comparePair.length === 2
                ? 'cursor-pointer border border-primary bg-primary text-white'
                : 'cursor-not-allowed border border-border bg-surface text-text-disabled',
            )}
          >
            Compare
          </button>
        </div>
      )}

      <div className="relative min-h-0 flex-1">
        {/* Run detail overlay */}
        {selectedRun && (
          <RunDetailDrawer
            pipelineId={pipelineId}
            run={selectedRun}
            onBack={() => setSelectedRunId(null)}
          />
        )}

        {/* Run list */}
        {loading && runs.length === 0 && (
          <div className="p-6 text-center text-[13px] text-text-tertiary">
            Loading runs...
          </div>
        )}

        {error && (
          <div className="p-4 text-center text-xs text-state-failed">
            {error}
            <button
              type="button"
              onClick={() => void fetchRuns()}
              className="mx-auto mt-2 block cursor-pointer border-none bg-transparent font-inherit text-xs text-primary underline"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && runs.length === 0 && (
          <div className="p-6 text-center text-[13px] text-text-tertiary">
            No runs yet. Trigger this pipeline to see history here.
          </div>
        )}

        {runs.length > 0 && (
          <ul className="m-0 flex-1 list-none overflow-y-auto p-0">
            {runs.map((run) => {
              const tone = statusBadgeTone(run.status);
              const label = statusLabel(run.status);
              const isCompareSelected = comparePair.includes(run.id);
              return (
                <li
                  key={run.id}
                  data-testid={`runs-panel-row-${run.id}`}
                  onClick={() => {
                    if (compareMode) {
                      toggleCompareSelection(run.id);
                    } else {
                      setSelectedRunId(run.id);
                    }
                  }}
                  className={cn(
                    'cursor-pointer border-b border-border px-4 py-2.5 transition-colors duration-100 hover:bg-surface-hover',
                    isCompareSelected && 'bg-info-bg',
                  )}
                >
                  <div className="flex items-center gap-2">
                    {compareMode && (
                      <Checkbox
                        checked={isCompareSelected}
                        onChange={() => toggleCompareSelection(run.id)}
                        onClick={(e) => e.stopPropagation()}
                        data-testid={`runs-panel-compare-check-${run.id}`}
                        className="m-0 shrink-0"
                        aria-label={`Select run ${run.id.slice(0, 8)} for comparison`}
                      />
                    )}
                    <Chip tone={tone} aria-label={`Status: ${label}`}>
                      {label}
                    </Chip>
                    <span className="font-mono text-xs text-text-secondary">
                      {run.id.slice(0, 8)}
                    </span>
                    <span className="ml-auto text-[11px] text-text-tertiary">
                      {relativeTime(run.startedAt)}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-[11px] text-text-tertiary">
                    <span>{formatDuration(run.durationMs)}</span>
                    {run.estimatedCostUsd != null && run.estimatedCostUsd > 0 && (
                      <span
                        className={cn('font-mono font-semibold', costColorClass(run.estimatedCostUsd))}
                        title={`Estimated cost: ${formatCost(run.estimatedCostUsd)}`}
                      >
                        {formatCost(run.estimatedCostUsd)}
                      </span>
                    )}
                    {run.estimatedCostUsd != null && run.estimatedCostUsd > 1.0 && (
                      <span className="rounded-sm bg-warning-bg px-1 py-px text-[9px] font-bold uppercase text-warning-fg">
                        High Cost
                      </span>
                    )}
                    <span className="ml-auto">{triggerLabel(run)}</span>
                  </div>
                  {run.error && (
                    <div className="mt-1 truncate text-[11px] text-state-failed">
                      {run.error.message}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

// frontend/src/components/pipelines/PipelineRunComparePage.tsx
//
// Side-by-side run comparison view. Route:
//   /pipelines/:pipelineId/runs/compare/:runIdA/:runIdB
//
// Useful for "what changed between this run and that run" debugging — different
// LLM responses, different durations, different paths through Conditions.
//
// Reads both runs from the localStorage runHistory and the definition (for
// node display names) from pipelineStorage. The page is read-only.

import { useMemo } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router';

import { cn } from '../../lib/cn';
import { loadPipeline } from './persistence/pipelineStorage';
import { getRun } from './persistence/runHistory';
import { aggregateCost, formatUsd } from './cost/llmPricing';
import EmptyState from '../shared/EmptyState';
import Chip from '../shared/Chip';
import type { ChipTone } from '../shared/Chip';
import CompareStepMatrix from './CompareStepMatrix';
import type {
  PipelineDefinition,
  PipelineRun,
  RunStatus,
} from '../../types/pipeline';
import { formatDate, formatDuration } from './utils/formatTime';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatDelta(ms?: number): string {
  if (ms == null) return '—';
  const sign = ms > 0 ? '+' : ms < 0 ? '' : '';
  return `${sign}${formatDuration(Math.abs(ms))}`.replace(/^(\+|-)?/, ms === 0 ? '' : (ms > 0 ? '+' : '-'));
}

function runStatusVariant(s: RunStatus): ChipTone {
  switch (s) {
    case 'completed':         return 'success';
    case 'rejected':          return 'danger';
    case 'failed':            return 'danger';
    case 'cancelled':         return 'neutral';
    case 'awaiting_approval': return 'warning';
    case 'stuck':             return 'warning';
    case 'running':           return 'info';
    case 'pending':           return 'neutral';
    default:                  return 'neutral';
  }
}

function modelByNodeIdMap(def: PipelineDefinition | null): Map<string, string> {
  const map = new Map<string, string>();
  if (!def) return map;
  for (const node of def.nodes) {
    if (node.data.type === 'llm') map.set(node.id, node.data.model);
  }
  return map;
}

function runCostLabel(
  run: PipelineRun,
  modelMap: Map<string, string>,
): string {
  const steps = Object.values(run.steps)
    .filter((s) => !!s.llm)
    .map((s) => ({
      model: modelMap.get(s.nodeId),
      tokensIn: s.llm?.tokensIn ?? 0,
      tokensOut: s.llm?.tokensOut ?? 0,
    }));
  return formatUsd(aggregateCost(steps).total);
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function RunSummary({
  label,
  run,
  cost,
  testIdPrefix,
}: {
  label: string;
  run: PipelineRun;
  cost: string;
  testIdPrefix: string;
}) {
  const variant = runStatusVariant(run.status);
  return (
    <div
      className="flex flex-col gap-1.5 rounded-lg border border-border bg-surface p-3.5 text-xs"
      data-testid={`${testIdPrefix}-summary`}
    >
      <span className="text-[11px] font-semibold uppercase tracking-wide text-text-tertiary">
        {label}
      </span>
      <div className="flex items-center gap-2">
        <span className="font-mono text-xs text-text-tertiary">
          {run.id.slice(0, 8)}
        </span>
        <span className="text-text-tertiary">&middot;</span>
        <span className="text-text-secondary">{formatDate(run.startedAt)}</span>
      </div>
      <div className="flex items-center gap-2">
        <Chip tone={variant}>{run.status}</Chip>
        <span className="text-text-tertiary">&middot;</span>
        <span className="font-mono">{formatDuration(run.durationMs)}</span>
        <span className="text-text-tertiary">&middot;</span>
        <span className="font-mono" data-testid={`${testIdPrefix}-cost`}>
          {cost}
        </span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function PipelineRunComparePage() {
  const { pipelineId, runIdA, runIdB } = useParams<{
    pipelineId: string;
    runIdA: string;
    runIdB: string;
  }>();
  const navigate = useNavigate();

  const def = useMemo(
    () => (pipelineId ? loadPipeline(pipelineId) : null),
    [pipelineId],
  );
  const runA = useMemo(
    () => (pipelineId && runIdA ? getRun(pipelineId, runIdA) : null),
    [pipelineId, runIdA],
  );
  const runB = useMemo(
    () => (pipelineId && runIdB ? getRun(pipelineId, runIdB) : null),
    [pipelineId, runIdB],
  );

  const modelMap = useMemo(() => modelByNodeIdMap(def), [def]);

  if (!pipelineId || !runIdA || !runIdB) {
    return <Navigate to="/pipelines" replace />;
  }

  if (!def) {
    return (
      <div className="p-8">
        <EmptyState
          icon="🔍"
          title="Pipeline not found"
          body="It may have been deleted. Go back to the pipelines list."
          actionLabel="Back to pipelines"
          onAction={() => navigate('/pipelines')}
        />
      </div>
    );
  }

  if (!runA || !runB) {
    return (
      <div className="p-8" data-testid="run-compare-missing">
        <EmptyState
          icon="🔍"
          title="Run not found"
          body="One or both runs are unavailable — they may have been trimmed from history."
          actionLabel="Back to runs"
          onAction={() => navigate(`/pipelines/${pipelineId}/runs`)}
        />
      </div>
    );
  }

  const totalDelta = (runB.durationMs ?? 0) - (runA.durationMs ?? 0);
  const costA = runCostLabel(runA, modelMap);
  const costB = runCostLabel(runB, modelMap);
  const stepCount = new Set([
    ...Object.keys(runA.steps),
    ...Object.keys(runB.steps),
  ]).size;

  return (
    <div className="flex flex-col gap-4 p-6 text-text-primary" data-testid="run-compare">
      {/* Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate(`/pipelines/${pipelineId}/runs`)}
          className="cursor-pointer border-none bg-transparent p-0 text-[13px] text-primary"
        >
          &larr; {def.name}
        </button>
        <span className="text-text-tertiary">/</span>
        <span className="text-lg font-bold text-text-primary">
          Compare runs
        </span>
        <span
          className="ml-auto text-xs text-text-tertiary"
          data-testid="run-compare-cost-delta"
        >
          {costA} &rarr; {costB}
        </span>
      </div>

      {/* Run A / Run B summary cards */}
      <div className="grid grid-cols-2 gap-3">
        <RunSummary label="Run A" run={runA} cost={costA} testIdPrefix="run-a" />
        <RunSummary label="Run B" run={runB} cost={costB} testIdPrefix="run-b" />
      </div>

      {/* Total delta strip */}
      <div
        className="flex items-center gap-4 rounded-lg border border-border bg-surface px-3.5 py-2.5 text-xs"
        data-testid="run-compare-delta"
      >
        <span className="text-[11px] font-semibold uppercase tracking-wide text-text-tertiary">
          &Delta; duration
        </span>
        <span className="font-mono text-[13px]">
          {formatDelta(totalDelta)}
        </span>
        <span className="flex-1" />
        <span className="text-[11px] font-semibold uppercase tracking-wide text-text-tertiary">
          {stepCount} step{stepCount === 1 ? '' : 's'} compared
        </span>
      </div>

      {/* Step diff table */}
      <CompareStepMatrix runA={runA} runB={runB} def={def} />
    </div>
  );
}

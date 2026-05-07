// frontend/src/components/pipelines/PipelineStatsPage.tsx
//
// /pipelines/:pipelineId/stats — per-pipeline execution stats dashboard.
// Rolls up persisted runs from `runHistory` (localStorage, newest-first,
// capped at 50) into a lightweight KPI + charts view.
//
// Layout mirrors PipelineRunsPage (back-breadcrumb + title + last-N selector).
// Charts use the shared <LineChart/>/<BarChart/> wrappers in shared/Chart.tsx.
//
// Cost calc uses cost/llmPricing.aggregateCost with the pipeline's LLM node
// model config to produce real per-model USD totals.

import { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router';
import { loadPipeline } from './persistence/pipelineStorage';
import { listRuns } from './persistence/runHistory';
import {
  aggregateCost,
  costByNode,
  dailyCostTrend,
  type NodeCostRow,
} from './cost/llmPricing';
import EmptyState from '../shared/EmptyState';
import { BarChart, LineChart, type LineSeries } from '../shared/Chart';
import { cn } from '../../lib/cn';
import type { PipelineDefinition, PipelineRun, StepExecution } from '../../types/pipeline';
import { formatDuration } from './utils/formatTime';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

interface TokenTotals {
  tokensIn: number;
  tokensOut: number;
}

function sumTokens(run: PipelineRun): TokenTotals {
  let tokensIn = 0;
  let tokensOut = 0;
  for (const step of Object.values(run.steps ?? {}) as StepExecution[]) {
    if (step.llm) {
      tokensIn += step.llm.tokensIn ?? 0;
      tokensOut += step.llm.tokensOut ?? 0;
    }
  }
  return { tokensIn, tokensOut };
}

/** Build a nodeId → model lookup for a pipeline definition. */
function buildModelMap(def: PipelineDefinition | null): Map<string, string> {
  const map = new Map<string, string>();
  if (!def) return map;
  for (const node of def.nodes) {
    if (node.data.type === 'llm') map.set(node.id, node.data.model);
  }
  return map;
}

/** Compute a run's total USD cost using real vendor pricing. */
function runCost(run: PipelineRun, models: Map<string, string>): number {
  const steps: Array<{ model?: string; tokensIn?: number; tokensOut?: number }> = [];
  for (const step of Object.values(run.steps ?? {}) as StepExecution[]) {
    if (!step.llm) continue;
    steps.push({
      model: models.get(step.nodeId),
      tokensIn: step.llm.tokensIn,
      tokensOut: step.llm.tokensOut,
    });
  }
  return aggregateCost(steps).total.totalCostUsd;
}

function percentile(sorted: number[], p: number): number {
  if (sorted.length === 0) return 0;
  const idx = Math.min(sorted.length - 1, Math.floor(sorted.length * p));
  return sorted[idx];
}


function formatMoney(v: number): string {
  if (v < 0.01) return `$${v.toFixed(4)}`;
  if (v < 1) return `$${v.toFixed(3)}`;
  return `$${v.toFixed(2)}`;
}

/**
 * Compact USD formatter for chart Y-axes — produces `$0`, `$0.0018`, `$0.5`,
 * `$1`, `$10`. Up to 4 decimals; trailing zeros (and the trailing dot) are
 * trimmed so ticks stay short. Recharts' default tick generator strips the
 * leading `$` on small numbers, so we apply this via `tickFormatter`.
 */
function formatUsdAxis(v: number): string {
  const n = typeof v === 'number' ? v : Number(v);
  if (!Number.isFinite(n)) return '$0';
  return `$${n.toFixed(4).replace(/\.?0+$/, '')}`;
}

function shortRunId(id: string): string {
  return id.slice(0, 8);
}

function relativeTime(iso: string): string {
  const d = Date.now() - new Date(iso).getTime();
  if (d < 60_000) return 'just now';
  if (d < 3_600_000) return `${Math.floor(d / 60_000)}m ago`;
  if (d < 86_400_000) return `${Math.floor(d / 3_600_000)}h ago`;
  if (d < 259_200_000) return `${Math.floor(d / 86_400_000)}d ago`;
  return new Date(iso).toLocaleDateString();
}

// ---------------------------------------------------------------------------
// Aggregation (pure — easy to unit-test via the component)
// ---------------------------------------------------------------------------

interface FailureRow {
  key: string;
  count: number;
  lastSeenAt: string;
  exampleRunId: string;
}

interface Stats {
  totalCount: number;
  completedCount: number;
  failedCount: number;
  cancelledCount: number;
  successRatePct: number;
  medianMs: number;
  p95Ms: number;
  tokensIn: number;
  tokensOut: number;
  tokensPerRun: number;
  totalCost: number;
  costPerRun: number;
  failureBreakdown: FailureRow[];
}

function aggregate(runs: PipelineRun[], models: Map<string, string>): Stats {
  const totalCount = runs.length;
  let completedCount = 0;
  let failedCount = 0;
  let cancelledCount = 0;

  const durations: number[] = [];
  let tokensIn = 0;
  let tokensOut = 0;
  let totalCost = 0;

  const failureMap = new Map<string, { count: number; lastSeenAt: string; exampleRunId: string }>();

  for (const r of runs) {
    if (r.status === 'completed') completedCount++;
    else if (r.status === 'failed') failedCount++;
    else if (r.status === 'cancelled') cancelledCount++;

    if (typeof r.durationMs === 'number' && r.durationMs > 0) {
      durations.push(r.durationMs);
    }

    const tokens = sumTokens(r);
    tokensIn += tokens.tokensIn;
    tokensOut += tokens.tokensOut;
    totalCost += runCost(r, models);

    if (r.error?.message) {
      // Group by first ~48 chars of the error message.
      const key = r.error.message.slice(0, 48);
      const prev = failureMap.get(key);
      if (!prev) {
        failureMap.set(key, { count: 1, lastSeenAt: r.startedAt, exampleRunId: r.id });
      } else {
        prev.count += 1;
        if (r.startedAt > prev.lastSeenAt) {
          prev.lastSeenAt = r.startedAt;
          prev.exampleRunId = r.id;
        }
      }
    }
  }

  durations.sort((a, b) => a - b);
  const medianMs = percentile(durations, 0.5);
  const p95Ms = percentile(durations, 0.95);

  const successRatePct =
    totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  const failureBreakdown: FailureRow[] = [...failureMap.entries()]
    .map(([key, v]) => ({ key, count: v.count, lastSeenAt: v.lastSeenAt, exampleRunId: v.exampleRunId }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return {
    totalCount,
    completedCount,
    failedCount,
    cancelledCount,
    successRatePct,
    medianMs,
    p95Ms,
    tokensIn,
    tokensOut,
    tokensPerRun: totalCount === 0 ? 0 : Math.round((tokensIn + tokensOut) / totalCount),
    totalCost,
    costPerRun: totalCount === 0 ? 0 : totalCost / totalCount,
    failureBreakdown,
  };
}

// ---------------------------------------------------------------------------
// Success-rate color ramp
// ---------------------------------------------------------------------------

function successRateColor(pct: number): string {
  if (pct >= 90) return '#16a34a';
  if (pct >= 70) return '#f59e0b';
  return '#dc2626';
}

// ---------------------------------------------------------------------------
// Chart data builders
// ---------------------------------------------------------------------------

function buildRunsOverTime(runs: PipelineRun[]): LineSeries[] {
  const sorted = [...runs].sort((a, b) => a.startedAt.localeCompare(b.startedAt));

  const completed: Array<{ x: number; y: number }> = [];
  const failed: Array<{ x: number; y: number }> = [];
  const cancelled: Array<{ x: number; y: number }> = [];

  let cC = 0;
  let cF = 0;
  let cX = 0;

  for (const r of sorted) {
    const t = new Date(r.startedAt).getTime();
    if (r.status === 'completed') cC += 1;
    else if (r.status === 'failed') cF += 1;
    else if (r.status === 'cancelled') cX += 1;
    completed.push({ x: t, y: cC });
    failed.push({ x: t, y: cF });
    cancelled.push({ x: t, y: cX });
  }

  return [
    { label: 'Completed', data: completed, color: '#16a34a' },
    { label: 'Failed', data: failed, color: '#dc2626' },
    { label: 'Cancelled', data: cancelled, color: '#d1d5db' },
  ];
}

function buildDurationSeries(runs: PipelineRun[], p50: number): LineSeries[] {
  const sorted = [...runs].sort((a, b) => a.startedAt.localeCompare(b.startedAt));
  const points = sorted
    .filter((r) => typeof r.durationMs === 'number' && (r.durationMs as number) > 0)
    .map((r) => ({ x: new Date(r.startedAt).getTime(), y: r.durationMs as number }));

  const p50Line = points.map((p) => ({ x: p.x, y: p50 }));

  return [
    { label: 'Duration (ms)', data: points, color: '#646cff' },
    { label: 'p50', data: p50Line, color: '#94a3b8' },
  ];
}

function buildTokenSeries(runs: PipelineRun[]): LineSeries[] {
  const sorted = [...runs].sort((a, b) => a.startedAt.localeCompare(b.startedAt));

  const tin: Array<{ x: number; y: number }> = [];
  const tout: Array<{ x: number; y: number }> = [];
  for (const r of sorted) {
    const t = new Date(r.startedAt).getTime();
    const { tokensIn, tokensOut } = sumTokens(r);
    tin.push({ x: t, y: tokensIn });
    tout.push({ x: t, y: tokensOut });
  }
  return [
    { label: 'Tokens in', data: tin, color: '#646cff' },
    { label: 'Tokens out', data: tout, color: '#16a34a' },
  ];
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

type RangeSel = '10' | '50' | 'all';

export default function PipelineStatsPage() {
  const { pipelineId } = useParams<{ pipelineId: string }>();
  const navigate = useNavigate();

  const [def, setDef] = useState<PipelineDefinition | null>(null);
  const [runs, setRuns] = useState<PipelineRun[]>([]);
  const [range, setRange] = useState<RangeSel>('50');

  useEffect(() => {
    if (!pipelineId) return;
    setDef(loadPipeline(pipelineId));
    setRuns(listRuns(pipelineId));
  }, [pipelineId]);

  const visibleRuns = useMemo(() => {
    if (range === 'all') return runs;
    const n = Number(range);
    return runs.slice(0, n);
  }, [runs, range]);

  const models = useMemo(() => buildModelMap(def), [def]);
  const stats = useMemo(() => aggregate(visibleRuns, models), [visibleRuns, models]);

  const nodeCostRows = useMemo<NodeCostRow[]>(
    () => costByNode(visibleRuns, def).filter((r) => r.totalCostUsd > 0 || r.stepCount > 0),
    [visibleRuns, def],
  );

  const trendPoints = useMemo(() => dailyCostTrend(runs, def, 30), [runs, def]);
  const trendSeries: LineSeries[] = useMemo(
    () => [
      {
        label: 'Daily spend',
        data: trendPoints.map((p) => ({ x: p.ts, y: p.totalCostUsd })),
        color: '#646cff',
      },
    ],
    [trendPoints],
  );

  if (!pipelineId) return <Navigate to="/pipelines" replace />;
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

  const hasRuns = visibleRuns.length > 0;

  return (
    <div className="p-6 flex flex-col gap-4">
      {/* Top bar */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate(`/pipelines/${pipelineId}`)}
          className="bg-transparent border-none text-primary cursor-pointer text-[13px] p-0"
        >
          ← {def.name}
        </button>
        <span className="text-text-tertiary">/</span>
        <span className="text-lg font-bold text-text-primary">
          Execution stats
        </span>

        <div
          className="ml-auto flex gap-1.5"
          data-testid="stats-range"
        >
          {(['10', '50', 'all'] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRange(r)}
              className={cn(
                'px-2.5 py-1 text-xs font-medium rounded cursor-pointer font-[inherit]',
                range === r
                  ? 'border border-primary bg-primary text-white'
                  : 'border border-border bg-surface text-text-secondary',
              )}
            >
              {r === 'all' ? 'All' : `Last ${r}`}
            </button>
          ))}
        </div>
      </div>

      {/* Empty state */}
      {!hasRuns ? (
        <EmptyState
          icon="📊"
          title="No runs yet"
          body="No runs yet. Trigger this pipeline to see stats."
        />
      ) : (
        <>
          {/* KPI row */}
          <div
            className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3"
            data-testid="stats-kpis"
          >
            <div className="bg-surface border border-border rounded-lg p-4 flex flex-col gap-1.5 min-w-0">
              <div className="text-[11px] font-semibold text-text-secondary uppercase tracking-[0.04em]">Success rate</div>
              <div
                className="text-[22px] font-bold font-mono"
                style={{ color: successRateColor(stats.successRatePct) }}
                data-testid="stats-success-rate"
              >
                {stats.completedCount}/{stats.totalCount} ({stats.successRatePct}%)
              </div>
              <div className="text-xs text-text-tertiary font-mono">
                {stats.failedCount} failed · {stats.cancelledCount} cancelled
              </div>
            </div>

            <div className="bg-surface border border-border rounded-lg p-4 flex flex-col gap-1.5 min-w-0">
              <div className="text-[11px] font-semibold text-text-secondary uppercase tracking-[0.04em]">Median duration</div>
              <div className="text-[22px] font-bold text-text-primary font-mono">{formatDuration(stats.medianMs)}</div>
              <div className="text-xs text-text-tertiary font-mono">p95 · {formatDuration(stats.p95Ms)}</div>
            </div>

            <div className="bg-surface border border-border rounded-lg p-4 flex flex-col gap-1.5 min-w-0">
              <div className="text-[11px] font-semibold text-text-secondary uppercase tracking-[0.04em]">Total tokens</div>
              <div className="text-[22px] font-bold text-text-primary font-mono">
                {stats.tokensIn.toLocaleString()} → {stats.tokensOut.toLocaleString()}
              </div>
              <div className="text-xs text-text-tertiary font-mono">
                {stats.tokensPerRun.toLocaleString()} avg per run
              </div>
            </div>

            <div className="bg-surface border border-border rounded-lg p-4 flex flex-col gap-1.5 min-w-0">
              <div className="text-[11px] font-semibold text-text-secondary uppercase tracking-[0.04em]">Total cost</div>
              <div className="text-[22px] font-bold text-text-primary font-mono">{formatMoney(stats.totalCost)}</div>
              <div className="text-xs text-text-tertiary font-mono">{formatMoney(stats.costPerRun)} avg per run</div>
            </div>
          </div>

          {/* Cost charts row */}
          <div
            className="grid grid-cols-[repeat(auto-fit,minmax(360px,1fr))] gap-3"
            data-testid="stats-cost-row"
          >
            <div className="bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0" data-testid="stats-cost-by-node">
              <div className="text-[13px] font-semibold text-text-primary">Cost by node</div>
              {nodeCostRows.length === 0 ? (
                <div className="text-xs text-text-tertiary py-2">
                  No per-node cost data in this range.
                </div>
              ) : (
                <BarChart
                  data={nodeCostRows.map((r) => ({
                    label: r.label,
                    cost: Number(r.totalCostUsd.toFixed(6)),
                  }))}
                  xKey="label"
                  yKey="cost"
                  height={200}
                  color="#646cff"
                  yFormat={formatUsdAxis}
                />
              )}
            </div>

            <div className="bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0" data-testid="stats-cost-trend-30d">
              <div className="text-[13px] font-semibold text-text-primary">30-day spend trend</div>
              <LineChart
                series={trendSeries}
                height={200}
                xFormat={(v) =>
                  new Date(Number(v)).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                  })
                }
                yFormat={formatUsdAxis}
              />
            </div>
          </div>

          {/* Charts grid */}
          <div className="grid grid-cols-[repeat(auto-fit,minmax(360px,1fr))] gap-3">
            <div className="bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0">
              <div className="text-[13px] font-semibold text-text-primary">Runs over time (cumulative)</div>
              <LineChart
                series={buildRunsOverTime(visibleRuns)}
                height={180}
                xFormat={(v) => new Date(Number(v)).toLocaleDateString()}
              />
            </div>

            <div className="bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0">
              <div className="text-[13px] font-semibold text-text-primary">Duration over time</div>
              <LineChart
                series={buildDurationSeries(visibleRuns, stats.medianMs)}
                height={180}
                xFormat={(v) => new Date(Number(v)).toLocaleDateString()}
                yFormat={(v) => formatDuration(v)}
              />
            </div>

            <div className="bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0">
              <div className="text-[13px] font-semibold text-text-primary">Token usage over time</div>
              <LineChart
                series={buildTokenSeries(visibleRuns)}
                height={180}
                xFormat={(v) => new Date(Number(v)).toLocaleDateString()}
                yFormat={(v) => v.toLocaleString()}
              />
            </div>

            {/* Failure breakdown */}
            <div className="bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0" data-testid="stats-failure-breakdown">
              <div className="text-[13px] font-semibold text-text-primary">Failure breakdown (top 5)</div>
              {stats.failureBreakdown.length === 0 ? (
                <div className="text-xs text-text-tertiary py-2">
                  No failures in this range.
                </div>
              ) : (
                <table className="w-full border-collapse text-xs">
                  <thead>
                    <tr className="text-left">
                      {['Error', 'Count', 'Last seen', 'Example'].map((h) => (
                        <th
                          key={h}
                          className="px-2 py-1.5 text-[10px] font-semibold text-text-secondary uppercase tracking-[0.04em] border-b border-border"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {stats.failureBreakdown.map((row) => (
                      <tr key={row.key} className="border-b border-border">
                        <td
                          className="px-2 py-1.5 text-text-primary max-w-[240px] overflow-hidden text-ellipsis whitespace-nowrap"
                          title={row.key}
                        >
                          {row.key}
                        </td>
                        <td className="px-2 py-1.5 font-mono text-text-primary">
                          {row.count}
                        </td>
                        <td className="px-2 py-1.5 text-text-secondary">
                          {relativeTime(row.lastSeenAt)}
                        </td>
                        <td className="px-2 py-1.5">
                          <button
                            type="button"
                            onClick={() =>
                              navigate(`/pipelines/${pipelineId}/runs/${row.exampleRunId}`)
                            }
                            className="bg-transparent border-none text-primary cursor-pointer text-xs font-mono p-0"
                          >
                            {shortRunId(row.exampleRunId)} →
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

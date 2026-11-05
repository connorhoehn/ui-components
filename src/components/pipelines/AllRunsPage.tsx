import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { listPipelines } from './persistence/pipelineStorage';
import { listRuns } from './persistence/runHistory';
import { listPipelineRuns } from '../../api/pipelineRuns';
import { usePipelineRuns } from './context/PipelineRunsContext';
import { aggregateCost, formatUsd } from './cost/llmPricing';
import EmptyState from '../shared/EmptyState';
import RunsFilterBar from './RunsFilterBar';
import Chip from '../shared/Chip';
import { cn } from '../../lib/cn';
import type { PipelineRun } from '../../types/pipeline';
import { onActivationKey } from '../../lib/activationKey';
import { formatDuration, relativeTime } from './utils/formatTime';
import { statusChipVariant } from './utils/statusColors';
import {
  filterRuns,
  parseFilterParams,
  type StatusKey,
  type TriggerKindKey,
  type DateRangeKey,
} from './runsUtils';

interface RunWithMeta extends PipelineRun {
  pipelineName: string;
}

export default function AllRunsPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [storedRuns, setStoredRuns] = useState<RunWithMeta[]>([]);
  const { runs: liveRunsMap } = usePipelineRuns();

  useEffect(() => {
    // Authoritative source is the backend (DDB pipeline-runs). localStorage
    // is only a fallback for pipelines whose API call returns nothing — that
    // way stale rows from prior DDB recreations don't surface as clickable
    // entries that 404 on the run-detail page.
    let cancelled = false;
    (async () => {
      const pipelines = listPipelines();
      const collected: RunWithMeta[] = [];
      await Promise.all(
        pipelines.map(async (p) => {
          try {
            const { runs } = await listPipelineRuns(p.id, { limit: 50 });
            if (runs.length > 0) {
              for (const r of runs) {
                if (!r.id) continue;
                collected.push({ ...r, pipelineName: p.name });
              }
              return;
            }
          } catch {
            // fall through to localStorage
          }
          for (const r of listRuns(p.id)) {
            if (!r.id) continue;
            collected.push({ ...r, pipelineName: p.name });
          }
        }),
      );
      if (cancelled) return;
      collected.sort((a, b) => b.startedAt.localeCompare(a.startedAt));
      setStoredRuns(collected);
    })();
    return () => { cancelled = true; };
  }, []);

  const allRuns = useMemo(() => {
    const pipelineNames = new Map(listPipelines().map((p) => [p.id, p.name]));
    const storedIds = new Set(storedRuns.map((r) => r.id));
    const liveOnly: RunWithMeta[] = [];
    for (const [id, run] of Object.entries(liveRunsMap)) {
      if (storedIds.has(id)) continue;
      if (!run.pipelineId) continue;
      liveOnly.push({
        ...run,
        pipelineName: pipelineNames.get(run.pipelineId) ?? `Pipeline ${run.pipelineId.slice(0, 8)}`,
      });
    }
    if (liveOnly.length === 0) return storedRuns;
    return [...liveOnly, ...storedRuns].sort((a, b) => b.startedAt.localeCompare(a.startedAt));
  }, [storedRuns, liveRunsMap]);

  const { query, statuses, triggerKinds, range } = useMemo(
    () => parseFilterParams(searchParams),
    [searchParams],
  );

  const updateParam = (key: string, value: string | null) => {
    const next = new URLSearchParams(searchParams);
    if (!value) next.delete(key);
    else next.set(key, value);
    setSearchParams(next, { replace: true });
  };

  const toggleStatus = (s: StatusKey) => {
    const next = new Set(statuses);
    if (next.has(s)) next.delete(s);
    else next.add(s);
    updateParam('status', next.size === 0 ? null : Array.from(next).join(','));
  };

  const toggleTriggerKind = (k: TriggerKindKey) => {
    const next = new Set(triggerKinds);
    if (next.has(k)) next.delete(k);
    else next.add(k);
    updateParam('trigger', next.size === 0 ? null : Array.from(next).join(','));
  };

  const setRange = (r: DateRangeKey) => {
    updateParam('range', r === '7d' ? null : r);
  };

  const setQuery = (q: string) => {
    updateParam('q', q.length === 0 ? null : q);
  };

  const filtered = useMemo(
    () => filterRuns(allRuns, { query, statuses, triggerKinds, range }),
    [allRuns, query, statuses, triggerKinds, range],
  );

  const costByRunId = useMemo(() => {
    const out: Record<string, string> = {};
    for (const r of filtered) {
      const steps = Object.values(r.steps)
        .filter((s) => !!s.llm)
        .map((s) => ({
          model: undefined,
          tokensIn: s.llm?.tokensIn ?? 0,
          tokensOut: s.llm?.tokensOut ?? 0,
        }));
      const c = aggregateCost(steps);
      if (c.total.totalCostUsd > 0) out[r.id] = formatUsd(c.total);
    }
    return out;
  }, [filtered]);

  return (
    <div data-testid="all-runs-page" className="p-6 flex flex-col gap-3">
      <div className="flex items-center justify-between mb-4">
        <h2 className="m-0 text-[22px] font-bold text-text-primary">
          Runs
        </h2>
        <span className="text-[13px] text-text-tertiary">
          {filtered.length} run{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      <RunsFilterBar
        query={query}
        onQueryChange={setQuery}
        statuses={statuses}
        onStatusToggle={toggleStatus}
        triggerKinds={triggerKinds}
        onTriggerToggle={toggleTriggerKind}
        range={range}
        onRangeChange={setRange}
        onClearFilters={() => setSearchParams(new URLSearchParams(), { replace: true })}
      />

      {filtered.length === 0 ? (
        <EmptyState
          icon="📋"
          title="No runs yet"
          body="Run a pipeline to see execution history here."
        />
      ) : (
        <div className="overflow-x-auto">
          <table data-ui-part="" className="w-full border-collapse text-[13px]">
            <thead>
              <tr className="border-b border-border">
                <th className="px-3 py-2.5 text-xs text-text-secondary font-semibold text-left">Pipeline</th>
                <th className="px-3 py-2.5 text-xs text-text-secondary font-semibold text-left">Run ID</th>
                <th className="px-3 py-2.5 text-xs text-text-secondary font-semibold text-left">Status</th>
                <th className="px-3 py-2.5 text-xs text-text-secondary font-semibold text-left">Trigger</th>
                <th className="px-3 py-2.5 text-xs text-text-secondary font-semibold text-left">Started</th>
                <th className="px-3 py-2.5 text-xs text-text-secondary font-semibold text-right">Duration</th>
                <th className="px-3 py-2.5 text-xs text-text-secondary font-semibold text-right">Cost</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((run) => (
                <tr
                  data-ui-part=""
                  key={run.id}
                  role="button"
                  tabIndex={0}
                  aria-label={`Open run ${run.id.slice(0, 11)} of ${(run as RunWithMeta).pipelineName}`}
                  onClick={() => navigate(`/pipelines/${run.pipelineId}/runs/${run.id}`)}
                  onKeyDown={onActivationKey(() =>
                    navigate(`/pipelines/${run.pipelineId}/runs/${run.id}`),
                  )}
                  className="border-b border-border cursor-pointer hover:bg-surface-hover"
                >
                  <td className="px-3 py-2.5 text-xs text-text-secondary font-medium">
                    {(run as RunWithMeta).pipelineName}
                  </td>
                  <td className="px-3 py-2.5 text-xs text-text-secondary font-mono">
                    {run.id.slice(0, 11)}
                  </td>
                  <td className="px-3 py-2.5 text-xs text-text-secondary">
                    <Chip tone={statusChipVariant(run.status).tone} size="sm">{run.status}</Chip>
                  </td>
                  <td className="px-3 py-2.5 text-xs text-text-secondary">{(run as any).triggerType ?? run.triggeredBy?.triggerType}</td>
                  <td className="px-3 py-2.5 text-xs text-text-secondary">{relativeTime(run.startedAt)}</td>
                  <td className="px-3 py-2.5 text-xs text-text-secondary text-right font-mono">
                    {run.completedAt ? formatDuration(new Date(run.completedAt).getTime() - new Date(run.startedAt).getTime()) : '—'}
                  </td>
                  <td className="px-3 py-2.5 text-xs text-text-secondary text-right font-mono">
                    {costByRunId[run.id] ?? '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

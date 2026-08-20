// frontend/src/components/pipelines/PipelineRunsPage.tsx
//
// List view for a pipeline's persisted run history. Route: /pipelines/:pipelineId/runs.
//
// URL query-param scheme (state survives reload + back-button):
//   q=<text>                                    case-insensitive substring match against runId/pipelineId
//   status=pending,running,completed,...        multi-select; empty/missing = all statuses
//   trigger=manual,scheduled,webhook,document   multi-select; empty/missing = all kinds
//                                                'document' matches any 'document.*' triggerType
//                                                'scheduled' matches the 'schedule' triggerType (UI alias)
//   range=24h|7d|30d|all                        default 7d
//
// Bulk actions operate on the current `selected` set (independent of the
// 2-cap Compare selection — Compare still uses two of the same checkboxes).

import { useEffect, useMemo, useState, useCallback } from 'react';
import { useParams, useNavigate, Navigate, useSearchParams } from 'react-router';
import { loadPipeline } from './persistence/pipelineStorage';
import { listRuns, clearRuns, appendRun } from './persistence/runHistory';
import { aggregateCost, formatUsd } from './cost/llmPricing';
import EmptyState from '../shared/EmptyState';
import Banner from '../shared/Banner';
import ConfirmDialog from '../shared/ConfirmDialog';
import RunsFilterBar from './RunsFilterBar';
import RunsBulkActionBar from './RunsBulkActionBar';
import RunsTable from './RunsTable';
import { cn } from '../../lib/cn';
import type { PipelineDefinition, PipelineRun } from '../../types/pipeline';
import { retryFromNode } from '../../api/pipelineRetry';
import { Checkbox } from '../forms/Checkbox';
import {
  filterRuns,
  parseFilterParams,
  type StatusKey,
  type TriggerKindKey,
  type DateRangeKey,
} from './runsUtils';

// Re-export domain utilities so existing tests importing from this module still work.
export type { StatusKey, TriggerKindKey, DateRangeKey, RunFilterCriteria } from './runsUtils';
export {
  STATUS_KEYS,
  TRIGGER_KIND_KEYS,
  DATE_RANGE_KEYS,
  triggerTypeToKind,
  countTotalRetries,
  filterRuns,
  parseFilterParams,
} from './runsUtils';

export default function PipelineRunsPage() {
  const { pipelineId } = useParams<{ pipelineId: string }>();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [runs, setRuns] = useState<PipelineRun[]>([]);
  const [def, setDef] = useState<PipelineDefinition | null>(null);
  // Compare-pair (cap of 2) — kept separate from `selected` so the user can
  // bulk-act on many runs without clobbering an in-progress compare pick.
  const [comparePair, setComparePair] = useState<string[]>([]);
  const [selected, setSelected] = useState<Set<string>>(() => new Set());
  // Hub#1288: retry-from-failed-step modal state.
  interface RetryTarget { run: PipelineRun; nodeId: string; skippedNodes: string[]; snapshotInput: boolean; }
  const [retryTarget, setRetryTarget] = useState<RetryTarget | null>(null);
  const [retryInFlight, setRetryInFlight] = useState(false);
  const [retryError, setRetryError] = useState<string | null>(null);
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);

  const openRetryModal = useCallback((r: PipelineRun) => {
    const nodeId = r.error?.nodeId;
    if (!nodeId || nodeId === 'unknown') return;
    const skippedNodes = Object.entries(r.steps)
      .filter(([id, s]) => id !== nodeId && s.status === 'completed')
      .map(([id]) => id);
    setRetryTarget({ run: r, nodeId, skippedNodes, snapshotInput: false });
    setRetryError(null);
  }, []);

  const confirmRetry = useCallback(async () => {
    if (!retryTarget) return;
    setRetryError(null);
    setRetryInFlight(true);
    try {
      const resp = await retryFromNode(
        retryTarget.run.pipelineId, retryTarget.run.id, retryTarget.nodeId,
        undefined, retryTarget.snapshotInput || undefined,
      );
      setRetryTarget(null);
      navigate(`/pipelines/${retryTarget.run.pipelineId}/runs/${resp.newRunId}`);
    } catch (err) {
      setRetryError(err instanceof Error ? err.message : String(err));
      setRetryInFlight(false);
    }
  }, [retryTarget, navigate]);

  // Decode current params on every render (cheap — small URLs).
  const { query, statuses, triggerKinds, range } = useMemo(
    () => parseFilterParams(searchParams),
    [searchParams],
  );

  // Mutators write through to the URL so back-button restores prior filters.
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

  const toggleComparePair = (runId: string) => {
    setComparePair((prev) => {
      if (prev.includes(runId)) return prev.filter((id) => id !== runId);
      if (prev.length >= 2) return [prev[1], runId];
      return [...prev, runId];
    });
  };

  useEffect(() => {
    if (!pipelineId) return;
    setDef(loadPipeline(pipelineId));
    setRuns(listRuns(pipelineId));
  }, [pipelineId]);

  const filtered = useMemo(
    () => filterRuns(runs, { query, statuses, triggerKinds, range }),
    [runs, query, statuses, triggerKinds, range],
  );

  const modelByNodeId = useMemo(() => {
    const map = new Map<string, string>();
    if (!def) return map;
    for (const node of def.nodes) {
      if (node.data.type === 'llm') {
        map.set(node.id, node.data.model);
      }
    }
    return map;
  }, [def]);

  const costByRunId = useMemo(() => {
    const out: Record<string, string> = {};
    for (const r of filtered) {
      const steps = Object.values(r.steps)
        .filter((s) => !!s.llm)
        .map((s) => ({
          model: modelByNodeId.get(s.nodeId),
          tokensIn: s.llm?.tokensIn ?? 0,
          tokensOut: s.llm?.tokensOut ?? 0,
        }));
      out[r.id] = formatUsd(aggregateCost(steps).total);
    }
    return out;
  }, [filtered, modelByNodeId]);

  const bulkDeleteConfirmed = () => {
    if (!pipelineId) return;
    setBulkDeleteOpen(false);
    const ids = Array.from(selected);
    const remaining = runs.filter((r) => !selected.has(r.id));
    clearRuns(pipelineId);
    for (const r of [...remaining].sort((a, b) => a.startedAt.localeCompare(b.startedAt))) {
      appendRun(pipelineId, r);
    }
    setRuns(listRuns(pipelineId));
    setSelected(new Set());
    setComparePair((p) => p.filter((id) => !ids.includes(id)));
  };

  const bulkExport = () => {
    const picked = runs.filter((r) => selected.has(r.id));
    if (picked.length === 0) return;
    const blob = new Blob([JSON.stringify(picked, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const ts = new Date().toISOString().replace(/[:.]/g, '-');
    a.href = url;
    a.download = `pipeline-runs-${ts}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

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

  return (
    <div data-testid="pipeline-runs-page" className="p-6 flex flex-col gap-3">
      {/* Hub#1288: retry-from-failure confirmation modal. */}
      <ConfirmDialog
        open={retryTarget !== null}
        onConfirm={confirmRetry}
        onCancel={() => { if (!retryInFlight) setRetryTarget(null); }}
        title="Retry from failure"
        confirmLabel={retryInFlight ? 'Starting…' : 'Confirm retry'}
        confirmDisabled={retryInFlight}
      >
        {retryTarget && (
          <div className="flex flex-col gap-2.5">
            <div className="text-[13px] text-text-secondary">
              Run <code className="bg-[#fafbfc] px-1 py-px rounded-[3px] text-xs">{retryTarget.run.id.slice(0, 8)}</code> will restart from step{' '}
              <code className="bg-[#fafbfc] px-1 py-px rounded-[3px] text-xs">{retryTarget.nodeId.slice(0, 12)}{retryTarget.nodeId.length > 12 ? '…' : ''}</code>
              {' '}using the original upstream context.
            </div>
            {retryTarget.skippedNodes.length > 0 && (
              <div>
                <div className="text-[11px] font-semibold text-text-tertiary uppercase mb-1.5">
                  Steps skipped ({retryTarget.skippedNodes.length})
                </div>
                <div className="max-h-20 overflow-y-auto flex flex-wrap gap-1">
                  {retryTarget.skippedNodes.map((id) => (
                    <span key={id} className="bg-[#fafbfc] border border-border rounded-[3px] px-1.5 py-px text-[11px] font-mono text-text-secondary">{id.slice(0, 10)}</span>
                  ))}
                </div>
              </div>
            )}
            <label className="flex items-center gap-2 text-[13px] text-text-secondary cursor-pointer">
              <Checkbox
                checked={retryTarget.snapshotInput}
                onChange={(snapshotInput) =>
                  setRetryTarget((t) => (t ? { ...t, snapshotInput } : t))
                }
              />
              Use persisted input snapshot
            </label>
            {retryError && (
              <div data-testid="retry-modal-error" className="px-3 py-2 bg-[#fef2f2] border border-[#fecaca] rounded-md text-xs text-[#991b1b]">{retryError}</div>
            )}
          </div>
        )}
      </ConfirmDialog>
      <ConfirmDialog
        open={bulkDeleteOpen}
        onConfirm={bulkDeleteConfirmed}
        onCancel={() => setBulkDeleteOpen(false)}
        title={`Delete ${selected.size} run${selected.size === 1 ? '' : 's'}?`}
        body="This cannot be undone."
        confirmLabel={`Delete ${selected.size}`}
        tone="destructive"
      />
      {retryError && (
        <Banner title="Retry failed:" onDismiss={() => setRetryError(null)}>
          {retryError}
        </Banner>
      )}

      {/* Header / breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate(`/pipelines/${pipelineId}`)}
          className="bg-none border-none text-primary cursor-pointer text-[13px] p-0"
        >
          ← {def.name}
        </button>
        <span className="text-text-tertiary">/</span>
        <span className="text-lg font-bold text-text-primary">
          Run history
        </span>
        <span className="text-xs text-text-tertiary ml-auto">
          {runs.length} run{runs.length === 1 ? '' : 's'} persisted
        </span>
        <button
          type="button"
          onClick={() => navigate(`/pipelines/${pipelineId}/stats`)}
          data-testid="runs-stats-link"
          className="px-2.5 py-1 text-xs font-medium border border-border bg-surface text-text-secondary rounded cursor-pointer font-[inherit]"
        >
          📊 Stats
        </button>
        <button
          type="button"
          disabled={comparePair.length !== 2}
          onClick={() => {
            if (comparePair.length !== 2) return;
            const [a, b] = comparePair;
            navigate(`/pipelines/${pipelineId}/runs/compare/${a}/${b}`);
          }}
          data-testid="run-compare-btn"
          className={cn(
            'px-2.5 py-1 text-xs font-medium rounded font-[inherit]',
            comparePair.length === 2
              ? 'border border-primary bg-primary text-white cursor-pointer opacity-100'
              : 'border border-border bg-surface text-text-secondary cursor-not-allowed opacity-70'
          )}
        >
          ⇄ Compare ({comparePair.length}/2)
        </button>
      </div>

      <RunsFilterBar
        query={query}
        statuses={statuses}
        triggerKinds={triggerKinds}
        range={range}
        onQueryChange={setQuery}
        onStatusToggle={toggleStatus}
        onTriggerToggle={toggleTriggerKind}
        onRangeChange={setRange}
        onClearFilters={() => {
          setQuery('');
          updateParam('status', null);
          updateParam('trigger', null);
        }}
      />

      {selected.size > 0 && (
        <RunsBulkActionBar
          selectionCount={selected.size}
          onExport={bulkExport}
          onDelete={() => { if (selected.size > 0 && pipelineId) setBulkDeleteOpen(true); }}
          onClear={() => setSelected(new Set())}
        />
      )}

      {filtered.length === 0 ? (
        <EmptyState
          icon="📜"
          title={runs.length === 0 ? 'No runs yet' : 'No runs match these filters'}
          body={
            runs.length === 0
              ? 'Trigger this pipeline and completed runs will appear here.'
              : 'Try clearing a filter or expanding the date range.'
          }
        />
      ) : (
        <RunsTable
          filtered={filtered}
          selected={selected}
          onSelectionChange={setSelected}
          comparePair={comparePair}
          onToggleComparePair={toggleComparePair}
          costByRunId={costByRunId}
          pipelineId={pipelineId}
          onNavigate={navigate}
          onOpenRetryModal={openRetryModal}
        />
      )}
    </div>
  );
}

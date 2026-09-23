// frontend/src/components/pipelines/PipelineRunReplayPage.tsx
//
// Route: /pipelines/:pipelineId/runs/:runId — historical run replay per
// PIPELINES_PLAN.md §18.5.
//
// Same overall frame as the editor, but:
//   - Palette is hidden (read-only mode) — canvas takes its space.
//   - Canvas is passed a readOnly flag (sibling agent may not wire it yet —
//     see TODO below).
//   - Top bar shows breadcrumb + "Run from <date> by <user>" + Re-run + ⋯.
//   - Bottom is a scrubber strip placeholder (Phase 1 stubs, wired in Phase 5).

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Navigate, useNavigate, useParams } from 'react-router';
import { useClickOutside } from './hooks/useClickOutside';
import { cn } from '../../lib/cn';
import { handleRovingKeyDown } from '../../lib/rovingFocus';

import {
  PipelineEditorProvider,
  usePipelineEditor,
} from './context/PipelineEditorContext';
import {
  PipelineRunsProvider,
  usePipelineRuns,
} from './context/PipelineRunsContext';
import { usePipelineRunChannelSubscription } from './context/WebSocketEventAdapter';
import { duplicatePipeline } from './persistence/pipelineStorage';
import { retryFromNode } from '../../api/pipelineRetry';
import { resumeFromStep } from '../../api/pipelineResume';
import Banner from '../shared/Banner';
import Chip from '../shared/Chip';
import ConfirmDialog from '../shared/ConfirmDialog';
import { useRunCost } from './cost/useRunCost';
import { formatUsd } from './cost/llmPricing';
import type { NodeType, PipelineRun } from '../../types/pipeline';
import { formatDate } from './utils/formatTime';
import { downloadJSON } from './utils/fileUtils';
import { statusChipVariant, errorCategoryTone } from './utils/statusColors';
import { refusalNotRetryableReason, runRefusal } from './utils/runRefusal';
import { StepTree } from './steps/StepTree';
import { Button } from '../ui/Button';
import { IconButton } from '../ui/IconButton';
import ExecutorLog from './ExecutorLog';
import { Checkbox } from '../forms/Checkbox';

// ---------------------------------------------------------------------------
// Outer page — route param validation + providers
// ---------------------------------------------------------------------------

export default function PipelineRunReplayPage() {
  const { pipelineId, runId } = useParams<{
    pipelineId: string;
    runId: string;
  }>();

  if (!pipelineId || !runId) {
    return <Navigate to="/pipelines" replace />;
  }

  return (
    <PipelineEditorProvider pipelineId={pipelineId}>
      <PipelineRunsProvider>
        <ReplayFrame pipelineId={pipelineId} runId={runId} />
      </PipelineRunsProvider>
    </PipelineEditorProvider>
  );
}

// ---------------------------------------------------------------------------
// Inner frame — consumes editor + runs context
// ---------------------------------------------------------------------------

interface ReplayFrameProps {
  pipelineId: string;
  runId: string;
}

function ReplayFrame({ pipelineId, runId }: ReplayFrameProps) {
  const navigate = useNavigate();
  const editor = usePipelineEditor();
  const runs = usePipelineRuns();
  const { definition } = editor;

  // Always fetch from the API so historical step data is available even when
  // the live context has a sparse version of the run (e.g. page opened after
  // events already fired, or WS reconnection lost intermediate step events).
  const [fetchedRun, setFetchedRun] = useState<PipelineRun | null>(null);
  // `getPipelineRun` resolves null ONLY for a real 404 and rejects for
  // transport/5xx/401. Keeping the two apart is the whole point: without it
  // an unreachable API rendered "may have been trimmed from history", which
  // tells the user their run was garbage-collected when the server is simply
  // down — and offers no retry.
  const [runFetchError, setRunFetchError] = useState<string | null>(null);
  const [runFetchAttempt, setRunFetchAttempt] = useState(0);
  const retryRunFetch = useCallback(() => setRunFetchAttempt((n) => n + 1), []);
  useEffect(() => {
    let cancelled = false;
    setRunFetchError(null);
    import('../../api/pipelineRuns').then(({ getPipelineRun }) =>
      getPipelineRun(pipelineId, runId).then((r) => {
        if (!cancelled && r) setFetchedRun(r);
      }),
    ).catch((err: unknown) => {
      if (cancelled) return;
      setRunFetchError(err instanceof Error ? err.message : String(err));
    });
    return () => { cancelled = true; };
  }, [pipelineId, runId, runFetchAttempt]);

  const run: PipelineRun | undefined = useMemo(() => {
    const live = runs.runs[runId];
    const fetched = fetchedRun;
    if (!live && !fetched) return undefined;
    if (!live) return fetched ?? undefined;
    if (!fetched) return live;
    const liveStepCount = Object.keys(live.steps).length;
    const fetchedStepCount = Object.keys(fetched.steps).length;
    if (liveStepCount >= fetchedStepCount) return live;
    return { ...fetched, status: live.status, currentStepIds: live.currentStepIds };
  }, [runs.runs, runId, fetchedRun]);

  usePipelineRunChannelSubscription(runId);

  const runCost = useRunCost(run ?? null);

  // ── Node data map — carries full config for each node ────────────────
  const nodeDataMap = useMemo<Record<string, { type: NodeType; data: Record<string, unknown> }>>(() => {
    const map: Record<string, { type: NodeType; data: Record<string, unknown> }> = {};
    if (!definition) return map;
    for (const node of definition.nodes) {
      map[node.id] = { type: node.data.type as NodeType, data: node.data as unknown as Record<string, unknown> };
    }
    return map;
  }, [definition]);


  // ── Overflow menu ────────────────────────────────────────────────────
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  useClickOutside(menuRef, () => setMenuOpen(false), menuOpen);

  // ── Tab state (hub#2225: Steps | Executor Log) ──────────────────────
  const [activeTab, setActiveTab] = useState<'steps' | 'log'>('steps');

  // hub#2225: ExecutorLog forwards step-row clicks here so the canvas can
  // highlight the node. The replay page currently renders a StepTree (no
  // canvas), so we accept the stepId, switch to the Steps tab, and stash it
  // for any future StepTree highlight wiring. TODO: when the read-only canvas
  // lands, feed `highlightedStepId` into its `currentStepIds` prop.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [highlightedStepId, setHighlightedStepId] = useState<string | null>(null);
  const handleExecutorLogStepClick = useCallback((stepId: string) => {
    setHighlightedStepId(stepId);
    setActiveTab('steps');
  }, []);

  // ── Retry from step — modal state (hub#1288) ────────────────────────
  interface RetryModalState { nodeId: string; skippedNodes: string[]; snapshotInput: boolean; }
  const [retryModal, setRetryModal] = useState<RetryModalState | null>(null);
  const [retryError, setRetryError] = useState<string | null>(null);
  const [retryInFlight, setRetryInFlight] = useState(false);
  const failedNodeId = run?.status === 'failed' ? run.error?.nodeId : undefined;
  // A refusal (constraint-not-met, forbidden, revision-conflict,
  // invalid-request; category `Refused` or retryability `terminal`) is a
  // decision about the inputs this run already had. Retrying re-checks the
  // same recorded proposal and refuses again, so the page offers no retry
  // and no resume — absent, not disabled — and names the refusal instead.
  const refusal = runRefusal(run);

  const openRetryModal = useCallback((nodeId: string) => {
    if (!run) return;
    const skippedNodes = Object.entries(run.steps)
      .filter(([id, s]) => id !== nodeId && s.status === 'completed')
      .map(([id]) => id);
    setRetryModal({ nodeId, skippedNodes, snapshotInput: false });
    setRetryError(null);
  }, [run]);

  const confirmRetry = useCallback(async () => {
    if (!retryModal || !run) return;
    setRetryError(null);
    setRetryInFlight(true);
    try {
      const resp = await retryFromNode(
        pipelineId, run.id, retryModal.nodeId,
        undefined, retryModal.snapshotInput || undefined,
      );
      setRetryModal(null);
      navigate(`/pipelines/${pipelineId}/runs/${resp.newRunId}`);
    } catch (err) {
      setRetryError(err instanceof Error ? err.message : String(err));
      setRetryInFlight(false);
    }
  }, [retryModal, run, pipelineId, navigate]);

  // ── Resume from here (hub#2223) ──────────────────────────────────────
  // Distinct from retry-from-node: resume re-enters the SAME run via
  // PipelineModule.resumeFromStep, preserving accumulated context. Only
  // surfaced for failed runs.
  const [resumeInFlight, setResumeInFlight] = useState<string | null>(null);
  const [resumeError, setResumeError] = useState<string | null>(null);
  const [resumeToast, setResumeToast] = useState<string | null>(null);
  // A failed Re-run used to be console-only: no navigation, no banner, so the
  // button read as inert and the user just clicked it again.
  const [reRunError, setReRunError] = useState<string | null>(null);

  // Auto-dismiss handle for the resume toast. Worth tracking because the
  // handler schedules it and then immediately navigate()s — the navigation is
  // what unmounts this page, so the timer outlived the mount every time.
  const resumeToastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (resumeToastTimerRef.current) clearTimeout(resumeToastTimerRef.current);
  }, []);

  const handleResumeFromHere = useCallback(async (nodeId: string) => {
    if (!run) return;
    setResumeError(null);
    setResumeInFlight(nodeId);
    try {
      const resp = await resumeFromStep(pipelineId, run.id, nodeId);
      setResumeToast(
        `Resumed from ${nodeId.slice(0, 10)}${nodeId.length > 10 ? '…' : ''} (replay #${resp.replayAttempts})`,
      );
      // Auto-dismiss the toast after a short window so it doesn't linger.
      if (resumeToastTimerRef.current) clearTimeout(resumeToastTimerRef.current);
      resumeToastTimerRef.current = setTimeout(() => setResumeToast(null), 4000);
      // Stay on the same run-detail page — the resumed-from-step event
      // will live-update replayAttempts via the context reducer.
      navigate(`/pipelines/${pipelineId}/runs/${run.id}`);
    } catch (err) {
      setResumeError(err instanceof Error ? err.message : String(err));
    } finally {
      setResumeInFlight(null);
    }
  }, [run, pipelineId, navigate]);

  // ── Re-run ───────────────────────────────────────────────────────────
  const handleReRun = useCallback(async () => {
    setReRunError(null);
    try {
      // No known run — still allow a fresh run with an empty payload.
      const newRunId = await runs.triggerRun(
        pipelineId,
        run ? run.triggeredBy.payload : undefined,
      );
      navigate(`/pipelines/${pipelineId}/runs/${newRunId}`);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('[PipelineRunReplay] re-run failed', err);
      setReRunError(err instanceof Error ? err.message : String(err));
    }
  }, [run, runs, pipelineId, navigate]);

  // ── Menu handlers ────────────────────────────────────────────────────
  const handleCopyRunId = async () => {
    setMenuOpen(false);
    try {
      await navigator.clipboard?.writeText(runId);
    } catch {
      // ignore — clipboard may not be available
    }
  };

  const handleExportRun = () => {
    setMenuOpen(false);
    if (!run) return;
    const json = JSON.stringify(run, null, 2);
    downloadJSON(`run-${runId}.json`, json);
  };

  const handleOpenAsNewDraft = () => {
    setMenuOpen(false);
    if (!definition) return;
    const clone = duplicatePipeline(
      definition.id,
      `${definition.name} (from run)`,
    );
    if (clone) navigate(`/pipelines/${clone.id}`);
  };

  // ── Missing-run fallback ─────────────────────────────────────────────
  // Two distinct outcomes, deliberately rendered differently: the fetch
  // FAILED (server unreachable — offer a retry, never claim the run is gone)
  // vs. the server answered 404 (the run really is not there).
  if (!run) {
    const loadFailed = runFetchError !== null;
    return (
      <div
        className="flex flex-col flex-1 h-0 overflow-hidden bg-surface-inset font-[inherit] text-text-primary rounded-lg border border-border"
        data-testid={loadFailed ? 'pipeline-replay-error' : 'pipeline-replay-missing'}
      >
        <div className="h-11 shrink-0 flex items-center gap-2.5 px-3 border-b border-border bg-surface relative z-[5]">
          <IconButton
            onClick={() => navigate(`/pipelines/${pipelineId}`)}
            aria-label="Back to pipeline"
            title="Back to pipeline"
          >
            ←
          </IconButton>
          <div className="text-[13px] font-semibold text-text-primary">
            {definition?.name ?? 'Pipeline'}
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center gap-3.5 p-8 text-center">
          {loadFailed ? (
            <>
              <div className="text-sm text-text-secondary" data-testid="replay-load-error">
                Couldn&apos;t load this run — the pipeline API is unreachable.
                The run has not necessarily been deleted.
              </div>
              <div className="text-xs text-danger-fg font-mono" data-testid="replay-load-error-detail">
                {runFetchError}
              </div>
              <div className="flex gap-2">
                <Button onClick={retryRunFetch} data-testid="replay-retry">
                  Retry
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => navigate(`/pipelines/${pipelineId}`)}
                >
                  Back to pipeline
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="text-sm text-text-secondary">
                Run not available — it may have been trimmed from history.
              </div>
              <Button
                onClick={() => navigate(`/pipelines/${pipelineId}`)}
              >
                Back to pipeline
              </Button>
            </>
          )}
        </div>
      </div>
    );
  }

  const statusChip = statusChipVariant(run.status);
  const triggeredByLabel = run.triggeredBy.userId ?? run.triggeredBy.triggerType;
  const costLabel = formatUsd(runCost);

  return (
    <div
      className="flex flex-col flex-1 h-0 overflow-hidden bg-surface-inset font-[inherit] text-text-primary rounded-lg border border-border"
      data-testid="pipeline-replay"
    >
      {/* ── Top bar ───────────────────────────────────────────────── */}
      <div className="h-11 shrink-0 flex items-center gap-2.5 px-3 border-b border-border bg-surface relative z-[5]">
        <IconButton
          onClick={() => navigate(`/pipelines/${pipelineId}`)}
          aria-label="Back to pipeline"
          title="Back to pipeline"
        >
          ←
        </IconButton>

        <div
          className="text-[13px] font-bold text-text-primary max-w-[220px] overflow-hidden text-ellipsis whitespace-nowrap"
          title={definition?.name ?? pipelineId}
        >
          {definition?.name ?? pipelineId}
        </div>

        <span className="text-text-tertiary text-xs">·</span>

        <div
          className="text-xs text-text-secondary overflow-hidden text-ellipsis whitespace-nowrap"
          data-testid="replay-subtitle"
        >
          Run from {formatDate(run.startedAt)} by {triggeredByLabel}
        </div>

        <span
          className="text-text-tertiary text-xs"
          data-testid="replay-cost"
        >
          · {costLabel}
        </span>

        <Chip tone={statusChip.tone} aria-label={`Status: ${statusChip.label}`}>
          {statusChip.label}
        </Chip>

        {run.status === 'failed' && run.error?.errorCategory ? (
          <Chip
            tone={errorCategoryTone(run.error.errorCategory)}
            title={run.error.message || 'Error details unavailable'}
          >
            {run.error.errorCategory}
          </Chip>
        ) : null}

        <div className="flex-1" />

        {/* Hub#1288: Retry-from-failed-step. Only shown for failed runs that
            have a known failing nodeId — and never for a refused run. */}
        {refusal && (
          <Chip tone="neutral" title={refusalNotRetryableReason(refusal)} data-testid="refused-not-retryable">
            Not retryable
          </Chip>
        )}
        {failedNodeId && !refusal && (
          <Button
            onClick={() => openRetryModal(failedNodeId)}
            disabled={retryInFlight}
            data-testid="retry-from-failed-step-button"
            title={`Retry from "${failedNodeId}" with the original upstream context`}
          >
            ↻ Retry from failure
          </Button>
        )}

        <Button
          onClick={handleReRun}
          data-testid="rerun-button"
          title="Re-run with the original trigger payload"
        >
          ↻ Re-run
        </Button>

        <div className="relative" ref={menuRef}>
          <IconButton
            onClick={() => setMenuOpen((x) => !x)}
            aria-label="More actions"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            data-testid="replay-overflow-btn"
          >
            ⋯
          </IconButton>
          {menuOpen ? (
            <div className="absolute top-full right-0 mt-1.5 bg-surface border border-border rounded-lg shadow-[0_12px_28px_rgba(15,23,42,0.14)] min-w-[200px] z-20 overflow-hidden" role="menu" aria-label="More actions">
              <button className="block w-full text-left py-2 px-3.5 text-[13px] border-none bg-transparent cursor-pointer font-[inherit] text-text-primary" role="menuitem" onClick={handleCopyRunId}>
                Copy runId
              </button>
              <button className="block w-full text-left py-2 px-3.5 text-[13px] border-none bg-transparent cursor-pointer font-[inherit] text-text-primary" role="menuitem" onClick={handleExportRun}>
                Export run JSON
              </button>
              <button className="block w-full text-left py-2 px-3.5 text-[13px] border-none bg-transparent cursor-pointer font-[inherit] text-text-primary" role="menuitem" onClick={handleOpenAsNewDraft}>
                Open as new draft
              </button>
            </div>
          ) : null}
        </div>
      </div>

      {/* ── Retry-from-step confirmation modal (hub#1288) ───────────── */}
      <ConfirmDialog
        open={retryModal !== null}
        onConfirm={confirmRetry}
        onCancel={() => { if (!retryInFlight) setRetryModal(null); }}
        title="Retry from step"
        confirmLabel={retryInFlight ? 'Starting…' : 'Confirm retry'}
        confirmDisabled={retryInFlight}
      >
        {retryModal && (
          <div className="flex flex-col gap-2.5">
            <div className="text-[13px] text-text-secondary">
              A new run will start from{' '}
              <code className="bg-surface-inset px-1 rounded text-xs">
                {retryModal.nodeId.slice(0, 12)}{retryModal.nodeId.length > 12 ? '…' : ''}
              </code>
              {' '}using the original upstream context.
            </div>
            {retryModal.skippedNodes.length > 0 && (
              <div>
                <div className="text-[11px] font-semibold text-text-tertiary uppercase mb-1.5">
                  Steps that will be skipped ({retryModal.skippedNodes.length})
                </div>
                <div className="max-h-20 overflow-y-auto flex flex-wrap gap-1">
                  {retryModal.skippedNodes.map((id) => (
                    <span key={id} className="bg-surface-inset border border-border rounded px-1.5 py-px text-[11px] font-mono text-text-secondary">
                      {id.slice(0, 10)}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <label className="flex items-center gap-2 text-[13px] text-text-secondary cursor-pointer">
              <Checkbox
                checked={retryModal.snapshotInput}
                onChange={(snapshotInput) =>
                  setRetryModal((m) => (m ? { ...m, snapshotInput } : m))
                }
              />
              Use persisted input snapshot
            </label>
            {retryError && (
              <div role="alert" data-testid="retry-modal-error" className="py-2 px-3 bg-danger-bg border border-danger-border rounded-md text-xs text-danger-fg">
                {retryError}
              </div>
            )}
          </div>
        )}
      </ConfirmDialog>
      {/* ── Threaded step detail — fills workspace ─────────────────── */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 overflow-auto py-5 px-7 bg-surface">
          {/* Run summary header */}
          <div className="flex items-center gap-3 mb-5">
            <h3 className="m-0 text-[15px] font-bold text-text-primary">
              Steps ({Object.keys(run.steps).length})
            </h3>
            <span className="text-xs text-text-tertiary">
              {run.startedAt ? new Date(run.startedAt).toLocaleTimeString() : ''} — {run.completedAt ? new Date(run.completedAt).toLocaleTimeString() : 'in progress'}
            </span>
            {run.durationMs != null && (
              <span className="text-xs text-text-secondary ml-auto">
                Total: {run.durationMs < 1000 ? `${run.durationMs}ms` : `${(run.durationMs / 1000).toFixed(1)}s`}
              </span>
            )}
          </div>

          {retryError && (
            <Banner title="Retry failed:" className="mb-4">
              {retryError}
            </Banner>
          )}

          {resumeError && (
            <Banner title="Resume failed:" className="mb-4" data-testid="resume-error-banner">
              {resumeError}
            </Banner>
          )}

          {reRunError && (
            <Banner title="Re-run failed:" className="mb-4" data-testid="rerun-error-banner">
              {reRunError}
            </Banner>
          )}

          {/* hub#2223: replay history strip — surfaces when the run has
              been resumed at least once. */}
          {(run.replayAttempts ?? 0) > 0 && (
            <Banner
              title="Resumed from a previous failure"
              className="mb-4"
              data-testid="resume-history-banner"
            >
              <div className="flex flex-col gap-1.5">
                <div>
                  {run.error?.nodeId && run.error.nodeId !== 'unknown' && (
                    <>Originally failed at <code>{run.error.nodeId.slice(0, 12)}</code> — </>
                  )}
                  Resumed {run.replayAttempts} time{run.replayAttempts === 1 ? '' : 's'}.
                  {run.resumeHistory && run.resumeHistory.length > 0 && (
                    <>
                      {' '}Most recent: from{' '}
                      <code>{run.resumeHistory[run.resumeHistory.length - 1].fromNodeId.slice(0, 12)}</code>
                      {' '}at {formatDate(run.resumeHistory[run.resumeHistory.length - 1].at)}.
                    </>
                  )}
                </div>
                {run.resumeHistory && run.resumeHistory.length > 1 && (
                  <ol
                    className="m-0 pl-[18px] text-[11px] text-text-tertiary leading-relaxed"
                    data-testid="resume-history-timeline"
                  >
                    {run.resumeHistory.map((h, i) => (
                      <li key={`${h.fromNodeId}-${h.at}-${i}`}>
                        from <code>{h.fromNodeId.slice(0, 12)}</code> at {formatDate(h.at)}
                      </li>
                    ))}
                  </ol>
                )}
              </div>
            </Banner>
          )}

          {resumeToast && (
            <Banner title="Resumed" className="mb-4" data-testid="resume-toast">
              {resumeToast}
            </Banner>
          )}

          {run.error && (
            <Banner
              title={refusal ? `Refused (${refusal.code}):` : 'Run failed:'}
              layout={refusal ? 'stacked' : 'inline'}
              className="mb-4"
              data-testid={refusal ? 'refused-banner' : 'run-failed-banner'}
            >
              {run.error.message}
              {run.error.nodeId && run.error.nodeId !== 'unknown' && (
                <span className="ml-2 text-[11px] text-danger-fg">
                  at node {run.error.nodeId.slice(0, 8)}
                </span>
              )}
              {refusal && (
                <span className="mt-2 block text-xs text-text-secondary" data-testid="refused-reason">
                  {refusalNotRetryableReason(refusal)}
                </span>
              )}
              {run.status === 'failed' && !refusal && run.error.nodeId && run.error.nodeId !== 'unknown' && (
                <div className="mt-2">
                  <Button
                    onClick={() => handleResumeFromHere(run.error!.nodeId)}
                    disabled={resumeInFlight !== null}
                    data-testid="resume-from-here-button"
                    title={`Resume this run from "${run.error.nodeId}" using its accumulated upstream context`}
                  >
                    {resumeInFlight === run.error.nodeId ? 'Resuming…' : '↻ Resume from here'}
                  </Button>
                </div>
              )}
            </Banner>
          )}

          {/* hub#2225: Tab bar — Steps timeline vs Executor Log audit trail. */}
          <div
            role="tablist"
            aria-label="Run detail view"
            onKeyDown={handleRovingKeyDown}
            className="flex gap-1 mb-3 border-b border-border"
            data-testid="run-replay-tabs"
          >
            {([
              { id: 'steps' as const, label: 'Steps' },
              { id: 'log' as const, label: 'Executor Log' },
            ]).map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={active}
                  // Roving tabindex + arrow keys on the tablist: the role
                  // promises arrow navigation and one Tab stop.
                  tabIndex={active ? 0 : -1}
                  onClick={() => setActiveTab(tab.id)}
                  data-testid={`run-replay-tab-${tab.id}`}
                  className={cn(
                    'font-[inherit] text-[13px] font-semibold py-1.5 px-3.5 border-none bg-transparent cursor-pointer -mb-px',
                    active
                      ? 'text-text-primary border-b-2 border-b-primary'
                      : 'text-text-tertiary border-b-2 border-b-transparent',
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {activeTab === 'steps' ? (
            /* Threaded step list with fork nesting */
            <StepTree
              steps={run.steps}
              nodeDataMap={nodeDataMap}
              edges={definition?.edges}
              onRetryFromStep={refusal ? undefined : openRetryModal}
              onResumeFromStep={run.status === 'failed' && !refusal ? handleResumeFromHere : undefined}
            />
          ) : (
            <div className="flex flex-col min-h-[400px] h-[60vh]">
              <ExecutorLog
                pipelineId={pipelineId}
                runId={runId}
                onStepClick={handleExecutorLogStepClick}
              />
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

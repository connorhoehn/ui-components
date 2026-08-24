// frontend/src/components/pipelines/context/PipelineRunsContext.tsx
//
// Per-pipeline active + recent runs. Subscribes to `EventStreamContext`
// via the wildcard channel and folds every event into a `runs` map.
// Events arrive from the gateway WS bridge — the only source. Folding
// logic is source-agnostic. See PIPELINES_PLAN.md §13.1 / §14.4.

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type {
  ApprovalRecord,
  PipelineEventMap,
  PipelineRun,
  StepExecution,
} from '../../../types/pipeline';
import {
  useEventStream,
  type WildcardEvent,
} from './EventStreamContext';
import { retryFromNode } from '../../../api/pipelineRetry';
import { appendRun, listRuns } from '../persistence/runHistory';
import { listPipelineRuns } from '../../../api/pipelineRuns';
import { PipelineEditorContext } from './PipelineEditorContext';
import { useTriggerRun } from '../hooks/useTriggerRun';
import { usePipelineWsCommands } from './WebSocketEventAdapter';
import { usePipelineNodeRuntime } from './PipelineNodeRuntimeContext';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const MAX_RUNS_PER_PIPELINE = Number(import.meta.env.VITE_MAX_RUNS_PER_PIPELINE) || 20;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface PipelineRunsValue {
  runs: Record<string, PipelineRun>;
  activeRunIds: string[];
  triggerRun: (
    pipelineId: string,
    payload?: Record<string, unknown>,
  ) => Promise<string>;
  /**
   * Trigger a run with debug breakpoints. Passes `breakpoints` as node IDs
   * where execution should pause for inspection before proceeding.
   */
  triggerDebugRun: (
    pipelineId: string,
    breakpoints: string[],
    payload?: Record<string, unknown>,
  ) => Promise<string>;
  cancelRun: (runId: string) => void;
  resolveApproval: (
    runId: string,
    stepId: string,
    decision: 'approve' | 'reject',
    comment?: string,
  ) => void;
  /**
   * Resolve a debug breakpoint, resuming execution from the paused node.
   * @param action  — 'continue' resumes to the next breakpoint;
   *                  'resume_all' ignores all remaining breakpoints
   */
  resolveBreakpoint: (
    runId: string,
    stepId: string,
    action?: 'continue' | 'resume_all',
  ) => void;
  /**
   * hub#2226 — edit-and-continue: apply a paused-context patch via
   * social-api. Resolves the executor's `PatchResult` (`{ patchId, before,
   * after, validation }`); on a 422 the resolved value's
   * `validation.ok === false` and the caller can show the rejection reason.
   * Throws on non-2xx/422 transport / 404 / 409 errors.
   */
  applyContextPatch: (
    runId: string,
    stepId: string,
    patch: { mode: 'merge'; values: Record<string, unknown> },
    appliedBy?: string,
  ) => Promise<{
    patchId: string;
    before: Record<string, unknown>;
    after: Record<string, unknown>;
    validation: { ok: true } | { ok: false; reason: string };
  }>;
  /**
   * hub#2226 — revert a paused-context patch by id. Throws if the run has
   * already resumed past `pausedAtNodeId` (server returns 409).
   */
  revertContextPatch: (
    runId: string,
    stepId: string,
    patchId: string,
  ) => Promise<void>;
  /**
   * Retry the most recent failed run from a specific step (per §18.4.4 / §17.6).
   * Finds the newest run that contained `nodeId` AND ended in `failed` AND had
   * `nodeId` itself fail; calls the backend retry-from-node API to spawn a new
   * run that resumes traversal at `nodeId` and skips upstream nodes. No-op +
   * console.warn when no eligible run is found.
   */
  retryFromStep: (nodeId: string) => Promise<void>;
  /**
   * Merge a polled PipelineRun into the in-memory runs map. Used by the
   * poll-based live status visualizer to inject fresh run data fetched from
   * the API. Safe to call repeatedly — newer step data wins.
   */
  ingestRun: (run: PipelineRun) => void;
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const PipelineRunsContext = createContext<PipelineRunsValue | null>(null);

// ---------------------------------------------------------------------------
// Helpers — immutable updates against the runs map
// ---------------------------------------------------------------------------

function ensureStep(run: PipelineRun, stepId: string): StepExecution {
  return (
    run.steps[stepId] ?? {
      nodeId: stepId,
      status: 'pending',
    }
  );
}

function withStep(
  run: PipelineRun,
  stepId: string,
  patch: Partial<StepExecution> | ((prev: StepExecution) => StepExecution),
): PipelineRun {
  const prev = ensureStep(run, stepId);
  const next =
    typeof patch === 'function'
      ? (patch as (p: StepExecution) => StepExecution)(prev)
      : { ...prev, ...patch };
  return { ...run, steps: { ...run.steps, [stepId]: next } };
}

/** Terminal run states — a run in one of these can never move again. */
function isTerminalRunStatus(status: PipelineRun['status']): boolean {
  return status === 'completed' || status === 'failed' || status === 'cancelled';
}

function trimRuns(runs: Record<string, PipelineRun>): Record<string, PipelineRun> {
  const entries = Object.values(runs);
  if (entries.length <= MAX_RUNS_PER_PIPELINE) return runs;
  // Keep active runs and the newest completed runs. Oldest completed go first.
  const active = entries.filter((r) =>
    r.status === 'running' ||
    r.status === 'pending' ||
    r.status === 'awaiting_approval' ||
    r.status === 'paused_at_breakpoint',
  );
  const finished = entries
    .filter(
      (r) =>
        r.status !== 'running' &&
        r.status !== 'pending' &&
        r.status !== 'awaiting_approval' &&
        r.status !== 'paused_at_breakpoint',
    )
    .sort((a, b) => b.startedAt.localeCompare(a.startedAt));
  const keepFinished = finished.slice(
    0,
    Math.max(0, MAX_RUNS_PER_PIPELINE - active.length),
  );
  const keep = [...active, ...keepFinished];
  const next: Record<string, PipelineRun> = {};
  for (const r of keep) next[r.id] = r;
  return next;
}

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export interface PipelineRunsProviderProps {
  children: React.ReactNode;
}

export function PipelineRunsProvider({ children }: PipelineRunsProviderProps) {
  // The editor provider mounts above us in the tree for /pipelines/:id —
  // but this provider is also usable standalone (e.g. observability views
  // that trigger ad-hoc runs). Read the editor context directly so a
  // missing provider is a null (not a throw).
  const editor = useContext(PipelineEditorContext);

  // WebSocket-sourced triggers (the only path).
  const { triggerRun: triggerViaHttp } = useTriggerRun();
  const wsCommands = usePipelineWsCommands();

  // Seed the in-memory runs map with historical runs for the pipeline in
  // scope so reload doesn't wipe the list view. The seed only runs once on
  // mount to avoid clobbering live state; new runs are folded via events.
  const [runs, setRuns] = useState<Record<string, PipelineRun>>({});
  const [loadingHistory, setLoadingHistory] = useState(false);

  // Track which runs have already been persisted so we don't re-write the
  // same terminal state every time the reducer returns a new reference.
  const persistedRef = useRef<Set<string>>(new Set());

  // Seed from API instead of localStorage. Falls back to localStorage on error.
  const historyFetchedRef = useRef<string | null>(null);
  useEffect(() => {
    const pipelineId = editor?.definition?.id;
    if (!pipelineId || historyFetchedRef.current === pipelineId) return;

    historyFetchedRef.current = pipelineId;
    setLoadingHistory(true);

    // Guard every setState below: this effect had no cleanup at all, so
    // unmounting the provider while history was in flight wrote runs and
    // loading state into a dead tree. Same `cancelled` pattern the rest of
    // this domain uses (usePendingApprovals, usePipelineRunAuditLog).
    let cancelled = false;

    listPipelineRuns(pipelineId, { limit: MAX_RUNS_PER_PIPELINE })
      .then((response) => {
        if (cancelled) return;
        setRuns((prev) => {
          const next = { ...prev };
          for (const run of response.runs) {
            if (!next[run.id]) next[run.id] = run;
          }
          return next;
        });
      })
      .catch((err) => {
        if (cancelled) return;
        console.error('[PipelineRuns] Failed to load history from API', err);
        setRuns((prev) => {
          const next = { ...prev };
          for (const r of listRuns(pipelineId)) {
            if (!next[r.id]) next[r.id] = r;
          }
          return next;
        });
      })
      .finally(() => {
        if (!cancelled) setLoadingHistory(false);
      });

    return () => { cancelled = true; };
  }, [editor?.definition?.id]);

  // Fold every event into the runs state. Using the wildcard channel keeps
  // this a single subscription rather than 15 typed ones.
  useEventStream('*', (env) => {
    const { eventType, payload } = env as WildcardEvent;
    setRuns((prev) => reduceEvent(prev, eventType, payload));
  });

  // Persist terminal runs to localStorage so history survives reload.
  useEffect(() => {
    for (const run of Object.values(runs)) {
      const isTerminal =
        run.status === 'completed' ||
        run.status === 'failed' ||
        run.status === 'cancelled';
      if (!isTerminal) continue;
      if (persistedRef.current.has(run.id)) continue;
      persistedRef.current.add(run.id);
      try {
        appendRun(run.pipelineId, run);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn('[PipelineRuns] appendRun failed', err);
      }
    }
  }, [runs]);

  const triggerRun = useCallback(
    async (
      pipelineId: string,
      payload?: Record<string, unknown>,
    ): Promise<string> => {
      // Trigger via REST so social-api's PipelineModule runs the pipeline AND
      // registerTrigger pre-populates the runs cache for DDB persistence.
      const runId = await triggerViaHttp(pipelineId, payload);
      if (!runId) {
        throw new Error('Trigger failed (REST POST did not return a runId)');
      }
      return runId;
    },
    [triggerViaHttp],
  );

  const cancelRun = useCallback(
    (runId: string): void => {
      wsCommands.cancelRun(runId);
    },
    [wsCommands],
  );

  const resolveApproval = useCallback(
    (
      runId: string,
      stepId: string,
      decision: 'approve' | 'reject',
      comment?: string,
    ): void => {
      wsCommands.resolveApproval(runId, stepId, decision, { comment });
    },
    [wsCommands],
  );

  // Snapshot the latest runs map for `retryFromStep` so the callback isn't
  // re-created on every fold-induced state change. The runs map is updated
  // by the wildcard subscription above; reading the ref keeps the public
  // callback identity stable across renders.
  const runsRef = useRef<Record<string, PipelineRun>>(runs);
  useEffect(() => {
    runsRef.current = runs;
  }, [runs]);

  const retryFromStep = useCallback(
    async (nodeId: string): Promise<void> => {
      // Find the most recent run that:
      //   - actually executed `nodeId` (steps[nodeId] exists)
      //   - has step status 'failed' (the node itself failed)
      //   - has run status 'failed' (so we don't double-retry a healthy run)
      // Newest startedAt wins.
      const candidates = Object.values(runsRef.current)
        .filter((r) => r.status === 'failed')
        .filter((r) => r.steps[nodeId]?.status === 'failed')
        .sort((a, b) => b.startedAt.localeCompare(a.startedAt));
      const lastFailed = candidates[0];
      if (!lastFailed) {
        // eslint-disable-next-line no-console
        console.warn(
          '[PipelineRuns] retryFromStep — no failed run found for node',
          nodeId,
        );
        return;
      }

      try {
        await retryFromNode(lastFailed.pipelineId, lastFailed.id, nodeId);
        // New run will appear via WebSocket events
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('[PipelineRuns] retryFromNode API failed', err);
      }
    },
    [],
  );

  const triggerDebugRun = useCallback(
    async (
      pipelineId: string,
      breakpoints: string[],
      payload?: Record<string, unknown>,
    ): Promise<string> => {
      // Inject breakpoints into the payload so useTriggerRun extracts them
      // and passes them in the request body.
      const merged = { ...(payload ?? {}), __breakpoints: breakpoints };
      return triggerRun(pipelineId, merged);
    },
    [triggerRun],
  );

  const resolveBreakpoint = useCallback(
    (runId: string, stepId: string, action: 'continue' | 'resume_all' = 'continue'): void => {
      const baseUrl = (import.meta.env as Record<string, string>).VITE_SOCIAL_API_URL ?? '';
      // Find the pipelineId from the run record if available.
      const run = runsRef.current[runId];
      const pipelineId = run?.pipelineId ?? 'unknown';
      void fetch(
        `${baseUrl}/api/pipelines/${encodeURIComponent(pipelineId)}/runs/${encodeURIComponent(runId)}/breakpoint/${encodeURIComponent(stepId)}/resolve`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action }),
        },
      ).catch((err) => {
        // eslint-disable-next-line no-console
        console.error('[PipelineRuns] resolveBreakpoint API failed', err);
      });
    },
    [],
  );

  // hub#2226 edit-and-continue. The server returns the executor's
  // `PatchResult`; for a 422 (validator rejected) we surface the body so the
  // caller can render the reason and keep the editor open. Anything else
  // throws.
  const applyContextPatch = useCallback(
    async (
      runId: string,
      stepId: string,
      patch: { mode: 'merge'; values: Record<string, unknown> },
      appliedBy?: string,
    ) => {
      const baseUrl = (import.meta.env as Record<string, string>).VITE_SOCIAL_API_URL ?? '';
      const run = runsRef.current[runId];
      const pipelineId = run?.pipelineId ?? 'unknown';
      const url = `${baseUrl}/api/pipelines/${encodeURIComponent(pipelineId)}/runs/${encodeURIComponent(runId)}/breakpoint/${encodeURIComponent(stepId)}/patch`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patch, ...(appliedBy ? { appliedBy } : {}) }),
      });
      // 422 carries the executor's PatchResult under `result` (validator
      // rejected). 200 carries the PatchResult directly. Anything else throws.
      if (res.status === 200) {
        return (await res.json()) as Awaited<ReturnType<PipelineRunsValue['applyContextPatch']>>;
      }
      if (res.status === 422) {
        const body = (await res.json().catch(() => ({}))) as {
          error?: string;
          result?: Awaited<ReturnType<PipelineRunsValue['applyContextPatch']>>;
        };
        if (body.result) return body.result;
        return {
          patchId: '',
          before: {},
          after: {},
          validation: { ok: false, reason: body.error ?? 'patch rejected' },
        };
      }
      const text = await res.text().catch(() => '');
      throw new Error(`applyContextPatch HTTP ${res.status}: ${text}`);
    },
    [],
  );

  const revertContextPatchFn = useCallback(
    async (runId: string, stepId: string, patchId: string): Promise<void> => {
      const baseUrl = (import.meta.env as Record<string, string>).VITE_SOCIAL_API_URL ?? '';
      const run = runsRef.current[runId];
      const pipelineId = run?.pipelineId ?? 'unknown';
      const url = `${baseUrl}/api/pipelines/${encodeURIComponent(pipelineId)}/runs/${encodeURIComponent(runId)}/breakpoint/${encodeURIComponent(stepId)}/patch/${encodeURIComponent(patchId)}`;
      const res = await fetch(url, { method: 'DELETE' });
      if (res.status !== 204) {
        const text = await res.text().catch(() => '');
        throw new Error(`revertContextPatch HTTP ${res.status}: ${text}`);
      }
    },
    [],
  );

  const ingestRun = useCallback((run: PipelineRun): void => {
    setRuns((prev) => {
      const existing = prev[run.id];
      // If the polled run is identical or older than what we already have
      // (e.g. events already moved it to a terminal state), skip the update
      // to avoid unnecessary re-renders.
      if (existing) {
        // A poll that was already in flight when the terminal event landed
        // carries pre-terminal data. Only the equal-status branch used to be
        // guarded, so such a response was applied wholesale and rewound the
        // run from `completed` back to `running`: the live visualiser spun
        // forever on a finished run and it reappeared in `activeRunIds`.
        // Terminal is final — nothing polled can un-finish a run.
        if (isTerminalRunStatus(existing.status) && !isTerminalRunStatus(run.status)) {
          return prev;
        }
        if (existing.status === run.status) {
          // Quick structural compare on steps count + current frontier
          const prevStepCount = Object.keys(existing.steps).length;
          const nextStepCount = Object.keys(run.steps).length;
          if (prevStepCount >= nextStepCount) return prev;
        }
      }
      return { ...prev, [run.id]: run };
    });
  }, []);

  const activeRunIds = useMemo(
    () =>
      Object.values(runs)
        .filter(
          (r) =>
            r.status === 'running' ||
            r.status === 'pending' ||
            r.status === 'awaiting_approval' ||
            r.status === 'paused_at_breakpoint',
        )
        .map((r) => r.id),
    [runs],
  );

  const value = useMemo<PipelineRunsValue>(
    () => ({
      runs,
      activeRunIds,
      triggerRun,
      triggerDebugRun,
      cancelRun,
      resolveApproval,
      resolveBreakpoint,
      applyContextPatch,
      revertContextPatch: revertContextPatchFn,
      retryFromStep,
      ingestRun,
    }),
    [
      runs,
      activeRunIds,
      triggerRun,
      triggerDebugRun,
      cancelRun,
      resolveApproval,
      resolveBreakpoint,
      applyContextPatch,
      revertContextPatchFn,
      retryFromStep,
      ingestRun,
    ],
  );

  return (
    <PipelineRunsContext.Provider value={value}>
      {children}
    </PipelineRunsContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Event reducer — pure, so it can be unit-tested in isolation
// ---------------------------------------------------------------------------

function reduceEvent(
  state: Record<string, PipelineRun>,
  type: string,
  payload: unknown,
): Record<string, PipelineRun> {
  if (!payload || typeof payload !== 'object') return state;
  const p = payload as { runId?: string } & Record<string, unknown>;
  const runId = p.runId;
  if (typeof runId !== 'string') return state;

  switch (type) {
    case 'pipeline.run.started': {
      const ev = payload as PipelineEventMap['pipeline.run.started'];
      const run: PipelineRun = {
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
      return trimRuns({ ...state, [ev.runId]: run });
    }
    case 'pipeline.run.completed': {
      const ev = payload as PipelineEventMap['pipeline.run.completed'];
      const run = state[ev.runId];
      if (!run) return state;
      return {
        ...state,
        [ev.runId]: {
          ...run,
          status: 'completed',
          completedAt: ev.at,
          durationMs: ev.durationMs,
          currentStepIds: [],
        },
      };
    }
    case 'pipeline.run.failed': {
      const ev = payload as PipelineEventMap['pipeline.run.failed'];
      const run = state[ev.runId];
      if (!run) return state;
      return {
        ...state,
        [ev.runId]: {
          ...run,
          status: 'failed',
          completedAt: ev.at,
          error: ev.error,
          currentStepIds: [],
        },
      };
    }
    case 'pipeline.run.cancelled': {
      const ev = payload as PipelineEventMap['pipeline.run.cancelled'];
      const run = state[ev.runId];
      if (!run) return state;
      return {
        ...state,
        [ev.runId]: {
          ...run,
          status: 'cancelled',
          completedAt: ev.at,
          currentStepIds: [],
        },
      };
    }
    case 'pipeline.step.started': {
      const ev = payload as PipelineEventMap['pipeline.step.started'];
      const run = state[ev.runId];
      if (!run) return state;
      const next = withStep(run, ev.stepId, (prev) => ({
        ...prev,
        nodeId: ev.stepId,
        status: 'running',
        startedAt: ev.at,
      }));
      return {
        ...state,
        [ev.runId]: {
          ...next,
          currentStepIds: Array.from(
            new Set([...next.currentStepIds, ev.stepId]),
          ),
        },
      };
    }
    case 'pipeline.step.completed': {
      const ev = payload as PipelineEventMap['pipeline.step.completed'];
      const run = state[ev.runId];
      if (!run) return state;
      const next = withStep(run, ev.stepId, (prev) => ({
        ...prev,
        status: 'completed',
        completedAt: ev.at,
        durationMs: ev.durationMs,
        output: ev.output,
      }));
      return {
        ...state,
        [ev.runId]: {
          ...next,
          currentStepIds: next.currentStepIds.filter((id) => id !== ev.stepId),
        },
      };
    }
    case 'pipeline.step.failed': {
      const ev = payload as PipelineEventMap['pipeline.step.failed'];
      const run = state[ev.runId];
      if (!run) return state;
      const next = withStep(run, ev.stepId, (prev) => ({
        ...prev,
        status: 'failed',
        completedAt: ev.at,
        error: ev.error,
      }));
      return {
        ...state,
        [ev.runId]: {
          ...next,
          currentStepIds: next.currentStepIds.filter((id) => id !== ev.stepId),
        },
      };
    }
    case 'pipeline.step.skipped': {
      const ev = payload as PipelineEventMap['pipeline.step.skipped'];
      const run = state[ev.runId];
      if (!run) return state;
      const next = withStep(run, ev.stepId, (prev) => ({
        ...prev,
        status: 'skipped',
        completedAt: ev.at,
        error: prev.error,
      }));
      return {
        ...state,
        [ev.runId]: {
          ...next,
          currentStepIds: next.currentStepIds.filter((id) => id !== ev.stepId),
        },
      };
    }
    case 'pipeline.step.cancelled': {
      const ev = payload as PipelineEventMap['pipeline.step.cancelled'];
      const run = state[ev.runId];
      if (!run) return state;
      const next = withStep(run, ev.stepId, (prev) => ({
        ...prev,
        // `StepStatus` has no 'cancelled' — track as failed with marker.
        status: 'failed',
        completedAt: ev.at,
        error: prev.error ?? 'cancelled',
      }));
      return {
        ...state,
        [ev.runId]: {
          ...next,
          currentStepIds: next.currentStepIds.filter((id) => id !== ev.stepId),
        },
      };
    }
    case 'pipeline.llm.prompt': {
      const ev = payload as PipelineEventMap['pipeline.llm.prompt'];
      const run = state[ev.runId];
      if (!run) return state;
      return {
        ...state,
        [ev.runId]: withStep(run, ev.stepId, (prev) => ({
          ...prev,
          llm: {
            prompt: ev.prompt,
            response: prev.llm?.response ?? '',
            tokensIn: prev.llm?.tokensIn ?? 0,
            tokensOut: prev.llm?.tokensOut ?? 0,
            ...(prev.llm?.streamOpened !== undefined
              ? { streamOpened: prev.llm.streamOpened }
              : {}),
            ...(prev.llm?.firstTokenLatencyMs !== undefined
              ? { firstTokenLatencyMs: prev.llm.firstTokenLatencyMs }
              : {}),
          },
        })),
      };
    }
    case 'pipeline.llm.stream.opened': {
      const ev = payload as PipelineEventMap['pipeline.llm.stream.opened'];
      const run = state[ev.runId];
      if (!run) return state;
      return {
        ...state,
        [ev.runId]: withStep(run, ev.stepId, (prev) => {
          const openedAtMs = Date.parse(ev.openedAt);
          // Internal sentinel for computing firstTokenLatencyMs on first token.
          const next = {
            ...prev,
            llm: {
              prompt: prev.llm?.prompt ?? '',
              response: prev.llm?.response ?? '',
              tokensIn: prev.llm?.tokensIn ?? 0,
              tokensOut: prev.llm?.tokensOut ?? 0,
              streamOpened: true,
              ...(prev.llm?.firstTokenLatencyMs !== undefined
                ? { firstTokenLatencyMs: prev.llm.firstTokenLatencyMs }
                : {}),
            },
          };
          (next.llm as unknown as { _streamOpenedAtMs: number })._streamOpenedAtMs =
            Number.isFinite(openedAtMs) ? openedAtMs : Date.now();
          return next;
        }),
      };
    }
    case 'pipeline.llm.token': {
      const ev = payload as PipelineEventMap['pipeline.llm.token'];
      const run = state[ev.runId];
      if (!run) return state;
      return {
        ...state,
        [ev.runId]: withStep(run, ev.stepId, (prev) => {
          const prevTokensOut = prev.llm?.tokensOut ?? 0;
          const isFirstToken = prevTokensOut === 0;
          const openedAtMs = (
            prev.llm as unknown as { _streamOpenedAtMs?: number } | undefined
          )?._streamOpenedAtMs;
          const tokenAtMs = Date.parse(ev.at);
          const computedLatency =
            isFirstToken && typeof openedAtMs === 'number' && Number.isFinite(tokenAtMs)
              ? Math.max(0, tokenAtMs - openedAtMs)
              : prev.llm?.firstTokenLatencyMs;
          return {
            ...prev,
            llm: {
              prompt: prev.llm?.prompt ?? '',
              response: (prev.llm?.response ?? '') + ev.token,
              tokensIn: prev.llm?.tokensIn ?? 0,
              tokensOut: prevTokensOut + 1,
              streamOpened: false,
              ...(computedLatency !== undefined
                ? { firstTokenLatencyMs: computedLatency }
                : {}),
            },
          };
        }),
      };
    }
    case 'pipeline.llm.response': {
      const ev = payload as PipelineEventMap['pipeline.llm.response'];
      const run = state[ev.runId];
      if (!run) return state;
      return {
        ...state,
        [ev.runId]: withStep(run, ev.stepId, (prev) => ({
          ...prev,
          llm: {
            prompt: prev.llm?.prompt ?? '',
            response: ev.response,
            tokensIn: ev.tokensIn,
            tokensOut: ev.tokensOut,
          },
        })),
      };
    }
    case 'pipeline.step.breakpoint': {
      const ev = payload as PipelineEventMap['pipeline.step.breakpoint'];
      const run = state[ev.runId];
      if (!run) return state;
      const next = withStep(run, ev.stepId, (prev) => ({
        ...prev,
        status: 'awaiting',
      }));
      return {
        ...state,
        [ev.runId]: { ...next, status: 'paused_at_breakpoint' },
      };
    }
    // hub#2226: edit-and-continue. The patched / patched-unvalidated events
    // append a new entry to `step.patches`; the patch-reverted event marks
    // the matching entry's `revertedAt`. We deliberately don't mirror
    // executor context state into `run.context` here — the run will receive
    // a fresh `pipeline.run.checkpoint` when execution resumes past the
    // pausedAtNodeId, and ContextInspector subscribes to checkpoints
    // directly.
    case 'pipeline.step.context.patched':
    case 'pipeline.step.context.patched-unvalidated': {
      const ev = payload as PipelineEventMap['pipeline.step.context.patched'];
      const run = state[ev.runId];
      if (!run) return state;
      const unvalidated = type === 'pipeline.step.context.patched-unvalidated';
      const entry = {
        patchId: ev.patchId,
        appliedAt: ev.at,
        mode: ev.mode,
        ...(unvalidated ? { unvalidated: true } : {}),
      };
      return {
        ...state,
        [ev.runId]: withStep(run, ev.stepId, (prev) => ({
          ...prev,
          patches: [...(prev.patches ?? []), entry],
        })),
      };
    }
    case 'pipeline.step.context.patch-reverted': {
      const ev = payload as PipelineEventMap['pipeline.step.context.patch-reverted'];
      const run = state[ev.runId];
      if (!run) return state;
      return {
        ...state,
        [ev.runId]: withStep(run, ev.stepId, (prev) => ({
          ...prev,
          patches: (prev.patches ?? []).map((p) =>
            p.patchId === ev.patchId ? { ...p, revertedAt: ev.at } : p,
          ),
        })),
      };
    }
    case 'pipeline.approval.requested': {
      const ev = payload as PipelineEventMap['pipeline.approval.requested'];
      const run = state[ev.runId];
      if (!run) return state;
      const withStepUpdate = withStep(run, ev.stepId, (prev) => ({
        ...prev,
        status: 'awaiting',
        approvals: prev.approvals ?? [],
      }));
      return {
        ...state,
        [ev.runId]: { ...withStepUpdate, status: 'awaiting_approval' },
      };
    }
    case 'pipeline.run.resumed-from-step': {
      // hub#2223: a previously-failed run was restarted from `fromNodeId`.
      // Bump replayAttempts and append to the resume history so the run
      // detail page can render the live banner without manual refresh. The
      // executor will follow up with `pipeline.run.started` (or step events
      // if it skips re-emitting started) once dispatch enters fromNodeId,
      // which puts status back to `running` via the existing reducer.
      const ev = payload as PipelineEventMap['pipeline.run.resumed-from-step'];
      const run = state[ev.runId];
      if (!run) return state;
      const entry = {
        fromNodeId: ev.fromNodeId,
        ...(ev.originalFailedStepId
          ? { originalFailedStepId: ev.originalFailedStepId }
          : {}),
        at: ev.at,
      };
      return {
        ...state,
        [ev.runId]: {
          ...run,
          status: 'running',
          replayAttempts: (run.replayAttempts ?? 0) + 1,
          resumeHistory: [...(run.resumeHistory ?? []), entry],
        },
      };
    }
    case 'pipeline.approval.recorded': {
      const ev = payload as PipelineEventMap['pipeline.approval.recorded'];
      const run = state[ev.runId];
      if (!run) return state;
      const record: ApprovalRecord = {
        userId: ev.userId,
        decision: ev.decision,
        at: ev.at,
      };
      return {
        ...state,
        [ev.runId]: withStep(run, ev.stepId, (prev) => ({
          ...prev,
          approvals: [...(prev.approvals ?? []), record],
        })),
      };
    }
    default:
      return state;
  }
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function usePipelineRuns(): PipelineRunsValue {
  const ctx = useContext(PipelineRunsContext);
  if (!ctx) {
    throw new Error(
      'usePipelineRuns must be used within a PipelineRunsProvider',
    );
  }
  return ctx;
}

/**
 * Ergonomic shortcut: returns just the `retryFromStep` callback so per-node
 * components don't have to destructure the whole runs value. See §17.6.
 *
 * Graceful when no `PipelineRunsProvider` is in scope — returns a no-op so
 * standalone visual renders (storybook, isolated unit tests) don't throw just
 * for asking for the retry handler.
 *
 * Host seam: when a `PipelineNodeRuntimeProvider` is mounted AND its value
 * supplies `retryFromStep`, that handler wins over the bundled one (wrapped
 * so callers always get a Promise back). A mounted seam WITHOUT a
 * `retryFromStep` falls through to the bundled handler / no-op as before.
 */
export function useRetryFromStep(): (nodeId: string) => Promise<void> {
  const host = usePipelineNodeRuntime();
  const ctx = useContext(PipelineRunsContext);
  const hostRetry = host?.retryFromStep;
  const bundledRetry = ctx?.retryFromStep;
  return useMemo(() => {
    if (hostRetry) {
      return async (nodeId: string) => {
        await hostRetry(nodeId);
      };
    }
    return bundledRetry ?? (async () => {});
  }, [hostRetry, bundledRetry]);
}

/**
 * Lookup the most recent run that contains a step matching `nodeId`, and
 * return that step. Used by per-node visuals (LLMNode etc.) to surface live
 * runtime state on the canvas without each node having to fold over all
 * runs itself.
 *
 * "Most recent" is defined as max(run.startedAt). Active runs are NOT
 * preferred over completed — the visual is the *latest observed* state of
 * this node, regardless of whether the run is still running. The streaming
 * indicators rely on freshness anyway: streamOpened is cleared on the
 * first token and never re-set, so a stale streamOpened from a completed
 * run would imply the run never received its first token (which is
 * accurate state to render).
 *
 * Returns null when no run has executed this node yet (the common case
 * for nodes that haven't run, or for the editor view when no run has been
 * triggered).
 *
 * Host seam: when a `PipelineNodeRuntimeProvider` is mounted, its
 * `getLatestStepForNode` is consulted INSTEAD of the bundled runs store —
 * even if a `PipelineRunsProvider` is also in scope. The host lookup is
 * memoized on the function's identity, so hosts must hand us a fresh
 * function whenever their store changes (see PipelineNodeRuntimeContext).
 */
export function useLatestStepForNode(nodeId: string): StepExecution | null {
  const host = usePipelineNodeRuntime();
  const ctx = useContext(PipelineRunsContext);
  const hostGet = host?.getLatestStepForNode;

  // Both memos run unconditionally (rules-of-hooks); selection happens after.
  const hostStep = useMemo(
    () => (hostGet ? hostGet(nodeId) : null),
    [hostGet, nodeId],
  );
  const bundledStep = useMemo(() => {
    if (!ctx) return null;
    let latest: StepExecution | null = null;
    let latestStartedAt = '';
    for (const run of Object.values(ctx.runs)) {
      const step = run.steps[nodeId];
      if (!step) continue;
      if (run.startedAt > latestStartedAt) {
        latest = step;
        latestStartedAt = run.startedAt;
      }
    }
    return latest;
  }, [ctx, nodeId]);

  return hostGet ? hostStep : bundledStep;
}

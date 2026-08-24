// frontend/src/components/pipelines/hooks/usePendingApprovals.ts
//
// Real-time pending-approvals list driven by the pipeline event stream.
// See PIPELINES_PLAN.md §5.8 (Approval node), §14.1 (`pipeline:approvals`
// channel), §18.2 (badge in sub-nav), §18.20 (panel UX).
//
// Sources, in priority order:
//   1. `GET /api/pipelines/approvals` — authoritative source. Fetched once on
//      mount; the WS event stream keeps it fresh thereafter.
//   2. Event stream — `pipeline:approval:requested` adds rows;
//      `pipeline:approval:recorded` removes them when the recorded count
//      meets the request's `requiredCount`.
//
// The hook keeps backward compatibility with existing call sites that read
// the array directly (e.g. `AppLayout` reads `.length` for the sub-nav
// badge). Callers that need loading/error state should use the companion
// `usePendingApprovalsState()` hook.

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useEventStreamContext } from '../context/EventStreamContext';
import { usePipelineRuns } from '../context/PipelineRunsContext';
import { loadPipeline } from '../persistence/pipelineStorage';
import type {
  ApprovalNodeData,
  Approver,
  PipelineEventMap,
} from '../../../types/pipeline';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface PendingApproval {
  runId: string;
  pipelineId: string;
  stepId: string;
  approvers: Approver[];
  /** ISO timestamp when the approval was first requested. */
  requestedAt: string;
  /** Optional approver-facing message captured on the node config. */
  message?: string;
  /** n-of-m threshold from the node config. Defaults to 1. */
  requiredCount?: number;
  /** How many `pipeline:approval:recorded` events we've seen so far. */
  recordedCount?: number;
}

export interface PendingApprovalsState {
  approvals: PendingApproval[];
  isLoading: boolean;
  error: string | null;
  retry: () => void;
}

// Pending approvals as a plain array for legacy consumers (badge count).
type PendingApprovalsArrayLike = PendingApproval[] & { length: number };

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Compose the per-step key used in our internal map. `(runId, stepId)` is
 * the natural unique identifier — the same step can re-enter pending state
 * after a retry, but never concurrently for the same run.
 */
function approvalKey(runId: string, stepId: string): string {
  return `${runId}::${stepId}`;
}

/**
 * Hydrate a pending approval entry with config from the persisted pipeline
 * definition (message, requiredCount). Returns null when the pipeline isn't
 * locally known and the event payload alone isn't enough.
 */
function hydrateFromDefinition(
  pipelineId: string,
  stepId: string,
): { message?: string; requiredCount: number } {
  const def = loadPipeline(pipelineId);
  if (!def) return { requiredCount: 1 };
  const node = def.nodes.find((n) => n.id === stepId);
  if (!node || node.data.type !== 'approval') return { requiredCount: 1 };
  const data = node.data as ApprovalNodeData;
  return {
    message: data.message,
    requiredCount: Math.max(1, data.requiredCount ?? 1),
  };
}

/**
 * The dashboard endpoint returns a flexible envelope; we only require the
 * `pendingApprovals` slot. Anything else is ignored so additive changes from
 * Agent 2 don't break this hook.
 */
interface DashboardPendingApprovalsResponse {
  pendingApprovals?: Array<{
    runId: string;
    pipelineId: string;
    stepId: string;
    approvers?: Approver[];
    requestedAt: string;
    message?: string;
    requiredCount?: number;
    recordedCount?: number;
  }>;
}

// ---------------------------------------------------------------------------
// Core hook (state-rich)
// ---------------------------------------------------------------------------

/**
 * Maintain the live pending-approvals list. Subscribes to
 * `pipeline:approval:requested` / `pipeline:approval:recorded` and keeps an
 * internal map keyed on `(runId, stepId)`.
 */
export function usePendingApprovalsState(): PendingApprovalsState {
  const eventStream = useEventStreamContext();
  const pipelineRuns = usePipelineRuns();

  // Map keyed on `runId::stepId` — O(1) add/remove; sorted on read.
  const [approvalsMap, setApprovalsMap] = useState<Record<string, PendingApproval>>(
    () => {
      // Seed from PipelineRunsContext on first render so a navigation into
      // the page after the run started already shows the row. This duplicates
      // the legacy hook's runs-derived behaviour.
      const seed: Record<string, PendingApproval> = {};
      for (const runId in pipelineRuns.runs) {
        const run = pipelineRuns.runs[runId];
        if (run.status !== 'awaiting_approval') continue;
        for (const stepId in run.steps) {
          const step = run.steps[stepId];
          if (step.status !== 'awaiting') continue;
          const cfg = hydrateFromDefinition(run.pipelineId, stepId);
          const def = loadPipeline(run.pipelineId);
          const node = def?.nodes.find((n) => n.id === stepId);
          const approvers =
            node && node.data.type === 'approval'
              ? (node.data as ApprovalNodeData).approvers
              : [];
          seed[approvalKey(runId, stepId)] = {
            runId,
            pipelineId: run.pipelineId,
            stepId,
            approvers,
            requestedAt: step.startedAt ?? new Date(0).toISOString(),
            message: cfg.message,
            requiredCount: cfg.requiredCount,
            recordedCount: step.approvals?.filter((a) => a.decision === 'approve').length ?? 0,
          };
        }
      }
      return seed;
    },
  );

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshTick, setRefreshTick] = useState<number>(0);

  // Keep the latest pipelineRuns.runs in a ref so the recorded-event handler
  // can read it without re-subscribing every time the runs map mutates.
  const runsRef = useRef(pipelineRuns.runs);
  useEffect(() => {
    runsRef.current = pipelineRuns.runs;
  }, [pipelineRuns.runs]);

  // Local runId → pipelineId map populated synchronously from the event
  // stream. Needed because `pipeline:approval:requested` doesn't carry
  // `pipelineId` and the PipelineRunsContext-derived `runsRef` only updates
  // after a React render — too late if `run.started` and `approval.requested`
  // are dispatched in the same tick.
  const runToPipelineRef = useRef<Map<string, string>>(new Map());

  // Keys the event stream has touched since the in-flight fetch started.
  // The `/api/pipelines/approvals` snapshot is taken server-side *before* it
  // reaches us, so anything the stream changed in the meantime is newer than
  // the snapshot and must survive it. Without this the fetch response replaced
  // the map wholesale and silently discarded an approval that was requested
  // while the page was still loading — the run stayed blocked on an approval
  // that appeared in neither the panel nor the sub-nav badge. Reset whenever a
  // new fetch begins.
  const liveKeysRef = useRef<Set<string>>(new Set());

  // -------------------------------------------------------------------------
  // Initial fetch — dashboard endpoint, with a mock-mode fallback.
  // -------------------------------------------------------------------------

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError(null);
    liveKeysRef.current = new Set();

    const tryDashboard = async (): Promise<DashboardPendingApprovalsResponse | null> => {
      // Authoritative source: /api/pipelines/approvals (proxies the bridge's
      // getPendingApprovals). The observability dashboard endpoint exposes a
      // count under `pipelines.awaitingApproval` but not the list itself.
      try {
        const res = await fetch('/api/pipelines/approvals', {
          credentials: 'same-origin',
        });
        if (res.status === 404) return null;
        if (!res.ok) {
          throw new Error(`Dashboard fetch failed: ${res.status}`);
        }
        const body = (await res.json()) as { approvals?: DashboardPendingApprovalsResponse['pendingApprovals'] };
        return { pendingApprovals: body.approvals ?? [] };
      } catch (err) {
        // `null` means ONE thing: this deployment has no approvals endpoint,
        // so fall through to mock mode. It used to also mean "the request
        // blew up" — a downed API threw `TypeError: Failed to fetch`, landed
        // here, and returned the same `null` as a 404. The caller then set
        // no error, left the map empty, and PendingApprovalsPage rendered
        // "No pending approvals": an approver was told nobody was waiting on
        // them while runs sat blocked, with the page's own error banner and
        // Retry button unreachable for the most common failure mode.
        //
        // A non-JSON body stays in the "endpoint not present" bucket on
        // purpose: any SPA-fallback host answers an unknown /api/* path with
        // index.html and HTTP 200, which is the backendless demo, not an
        // outage. Everything else propagates.
        if (err instanceof SyntaxError) return null;
        throw err;
      }
    };

    void (async () => {
      try {
        const dashboard = await tryDashboard();
        if (cancelled) return;

        if (dashboard?.pendingApprovals) {
          const next: Record<string, PendingApproval> = {};
          for (const row of dashboard.pendingApprovals) {
            const cfg = hydrateFromDefinition(row.pipelineId, row.stepId);
            next[approvalKey(row.runId, row.stepId)] = {
              runId: row.runId,
              pipelineId: row.pipelineId,
              stepId: row.stepId,
              approvers: row.approvers ?? [],
              requestedAt: row.requestedAt,
              message: row.message ?? cfg.message,
              requiredCount: row.requiredCount ?? cfg.requiredCount,
              recordedCount: row.recordedCount ?? 0,
            };
          }
          // Merge, don't replace. Rows the event stream touched while this
          // fetch was in flight are strictly newer than the server snapshot:
          // keep the live value when the stream still holds one, and honour a
          // deletion when the stream already resolved the approval (otherwise
          // the stale snapshot resurrects a step that was just approved).
          setApprovalsMap((prev) => {
            const merged: Record<string, PendingApproval> = { ...next };
            for (const key of liveKeysRef.current) {
              if (prev[key]) merged[key] = prev[key];
              else delete merged[key];
            }
            return merged;
          });
        }
        setIsLoading(false);
      } catch (err) {
        if (cancelled) return;
        // Keep the technical detail (status code + endpoint) in the console for
        // debugging — the user-facing banner shows a sanitized message instead
        // (see PendingApprovalsPage `approvals-error` banner).
        // eslint-disable-next-line no-console
        console.error(
          '[usePendingApprovals] /api/observability/dashboard?include=pendingApprovals failed:',
          err,
        );
        setError((err as Error).message ?? 'Failed to load pending approvals');
        setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [refreshTick]);

  // -------------------------------------------------------------------------
  // Subscriptions — add on `requested`, remove on `recorded` (when the
  // recorded count meets the required threshold or the decision is `reject`).
  // -------------------------------------------------------------------------

  useEffect(() => {
    const cleanups: Array<() => void> = [];

    cleanups.push(
      eventStream.subscribe('pipeline.run.started', (raw) => {
        const payload = raw as PipelineEventMap['pipeline.run.started'];
        runToPipelineRef.current.set(payload.runId, payload.pipelineId);
      }),
    );

    cleanups.push(
      eventStream.subscribe('pipeline.approval.requested', (raw) => {
        const payload = raw as PipelineEventMap['pipeline.approval.requested'];
        // Look up the run to resolve pipelineId — required for the page's
        // pipeline-name lookup. Tries the local map populated synchronously
        // from `run.started` first, then the PipelineRunsContext-derived ref
        // (which lags by one render).
        const pipelineId =
          runToPipelineRef.current.get(payload.runId) ??
          runsRef.current[payload.runId]?.pipelineId ??
          '';
        const cfg = hydrateFromDefinition(pipelineId, payload.stepId);
        liveKeysRef.current.add(approvalKey(payload.runId, payload.stepId));

        setApprovalsMap((prev) => {
          const key = approvalKey(payload.runId, payload.stepId);
          if (prev[key]) return prev;
          return {
            ...prev,
            [key]: {
              runId: payload.runId,
              pipelineId,
              stepId: payload.stepId,
              approvers: payload.approvers,
              requestedAt: payload.at,
              message: cfg.message,
              requiredCount: cfg.requiredCount,
              recordedCount: 0,
            },
          };
        });
      }),
    );

    cleanups.push(
      eventStream.subscribe('pipeline.approval.recorded', (raw) => {
        const payload = raw as PipelineEventMap['pipeline.approval.recorded'];
        const key = approvalKey(payload.runId, payload.stepId);
        liveKeysRef.current.add(key);

        setApprovalsMap((prev) => {
          const existing = prev[key];
          if (!existing) return prev;

          // Reject: drop immediately. One reject is enough to short-circuit
          // an n-of-m approval per the executor contract (§17.3).
          if (payload.decision === 'reject') {
            const next = { ...prev };
            delete next[key];
            return next;
          }

          // Approve: increment count; drop when threshold is reached.
          const recorded = (existing.recordedCount ?? 0) + 1;
          const required = existing.requiredCount ?? 1;
          if (recorded >= required) {
            const next = { ...prev };
            delete next[key];
            return next;
          }
          return {
            ...prev,
            [key]: { ...existing, recordedCount: recorded },
          };
        });
      }),
    );

    const unsubApprovals = eventStream.subscribeToApprovals();
    cleanups.push(unsubApprovals);

    return () => {
      for (const c of cleanups) c();
    };
  }, [eventStream]);

  // -------------------------------------------------------------------------
  // Public API
  // -------------------------------------------------------------------------

  const approvals = useMemo<PendingApproval[]>(() => {
    return Object.values(approvalsMap).sort((a, b) =>
      b.requestedAt.localeCompare(a.requestedAt),
    );
  }, [approvalsMap]);

  const retry = useCallback(() => {
    setRefreshTick((t) => t + 1);
  }, []);

  return { approvals, isLoading, error, retry };
}

// ---------------------------------------------------------------------------
// Legacy array-returning hook
// ---------------------------------------------------------------------------

/**
 * Backwards-compatible array hook. `AppLayout` consumes this for the sub-nav
 * badge count — keep returning a plain array so `.length` continues to work.
 */
export function usePendingApprovals(): PendingApprovalsArrayLike {
  const { approvals } = usePendingApprovalsState();
  return approvals as PendingApprovalsArrayLike;
}

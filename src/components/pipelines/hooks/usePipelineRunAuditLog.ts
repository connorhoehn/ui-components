// frontend/src/components/pipelines/hooks/usePipelineRunAuditLog.ts
//
// hub#2225 — drives the per-run Executor Log tab in PipelineRunReplayPage.
//
// Sources, in priority order:
//   1. Initial fetch + periodic poll of GET /api/pipelines/:pipelineId/runs/:runId/audit
//   2. EventStreamContext live subscriptions for the same runId — every
//      event we'd expect to materialize as an audit row gets a synthetic
//      placeholder appended to the in-memory list immediately, then
//      reconciled by the next poll (which drops dupes by `auditId`).
//
// This hook does NOT touch PipelineRunsContext — synthetic rows live only
// inside the hook's local state, so the parallel agent's hub#2226 work on
// that context can land independently.

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  getRunAuditLog,
  type AuditFilters,
  type AuditPage,
  type AuditRow,
} from '../../../api/pipelineAudit';
import { useEventStreamContext } from '../context/EventStreamContext';
import type { PipelineEventMap } from '../../../types/pipeline';

/** Default poll cadence — matches usePipelineRun for the run-detail surface. */
const DEFAULT_POLL_MS = 5_000;

export interface UsePipelineRunAuditLogOptions {
  /** Override the poll cadence in ms. Pass `0` to disable polling. */
  pollMs?: number;
  /** Initial filters; mutating them re-fetches from page 1. */
  filters?: AuditFilters;
}

export interface UsePipelineRunAuditLogResult {
  items: AuditRow[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => void;
  /** True iff at least one event-stream message has arrived for this runId since mount. */
  liveHealthy: boolean;
  /** Force a re-fetch from page 1. */
  refresh: () => void;
}

/**
 * Synthetic audit row id prefix — anything starting with this is a
 * client-side optimistic entry and will be dropped when the corresponding
 * server-issued row arrives on the next poll.
 */
const SYNTHETIC_PREFIX = 'synthetic-';

/** Map a WS event type → AuditAction string. Returns null when not relevant. */
function eventToAction(eventType: string): string | null {
  switch (eventType) {
    case 'pipeline.step.started': return 'pipeline.step.started';
    case 'pipeline.step.completed': return 'pipeline.step.completed';
    case 'pipeline.step.failed': return 'pipeline.step.failed';
    case 'pipeline.step.breakpoint': return 'pipeline.step.breakpoint.hit';
    case 'pipeline.run.completed': return 'pipeline.run.completed';
    case 'pipeline.run.failed': return 'pipeline.run.failed';
    case 'pipeline.run.resumed-from-step': return 'pipeline.run.resumed-from-step';
    case 'pipeline.approval.requested': return null; // request lacks an audit-row twin
    case 'pipeline.approval.recorded': return 'pipeline.approve';
    default: return null;
  }
}

function newestFirst(a: AuditRow, b: AuditRow): number {
  return b.timestamp.localeCompare(a.timestamp);
}

/**
 * Merge fetched server rows with any in-memory synthetic placeholders.
 * Server rows win — when the corresponding event has been persisted we
 * drop synthetics whose timestamp is strictly older than the newest server
 * row of the same action.
 */
function reconcile(server: AuditRow[], synthetic: AuditRow[]): AuditRow[] {
  if (synthetic.length === 0) return server.slice().sort(newestFirst);
  const seen = new Set(server.map((r) => r.auditId));
  // Synthetic rows older than the newest server row of the same action are
  // assumed to have been persisted already and are dropped.
  const newestPerAction = new Map<string, string>();
  for (const r of server) {
    const cur = newestPerAction.get(r.action);
    if (!cur || r.timestamp > cur) newestPerAction.set(r.action, r.timestamp);
  }
  const keptSynth = synthetic.filter((s) => {
    if (seen.has(s.auditId)) return false;
    const cutoff = newestPerAction.get(s.action);
    return !cutoff || s.timestamp >= cutoff;
  });
  return [...server, ...keptSynth].sort(newestFirst);
}

export function usePipelineRunAuditLog(
  pipelineId: string | undefined,
  runId: string | undefined,
  options: UsePipelineRunAuditLogOptions = {},
): UsePipelineRunAuditLogResult {
  const { pollMs = DEFAULT_POLL_MS, filters } = options;
  const eventStream = useEventStreamContext();

  const [serverItems, setServerItems] = useState<AuditRow[]>([]);
  const [syntheticItems, setSyntheticItems] = useState<AuditRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [nextCursor, setNextCursor] = useState<string | undefined>(undefined);
  const [refreshTick, setRefreshTick] = useState<number>(0);
  const [liveHealthy, setLiveHealthy] = useState<boolean>(false);

  const filtersKey = JSON.stringify({
    since: filters?.since,
    until: filters?.until,
    actions: filters?.actions,
    limit: filters?.limit,
  });

  /** Identity of the current query — changes here mean "start over at page 1". */
  const identityKey = `${pipelineId ?? ''}|${runId ?? ''}|${filtersKey}`;
  const identityRef = useRef<string | null>(null);
  /** Rows currently loaded, so a poll refresh can re-request the same span. */
  const loadedCountRef = useRef(0);
  useEffect(() => {
    loadedCountRef.current = serverItems.length;
  }, [serverItems]);

  // -------------------------------------------------------------------------
  // Fetcher — pulls page 1 (no cursor) on (pipelineId, runId, filters) change,
  // and re-pulls the loaded span on every `refreshTick`.
  // -------------------------------------------------------------------------
  useEffect(() => {
    if (!pipelineId || !runId) return;
    let cancelled = false;
    setLoading(true);
    setError(null);

    // This effect serves two callers: a genuine (pipeline, run, filters) change,
    // which SHOULD reset to page 1, and the `refreshTick` poll, which should
    // not. It used to reset either way, so every 5s tick replaced `serverItems`
    // with page 1 and reset `nextCursor`: a user who clicked "Load more" watched
    // the Executor Log grow 50 -> 100 rows ("100 of 100 shown") and snap back to
    // 50 within five seconds, forever. A refresh now re-requests the span that
    // is actually loaded.
    const isReset = identityRef.current !== identityKey;
    identityRef.current = identityKey;
    if (isReset) loadedCountRef.current = 0;
    const requestLimit =
      loadedCountRef.current > (filters?.limit ?? 0)
        ? loadedCountRef.current
        : filters?.limit;

    void (async () => {
      try {
        const page: AuditPage = await getRunAuditLog(pipelineId, runId, {
          ...(filters ?? {}),
          ...(requestLimit != null ? { limit: requestLimit } : {}),
        });
        if (cancelled) return;
        setServerItems(page.items);
        setNextCursor(page.nextCursor);
        setLoading(false);
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : String(err));
        setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [pipelineId, runId, filtersKey, refreshTick]);

  // -------------------------------------------------------------------------
  // Poll — re-fetch page 1 every `pollMs`, reconciling against synthetic rows.
  // -------------------------------------------------------------------------
  useEffect(() => {
    if (!pipelineId || !runId || pollMs <= 0) return;
    const id = window.setInterval(() => {
      setRefreshTick((t) => t + 1);
    }, pollMs);
    return () => window.clearInterval(id);
  }, [pipelineId, runId, pollMs]);

  // -------------------------------------------------------------------------
  // Live append — wildcard subscription, filtered to this runId.
  // -------------------------------------------------------------------------
  useEffect(() => {
    if (!pipelineId || !runId) return;
    const cleanups: Array<() => void> = [];

    const handle = (eventType: string, payload: unknown): void => {
      const action = eventToAction(eventType);
      if (!action) return;
      const evt = payload as { runId?: string; stepId?: string; at?: string; fromNodeId?: string };
      if (evt.runId !== runId) return;
      setLiveHealthy(true);

      const synthetic: AuditRow = {
        auditId: `${SYNTHETIC_PREFIX}${eventType}-${evt.stepId ?? 'run'}-${Date.now()}`,
        timestamp: evt.at ?? new Date().toISOString(),
        action,
        actorUserId: 'executor',
        pipelineId,
        runId,
        trace: payload as Record<string, unknown>,
      };
      setSyntheticItems((prev) => [synthetic, ...prev]);
    };

    // Subscribe to each relevant type explicitly — keeps the handler typed
    // and avoids the wildcard noise from llm.token / llm.stream.opened.
    const types: Array<keyof PipelineEventMap> = [
      'pipeline.step.started',
      'pipeline.step.completed',
      'pipeline.step.failed',
      'pipeline.step.breakpoint',
      'pipeline.run.completed',
      'pipeline.run.failed',
      'pipeline.run.resumed-from-step',
      'pipeline.approval.recorded',
    ];
    for (const t of types) {
      cleanups.push(eventStream.subscribe(t, (payload) => handle(t as string, payload)));
    }

    // Subscribe to the runId channel so the gateway streams events for it.
    cleanups.push(eventStream.subscribeToRun(runId));

    return () => {
      for (const c of cleanups) c();
    };
  }, [eventStream, pipelineId, runId]);

  // Drop reconciled synthetic rows when serverItems changes.
  useEffect(() => {
    if (serverItems.length === 0) return;
    setSyntheticItems((prev) => {
      if (prev.length === 0) return prev;
      const newestPerAction = new Map<string, string>();
      for (const r of serverItems) {
        const cur = newestPerAction.get(r.action);
        if (!cur || r.timestamp > cur) newestPerAction.set(r.action, r.timestamp);
      }
      return prev.filter((s) => {
        const cutoff = newestPerAction.get(s.action);
        return !cutoff || s.timestamp >= cutoff;
      });
    });
  }, [serverItems]);

  // -------------------------------------------------------------------------
  // loadMore — appends the next page of server rows.
  // -------------------------------------------------------------------------
  const loadingMoreRef = useRef(false);
  const loadMore = useCallback(() => {
    if (!pipelineId || !runId) return;
    if (!nextCursor || loadingMoreRef.current) return;
    loadingMoreRef.current = true;
    void (async () => {
      try {
        const page = await getRunAuditLog(pipelineId, runId, {
          ...(filters ?? {}),
          cursor: nextCursor,
        });
        setServerItems((prev) => {
          const seen = new Set(prev.map((r) => r.auditId));
          const merged = prev.concat(page.items.filter((r) => !seen.has(r.auditId)));
          merged.sort(newestFirst);
          return merged;
        });
        setNextCursor(page.nextCursor);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        loadingMoreRef.current = false;
      }
    })();
  }, [pipelineId, runId, nextCursor, filtersKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const refresh = useCallback(() => {
    setRefreshTick((t) => t + 1);
  }, []);

  const items = useMemo(() => reconcile(serverItems, syntheticItems), [serverItems, syntheticItems]);

  return {
    items,
    loading,
    error,
    hasMore: !!nextCursor,
    loadMore,
    liveHealthy,
    refresh,
  };
}

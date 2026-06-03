import { useEffect, useRef, useState } from 'react';
import { useJudgmentApi } from './JudgmentApiContext';
import type { AggregateRow, FetchAggregatesParams } from './types';

export interface UseJudgmentAggregatesOptions extends FetchAggregatesParams {
  /**
   * Auto-refresh interval in ms. Default 0 (no polling). When set, the
   * hook re-fetches at this cadence after the initial load lands.
   * Useful for live trend panels; consumers that ALSO render
   * `useJudgmentResults` (event-stream) can leave this 0 since the
   * aggregator subscriber writes happen in-process and would be
   * eventually-consistent within seconds.
   */
  refreshIntervalMs?: number;
  /**
   * When true, skip fetching entirely. Useful for conditional
   * mounting / hidden panels. Default false.
   */
  paused?: boolean;
}

export interface UseJudgmentAggregatesReturn {
  aggregates: AggregateRow[];
  loading: boolean;
  error: Error | null;
  /** Trigger a fresh fetch on demand (e.g. after a manual refresh button). */
  reload: () => void;
}

/**
 * Fetches per-day judgment-aggregate rows via the `JudgmentApi` injected
 * via context. Pure data hook — does no rendering.
 *
 * Lifecycle:
 *   - On mount, fires one fetch with the given params.
 *   - On params change (deep-equal-ish via JSON.stringify), re-fetches.
 *   - When `refreshIntervalMs > 0`, polls on a setInterval.
 *   - On unmount, in-flight updates are dropped (mountedRef pattern).
 *
 * Without a provider, returns `{ aggregates: [], loading: false, error: null, reload: noop }`.
 */
export function useJudgmentAggregates(
  options: UseJudgmentAggregatesOptions,
): UseJudgmentAggregatesReturn {
  const api = useJudgmentApi();
  const [aggregates, setAggregates] = useState<AggregateRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const mountedRef = useRef(true);
  const reloadRef = useRef<() => void>(() => {});

  const { pipelineId, rubricId, since, until, limit, refreshIntervalMs = 0, paused = false } = options;

  // Stable signature so the effect deps array doesn't churn on every
  // render. Tradeoff: arrays/objects passed in deeper params would need
  // their own memoization at the call site — we only carry primitives.
  const paramsKey = `${pipelineId ?? ''}|${rubricId ?? ''}|${since ?? ''}|${until ?? ''}|${limit ?? ''}|${paused ? '1' : '0'}`;

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!api) {
      setAggregates([]);
      setLoading(false);
      setError(null);
      return;
    }
    if (paused) return;
    if (!pipelineId && !rubricId) {
      // The server requires one; refuse to fire a request we know will fail.
      setError(new Error('useJudgmentAggregates: one of pipelineId or rubricId is required'));
      setLoading(false);
      return;
    }

    let cancelled = false;
    const doFetch = async (): Promise<void> => {
      setLoading(true);
      try {
        const result = await api.fetchAggregates({
          ...(pipelineId ? { pipelineId } : {}),
          ...(rubricId ? { rubricId } : {}),
          ...(since ? { since } : {}),
          ...(until ? { until } : {}),
          ...(typeof limit === 'number' ? { limit } : {}),
        });
        if (cancelled || !mountedRef.current) return;
        setAggregates(result.items);
        setError(null);
      } catch (err) {
        if (cancelled || !mountedRef.current) return;
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        if (mountedRef.current && !cancelled) setLoading(false);
      }
    };

    reloadRef.current = () => {
      void doFetch();
    };

    void doFetch();

    if (refreshIntervalMs > 0) {
      const handle = setInterval(() => {
        void doFetch();
      }, refreshIntervalMs);
      return () => {
        cancelled = true;
        clearInterval(handle);
      };
    }
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api, paramsKey, refreshIntervalMs]);

  return {
    aggregates,
    loading,
    error,
    reload: () => reloadRef.current(),
  };
}

export default useJudgmentAggregates;

import { AggregateRow, FetchAggregatesParams } from './types';
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
export declare function useJudgmentAggregates(options: UseJudgmentAggregatesOptions): UseJudgmentAggregatesReturn;
export default useJudgmentAggregates;
//# sourceMappingURL=useJudgmentAggregates.d.ts.map
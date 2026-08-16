export type PipelineMetricsSource = 'bridge' | 'stub' | 'error';
/**
 * Snapshot returned by `GET /api/pipelines/metrics`. Numeric fields are
 * nullable because the bridge-sourced response leaves unsupported fields as
 * `null` until distributed-core grows the surface — UI must render "—" for
 * those, NOT zeros.
 */
export interface PipelineMetrics {
    runsStarted: number | null;
    runsCompleted: number | null;
    runsFailed: number | null;
    runsActive: number | null;
    runsAwaitingApproval: number | null;
    avgDurationMs: number | null;
    llmTokensIn: number | null;
    llmTokensOut: number | null;
    estimatedCostUsd: number | null;
    /**
     * Average first-token latency (ms) across LLM steps. Sourced from
     * distributed-core v0.3.7+ via `PipelineModule.getMetrics()`. Older bridge
     * builds (and the stub fixture) leave this `null`; the UI must render an
     * em-dash, never zero.
     */
    avgFirstTokenLatencyMs: number | null;
    asOf: string;
    /** Discriminator describing where the values came from. */
    source: PipelineMetricsSource;
}
export interface UsePipelineMetricsResult {
    metrics: PipelineMetrics | null;
    loading: boolean;
    error: string | null;
    lastUpdatedAt: string | null;
    refresh: () => Promise<void>;
    /** True once at least one successful fetch has populated `metrics`. */
    isLiveData: boolean;
    /**
     * Discriminator from the most recent snapshot, or `null` before the first
     * fetch resolves. Mirrors `metrics?.source` for convenient destructuring.
     */
    source: PipelineMetricsSource | null;
}
export declare function usePipelineMetrics(): UsePipelineMetricsResult;
export default usePipelineMetrics;
//# sourceMappingURL=usePipelineMetrics.d.ts.map
export type SloWindow = '15m' | '1h' | '6h' | '24h';
export interface SloPoint {
    at: string;
    value: number | null;
}
export interface SourceSloMetrics {
    sourceId: string;
    window: string;
    bucketSizeMs: number;
    latencyP95: SloPoint[];
    errorRate: SloPoint[];
    queueDepth: SloPoint[];
}
export interface UseSourceSloMetricsOptions {
    /** Wins over this library's `useIdentityContext().idToken`. */
    idToken?: string | null;
    /** Wins over the build-time `VITE_SOCIAL_API_URL` / module `setApiBaseUrl`. */
    baseUrl?: string;
}
export interface UseSourceSloMetricsResult {
    metrics: SourceSloMetrics | null;
    loading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
}
export declare function useSourceSloMetrics(sourceId: string | undefined, window?: SloWindow, options?: UseSourceSloMetricsOptions): UseSourceSloMetricsResult;
export default useSourceSloMetrics;
//# sourceMappingURL=useSourceSloMetrics.d.ts.map
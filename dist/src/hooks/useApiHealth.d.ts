export type ApiHealthStatus = 'ok' | 'degraded' | 'unknown';
export interface ApiHealthCheck {
    status: 'ok' | 'error' | string;
    latencyMs?: number;
    error?: string;
}
export interface ApiHealthSnapshot {
    status: ApiHealthStatus;
    checks: Record<string, ApiHealthCheck>;
    /** Names of failing dependencies (status !== 'ok'). Empty when healthy or unknown. */
    failing: string[];
}
/**
 * Polls /health every `pollMs`. The first sample lands as soon as the network
 * round-trip completes; the hook starts in `unknown` so callers don't flash
 * "degraded" before the first response.
 */
export declare function useApiHealth(pollMs?: number): ApiHealthSnapshot;
//# sourceMappingURL=useApiHealth.d.ts.map
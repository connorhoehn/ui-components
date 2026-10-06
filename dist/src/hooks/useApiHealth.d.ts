export type ApiHealthStatus = 'ok' | 'degraded' | 'unknown';
export interface ApiHealthCheck {
    /** 'degraded': the check passed but reports reduced service (the pod stays up). */
    status: 'ok' | 'error' | 'degraded' | string;
    latencyMs?: number;
    error?: string;
    /** The check's own words, when it gave a string (`details` on the wire). */
    detail?: string;
}
export interface ApiHealthSnapshot {
    status: ApiHealthStatus;
    checks: Record<string, ApiHealthCheck>;
    /** Names of failing dependencies (status !== 'ok'). Empty when healthy or unknown. */
    failing: string[];
}
export interface UseApiHealthOptions {
    /** Poll interval. Default 30 s. */
    pollMs?: number;
    /** Origin whose `/health` is polled. Wins over `getApiBaseUrl()`. */
    baseUrl?: string;
}
/** Collapses either /health shape into the v1 one; `null` when it is neither. */
export declare function normalizeApiHealth(body: unknown): {
    status: 'ok' | 'degraded';
    checks: Record<string, ApiHealthCheck>;
} | null;
/**
 * Polls /health every `pollMs`. The first sample lands as soon as the network
 * round-trip completes; the hook starts in `unknown` so callers don't flash
 * "degraded" before the first response.
 *
 * Accepts the interval as a bare number (the pre-2.359.0 signature) or an
 * options object.
 */
export declare function useApiHealth(options?: number | UseApiHealthOptions): ApiHealthSnapshot;
/**
 * "Model unavailable — <reason>" when the API's `model` health check says the
 * model cannot be reached (platform-api's shared probe + circuit breaker),
 * else null. For a composer or run pane that would otherwise quietly get an
 * offline draft or wait out a timeout.
 */
export declare function modelUnavailableMessage(health: ApiHealthSnapshot): string | null;
//# sourceMappingURL=useApiHealth.d.ts.map
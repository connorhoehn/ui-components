import { type ReactNode } from 'react';
export interface ClusterDashboard {
    overview: {
        totalNodes: number;
        healthyNodes: number;
        totalResources: number;
        totalConnections: number;
        messagesPerSecond: number;
        averageLatency: number;
        clusterHealth: 'healthy' | 'warning' | 'critical';
    };
    regions: Record<string, {
        nodes: number;
        resources: number;
        connections: number;
        health: number;
        latency: number;
    }>;
    hotspots: {
        highTrafficResources: Array<{
            resourceId: string;
            connections: number;
            messageRate: number;
            node: string;
        }>;
        overloadedNodes: Array<{
            nodeId: string;
            cpuUsage: number;
            memoryUsage: number;
            resourceCount: number;
        }>;
    };
    trends: {
        connectionGrowth: number;
        messageVolumeGrowth: number;
        nodeHealthTrend: 'improving' | 'stable' | 'degrading';
    };
    alerts: Array<{
        severity: 'info' | 'warning' | 'error' | 'critical';
        message: string;
        timestamp: number;
        category: 'performance' | 'capacity' | 'health' | 'security';
    }>;
}
export interface RecentEvent {
    id: string;
    timestamp: string;
    type: string;
    summary: string;
    severity?: 'info' | 'warning' | 'error' | 'success';
    payload?: unknown;
}
export interface ObservabilityValue {
    dashboard: ClusterDashboard | null;
    loading: boolean;
    error: string | null;
    lastUpdatedAt: string | null;
    live: boolean;
    setLive: (live: boolean) => void;
    refreshDashboard: () => Promise<void>;
    /** Live recent events (capped) — populated from the EventStream. */
    recentEvents: RecentEvent[];
    /** Active runs count derived from event stream. */
    activeRunsCount: number;
    /** True when the backend dashboard fetch has succeeded at least once. */
    isLiveData: boolean;
    /**
     * True when the dashboard endpoint answered 401/403 — i.e. the data on
     * screen is fixture data because we are *not authorized*, not because the
     * cluster is unreachable. Kept separate from `error` so the UI can stop
     * telling an operator "backend unreachable" when the real problem is a
     * missing credential they can actually do something about.
     */
    unauthorized: boolean;
}
declare const ObservabilityContext: import("react").Context<ObservabilityValue>;
interface Props {
    children: ReactNode;
    pollIntervalMs?: number;
    /**
     * Bearer token for `GET /api/observability/dashboard`. Optional host seam:
     * when omitted the provider falls back to an `<IdentityProvider>`'s
     * `idToken` if one happens to be in the tree, and sends no `Authorization`
     * header if neither is available.
     *
     * This exists because the provider previously sent no credentials at all
     * while its sibling `usePipelineMetrics` sent a bearer token to the same
     * origin — so on a protected deployment the dashboard pinned to fixture
     * data forever and showed an operator plausible fake numbers.
     */
    authToken?: string | null;
    /**
     * Full fetch seam for hosts whose auth doesn't reduce to a bearer token
     * (request signing, a token that must be refreshed per call, a proxy).
     * Defaults to global `fetch`.
     */
    fetchImpl?: typeof fetch;
    /**
     * Credentials mode for the dashboard request. Defaults to `'include'` so
     * cookie-session deployments authenticate. Set `'same-origin'` if your API
     * replies with a wildcard `Access-Control-Allow-Origin`, which browsers
     * refuse to combine with `'include'`.
     */
    credentials?: RequestCredentials;
}
export declare function ObservabilityProvider({ children, pollIntervalMs, authToken, fetchImpl, credentials, }: Props): import("react").JSX.Element;
export declare function useObservability(): ObservabilityValue;
export default ObservabilityContext;
//# sourceMappingURL=ObservabilityContext.d.ts.map
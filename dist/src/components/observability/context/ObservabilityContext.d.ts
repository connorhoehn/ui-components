import { ReactNode } from 'react';
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
}
declare const ObservabilityContext: import('react').Context<ObservabilityValue>;
interface Props {
    children: ReactNode;
    pollIntervalMs?: number;
}
export declare function ObservabilityProvider({ children, pollIntervalMs, }: Props): import("react").JSX.Element;
export declare function useObservability(): ObservabilityValue;
export default ObservabilityContext;
//# sourceMappingURL=ObservabilityContext.d.ts.map
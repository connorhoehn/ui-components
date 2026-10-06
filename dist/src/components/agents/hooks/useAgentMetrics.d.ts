import type { AgentMetrics } from '../../../types/agents';
interface UseAgentMetricsOptions {
    baseUrl?: string;
    agentId?: string;
    pollIntervalMs?: number;
    enabled?: boolean;
}
/**
 * Where `metrics` came from — same discriminator `useAgentRegistry` exposes
 * as `AgentRegistrySource`.
 *
 * This hook seeds state with `fixtureMetrics` and keeps them when no
 * `baseUrl` is configured or when the first fetch fails. Without this tag
 * `AgentsDashboardPage` renders "Invocations (24h): 22,290" and an average
 * latency in the same type as it would for a live registry — an operator
 * looking at a dashboard whose backend is down cannot tell the difference
 * between a healthy fleet and invented numbers.
 */
export type AgentMetricsSource = 'fixture' | 'remote';
interface UseAgentMetricsReturn {
    metrics: AgentMetrics[];
    /** `'fixture'` means `metrics` is synthetic sample data — surface that in the UI. */
    source: AgentMetricsSource;
    isLoading: boolean;
    error: string | null;
    refresh: () => void;
    getMetricsForAgent: (id: string) => AgentMetrics | undefined;
    totalInvocations24h: number;
    totalErrors24h: number;
    avgLatencyMs: number;
}
export declare function useAgentMetrics({ baseUrl, agentId, pollIntervalMs, enabled, }?: UseAgentMetricsOptions): UseAgentMetricsReturn;
export {};
//# sourceMappingURL=useAgentMetrics.d.ts.map
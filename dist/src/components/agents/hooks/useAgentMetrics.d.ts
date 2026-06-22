import { AgentMetrics } from '../../../types/agents';
interface UseAgentMetricsOptions {
    baseUrl?: string;
    agentId?: string;
    pollIntervalMs?: number;
    enabled?: boolean;
}
interface UseAgentMetricsReturn {
    metrics: AgentMetrics[];
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
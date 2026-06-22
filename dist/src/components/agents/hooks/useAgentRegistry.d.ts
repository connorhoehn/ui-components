import { AgentDefinition } from '../../../types/agents';
interface UseAgentRegistryOptions {
    baseUrl?: string;
    pollIntervalMs?: number;
    enabled?: boolean;
}
interface UseAgentRegistryReturn {
    agents: AgentDefinition[];
    isLoading: boolean;
    error: string | null;
    refresh: () => void;
    getAgent: (id: string) => AgentDefinition | undefined;
    healthyCount: number;
    degradedCount: number;
    offlineCount: number;
}
export declare function useAgentRegistry({ baseUrl, pollIntervalMs, enabled, }?: UseAgentRegistryOptions): UseAgentRegistryReturn;
export {};
//# sourceMappingURL=useAgentRegistry.d.ts.map
import type { AgentDefinition } from '../../../types/agents';
interface UseAgentRegistryOptions {
    baseUrl?: string;
    pollIntervalMs?: number;
    enabled?: boolean;
}
/**
 * Where `agents` came from. Mirrors the `source` discriminator that
 * `usePipelineMetrics` already exposes in `/observability`.
 *
 * This hook seeds state with `fixtureAgents` and keeps them when no
 * `baseUrl` is configured or when a fetch fails — so without this tag a
 * consumer cannot tell a real, healthy registry from synthetic sample data.
 * A failed fetch previously surfaced `error` while still rendering
 * plausible-looking fake agents.
 */
export type AgentRegistrySource = 'fixture' | 'remote';
interface UseAgentRegistryReturn {
    agents: AgentDefinition[];
    /** `'fixture'` means `agents` is synthetic sample data — surface that in the UI. */
    source: AgentRegistrySource;
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
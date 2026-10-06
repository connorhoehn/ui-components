import { type ReactNode } from 'react';
import type { AgentDefinition, AgentMetrics, AgUiSession, A2ASession } from '../../../types/agents';
/**
 * Where the provider's `agents` / `metrics` actually came from.
 *
 * Same discriminator `useAgentRegistry` exposes as `AgentRegistrySource` and
 * `useAgentMetrics` as `AgentMetricsSource`, with one extra member those hooks
 * don't need: the provider also accepts `agents` / `metrics` PROPS, which are
 * real host data and must not be labelled `'fixture'`.
 *
 * - `'provided'` — the host passed the array in as a prop.
 * - `'remote'`   — fetched from `baseUrl`.
 * - `'fixture'`  — synthetic sample data from `agentsFixture`. Shown when no
 *                  `baseUrl` is configured, before the first fetch settles,
 *                  and when a fetch fails. **Surface this in the UI.** Before
 *                  v2.90 the provider accepted `baseUrl` and discarded it, so
 *                  `AgentsDashboardPage` rendered invented invocation counts
 *                  and health badges that were indistinguishable from a live
 *                  fleet.
 */
export type AgentsSource = 'fixture' | 'remote' | 'provided';
interface AgentsContextValue {
    agents: AgentDefinition[];
    metrics: AgentMetrics[];
    sessions: AgUiSession[];
    a2aSessions: A2ASession[];
    selectedAgentId: string | null;
    selectAgent: (id: string | null) => void;
    refreshAgents: () => void;
    getAgent: (id: string) => AgentDefinition | undefined;
    getMetrics: (agentId: string) => AgentMetrics | undefined;
    /** Provenance of `agents`. `'fixture'` means synthetic sample data. */
    agentsSource: AgentsSource;
    /** Provenance of `metrics`. `'fixture'` means synthetic sample data. */
    metricsSource: AgentsSource;
    /** True while a `baseUrl` fetch is in flight. */
    isLoading: boolean;
    /** Last fetch failure. Non-null with a `'fixture'` source means the live data is unavailable. */
    error: string | null;
}
interface AgentsProviderProps {
    children: ReactNode;
    agents?: AgentDefinition[];
    metrics?: AgentMetrics[];
    /**
     * Base URL of the agent registry. When set, the provider fetches
     * `GET {baseUrl}/agents` and `GET {baseUrl}/agents/metrics` on mount —
     * matching the endpoints `useAgentRegistry` / `useAgentMetrics` already
     * call — and flips the matching `*Source` to `'remote'`.
     *
     * Ignored for whichever of `agents` / `metrics` was passed as a prop:
     * an explicit host-supplied array always wins over a fetch.
     */
    baseUrl?: string;
}
export declare function AgentsProvider({ children, agents: initialAgents, metrics: initialMetrics, baseUrl, }: AgentsProviderProps): import("react").JSX.Element;
export declare function useAgentsContext(): AgentsContextValue;
export {};
//# sourceMappingURL=AgentsContext.d.ts.map
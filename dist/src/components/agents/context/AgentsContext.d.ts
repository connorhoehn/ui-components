import { ReactNode } from 'react';
import { AgentDefinition, AgentMetrics, AgUiSession, A2ASession } from '../../../types/agents';
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
}
interface AgentsProviderProps {
    children: ReactNode;
    agents?: AgentDefinition[];
    metrics?: AgentMetrics[];
    baseUrl?: string;
}
export declare function AgentsProvider({ children, agents: initialAgents, metrics: initialMetrics, baseUrl: _baseUrl, }: AgentsProviderProps): import("react").JSX.Element;
export declare function useAgentsContext(): AgentsContextValue;
export {};
//# sourceMappingURL=AgentsContext.d.ts.map
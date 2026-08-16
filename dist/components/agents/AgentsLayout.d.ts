import type { ReactNode } from 'react';
import type { AgentDefinition, AgentMetrics } from '../../types/agents';
interface AgentsLayoutProps {
    children: ReactNode;
    agents?: AgentDefinition[];
    metrics?: AgentMetrics[];
    baseUrl?: string;
}
export declare function AgentsLayout({ children, agents, metrics, baseUrl }: AgentsLayoutProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=AgentsLayout.d.ts.map
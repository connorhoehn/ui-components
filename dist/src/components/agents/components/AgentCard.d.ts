import { AgentDefinition, AgentMetrics } from '../../../types/agents';
interface AgentCardProps {
    agent: AgentDefinition;
    metrics?: AgentMetrics;
    selected?: boolean;
    onClick?: () => void;
}
export declare function AgentCard({ agent, metrics, selected, onClick }: AgentCardProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=AgentCard.d.ts.map
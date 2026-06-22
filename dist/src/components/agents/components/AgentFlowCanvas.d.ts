import { AgentDefinition } from '../../../types/agents';
interface AgentFlowCanvasProps {
    agents: AgentDefinition[];
    edges?: {
        from: string;
        to: string;
    }[];
    onAgentClick?: (agentId: string) => void;
    className?: string;
}
export declare function AgentFlowCanvas({ agents, edges: edgeDefs, onAgentClick, className, }: AgentFlowCanvasProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=AgentFlowCanvas.d.ts.map
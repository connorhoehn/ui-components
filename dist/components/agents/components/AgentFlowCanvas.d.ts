import '@xyflow/react/dist/style.css';
import type { AgentDefinition } from '../../../types/agents';
interface AgentFlowCanvasProps {
    agents: AgentDefinition[];
    edges?: {
        from: string;
        to: string;
    }[];
    onAgentClick?: (agentId: string) => void;
    className?: string;
}
export declare function AgentFlowCanvas({ agents, edges: edgeDefs, onAgentClick, className, }: AgentFlowCanvasProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=AgentFlowCanvas.d.ts.map
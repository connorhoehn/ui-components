import { type NodeProps, type Node } from '@xyflow/react';
import { type NodeExecutionState } from '../BaseNode';
import type { AgentNodeData } from '../../../../types/pipeline';
type AgentData = AgentNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;
type AgentFlowNode = Node<AgentData, 'agent'>;
export default function AgentNode({ id, data, selected }: NodeProps<AgentFlowNode>): import("react").JSX.Element;
export {};
//# sourceMappingURL=AgentNode.d.ts.map
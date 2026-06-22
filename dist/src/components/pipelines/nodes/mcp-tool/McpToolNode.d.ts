import { NodeProps, Node } from '@xyflow/react';
import { NodeExecutionState } from '../BaseNode';
import { McpToolNodeData } from '../../../../types/pipeline';
type McpToolData = McpToolNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;
type McpToolFlowNode = Node<McpToolData, 'mcp-tool'>;
export default function McpToolNode({ id, data, selected }: NodeProps<McpToolFlowNode>): import("react").JSX.Element;
export {};
//# sourceMappingURL=McpToolNode.d.ts.map
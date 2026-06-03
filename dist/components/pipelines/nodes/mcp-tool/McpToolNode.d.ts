import { type NodeProps, type Node } from '@xyflow/react';
import { type NodeExecutionState } from '../BaseNode';
import type { McpToolNodeData } from '../../../../types/pipeline';
type McpToolData = McpToolNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;
type McpToolFlowNode = Node<McpToolData, 'mcp-tool'>;
export default function McpToolNode({ id, data, selected }: NodeProps<McpToolFlowNode>): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=McpToolNode.d.ts.map
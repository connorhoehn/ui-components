import { NodeProps, Node } from '@xyflow/react';
import { NodeExecutionState } from '../BaseNode';
import { GraphQueryNodeData } from '../../../../types/pipeline';
type GraphData = GraphQueryNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;
type GraphFlowNode = Node<GraphData, 'graph-query'>;
export default function GraphQueryNode({ id, data, selected }: NodeProps<GraphFlowNode>): import("react").JSX.Element;
export {};
//# sourceMappingURL=GraphQueryNode.d.ts.map
import { type NodeProps, type Node } from '@xyflow/react';
import { type NodeExecutionState } from '../BaseNode';
import type { JoinNodeData } from '../../../../types/pipeline';
type JoinData = JoinNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;
type JoinFlowNode = Node<JoinData, 'join'>;
export default function JoinNode(props: NodeProps<JoinFlowNode>): import("react").JSX.Element;
export {};
//# sourceMappingURL=JoinNode.d.ts.map
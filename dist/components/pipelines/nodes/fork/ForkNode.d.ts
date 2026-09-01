import { type NodeProps, type Node } from '@xyflow/react';
import { type NodeExecutionState } from '../BaseNode';
import type { ForkNodeData } from '../../../../types/pipeline';
type ForkData = ForkNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;
type ForkFlowNode = Node<ForkData, 'fork'>;
export default function ForkNode(props: NodeProps<ForkFlowNode>): import("react").JSX.Element;
export {};
//# sourceMappingURL=ForkNode.d.ts.map
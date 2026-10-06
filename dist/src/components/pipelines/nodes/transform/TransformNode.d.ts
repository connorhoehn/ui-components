import { type NodeProps, type Node } from '@xyflow/react';
import { type NodeExecutionState } from '../BaseNode';
import type { TransformNodeData } from '../../../../types/pipeline';
type TransformData = TransformNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;
type TransformFlowNode = Node<TransformData, 'transform'>;
export default function TransformNode(props: NodeProps<TransformFlowNode>): import("react").JSX.Element;
export {};
//# sourceMappingURL=TransformNode.d.ts.map
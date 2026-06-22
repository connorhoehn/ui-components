import { NodeProps, Node } from '@xyflow/react';
import { NodeExecutionState } from '../BaseNode';
import { TransformNodeData } from '../../../../types/pipeline';
type TransformData = TransformNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;
type TransformFlowNode = Node<TransformData, 'transform'>;
export default function TransformNode(props: NodeProps<TransformFlowNode>): import("react").JSX.Element;
export {};
//# sourceMappingURL=TransformNode.d.ts.map
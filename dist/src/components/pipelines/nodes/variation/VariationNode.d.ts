import { NodeProps, Node } from '@xyflow/react';
import { NodeExecutionState } from '../BaseNode';
import { ImageVariationNodeData } from '../../../../types/pipeline';
type VariationData = ImageVariationNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;
type VariationFlowNode = Node<VariationData, 'image:variation'>;
export default function VariationNode(props: NodeProps<VariationFlowNode>): import("react").JSX.Element;
export {};
//# sourceMappingURL=VariationNode.d.ts.map
import { type NodeProps, type Node } from '@xyflow/react';
import { type NodeExecutionState } from '../BaseNode';
import type { ImageVariationNodeData } from '../../../../types/pipeline';
type VariationData = ImageVariationNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;
type VariationFlowNode = Node<VariationData, 'image:variation'>;
export default function VariationNode(props: NodeProps<VariationFlowNode>): import("react").JSX.Element;
export {};
//# sourceMappingURL=VariationNode.d.ts.map
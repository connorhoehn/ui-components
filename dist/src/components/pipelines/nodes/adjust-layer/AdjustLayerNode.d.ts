import { NodeProps, Node } from '@xyflow/react';
import { NodeExecutionState } from '../BaseNode';
import { ImageAdjustLayerNodeData } from '../../../../types/pipeline';
type AdjustLayerData = ImageAdjustLayerNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;
type AdjustLayerFlowNode = Node<AdjustLayerData, 'image:adjust-layer'>;
export default function AdjustLayerNode(props: NodeProps<AdjustLayerFlowNode>): import("react").JSX.Element;
export {};
//# sourceMappingURL=AdjustLayerNode.d.ts.map
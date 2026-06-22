import { NodeProps, Node } from '@xyflow/react';
import { NodeExecutionState } from '../BaseNode';
import { ImageWatermarkNodeData } from '../../../../types/pipeline';
type WatermarkData = ImageWatermarkNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;
type WatermarkFlowNode = Node<WatermarkData, 'image:watermark'>;
export default function WatermarkNode(props: NodeProps<WatermarkFlowNode>): import("react").JSX.Element;
export {};
//# sourceMappingURL=WatermarkNode.d.ts.map
import { type NodeProps, type Node } from '@xyflow/react';
import { type NodeExecutionState } from '../BaseNode';
import type { ImageWatermarkNodeData } from '../../../../types/pipeline';
type WatermarkData = ImageWatermarkNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;
type WatermarkFlowNode = Node<WatermarkData, 'image:watermark'>;
export default function WatermarkNode(props: NodeProps<WatermarkFlowNode>): import("react").JSX.Element;
export {};
//# sourceMappingURL=WatermarkNode.d.ts.map
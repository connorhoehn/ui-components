import { type NodeProps, type Node } from '@xyflow/react';
import { type NodeExecutionState } from '../BaseNode';
import type { ImageCropNodeData } from '../../../../types/pipeline';
type CropData = ImageCropNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;
type CropFlowNode = Node<CropData, 'image:crop'>;
export default function CropNode(props: NodeProps<CropFlowNode>): import("react").JSX.Element;
export {};
//# sourceMappingURL=CropNode.d.ts.map
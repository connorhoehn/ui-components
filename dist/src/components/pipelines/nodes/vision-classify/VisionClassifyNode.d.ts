import { type NodeProps, type Node } from '@xyflow/react';
import { type NodeExecutionState } from '../BaseNode';
import type { ImageVisionClassifyNodeData } from '../../../../types/pipeline';
type VisionClassifyData = ImageVisionClassifyNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;
type VisionClassifyFlowNode = Node<VisionClassifyData, 'image:vision-classify'>;
export default function VisionClassifyNode(props: NodeProps<VisionClassifyFlowNode>): import("react").JSX.Element;
export {};
//# sourceMappingURL=VisionClassifyNode.d.ts.map
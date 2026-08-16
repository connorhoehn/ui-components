import { type NodeProps, type Node } from '@xyflow/react';
import { type NodeExecutionState } from '../BaseNode';
import type { ImageVisionAnalyzeNodeData } from '../../../../types/pipeline';
type VisionData = ImageVisionAnalyzeNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;
type VisionFlowNode = Node<VisionData, 'image:vision-analyze'>;
export default function VisionNode(props: NodeProps<VisionFlowNode>): import("react").JSX.Element;
export {};
//# sourceMappingURL=VisionNode.d.ts.map
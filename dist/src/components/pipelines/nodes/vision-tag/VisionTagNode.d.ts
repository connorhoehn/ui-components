import { NodeProps, Node } from '@xyflow/react';
import { NodeExecutionState } from '../BaseNode';
import { ImageVisionTagNodeData } from '../../../../types/pipeline';
type VisionTagData = ImageVisionTagNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;
type VisionTagFlowNode = Node<VisionTagData, 'image:vision-tag'>;
export default function VisionTagNode(props: NodeProps<VisionTagFlowNode>): import("react").JSX.Element;
export {};
//# sourceMappingURL=VisionTagNode.d.ts.map
import { NodeProps, Node } from '@xyflow/react';
import { NodeExecutionState } from '../BaseNode';
import { ImageVisionExtractTextNodeData } from '../../../../types/pipeline';
type VisionExtractTextData = ImageVisionExtractTextNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;
type VisionExtractTextFlowNode = Node<VisionExtractTextData, 'image:vision-extract-text'>;
export default function VisionExtractTextNode(props: NodeProps<VisionExtractTextFlowNode>): import("react").JSX.Element;
export {};
//# sourceMappingURL=VisionExtractTextNode.d.ts.map
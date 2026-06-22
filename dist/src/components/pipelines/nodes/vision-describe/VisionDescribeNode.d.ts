import { NodeProps, Node } from '@xyflow/react';
import { NodeExecutionState } from '../BaseNode';
import { ImageVisionDescribeNodeData } from '../../../../types/pipeline';
type VisionDescribeData = ImageVisionDescribeNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;
type VisionDescribeFlowNode = Node<VisionDescribeData, 'image:vision-describe'>;
export default function VisionDescribeNode(props: NodeProps<VisionDescribeFlowNode>): import("react").JSX.Element;
export {};
//# sourceMappingURL=VisionDescribeNode.d.ts.map
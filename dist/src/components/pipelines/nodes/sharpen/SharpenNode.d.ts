import { NodeProps, Node } from '@xyflow/react';
import { NodeExecutionState } from '../BaseNode';
import { ImageSharpenNodeData } from '../../../../types/pipeline';
type SharpenData = ImageSharpenNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;
type SharpenFlowNode = Node<SharpenData, 'image:sharpen'>;
export default function SharpenNode(props: NodeProps<SharpenFlowNode>): import("react").JSX.Element;
export {};
//# sourceMappingURL=SharpenNode.d.ts.map
import { NodeProps, Node } from '@xyflow/react';
import { NodeExecutionState } from '../BaseNode';
import { ImageResizeNodeData } from '../../../../types/pipeline';
type ResizeData = ImageResizeNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;
type ResizeFlowNode = Node<ResizeData, 'image:resize'>;
export default function ResizeNode(props: NodeProps<ResizeFlowNode>): import("react").JSX.Element;
export {};
//# sourceMappingURL=ResizeNode.d.ts.map
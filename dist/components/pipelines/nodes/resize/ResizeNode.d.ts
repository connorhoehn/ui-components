import { type NodeProps, type Node } from '@xyflow/react';
import { type NodeExecutionState } from '../BaseNode';
import type { ImageResizeNodeData } from '../../../../types/pipeline';
type ResizeData = ImageResizeNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;
type ResizeFlowNode = Node<ResizeData, 'image:resize'>;
export default function ResizeNode(props: NodeProps<ResizeFlowNode>): import("react").JSX.Element;
export {};
//# sourceMappingURL=ResizeNode.d.ts.map
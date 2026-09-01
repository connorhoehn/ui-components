import { type NodeProps, type Node } from '@xyflow/react';
import { type NodeExecutionState } from '../BaseNode';
import type { ImageSourceNodeData } from '../../../../types/pipeline';
type ImageSourceData = ImageSourceNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;
type ImageSourceFlowNode = Node<ImageSourceData, 'image-source'>;
export default function ImageSourceNode(props: NodeProps<ImageSourceFlowNode>): import("react").JSX.Element;
export {};
//# sourceMappingURL=ImageSourceNode.d.ts.map
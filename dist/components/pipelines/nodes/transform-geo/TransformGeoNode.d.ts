import { type NodeProps, type Node } from '@xyflow/react';
import { type NodeExecutionState } from '../BaseNode';
import type { ImageTransformNodeData } from '../../../../types/pipeline';
type TransformGeoData = ImageTransformNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;
type TransformGeoFlowNode = Node<TransformGeoData, 'image:transform'>;
export default function TransformGeoNode(props: NodeProps<TransformGeoFlowNode>): import("react").JSX.Element;
export {};
//# sourceMappingURL=TransformGeoNode.d.ts.map
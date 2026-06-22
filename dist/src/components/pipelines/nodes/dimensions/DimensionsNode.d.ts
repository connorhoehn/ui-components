import { NodeProps, Node } from '@xyflow/react';
import { NodeExecutionState } from '../BaseNode';
import { ImageDimensionsNodeData } from '../../../../types/pipeline';
type DimensionsData = ImageDimensionsNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;
type DimensionsFlowNode = Node<DimensionsData, 'image:dimensions'>;
export default function DimensionsNode(props: NodeProps<DimensionsFlowNode>): import("react").JSX.Element;
export {};
//# sourceMappingURL=DimensionsNode.d.ts.map
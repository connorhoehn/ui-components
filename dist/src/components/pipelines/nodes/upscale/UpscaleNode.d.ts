import { NodeProps, Node } from '@xyflow/react';
import { NodeExecutionState } from '../BaseNode';
import { ImageUpscaleNodeData } from '../../../../types/pipeline';
type UpscaleData = ImageUpscaleNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;
type UpscaleFlowNode = Node<UpscaleData, 'image:upscale'>;
export default function UpscaleNode(props: NodeProps<UpscaleFlowNode>): import("react").JSX.Element;
export {};
//# sourceMappingURL=UpscaleNode.d.ts.map
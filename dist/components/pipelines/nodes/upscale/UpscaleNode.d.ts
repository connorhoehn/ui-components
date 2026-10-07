import { type NodeProps, type Node } from '@xyflow/react';
import { type NodeExecutionState } from '../BaseNode';
import type { ImageUpscaleNodeData } from '../../../../types/pipeline';
type UpscaleData = ImageUpscaleNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;
type UpscaleFlowNode = Node<UpscaleData, 'image:upscale'>;
export default function UpscaleNode(props: NodeProps<UpscaleFlowNode>): import("react").JSX.Element;
export {};
//# sourceMappingURL=UpscaleNode.d.ts.map
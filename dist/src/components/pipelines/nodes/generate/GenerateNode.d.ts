import { type NodeProps, type Node } from '@xyflow/react';
import { type NodeExecutionState } from '../BaseNode';
import type { ImageGenerateNodeData } from '../../../../types/pipeline';
type GenerateData = ImageGenerateNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;
type GenerateFlowNode = Node<GenerateData, 'image:generate'>;
export default function GenerateNode(props: NodeProps<GenerateFlowNode>): import("react").JSX.Element;
export {};
//# sourceMappingURL=GenerateNode.d.ts.map
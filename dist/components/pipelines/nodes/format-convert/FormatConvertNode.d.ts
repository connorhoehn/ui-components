import { type NodeProps, type Node } from '@xyflow/react';
import { type NodeExecutionState } from '../BaseNode';
import type { ImageFormatConvertNodeData } from '../../../../types/pipeline';
type FormatConvertData = ImageFormatConvertNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;
type FormatConvertFlowNode = Node<FormatConvertData, 'image:format-convert'>;
export default function FormatConvertNode(props: NodeProps<FormatConvertFlowNode>): import("react").JSX.Element;
export {};
//# sourceMappingURL=FormatConvertNode.d.ts.map
import { type NodeProps, type Node } from '@xyflow/react';
import { type NodeExecutionState } from '../BaseNode';
import type { ImageEditPromptNodeData } from '../../../../types/pipeline';
type EditPromptData = ImageEditPromptNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;
type EditPromptFlowNode = Node<EditPromptData, 'image:edit-prompt'>;
export default function EditPromptNode(props: NodeProps<EditPromptFlowNode>): import("react").JSX.Element;
export {};
//# sourceMappingURL=EditPromptNode.d.ts.map
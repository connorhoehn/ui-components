import { type NodeProps, type Node } from '@xyflow/react';
import { type NodeExecutionState } from '../BaseNode';
import type { KnowledgeBaseNodeData } from '../../../../types/pipeline';
type KBData = KnowledgeBaseNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;
type KBFlowNode = Node<KBData, 'knowledge-base'>;
export default function KnowledgeBaseNode({ id, data, selected }: NodeProps<KBFlowNode>): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=KnowledgeBaseNode.d.ts.map
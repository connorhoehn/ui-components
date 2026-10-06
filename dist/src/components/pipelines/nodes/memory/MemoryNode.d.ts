import { type NodeProps, type Node } from '@xyflow/react';
import { type NodeExecutionState } from '../BaseNode';
import type { MemoryNodeData } from '../../../../types/pipeline';
type MemData = MemoryNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;
type MemFlowNode = Node<MemData, 'memory'>;
export default function MemoryNode({ id, data, selected }: NodeProps<MemFlowNode>): import("react").JSX.Element;
export {};
//# sourceMappingURL=MemoryNode.d.ts.map
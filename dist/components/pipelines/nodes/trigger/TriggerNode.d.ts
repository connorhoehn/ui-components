import { type NodeProps, type Node } from '@xyflow/react';
import { type NodeExecutionState } from '../BaseNode';
import type { TriggerNodeData } from '../../../../types/pipeline';
type TriggerData = TriggerNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;
type TriggerFlowNode = Node<TriggerData, 'trigger'>;
export default function TriggerNode(props: NodeProps<TriggerFlowNode>): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=TriggerNode.d.ts.map
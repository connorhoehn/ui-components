import { type NodeProps, type Node } from '@xyflow/react';
import { type NodeExecutionState } from '../BaseNode';
import type { GuardrailNodeData } from '../../../../types/pipeline';
type GuardrailData = GuardrailNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;
type GuardrailFlowNode = Node<GuardrailData, 'guardrail'>;
export default function GuardrailNode({ id, data, selected }: NodeProps<GuardrailFlowNode>): import("react").JSX.Element;
export {};
//# sourceMappingURL=GuardrailNode.d.ts.map
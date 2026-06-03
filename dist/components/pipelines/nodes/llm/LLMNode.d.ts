import { type NodeProps, type Node } from '@xyflow/react';
import { type NodeExecutionState } from '../BaseNode';
import type { LLMNodeData } from '../../../../types/pipeline';
interface LLMResponseInfo {
    response: string;
    tokensIn?: number;
    tokensOut?: number;
    /** True while tokens are actively arriving (tokensOut > 0 and step still running). */
    streaming?: boolean;
    /**
     * True between `pipeline.llm.stream.opened` and the first token. Distinct
     * from `streaming` — this is the open-but-no-tokens window and is the
     * visual signal that latency is being measured. Cleared as soon as the
     * first token lands.
     */
    streamOpening?: boolean;
}
type LLMData = LLMNodeData & {
    _state?: NodeExecutionState;
    _llmResponse?: LLMResponseInfo;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;
type LLMFlowNode = Node<LLMData, 'llm'>;
export default function LLMNode(props: NodeProps<LLMFlowNode>): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=LLMNode.d.ts.map
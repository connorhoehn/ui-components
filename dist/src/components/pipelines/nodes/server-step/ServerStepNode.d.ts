import { type NodeProps, type Node } from '@xyflow/react';
import { type NodeExecutionState } from '../BaseNode';
export interface ServerStepNodeData extends Record<string, unknown> {
    /** The consumer-registered kind, e.g. `transcription:transcribe`. */
    type?: string;
    /** The canvas's copy of the kind; read when `type` is absent. */
    nodeType?: string;
    label?: string;
    /** A step the executor may skip without failing the run. */
    optional?: boolean;
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
}
type ServerStepFlowNode = Node<ServerStepNodeData, string>;
/** `transcription:transcribe` → `transcription`, the namespace the kind lives in. */
export declare function serverStepNamespace(kind: string): string | undefined;
export default function ServerStepNode(props: NodeProps<ServerStepFlowNode>): import("react").JSX.Element;
export {};
//# sourceMappingURL=ServerStepNode.d.ts.map
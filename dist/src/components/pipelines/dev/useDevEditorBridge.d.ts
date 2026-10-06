import type { NodeData, NodeType, PipelineDefinition } from '../../../types/pipeline';
declare global {
    interface Window {
        /** Dev-only imperative canvas bridge — see `DevEditorBridge` above. */
        __pipelineEditor?: unknown;
    }
}
interface BridgeDeps {
    addNode: (type: NodeType, position: {
        x: number;
        y: number;
    }) => string;
    addEdge: (edge: {
        source: string;
        sourceHandle: string;
        target: string;
        targetHandle: string;
    }) => string;
    updateNodeData: (id: string, patch: Partial<NodeData>) => void;
    getDefinition: () => PipelineDefinition | null;
}
export declare function useDevEditorBridge({ addNode, addEdge, updateNodeData, getDefinition, }: BridgeDeps): void;
export {};
//# sourceMappingURL=useDevEditorBridge.d.ts.map
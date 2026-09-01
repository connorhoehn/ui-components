import type { NodeData, NodeType, PipelineDefinition } from '../../../types/pipeline';
interface DevEditorBridge {
    insertNode: (type: NodeType, position?: {
        x: number;
        y: number;
    }) => string;
    connect: (sourceId: string, targetId: string, opts?: {
        sourceHandle?: string;
        targetHandle?: string;
    }) => string;
    updateNodeData: (id: string, patch: Partial<NodeData>) => void;
    getDefinition: () => PipelineDefinition | null;
    findNodeIdByType: (type: NodeType) => string | undefined;
}
declare global {
    interface Window {
        __pipelineEditor?: DevEditorBridge;
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
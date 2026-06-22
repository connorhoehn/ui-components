import { default as React } from 'react';
import { NodeData, NodeType, PipelineDefinition, PipelineEdge, PipelineNode } from '../../../types/pipeline';
export interface PipelineEditorValue {
    definition: PipelineDefinition | null;
    dirty: boolean;
    selectedNodeId: string | null;
    setSelectedNodeId: (id: string | null) => void;
    addNode: (type: NodeType, position: {
        x: number;
        y: number;
    }) => string;
    updateNode: (id: string, patch: Partial<PipelineNode>) => void;
    updateNodeData: (id: string, patch: Partial<NodeData>) => void;
    removeNode: (id: string) => void;
    duplicateNodes: (ids: string[]) => string[];
    addEdge: (edge: Omit<PipelineEdge, 'id'>) => string;
    removeEdge: (id: string) => void;
    setPositions: (updates: Array<{
        id: string;
        position: {
            x: number;
            y: number;
        };
    }>) => void;
    save: () => void;
    publish: () => void;
    revert: () => void;
    undo: () => void;
    redo: () => void;
    canUndo: boolean;
    canRedo: boolean;
    /**
     * Rename the pipeline. Metadata-only mutation — not tracked by undo/redo
     * (consistent with the top-level contract that history covers nodes/edges).
     */
    rename: (name: string) => void;
    /** Set the pipeline icon (emoji). Metadata-only, not tracked by undo/redo. */
    setIcon: (icon: string) => void;
    /** Replace the pipeline's tag list. Metadata-only, not tracked by undo/redo. */
    setTags: (tags: string[]) => void;
}
export declare const PipelineEditorContext: React.Context<PipelineEditorValue | null>;
export interface PipelineEditorProviderProps {
    pipelineId: string;
    children: React.ReactNode;
}
export declare function PipelineEditorProvider({ pipelineId, children, }: PipelineEditorProviderProps): React.JSX.Element;
export declare function usePipelineEditor(): PipelineEditorValue;
//# sourceMappingURL=PipelineEditorContext.d.ts.map
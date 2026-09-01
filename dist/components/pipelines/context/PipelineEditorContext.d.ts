import React from 'react';
import type { NodeData, NodeType, PipelineDefinition, PipelineEdge, PipelineNode } from '../../../types/pipeline';
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
    /**
     * Reason the most recent remote persist failed, or `null` when the last
     * write succeeded. Additive — a rejected `savePipeline` used to be an
     * unhandled promise rejection with no user-visible trace, so the editor
     * showed "Saving…" forever while the server had refused the write.
     * `dirty` stays set while this is non-null: nothing is discarded, and the
     * next edit (or teardown) retries exactly once. Never retried on a timer —
     * a 403 would spin against the server forever.
     */
    saveError: string | null;
    /** Dismiss `saveError`. Does not clear `dirty` and does not retry. */
    clearSaveError: () => void;
    /**
     * Why the last `publish()` failed, or `null`. Additive (v2.95.0).
     *
     * `publish()` returns `void` and used to swallow its outcome entirely, so
     * `PipelineEditorPage` fired an unconditional green "Pipeline published"
     * toast — including when the POST never landed and the pipeline was still
     * a draft. A caller cannot act on an outcome it is never told about.
     */
    publishError: string | null;
    /** Dismiss `publishError`. Additive (v2.95.0). */
    clearPublishError: () => void;
    /**
     * ISO timestamp of the last SUCCESSFUL publish, or `null`. Changes on every
     * success so a caller can confirm one actually happened. Additive (v2.95.0).
     */
    publishedAt: string | null;
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
import type { MutableRefObject } from 'react';
import type { Edge, Node } from '@xyflow/react';
import type { PipelineDefinition } from '../../../types/pipeline';
interface UseCanvasKeyboardParams {
    definition: PipelineDefinition | null;
    selectedNodeId: string | null;
    setSelectedNodeId: (id: string | null) => void;
    removeNode: (id: string) => void;
    removeDefEdge: (id: string) => void;
    /**
     * Current canvas nodes/edges. Read through a ref inside the hook so the
     * keydown handler can compute a nudge or an edge deletion *without* doing
     * that work inside a `setNodes`/`setEdges` updater — React double-invokes
     * updaters in dev, and both paths call back into the pipeline definition.
     * Passing them here keeps the effect's dep array stable.
     */
    nodes: Node[];
    edges: Edge[];
    setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
    setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
    setPositions: (positions: Array<{
        id: string;
        position: {
            x: number;
            y: number;
        };
    }>) => void;
    duplicateNodes: (ids: string[]) => string[];
    clipboardRef: MutableRefObject<string | null>;
    containerRef: MutableRefObject<HTMLDivElement | null>;
}
export declare function useCanvasKeyboard({ definition, selectedNodeId, setSelectedNodeId, removeNode, removeDefEdge, nodes, edges, setNodes, setEdges, setPositions, duplicateNodes, clipboardRef, containerRef, }: UseCanvasKeyboardParams): void;
export {};
//# sourceMappingURL=useCanvasKeyboard.d.ts.map
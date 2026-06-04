import type { MutableRefObject } from 'react';
import type { Edge, Node } from '@xyflow/react';
import type { PipelineDefinition } from '../../../types/pipeline';
interface UseCanvasKeyboardParams {
    definition: PipelineDefinition | null;
    selectedNodeId: string | null;
    setSelectedNodeId: (id: string | null) => void;
    removeNode: (id: string) => void;
    removeDefEdge: (id: string) => void;
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
export declare function useCanvasKeyboard({ definition, selectedNodeId, setSelectedNodeId, removeNode, removeDefEdge, setNodes, setEdges, setPositions, duplicateNodes, clipboardRef, containerRef, }: UseCanvasKeyboardParams): void;
export {};
//# sourceMappingURL=useCanvasKeyboard.d.ts.map
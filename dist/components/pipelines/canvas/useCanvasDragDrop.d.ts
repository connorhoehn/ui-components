import type { DragEvent } from 'react';
import type { NodeType } from '../../../types/pipeline';
export interface UseCanvasDragDropParams {
    addNode: (type: NodeType, position: {
        x: number;
        y: number;
    }) => void;
    screenToFlowPosition: (coords: {
        x: number;
        y: number;
    }) => {
        x: number;
        y: number;
    };
}
export interface UseCanvasDragDropReturn {
    handleDragOver: (e: DragEvent<HTMLDivElement>) => void;
    handleDrop: (e: DragEvent<HTMLDivElement>) => void;
}
/**
 * Hook handling drag-and-drop of nodes from the palette onto the canvas.
 * Reads the `application/reactflow` MIME type from the DataTransfer, parses
 * the node type, converts the screen coordinates to flow-space, and calls
 * `addNode` to place the new node.
 */
export declare function useCanvasDragDrop({ addNode, screenToFlowPosition, }: UseCanvasDragDropParams): UseCanvasDragDropReturn;
//# sourceMappingURL=useCanvasDragDrop.d.ts.map
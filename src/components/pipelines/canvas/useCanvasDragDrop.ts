import { useCallback } from 'react';
import type { DragEvent } from 'react';
import type { NodeType } from '../../../types/pipeline';

export interface UseCanvasDragDropParams {
  addNode: (type: NodeType, position: { x: number; y: number }) => void;
  screenToFlowPosition: (coords: { x: number; y: number }) => { x: number; y: number };
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
export function useCanvasDragDrop({
  addNode,
  screenToFlowPosition,
}: UseCanvasDragDropParams): UseCanvasDragDropReturn {
  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const raw = e.dataTransfer.getData('application/reactflow');
      if (!raw) return;
      let parsed: { nodeType?: string } | null = null;
      try {
        parsed = JSON.parse(raw) as { nodeType?: string };
      } catch {
        return;
      }
      const nodeType = parsed?.nodeType as NodeType | undefined;
      if (!nodeType) return;
      const position = screenToFlowPosition({
        x: e.clientX,
        y: e.clientY,
      });
      addNode(nodeType, position);
    },
    [addNode, screenToFlowPosition],
  );

  return { handleDragOver, handleDrop };
}

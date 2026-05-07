import { useEffect } from 'react';
import type { MutableRefObject } from 'react';
import type { Edge, Node } from '@xyflow/react';
import type { PipelineDefinition } from '../../../types/pipeline';
import { isEditableTarget, topologicalNodeOrder } from './PipelineCanvas';

interface UseCanvasKeyboardParams {
  definition: PipelineDefinition | null;
  selectedNodeId: string | null;
  setSelectedNodeId: (id: string | null) => void;
  removeNode: (id: string) => void;
  removeDefEdge: (id: string) => void;
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  setPositions: (positions: Array<{ id: string; position: { x: number; y: number } }>) => void;
  duplicateNodes: (ids: string[]) => string[];
  clipboardRef: MutableRefObject<string | null>;
  containerRef: MutableRefObject<HTMLDivElement | null>;
}

export function useCanvasKeyboard({
  definition,
  selectedNodeId,
  setSelectedNodeId,
  removeNode,
  removeDefEdge,
  setNodes,
  setEdges,
  setPositions,
  duplicateNodes,
  clipboardRef,
  containerRef,
}: UseCanvasKeyboardParams): void {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const focusNodeById = (id: string) => {
      const wrapper = container.querySelector<HTMLElement>(
        `.react-flow__node[data-id="${CSS.escape(id)}"]`,
      );
      if (!wrapper) return false;
      const inner = wrapper.querySelector<HTMLElement>('[data-pipeline-node="true"]');
      (inner ?? wrapper).focus();
      return true;
    };

    const onKey = (e: KeyboardEvent) => {
      if (isEditableTarget(e.target)) return;
      const active = document.activeElement as HTMLElement | null;
      const focusInCanvas = !!active && container.contains(active);

      if (e.key === 'Tab') {
        if (!focusInCanvas) return;
        if (!definition || definition.nodes.length === 0) return;
        const order = topologicalNodeOrder(definition);
        if (order.length === 0) return;
        const currentWrapper = active?.closest<HTMLElement>('.react-flow__node');
        const currentId = currentWrapper?.getAttribute('data-id') ?? null;
        const currentIdx = currentId !== null ? order.indexOf(currentId) : -1;
        const delta = e.shiftKey ? -1 : 1;
        const nextIdx = currentIdx === -1
          ? (e.shiftKey ? order.length - 1 : 0)
          : (currentIdx + delta + order.length) % order.length;
        const nextId = order[nextIdx];
        if (focusNodeById(nextId)) {
          e.preventDefault();
        }
        return;
      }

      if (!focusInCanvas) return;

      if (e.altKey) return;

      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
        const wrapper = active?.closest<HTMLElement>('.react-flow__node');
        const id = wrapper?.getAttribute('data-id');
        if (id) {
          e.preventDefault();
          setSelectedNodeId(id);
        }
        return;
      }

      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selectedNodeId) {
          e.preventDefault();
          removeNode(selectedNodeId);
          return;
        }
        setEdges((curr) => {
          const selected = curr.filter((edge) => edge.selected);
          if (selected.length === 0) return curr;
          for (const edge of selected) removeDefEdge(edge.id);
          return curr.filter((edge) => !edge.selected);
        });
        e.preventDefault();
        return;
      }

      if (e.key === 'Escape') {
        e.preventDefault();
        setSelectedNodeId(null);
        return;
      }

      if ((e.metaKey || e.ctrlKey) && e.key === 'c' && selectedNodeId) {
        e.preventDefault();
        clipboardRef.current = selectedNodeId;
        return;
      }

      if ((e.metaKey || e.ctrlKey) && e.key === 'v' && clipboardRef.current) {
        e.preventDefault();
        const newIds = duplicateNodes([clipboardRef.current]);
        if (newIds.length > 0) setSelectedNodeId(newIds[0]);
        return;
      }

      if ((e.metaKey || e.ctrlKey) && e.key === 'd' && selectedNodeId) {
        e.preventDefault();
        const newIds = duplicateNodes([selectedNodeId]);
        if (newIds.length > 0) setSelectedNodeId(newIds[0]);
        return;
      }

      if (
        e.key === 'ArrowUp' ||
        e.key === 'ArrowDown' ||
        e.key === 'ArrowLeft' ||
        e.key === 'ArrowRight'
      ) {
        e.preventDefault();
        e.stopPropagation();
        if (!e.shiftKey) return;
        if (!selectedNodeId) return;
        const NUDGE = 8;
        const dx =
          e.key === 'ArrowLeft' ? -NUDGE : e.key === 'ArrowRight' ? NUDGE : 0;
        const dy =
          e.key === 'ArrowUp' ? -NUDGE : e.key === 'ArrowDown' ? NUDGE : 0;
        setNodes((curr) => {
          const next = curr.map((n) =>
            n.id === selectedNodeId
              ? {
                  ...n,
                  position: {
                    x: n.position.x + dx,
                    y: n.position.y + dy,
                  },
                }
              : n,
          );
          const moved = next.find((n) => n.id === selectedNodeId);
          if (moved) {
            setPositions([{ id: moved.id, position: moved.position }]);
          }
          return next;
        });
      }
    };

    container.addEventListener('keydown', onKey);
    return () => container.removeEventListener('keydown', onKey);
  }, [definition, selectedNodeId, setSelectedNodeId, removeNode, removeDefEdge, setNodes, setEdges, setPositions, duplicateNodes, clipboardRef, containerRef]);
}

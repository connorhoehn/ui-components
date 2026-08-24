import { useEffect, useRef } from 'react';
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
  nodes,
  edges,
  setNodes,
  setEdges,
  setPositions,
  duplicateNodes,
  clipboardRef,
  containerRef,
}: UseCanvasKeyboardParams): void {
  const nodesRef = useRef(nodes);
  nodesRef.current = nodes;
  const edgesRef = useRef(edges);
  edgesRef.current = edges;

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
        // StrictMode safety: `removeDefEdge` (which commits to the pipeline
        // definition and pushes an undo frame) used to run inside this
        // updater, which React double-invokes in dev — so deleting one edge
        // pushed two undo frames and a single Ctrl+Z appeared to do nothing.
        // Read the selection from the ref, mutate the definition once, then
        // enqueue a pure filter.
        const selected = edgesRef.current.filter((edge) => edge.selected);
        if (selected.length > 0) {
          for (const edge of selected) removeDefEdge(edge.id);
          setEdges((curr) => curr.filter((edge) => !edge.selected));
        }
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
        // StrictMode safety: `setPositions` — which writes the pipeline
        // definition and persists to localStorage — used to be called from
        // inside this updater, so every arrow-key nudge persisted twice in
        // dev. Compute the moved node from the ref and persist once.
        const target = nodesRef.current.find((n) => n.id === selectedNodeId);
        if (!target) return;
        const position = { x: target.position.x + dx, y: target.position.y + dy };
        setNodes((curr) =>
          curr.map((n) => (n.id === selectedNodeId ? { ...n, position } : n)),
        );
        setPositions([{ id: selectedNodeId, position }]);
      }
    };

    container.addEventListener('keydown', onKey);
    return () => container.removeEventListener('keydown', onKey);
  }, [definition, selectedNodeId, setSelectedNodeId, removeNode, removeDefEdge, setNodes, setEdges, setPositions, duplicateNodes, clipboardRef, containerRef]);
}

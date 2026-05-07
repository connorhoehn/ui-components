import { useEffect } from 'react';
import type { MutableRefObject } from 'react';
import type { NodeType, PipelineDefinition } from '../../../types/pipeline';
import { isEditableTarget } from './PipelineCanvas';
import { PALETTE_ITEMS } from './NodePalette';

export interface QuickInsertLayerProps {
  definition: PipelineDefinition | null;
  addNode: (type: NodeType, position: { x: number; y: number }) => void;
  screenToFlowPosition: (coords: { x: number; y: number }) => { x: number; y: number };
  containerRef: MutableRefObject<HTMLDivElement | null>;
}

export default function QuickInsertLayer({
  definition,
  addNode,
  screenToFlowPosition,
  containerRef,
}: QuickInsertLayerProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isEditableTarget(e.target)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (/^[1-8]$/.test(e.key)) {
        const idx = Number(e.key) - 1;
        const entry = PALETTE_ITEMS[idx];
        if (!entry) return;
        if (
          entry.type === 'trigger' &&
          definition?.nodes.some((n) => n.type === 'trigger')
        ) {
          return;
        }
        const container = containerRef.current;
        const rect = container?.getBoundingClientRect();
        const center = rect
          ? screenToFlowPosition({
              x: rect.left + rect.width / 2,
              y: rect.top + rect.height / 2,
            })
          : { x: 0, y: 0 };
        let { x, y } = center;
        if (definition) {
          for (const n of definition.nodes) {
            if (Math.abs(n.position.x - x) < 16 && Math.abs(n.position.y - y) < 16) {
              x += 24;
              y += 24;
            }
          }
        }
        addNode(entry.type, { x, y });
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [addNode, definition, screenToFlowPosition, containerRef]);

  return null;
}

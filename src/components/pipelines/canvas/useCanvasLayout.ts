import { useCallback } from 'react';
import type { PipelineDefinition } from '../../../types/pipeline';
import { autoArrange } from './autoArrange';

export interface UseCanvasLayoutParams {
  definition: PipelineDefinition | null;
  setPositions: (positions: Array<{ id: string; position: { x: number; y: number } }>) => void;
  fitView: (opts?: { padding?: number; duration?: number }) => void;
}

export interface UseCanvasLayoutReturn {
  handleFitView: () => void;
  handleAutoArrange: () => void;
}

/**
 * Hook for auto-layout algorithms and viewport fitting. Wraps the
 * autoArrange algorithm and fitView API into stable callbacks that can be
 * passed to toolbar buttons or keyboard shortcuts.
 */
export function useCanvasLayout({
  definition,
  setPositions,
  fitView,
}: UseCanvasLayoutParams): UseCanvasLayoutReturn {
  const handleFitView = useCallback(() => {
    fitView({ padding: 0.15, duration: 500 });
  }, [fitView]);

  const handleAutoArrange = useCallback(() => {
    if (!definition) return;
    const positions = autoArrange(definition);
    if (positions.length === 0) return;
    setPositions(positions);
    if (typeof requestAnimationFrame === 'function') {
      requestAnimationFrame(() => fitView({ padding: 0.15, duration: 500 }));
    } else {
      fitView({ padding: 0.15, duration: 500 });
    }
  }, [definition, setPositions, fitView]);

  return { handleFitView, handleAutoArrange };
}

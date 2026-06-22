import { PipelineDefinition } from '../../../types/pipeline';
export interface UseCanvasLayoutParams {
    definition: PipelineDefinition | null;
    setPositions: (positions: Array<{
        id: string;
        position: {
            x: number;
            y: number;
        };
    }>) => void;
    fitView: (opts?: {
        padding?: number;
        duration?: number;
    }) => void;
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
export declare function useCanvasLayout({ definition, setPositions, fitView, }: UseCanvasLayoutParams): UseCanvasLayoutReturn;
//# sourceMappingURL=useCanvasLayout.d.ts.map
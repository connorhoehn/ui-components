import type { PipelineDefinition } from '../../../types/pipeline';
export interface CanvasToolbarProps {
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
export default function CanvasToolbar({ definition, setPositions, fitView, }: CanvasToolbarProps): import("react").JSX.Element;
//# sourceMappingURL=CanvasToolbar.d.ts.map
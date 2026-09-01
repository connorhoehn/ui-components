import '@xyflow/react/dist/style.css';
import type { PipelineDefinition } from '../../../types/pipeline';
export declare function isEditableTarget(el: EventTarget | null): boolean;
export declare function topologicalNodeOrder(def: PipelineDefinition): string[];
export interface PipelineCanvasProps {
    onFilterLog?: (nodeId: string) => void;
    errorNodeId?: string | null;
    onErrorNodePosition?: (pos: {
        x: number;
        y: number;
    } | null) => void;
    replayEdgeStates?: Record<string, string>;
    replayNodeClasses?: Record<string, string>;
    breakpoints?: Set<string>;
    onToggleBreakpoint?: (nodeId: string) => void;
    pausedAtNodeId?: string | null;
}
export default function PipelineCanvas({ onFilterLog, errorNodeId, onErrorNodePosition, replayEdgeStates, replayNodeClasses, breakpoints, onToggleBreakpoint, pausedAtNodeId }?: PipelineCanvasProps): import("react").JSX.Element;
//# sourceMappingURL=PipelineCanvas.d.ts.map
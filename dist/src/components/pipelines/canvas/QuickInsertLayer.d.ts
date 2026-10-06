import type { MutableRefObject } from 'react';
import type { NodeType, PipelineDefinition } from '../../../types/pipeline';
export interface QuickInsertLayerProps {
    definition: PipelineDefinition | null;
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
    containerRef: MutableRefObject<HTMLDivElement | null>;
}
export default function QuickInsertLayer({ definition, addNode, screenToFlowPosition, containerRef, }: QuickInsertLayerProps): null;
//# sourceMappingURL=QuickInsertLayer.d.ts.map
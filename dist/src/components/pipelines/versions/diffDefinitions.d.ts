import { PipelineDefinition, PipelineNode } from '../../../types/pipeline';
export interface NodeDiffRow {
    node: PipelineNode;
    /** True when the node's `data` field changed. */
    dataChanged: boolean;
    /** True when only `position` changed (and nothing else). */
    positionChanged: boolean;
}
export interface DefinitionDiff {
    addedNodes: NodeDiffRow[];
    removedNodes: NodeDiffRow[];
    modifiedNodes: NodeDiffRow[];
    addedEdges: number;
    removedEdges: number;
    nameChanged: boolean;
    previousName?: string;
    iconChanged: boolean;
    previousIcon?: string;
    tagsChanged: boolean;
    tagsAdded: string[];
    tagsRemoved: string[];
}
export declare function diffDefinitions(current: PipelineDefinition, published: PipelineDefinition | null): DefinitionDiff;
//# sourceMappingURL=diffDefinitions.d.ts.map
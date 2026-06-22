import { PipelineDefinition } from '../../../types/pipeline';
export interface ArrangedPosition {
    id: string;
    position: {
        x: number;
        y: number;
    };
}
export interface AutoArrangeOptions {
    /** Horizontal spacing between depth layers. Default 280. */
    layerSpacingX?: number;
    /** Vertical spacing between siblings within a layer. Default 120. */
    nodeSpacingY?: number;
    /** Origin x for depth-0. Default 40. */
    startX?: number;
    /** Vertical centerline for each layer. Default 40. */
    startY?: number;
}
/**
 * Compute new positions for every node by BFS depth from the Trigger.
 *
 * - Depth 0 = trigger (or first node if no trigger exists)
 * - Each depth layer occupies a column to the right of the previous layer
 * - Nodes within a layer are sorted by id and distributed vertically,
 *   centered around `startY` with `nodeSpacingY` between adjacent siblings
 * - Orphans (nodes unreachable from the trigger) are placed in their own
 *   column at depth `maxDepth + 1`
 * - Empty pipeline → returns []
 * - No trigger → all nodes treated as orphans, single column at `startX`
 *
 * Pure function; deterministic for a given input.
 */
export declare function autoArrange(def: PipelineDefinition, opts?: AutoArrangeOptions): ArrangedPosition[];
//# sourceMappingURL=autoArrange.d.ts.map
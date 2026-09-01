import { type ContextPath, type ImageRefOption } from './upstreamContext';
export interface UpstreamContext {
    /** Paths available at this node, nearest upstream first. */
    paths: ContextPath[];
    /** Paths a template references that nothing upstream provides. */
    unresolved: (template: string) => string[];
}
/**
 * Context paths available at `nodeId`, recomputed when the graph changes.
 *
 * Returns an empty set when `nodeId` is null so a panel can call this
 * unconditionally without branching on selection.
 */
export declare function useUpstreamContext(nodeId: string | null): UpstreamContext;
/**
 * Image references reachable from `nodeId`, for the `imageRefPath` field on
 * image/vision nodes.
 *
 * Replaces the hardcoded `IMAGE_REF_SAMPLES` lists that 18 config panels
 * carried, which named nodes ("upload", "crop") that need not exist.
 */
export declare function useUpstreamImageRefs(nodeId: string | null): ImageRefOption[];
//# sourceMappingURL=useUpstreamContext.d.ts.map
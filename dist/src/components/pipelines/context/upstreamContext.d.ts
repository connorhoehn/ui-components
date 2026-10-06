import type { PipelineNode, PipelineEdge } from '../../../types/pipeline';
/** One `{{context.*}}` path an author can insert, and where it comes from. */
export interface ContextPath {
    /** Template path WITHOUT braces, e.g. `context.steps.step-2.output`. */
    path: string;
    /** Human label for the contributing node, e.g. "Classify (llm)". */
    source: string;
    /** Node id that contributes it, for click-to-reveal in the canvas. */
    sourceNodeId: string;
    /** What the value is, shown as help text next to the pill. */
    description: string;
    /** Rough shape, so a panel can hint at usage without executing anything. */
    kind: 'string' | 'number' | 'boolean' | 'object' | 'array' | 'image';
}
/**
 * What a node writes into the run context.
 *
 * Keyed by node type. `outputKey` on the node's data overrides the default
 * location for the types that support it (transform, action, and the vision
 * family), which is why this takes the node rather than just the type.
 */
export declare function contextContributions(node: PipelineNode): ContextPath[];
/**
 * Node ids strictly upstream of `targetId`, nearest first.
 *
 * Breadth-first over reversed edges. Cycle-safe: a visited set means a loop in
 * the graph terminates instead of hanging the editor.
 */
export declare function upstreamNodeIds(edges: readonly PipelineEdge[], targetId: string): string[];
/**
 * Every `{{context.*}}` path available at `targetId`, nearest upstream first.
 *
 * `context.trigger` is always included even when the trigger isn't wired yet —
 * the executor always provides it, and omitting it would make a fresh graph
 * look like it has no context at all.
 */
export declare function availableContextPaths(nodes: readonly PipelineNode[], edges: readonly PipelineEdge[], targetId: string): ContextPath[];
/**
 * Paths a template references that nothing upstream provides.
 *
 * This is the authoring-time signal that was missing: a typo or a path from a
 * node that isn't wired in yet shows up here instead of failing at run time.
 */
export declare function unresolvedTemplatePaths(template: string, available: readonly ContextPath[]): string[];
/** A JSONPath an image-consuming node can point `imageRefPath` at. */
export interface ImageRefOption {
    /** JSONPath as the executor resolves it, e.g. `$.steps.crop-1.output.imageId`. */
    path: string;
    /** Human label for the producing node. */
    source: string;
    sourceNodeId: string;
}
/**
 * Image references actually reachable from `targetId`, nearest upstream first.
 *
 * Replaces the hardcoded sample lists that 18 image/vision config panels
 * carried (`$.steps.upload.output.imageId`, `$.steps.crop.output.imageId`) —
 * paths naming nodes that need not exist in the user's graph. An author picking
 * one got a reference that silently resolved to nothing at run time.
 *
 * `$.trigger.imageRef` is always offered: the executor supplies it whenever a
 * run is started with an image, independent of the graph.
 */
export declare function availableImageRefs(nodes: readonly PipelineNode[], edges: readonly PipelineEdge[], targetId: string): ImageRefOption[];
//# sourceMappingURL=upstreamContext.d.ts.map
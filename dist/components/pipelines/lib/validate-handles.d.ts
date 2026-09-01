/**
 * Handle validation utilities for pipeline edges.
 *
 * Helps catch invalid handle IDs at development time before they cause silent
 * execution failures. See NODE_HANDLES.md for the full handle naming reference.
 */
import type { Edge, Node } from '@xyflow/react';
/**
 * Validate that an edge's source and target handles exist on their respective nodes.
 *
 * @param edge - The edge to validate
 * @param nodes - All nodes in the pipeline (needed to look up node types and data)
 * @returns An error message if invalid, or null if valid
 */
export declare function validateEdgeHandles(edge: Edge, nodes: Node[]): string | null;
/**
 * Validate all edges in a pipeline definition.
 *
 * Returns an array of validation error messages. Empty array = all edges valid.
 * Use in dev mode to catch handle mismatches before execution:
 *
 * @example
 * ```typescript
 * const errors = validateAllEdges(edges, nodes);
 * if (errors.length > 0 && process.env.NODE_ENV === 'development') {
 *   console.warn('Pipeline validation warnings:', errors);
 * }
 * ```
 */
export declare function validateAllEdges(edges: Edge[], nodes: Node[]): string[];
//# sourceMappingURL=validate-handles.d.ts.map
/**
 * Handle validation utilities for pipeline edges.
 *
 * Helps catch invalid handle IDs at development time before they cause silent
 * execution failures. See NODE_HANDLES.md for the full handle naming reference.
 */

import type { Edge, Node } from 'reactflow';

/**
 * Map of node types to their valid source and target handle IDs.
 */
const NODE_HANDLE_MAP: Record<string, { source: string[]; target: string[] }> = {
  trigger: {
    source: ['out'],
    target: [],
  },
  llm: {
    source: ['out'],
    target: ['in'],
  },
  action: {
    source: ['out'],
    target: ['in'],
  },
  transform: {
    source: ['out'],
    target: ['in'],
  },
  approval: {
    source: ['approved', 'rejected'],
    target: ['in'],
  },
  condition: {
    source: ['true', 'false'],
    target: ['in'],
  },
  fork: {
    // Fork handles are dynamic: branch-0, branch-1, ... up to branchCount
    source: [], // validated dynamically
    target: ['in'],
  },
  join: {
    // Join handles are dynamic: in-0, in-1, ... up to inputCount
    source: ['out'],
    target: [], // validated dynamically
  },
};

/**
 * Validate that an edge's source and target handles exist on their respective nodes.
 *
 * @param edge - The edge to validate
 * @param nodes - All nodes in the pipeline (needed to look up node types and data)
 * @returns An error message if invalid, or null if valid
 */
export function validateEdgeHandles(edge: Edge, nodes: Node[]): string | null {
  const sourceNode = nodes.find((n) => n.id === edge.source);
  const targetNode = nodes.find((n) => n.id === edge.target);

  if (!sourceNode) {
    return `Edge ${edge.id}: source node ${edge.source} not found`;
  }
  if (!targetNode) {
    return `Edge ${edge.id}: target node ${edge.target} not found`;
  }

  const sourceType = sourceNode.type ?? 'unknown';
  const targetType = targetNode.type ?? 'unknown';

  const sourceHandleId = edge.sourceHandle ?? 'out'; // ReactFlow defaults to 'out'
  const targetHandleId = edge.targetHandle ?? 'in'; // ReactFlow defaults to 'in'

  // Validate source handle
  const sourceValidation = validateSourceHandle(sourceNode, sourceHandleId);
  if (sourceValidation) {
    return `Edge ${edge.id}: ${sourceValidation}`;
  }

  // Validate target handle
  const targetValidation = validateTargetHandle(targetNode, targetHandleId);
  if (targetValidation) {
    return `Edge ${edge.id}: ${targetValidation}`;
  }

  return null;
}

function validateSourceHandle(node: Node, handleId: string): string | null {
  const nodeType = node.type ?? 'unknown';
  const spec = NODE_HANDLE_MAP[nodeType];

  if (!spec) {
    // Unknown node type — skip validation
    return null;
  }

  // Special case: Fork has dynamic branch handles
  if (nodeType === 'fork') {
    const branchCount = (node.data?.branchCount as number) ?? 2;
    for (let i = 0; i < branchCount; i++) {
      if (handleId === `branch-${i}`) {
        return null;
      }
    }
    return `source handle '${handleId}' not found on fork node (valid: branch-0 to branch-${branchCount - 1})`;
  }

  // Standard validation
  if (!spec.source.includes(handleId)) {
    return `source handle '${handleId}' not found on ${nodeType} node (valid: ${spec.source.join(', ')})`;
  }

  return null;
}

function validateTargetHandle(node: Node, handleId: string): string | null {
  const nodeType = node.type ?? 'unknown';
  const spec = NODE_HANDLE_MAP[nodeType];

  if (!spec) {
    // Unknown node type — skip validation
    return null;
  }

  // Special case: Join has dynamic input handles
  if (nodeType === 'join') {
    const inputCount = (node.data?.inputCount as number) ?? 2;
    for (let i = 0; i < inputCount; i++) {
      if (handleId === `in-${i}`) {
        return null;
      }
    }
    return `target handle '${handleId}' not found on join node (valid: in-0 to in-${inputCount - 1})`;
  }

  // Standard validation
  if (!spec.target.includes(handleId)) {
    return `target handle '${handleId}' not found on ${nodeType} node (valid: ${spec.target.join(', ')})`;
  }

  return null;
}

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
export function validateAllEdges(edges: Edge[], nodes: Node[]): string[] {
  const errors: string[] = [];
  for (const edge of edges) {
    const error = validateEdgeHandles(edge, nodes);
    if (error) {
      errors.push(error);
    }
  }
  return errors;
}

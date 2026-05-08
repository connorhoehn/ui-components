// frontend/src/components/pipelines/validation/handleCompatibility.ts
//
// Handle-compatibility check used by React Flow's `isValidConnection` and by
// pipeline validation. Encodes the handle table from PIPELINES_PLAN.md §5.
// Pure — no side effects, no React.

import type { NodeType } from '../../../types/pipeline';

// ---------------------------------------------------------------------------
// Per-type handle sets
// ---------------------------------------------------------------------------

/** Valid output handle ids for each node type. */
const OUTPUT_HANDLES: Record<NodeType, readonly string[] | 'fork'> = {
  trigger: ['out'],
  llm: ['out', 'error'],
  transform: ['out'],
  condition: ['true', 'false'],
  action: ['out', 'error'],
  fork: 'fork', // dynamic: 'branch-0'..'branch-(N-1)'
  join: ['out'],
  approval: ['approved', 'rejected'],
  agent: ['out', 'error'],
  'mcp-tool': ['out', 'error'],
  'knowledge-base': ['out', 'error'],
  'graph-query': ['out', 'error'],
  memory: ['out', 'error'],
  guardrail: ['pass', 'block'],
  policy: ['allow', 'deny'],
  'ag-ui-output': [],
};

/** Valid input handle ids for each node type. `null` means the type has no input. */
const INPUT_HANDLES: Record<NodeType, readonly string[] | 'join' | null> = {
  trigger: null, // Trigger has no inputs — never a target
  llm: ['in'],
  transform: ['in'],
  condition: ['in'],
  action: ['in'],
  fork: ['in'],
  join: 'join', // dynamic: 'in-0'..'in-(N-1)'
  approval: ['in'],
  agent: ['in'],
  'mcp-tool': ['in'],
  'knowledge-base': ['in'],
  'graph-query': ['in'],
  memory: ['in'],
  guardrail: ['in'],
  policy: ['in'],
  'ag-ui-output': ['in'],
};

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/** True iff (sourceType, sourceHandle) → (targetType, targetHandle) is a valid edge per §5. */
export function isValidHandleConnection(
  sourceType: NodeType,
  sourceHandle: string,
  targetType: NodeType,
  targetHandle: string,
): boolean {
  if (!isValidOutputHandle(sourceType, sourceHandle)) return false;
  if (!isValidInputHandle(targetType, targetHandle)) return false;
  return true;
}

// ---------------------------------------------------------------------------
// Internals
// ---------------------------------------------------------------------------

function isValidOutputHandle(type: NodeType, handle: string): boolean {
  const spec = OUTPUT_HANDLES[type];
  if (spec === 'fork') return isForkBranchHandle(handle);
  return spec.includes(handle);
}

function isValidInputHandle(type: NodeType, handle: string): boolean {
  const spec = INPUT_HANDLES[type];
  if (spec === null) return false; // Trigger — no inputs
  if (spec === 'join') return isJoinInputHandle(handle);
  return spec.includes(handle);
}

function isForkBranchHandle(handle: string): boolean {
  // 'branch-0', 'branch-1', ... 'branch-<non-negative int>'
  const match = /^branch-(\d+)$/.exec(handle);
  return match !== null;
}

function isJoinInputHandle(handle: string): boolean {
  // 'in-0', 'in-1', ... 'in-<non-negative int>'
  const match = /^in-(\d+)$/.exec(handle);
  return match !== null;
}

# Pipeline Node Handle Naming Conventions

This document describes the handle ID conventions for each pipeline node type. Handles are the connection points on nodes where edges can attach.

## Why This Matters

When creating edges programmatically (e.g., in E2E tests or via the pipeline editor API), you must specify the correct `sourceHandle` and `targetHandle` IDs. Using incorrect handle IDs will create edges that don't render or execute correctly.

## Handle ID Reference

### Standard Single-Output Nodes

Most nodes use a single output handle with ID `'out'`.

| Node Type | Target Handle(s) | Source Handle(s) |
|-----------|------------------|------------------|
| **Trigger** | N/A (no inputs) | `out` |
| **LLM** | `in` | `out` |
| **Action** | `in` | `out` |
| **Transform** | `in` | `out` |

**Example edge creation:**
```typescript
// Connect Trigger → LLM
editor.connect(triggerId, llmId);
// equivalent to:
editor.connect(triggerId, llmId, { sourceHandle: 'out', targetHandle: 'in' });
```

---

### Conditional Branching Nodes

#### ApprovalNode

Uses **two source handles** for approved/rejected paths:

| Target Handle(s) | Source Handle(s) |
|------------------|------------------|
| `in` | `approved`, `rejected` |

**Example:**
```typescript
// Approved path
editor.connect(approvalId, nextNodeId, { sourceHandle: 'approved' });

// Rejected path  
editor.connect(approvalId, errorHandlerId, { sourceHandle: 'rejected' });
```

**⚠️ Common mistake:** Using default `'out'` handle for ApprovalNode creates an invalid edge that won't execute.

---

#### ConditionNode

Uses **two source handles** for true/false branches:

| Target Handle(s) | Source Handle(s) |
|------------------|------------------|
| `in` | `true`, `false` |

**Example:**
```typescript
// True branch
editor.connect(conditionId, truePathNodeId, { sourceHandle: 'true' });

// False branch
editor.connect(conditionId, falsePathNodeId, { sourceHandle: 'false' });
```

---

### Parallel Execution Nodes

#### ForkNode

Uses **multiple indexed source handles** for parallel branches:

| Target Handle(s) | Source Handle(s) |
|------------------|------------------|
| `in` | `branch-0`, `branch-1`, `branch-2`, ... |

The number of branches is determined by the `branchCount` node data field.

**Example:**
```typescript
// Update fork to have 3 branches
editor.updateNodeData(forkId, { branchCount: 3 });

// Create edges for each branch
editor.connect(forkId, branchANodeId, { sourceHandle: 'branch-0' });
editor.connect(forkId, branchBNodeId, { sourceHandle: 'branch-1' });
editor.connect(forkId, branchCNodeId, { sourceHandle: 'branch-2' });
```

---

#### JoinNode

Uses **multiple indexed target handles** to merge parallel branches:

| Target Handle(s) | Source Handle(s) |
|------------------|------------------|
| `in-0`, `in-1`, `in-2`, ... | `out` |

The number of input handles is determined by the upstream fork's `branchCount` or explicitly via `inputCount` node data.

**Example:**
```typescript
// Connect two branches to join
editor.connect(branchANodeId, joinId, { targetHandle: 'in-0' });
editor.connect(branchBNodeId, joinId, { targetHandle: 'in-1' });

// Continue from join
editor.connect(joinId, nextNodeId); // Join uses standard 'out' source handle
```

---

## Payload-Typed Port Styling

Ports (handles) can advertise the payload type they carry via a shared
class map in `shared/ports.ts`:

```typescript
import { portCls, PORT_CLS, type PortPayload } from './shared/ports';

<Handle type="source" position={Position.Right} id="out" className={portCls('image')} />
```

| Payload   | Style                                              |
|-----------|----------------------------------------------------|
| `image`   | Violet (`#7c3aed`) **square** (`!rounded-sm`)      |
| `text`    | Gray circle (`!bg-slate-300`) — today's default    |
| `data`    | Slate-blue circle (`#94a3b8`)                      |
| `control` | Amber circle, slightly smaller (branch/gate)       |
| `error`   | Red (`red-600`) circle, slightly smaller           |

Class strings use `!`-prefixed Tailwind utilities so they override React
Flow's built-in handle CSS (same convention as the existing
`!bg-slate-300 !w-2.5 !h-2.5` handle classNames).

This pairs with the edge-side payload semantics: `AnimatedEdge` accepts
`data.payload` (`'image' | 'text' | 'data' | 'control'`) and
`data.volume` (fan-out multiplicity, renders a `×N` pill and scales
stroke width). Execution state remains the dominant visual channel on
edges; payload only adjusts base width, idle tint, and idle dash.

---

## E2E Test Helpers

### `connectNodes` helper (pipeline-mega.spec.ts)

```typescript
async function connectNodes(
  page: Page,
  sourceId: string,
  targetId: string,
  opts?: { sourceHandle?: string; targetHandle?: string },
): Promise<string>
```

**Default behavior:** If `opts` is omitted, the helper defaults to using the first available handles (typically `'out'` and `'in'`). For special-handle nodes (Approval, Condition, Fork, Join), you **must** provide explicit `sourceHandle` or `targetHandle`:

```typescript
// ✅ Correct: explicit handles for Fork → LLM
await connectNodes(page, forkId, llmId, { sourceHandle: 'branch-0' });

// ❌ Wrong: will use default 'out' handle which doesn't exist on Fork
await connectNodes(page, forkId, llmId);
```

---

## Validation

The pipeline editor does **not** currently validate handle IDs at edge-creation time. Invalid handle IDs will:
- Render an edge visually (ReactFlow allows any handle ID)
- Fail silently during execution (the executor won't find the edge)

**Symptoms of invalid handle IDs:**
- Edges appear in the canvas but nodes never execute downstream
- Console warnings: `"Source/target handle not found"` (ReactFlow)
- Pipeline runs stall at the node with the invalid edge

**Debugging tip:** Check the edge's `sourceHandle` and `targetHandle` fields in the pipeline definition JSON. Compare against this table.

---

## Future Improvements

1. **Runtime validation:** Add warnings in dev mode when edges reference non-existent handles.
2. **Auto-resolution helper:** Create a `connectNodesAuto(sourceNodeType, targetNodeType, ...)` that infers handle IDs from node types.
3. **TypeScript types:** Export a `NodeHandleMap` type mapping node types to their valid handle IDs.

---

## See Also

- Component implementations:
  - `ApprovalNode.tsx` (lines 95-96)
  - `ConditionNode.tsx`
  - `ForkNode.tsx`
  - `JoinNode.tsx`
- E2E test examples: `frontend/e2e/pipeline-mega.spec.ts`

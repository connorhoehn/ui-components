// frontend/src/components/pipelines/dev/useDevEditorBridge.ts
//
// Dev-only bridge that exposes a small imperative API on
// `window.__pipelineEditor` so Playwright (and console-level debugging) can
// drive the canvas without going through the fragile HTML5 drag-and-drop
// or React Flow handle-connection paths. Stripped from production builds via
// the `import.meta.env.DEV` gate.
//
// Mirrors the pattern used for `window.__pipelineDemo` in App.tsx:35.

import { useEffect } from 'react';

import type { NodeData, NodeType, PipelineDefinition } from '../../../types/pipeline';

interface DevEditorBridge {
  insertNode: (
    type: NodeType,
    position?: { x: number; y: number },
  ) => string;
  connect: (
    sourceId: string,
    targetId: string,
    opts?: { sourceHandle?: string; targetHandle?: string },
  ) => string;
  updateNodeData: (id: string, patch: Partial<NodeData>) => void;
  getDefinition: () => PipelineDefinition | null;
  findNodeIdByType: (type: NodeType) => string | undefined;
}

// `declare global` blocks are copied verbatim into EVERY bundled entry point by
// vite-plugin-dts v5, so naming the module-local `DevEditorBridge` here would
// publish a dangling reference (TS2304 for consumers on skipLibCheck: false).
// This dev-only handle is stripped from production builds, so the published
// surface says `unknown`; the `satisfies` below keeps the assignment checked.
declare global {
  interface Window {
    /** Dev-only imperative canvas bridge — see `DevEditorBridge` above. */
    __pipelineEditor?: unknown;
  }
}

interface BridgeDeps {
  addNode: (type: NodeType, position: { x: number; y: number }) => string;
  addEdge: (edge: {
    source: string;
    sourceHandle: string;
    target: string;
    targetHandle: string;
  }) => string;
  updateNodeData: (id: string, patch: Partial<NodeData>) => void;
  getDefinition: () => PipelineDefinition | null;
}

/**
 * Resolve the default source handle name for a given node type. Most nodes use
 * 'out', but some special nodes have multiple or differently-named outputs.
 *
 * - Condition: 'true' or 'false'
 * - Approval: 'approved' or 'rejected'
 * - Fork: 'branch-0', 'branch-1', etc. (defaults to 'branch-0')
 * - Join: 'out' (standard, only one output)
 * - All others: 'out'
 */
function getDefaultSourceHandle(nodeType: NodeType): string {
  switch (nodeType) {
    case 'condition':
      return 'true'; // Most common path; caller can override with 'false'
    case 'approval':
      return 'approved'; // Most common path; caller can override with 'rejected'
    case 'fork':
      return 'branch-0'; // Default first branch; caller can override
    default:
      return 'out';
  }
}

export function useDevEditorBridge({
  addNode,
  addEdge,
  updateNodeData,
  getDefinition,
}: BridgeDeps): void {
  useEffect(() => {
    if (!import.meta.env.DEV) return;

    const bridge: DevEditorBridge = {
      insertNode(type, position) {
        const pos = position ?? { x: 240, y: 80 + Math.random() * 40 };
        return addNode(type, pos);
      },
      connect(sourceId, targetId, opts) {
        // Auto-resolve sourceHandle based on source node type when not explicitly provided
        let sourceHandle = opts?.sourceHandle;
        if (!sourceHandle) {
          const def = getDefinition();
          const sourceNode = def?.nodes.find((n) => n.id === sourceId);
          sourceHandle = sourceNode ? getDefaultSourceHandle(sourceNode.type) : 'out';
        }

        return addEdge({
          source: sourceId,
          sourceHandle,
          target: targetId,
          targetHandle: opts?.targetHandle ?? 'in',
        });
      },
      updateNodeData,
      getDefinition,
      findNodeIdByType(type) {
        return getDefinition()?.nodes.find((n) => n.type === type)?.id;
      },
    };

    window.__pipelineEditor = bridge satisfies DevEditorBridge;
    return () => {
      if (window.__pipelineEditor === bridge) {
        delete window.__pipelineEditor;
      }
    };
  }, [addNode, addEdge, updateNodeData, getDefinition]);
}

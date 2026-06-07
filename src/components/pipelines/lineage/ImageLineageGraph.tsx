// src/components/pipelines/lineage/ImageLineageGraph.tsx
//
// Compact xyflow DAG renderer for the per-run image lineage.
// Each ImageLineageEntry becomes one node. Edges run from parentImageId to
// imageId. Layout: BFS-layered left-to-right (source images leftmost, leaf
// nodes rightmost). No dagre required.
//
// Selecting a node highlights its full ancestry chain (highlighted class on
// edges and ancestor nodes).

import {
  ReactFlow,
  Background,
  Controls,
  type Node as RFNode,
  type Edge as RFEdge,
  type NodeProps,
  Handle,
  Position,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import { useCallback, useMemo } from 'react';
import { cn } from '../../../lib/cn';
import { useImageUrl } from '../services';
import type { ImageLineageEntry } from './useImageLineage';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface ImageLineageGraphProps {
  entries: ImageLineageEntry[];
  selectedImageId?: string;
  onSelect?: (imageId: string) => void;
}

// ---------------------------------------------------------------------------
// Layout helpers
// ---------------------------------------------------------------------------

const NODE_W = 148;
const NODE_H = 116;
const H_GAP = 56;
const V_GAP = 20;

/**
 * BFS layered layout. Sources (no parentImageId) start at layer 0.
 * Each node's layer is max(parent layers) + 1.
 * Within each layer nodes are stacked vertically.
 */
function computeLayout(
  entries: ImageLineageEntry[],
): Map<string, { x: number; y: number }> {
  const idToEntry = new Map(entries.map((e) => [e.imageId, e]));
  const layer = new Map<string, number>();
  const childrenOf = new Map<string, string[]>();

  // Build children map
  for (const e of entries) {
    if (e.parentImageId) {
      const ch = childrenOf.get(e.parentImageId) ?? [];
      ch.push(e.imageId);
      childrenOf.set(e.parentImageId, ch);
    }
  }

  // BFS to assign layers
  const queue: string[] = [];
  for (const e of entries) {
    if (!e.parentImageId || !idToEntry.has(e.parentImageId)) {
      layer.set(e.imageId, 0);
      queue.push(e.imageId);
    }
  }

  let head = 0;
  while (head < queue.length) {
    const id = queue[head++];
    const l = layer.get(id) ?? 0;
    for (const childId of childrenOf.get(id) ?? []) {
      const existing = layer.get(childId) ?? -1;
      if (l + 1 > existing) {
        layer.set(childId, l + 1);
        queue.push(childId);
      }
    }
  }

  // Group by layer and assign y positions
  const byLayer = new Map<number, string[]>();
  for (const [id, l] of layer.entries()) {
    const arr = byLayer.get(l) ?? [];
    arr.push(id);
    byLayer.set(l, arr);
  }

  const positions = new Map<string, { x: number; y: number }>();
  for (const [l, ids] of byLayer.entries()) {
    const x = l * (NODE_W + H_GAP);
    ids.forEach((id, i) => {
      positions.set(id, {
        x,
        y: i * (NODE_H + V_GAP),
      });
    });
  }

  return positions;
}

// ---------------------------------------------------------------------------
// Ancestry helper
// ---------------------------------------------------------------------------

function ancestorSet(
  imageId: string,
  entries: ImageLineageEntry[],
): Set<string> {
  const idToEntry = new Map(entries.map((e) => [e.imageId, e]));
  const visited = new Set<string>();
  const queue = [imageId];
  while (queue.length) {
    const cur = queue.shift()!;
    if (visited.has(cur)) continue;
    visited.add(cur);
    const e = idToEntry.get(cur);
    if (e?.parentImageId) queue.push(e.parentImageId);
  }
  return visited;
}

// ---------------------------------------------------------------------------
// Custom node component
// ---------------------------------------------------------------------------

interface LineageNodeData extends Record<string, unknown> {
  entry: ImageLineageEntry;
  highlighted: boolean;
  selected: boolean;
  onSelect: (imageId: string) => void;
  getImageUrl: (imageId: string) => string;
}

function LineageNode({ data }: NodeProps<RFNode<LineageNodeData>>) {
  const { entry, highlighted, selected, onSelect, getImageUrl } = data;

  const dimText = entry.width && entry.height ? `${entry.width}×${entry.height}` : '';
  const kind = entry.producedByNodeKind;

  return (
    <>
      <Handle type="target" position={Position.Left} id="in" className="w-2 h-2 bg-border-emphasis" />
      <button
        type="button"
        onClick={() => onSelect(entry.imageId)}
        className={cn(
          'w-full h-full flex flex-col overflow-hidden rounded-lg border bg-surface text-left',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
          selected
            ? 'border-primary ring-2 ring-primary/30'
            : highlighted
              ? 'border-primary/60 bg-primary/5'
              : 'border-border',
        )}
        aria-label={`Image artifact ${entry.imageId.slice(0, 8)} produced by ${kind}`}
        data-testid={`lineage-node-${entry.imageId}`}
      >
        <div className="flex-1 min-h-0 overflow-hidden bg-surface-inset flex items-center justify-center">
          <img
            src={getImageUrl(entry.imageId)}
            alt={`Artifact ${entry.imageId.slice(0, 8)}`}
            className="w-full h-full object-cover"
            loading="lazy"
            data-testid={`lineage-thumb-${entry.imageId}`}
          />
        </div>
        <div className="px-1.5 py-1 flex flex-col gap-0.5 flex-shrink-0">
          <span
            className={cn(
              'inline-block text-[9px] font-mono px-1 rounded',
              'bg-surface-inset text-text-secondary truncate max-w-full',
            )}
            title={kind}
          >
            {kind}
          </span>
          {dimText && (
            <span className="text-[9px] text-text-tertiary font-mono">{dimText}</span>
          )}
        </div>
      </button>
      <Handle type="source" position={Position.Right} id="out" className="w-2 h-2 bg-border-emphasis" />
    </>
  );
}

const nodeTypes = { lineageNode: LineageNode };

// ---------------------------------------------------------------------------
// Empty state
// ---------------------------------------------------------------------------

function EmptyState() {
  return (
    <div
      className="flex items-center justify-center h-full text-text-tertiary text-sm"
      data-testid="lineage-graph-empty"
    >
      No image artifacts produced by this run.
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function ImageLineageGraph({
  entries,
  selectedImageId,
  onSelect,
}: ImageLineageGraphProps) {
  const getImageUrl = useImageUrl();

  const ancestors = useMemo(
    () => (selectedImageId ? ancestorSet(selectedImageId, entries) : new Set<string>()),
    [selectedImageId, entries],
  );

  const layout = useMemo(() => computeLayout(entries), [entries]);

  const initialNodes: RFNode<LineageNodeData>[] = useMemo(
    () =>
      entries.map((entry) => {
        const pos = layout.get(entry.imageId) ?? { x: 0, y: 0 };
        return {
          id: entry.imageId,
          type: 'lineageNode',
          position: pos,
          data: {
            entry,
            highlighted: ancestors.has(entry.imageId),
            selected: entry.imageId === selectedImageId,
            onSelect: onSelect ?? (() => {}),
            getImageUrl,
          },
          style: { width: NODE_W, height: NODE_H },
        };
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [entries, selectedImageId, ancestors, onSelect, getImageUrl],
  );

  const initialEdges: RFEdge[] = useMemo(
    () =>
      entries
        .filter((e) => e.parentImageId)
        .map((e) => ({
          id: `${e.parentImageId}->${e.imageId}`,
          source: e.parentImageId!,
          target: e.imageId,
          sourceHandle: 'out',
          targetHandle: 'in',
          className: ancestors.has(e.imageId) && ancestors.has(e.parentImageId!)
            ? 'stroke-primary stroke-2'
            : 'stroke-border',
        })),
    [entries, ancestors],
  );

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  const handleNodeClick = useCallback(
    (_: React.MouseEvent, node: RFNode) => {
      onSelect?.(node.id);
    },
    [onSelect],
  );

  if (entries.length === 0) {
    return <EmptyState />;
  }

  return (
    <div
      className="relative w-full h-full"
      data-testid="lineage-graph"
    >
      {/* xyflow requires absolute positioning for its internal elements */}
      <style>{`.react-flow__node { position: absolute; }`}</style>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.3}
        maxZoom={2}
        proOptions={{ hideAttribution: true }}
      >
        <Background gap={16} size={1} className="bg-surface-inset" />
        <Controls showInteractive={false} className="bg-surface border border-border rounded" />
      </ReactFlow>
    </div>
  );
}

export default ImageLineageGraph;

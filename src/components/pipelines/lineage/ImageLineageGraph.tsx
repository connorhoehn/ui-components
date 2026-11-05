// src/components/pipelines/lineage/ImageLineageGraph.tsx
//
// Compact xyflow DAG renderer for the per-run image lineage.
// Each ImageLineageEntry becomes one node. Edges run from parentImageId to
// imageId. Layout: BFS-layered left-to-right (source images leftmost, leaf
// nodes rightmost). No dagre required.
//
// Selecting a node highlights its full ancestry chain (highlighted class on
// edges and ancestor nodes).
//
// Virtualization (task #1379):
//  - Windows entries to `maxRenderedNodes` (default 100), most-recent-first.
//  - "Show all" banner + ConfirmDialog warning above 500 entries.
//  - xyflow `onlyRenderVisibleElements` viewport culling.
//  - Per-node IntersectionObserver lazy thumbnail src via <LazyThumb>.

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
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { cn } from '../../../lib/cn';
import Banner from '../../shared/Banner';
import Chip from '../../shared/Chip';
import ConfirmDialog from '../../shared/ConfirmDialog';
import Modal from '../../shared/Modal';
import { Button } from '../../ui/Button';
import { IconButton } from '../../ui/IconButton';
import { useImageUrl } from '../services';
import type { ImageLineageEntry } from './useImageLineage';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface ImageLineageGraphProps {
  entries: ImageLineageEntry[];
  selectedImageId?: string;
  onSelect?: (imageId: string) => void;
  /**
   * Maximum number of nodes to render initially. When `entries.length`
   * exceeds this, only the most-recent-first window is rendered and a
   * banner offers "Show all". Defaults to 100.
   */
  maxRenderedNodes?: number;
}

const DEFAULT_MAX_RENDERED_NODES = 100;
const PERF_WARN_THRESHOLD = 500;

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
// LazyThumb — defers `src` set until the wrapping node enters the viewport.
// ---------------------------------------------------------------------------

interface LazyThumbProps {
  src: string;
  alt: string;
  testId?: string;
}

function LazyThumb({ src, alt, testId }: LazyThumbProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    if (typeof IntersectionObserver === 'undefined') {
      // Fallback: no observer available, eagerly show.
      setVisible(true);
      return;
    }
    const node = ref.current;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { rootMargin: '200px' },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="w-full h-full flex items-center justify-center bg-surface-inset"
    >
      {visible ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          loading="lazy"
          data-testid={testId}
        />
      ) : (
        <div
          aria-hidden="true"
          className="w-full h-full animate-pulse bg-surface-inset"
          data-testid={testId ? `${testId}-placeholder` : undefined}
        />
      )}
    </div>
  );
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
        data-ui-part=""
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
          <LazyThumb
            src={getImageUrl(entry.imageId)}
            alt={`Artifact ${entry.imageId.slice(0, 8)}`}
            testId={`lineage-thumb-${entry.imageId}`}
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
// Windowing — most-recent-first by `at` timestamp.
// ---------------------------------------------------------------------------

function windowMostRecent(
  entries: ImageLineageEntry[],
  limit: number,
): ImageLineageEntry[] {
  if (entries.length <= limit) return entries;
  // Pair with original index so the sort is stable even if `at` ties.
  const indexed = entries.map((e, i) => ({ e, i }));
  indexed.sort((a, b) => {
    const ta = Date.parse(a.e.at);
    const tb = Date.parse(b.e.at);
    if (tb !== ta) return tb - ta;
    return b.i - a.i;
  });
  return indexed.slice(0, limit).map((x) => x.e);
}

// ---------------------------------------------------------------------------
// Artifact preview modal — click-to-inspect full-res image with metadata
// chips and arrow-key navigation across DAG entries (sorted by `at`).
// ---------------------------------------------------------------------------

function shortId(id: string): string {
  return id.length > 10 ? `${id.slice(0, 8)}…` : id;
}

interface ArtifactPreviewModalProps {
  /** All entries available for navigation; ordered by `at` ascending. */
  navEntries: ImageLineageEntry[];
  /** Currently-shown entry's imageId. */
  imageId: string;
  onClose: () => void;
  onNavigate: (imageId: string) => void;
  getImageUrl: (imageId: string) => string;
}

function ArtifactPreviewModal({
  navEntries,
  imageId,
  onClose,
  onNavigate,
  getImageUrl,
}: ArtifactPreviewModalProps) {
  const entry = navEntries.find((e) => e.imageId === imageId);
  const [copied, setCopied] = useState(false);
  const copiedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (copiedTimerRef.current) clearTimeout(copiedTimerRef.current);
  }, []);

  // Reset the copied-confirmation when the modal target changes.
  useEffect(() => {
    setCopied(false);
  }, [imageId]);

  // Arrow-key navigation. Wraps at both ends. Listens at window so we don't
  // depend on Modal's internal focus being on a specific element.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      if (navEntries.length === 0) return;
      const idx = navEntries.findIndex((x) => x.imageId === imageId);
      if (idx === -1) return;
      const len = navEntries.length;
      const nextIdx = e.key === 'ArrowRight'
        ? (idx + 1) % len
        : (idx - 1 + len) % len;
      e.preventDefault();
      onNavigate(navEntries[nextIdx].imageId);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [imageId, navEntries, onNavigate]);

  const handleCopy = useCallback(() => {
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      void navigator.clipboard.writeText(imageId).then(
        () => {
          setCopied(true);
          if (copiedTimerRef.current) clearTimeout(copiedTimerRef.current);
          copiedTimerRef.current = setTimeout(() => setCopied(false), 1200);
        },
        () => {
          // Clipboard write failed (permissions / insecure context).
          // Silently no-op — user can still read the id chip.
        },
      );
    }
  }, [imageId]);

  if (!entry) return null;

  const dimText = entry.width && entry.height
    ? `${entry.width}×${entry.height}`
    : null;

  return (
    <Modal
      open
      onClose={onClose}
      title={`Artifact ${shortId(entry.imageId)}`}
      maxWidth={760}
      rawChildren
      backdropTestId="lineage-preview-backdrop"
      footer={
        <Button
          variant="secondary"
          size="sm"
          onClick={onClose}
          data-testid="lineage-preview-close"
        >
          Close
        </Button>
      }
    >
      <div
        className="flex flex-col gap-3"
        data-testid="lineage-preview-modal"
      >
        <div
          className={cn(
            'flex items-center justify-center bg-surface-inset rounded-md overflow-hidden',
            'max-h-[70vh] min-h-[200px]',
          )}
        >
          <img
            src={getImageUrl(entry.imageId)}
            alt={`Artifact ${entry.imageId}`}
            className="max-w-full max-h-[70vh] object-contain"
            data-testid={`lineage-preview-image-${entry.imageId}`}
          />
        </div>
        <div
          className="flex flex-wrap items-center gap-2 pt-1"
          data-testid="lineage-preview-meta"
        >
          <Chip tone="neutral" size="sm" mono title={entry.imageId}>
            id: {shortId(entry.imageId)}
          </Chip>
          <IconButton
            aria-label={copied ? 'Image id copied' : 'Copy image id'}
            size="sm"
            variant="ghost"
            onClick={handleCopy}
            data-testid="lineage-preview-copy"
          >
            {copied ? '✓' : '⧉'}
          </IconButton>
          {entry.mimeType && (
            <Chip tone="info" size="sm">
              {entry.mimeType}
            </Chip>
          )}
          {dimText && (
            <Chip tone="neutral" size="sm" mono>
              {dimText}
            </Chip>
          )}
          <Chip tone="purple" size="sm" mono title={entry.producedByStepId}>
            step: {shortId(entry.producedByStepId)}
          </Chip>
        </div>
      </div>
    </Modal>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function ImageLineageGraph({
  entries,
  selectedImageId,
  onSelect,
  maxRenderedNodes = DEFAULT_MAX_RENDERED_NODES,
}: ImageLineageGraphProps) {
  const getImageUrl = useImageUrl();

  const [showAll, setShowAll] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [previewImageId, setPreviewImageId] = useState<string | null>(null);

  const totalCount = entries.length;
  const clipped = !showAll && totalCount > maxRenderedNodes;

  const visibleEntries = useMemo(
    () => (clipped ? windowMostRecent(entries, maxRenderedNodes) : entries),
    [entries, clipped, maxRenderedNodes],
  );

  const ancestors = useMemo(
    () =>
      selectedImageId
        ? ancestorSet(selectedImageId, visibleEntries)
        : new Set<string>(),
    [selectedImageId, visibleEntries],
  );

  const layout = useMemo(() => computeLayout(visibleEntries), [visibleEntries]);

  const handleNodeActivate = useCallback(
    (imageId: string) => {
      onSelect?.(imageId);
      setPreviewImageId(imageId);
    },
    [onSelect],
  );

  const initialNodes: RFNode<LineageNodeData>[] = useMemo(
    () =>
      visibleEntries.map((entry) => {
        const pos = layout.get(entry.imageId) ?? { x: 0, y: 0 };
        return {
          id: entry.imageId,
          type: 'lineageNode',
          position: pos,
          data: {
            entry,
            highlighted: ancestors.has(entry.imageId),
            selected: entry.imageId === selectedImageId,
            onSelect: handleNodeActivate,
            getImageUrl,
          },
          style: { width: NODE_W, height: NODE_H },
        };
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [visibleEntries, selectedImageId, ancestors, handleNodeActivate, getImageUrl],
  );

  const visibleIds = useMemo(
    () => new Set(visibleEntries.map((e) => e.imageId)),
    [visibleEntries],
  );

  const initialEdges: RFEdge[] = useMemo(
    () =>
      visibleEntries
        .filter(
          (e) => e.parentImageId && visibleIds.has(e.parentImageId),
        )
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
    [visibleEntries, visibleIds, ancestors],
  );

  // `useNodesState` / `useEdgesState` are `useState` with a change reducer
  // bolted on: the argument is an INITIAL value, read once. Both setters used
  // to be discarded (`const [nodes, , onNodesChange]`), so nothing after the
  // first render ever reached the canvas:
  //
  //  - "Show all" flipped `showAll`, recomputed `visibleEntries` and cleared
  //    the banner, and left the same windowed 100 nodes on screen.
  //  - A host feeding `entries` from the async `useImageLineage` mounted with
  //    `entries === []`; by the time the fetch resolved the initial value was
  //    long gone, so the canvas stayed permanently blank — with working zoom
  //    controls over the emptiness, which is why it read as a layout bug.
  //  - Selecting a node never re-tinted its ancestry.
  //
  // xyflow keeps `fitViewQueued` pending until nodes are initialised, so the
  // late `setNodes` below is what finally triggers the `fitView`.
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    setNodes((prev) => {
      // Carry over any position the user dragged a node to. Without this,
      // merely selecting a node (which rebuilds `initialNodes` to re-tint the
      // ancestry) would snap the whole graph back to the computed layout.
      const dragged = new Map(prev.map((n) => [n.id, n.position]));
      return initialNodes.map((n) => {
        const pos = dragged.get(n.id);
        return pos ? { ...n, position: pos } : n;
      });
    });
  }, [initialNodes, setNodes]);

  useEffect(() => {
    setEdges(initialEdges);
  }, [initialEdges, setEdges]);

  const handleNodeClick = useCallback(
    (_: React.MouseEvent, node: RFNode) => {
      handleNodeActivate(node.id);
    },
    [handleNodeActivate],
  );

  const handleShowAllClick = useCallback(() => {
    if (totalCount > PERF_WARN_THRESHOLD) {
      setConfirmOpen(true);
    } else {
      setShowAll(true);
    }
  }, [totalCount]);

  const handleConfirm = useCallback(() => {
    setShowAll(true);
    setConfirmOpen(false);
  }, []);

  const handleCancel = useCallback(() => {
    setConfirmOpen(false);
  }, []);

  // Stable ascending-by-`at` ordering for arrow-key navigation. Falls back to
  // imageId for ties so the order is deterministic.
  const navEntries = useMemo(() => {
    const copy = visibleEntries.slice();
    copy.sort((a, b) => {
      const ta = Date.parse(a.at);
      const tb = Date.parse(b.at);
      if (ta !== tb) return ta - tb;
      return a.imageId.localeCompare(b.imageId);
    });
    return copy;
  }, [visibleEntries]);

  const handlePreviewClose = useCallback(() => setPreviewImageId(null), []);
  const handlePreviewNavigate = useCallback(
    (id: string) => setPreviewImageId(id),
    [],
  );

  if (totalCount === 0) {
    return <EmptyState />;
  }

  return (
    <div
      className="relative w-full h-full flex flex-col"
      data-testid="lineage-graph"
    >
      {clipped && (
        <div className="p-2 flex-shrink-0">
          <Banner
            variant="info"
            data-testid="lineage-graph-clip-banner"
          >
            <span className="flex-1">
              Showing {visibleEntries.length} of {totalCount} artifacts
            </span>
            <button
              data-ui-part=""
              type="button"
              onClick={handleShowAllClick}
              data-testid="lineage-graph-show-all"
              className={cn(
                'ml-2 px-2 py-1 text-[12px] font-medium rounded',
                'border border-current bg-transparent cursor-pointer',
                'hover:bg-current/10',
              )}
            >
              Show all
            </button>
          </Banner>
        </div>
      )}
      <div className="flex-1 min-h-0 relative">
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
          onlyRenderVisibleElements
          proOptions={{ hideAttribution: true }}
        >
          <Background gap={16} size={1} className="bg-surface-inset" />
          <Controls showInteractive={false} className="bg-surface border border-border rounded" />
        </ReactFlow>
      </div>
      <ConfirmDialog
        open={confirmOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        title="Show all artifacts?"
        body={
          `Rendering all ${totalCount} artifacts may slow down the lineage tab. ` +
          `Continue?`
        }
        confirmLabel="Show all"
        tone="caution"
      />
      {previewImageId && (
        <ArtifactPreviewModal
          navEntries={navEntries}
          imageId={previewImageId}
          onClose={handlePreviewClose}
          onNavigate={handlePreviewNavigate}
          getImageUrl={getImageUrl}
        />
      )}
    </div>
  );
}

export default ImageLineageGraph;

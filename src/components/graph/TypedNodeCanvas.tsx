// TypedNodeCanvas — a small xyflow canvas of TYPED nodes the host draws
// itself: a lineage graph (note → cluster → guide), a storage-tier flow
// (L0 → Compact → L1 → Compact → L2 → Publish → Library), an agent topology.
//
// The library owns the canvas mechanics every one of those had hand-rolled:
// a left-to-right rank layout (or the host's own coordinates), handles picked
// from where the two ends sit, tone-coloured edges with a label above, a
// clickable job marker on the line and a detail line under it, a moving dot
// for a job that is confirmed running (still under reduced motion), zoom
// controls, and a keyboard path — every node is a tab stop, Enter/Space
// selects it, arrow keys move between nodes. The host owns what a node LOOKS
// like (`renderNode`) and what selection means.
//
// `listFallback` swaps the drawing for its list equivalent — the same nodes
// in rank order with each one's outgoing edges — for a narrow column, a
// screen-reader-first view, or a "View as list" toggle. The list is not a
// degraded mode: it carries every node, edge label and selection.

import {
  Handle,
  Position,
  ReactFlow,
  getSmoothStepPath,
  useReactFlow,
  useStore,
  useViewport,
  type Edge,
  type EdgeProps,
  type Node,
  type NodeProps,
  type Viewport,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback, useEffect, useMemo, useRef, type KeyboardEvent, type MouseEvent, type ReactNode } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { cn } from '../../lib/cn';
import { TONE_SOLID_BG, TONE_TEXT, toneVar, type Tone } from '../shared/tones';
import { CanvasZoomControls } from './CanvasZoomControls';

export interface TypedCanvasNode<K extends string = string, D = unknown> {
  id: string;
  /** What the node is — `tier`, `library`, `note`, `cluster`… The host's `renderNode` switches on it. */
  kind: K;
  data: D;
  /** Column in the `ltr` layout. Absent: derived from the edges (longest path from a root). */
  rank?: number;
  /** Explicit position. Required-ish for `manual`; in `ltr` it overrides the computed spot. */
  x?: number;
  y?: number;
  /** Accessible name, and the list view's text when there is no `renderListItem`. Default: `id`. */
  label?: string;
}

/** A job marker on an edge — a dot on the line the reader can select. */
export interface TypedCanvasEdgeMarker {
  /** Accessible name — "Compaction L0 → L1, running". */
  label: string;
  tone?: Tone;
}

export interface TypedCanvasEdge {
  id: string;
  from: string;
  to: string;
  /** Short word over the line — "Compact", "Publish". */
  label?: string;
  /** A quiet line under it — "13 notes → 4 patterns · 3h ago". */
  detail?: ReactNode;
  /** Line colour. Default: the brand colour. */
  tone?: Tone;
  /** A dot rides the line. Only for work CONFIRMED running; never under reduced motion. */
  animated?: boolean;
  marker?: TypedCanvasEdgeMarker | null;
}

export interface TypedNodeCanvasProps<N extends TypedCanvasNode = TypedCanvasNode> {
  nodes: N[];
  edges: TypedCanvasEdge[];
  renderNode: (node: N, state: { selected: boolean }) => ReactNode;
  /** `ltr` (default): rank columns left to right. `manual`: every node at its own `x`/`y`. */
  layout?: 'ltr' | 'manual';
  onSelectNode?: (id: string) => void;
  /** Called from an edge's marker or its line. */
  onSelectEdge?: (id: string) => void;
  /** The selected node OR edge id. */
  selectedId?: string | null;
  /** Draw the list equivalent instead of the canvas. */
  listFallback?: boolean;
  /** The list view's row body. Default: the node's `label` and `kind`. */
  renderListItem?: (node: N) => ReactNode;
  /** Layout box for a node, px. Defaults 224 × 168. */
  nodeWidth?: number;
  nodeHeight?: number;
  /** Space between rank columns, px. Default 144 (room for an edge label). */
  columnGap?: number;
  /** Space between nodes in one column, px. Default 32. */
  rowGap?: number;
  /** Draw `CanvasZoomControls` in the bottom-left corner. Default `true`. */
  controls?: boolean;
  /** A quiet line in the bottom band beside the controls — the legend in words. */
  caption?: ReactNode;
  minZoom?: number;
  maxZoom?: number;
  onViewportChange?: (viewport: Viewport) => void;
  /** Shown when `nodes` is empty. */
  emptyLabel?: string;
  className?: string;
  'aria-label'?: string;
  'data-testid'?: string;
}

const DEFAULT_NODE_WIDTH = 224;
const DEFAULT_NODE_HEIGHT = 168;

type HandleSide = 'l' | 'r' | 't' | 'b';

interface CanvasNodeData extends Record<string, unknown> {
  content: ReactNode;
  label: string;
  selected: boolean;
  width: number;
  onSelect?: () => void;
}

interface CanvasEdgeData extends Record<string, unknown> {
  entity: TypedCanvasEdge;
  selected: boolean;
  reducedMotion: boolean;
  onSelect?: () => void;
}

type CanvasFlowNode = Node<CanvasNodeData, 'typed'>;
type CanvasFlowEdge = Edge<CanvasEdgeData, 'typed'>;

/** Longest-path rank from the roots; cycles fall back to column 0. Exported for tests. */
export function rankTypedNodes(nodes: Pick<TypedCanvasNode, 'id' | 'rank'>[], edges: Pick<TypedCanvasEdge, 'from' | 'to'>[]): Map<string, number> {
  const ids = new Set(nodes.map((n) => n.id));
  const incoming = new Map(nodes.map((n) => [n.id, 0]));
  const out = new Map(nodes.map((n) => [n.id, [] as string[]]));
  for (const e of edges) {
    if (!ids.has(e.from) || !ids.has(e.to) || e.from === e.to) continue;
    out.get(e.from)!.push(e.to);
    incoming.set(e.to, (incoming.get(e.to) ?? 0) + 1);
  }
  const rank = new Map<string, number>();
  const queue = nodes.filter((n) => incoming.get(n.id) === 0).map((n) => n.id);
  for (const id of queue) rank.set(id, 0);
  for (let i = 0; i < queue.length; i += 1) {
    const id = queue[i]!;
    for (const to of out.get(id)!) {
      rank.set(to, Math.max(rank.get(to) ?? 0, (rank.get(id) ?? 0) + 1));
      incoming.set(to, incoming.get(to)! - 1);
      if (incoming.get(to) === 0) queue.push(to);
    }
  }
  for (const n of nodes) {
    if (typeof n.rank === 'number' && Number.isFinite(n.rank)) rank.set(n.id, n.rank);
    else if (!rank.has(n.id)) rank.set(n.id, 0);
  }
  return rank;
}

/** Node positions for a layout. Exported for tests and hosts that draw their own minimap. */
export function layoutTypedNodes(
  nodes: TypedCanvasNode[],
  edges: Pick<TypedCanvasEdge, 'from' | 'to'>[],
  options: { layout?: 'ltr' | 'manual'; nodeWidth?: number; nodeHeight?: number; columnGap?: number; rowGap?: number } = {},
): Map<string, { x: number; y: number }> {
  const { layout = 'ltr', nodeWidth = DEFAULT_NODE_WIDTH, nodeHeight = DEFAULT_NODE_HEIGHT, columnGap = 144, rowGap = 32 } = options;
  const positions = new Map<string, { x: number; y: number }>();
  if (layout === 'manual') {
    for (const n of nodes) positions.set(n.id, { x: n.x ?? 0, y: n.y ?? 0 });
    return positions;
  }
  const rank = rankTypedNodes(nodes, edges);
  const rowsUsed = new Map<number, number>();
  for (const n of nodes) {
    const column = rank.get(n.id) ?? 0;
    const row = rowsUsed.get(column) ?? 0;
    const hasOwn = typeof n.x === 'number' && typeof n.y === 'number';
    if (!hasOwn) rowsUsed.set(column, row + 1);
    positions.set(n.id, hasOwn
      ? { x: n.x!, y: n.y! }
      : { x: column * (nodeWidth + columnGap), y: row * (nodeHeight + rowGap) });
  }
  return positions;
}

/** Which sides an edge leaves and enters by: sideways when the target is to the right, else top/bottom. */
function sidesFor(from: { x: number; y: number }, to: { x: number; y: number }, width: number): [HandleSide, HandleSide] {
  if (to.x >= from.x + width / 2) return ['r', 'l'];
  if (to.x + width / 2 <= from.x) return ['l', 'r'];
  return to.y >= from.y ? ['b', 't'] : ['t', 'b'];
}

const SIDE_POSITION: Record<HandleSide, Position> = { l: Position.Left, r: Position.Right, t: Position.Top, b: Position.Bottom };

function CanvasNode({ data }: NodeProps<CanvasFlowNode>) {
  const select = (event: MouseEvent<HTMLDivElement>) => {
    // A link or button the host drew inside the node does its own thing.
    if ((event.target as HTMLElement).closest('a,button,input,select,textarea')) return;
    data.onSelect?.();
  };
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      data.onSelect?.();
    }
  };
  return (
    <div
      role="group"
      tabIndex={0}
      aria-label={data.label}
      aria-current={data.selected ? 'true' : undefined}
      data-canvas-node=""
      data-selected={data.selected ? 'true' : 'false'}
      onClick={select}
      onKeyDown={onKeyDown}
      className={cn(
        'nodrag relative w-full rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
        data.onSelect && 'cursor-pointer',
      )}
    >
      <Handle id="l" type="target" position={Position.Left} isConnectable={false} className="opacity-0" />
      <Handle id="t" type="target" position={Position.Top} isConnectable={false} className="opacity-0" />
      <Handle id="rt" type="target" position={Position.Right} isConnectable={false} className="opacity-0" />
      <Handle id="bt" type="target" position={Position.Bottom} isConnectable={false} className="opacity-0" />
      {data.content}
      <Handle id="r" type="source" position={Position.Right} isConnectable={false} className="opacity-0" />
      <Handle id="b" type="source" position={Position.Bottom} isConnectable={false} className="opacity-0" />
      <Handle id="ls" type="source" position={Position.Left} isConnectable={false} className="opacity-0" />
      <Handle id="ts" type="source" position={Position.Top} isConnectable={false} className="opacity-0" />
    </div>
  );
}

function arrowHead(x: number, y: number, side: Position): string {
  // The target handle's side: the line arrives travelling INTO that side.
  switch (side) {
    case Position.Left: return `M${x - 7} ${y - 4} L${x} ${y} L${x - 7} ${y + 4} Z`;
    case Position.Right: return `M${x + 7} ${y - 4} L${x} ${y} L${x + 7} ${y + 4} Z`;
    case Position.Top: return `M${x - 4} ${y - 7} L${x} ${y} L${x + 4} ${y - 7} Z`;
    default: return `M${x - 4} ${y + 7} L${x} ${y} L${x + 4} ${y + 7} Z`;
  }
}

function CanvasEdge({ sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data }: EdgeProps<CanvasFlowEdge>) {
  const [path, labelX, labelY] = getSmoothStepPath({ sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, borderRadius: 10 });
  if (!data) return null;
  const { entity, selected, reducedMotion, onSelect } = data;
  const stroke = entity.tone ? toneVar(entity.tone) : 'var(--color-primary)';
  const hasLabel = !!entity.label || entity.detail != null || !!entity.marker;
  return (
    <g data-edge-id={entity.id} data-selected={selected ? 'true' : 'false'}>
      <path d={path} fill="none" stroke={stroke} strokeWidth={selected ? 2.25 : 1.5} />
      <path d={arrowHead(targetX, targetY, targetPosition)} fill={stroke} />
      {/* The line's hit area, as xyflow's own edges draw it. */}
      <path d={path} fill="none" stroke={stroke} strokeOpacity={0} strokeWidth={20} className={onSelect ? 'cursor-pointer' : undefined} />
      {entity.animated && !reducedMotion ? (
        <circle r="4" fill={stroke} aria-hidden="true" data-testid={`typed-edge-motion-${entity.id}`}>
          <animateMotion dur="2s" repeatCount="indefinite" path={path} />
        </circle>
      ) : null}
      {hasLabel ? (
        <foreignObject x={labelX - 90} y={labelY - 30} width="180" height="76" className="overflow-visible">
          <div className="nodrag nopan pointer-events-none flex h-full flex-col items-center text-center" data-typed-edge-label={entity.id}>
            <span className={cn('h-5 whitespace-nowrap text-[13px] font-medium leading-5', entity.tone ? TONE_TEXT[entity.tone] : 'text-primary')}>
              {entity.label ?? ''}
            </span>
            <span className="flex h-5 items-center justify-center">
              {entity.marker ? (
                <button
                  type="button"
                  aria-label={entity.marker.label}
                  aria-pressed={selected}
                  onClick={(event) => { event.stopPropagation(); onSelect?.(); }}
                  disabled={!onSelect}
                  className={cn(
                    'pointer-events-auto h-3 w-3 rounded-full border-none p-0 ring-2 ring-surface',
                    TONE_SOLID_BG[entity.marker.tone ?? entity.tone ?? 'info'],
                    onSelect ? 'cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary' : 'cursor-default',
                    selected && 'outline-2 outline-offset-2 outline-primary',
                  )}
                  data-testid={`typed-edge-marker-${entity.id}`}
                />
              ) : null}
            </span>
            {entity.detail != null && (
              <span className="text-[12px] leading-4 text-text-tertiary">{entity.detail}</span>
            )}
          </div>
        </foreignObject>
      ) : null}
    </g>
  );
}

const nodeTypes = { typed: CanvasNode };
const edgeTypes = { typed: CanvasEdge };

function CanvasChrome({
  controls,
  caption,
  minZoom,
  maxZoom,
  fitKey,
  reducedMotion,
  userMoved,
}: {
  controls: boolean;
  caption?: ReactNode;
  minZoom: number;
  maxZoom: number;
  fitKey: string;
  reducedMotion: boolean;
  /** Set once the reader zooms or pans; a resize then leaves their view alone. */
  userMoved: { current: boolean };
}) {
  const flow = useReactFlow();
  const { zoom } = useViewport();
  const duration = reducedMotion ? 0 : 200;
  const fit = useCallback(() => {
    userMoved.current = false;
    void flow.fitView({ padding: 0.15, maxZoom: 1, duration });
  }, [flow, duration, userMoved]);
  // Re-fit when the canvas itself changes size — a details pane opening
  // beside it, a column widening — as long as the reader has not zoomed or
  // panned. `fitView` on mount fits only the first size: a pane that opens a
  // frame later left the graph at its old zoom, running off the new edge.
  const width = useStore((st) => st.width);
  const height = useStore((st) => st.height);
  const lastSize = useRef<{ w: number; h: number } | null>(null);
  useEffect(() => {
    if (!width || !height) return;
    const prev = lastSize.current;
    lastSize.current = { w: width, h: height };
    if (!prev || userMoved.current) return;
    if (Math.abs(prev.w - width) < 8 && Math.abs(prev.h - height) < 8) return;
    void flow.fitView({ padding: 0.15, maxZoom: 1, duration: 0 });
  }, [width, height, flow, userMoved]);
  // Re-fit when the SET of nodes changes (a new scope), not on every render.
  const first = useRef(true);
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    const raf = typeof requestAnimationFrame === 'function' ? requestAnimationFrame(fit) : undefined;
    return () => { if (raf !== undefined && typeof cancelAnimationFrame === 'function') cancelAnimationFrame(raf); };
  }, [fitKey, fit]);
  if (!controls && caption == null) return null;
  return (
    <div className="pointer-events-none absolute inset-x-3 bottom-3 z-10 flex items-center gap-4">
      {controls && (
        <CanvasZoomControls
          className="pointer-events-auto"
          zoom={zoom}
          minZoom={minZoom}
          maxZoom={maxZoom}
          onZoomIn={() => { userMoved.current = true; void flow.zoomIn({ duration }); }}
          onZoomOut={() => { userMoved.current = true; void flow.zoomOut({ duration }); }}
          onFit={fit}
        />
      )}
      {caption != null && <p className="m-0 min-w-0 flex-1 truncate text-center text-[12px] text-text-tertiary">{caption}</p>}
    </div>
  );
}

function ListView<N extends TypedCanvasNode>({
  nodes,
  edges,
  order,
  selectedId,
  onSelectNode,
  onSelectEdge,
  renderListItem,
  ariaLabel,
  testId,
  className,
}: {
  nodes: N[];
  edges: TypedCanvasEdge[];
  order: Map<string, number>;
  selectedId?: string | null;
  onSelectNode?: (id: string) => void;
  onSelectEdge?: (id: string) => void;
  renderListItem?: (node: N) => ReactNode;
  ariaLabel: string;
  testId: string;
  className?: string;
}) {
  const byId = new Map(nodes.map((n) => [n.id, n]));
  const sorted = [...nodes].sort((a, b) => (order.get(a.id) ?? 0) - (order.get(b.id) ?? 0));
  return (
    <ol aria-label={ariaLabel} className={cn('m-0 flex list-none flex-col divide-y divide-border p-0', className)} data-testid={`${testId}-list`}>
      {sorted.map((node) => {
        const selected = selectedId === node.id;
        const label = node.label ?? node.id;
        const outgoing = edges.filter((e) => e.from === node.id && byId.has(e.to));
        const body = renderListItem ? renderListItem(node) : (
          <span className="flex min-w-0 items-baseline gap-2">
            <span className="truncate text-[13px] font-medium text-text-primary">{label}</span>
            <span className="text-[12px] text-text-tertiary">{node.kind}</span>
          </span>
        );
        return (
          <li key={node.id} className={cn('flex min-w-0 flex-col gap-1 px-3 py-2.5', selected && 'bg-surface-hover')} data-testid={`${testId}-list-node-${node.id}`}>
            {onSelectNode ? (
              <button
                type="button"
                aria-label={label}
                aria-current={selected ? 'true' : undefined}
                onClick={() => onSelectNode(node.id)}
                className="min-w-0 cursor-pointer border-none bg-transparent p-0 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {body}
              </button>
            ) : body}
            {outgoing.length > 0 && (
              <ul className="m-0 flex list-none flex-col gap-0.5 p-0 pl-3">
                {outgoing.map((edge) => {
                  const words = `${edge.label ? `${edge.label} ` : ''}→ ${byId.get(edge.to)!.label ?? edge.to}`;
                  return (
                    <li key={edge.id} className="flex min-w-0 flex-wrap items-baseline gap-x-2 text-[12px] text-text-secondary">
                      {onSelectEdge ? (
                        <button
                          type="button"
                          onClick={() => onSelectEdge(edge.id)}
                          aria-current={selectedId === edge.id ? 'true' : undefined}
                          className="cursor-pointer border-none bg-transparent p-0 text-left text-[12px] text-primary hover:underline"
                        >
                          {words}
                        </button>
                      ) : <span>{words}</span>}
                      {edge.detail != null && <span className="text-text-tertiary">{edge.detail}</span>}
                      {edge.marker && <span className="text-text-tertiary">· {edge.marker.label}</span>}
                    </li>
                  );
                })}
              </ul>
            )}
          </li>
        );
      })}
    </ol>
  );
}

export function TypedNodeCanvas<N extends TypedCanvasNode = TypedCanvasNode>({
  nodes,
  edges,
  renderNode,
  layout = 'ltr',
  onSelectNode,
  onSelectEdge,
  selectedId = null,
  listFallback = false,
  renderListItem,
  nodeWidth = DEFAULT_NODE_WIDTH,
  nodeHeight = DEFAULT_NODE_HEIGHT,
  columnGap = 144,
  rowGap = 32,
  controls = true,
  caption,
  minZoom = 0.3,
  maxZoom = 2,
  onViewportChange,
  emptyLabel = 'Nothing to draw yet',
  className,
  'aria-label': ariaLabel = 'Graph',
  'data-testid': testId = 'typed-node-canvas',
}: TypedNodeCanvasProps<N>) {
  const reducedMotion = usePrefersReducedMotion();
  const host = useRef<HTMLDivElement | null>(null);
  const userMoved = useRef(false);

  const positions = useMemo(
    () => layoutTypedNodes(nodes, edges, { layout, nodeWidth, nodeHeight, columnGap, rowGap }),
    [nodes, edges, layout, nodeWidth, nodeHeight, columnGap, rowGap],
  );
  // Reading order: left to right, then top to bottom — the tab order and the list order.
  const order = useMemo(() => {
    const sorted = [...nodes].sort((a, b) => {
      const pa = positions.get(a.id)!;
      const pb = positions.get(b.id)!;
      return pa.x - pb.x || pa.y - pb.y;
    });
    return new Map(sorted.map((n, i) => [n.id, i]));
  }, [nodes, positions]);

  const nodeIds = useMemo(() => new Set(nodes.map((n) => n.id)), [nodes]);
  const drawable = useMemo(() => edges.filter((e) => nodeIds.has(e.from) && nodeIds.has(e.to) && e.from !== e.to), [edges, nodeIds]);
  const fitKey = useMemo(() => [...nodeIds].sort().join('|'), [nodeIds]);

  if (nodes.length === 0) {
    return (
      <div className={cn('flex min-h-40 items-center justify-center text-[13px] text-text-tertiary', className)} data-testid={`${testId}-empty`}>
        {emptyLabel}
      </div>
    );
  }

  if (listFallback) {
    return (
      <ListView
        nodes={nodes}
        edges={drawable}
        order={order}
        selectedId={selectedId}
        onSelectNode={onSelectNode}
        onSelectEdge={onSelectEdge}
        renderListItem={renderListItem}
        ariaLabel={ariaLabel}
        testId={testId}
        className={className}
      />
    );
  }

  const flowNodes: CanvasFlowNode[] = [...nodes]
    .sort((a, b) => order.get(a.id)! - order.get(b.id)!)
    .map((node) => {
      const selected = selectedId === node.id;
      return {
        id: node.id,
        type: 'typed',
        position: positions.get(node.id)!,
        draggable: false,
        connectable: false,
        selectable: false,
        focusable: false,
        width: nodeWidth,
        data: {
          content: renderNode(node, { selected }),
          label: node.label ?? node.id,
          selected,
          width: nodeWidth,
          onSelect: onSelectNode ? () => onSelectNode(node.id) : undefined,
        },
      };
    });

  const flowEdges: CanvasFlowEdge[] = drawable.map((edge) => {
    const [from, to] = sidesFor(positions.get(edge.from)!, positions.get(edge.to)!, nodeWidth);
    const sourceHandle = from === 'r' ? 'r' : from === 'b' ? 'b' : from === 'l' ? 'ls' : 'ts';
    const targetHandle = to === 'l' ? 'l' : to === 't' ? 't' : to === 'r' ? 'rt' : 'bt';
    return {
      id: edge.id,
      type: 'typed',
      source: edge.from,
      target: edge.to,
      sourceHandle,
      targetHandle,
      focusable: false,
      selectable: false,
      data: {
        entity: edge,
        selected: selectedId === edge.id,
        reducedMotion,
        onSelect: onSelectEdge ? () => onSelectEdge(edge.id) : undefined,
      },
    };
  });

  // Arrow keys walk the nodes in reading order; Tab still works as usual.
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
    const target = event.target as HTMLElement;
    if (!target.matches('[data-canvas-node]')) return;
    const all = Array.from(host.current?.querySelectorAll<HTMLElement>('[data-canvas-node]') ?? []);
    const at = all.indexOf(target);
    if (at < 0) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0
      : event.key === 'End' ? all.length - 1
        : event.key === 'ArrowRight' || event.key === 'ArrowDown' ? Math.min(all.length - 1, at + 1)
          : Math.max(0, at - 1);
    all[next]?.focus();
  };

  return (
    <div
      ref={host}
      role="region"
      aria-label={ariaLabel}
      className={cn('relative isolate min-h-64 min-w-0 overflow-hidden', className)}
      onKeyDown={onKeyDown}
      data-testid={testId}
      data-reduced-motion={reducedMotion ? 'true' : 'false'}
    >
      <ReactFlow<CanvasFlowNode, CanvasFlowEdge>
        nodes={flowNodes}
        edges={flowEdges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        fitViewOptions={{ padding: 0.15, maxZoom: 1 }}
        minZoom={minZoom}
        maxZoom={maxZoom}
        onEdgeClick={onSelectEdge ? (_event, edge) => onSelectEdge(edge.id) : undefined}
        onViewportChange={onViewportChange}
        // A move with an event is the reader's (drag, pinch); programmatic
        // fits and zooms pass none.
        onMoveStart={(event) => { if (event) userMoved.current = true; }}
        nodesDraggable={false}
        nodesConnectable={false}
        nodesFocusable={false}
        edgesFocusable={false}
        elementsSelectable={false}
        zoomOnScroll={false}
        preventScrolling={false}
        deleteKeyCode={null}
        disableKeyboardA11y
        proOptions={{ hideAttribution: true }}
      >
        <CanvasChrome controls={controls} caption={caption} minZoom={minZoom} maxZoom={maxZoom} fitKey={fitKey} reducedMotion={reducedMotion} userMoved={userMoved} />
      </ReactFlow>
    </div>
  );
}

export default TypedNodeCanvas;

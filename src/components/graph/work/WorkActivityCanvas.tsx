import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Background, EdgeLabelRenderer, Handle, MarkerType, Position, ReactFlow, type Edge, type EdgeProps, type Node, type NodeProps } from '@xyflow/react';
import AnimatedEdge from '../../pipelines/canvas/edges/AnimatedEdge';
import { ACTIVITY_RIPPLE_GRID, ACTIVITY_RIPPLE_GRID_DARK, RippleGridBackground } from '../../shared/RippleGridBackground';
import { useResolvedBackdropTone } from '../../shared/backdropTone';
import { TitledFrame } from '../../shared/TitledFrame';
import { Button } from '../../ui/Button';
import InlineAlert from '../../shared/InlineAlert';
import { IconButton } from '../../ui/IconButton';
import { cn } from '../../../lib/cn';
import {
  layoutWorkEfforts,
  limitWorkEfforts,
  WORK_ACTIVITY_ALL_EFFORTS,
  WORK_ACTIVITY_DEFAULT_MAX_EFFORTS,
  WORK_CANVAS_FIT_MIN_ZOOM,
  WORK_CANVAS_OPEN_ZOOM,
  WORK_CANVAS_MIN_ZOOM,
  WORK_CANVAS_READABLE_ZOOM,
  type WorkNodeBounds,
} from './effortLayout';
import { WorkActivityNode } from './WorkActivityNode';
import type { WorkActivityNodeDetail, WorkActivityPresentation, WorkGraphProps, WorkGraphViewport } from './types';

export type { WorkActivityCanvasBackground } from './types';

type ActivityProps = WorkGraphProps & {
  activity: WorkActivityPresentation;
  /**
   * Open the accessible list. The canvas offers it when a fitted graph lands
   * below the readable zoom — at that size the cards are a map, and the list
   * is the only way to actually read the work. Absent, the hint still says
   * what happened but has nothing to point at.
   */
  onViewAsList?: () => void;
  /**
   * How many effort graphs to draw at once. Defaults to
   * `WORK_ACTIVITY_DEFAULT_MAX_EFFORTS` (2) — the canvas fits everything it is
   * given into one pane, so nine lanes fit at a zoom nobody can read.
   *
   * `WORK_ACTIVITY_ALL_EFFORTS` (0) or a non-finite value lifts the cap. The
   * NEWEST efforts are kept, the effort holding the current selection is never
   * dropped, and nothing here changes what the host counts: the efforts it
   * passed are still the efforts it has.
   */
  maxEfforts?: number;
};
interface ActivityNodeData extends Record<string, unknown> {
  entity: WorkGraphProps['nodes'][number]; detail?: WorkActivityNodeDetail;
  live: boolean; revisionId?: string; onSelect: WorkGraphProps['onSelectionChange']; onFeedback: WorkActivityPresentation['onFeedback'];
}
interface FrameData extends Record<string, unknown> { title: string; subtitle?: string; live: boolean; sources: number; expanded: boolean; focused: boolean; onFocus: () => void; onSources: () => void; cycle: boolean }
interface ActivityEdgeData extends Record<string, unknown> { canonicalId: string; label: string; pill?: string; active: boolean; failed: boolean; onSelect: () => void; labelX: number; labelY: number }
type ActivityNode = Node<ActivityNodeData, 'activity'>;
type FrameNode = Node<FrameData, 'effort'>;
type ActivityEdge = Edge<ActivityEdgeData, 'activity'>;

// Small grey dots, not the default near-black: an anchor is a seam, not a
// control, and nothing here is draggable.
const HANDLE = '!h-1.5 !w-1.5 !min-h-0 !min-w-0 !border-0 !bg-border-emphasis';

// Four fixed anchors, so a relationship enters and leaves on the side the grid
// puts it — an edge that picks its own side is what draws detour loops.
function ResourceNode({ data, selected }: NodeProps<ActivityNode>) {
  return <>
    <Handle type="target" id="in-left" position={Position.Left} isConnectable={false} className={HANDLE} />
    <Handle type="target" id="in-top" position={Position.Top} isConnectable={false} className={HANDLE} />
    <WorkActivityNode node={data.entity} detail={data.detail} live={data.live} selected={!!selected} selectedRevisionId={data.revisionId} onSelect={data.onSelect} onFeedback={data.onFeedback} />
    <Handle type="source" id="out-right" position={Position.Right} isConnectable={false} className={HANDLE} />
    <Handle type="source" id="out-bottom" position={Position.Bottom} isConnectable={false} className={HANDLE} />
  </>;
}
// The title owns the top border; the sources/Focus actions sit on the subtitle
// line under it. In the border they took priority over the title and a narrow
// effort read as "Coverag…" (NFR #164). The title truncates with a tooltip.
function EffortFrame({ data }: NodeProps<FrameNode>) {
  return <TitledFrame tone="surface" titleText={data.title} title={
    <span className="flex min-w-0 max-w-full items-center gap-1.5 font-sans text-[11px] font-semibold text-text-secondary">
      {data.live && <span aria-hidden="true" className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary/50" />}
      <span className="truncate" data-work-effort-title="">{data.title}</span>
    </span>
  } className="pointer-events-none h-full w-full rounded-xl border-dashed border-border-subtle bg-surface/60" data-testid="work-effort">
    <div className="flex min-w-0 items-center gap-2 px-4 pt-1 text-[10px] leading-4 text-text-tertiary">
      <span className="min-w-0 flex-1 truncate" title={data.subtitle}>
        {data.subtitle}
        {data.cycle && <span role="status" className="ml-2 text-warning-fg">Relationship order unavailable</span>}
      </span>
      <span className="pointer-events-auto flex shrink-0 items-center gap-2">
        {data.sources > 0 && <Button size="sm" variant="link" className="nodrag nopan text-[10px]" aria-label={`${data.expanded ? 'Hide' : 'Show'} ${data.sources} sources for ${data.title}`} onClick={data.onSources}>{data.expanded ? 'Hide sources' : `+ ${data.sources} sources`}</Button>}
        <Button size="sm" variant="link" className="nodrag nopan text-[10px]" aria-label={data.focused ? 'Show all activities' : `Focus on ${data.title}`} onClick={data.onFocus}>{data.focused ? 'All activities' : 'Focus'}</Button>
      </span>
    </div>
  </TitledFrame>;
}
function Relationship(props: EdgeProps<ActivityEdge>) {
  const data = props.data;
  if (!data) return null;
  return <>
    <AnimatedEdge {...props} data={{ state: data.failed ? 'traversed-failure' : data.active ? 'active' : 'default' }} />
    <EdgeLabelRenderer>
      <button
        type="button"
        className={cn(
          'nodrag nopan pointer-events-auto absolute z-10 flex items-center justify-center rounded-full text-[10px] font-medium leading-none focus-visible:outline-2 focus-visible:outline-primary',
          data.pill
            ? cn('h-5 max-w-28 border bg-surface px-2 shadow-sm', data.failed ? 'border-danger text-danger-fg' : data.active ? 'border-info text-info-fg' : 'border-border-emphasis text-text-secondary')
            : 'h-3 w-3 border border-transparent bg-transparent text-transparent focus-visible:border-border focus-visible:bg-surface',
        )}
        style={{ transform: `translate(-50%, -50%) translate(${data.labelX}px, ${data.labelY}px)` }}
        onClick={data.onSelect}
        aria-label={`${data.label}${data.failed ? ', failed' : data.active ? ', active' : ''}`}
        title={data.label}
        data-work-edge-label={data.canonicalId}
      >
        {data.pill ? <span className="truncate">{data.pill}</span> : <span className="sr-only">{data.label}</span>}
      </button>
    </EdgeLabelRenderer>
  </>;
}
const nodeTypes = { activity: ResourceNode, effort: EffortFrame };
const edgeTypes = { activity: Relationship };

/** One canvas; effort frames and visual instances never change canonical IDs. */
export function WorkActivityCanvas(props: ActivityProps) {
  const { activity, nodes, edges, selection, viewport, onViewportChange, onSelectionChange, background = 'ripple-grid', onViewAsList, maxEfforts = WORK_ACTIVITY_DEFAULT_MAX_EFFORTS } = props;
  const host = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 640, height: 480 });
  const [measurements, setMeasurements] = useState<Map<string, WorkNodeBounds>>(new Map());
  const lastGeometry = useRef<string | null>(null);
  // The node the viewport was last moved to (or found already showing).
  const lastCentred = useRef<string | undefined>(undefined);
  const previousFocus = useRef(activity.view.focusedEffortId);
  const { view, onViewChange } = activity;
  useEffect(() => {
    const element = host.current;
    if (!element || typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (width > 0 && height > 0) setSize((previous) => previous.width === width && previous.height === height ? previous : { width, height });
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  // Joined, so a fresh object of the same labels does not re-run the layout.
  const labelledKey = [...Object.keys(activity.edgeLabels ?? {}), ...(activity.failedEdgeIds ?? [])].sort().join('\u0000');
  // The effort the viewer is actually in survives the cap: a focused effort by
  // definition, and otherwise whichever one holds the selected node.
  const selectedNodeId = selection?.kind === 'node' ? selection.id : undefined;
  const keepEffortId = view.focusedEffortId ?? (selectedNodeId ? activity.efforts.find((effort) => effort.nodeIds.includes(selectedNodeId))?.id ?? null : null);
  const efforts = useMemo(() => limitWorkEfforts(activity.efforts, nodes, { max: maxEfforts, keepEffortId }), [activity.efforts, nodes, maxEfforts, keepEffortId]);
  const layouts = useMemo(() => layoutWorkEfforts(nodes, edges, efforts, { width: size.width, height: size.height, full: activity.mode === 'full', focusedEffortId: view.focusedEffortId, expandedSourceEfforts: view.expandedSourceEfforts, reversedEdgeIds: activity.reversedEdgeIds, labelledEdgeIds: labelledKey.split('\u0000').filter(Boolean), measurements }), [nodes, edges, efforts, activity.mode, activity.reversedEdgeIds, labelledKey, view.focusedEffortId, view.expandedSourceEfforts, size, measurements]);
  const bounds = useMemo(() => {
    const left = Math.min(0, ...layouts.map((group) => group.x));
    const top = Math.min(0, ...layouts.map((group) => group.y));
    const width = Math.max(1, ...layouts.map((group) => group.x + group.width)) - left;
    const height = Math.max(1, ...layouts.map((group) => group.y + group.height)) - top;
    return { left, top, width, height };
  }, [layouts]);
  const fit = useCallback((): WorkGraphViewport => {
    const { left, top, width, height } = bounds;
    // Fill the canvas: the work should span the pane with a margin, not sit in
    // a corner of it. The floor here is the FIT floor, not the interactive
    // one — a fit clamped to 0.4 leaves the top row of a nine-effort day
    // permanently outside the viewport while the button that promises to fix
    // that appears to do nothing.
    const zoom = Math.max(WORK_CANVAS_FIT_MIN_ZOOM, Math.min(1.2, (size.width - 48) / width, (size.height - 48) / height));
    return { x: (size.width - width * zoom) / 2 - left * zoom, y: (size.height - height * zoom) / 2 - top * zoom, zoom };
  }, [bounds, size]);
  // What the canvas opens at: the whole graph when it fits readably (or the
  // host asked for every effort — a map), else a readable zoom anchored at the
  // top, where the newest work is. See WORK_CANVAS_OPEN_ZOOM.
  const capped = maxEfforts !== WORK_ACTIVITY_ALL_EFFORTS;
  const open = useCallback((): WorkGraphViewport => {
    const whole = fit();
    if (!capped) return whole;
    const { left, top, width } = bounds;
    const zoom = Math.max(whole.zoom, Math.min(WORK_CANVAS_OPEN_ZOOM, (size.width - 48) / width));
    if (zoom <= whole.zoom) return whole;
    return { x: (size.width - width * zoom) / 2 - left * zoom, y: 24 - top * zoom, zoom };
  }, [fit, capped, bounds, size]);
  // Where the selected node sits on the canvas, in flow coordinates.
  const selectedRect = useMemo(() => {
    if (!selectedNodeId) return null;
    for (const group of layouts) {
      const instance = group.nodes.find((node) => node.entityId === selectedNodeId);
      if (instance) return { x: group.x + instance.x, y: group.y + instance.y, width: instance.width, height: instance.height };
    }
    return null;
  }, [layouts, selectedNodeId]);
  // The same zoom, panned so the selected node is in the middle — at least a
  // readable zoom, since a node picked from outside the canvas (a deep link,
  // the list, a citation) has to be legible where it lands.
  const centred = useCallback((base: WorkGraphViewport): WorkGraphViewport => {
    if (!selectedRect) return base;
    const zoom = Math.max(base.zoom, Math.min(WORK_CANVAS_OPEN_ZOOM, (size.width - 48) / selectedRect.width));
    return { x: size.width / 2 - (selectedRect.x + selectedRect.width / 2) * zoom, y: size.height / 2 - (selectedRect.y + selectedRect.height / 2) * zoom, zoom };
  }, [selectedRect, size]);
  // A status border or a new text line can change measurements. Re-layout may
  // reserve that space, but only a navigation/topology intent may reset zoom.
  const geometry = JSON.stringify([size, activity.mode, view.focusedEffortId, view.expandedSourceEfforts, layouts.map((group) => [group.id, group.nodes.map((node) => node.id), group.edges.map((edge) => edge.id)]), layouts.every((group) => group.nodes.every((node) => measurements.has(node.entityId)))]);
  useEffect(() => {
    if (lastGeometry.current === geometry) return;
    const first = lastGeometry.current === null;
    lastGeometry.current = geometry;
    const restoring = previousFocus.current && !view.focusedEffortId && view.overviewViewport;
    previousFocus.current = view.focusedEffortId;
    if (restoring) { onViewportChange(restoring); return; }
    if (first && view.canvasInitialized) return;
    onViewportChange(centred(open()));
    lastCentred.current = selectedNodeId;
    if (!view.canvasInitialized) onViewChange({ ...view, canvasInitialized: true });
  }, [geometry, open, centred, view, onViewChange, onViewportChange]);
  // A selection made from outside the canvas (a deep link, the list, the
  // pane's links) pans to its node when that node is not already on screen.
  // A click on the canvas selects something visible, so it never moves.
  useEffect(() => {
    if (!selectedNodeId) { lastCentred.current = undefined; return; }
    if (lastCentred.current === selectedNodeId || !selectedRect || lastGeometry.current === null) return;
    lastCentred.current = selectedNodeId;
    const left = selectedRect.x * viewport.zoom + viewport.x;
    const top = selectedRect.y * viewport.zoom + viewport.y;
    const visible = left >= 0 && top >= 0 && left + selectedRect.width * viewport.zoom <= size.width && top + selectedRect.height * viewport.zoom <= size.height;
    if (!visible) onViewportChange(centred(viewport));
  }, [selectedNodeId, selectedRect, viewport, size, centred, onViewportChange]);
  const focus = (id: string) => onViewChange({ ...view, focusedEffortId: view.focusedEffortId === id ? null : id, overviewViewport: view.focusedEffortId ? view.overviewViewport : viewport });
  const byId = new Map(nodes.map((node) => [node.id, node]));
  const byEdge = new Map(edges.map((edge) => [edge.id, edge]));
  const live = activity.window.following;
  const activeEdges = new Set(live ? activity.activeEdgeIds : []);
  const failedEdges = new Set(activity.failedEdgeIds ?? []);
  const flowNodes: Array<ActivityNode | FrameNode> = [];
  const flowEdges: ActivityEdge[] = [];
  for (const group of layouts) {
    const frameId = JSON.stringify(['effort', group.id]);
    const expanded = view.expandedSourceEfforts.includes(group.id);
    flowNodes.push({ id: frameId, type: 'effort', position: { x: group.x, y: group.y }, style: { width: group.width, height: group.height }, selectable: false, focusable: false, data: { title: group.title, subtitle: group.subtitle, live: live && group.nodes.some((instance) => byId.get(instance.entityId)?.status === 'running'), sources: !view.focusedEffortId && (group.collapsedSourceCount > 0 || expanded) ? group.sourceCount : 0, expanded, focused: view.focusedEffortId === group.id, cycle: group.cyclicNodeIds.length > 0, onFocus: () => focus(group.id), onSources: () => onViewChange({ ...view, expandedSourceEfforts: expanded ? view.expandedSourceEfforts.filter((id) => id !== group.id) : [...view.expandedSourceEfforts, group.id] }) } });
    for (const instance of group.nodes) {
      flowNodes.push({ id: instance.id, type: 'activity', parentId: frameId, extent: 'parent', position: { x: instance.x, y: instance.y }, selected: selection?.kind === 'node' && selection.id === instance.entityId, focusable: false, data: { entity: byId.get(instance.entityId)!, detail: activity.details?.[instance.entityId], revisionId: selection?.kind === 'node' && selection.id === instance.entityId ? selection.revisionId : undefined, live, onSelect: onSelectionChange, onFeedback: activity.onFeedback } });
    }
    for (const instance of group.edges) {
      const edge = byEdge.get(instance.entityId)!;
      const labelX = group.x + instance.labelX;
      const labelY = group.y + instance.labelY;
      const active = activeEdges.has(edge.id) && edge.status === 'running' && !edge.endedAt;
      const failed = failedEdges.has(edge.id);
      const label = edge.label || edge.relation.replaceAll('-', ' ');
      // Only an operation the host has named earns a pill; a failed one always
      // says so. Everything else stays a plain line, and its selection
      // affordance stays keyboard-only.
      const pill = activity.edgeLabels?.[edge.id] ?? (failed ? 'failed' : undefined);
      flowEdges.push({ id: instance.id, type: 'activity', source: instance.source, target: instance.target, sourceHandle: instance.sourceHandle, targetHandle: instance.targetHandle, selected: selection?.kind === 'edge' && selection.id === edge.id, focusable: false, markerEnd: { type: MarkerType.ArrowClosed, color: failed ? 'var(--color-danger)' : 'var(--color-border-emphasis)' }, data: { canonicalId: edge.id, label, pill, active, failed, labelX, labelY, onSelect: () => onSelectionChange({ kind: 'edge', id: edge.id }) } });
    }
  }
  const knownInstances = new Map(flowNodes.filter((node): node is ActivityNode => node.type === 'activity').map((node) => [node.id, node.data.entity.id]));
  // A fit may legitimately have put us below the interactive floor. Zooming
  // OUT from there must not silently zoom in, so the floor for a manual zoom
  // is the interactive one or wherever the fit left us, whichever is lower.
  const zoomFloor = Math.min(WORK_CANVAS_MIN_ZOOM, viewport.zoom);
  const zoomBy = (factor: number) => onViewportChange({ ...viewport, zoom: Math.max(zoomFloor, Math.min(2.5, viewport.zoom * factor)) });
  const belowReadable = viewport.zoom < WORK_CANVAS_READABLE_ZOOM;
  const ripple = background === 'ripple-grid';
  // Which ink the grid uses follows the theme the canvas is actually inside
  // (`data-theme` up the tree, else the system preference): the light preset
  // paints an opaque white ground, which on a dark page is a white box.
  const tone = useResolvedBackdropTone(host, 'auto', ripple);
  const ripplePreset = tone === 'night' ? ACTIVITY_RIPPLE_GRID_DARK : ACTIVITY_RIPPLE_GRID;
  // A 160 px floor, not 320: inside a short panel (a 577 px viewport's chat
  // column) a 320 px minimum overflowed its parent and scrolled the page. The
  // canvas takes what the column gives it and fits the graph into that.
  return <div ref={host} className="relative isolate min-h-40 min-w-0 flex-1 overflow-hidden" data-testid="work-activity-canvas" data-background={background} data-backdrop-ink={ripple ? (tone === 'night' ? 'dark' : 'light') : undefined}>
    {/* Behind React Flow, not inside it: the pane and every node above are
        transparent over this, and the canvas takes no pointer events, so
        dragging, selecting and the edge hit-boxes are untouched. */}
    {ripple && <RippleGridBackground {...ripplePreset} className="absolute inset-0 -z-10" data-testid="work-activity-ripple" />}
    <ReactFlow<ActivityNode | FrameNode, ActivityEdge> nodes={flowNodes} edges={flowEdges} nodeTypes={nodeTypes} edgeTypes={edgeTypes} viewport={viewport} onViewportChange={onViewportChange} onPaneClick={() => onSelectionChange(null)} onEdgeClick={(_event, edge) => edge.data?.onSelect()} minZoom={zoomFloor} maxZoom={2.5} nodesDraggable={false} nodesConnectable={false} elementsSelectable={false} deleteKeyCode={null} proOptions={{ hideAttribution: true }} onNodesChange={(changes) => {
      const dimensions = changes.filter((change) => change.type === 'dimensions');
      if (!dimensions.length) return;
      setMeasurements((previous) => {
        const next = new Map(previous);
        let changed = false;
        for (const change of dimensions) {
          const id = knownInstances.get(change.id);
          if (!id || !change.dimensions) continue;
          const old = previous.get(id);
          const bounds = { width: Math.max(old?.width ?? 0, change.dimensions.width), height: Math.max(old?.height ?? 0, change.dimensions.height) };
          if (old?.width !== bounds.width || old?.height !== bounds.height) { next.set(id, bounds); changed = true; }
        }
        return changed ? next : previous;
      });
    }}>
      {!ripple && <Background gap={20} size={1} color="var(--color-border)" />}
    </ReactFlow>
    {belowReadable && (
      <InlineAlert
        tone="info"
        className="absolute left-3 top-3 z-10 max-w-[min(26rem,calc(100%-1.5rem))] text-[11px]"
        data-testid="work-activity-zoom-hint"
      >
        <span>
          The whole graph is in view, but too small to read.
          {onViewAsList && ' '}
        </span>
        {onViewAsList && (
          <Button size="sm" variant="link" onClick={onViewAsList} data-testid="work-activity-zoom-hint-list">
            View as accessible list
          </Button>
        )}
      </InlineAlert>
    )}
    <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-md border border-border bg-surface p-1" data-testid="work-activity-controls">
      <IconButton size="sm" aria-label="Zoom in" onClick={() => zoomBy(1.2)}>+</IconButton>
      <IconButton size="sm" aria-label="Zoom out" onClick={() => zoomBy(1 / 1.2)}>−</IconButton>
      <Button size="sm" variant="secondary" onClick={() => onViewportChange(fit())}>Fit graph</Button>
    </div>
    <ul aria-label="Activity emphasis legend" className="pointer-events-none absolute bottom-4 right-4 flex items-center gap-2 rounded bg-surface/90 px-2 py-1 text-[10px] text-text-tertiary">
      {([['earlier', 'Earlier', 'border-border bg-surface-inset opacity-70'], ['input', 'Input', 'border-border-emphasis bg-surface-inset'], ['active', live ? 'Active' : 'Active then', 'border-info bg-info']] as const).map(([key, label, swatch]) => (
        <li key={key} className="flex items-center gap-1"><span aria-hidden="true" className={cn('inline-block h-2 w-2 rounded-sm border', swatch)} />{label}</li>
      ))}
    </ul>
  </div>;
}

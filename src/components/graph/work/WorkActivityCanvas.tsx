import { useEffect, useMemo, useRef, useState } from 'react';
import { Background, Controls, EdgeLabelRenderer, Handle, MarkerType, Position, ReactFlow, type Edge, type EdgeProps, type Node, type NodeProps } from '@xyflow/react';
import AnimatedEdge from '../../pipelines/canvas/edges/AnimatedEdge';
import { TitledFrame } from '../../shared/TitledFrame';
import { Button } from '../../ui/Button';
import { layoutWorkEfforts, type WorkNodeBounds } from './effortLayout';
import { WorkActivityNode } from './WorkActivityNode';
import type { WorkActivityNodeDetail, WorkActivityPresentation, WorkGraphProps } from './types';

type ActivityProps = WorkGraphProps & { activity: WorkActivityPresentation };
interface ActivityNodeData extends Record<string, unknown> {
  entity: WorkGraphProps['nodes'][number]; detail?: WorkActivityNodeDetail;
  live: boolean; vertical: boolean; revisionId?: string; onSelect: WorkGraphProps['onSelectionChange']; onFeedback: WorkActivityPresentation['onFeedback'];
}
interface FrameData extends Record<string, unknown> { title: string; sources: number; expanded: boolean; focused: boolean; onFocus: () => void; onSources: () => void; cycle: boolean }
interface ActivityEdgeData extends Record<string, unknown> { canonicalId: string; label: string; active: boolean; vertical: boolean; onSelect: () => void; labelX: number; labelY: number }
type ActivityNode = Node<ActivityNodeData, 'activity'>;
type FrameNode = Node<FrameData, 'effort'>;
type ActivityEdge = Edge<ActivityEdgeData, 'activity'>;

function ResourceNode({ data, selected }: NodeProps<ActivityNode>) {
  return <>
    <Handle type="target" position={data.vertical ? Position.Top : Position.Left} isConnectable={false} />
    <WorkActivityNode node={data.entity} detail={data.detail} live={data.live} selected={!!selected} selectedRevisionId={data.revisionId} onSelect={data.onSelect} onFeedback={data.onFeedback} />
    <Handle type="source" position={data.vertical ? Position.Bottom : Position.Right} isConnectable={false} />
  </>;
}
function EffortFrame({ data }: NodeProps<FrameNode>) {
  return <TitledFrame tone="surface" title={<span className="font-sans text-xs font-semibold text-text-secondary">{data.title}</span>} className="h-full w-full bg-surface/50" data-testid="work-effort" titleAction={
    <Button size="sm" variant="ghost" className="nodrag nopan" onClick={data.onFocus}>{data.focused ? 'All activities' : 'Focus'}</Button>
  }>
    <div className="flex items-center gap-2 px-3 pt-2">
      {data.sources > 0 && <Button size="sm" variant="ghost" className="nodrag nopan pointer-events-auto" onClick={data.onSources}>{data.expanded ? 'Hide earlier sources' : `${data.sources} sources`}</Button>}
      {data.cycle && <span role="status" className="text-xs text-warning-fg">Relationship order unavailable</span>}
    </div>
  </TitledFrame>;
}
function Relationship(props: EdgeProps<ActivityEdge>) {
  const data = props.data;
  if (!data) return null;
  return <>
    <AnimatedEdge {...props} data={{ state: data.active ? 'active' : 'default' }} />
    <EdgeLabelRenderer>
      <button type="button" className="nodrag nopan pointer-events-auto absolute flex h-8 w-28 items-center justify-center rounded border border-border bg-surface px-1 text-xs leading-tight text-text-secondary focus-visible:outline-2 focus-visible:outline-primary" style={{ transform: `translate(-50%, -50%) translate(${data.labelX}px, ${data.labelY}px)` }} onClick={data.onSelect} aria-label={`${data.label}${data.active ? ', active' : ''}`} title={data.label} data-work-edge-label={data.canonicalId}>
        <span className="line-clamp-2 break-words">{data.label}</span>
      </button>
    </EdgeLabelRenderer>
  </>;
}
const nodeTypes = { activity: ResourceNode, effort: EffortFrame };
const edgeTypes = { activity: Relationship };

/** One canvas; effort frames and visual instances never change canonical IDs. */
export function WorkActivityCanvas(props: ActivityProps) {
  const { activity, nodes, edges, selection, viewport, onViewportChange, onSelectionChange } = props;
  const host = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 640, height: 480 });
  const [measurements, setMeasurements] = useState<Map<string, WorkNodeBounds>>(new Map());
  const lastGeometry = useRef<string | null>(null);
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
  const layouts = useMemo(() => layoutWorkEfforts(nodes, edges, activity.efforts, { width: size.width, height: size.height - 56, full: activity.mode === 'full', focusedEffortId: view.focusedEffortId, expandedSourceEfforts: view.expandedSourceEfforts, reversedEdgeIds: activity.reversedEdgeIds, measurements }), [nodes, edges, activity.efforts, activity.mode, activity.reversedEdgeIds, view.focusedEffortId, view.expandedSourceEfforts, size, measurements]);
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
    const width = Math.max(1, ...layouts.map((group) => group.x + group.width));
    const height = Math.max(1, ...layouts.map((group) => group.y + group.height));
    // Do not shrink a many-effort canvas below readable text. Pan/focus remain available.
    const zoom = Math.max(1, Math.min(1.2, (size.width - 48) / width, (size.height - 56) / height));
    onViewportChange({ x: 16, y: 24, zoom });
    if (!view.canvasInitialized) onViewChange({ ...view, canvasInitialized: true });
  }, [geometry, layouts, size, view, onViewChange, onViewportChange]);
  const focus = (id: string) => onViewChange({ ...view, focusedEffortId: view.focusedEffortId === id ? null : id, overviewViewport: view.focusedEffortId ? view.overviewViewport : viewport });
  const byId = new Map(nodes.map((node) => [node.id, node]));
  const byEdge = new Map(edges.map((edge) => [edge.id, edge]));
  const live = activity.window.following;
  const activeEdges = new Set(live ? activity.activeEdgeIds : []);
  const flowNodes: Array<ActivityNode | FrameNode> = [];
  const flowEdges: ActivityEdge[] = [];
  for (const group of layouts) {
    const frameId = JSON.stringify(['effort', group.id]);
    const expanded = view.expandedSourceEfforts.includes(group.id);
    flowNodes.push({ id: frameId, type: 'effort', position: { x: group.x, y: group.y }, style: { width: group.width, height: group.height }, selectable: false, focusable: false, data: { title: group.title, sources: !view.focusedEffortId && (group.collapsedSourceCount > 0 || expanded) ? group.sourceCount : 0, expanded, focused: view.focusedEffortId === group.id, cycle: group.cyclicNodeIds.length > 0, onFocus: () => focus(group.id), onSources: () => onViewChange({ ...view, expandedSourceEfforts: expanded ? view.expandedSourceEfforts.filter((id) => id !== group.id) : [...view.expandedSourceEfforts, group.id] }) } });
    for (const instance of group.nodes) {
      flowNodes.push({ id: instance.id, type: 'activity', parentId: frameId, extent: 'parent', position: { x: instance.x, y: instance.y }, selected: selection?.kind === 'node' && selection.id === instance.entityId, focusable: false, data: { entity: byId.get(instance.entityId)!, detail: activity.details?.[instance.entityId], revisionId: selection?.kind === 'node' && selection.id === instance.entityId ? selection.revisionId : undefined, live, vertical: group.vertical, onSelect: onSelectionChange, onFeedback: activity.onFeedback } });
    }
    for (const instance of group.edges) {
      const edge = byEdge.get(instance.entityId)!;
      const labelX = group.x + instance.labelX;
      const labelY = group.y + instance.labelY;
      flowEdges.push({ id: instance.id, type: 'activity', source: instance.source, target: instance.target, selected: selection?.kind === 'edge' && selection.id === edge.id, focusable: false, markerEnd: { type: MarkerType.ArrowClosed, color: 'var(--color-border-emphasis)' }, data: { canonicalId: edge.id, label: edge.label || edge.relation.replaceAll('-', ' '), active: activeEdges.has(edge.id) && edge.status === 'running' && !edge.endedAt, vertical: group.vertical, labelX, labelY, onSelect: () => onSelectionChange({ kind: 'edge', id: edge.id }) } });
    }
  }
  const knownInstances = new Map(flowNodes.filter((node): node is ActivityNode => node.type === 'activity').map((node) => [node.id, node.data.entity.id]));
  return <div ref={host} className="relative min-h-80 min-w-0 flex-1 overflow-hidden" data-testid="work-activity-canvas">
    <ReactFlow<ActivityNode | FrameNode, ActivityEdge> nodes={flowNodes} edges={flowEdges} nodeTypes={nodeTypes} edgeTypes={edgeTypes} viewport={viewport} onViewportChange={onViewportChange} onPaneClick={() => onSelectionChange(null)} onEdgeClick={(_event, edge) => edge.data?.onSelect()} minZoom={0.5} maxZoom={2.5} nodesDraggable={false} nodesConnectable={false} elementsSelectable={false} deleteKeyCode={null} proOptions={{ hideAttribution: true }} onNodesChange={(changes) => {
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
      <Background gap={20} size={1} color="var(--color-border)" />
      <Controls showInteractive={false} fitViewOptions={{ minZoom: 1, maxZoom: 1.2, padding: 0.15 }} />
    </ReactFlow>
  </div>;
}

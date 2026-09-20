import {
  Background,
  BaseEdge,
  Controls,
  Handle,
  Position,
  ReactFlow,
  getBezierPath,
  type Edge,
  type EdgeProps,
  type Node,
  type NodeProps,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useEffect, useMemo } from 'react';
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';
import { cn } from '../../../lib/cn';
import EmptyState from '../../shared/EmptyState';
import { Button } from '../../ui/Button';
import { WorkEdge } from './WorkEdge';
import { WorkEntityList } from './WorkEntityList';
import { WorkInspector } from './WorkInspector';
import { WorkNode } from './WorkNode';
import { WorkActivityTimeline } from './WorkActivityTimeline';
import { WorkActivityGraph } from './WorkActivityGraph';
import type {
  WorkGraphEdgeData,
  WorkGraphNodeData,
  WorkGraphNodeKind,
  WorkGraphProps,
  WorkGraphSelection,
} from './types';

const COLUMN_GAP = 328;
const ROW_GAP = 224;

const KIND_ORDER: Record<WorkGraphNodeKind, number> = {
  project: 0,
  terminal: 1,
  agent: 2,
  run: 3,
  document: 4,
  change: 5,
  task: 6,
  conversation: 7,
  meeting: 8,
  transcript: 9,
};

interface WorkFlowNodeData extends Record<string, unknown> {
  entity: WorkGraphNodeData;
  selected: boolean;
  onSelect: (id: string) => void;
  onOpen?: (id: string) => void;
}

interface WorkFlowEdgeData extends Record<string, unknown> {
  entity: WorkGraphEdgeData;
  selected: boolean;
  fromLabel: string;
  toLabel: string;
  onSelect: (id: string) => void;
}

type WorkFlowNode = Node<WorkFlowNodeData, 'work'>;
type WorkFlowEdge = Edge<WorkFlowEdgeData, 'work'>;

function safeNodeLabel(node: WorkGraphNodeData): string {
  if (node.locked) return 'Restricted work item';
  return node.title.trim() || 'Untitled work item';
}

function WorkFlowNodeRenderer({ data }: NodeProps<WorkFlowNode>) {
  return (
    <div className="w-[248px]">
      <Handle type="target" position={Position.Left} isConnectable={false} className="opacity-0" />
      <WorkNode
        node={data.entity}
        selected={data.selected}
        onSelect={data.onSelect}
        onOpen={data.onOpen}
      />
      <Handle type="source" position={Position.Right} isConnectable={false} className="opacity-0" />
    </div>
  );
}

function WorkFlowEdgeRenderer({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
  data,
}: EdgeProps<WorkFlowEdge>) {
  const reducedMotion = usePrefersReducedMotion();
  const [path, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  if (!data) return null;
  const running = data.entity.status === 'running' && !data.entity.endedAt;

  return (
    <>
      <BaseEdge
        id={id}
        path={path}
        markerEnd={markerEnd}
        interactionWidth={24}
        className={data.selected ? 'stroke-primary' : 'stroke-border-emphasis'}
      />
      {running && !reducedMotion ? (
        <circle
          r="4"
          className="fill-primary"
          aria-hidden="true"
          data-testid={`work-edge-motion-${data.entity.id}`}
        >
          <animateMotion dur="2s" repeatCount="indefinite" path={path} />
        </circle>
      ) : null}
      <foreignObject
        x={labelX - 104}
        y={labelY - 40}
        width="208"
        height="80"
        className="overflow-visible"
      >
        <div className="nodrag nopan w-52" data-work-edge-label={data.entity.id}>
          <WorkEdge
            edge={data.entity}
            selected={data.selected}
            reducedMotion={reducedMotion}
            fromLabel={data.fromLabel}
            toLabel={data.toLabel}
            onSelect={data.onSelect}
          />
        </div>
      </foreignObject>
    </>
  );
}

const nodeTypes = { work: WorkFlowNodeRenderer };
const edgeTypes = { work: WorkFlowEdgeRenderer };

interface LayoutEntity {
  id: string;
  kind: WorkGraphNodeKind;
}

function layoutNodes(nodes: LayoutEntity[], edges: WorkGraphEdgeData[]): Map<string, { x: number; y: number }> {
  const ids = new Set(nodes.map((node) => node.id));
  const incoming = new Map(nodes.map((node) => [node.id, 0]));
  const outgoing = new Map(nodes.map((node) => [node.id, [] as string[]]));

  for (const edge of edges) {
    if (!ids.has(edge.fromId) || !ids.has(edge.toId) || edge.fromId === edge.toId) continue;
    outgoing.get(edge.fromId)?.push(edge.toId);
    incoming.set(edge.toId, (incoming.get(edge.toId) ?? 0) + 1);
  }

  const layer = new Map<string, number>();
  const queue = nodes
    .filter((node) => incoming.get(node.id) === 0)
    .sort(compareLayoutEntities)
    .map((node) => node.id);

  for (const id of queue) layer.set(id, 0);
  for (let index = 0; index < queue.length; index += 1) {
    const id = queue[index];
    const nextLayer = (layer.get(id) ?? 0) + 1;
    for (const targetId of (outgoing.get(id) ?? []).sort()) {
      layer.set(targetId, Math.max(layer.get(targetId) ?? 0, nextLayer));
      incoming.set(targetId, (incoming.get(targetId) ?? 1) - 1);
      if (incoming.get(targetId) === 0) queue.push(targetId);
    }
  }

  // Cycles and disconnected cyclic groups cannot be topologically layered.
  // Give them deterministic columns without mutating or interpreting their data.
  for (const node of [...nodes].sort(compareLayoutEntities)) {
    if (!layer.has(node.id)) layer.set(node.id, KIND_ORDER[node.kind] % 4);
  }

  const byLayer = new Map<number, LayoutEntity[]>();
  for (const node of nodes) {
    const column = layer.get(node.id) ?? 0;
    const entries = byLayer.get(column) ?? [];
    entries.push(node);
    byLayer.set(column, entries);
  }

  const positions = new Map<string, { x: number; y: number }>();
  const predecessors = new Map(nodes.map((node) => [node.id, [] as string[]]));
  for (const edge of edges) predecessors.get(edge.toId)?.push(edge.fromId);
  const rows = new Map<string, number>();
  for (const column of [...byLayer.keys()].sort((a, b) => a - b)) {
    const entries = byLayer.get(column)!;
    // Keep children near their visible parents so branches can be followed across columns.
    entries.sort((a, b) => {
      const center = (id: string) => {
        const known = (predecessors.get(id) ?? []).map((parent) => rows.get(parent)).filter((row): row is number => row !== undefined);
        return known.length ? known.reduce((sum, row) => sum + row, 0) / known.length : Number.POSITIVE_INFINITY;
      };
      return center(a.id) - center(b.id) || compareLayoutEntities(a, b);
    });
    entries.forEach((node, row) => {
      rows.set(node.id, row);
      positions.set(node.id, { x: 48 + column * COLUMN_GAP, y: 48 + row * ROW_GAP });
    });
  }
  return positions;
}

function compareLayoutEntities(left: LayoutEntity, right: LayoutEntity): number {
  return KIND_ORDER[left.kind] - KIND_ORDER[right.kind] || left.id.localeCompare(right.id);
}

function selectionExists(
  selection: WorkGraphSelection,
  nodes: WorkGraphNodeData[],
  edges: WorkGraphEdgeData[],
): boolean {
  if (!selection) return false;
  return selection.kind === 'node'
    ? nodes.some((node) => node.id === selection.id)
    : edges.some((edge) => edge.id === selection.id);
}

function WorkGraphPlaceholder({
  state,
  errorMessage,
  onRetry,
}: Pick<WorkGraphProps, 'state' | 'errorMessage' | 'onRetry'>) {
  if (state === 'loading') {
    return (
      <div role="status" data-testid="work-graph-loading" className="flex min-h-[22rem] items-center justify-center rounded-lg border border-border bg-surface text-sm text-text-secondary">
        Loading shared work…
      </div>
    );
  }
  if (state === 'error') {
    return (
      <EmptyState
        testId="work-graph-error"
        icon="!"
        title="Shared work is unavailable"
        description={errorMessage || 'The work graph could not be loaded.'}
        action={onRetry ? <Button onClick={onRetry}>Try again</Button> : undefined}
      />
    );
  }
  return (
    <EmptyState
      testId="work-graph-empty"
      icon="○"
      title="No shared work"
      description="There is no shared work available for this day."
    />
  );
}

/**
 * Controlled, presentation-only work graph. The host owns data fetching,
 * authorization, selection, and viewport persistence.
 */
function LegacyWorkGraph({
  nodes,
  edges,
  selection,
  viewport,
  day,
  timezone,
  sources = [],
  state = 'ready',
  errorMessage,
  className,
  onSelectionChange,
  onViewportChange,
  onRetry,
  onOpen,
  onReference,
  onRequestCollaboration,
}: WorkGraphProps) {
  const nodeIds = useMemo(() => new Set(nodes.map((node) => node.id)), [nodes]);
  const renderableEdges = useMemo(
    () => edges.filter((edge) => nodeIds.has(edge.fromId) && nodeIds.has(edge.toId)),
    [edges, nodeIds],
  );
  const activeSelection = selectionExists(selection, nodes, renderableEdges) ? selection : null;

  useEffect(() => {
    if (selection && !activeSelection) onSelectionChange(null);
  }, [activeSelection, onSelectionChange, selection]);

  const positions = layoutNodes(
    nodes.map((node) => ({ id: node.id, kind: node.kind })),
    renderableEdges,
  );
  const nodeById = new Map(nodes.map((node) => [node.id, node]));

  const flowNodes: WorkFlowNode[] = nodes.map((node) => ({
    id: node.id,
    type: 'work',
    position: positions.get(node.id) ?? { x: 0, y: 0 },
    selected: activeSelection?.kind === 'node' && activeSelection.id === node.id,
    draggable: false,
    connectable: false,
    data: {
      entity: node,
      selected: activeSelection?.kind === 'node' && activeSelection.id === node.id,
      onSelect: (id: string) => onSelectionChange({ kind: 'node', id }),
      onOpen: onOpen ? (id: string) => onOpen({ kind: 'node', id }) : undefined,
    },
  }));

  const flowEdges: WorkFlowEdge[] = renderableEdges.map((edge) => ({
    id: edge.id,
    type: 'work',
    source: edge.fromId,
    target: edge.toId,
    selected: activeSelection?.kind === 'edge' && activeSelection.id === edge.id,
    focusable: false,
    data: {
      entity: edge,
      selected: activeSelection?.kind === 'edge' && activeSelection.id === edge.id,
      fromLabel: safeNodeLabel(nodeById.get(edge.fromId)!),
      toLabel: safeNodeLabel(nodeById.get(edge.toId)!),
      onSelect: (id: string) => onSelectionChange({ kind: 'edge', id }),
    },
  }));

  if (state === 'loading' || state === 'error' || state === 'empty' || nodes.length === 0) {
    return (
      <section aria-label="Shared work graph" className={cn('min-w-0', className)}>
        <WorkGraphPlaceholder state={state === 'ready' ? 'empty' : state} errorMessage={errorMessage} onRetry={onRetry} />
      </section>
    );
  }

  const unavailableSources = sources.filter((source) => source.health !== 'available');

  return (
    <section aria-label="Shared work graph" className={cn('min-w-0 space-y-4', className)} data-state={state}>
      {state === 'partial' ? (
        <div role="status" data-testid="work-graph-partial" className="rounded-lg border border-warning-border bg-warning-bg px-3 py-2 text-sm text-warning-fg">
          <p className="font-medium">Some work sources are unavailable or delayed.</p>
          {unavailableSources.length > 0 ? (
            <ul className="mt-1 list-disc pl-5 text-xs">
              {unavailableSources.map((source) => (
                <li key={source.source}>{source.message || `${source.source} is ${source.health}.`}</li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}

      {day ? (
        <WorkActivityTimeline
          day={day}
          timezone={timezone || 'UTC'}
          nodes={nodes}
          edges={renderableEdges}
          selection={activeSelection}
          onSelectionChange={onSelectionChange}
        />
      ) : null}

      <div className="grid min-w-0 grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_20rem]" data-testid="work-graph-layout">
        <div className="relative h-[clamp(22rem,55vh,42rem)] min-w-0 overflow-hidden rounded-lg border border-border bg-surface" data-testid="work-graph-canvas">
          <ReactFlow<WorkFlowNode, WorkFlowEdge>
            nodes={flowNodes}
            edges={flowEdges}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            viewport={viewport}
            onViewportChange={onViewportChange}
            onPaneClick={() => onSelectionChange(null)}
            minZoom={0.35}
            maxZoom={2.5}
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable={false}
            onlyRenderVisibleElements
            proOptions={{ hideAttribution: true }}
          >
            <Background gap={20} size={1} color="var(--color-border)" />
            <Controls showInteractive={false} />
          </ReactFlow>
        </div>

        <WorkInspector
          nodes={nodes}
          edges={renderableEdges}
          selection={activeSelection}
          onSelectionChange={onSelectionChange}
          onOpen={onOpen}
          onReference={onReference}
          onRequestCollaboration={onRequestCollaboration}
        />
      </div>

      <WorkEntityList
        nodes={nodes}
        edges={renderableEdges}
        selection={activeSelection}
        onSelectionChange={onSelectionChange}
        onOpen={onOpen}
        onReference={onReference}
        onRequestCollaboration={onRequestCollaboration}
      />
    </section>
  );
}

export function WorkGraph(props: WorkGraphProps) {
  if (props.activity && props.nodes.length > 0 && props.state !== 'loading' && props.state !== 'error' && props.state !== 'empty') return <WorkActivityGraph {...props} activity={props.activity} />;
  return <LegacyWorkGraph {...props} />;
}

export default WorkGraph;

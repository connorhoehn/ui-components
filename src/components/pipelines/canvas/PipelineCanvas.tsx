import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from '@xyflow/react';
import type {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  NodeTypes,
  OnConnect,
  OnMove,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

/** Zoom floor. Low enough that `fitView` can fit a wide pipeline. */
const MIN_ZOOM = 0.1;
const FIT_VIEW_OPTIONS = { padding: 0.15, minZoom: MIN_ZOOM, maxZoom: 1 } as const;

import type { NodeType, PipelineDefinition, PipelineNode } from '../../../types/pipeline';
import { usePipelineEditor } from '../context/PipelineEditorContext';
import { isValidHandleConnection } from '../validation/handleCompatibility';
import { nodeTypes as registeredNodeTypes } from '../nodes';
import AnimatedEdge from './edges/AnimatedEdge';
import QuickInsertPopover from './QuickInsertPopover';
import { useDevEditorBridge } from '../dev/useDevEditorBridge';
import { useCanvasKeyboard } from './useCanvasKeyboard';
import { useCanvasDragDrop } from './useCanvasDragDrop';
import CanvasContextMenu from './CanvasContextMenu';
import QuickInsertLayer from './QuickInsertLayer';
import CanvasToolbar from './CanvasToolbar';

export function isEditableTarget(el: EventTarget | null): boolean {
  if (!el || !(el instanceof HTMLElement)) return false;
  const tag = el.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true;
  if (el.isContentEditable) return true;
  return false;
}

export function topologicalNodeOrder(def: PipelineDefinition): string[] {
  if (def.nodes.length === 0) return [];

  const adj = new Map<string, string[]>();
  const indegree = new Map<string, number>();
  for (const n of def.nodes) {
    adj.set(n.id, []);
    indegree.set(n.id, 0);
  }
  for (const e of def.edges) {
    if (!adj.has(e.source) || !indegree.has(e.target)) continue;
    (adj.get(e.source) as string[]).push(e.target);
    indegree.set(e.target, (indegree.get(e.target) ?? 0) + 1);
  }

  const result: string[] = [];
  const ready: string[] = def.nodes
    .filter((n) => (indegree.get(n.id) ?? 0) === 0)
    .map((n) => n.id)
    .sort();
  while (ready.length > 0) {
    const id = ready.shift() as string;
    result.push(id);
    const neighbors = (adj.get(id) ?? []).slice().sort();
    for (const next of neighbors) {
      const deg = (indegree.get(next) ?? 0) - 1;
      indegree.set(next, deg);
      if (deg === 0) ready.push(next);
    }
  }
  if (result.length < def.nodes.length) {
    const seen = new Set(result);
    const stragglers = def.nodes
      .filter((n) => !seen.has(n.id))
      .map((n) => n.id)
      .sort();
    result.push(...stragglers);
  }
  return result;
}

interface CanvasNodeData extends Record<string, unknown> {
  nodeType: NodeType;
}

const edgeTypes = { animated: AnimatedEdge };

const resolvedNodeTypes = registeredNodeTypes as unknown as NodeTypes;

function toRFNode(n: PipelineNode): Node {
  return {
    id: n.id,
    type: n.type,
    position: n.position,
    data: { ...n.data, nodeType: n.type } as CanvasNodeData,
  };
}

function toRFEdge(e: {
  id: string;
  source: string;
  sourceHandle: string;
  target: string;
  targetHandle: string;
}): Edge {
  const labelFor =
    e.sourceHandle === 'true' ||
    e.sourceHandle === 'false' ||
    e.sourceHandle === 'approved' ||
    e.sourceHandle === 'rejected' ||
    e.sourceHandle === 'error' ||
    /^branch-\d+$/.test(e.sourceHandle)
      ? e.sourceHandle
      : undefined;
  return {
    id: e.id,
    source: e.source,
    sourceHandle: e.sourceHandle,
    target: e.target,
    targetHandle: e.targetHandle,
    type: 'animated',
    data: { state: 'default', label: labelFor },
  };
}

interface NodeContextMenuState {
  nodeId: string;
  x: number;
  y: number;
}

interface CanvasInnerProps {
  onFilterLog?: (nodeId: string) => void;
  errorNodeId?: string | null;
  onErrorNodePosition?: (pos: { x: number; y: number } | null) => void;
  replayEdgeStates?: Record<string, string>;
  replayNodeClasses?: Record<string, string>;
  breakpoints?: Set<string>;
  onToggleBreakpoint?: (nodeId: string) => void;
  pausedAtNodeId?: string | null;
}

function CanvasInner({ onFilterLog, errorNodeId, onErrorNodePosition, replayEdgeStates, replayNodeClasses, breakpoints, onToggleBreakpoint, pausedAtNodeId }: CanvasInnerProps) {
  const {
    definition,
    addNode,
    setPositions,
    addEdge: addDefEdge,
    removeEdge: removeDefEdge,
    removeNode,
    duplicateNodes,
    selectedNodeId,
    setSelectedNodeId,
    updateNodeData,
  } = usePipelineEditor();

  const { screenToFlowPosition, fitView } = useReactFlow();

  // ── Refit when the canvas is resized ─────────────────────────────────────
  //
  // The `fitView` prop only fits once, on init. The canvas is `flex-1` between
  // the palette and the config panel, so it is resized constantly: opening or
  // closing the config pane, collapsing the palette, resizing the window. None
  // of those refit the viewport, and because the ReactFlow root is
  // `overflow: hidden`, a graph laid out for the old width is simply clipped —
  // a seeded 12-node pipeline can end up entirely off-screen, looking like an
  // empty editor.
  //
  // Refit on resize, but only while the viewport is still the one WE chose.
  // Once the user pans or zooms, the viewport is theirs and yanking it back on
  // every resize would fight them. React Flow passes a null event for
  // programmatic moves, so a non-null event is the user's own gesture.
  // React Flow's default minZoom is 0.5, and `fitView` will not zoom out past
  // it. A real pipeline is far wider than the canvas column at 0.5, so the fit
  // silently clamps and the graph overflows a container that is
  // `overflow: hidden` — half the seeded demo was invisible. Allow zooming out
  // far enough that a fit is actually achievable.
  const userMovedViewportRef = useRef(false);
  const handleMoveStart = useCallback<OnMove>((event) => {
    if (event) userMovedViewportRef.current = true;
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;

    let last = { w: el.clientWidth, h: el.clientHeight };
    const observer = new ResizeObserver(() => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      // Ignore sub-pixel jitter and the 0x0 pass before layout settles.
      if (w === 0 || h === 0) return;
      if (Math.abs(w - last.w) < 2 && Math.abs(h - last.h) < 2) return;
      last = { w, h };
      if (userMovedViewportRef.current) return;
      fitView(FIT_VIEW_OPTIONS);
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [fitView]);

  useDevEditorBridge({
    addNode,
    addEdge: addDefEdge,
    updateNodeData,
    getDefinition: () => definition,
  });

  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const [showMiniMap, setShowMiniMap] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const clipboardRef = useRef<string | null>(null);

  const [quickInsert, setQuickInsert] = useState<{
    anchor: { x: number; y: number };
    flowPosition: { x: number; y: number };
  } | null>(null);

  const [nodeMenu, setNodeMenu] = useState<NodeContextMenuState | null>(null);

  const handleNodeContextMenu = useCallback(
    (e: MouseEvent, node: Node) => {
      e.preventDefault();
      setNodeMenu({ nodeId: node.id, x: e.clientX, y: e.clientY });
    },
    [],
  );

  const handleFilterLogFromMenu = useCallback(() => {
    if (!nodeMenu) return;
    onFilterLog?.(nodeMenu.nodeId);
    setNodeMenu(null);
  }, [nodeMenu, onFilterLog]);

  const handleCopyNodeId = useCallback(() => {
    if (!nodeMenu) return;
    const id = nodeMenu.nodeId;
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      void navigator.clipboard.writeText(id).catch(() => {});
    }
    setNodeMenu(null);
  }, [nodeMenu]);

  const handleToggleBreakpointFromMenu = useCallback(() => {
    if (!nodeMenu) return;
    onToggleBreakpoint?.(nodeMenu.nodeId);
    setNodeMenu(null);
  }, [nodeMenu, onToggleBreakpoint]);

  const handleDuplicateFromMenu = useCallback(() => {
    if (!nodeMenu) return;
    const newIds = duplicateNodes([nodeMenu.nodeId]);
    if (newIds.length > 0) setSelectedNodeId(newIds[0]);
    setNodeMenu(null);
  }, [nodeMenu, duplicateNodes, setSelectedNodeId]);

  const handleDismissMenu = useCallback(() => setNodeMenu(null), []);

  useEffect(() => {
    if (!definition) {
      setNodes([]);
      setEdges([]);
      return;
    }
    setNodes((current) => {
      const byId = new Map(current.map((n) => [n.id, n]));
      return definition.nodes.map((n) => {
        const prev = byId.get(n.id);
        const next = toRFNode(n);
        if (breakpoints && breakpoints.size > 0) {
          (next.data as Record<string, unknown>)._hasBreakpoint = breakpoints.has(n.id);
        }
        if (pausedAtNodeId) {
          (next.data as Record<string, unknown>)._pausedAtBreakpoint = (n.id === pausedAtNodeId);
        }
        return prev ? { ...prev, ...next, selected: prev.selected } : next;
      });
    });
    setEdges(() => definition.edges.map(toRFEdge));
  }, [definition, breakpoints, pausedAtNodeId, setNodes, setEdges]);

  useEffect(() => {
    if (!errorNodeId) {
      onErrorNodePosition?.(null);
      return;
    }
    setNodes((curr) =>
      curr.map((n) => ({
        ...n,
        className: n.id === errorNodeId ? 'node-error' : (n.className?.replace('node-error', '').trim() || undefined),
      })),
    );
    requestAnimationFrame(() => {
      const container = containerRef.current;
      if (!container) return;
      const wrapper = container.querySelector<HTMLElement>(
        `.react-flow__node[data-id="${CSS.escape(errorNodeId)}"]`,
      );
      if (!wrapper) {
        onErrorNodePosition?.(null);
        return;
      }
      const rect = wrapper.getBoundingClientRect();
      onErrorNodePosition?.({ x: rect.right, y: rect.top + rect.height / 2 });
    });
  }, [errorNodeId, setNodes, onErrorNodePosition]);

  useEffect(() => {
    if (!replayNodeClasses) return;
    setNodes((curr) =>
      curr.map((n) => {
        const replayClass = replayNodeClasses[n.id] ?? '';
        const errorClass = (n.id === errorNodeId) ? 'node-error' : '';
        const combined = [errorClass, replayClass].filter(Boolean).join(' ') || undefined;
        let replayState: string | undefined;
        if (replayClass === 'node-replay-active') replayState = 'running';
        else if (replayClass === 'node-replay-completed') replayState = 'completed';
        else if (replayClass === 'node-replay-failed') replayState = 'failed';
        const data = { ...(n.data as Record<string, unknown>) };
        if (replayState) {
          data._state = replayState;
        } else {
          data._state = 'idle';
        }
        return { ...n, className: combined, data };
      }),
    );
  }, [replayNodeClasses, errorNodeId, setNodes]);

  useEffect(() => {
    if (!replayEdgeStates) return;
    setEdges((curr) =>
      curr.map((e) => {
        const state = replayEdgeStates[e.id];
        if (!state) return e;
        const data = (e.data ?? {}) as Record<string, unknown>;
        if (data.state === state) return e;
        return { ...e, data: { ...data, state } };
      }),
    );
  }, [replayEdgeStates, setEdges]);

  const handleNodesChange = useCallback(
    (changes: NodeChange[]) => {
      onNodesChange(changes);
      const settled: Array<{ id: string; position: { x: number; y: number } }> = [];
      const removed: string[] = [];
      for (const c of changes) {
        if (c.type === 'position' && c.position && c.dragging === false) {
          settled.push({ id: c.id, position: c.position });
        } else if (c.type === 'remove') {
          removed.push(c.id);
        }
      }
      if (settled.length) setPositions(settled);
      for (const id of removed) removeNode(id);
    },
    [onNodesChange, setPositions, removeNode],
  );

  const handleEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      onEdgesChange(changes);
      for (const c of changes) {
        if (c.type === 'remove') removeDefEdge(c.id);
      }
    },
    [onEdgesChange, removeDefEdge],
  );

  const handleConnect: OnConnect = useCallback(
    (params: Connection) => {
      if (!definition) return;
      if (!params.source || !params.target) return;
      const sourceNode = definition.nodes.find((n) => n.id === params.source);
      const targetNode = definition.nodes.find((n) => n.id === params.target);
      if (!sourceNode || !targetNode) return;
      const sourceHandle = params.sourceHandle ?? 'out';
      const targetHandle = params.targetHandle ?? 'in';
      if (
        !isValidHandleConnection(
          sourceNode.type,
          sourceHandle,
          targetNode.type,
          targetHandle,
        )
      ) {
        return;
      }
      addDefEdge({
        source: params.source,
        sourceHandle,
        target: params.target,
        targetHandle,
      });
    },
    [definition, addDefEdge],
  );

  const isValidConnection = useCallback(
    (params: Edge | Connection): boolean => {
      if (!definition) return false;
      if (!params.source || !params.target) return false;
      const sourceNode = definition.nodes.find((n) => n.id === params.source);
      const targetNode = definition.nodes.find((n) => n.id === params.target);
      if (!sourceNode || !targetNode) return false;
      return isValidHandleConnection(
        sourceNode.type,
        params.sourceHandle ?? 'out',
        targetNode.type,
        params.targetHandle ?? 'in',
      );
    },
    [definition],
  );

  const handleNodeClick = useCallback(
    (_: MouseEvent, node: Node) => {
      setSelectedNodeId(node.id);
    },
    [setSelectedNodeId],
  );

  const handlePaneClick = useCallback(() => {
    setSelectedNodeId(null);
  }, [setSelectedNodeId]);

  const handlePaneDoubleClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isPane =
        target.classList.contains('react-flow__pane') ||
        target.classList.contains('react-flow__renderer') ||
        target.classList.contains('react-flow__viewport') ||
        target.classList.contains('react-flow');
      if (!isPane) return;
      e.preventDefault();
      const flowPosition = screenToFlowPosition({ x: e.clientX, y: e.clientY });
      setQuickInsert({
        anchor: { x: e.clientX, y: e.clientY },
        flowPosition,
      });
    },
    [screenToFlowPosition],
  );

  const handleQuickInsertClose = useCallback(() => setQuickInsert(null), []);

  const handleQuickInsertInsert = useCallback(
    (type: NodeType, position: { x: number; y: number }) => {
      addNode(type, position);
    },
    [addNode],
  );

  const quickInsertDisabledTypes = useMemo<NodeType[]>(() => {
    if (!definition) return [];
    return definition.nodes.some((n) => n.type === 'trigger') ? ['trigger'] : [];
  }, [definition]);

  const { handleDragOver, handleDrop } = useCanvasDragDrop({
    addNode,
    screenToFlowPosition,
  });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isEditableTarget(e.target)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === 'm' || e.key === 'M') {
        setShowMiniMap((x) => !x);
        return;
      }
      if (e.key === 'c' || e.key === 'C') {
        setShowControls((x) => !x);
        return;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useCanvasKeyboard({
    definition,
    selectedNodeId,
    setSelectedNodeId,
    removeNode,
    removeDefEdge,
    setNodes,
    setEdges,
    setPositions,
    duplicateNodes,
    clipboardRef,
    containerRef,
  });

  const miniMapNodeColor = useCallback((node: Node): string => {
    const state = (node.data as { _state?: string } | undefined)?._state;
    switch (state) {
      case 'running':
      case 'pending':
        return '#2563eb';
      case 'completed':
        return '#16a34a';
      case 'failed':
        return '#dc2626';
      case 'awaiting':
        return '#f59e0b';
      default:
        return '#94a3b8';
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex-1 min-w-0 min-h-[520px] relative bg-surface-inset"
      role="application"
      aria-label="Pipeline editor canvas"
      tabIndex={0}
      data-testid="pipeline-canvas"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDoubleClick={handlePaneDoubleClick}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={resolvedNodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
        onConnect={handleConnect}
        isValidConnection={isValidConnection}
        onNodeClick={handleNodeClick}
        onNodeContextMenu={handleNodeContextMenu}
        onPaneClick={handlePaneClick}
        onMoveStart={handleMoveStart}
        fitView
        fitViewOptions={FIT_VIEW_OPTIONS}
        minZoom={MIN_ZOOM}
        snapToGrid
        snapGrid={[16, 16]}
        edgesFocusable
        defaultEdgeOptions={{ type: 'smoothstep' }}
        proOptions={{ hideAttribution: true }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={16}
          size={1}
          color="#e2e8f0"
          bgColor="#fafbfc"
        />
        {showControls ? (
          <Controls
            position="bottom-left"
            showZoom
            showFitView
            showInteractive
            className="!bg-white !border !border-border !rounded-md !shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
          />
        ) : null}
        {showMiniMap ? (
          <MiniMap
            position="bottom-right"
            pannable
            zoomable
            className="!bg-white !border !border-border !rounded-md !w-[180px] !h-[120px]"
            maskColor="rgba(15, 23, 42, 0.04)"
            nodeColor={miniMapNodeColor}
            nodeStrokeColor="#e2e8f0"
          />
        ) : null}
      </ReactFlow>
      {quickInsert ? (
        <QuickInsertPopover
          anchor={quickInsert.anchor}
          flowPosition={quickInsert.flowPosition}
          disabledTypes={quickInsertDisabledTypes}
          onClose={handleQuickInsertClose}
          onInsert={handleQuickInsertInsert}
        />
      ) : null}
      <QuickInsertLayer
        definition={definition}
        addNode={addNode}
        screenToFlowPosition={screenToFlowPosition}
        containerRef={containerRef}
      />
      <CanvasToolbar
        definition={definition}
        setPositions={setPositions}
        fitView={fitView}
      />
      {nodeMenu ? (
        <CanvasContextMenu
          nodeMenu={nodeMenu}
          breakpoints={breakpoints}
          showBreakpointOption={!!onToggleBreakpoint}
          onFilterLog={handleFilterLogFromMenu}
          onCopyNodeId={handleCopyNodeId}
          onDuplicate={handleDuplicateFromMenu}
          onToggleBreakpoint={handleToggleBreakpointFromMenu}
          onDismiss={handleDismissMenu}
        />
      ) : null}
    </div>
  );
}

export interface PipelineCanvasProps {
  onFilterLog?: (nodeId: string) => void;
  errorNodeId?: string | null;
  onErrorNodePosition?: (pos: { x: number; y: number } | null) => void;
  replayEdgeStates?: Record<string, string>;
  replayNodeClasses?: Record<string, string>;
  breakpoints?: Set<string>;
  onToggleBreakpoint?: (nodeId: string) => void;
  pausedAtNodeId?: string | null;
}

export default function PipelineCanvas({ onFilterLog, errorNodeId, onErrorNodePosition, replayEdgeStates, replayNodeClasses, breakpoints, onToggleBreakpoint, pausedAtNodeId }: PipelineCanvasProps = {}) {
  return (
    <ReactFlowProvider>
      <CanvasInner
        onFilterLog={onFilterLog}
        errorNodeId={errorNodeId}
        onErrorNodePosition={onErrorNodePosition}
        replayEdgeStates={replayEdgeStates}
        replayNodeClasses={replayNodeClasses}
        breakpoints={breakpoints}
        onToggleBreakpoint={onToggleBreakpoint}
        pausedAtNodeId={pausedAtNodeId}
      />
    </ReactFlowProvider>
  );
}

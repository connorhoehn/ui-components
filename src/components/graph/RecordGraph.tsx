// RecordGraph — a search result set drawn as a typed record graph: people,
// initiatives, work, decisions, knowledge and agent-library assets as
// avatar-style nodes, joined by labelled, directed relationships. Since
// 2.400.0; replaces the aws-agentcore portal's `SearchConnections` (the props
// map one-to-one).
//
// The host owns the records, edges, selection and (optionally) the layout and
// type filter; the graph owns the drawing: a toolbar (layout switch, type
// filter, counts, selection actions), avatar nodes with initials or a kind
// glyph and a selection check, labelled edges with arrowheads ("related"
// edges dashed), a legend of the types on screen, and zoom / fit / full-screen.
//
// Readability (2.403.2): 140 × 104 nodes, layouts sized to the measured
// canvas (`recordForceParams`, elliptical radial rings, a longest-path
// hierarchy that falls back to type columns and wraps tall ranks), and a fit
// that never goes below `RECORD_GRAPH_MIN_FIT_ZOOM` — the selection
// (`focusKeys`) and its neighbours are framed first; the rest is a pan away.
//
// Fit (2.403.4): the view re-fits when the canvas is resized (a host strip
// opening under it), not only when the drawing changes. At the floor the fit
// keeps the focus fully in view (`recordGraphViewport`); "Fit to view"
// re-centres on the focus, and pressed again frames the whole graph from the
// top-left (until 2.403.8, below). `ref` exposes `fitToFocus()` / `fitAll()` (`RecordGraphHandle`).
//
// Automatic fit (2.403.7): on open, on a new drawing and on a resize the view
// shows the whole graph when it fits at `RECORD_GRAPH_READABLE_ZOOM` (0.7)
// or above, and only otherwise centres on the focus at the 0.8 floor. The
// radial and hierarchy layouts are compacted so a ~25-record search result
// qualifies. "Fit to view" and `fitToFocus()` / `fitAll()` are unchanged.
//
// Fit ladder (2.403.8): the selection is never clipped. The automatic fit is
// (a) everything at ≥ 0.7, else (b) the selection + neighbours at ≥ 0.6,
// else (c) the selection alone at min(0.8, the zoom its full boxes fit the
// canvas less 16px), down to 0.4 (then its circles). "Fit to view" always
// frames everything at ≥ 0.4 and is idempotent — pressing it again re-fits,
// never jumping to the selection view (`fitToFocus()` does that).
//
// 2.403.9: "Fit to view" goes down to 0.25 and centres a drawing that fits
// (the selection never offsets it); only one that overflows even at 0.25
// centres on the selection. On a short canvas the legend and controls are
// reserved along the sides (`recordGraphInset`), and every fit keeps the
// selection in the clear area — out from under both corners.
//
// Keep-outs (2.403.5): the fit keeps the drawing clear of the legend's and
// the controls' corners (`recordGraphInset`), a focus taller than the clear
// area keeps its boxes 16px inside the canvas and then its circles
// (`recordGraphViewport`), and the viewer's whole-graph fit (second "Fit to
// view" press, `fitAll()`) may go down to `RECORD_GRAPH_FIT_ALL_MIN_ZOOM`.
//
// Built on @xyflow/react, not SVG like NodeGraph: xyflow already gives pan,
// zoom, fit-to-view and viewport culling, which the mockup's zoom cluster and
// a 100-record result need, and TypedNodeCanvas already carries the
// dependency. Nodes and edges are custom renderers painted with tokens, so no
// xyflow stylesheet overrides are needed. Positions come from the pure
// `layoutRecordGraph` (force via a stopped d3-force simulation, radial rings,
// or breadth-first hierarchy ranks).

import {
  Background,
  Handle,
  Position,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
  useViewport,
  type Edge,
  type EdgeProps,
  type Node,
  type NodeProps,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState, type Ref, type RefObject } from 'react';
import { cn } from '../../lib/cn';
import { Select } from '../forms/Select';
import { Avatar } from '../shared/Avatar';
import EmptyState from '../shared/EmptyState';
import { SegmentedControl } from '../shared/SegmentedControl';
import { StatusDot } from '../shared/StatusDot';
import { T } from '../shared/Text';
import { Button } from '../ui/Button';
import { IconButton } from '../ui/IconButton';
import { CheckIcon, DocumentIcon, SparkleIcon, WarningIcon } from '../ui/Icons';
import { Inline, Stack } from '../ui/Stack';
import { CanvasZoomControls } from './CanvasZoomControls';
import {
  filterRecordGraph,
  layoutRecordGraph,
  recordGraphFitKeys,
  recordGraphInset,
  recordGraphKey,
  recordGraphLegendSize,
  recordGraphViewport,
  RECORD_GRAPH_CONTROLS_SIZE,
  RECORD_GRAPH_FIT_ALL_MIN_ZOOM,
  RECORD_GRAPH_MAX_FIT_ZOOM,
  RECORD_GRAPH_MIN_FIT_ZOOM,
  RECORD_GRAPH_NODE_HEIGHT,
  RECORD_GRAPH_NODE_WIDTH,
  RECORD_GRAPH_TYPES,
  type RecordGraphEdge,
  type RecordGraphLayout,
  type RecordGraphRecord,
  type RecordGraphType,
} from './recordGraphLayout';
import { DensityProvider } from '../shared/Density';

export interface RecordGraphProps {
  records: RecordGraphRecord[];
  /** `source`/`target` are `type:id` keys (`recordGraphKey`). */
  edges: RecordGraphEdge[];
  /** Selected `type:id` keys — shared with the host's results and answer views. */
  selectedKeys: string[];
  onSelectionChange: (keys: string[]) => void;
  /**
   * "Ask about selection →". Disabled while nothing is selected. Optional
   * since 2.405.2: omitted, the button is not drawn (a graph embedded where
   * asking is not offered — `RecordGraphCard` without `onAskSelection`).
   */
  onAskSelection?: () => void;
  /** Draws "Open record ↗" while exactly one record is selected. */
  onOpenRecord?: (record: RecordGraphRecord) => void;
  /** Controlled layout. Omit to let the graph hold it (default `force`). */
  layout?: RecordGraphLayout;
  onLayoutChange?: (layout: RecordGraphLayout) => void;
  /** Controlled type filter. Omit to let the graph hold it (default `all`). */
  typeFilter?: RecordGraphType | 'all';
  onTypeFilterChange?: (type: RecordGraphType | 'all') => void;
  /** Plural labels for the type filter and legend ("People", "Agent library"…). */
  typeLabels?: Partial<Record<RecordGraphType, string>>;
  className?: string;
  'data-testid'?: string;
  /** The canvas's accessible name. Default "Record connections". */
  'aria-label'?: string;
  /**
   * Said instead of the canvas when the (type-filtered) records have no
   * connections among them — a cloud of unconnected records reads as a graph
   * that means nothing. Default "No recorded connections — search, or select
   * related records". Since 2.403.0.
   */
  emptyLabel?: string;
  /** Draw records that have no connections anyway (the pre-2.403 behaviour). Default false. Since 2.403.0. */
  showIsolated?: boolean;
  /**
   * `type:id` keys to frame first — usually the host's `selectedKeys`. The
   * view fits these records plus their direct neighbours (never below
   * `RECORD_GRAPH_MIN_FIT_ZOOM`); the rest of the graph is a pan away, and
   * "Fit" frames the whole graph. The view re-fits when the drawing changes
   * (records, edges, layout, canvas size) — not on a selection click alone,
   * so passing `selectedKeys` straight through does not move the view under
   * the pointer. Omit, or name nothing drawn, to fit the whole graph.
   * Since 2.403.2. When the neighbourhood cannot fit at the floor, the fit
   * centres on these records so they are never clipped while they fit, and
   * "Fit" re-centres on them (a second press frames the whole graph) — 2.403.4;
   * since 2.403.8 "Fit" always frames the whole graph.
   * Since 2.403.7 the automatic fit first shows the whole graph when it fits
   * at `RECORD_GRAPH_READABLE_ZOOM` (0.7); the focus framing is its fallback.
   * Since 2.403.8 the fallback is a ladder — these records + neighbours at
   * ≥ `RECORD_GRAPH_NEIGHBOURHOOD_ZOOM` (0.6), else these records alone, zoomed
   * out as far as `RECORD_GRAPH_FOCUS_MIN_ZOOM` (0.4) so they are never clipped.
   */
  focusKeys?: readonly string[];
  /**
   * Imperative fit handle (`RecordGraphHandle`) for a host whose own layout
   * moves the canvas in a way the graph cannot see. Since 2.403.4.
   */
  ref?: Ref<RecordGraphHandle>;
}

/**
 * `ref` handle on `RecordGraph`. The graph already re-fits on its own when the
 * drawing or the canvas size changes; call these after a host-side change it
 * cannot observe, or to drive a host "Show selection" / "Show all" button.
 * Both are no-ops while the canvas is not drawn. Since 2.403.4.
 */
export interface RecordGraphHandle {
  /**
   * Frame `focusKeys` + their neighbours; at the zoom floor, centre on them so
   * the focus is fully in view. Frames the whole graph when there is no focus.
   * Since 2.403.8 a focus too tall or wide for the canvas at the floor zooms
   * out (down to `RECORD_GRAPH_FOCUS_MIN_ZOOM`, 0.4) until its boxes are whole.
   */
  fitToFocus: () => void;
  /**
   * Frame the whole graph: centred when it fits, top-left aligned (pan for
   * the rest) when not. Since 2.403.5 it may zoom below the readability floor,
   * down to `RECORD_GRAPH_FIT_ALL_MIN_ZOOM` (0.4 in 2.403.8, 0.25 since
   * 2.403.9), exactly as "Fit to view" does; a drawing that fits is centred
   * (2.403.9), and only where it still overflows does it centre on the focus
   * so the selection stays whole (2.403.8).
   */
  fitAll: () => void;
}

const DEFAULT_EMPTY_LABEL = 'No recorded connections — search, or select related records';

/** Singular labels for a node's accessible name and its fallback subtitle. */
const TYPE_SINGULAR: Record<RecordGraphType, string> = {
  person: 'Person', initiative: 'Initiative', work: 'Work', decision: 'Decision', knowledge: 'Knowledge', asset: 'Agent library',
};

/** Per-type circle paint: soft fill, readable ink, and the legend swatch. */
const TYPE_PAINT: Record<RecordGraphType, { bg: string; fg: string; swatch: string }> = {
  person: { bg: 'var(--color-primary-bg)', fg: 'var(--color-primary-fg)', swatch: 'var(--color-primary)' },
  initiative: { bg: 'var(--color-accent-bg)', fg: 'var(--color-accent-fg)', swatch: 'var(--color-accent)' },
  work: { bg: 'var(--color-success-bg)', fg: 'var(--color-success-fg)', swatch: 'var(--color-success)' },
  decision: { bg: 'var(--color-warning-bg)', fg: 'var(--color-warning-fg)', swatch: 'var(--color-warning)' },
  knowledge: { bg: 'var(--color-info-bg)', fg: 'var(--color-info-fg)', swatch: 'var(--color-info)' },
  asset: { bg: 'var(--color-neutral-bg)', fg: 'var(--color-neutral-fg)', swatch: 'var(--color-neutral)' },
};
const DANGER_PAINT = { bg: 'var(--color-danger-bg)', fg: 'var(--color-danger-fg)', swatch: 'var(--color-danger)' };

const DANGER_STATUSES = new Set(['blocked', 'failed', 'at_risk', 'error', 'cancelled', 'canceled']);
const LIVE_STATUSES = new Set(['open', 'in_progress', 'active', 'published', 'running', 'todo']);

function statusKey(status: string | undefined): string {
  return (status ?? '').trim().toLowerCase().replace(/[\s-]+/g, '_');
}
function statusLabel(status: string): string {
  const words = status.replace(/[_-]+/g, ' ').trim();
  return words.charAt(0).toUpperCase() + words.slice(1);
}

/** Relationships the search inferred rather than recorded — drawn dashed. */
const RELATED_EDGE = /related (result|match)/i;

/** The avatar's 48px mark sits 4px below the node's top, centred. */
const MARK_SIZE = 48;
const MARK_CENTER_Y = 4 + MARK_SIZE / 2;
/** Gap from a mark's centre to where a line starts / its arrow tip lands. */
const LINE_START = MARK_SIZE / 2 + 4;
const LINE_END = MARK_SIZE / 2 + 6;
/** Fit options: never past 100%, never below the readable floor (the viewer pans instead). */
const FIT = { padding: 0.12, minZoom: RECORD_GRAPH_MIN_FIT_ZOOM, maxZoom: RECORD_GRAPH_MAX_FIT_ZOOM };
/** With no selection or focus, edge labels draw at rest up to this many edges (else on hover). */
const LABEL_ALL_EDGES = 16;
/** Layout re-runs for a canvas size change only past this step, px. */
const SIZE_STEP = 40;

interface RecordNodeData extends Record<string, unknown> {
  record: RecordGraphRecord;
  selected: boolean;
  onToggle: () => void;
}
interface RecordEdgeData extends Record<string, unknown> {
  from: { x: number; y: number };
  to: { x: number; y: number };
  label: string;
  related: boolean;
  /** Draw the label at rest (the edge touches a focused/selected record); otherwise it shows on hover. */
  labelShown: boolean;
}
type RecordFlowNode = Node<RecordNodeData, 'record'>;
type RecordFlowEdge = Edge<RecordEdgeData, 'record'>;

function RecordNodeView({ data }: NodeProps<RecordFlowNode>) {
  const { record, selected, onToggle } = data;
  const blocked = DANGER_STATUSES.has(statusKey(record.status));
  const paint = blocked && record.type !== 'person' ? DANGER_PAINT : TYPE_PAINT[record.type];
  const icon = record.type === 'person'
    ? undefined
    : blocked ? <WarningIcon size={22} /> : record.type === 'asset' ? <SparkleIcon size={22} /> : <DocumentIcon size={22} />;
  const statusText = record.status ? statusLabel(record.status) : record.subtitle || TYPE_SINGULAR[record.type];
  const dotted = !!record.status && (record.type === 'work' || record.type === 'decision');
  return (
    <div className="relative flex h-[104px] w-[140px] flex-col items-center" data-record-key={recordGraphKey(record)}>
      <Handle type="target" position={Position.Left} isConnectable={false} className="opacity-0" />
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={selected}
        aria-label={`${TYPE_SINGULAR[record.type]}: ${record.title}${record.status ? `, ${statusLabel(record.status)}` : ''}`}
        title={record.description ?? record.title}
        // `pointer-events-auto` (2.418.0): xyflow gives a node wrapper
        // `pointer-events: none` when the node is neither draggable nor
        // selectable and carries no node-level handler — this graph is both
        // off by design — and the button inherited it, so a mouse could not
        // click or hover a record (keyboard only).
        className={cn(
          'nodrag nopan pointer-events-auto flex h-full w-full cursor-pointer flex-col items-center gap-1 rounded-lg border-none bg-transparent px-2 pb-1 pt-1 text-center',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
        )}
      >
        <span className="relative inline-flex shrink-0">
          <Avatar
            name={record.title}
            src={record.type === 'person' ? record.avatarUrl : undefined}
            size={MARK_SIZE}
            color={paint.bg}
            foreground={paint.fg}
            icon={icon}
            showTitle={false}
            className={cn('border border-current', selected && 'ring-2 ring-primary ring-offset-2 ring-offset-surface')}
          />
          {selected && (
            <span
              aria-hidden="true"
              data-testid="record-graph-check"
              className="absolute -right-1 -top-1 inline-flex h-[18px] w-[18px] items-center justify-center rounded-full bg-primary text-on-primary ring-2 ring-surface"
            >
              <CheckIcon size={11} />
            </span>
          )}
        </span>
        {/* A selected record prints its whole title (2.418.0) on the surface
            halo, drawn over its neighbours; the rest clamp to two lines. */}
        <span
          data-testid={selected ? 'record-graph-selected-title' : undefined}
          className={cn(
            'rounded-sm bg-surface px-1 text-[13px] font-medium leading-tight text-text-primary',
            selected ? 'relative z-10 w-max max-w-[220px] break-words shadow-sm' : 'line-clamp-2',
          )}
        >
          {record.title}
        </span>
        {dotted ? (
          <StatusDot
            size="xs"
            color={blocked ? 'var(--color-danger)' : LIVE_STATUSES.has(statusKey(record.status)) ? 'var(--color-success)' : 'var(--color-text-tertiary)'}
            label={statusText}
            className="max-w-full truncate rounded-sm bg-surface px-1 text-xs text-text-secondary"
          />
        ) : (
          <span className={cn('max-w-full truncate rounded-sm bg-surface px-1 text-xs', record.status ? 'text-primary' : 'text-text-secondary')}>{statusText}</span>
        )}
      </button>
      <Handle type="source" position={Position.Right} isConnectable={false} className="opacity-0" />
    </div>
  );
}

/** A gently curved line between two mark centres, clipped to their rims, with
 *  an arrowhead at the target and its label on a surface-coloured halo. */
function RecordEdgeView({ id, data }: EdgeProps<RecordFlowEdge>) {
  if (!data) return null;
  const { from, to, label, related, labelShown } = data;
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const dist = Math.hypot(dx, dy);
  if (dist < LINE_START + LINE_END + 4) return null;
  const ux = dx / dist;
  const uy = dy / dist;
  const sx = from.x + ux * LINE_START;
  const sy = from.y + uy * LINE_START;
  const ex = to.x - ux * LINE_END;
  const ey = to.y - uy * LINE_END;
  const bend = Math.min(40, dist * 0.08);
  const cx = (sx + ex) / 2 - uy * bend;
  const cy = (sy + ey) / 2 + ux * bend;
  // Arrow along the curve's final tangent (control point → end).
  const tx = ex - cx;
  const ty = ey - cy;
  const tl = Math.hypot(tx, ty) || 1;
  const ax = tx / tl;
  const ay = ty / tl;
  const arrow = `M${ex} ${ey} L${ex - ax * 8 - ay * 4} ${ey - ay * 8 + ax * 4} L${ex - ax * 8 + ay * 4} ${ey - ay * 8 - ax * 4} Z`;
  const lx = 0.25 * sx + 0.5 * cx + 0.25 * ex;
  const ly = 0.25 * sy + 0.5 * cy + 0.25 * ey;
  const stroke = 'var(--color-text-tertiary)';
  return (
    <g data-edge-id={id} data-related={related ? 'true' : 'false'} className="group">
      {/* Wide invisible hit line: hovering near an edge reveals a resting-hidden label. */}
      <path d={`M${sx} ${sy} Q${cx} ${cy} ${ex} ${ey}`} fill="none" stroke="transparent" strokeWidth={12} className="[pointer-events:stroke]" />
      <path d={`M${sx} ${sy} Q${cx} ${cy} ${ex} ${ey}`} fill="none" stroke={stroke} strokeWidth={1} strokeDasharray={related ? '4 4' : undefined} />
      <path d={arrow} fill={stroke} />
      {label && (
        <text
          data-edge-label={labelShown ? 'shown' : 'hover'}
          x={lx}
          y={ly}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={11}
          fill="var(--color-text-secondary)"
          stroke="var(--color-surface)"
          strokeWidth={4}
          strokeLinejoin="round"
          paintOrder="stroke"
          className={cn('pointer-events-none select-none', !labelShown && 'opacity-0 transition-opacity group-hover:opacity-100')}
        >
          {label}
        </text>
      )}
    </g>
  );
}

const NODE_TYPES = { record: RecordNodeView };
const EDGE_TYPES = { record: RecordEdgeView };

function FullscreenGlyph({ exit }: { exit: boolean }) {
  return (
    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      {exit
        ? <path d="M5 1.5 V5 H1.5 M9 1.5 V5 H12.5 M12.5 9 H9 V12.5 M1.5 9 H5 V12.5" />
        : <path d="M1.5 5 V1.5 H5 M9 1.5 H12.5 V5 M12.5 9 V12.5 H9 M5 12.5 H1.5 V9" />}
    </svg>
  );
}

/** Children of <ReactFlow>: the legend and zoom cluster, plus re-fit on change. */
function CanvasChrome({
  graphKey,
  positions,
  focusKeys,
  fitKeys,
  canvasRef,
  apiRef,
  legend,
  fullscreen,
  onFullscreen,
  testId,
}: {
  graphKey: string;
  /** Top-left of every drawn record, flow px. */
  positions: ReadonlyMap<string, { x: number; y: number }>;
  /** Drawn focus records (never clipped when they fit); empty = no focus. */
  focusKeys: string[];
  /** Records the automatic fit frames (focus + neighbours); empty = all. */
  fitKeys: string[];
  canvasRef: RefObject<HTMLElement | null>;
  apiRef: { current: RecordGraphHandle | null };
  legend: { value: RecordGraphType; label: string }[];
  fullscreen: boolean;
  onFullscreen: () => void;
  testId: string;
}) {
  const flow = useReactFlow();
  const { zoom } = useViewport();
  // Read through a ref: a selection click must not move the view — only a
  // new drawing (records, edges, layout) or a canvas resize re-frames it.
  const legendLabels = legend.map((item) => item.label);
  const state = useRef({ positions, focusKeys, fitKeys, legendLabels });
  state.current = { positions, focusKeys, fitKeys, legendLabels };

  /**
   * The viewport a fit would set, from the canvas's size now; null while
   * unmeasured. The legend's and the controls' corners are kept clear
   * (`recordGraphInset`). `whole` is the viewer's whole-graph fit, which may
   * go below the readability floor (`RECORD_GRAPH_FIT_ALL_MIN_ZOOM`).
   */
  const target = useCallback((mode: 'focus' | 'all' | 'auto', whole = false) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return null;
    const { positions: pos, focusKeys: core, fitKeys: near, legendLabels: labels } = state.current;
    const size = { width: rect.width, height: rect.height };
    const overlays = {
      legend: labels.length ? recordGraphLegendSize(labels, size.width) : null,
      controls: RECORD_GRAPH_CONTROLS_SIZE,
    };
    const inset = recordGraphInset(size, overlays);
    return recordGraphViewport(pos, size, {
      // `overlays` (2.407.4): a selection-centred view is shifted clear of them.
      mode: core.length || mode === 'auto' ? mode : 'all', focusKeys: core, fitKeys: near, inset, overlays,
      minZoom: whole && mode === 'all' ? RECORD_GRAPH_FIT_ALL_MIN_ZOOM : FIT.minZoom, maxZoom: FIT.maxZoom,
    });
  }, [canvasRef]);
  const apply = useCallback((mode: 'focus' | 'all' | 'auto', animate = false) => {
    // An animated fit is one the viewer asked for: its whole-graph frame may
    // go below the floor. The automatic fit goes below it only as far as
    // `RECORD_GRAPH_READABLE_ZOOM`, and only to show everything (2.403.7) —
    // except with no focus, where it is the whole-graph fit down to
    // `RECORD_GRAPH_FIT_ALL_MIN_ZOOM` (2.406.3; `recordGraphViewport`).
    const viewport = target(mode, animate);
    if (viewport) {
      void flow.setViewport(viewport, animate ? { duration: 200 } : undefined);
      return;
    }
    // Unmeasured canvas: let xyflow fit whatever it can see.
    const near = state.current.fitKeys;
    void flow.fitView(mode !== 'all' && near.length ? { ...FIT, nodes: near.map((id) => ({ id })) } : FIT);
  }, [flow, target]);
  // Automatic: the whole graph when it is readable, else the focus (2.403.7).
  const autoFit = useCallback(() => apply('auto'), [apply]);

  // "Fit to view" (2.403.8): everything, down to `RECORD_GRAPH_FIT_ALL_MIN_ZOOM`
  // (0.25 since 2.403.9), centred when it fits; the selection kept whole where the graph overflows. Idempotent: a
  // second press re-fits the same view rather than toggling to the focus.
  const fit = useCallback(() => apply('all', true), [apply]);

  useEffect(() => {
    apiRef.current = { fitToFocus: () => apply('focus', true), fitAll: () => apply('all', true) };
    return () => { apiRef.current = null; };
  }, [apiRef, apply]);

  // A new drawing re-frames.
  useEffect(() => {
    if (typeof requestAnimationFrame !== 'function') return;
    const frame = requestAnimationFrame(autoFit);
    return () => cancelAnimationFrame(frame);
  }, [graphKey, autoFit]);

  // So does a canvas size change (a host strip opening under the canvas),
  // debounced to one fit per animation frame.
  useEffect(() => {
    const el = canvasRef.current;
    if (!el || typeof ResizeObserver === 'undefined' || typeof requestAnimationFrame !== 'function') return;
    let last: { width: number; height: number } | null = null;
    let frame = 0;
    const obs = new ResizeObserver((entries) => {
      const rect = entries[0]?.contentRect;
      if (!rect || rect.width <= 0 || rect.height <= 0) return;
      if (last && Math.abs(last.width - rect.width) < 1 && Math.abs(last.height - rect.height) < 1) return;
      const first = !last;
      last = { width: rect.width, height: rect.height };
      if (first) return; // the drawing's own fit covers the first measurement
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(autoFit);
    });
    obs.observe(el);
    return () => { obs.disconnect(); cancelAnimationFrame(frame); };
  }, [canvasRef, autoFit]);
  return (
    <>
      {legend.length > 0 && (
        <ul
          aria-label="Record types"
          data-testid={`${testId}-legend`}
          className="absolute bottom-3 left-3 z-10 m-0 flex max-w-[calc(100%-18rem)] list-none flex-wrap items-center gap-x-3 gap-y-1 rounded-md border border-border bg-surface px-2.5 py-1.5 text-xs text-text-secondary max-md:hidden"
        >
          {legend.map((item) => (
            <li key={item.value} className="inline-flex items-center">
              <StatusDot color={TYPE_PAINT[item.value].swatch} size="sm" label={item.label} />
            </li>
          ))}
        </ul>
      )}
      <Inline gap="xs" wrap={false} className="absolute bottom-3 right-3 z-10">
        <CanvasZoomControls
          zoom={zoom}
          minZoom={0.15}
          maxZoom={2}
          onZoomIn={() => void flow.zoomIn()}
          onZoomOut={() => void flow.zoomOut()}
          onFit={fit}
          data-testid={`${testId}-zoom`}
        />
        <IconButton
          size="md"
          variant="outline"
          aria-label={fullscreen ? 'Exit full screen' : 'Full screen connections'}
          aria-pressed={fullscreen}
          onClick={onFullscreen}
        >
          <FullscreenGlyph exit={fullscreen} />
        </IconButton>
      </Inline>
    </>
  );
}

export function RecordGraph({
  records,
  edges,
  selectedKeys,
  onSelectionChange,
  onAskSelection,
  onOpenRecord,
  layout: controlledLayout,
  onLayoutChange,
  typeFilter: controlledType,
  onTypeFilterChange,
  typeLabels,
  className,
  'data-testid': testId = 'record-graph',
  'aria-label': ariaLabel = 'Record connections',
  emptyLabel = DEFAULT_EMPTY_LABEL,
  showIsolated = false,
  focusKeys,
  ref,
}: RecordGraphProps) {
  const [localLayout, setLocalLayout] = useState<RecordGraphLayout>('force');
  const [localType, setLocalType] = useState<RecordGraphType | 'all'>('all');
  const [fullscreen, setFullscreen] = useState(false);
  const [fullscreenError, setFullscreenError] = useState(false);
  const container = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLElement>(null);
  const api = useRef<RecordGraphHandle | null>(null);
  useImperativeHandle(ref, () => ({
    fitToFocus: () => api.current?.fitToFocus(),
    fitAll: () => api.current?.fitAll(),
  }), []);
  // The layout fills the measured canvas (stepped, so a resize of a few px
  // does not re-lay out); unmeasured, it assumes the search page's canvas.
  const [canvasSize, setCanvasSize] = useState<{ width: number; height: number } | null>(null);
  const layout = controlledLayout ?? localLayout;
  const type = controlledType ?? localType;

  const typeOptions = useMemo(
    () => RECORD_GRAPH_TYPES.map((item) => ({ value: item.value, label: typeLabels?.[item.value] ?? item.label })),
    [typeLabels],
  );
  const graph = useMemo(() => filterRecordGraph(records, edges, type), [records, edges, type]);
  const positions = useMemo(
    () => layoutRecordGraph(graph.records, graph.edges, layout, canvasSize ?? undefined),
    [graph, layout, canvasSize],
  );
  const selected = useMemo(() => new Set(selectedKeys), [selectedKeys]);
  const selectedRecords = records.filter((record) => selected.has(recordGraphKey(record)));

  const toggle = useCallback((key: string) => {
    onSelectionChange(selected.has(key) ? selectedKeys.filter((item) => item !== key) : [...selectedKeys, key]);
  }, [onSelectionChange, selected, selectedKeys]);

  const nodes: RecordFlowNode[] = graph.records.map((record) => {
    const id = recordGraphKey(record);
    return {
      id,
      type: 'record',
      position: positions.get(id)!,
      initialWidth: RECORD_GRAPH_NODE_WIDTH,
      initialHeight: RECORD_GRAPH_NODE_HEIGHT,
      draggable: false,
      connectable: false,
      selectable: false,
      focusable: false,
      // A selected record's uncut title draws over its neighbours (2.418.0).
      zIndex: selected.has(id) ? 1 : 0,
      data: { record, selected: selected.has(id), onToggle: () => toggle(id) },
    };
  });
  // Edge labels at rest only where they help: on edges touching a focused or
  // selected record. With nothing selected or focused, a small graph labels
  // every edge; a larger one labels them on hover, so labels stop crossing names.
  const emphasis = new Set([...(focusKeys ?? []), ...selectedKeys]);
  const labelAll = !emphasis.size && graph.edges.length <= LABEL_ALL_EDGES;
  const centre = (key: string) => {
    const p = positions.get(key)!;
    return { x: p.x + RECORD_GRAPH_NODE_WIDTH / 2, y: p.y + MARK_CENTER_Y };
  };
  const flowEdges: RecordFlowEdge[] = graph.edges
    .filter((edge) => edge.source !== edge.target)
    .map((edge) => ({
      id: edge.id,
      type: 'record',
      source: edge.source,
      target: edge.target,
      focusable: false,
      selectable: false,
      data: {
        from: centre(edge.source), to: centre(edge.target), label: edge.label, related: RELATED_EDGE.test(edge.label),
        labelShown: labelAll || emphasis.has(edge.source) || emphasis.has(edge.target),
      },
    }));
  const graphKey = `${layout}:${canvasSize ? `${canvasSize.width}x${canvasSize.height}` : ''}:${graph.records.map(recordGraphKey).join('|')}:${graph.edges.map((edge) => edge.id).join('|')}`;
  const fitKeys = useMemo(
    () => recordGraphFitKeys(graph.records.map(recordGraphKey), graph.edges, focusKeys),
    [graph, focusKeys],
  );
  const drawnFocus = useMemo(() => {
    const drawnKeys = new Set(fitKeys);
    return (focusKeys ?? []).filter((key) => drawnKeys.has(key));
  }, [fitKeys, focusKeys]);
  const drawn = graph.records.length > 0 && (flowEdges.length > 0 || showIsolated);

  useEffect(() => {
    const el = canvas.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const obs = new ResizeObserver((entries) => {
      const rect = entries[0]?.contentRect;
      if (!rect || rect.width <= 0 || rect.height <= 0) return;
      const next = { width: Math.round(rect.width / SIZE_STEP) * SIZE_STEP, height: Math.round(rect.height / SIZE_STEP) * SIZE_STEP };
      setCanvasSize((prev) => (prev && prev.width === next.width && prev.height === next.height ? prev : next));
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [drawn]);
  const legend = typeOptions.filter((item) => graph.records.some((record) => record.type === item.value));

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const changed = () => setFullscreen(document.fullscreenElement === container.current);
    document.addEventListener('fullscreenchange', changed);
    return () => document.removeEventListener('fullscreenchange', changed);
  }, []);

  const toggleFullscreen = async () => {
    try {
      setFullscreenError(false);
      if (document.fullscreenElement === container.current) await document.exitFullscreen();
      else if (container.current?.requestFullscreen) await container.current.requestFullscreen();
      else setFullscreenError(true);
    } catch {
      setFullscreenError(true);
    }
  };

  return (
    <Stack
      ref={container}
      gap="none"
      data-testid={testId}
      className={cn('min-h-0 flex-1 bg-surface [&:fullscreen]:h-full [&:fullscreen]:p-4', className)}
    >
      <Inline gap="sm" align="center" className="shrink-0 border-b border-border px-1 py-2" data-testid={`${testId}-toolbar`}>
        <DensityProvider density="compact"><SegmentedControl
          aria-label="Connection layout"
          value={layout}
          options={[{ value: 'force', label: 'Force' }, { value: 'radial', label: 'Radial' }, { value: 'hierarchy', label: 'Hierarchy' }]}
          onChange={(value) => { setLocalLayout(value as RecordGraphLayout); onLayoutChange?.(value as RecordGraphLayout); }}
        /></DensityProvider>
        <Select
          aria-label="Connection record type"
          size="sm"
          className="w-auto min-w-28"
          value={type}
          options={[{ value: 'all', label: 'All types' }, ...typeOptions]}
          onChange={(event) => {
            const next = event.target.value as RecordGraphType | 'all';
            setLocalType(next);
            onTypeFilterChange?.(next);
          }}
        />
        <T className="text-xs text-text-secondary" data-testid={`${testId}-counts`}>
          {graph.records.length} records · {graph.edges.length} connections
        </T>
        <Inline gap="xs" align="center" className="ml-auto">
          <T className="text-xs text-primary" aria-label={`${selectedKeys.length} selected`}>{selectedKeys.length} selected</T>
          {selectedRecords.length === 1 && onOpenRecord && (
            <Button size="sm" variant="secondary" onClick={() => onOpenRecord(selectedRecords[0]!)}>Open record ↗</Button>
          )}
          <Button size="sm" variant="secondary" disabled={!selectedKeys.length} onClick={() => onSelectionChange([])}>Clear</Button>
          {onAskSelection && <Button size="sm" disabled={!selectedRecords.length} onClick={onAskSelection}>Ask about selection →</Button>}
        </Inline>
      </Inline>
      {fullscreenError && <T role="status" className="px-2 py-1 text-xs text-text-secondary">Full screen is unavailable in this browser.</T>}
      {!graph.records.length ? (
        <EmptyState title="No connections to show" description="Choose another record type or search for records." testId={`${testId}-empty`} />
      ) : !flowEdges.length && !showIsolated ? (
        <EmptyState title={emptyLabel} testId={`${testId}-unconnected`} />
      ) : (
        <Stack ref={canvas} gap="none" className="relative min-h-40 flex-1 [--xy-background-color:var(--color-surface)]">
          <ReactFlowProvider>
            <ReactFlow
              nodes={nodes}
              edges={flowEdges}
              nodeTypes={NODE_TYPES}
              edgeTypes={EDGE_TYPES}
              minZoom={0.15}
              maxZoom={2}
              nodesDraggable={false}
              nodesConnectable={false}
              nodesFocusable={false}
              edgesFocusable={false}
              elementsSelectable={false}
              onlyRenderVisibleElements
              proOptions={{ hideAttribution: true }}
              aria-label={ariaLabel}
            >
              <Background color="var(--color-border)" gap={22} size={1} />
              <CanvasChrome
                graphKey={graphKey}
                positions={positions}
                focusKeys={drawnFocus}
                fitKeys={fitKeys}
                canvasRef={canvas}
                apiRef={api}
                legend={legend}
                fullscreen={fullscreen}
                onFullscreen={() => void toggleFullscreen()}
                testId={testId}
              />
            </ReactFlow>
          </ReactFlowProvider>
        </Stack>
      )}
    </Stack>
  );
}

export default RecordGraph;

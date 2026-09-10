// graph/NodeGraph.tsx — a dependency-free SVG node graph.
//
// Nodes are circles (or avatars) with a label; edges are lines with an
// optional label at the midpoint. Positions come from layout.ts and are
// deterministic. The viewport pans by drag and zooms by wheel, and a reset
// button puts it back. Every node is a focusable `role="button"` so the
// graph works from the keyboard, and colours are design tokens only, so the
// graph reads the same in dark mode.
//
// No animation on purpose: a layout that never moves needs no reduced-motion
// branch, and a graph in a chat side pane should not draw attention to itself.

import { useEffect, useMemo, useRef, useState, type KeyboardEvent, type MouseEvent as ReactMouseEvent } from 'react';
import { cn } from '../../lib/cn';
import { IconButton } from '../ui/IconButton';
import { graphCenterNode, graphGroups, layoutGraph } from './layout';
import type { GraphEdge, GraphLayout, GraphNode } from './types';

export interface NodeGraphProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  layout?: GraphLayout;
  selectedId?: string | null;
  onSelect?: (node: GraphNode) => void;
  /** Pixel height of the drawing; the width follows the container. */
  height?: number;
  className?: string;
  'data-testid'?: string;
}

/** The logical drawing width; the SVG scales it to whatever width it is given. */
export const NODE_GRAPH_VIEW_WIDTH = 480;

/**
 * Group colours as token classes so the theme re-tones them. Fill is for SVG
 * shapes, bg for the legend swatches. The centre bucket always paints primary.
 */
const GROUP_PALETTE: ReadonlyArray<{ fill: string; bg: string }> = [
  { fill: 'fill-info', bg: 'bg-info' },
  { fill: 'fill-success', bg: 'bg-success' },
  { fill: 'fill-warning', bg: 'bg-warning' },
  { fill: 'fill-accent', bg: 'bg-accent' },
  { fill: 'fill-caution', bg: 'bg-caution' },
  { fill: 'fill-danger', bg: 'bg-danger' },
  { fill: 'fill-neutral', bg: 'bg-neutral' },
];
const CENTER_PALETTE = { fill: 'fill-primary', bg: 'bg-primary' };

/** The token classes for a group, by its legend position. Exported so PeopleGraph's list can match the graph. */
export function graphGroupPalette(group: string | undefined, groups: string[]): { fill: string; bg: string } {
  if (group === 'center') return CENTER_PALETTE;
  const i = groups.indexOf(group ?? '');
  return GROUP_PALETTE[(i < 0 ? 0 : i) % GROUP_PALETTE.length];
}

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 4;

interface View { x: number; y: number; k: number }
const HOME: View = { x: 0, y: 0, k: 1 };

export function NodeGraph({
  nodes, edges, layout = 'radial', selectedId = null, onSelect, height = 320, className, 'data-testid': testId = 'node-graph',
}: NodeGraphProps) {
  const width = NODE_GRAPH_VIEW_WIDTH;
  const positions = useMemo(() => layoutGraph(nodes, edges, layout, { width, height }), [nodes, edges, layout, width, height]);
  const groups = useMemo(() => graphGroups(nodes), [nodes]);
  const center = useMemo(() => graphCenterNode(nodes), [nodes]);
  const radii = useMemo(() => nodeRadii(nodes, center), [nodes, center]);

  const [view, setView] = useState<View>(HOME);
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const drag = useRef<{ startX: number; startY: number; originX: number; originY: number } | null>(null);
  const [dragging, setDragging] = useState(false);

  /** Screen pixels → viewBox units; the SVG may be drawn at any width. */
  const unitsPerPixel = () => {
    const rect = svgRef.current?.getBoundingClientRect();
    return rect && rect.width > 0 ? width / rect.width : 1;
  };

  // React registers `wheel` passively, so preventDefault (keeping the page
  // from scrolling under the graph) needs a native listener.
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = svg.getBoundingClientRect();
      const upp = rect.width > 0 ? width / rect.width : 1;
      const mx = (e.clientX - rect.left) * upp;
      const my = (e.clientY - rect.top) * upp;
      setView((v) => {
        const k = clamp(v.k * (e.deltaY < 0 ? 1.1 : 1 / 1.1), MIN_ZOOM, MAX_ZOOM);
        // Keep the point under the cursor fixed while the scale changes.
        const ratio = k / v.k;
        return { k, x: mx - (mx - v.x) * ratio, y: my - (my - v.y) * ratio };
      });
    };
    svg.addEventListener('wheel', onWheel, { passive: false });
    return () => svg.removeEventListener('wheel', onWheel);
  }, [width]);

  const onBackgroundMouseDown = (e: ReactMouseEvent<SVGSVGElement>) => {
    if (e.button !== 0) return;
    drag.current = { startX: e.clientX, startY: e.clientY, originX: view.x, originY: view.y };
    setDragging(true);
  };
  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent) => {
      const d = drag.current;
      if (!d) return;
      const upp = unitsPerPixel();
      setView((v) => ({ ...v, x: d.originX + (e.clientX - d.startX) * upp, y: d.originY + (e.clientY - d.startY) * upp }));
    };
    const onUp = () => { drag.current = null; setDragging(false); };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dragging]);

  const select = (node: GraphNode) => onSelect?.(node);
  const onNodeKeyDown = (e: KeyboardEvent<SVGGElement>, node: GraphNode) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      select(node);
    }
  };

  const isHome = view.x === 0 && view.y === 0 && view.k === 1;
  const byId = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes]);

  return (
    <div className={cn('relative flex flex-col overflow-hidden rounded-lg border border-border bg-surface', className)} data-testid={testId}>
      <svg
        ref={svgRef}
        role="img"
        aria-label={`Graph of ${nodes.length} nodes`}
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        height={height}
        className={cn('block select-none touch-none', dragging ? 'cursor-grabbing' : 'cursor-grab')}
        onMouseDown={onBackgroundMouseDown}
        data-testid={`${testId}-svg`}
      >
        <g transform={`translate(${view.x} ${view.y}) scale(${view.k})`} data-testid={`${testId}-viewport`}>
          {edges.map((e, i) => {
            const a = positions.get(e.from);
            const b = positions.get(e.to);
            if (!a || !b) return null;
            const emphasised = selectedId !== null && (e.from === selectedId || e.to === selectedId);
            return (
              <g key={`${e.from}->${e.to}#${i}`} data-testid={`${testId}-edge-${e.from}-${e.to}`}>
                <line
                  x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                  strokeWidth={edgeWidth(e.weight)}
                  className={emphasised ? 'stroke-primary' : 'stroke-border-emphasis'}
                />
                {e.label && (
                  <text
                    x={(a.x + b.x) / 2} y={(a.y + b.y) / 2 - 4}
                    textAnchor="middle"
                    className="fill-text-tertiary text-[10px]"
                    data-testid={`${testId}-edge-label-${e.from}-${e.to}`}
                  >
                    {e.label}
                  </text>
                )}
              </g>
            );
          })}
          {nodes.map((n) => {
            const p = positions.get(n.id);
            if (!p) return null;
            const r = radii.get(n.id) ?? 16;
            const selected = n.id === selectedId;
            const palette = graphGroupPalette(n.group, groups);
            const clipId = `${testId}-clip-${n.id}`;
            return (
              <g
                key={n.id}
                role="button"
                tabIndex={0}
                aria-label={n.sublabel ? `${n.label}, ${n.sublabel}` : n.label}
                aria-pressed={selected}
                transform={`translate(${p.x} ${p.y})`}
                className="cursor-pointer outline-none"
                onClick={(e) => { e.stopPropagation(); select(n); }}
                onMouseDown={(e) => e.stopPropagation()}
                onKeyDown={(e) => onNodeKeyDown(e, n)}
                onFocus={() => setFocusedId(n.id)}
                onBlur={() => setFocusedId((cur) => (cur === n.id ? null : cur))}
                data-testid={`${testId}-node-${n.id}`}
                data-selected={selected || undefined}
              >
                <title>{n.sublabel ?? n.label}</title>
                {(selected || focusedId === n.id) && (
                  <circle r={r + 4} className={cn('fill-none', selected ? 'stroke-primary' : 'stroke-border-emphasis')} strokeWidth={2} strokeDasharray={selected ? undefined : '3 3'} />
                )}
                {n.avatarUrl ? (
                  <>
                    <clipPath id={clipId}><circle r={r} /></clipPath>
                    <circle r={r} className={cn('stroke-surface', palette.fill)} strokeWidth={2} />
                    <image href={n.avatarUrl} x={-r} y={-r} width={r * 2} height={r * 2} clipPath={`url(#${clipId})`} preserveAspectRatio="xMidYMid slice" />
                  </>
                ) : (
                  <circle r={r} fill={n.color} className={cn('stroke-surface', !n.color && palette.fill)} strokeWidth={2} />
                )}
                {!n.avatarUrl && (
                  <text y={1} textAnchor="middle" dominantBaseline="middle" className="pointer-events-none fill-white text-[10px] font-semibold">
                    {initials(n.label)}
                  </text>
                )}
                <text y={r + 12} textAnchor="middle" className="pointer-events-none fill-text-primary text-[11px]">
                  {n.label}
                </text>
                {n === center && n.sublabel && (
                  <text y={r + 24} textAnchor="middle" className="pointer-events-none fill-text-tertiary text-[10px]">
                    {n.sublabel}
                  </text>
                )}
              </g>
            );
          })}
        </g>
      </svg>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-2">
        {groups.length > 0 && (groups.length > 1 || groups[0] !== '') ? (
          <ul aria-label="Legend" className="pointer-events-auto flex flex-wrap gap-x-3 gap-y-1 rounded-md bg-surface/85 px-2 py-1 text-[11px] text-text-secondary" data-testid={`${testId}-legend`}>
            {groups.map((g) => (
              <li key={g || '(none)'} className="flex items-center gap-1">
                <span aria-hidden className={cn('inline-block h-2 w-2 rounded-full', graphGroupPalette(g, groups).bg)} />
                {g || 'Other'}
              </li>
            ))}
          </ul>
        ) : <span />}
        <IconButton
          size="sm"
          aria-label="Reset view"
          title="Reset view"
          disabled={isHome}
          onClick={() => setView(HOME)}
          className="pointer-events-auto bg-surface/85"
          data-testid={`${testId}-reset`}
        >
          ⟲
        </IconButton>
      </div>
      {selectedId && byId.get(selectedId) && (
        <span className="sr-only" aria-live="polite">Selected {byId.get(selectedId)!.label}</span>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------

/** Radii by id: 16 as the base, up to 24 for the heaviest node, 22 for the centre. */
function nodeRadii(nodes: GraphNode[], center: GraphNode | null): Map<string, number> {
  const weights = nodes.map((n) => n.weight).filter((w): w is number => typeof w === 'number');
  const min = Math.min(...weights);
  const max = Math.max(...weights);
  const out = new Map<string, number>();
  for (const n of nodes) {
    if (n === center) { out.set(n.id, 22); continue; }
    if (typeof n.weight === 'number' && max > min) out.set(n.id, Math.round(14 + (10 * (n.weight - min)) / (max - min)));
    else out.set(n.id, 16);
  }
  return out;
}

function edgeWidth(weight: number | undefined): number {
  if (typeof weight !== 'number') return 1.5;
  return clamp(1 + weight * 1.5, 1, 5);
}

function clamp(v: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, v));
}

function initials(label: string): string {
  const parts = label.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default NodeGraph;

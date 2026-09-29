// OrgGraph — the organisation as a force-directed graph: people coloured by
// department, relationship lines styled by type (collaborates, mentors,
// reports to, shared expertise), a department/relationship legend that
// filters, hover cards, pan/zoom, single- or multi-select and a "spotlight"
// set. Ported from the aws-agentcore portal's `components/org-graph`
// (2.400.0); the props are unchanged apart from the additive ones at the end.
//
// Layout is `useForceLayout` (d3-force, animated) or a static radial ring.
// Node positions are SVG attributes, so the component carries no inline
// style of its own; the hover card's position is the one runtime style.
//
// Framing (2.403.1): the forces are scaled to the drawn count and canvas
// (`forceParamsFor`), and once the layout settles the pan/zoom — the SVG
// group's `transform` attribute — is fitted to the drawn nodes
// (`fitTransform`), again whenever the drawn set or canvas changes, until the
// viewer pans or zooms. "Fit to view" re-fits and resumes that.
//
// Readability and keep-outs (2.403.2): the fit never zooms below
// `ORG_FIT_MIN_ZOOM` (11px names) — a whole org that does not fit overflows
// and pans — and both the layout and the fit keep clear of `fitInset` (the
// legend's width on the left by default, a host's person card on the right).
//
// Fit to view vs the automatic fit (2.403.4): the automatic fit keeps the
// readability floor (`minFitZoom`, default `ORG_FIT_MIN_ZOOM` 0.9 — 9px
// names), while "Fit to view" and `ref.fitAll()` fit the whole drawn set with
// no floor (down to `ORG_FIT_ALL_MIN_ZOOM`, 0.3 since 2.403.5), so the viewer
// can choose to see everyone at once. The zoom cluster's corner is kept clear
// by the fit. Radial rings (2.403.5) are ellipses shaped to the clear area and
// spaced from the head count (`orgRadialRings`).
//
// Opening view clear of overlays (2.404.2): a Radial drawing with no focus is
// framed whole by the automatic fit too (down to 0.3); Force and a focused
// Radial keep the floor, and an overflow there is shifted so no node sits
// under the legend, the zoom cluster or a host card (`orgGraphViewport`).

import { useState, useRef, useCallback, useEffect, useId, useImperativeHandle, useMemo, type Ref } from 'react';
import type { MouseEvent as ReactMouseEvent, WheelEvent as ReactWheelEvent } from 'react';
import { cn } from '../../../lib/cn';
import { Stack } from '../../ui/Stack';
import { CanvasZoomControls } from '../CanvasZoomControls';
import { useForceLayout, type LayoutMode } from './useForceLayout';
import { OrgGraphNode } from './OrgGraphNode';
import { OrgGraphEdge } from './OrgGraphEdge';
import { OrgGraphTooltip } from './OrgGraphTooltip';
import { OrgGraphLegend, ORG_LEGEND_INSET } from './OrgGraphLegend';
import type { GraphPerson, GraphRelationship, GraphDepartment } from './types';
import { degreeMap as buildDegreeMap, maxDegree as maxOfDegreeMap, nodeRadius } from './graphInsights';
import type { PresenceFilter } from './presence';
import { focusOrgGraph } from './focusOrgGraph';
import {
  orgGraphViewport, orgOverlayRects, reserveCorner, ORG_CONTROLS_SIZE, ORG_FIT_ALL_MIN_ZOOM, ORG_FIT_MIN_ZOOM, type FitInset,
} from './fitTransform';

export interface OrgGraphProps {
  people: GraphPerson[];
  relationships: GraphRelationship[];
  departments: GraphDepartment[];
  onPersonSelect?: (person: GraphPerson | null) => void;
  /** Optional multi-select mode. When provided, clicking toggles IDs in this set. */
  multiSelectIds?: Set<string>;
  onToggleMultiSelect?: (id: string) => void;
  /** Optional ID set to apply a "spotlight" visual highlight (e.g. agent-cited nodes). */
  spotlightIds?: Set<string>;
  /** Layout algorithm to use. Defaults to 'force'. */
  layout?: LayoutMode;
  /** Presence filter — dims nodes that don't match. null/undefined = no filter. */
  presenceFilter?: PresenceFilter | null;
  /** True only for roles allowed to see influence — sizes nodes by influence
   *  and shows it on the hover card. Everyone else gets sizing by connection
   *  count, so a bigger circle can't leak a number the card hides. */
  showInfluence?: boolean;
  /** Draw the department/relationship legend. Default true. */
  legend?: boolean;
  /** Draw the zoom cluster (bottom-right). Default true. */
  controls?: boolean;
  className?: string;
  /**
   * Narrows the drawn people to these ids plus their direct neighbours over
   * `relationships` (see `focusOrgGraph`), and spotlights them — "Focused on
   * Vera" draws Vera, the people she is connected to and the lines among
   * them. Empty, or naming no one in `people`, draws the whole graph. Since 2.403.0.
   */
  focusIds?: ReadonlySet<string> | readonly string[];
  /** How far out `focusIds` reaches. Default 1 (direct neighbours). Since 2.403.0. */
  focusHops?: number;
  /**
   * Screen px along each edge the drawing keeps clear of — pass the width of
   * a card the host overlays (`{ right: 320 }`) so no person or line sits
   * under it. The layout is sized to, and the fit centred in, what is left.
   * `left` defaults to the legend's width (`ORG_LEGEND_INSET`) while `legend`
   * is on, 0 otherwise; the rest default to 0. Since 2.403.2.
   *
   * While `controls` is on, the zoom cluster's bottom-right corner
   * (`ORG_CONTROLS_SIZE`) is kept clear too — along the bottom or the right
   * edge, whichever costs less — unless these insets already cover it.
   * Since 2.403.4.
   */
  fitInset?: FitInset;
  /**
   * Floor of the automatic fit (screen zoom). A set that does not fit at it
   * overflows and the viewer pans; "Fit to view" / `fitAll()` ignore it.
   * The layout is also spread for the clear area at this zoom. Default
   * `ORG_FIT_MIN_ZOOM` (0.9). Since 2.403.4.
   *
   * Since 2.404.2 the `radial` layout with no `focusIds` does not use it:
   * its automatic fit frames every ring whole (down to `ORG_FIT_ALL_MIN_ZOOM`).
   * Where the floor does hold and the drawing overflows, the view is shifted
   * so no node sits under the legend, the zoom cluster or a `fitInset` card.
   */
  minFitZoom?: number;
  /** Imperative fit handle (`OrgGraphHandle`). Since 2.403.4. */
  ref?: Ref<OrgGraphHandle>;
  'aria-label'?: string;
  'data-testid'?: string;
}

/**
 * `ref` handle on `OrgGraph`. The graph already fits on its own when the drawn
 * set or canvas changes; call this to drive a host "Show everyone" button.
 * A no-op before the layout has positions. Since 2.403.4.
 */
export interface OrgGraphHandle {
  /**
   * Fit the whole drawn set with no readability floor (down to
   * `ORG_FIT_ALL_MIN_ZOOM`, 0.3), exactly as the "Fit to view" control does. The
   * view stays in this mode — re-fitting on a resize — until the viewer pans
   * or zooms or the drawn set changes.
   */
  fitAll: () => void;
}

const MIN_SCALE = 0.3;
const MAX_SCALE = 3;
/** Fit never zooms past this, so a two-person graph is not two giant circles. */
const FIT_MAX_ZOOM = 1.25;
/** Screen px kept clear around the fitted drawing. */
const FIT_PADDING = 32;
/** Above this many drawn people, dimmed people lose their name labels. */
const LABEL_DIM_LIMIT = 40;

/**
 * Degree per person for sizing by connection count. With a focus set, the
 * focused person is by construction connected to everyone drawn, so their
 * degree is capped at the best-connected neighbour's — otherwise the focus
 * alone would be the one big circle among small ones.
 */
function sizingDegrees(
  rels: ReadonlyArray<{ source: string; target: string }>,
  focus: ReadonlySet<string>,
): Map<string, number> {
  const deg = buildDegreeMap(rels as Array<{ source: string; target: string }>);
  if (focus.size === 0) return deg;
  let cap = 0;
  deg.forEach((d, id) => { if (!focus.has(id)) cap = Math.max(cap, d); });
  if (cap === 0) return deg;
  focus.forEach(id => { if (deg.has(id)) deg.set(id, Math.min(deg.get(id) ?? 0, cap)); });
  return deg;
}

export function OrgGraph({
  people,
  relationships,
  departments,
  onPersonSelect,
  multiSelectIds,
  onToggleMultiSelect,
  spotlightIds,
  layout,
  presenceFilter,
  showInfluence = false,
  legend = true,
  controls = true,
  focusIds,
  focusHops = 1,
  fitInset,
  minFitZoom = ORG_FIT_MIN_ZOOM,
  ref,
  className,
  'aria-label': ariaLabel = 'Org graph',
  'data-testid': testId = 'org-graph',
}: OrgGraphProps) {
  const containerRef = useRef<HTMLElement>(null);
  const markerId = `org-arrow-${useId().replace(/:/g, '')}`;
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [deptFilter, setDeptFilter] = useState<string | null>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [isPanning, setIsPanning] = useState(false);
  const panStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof ResizeObserver === 'undefined') return;
    const obs = new ResizeObserver(entries => {
      const entry = entries[0];
      if (entry && entry.contentRect.width > 0 && entry.contentRect.height > 0) {
        setDimensions({ width: entry.contentRect.width, height: entry.contentRect.height });
      }
    });
    obs.observe(container);
    return () => obs.disconnect();
  }, []);

  // Focus first (who is in the picture at all), then the legend's department
  // filter within it. Keyed by content so an inline array does not re-lay out.
  const focusKey = focusIds ? [...focusIds].sort().join('\u0000') : '';
  const focused = useMemo(
    () => (focusKey ? focusOrgGraph(people, relationships, focusKey.split('\u0000'), { hops: focusHops }) : { people, relationships }),
    [people, relationships, focusKey, focusHops],
  );
  const focusSet = useMemo(
    () => new Set(focusKey ? focusKey.split('\u0000').filter(id => focused.people.some(p => p.id === id)) : []),
    [focusKey, focused],
  );
  const filteredPeople = useMemo(
    () => (deptFilter ? focused.people.filter(p => p.department === deptFilter) : focused.people),
    [focused, deptFilter],
  );
  const filteredRels = useMemo(() => {
    if (!deptFilter) return focused.relationships;
    const ids = new Set(filteredPeople.map(p => p.id));
    return focused.relationships.filter(r => ids.has(r.source) && ids.has(r.target));
  }, [focused, filteredPeople, deptFilter]);

  // Degree in the graph currently on screen — the size signal for roles that
  // may not see influence (focus capped, see `sizingDegrees`). From the drawn
  // relationships rather than the laid-out links, so the layout's collide
  // force can use the same radii.
  const degrees = useMemo(() => {
    const ids = new Set(filteredPeople.map(p => p.id));
    return sizingDegrees(filteredRels.filter(r => ids.has(r.source) && ids.has(r.target)), focusSet);
  }, [filteredPeople, filteredRels, focusSet]);
  const maxDeg = useMemo(() => maxOfDegreeMap(degrees), [degrees]);

  // The clear area: the canvas less the legend / host card keep-outs.
  // With the zoom cluster on, its corner is reserved as well (`reserveCorner`).
  const baseInset = useMemo(() => ({
    left: fitInset?.left ?? (legend ? ORG_LEGEND_INSET : 0),
    right: fitInset?.right ?? 0,
    top: fitInset?.top ?? 0,
    bottom: fitInset?.bottom ?? 0,
  }), [fitInset?.left, fitInset?.right, fitInset?.top, fitInset?.bottom, legend]);
  const inset = useMemo(
    () => (controls ? reserveCorner(baseInset, dimensions, ORG_CONTROLS_SIZE) : baseInset),
    [baseInset, controls, dimensions],
  );
  // What no node may sit under at a fitted view (2.404.2): the keep-out
  // strips (legend column, host card) and the zoom cluster's own corner.
  const overlays = useMemo(
    () => orgOverlayRects(dimensions, baseInset, controls ? ORG_CONTROLS_SIZE : null),
    [dimensions, baseInset, controls],
  );
  // The forces fill the clear area as it will be drawn at the label floor
  // (`minFitZoom`), so the fit lands at a readable zoom rather than
  // shrinking a canvas-sized layout until the names are 6px.
  const floor = Math.max(ORG_FIT_ALL_MIN_ZOOM, minFitZoom);
  const layoutSize = useMemo(() => ({
    width: Math.max(160, (dimensions.width - inset.left - inset.right - 2 * FIT_PADDING) / floor),
    height: Math.max(120, (dimensions.height - inset.top - inset.bottom - 2 * FIT_PADDING) / floor),
  }), [dimensions, inset, floor]);

  const { nodes, links, isSettled, isDone } = useForceLayout({
    people: filteredPeople,
    relationships: filteredRels,
    departments,
    width: layoutSize.width,
    height: layoutSize.height,
    layout,
    nodeRadiusOf: p => nodeRadius(showInfluence, p.influenceScore, degrees.get(p.id) ?? 0, maxDeg),
  });

  // ── Framing ────────────────────────────────────────────────────────────────
  // Auto-fit is on until the viewer pans or zooms; a new drawn set or "Fit to
  // view" turns it back on. `fitAllMode` is set by "Fit to view" / `fitAll()`
  // (no readability floor) and cleared by a new drawn set.
  const autoFit = useRef(true);
  const fitAllMode = useRef(false);
  const drawnKey = useMemo(() => filteredPeople.map(p => p.id).sort().join('\u0000'), [filteredPeople]);
  const laidOutKey = useMemo(() => nodes.map(n => n.id).sort().join('\u0000'), [nodes]);
  const lastDrawnKey = useRef(drawnKey);
  useEffect(() => {
    if (lastDrawnKey.current === drawnKey) return;
    lastDrawnKey.current = drawnKey;
    autoFit.current = true;
    fitAllMode.current = false;
    // The forces aim to fill the canvas at 1:1, so start the new set there.
    setTransform({ x: 0, y: 0, scale: 1 });
  }, [drawnKey]);

  const computeFit = useCallback((all: boolean) => {
    const byId = new Map(nodes.map(n => [n.id, n]));
    // The automatic fit holds the label floor — except a Radial drawing with
    // no focus, which is framed whole like Fit to view (2.404.2). An overflow
    // is shifted so no node sits under the legend / controls / host card.
    // Room for the full-name label above the focus person; selection is left
    // out so a click does not re-frame the drawing.
    return orgGraphViewport({
      nodes,
      radiusOf: id => nodeRadius(showInfluence, byId.get(id)?.influenceScore ?? 0, degrees.get(id) ?? 0, maxDeg),
      focus: focusSet,
      size: dimensions,
      inset,
      overlays,
      layout: layout ?? 'force',
      mode: all ? 'all' : 'auto',
      floor,
      padding: FIT_PADDING,
      maxZoom: FIT_MAX_ZOOM,
    });
  }, [nodes, showInfluence, degrees, maxDeg, focusSet, dimensions, inset, overlays, layout, floor]);

  // Frames when the layout has visibly settled (alpha under `SETTLED_ALPHA`)
  // AND again when the simulation ends (2.407.29): between the two the nodes
  // still drift a little, and a selected person framed at the first moment
  // could end 40–60px past the canvas edge at the second (search journey
  // walk, 2026-09-29: 3 of 26 opens of a two-person focus). The second
  // framing is a no-op when nothing moved, and never runs once the viewer has
  // panned or zoomed (`autoFit` is off by then).
  useEffect(() => {
    if (!autoFit.current || !isSettled || laidOutKey !== drawnKey) return;
    const next = computeFit(fitAllMode.current);
    if (!next) return;
    setTransform(t => (
      Math.abs(t.x - next.x) < 0.5 && Math.abs(t.y - next.y) < 0.5 && Math.abs(t.scale - next.scale) < 0.001 ? t : next
    ));
  }, [computeFit, isSettled, isDone, laidOutKey, drawnKey]);

  const fitAll = useCallback(() => {
    const next = computeFit(true);
    if (!next) return;
    autoFit.current = true;
    fitAllMode.current = true;
    setTransform(next);
  }, [computeFit]);
  useImperativeHandle(ref, () => ({ fitAll }), [fitAll]);

  const connectedIds = useCallback((id: string | null): Set<string> => {
    if (!id) return new Set();
    const set = new Set<string>([id]);
    links.forEach(l => {
      if (l.source.id === id) set.add(l.target.id);
      if (l.target.id === id) set.add(l.source.id);
    });
    return set;
  }, [links]);

  const activeId = hoveredId ?? selectedId;
  // A spotlight (e.g. agent-cited people) replaces the hover/selection
  // neighbourhood as the highlight set — the host is saying who matters.
  // A focus set is spotlit the same way, alongside any host spotlight.
  const spotlight = focusSet.size > 0 ? new Set([...(spotlightIds ?? []), ...focusSet]) : spotlightIds;
  const spotlightActive = !!spotlight && spotlight.size > 0;
  const highlighted = spotlightActive
    ? new Set([...(spotlight ?? []), ...Array.from(connectedIds(activeId))])
    : connectedIds(activeId);

  const handleSelect = useCallback((id: string) => {
    if (onToggleMultiSelect) {
      onToggleMultiSelect(id);
      return;
    }
    const newId = selectedId === id ? null : id;
    setSelectedId(newId);
    const person = people.find(p => p.id === newId);
    onPersonSelect?.(person ?? null);
  }, [selectedId, people, onPersonSelect, onToggleMultiSelect]);

  const handleWheel = useCallback((e: ReactWheelEvent) => {
    autoFit.current = false;
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setTransform(t => zoomAboutCentre(t, Math.max(MIN_SCALE, Math.min(MAX_SCALE, t.scale * delta)), dimensions));
  }, [dimensions]);

  const handleMouseDown = useCallback((e: ReactMouseEvent) => {
    if (e.target === e.currentTarget || (e.target as Element).tagName === 'svg') {
      setIsPanning(true);
      autoFit.current = false;
      panStart.current = { x: e.clientX - transform.x, y: e.clientY - transform.y };
    }
  }, [transform]);

  const handleMouseMove = useCallback((e: ReactMouseEvent) => {
    if (!isPanning) return;
    setTransform(t => ({ ...t, x: e.clientX - panStart.current.x, y: e.clientY - panStart.current.y }));
  }, [isPanning]);

  const handleMouseUp = useCallback(() => setIsPanning(false), []);

  const hoveredNode = hoveredId ? nodes.find(n => n.id === hoveredId) : null;
  const radiusOf = (id: string, influence: number) => nodeRadius(showInfluence, influence, degrees.get(id) ?? 0, maxDeg);

  return (
    <Stack
      ref={containerRef}
      gap="none"
      data-testid={testId}
      className={cn('relative h-full w-full overflow-hidden bg-surface', className)}
    >
      <svg
        width={dimensions.width}
        height={dimensions.height}
        role="group"
        aria-label={ariaLabel}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={isPanning ? 'cursor-grabbing' : 'cursor-grab'}
      >
        <defs>
          <marker id={markerId} markerWidth="14" markerHeight="10" refX="13" refY="5" orient="auto" markerUnits="userSpaceOnUse">
            <path d="M0,0 L14,5 L0,10 Z" fill="var(--color-text-tertiary)" />
          </marker>
        </defs>
        <g transform={`translate(${transform.x}, ${transform.y}) scale(${transform.scale})`}>
          {links.map((link) => (
            <OrgGraphEdge
              key={`${link.source.id}-${link.target.id}-${link.type}`}
              source={link.source}
              target={link.target}
              type={link.type}
              strength={link.strength}
              targetRadius={radiusOf(link.target.id, link.target.influenceScore)}
              arrowMarkerId={markerId}
              isHighlighted={!activeId || (highlighted.has(link.source.id) && highlighted.has(link.target.id))}
            />
          ))}
          {nodes.map(node => {
            const isSelected = multiSelectIds ? multiSelectIds.has(node.id) : selectedId === node.id;
            const isHighlighted = spotlightActive
              ? highlighted.has(node.id)
              : !activeId || highlighted.has(node.id);
            const showLabel = isHighlighted || isSelected || nodes.length <= LABEL_DIM_LIMIT;
            return (
              <OrgGraphNode
                key={node.id}
                node={node}
                departments={departments}
                isSelected={isSelected}
                isHighlighted={isHighlighted}
                onSelect={handleSelect}
                onHover={setHoveredId}
                presenceFilter={presenceFilter}
                showInfluence={showInfluence}
                degree={degrees.get(node.id) ?? 0}
                maxDegree={maxDeg}
                showLabel={showLabel}
              />
            );
          })}
        </g>
      </svg>

      {legend && (
        <OrgGraphLegend departments={departments} filter={deptFilter} onFilter={setDeptFilter} presenceFilter={presenceFilter} />
      )}

      {hoveredNode && (
        <OrgGraphTooltip
          node={hoveredNode}
          departments={departments}
          x={hoveredNode.x * transform.scale + transform.x}
          y={hoveredNode.y * transform.scale + transform.y}
          containerWidth={dimensions.width}
          showInfluence={showInfluence}
        />
      )}

      {controls && (
        <CanvasZoomControls
          className="absolute bottom-3 right-3"
          zoom={transform.scale}
          minZoom={MIN_SCALE}
          maxZoom={MAX_SCALE}
          onZoomIn={() => { autoFit.current = false; setTransform(t => zoomAboutCentre(t, Math.min(MAX_SCALE, t.scale * 1.2), dimensions)); }}
          onZoomOut={() => { autoFit.current = false; setTransform(t => zoomAboutCentre(t, Math.max(MIN_SCALE, t.scale * 0.8), dimensions)); }}
          onFit={fitAll}
          data-testid={`${testId}-zoom`}
        />
      )}
    </Stack>
  );
}

/** Change zoom keeping the canvas centre fixed — with a fitted (non-zero)
 *  pan, zooming about the origin would slide the drawing off to one side. */
function zoomAboutCentre(t: { x: number; y: number; scale: number }, scale: number, size: { width: number; height: number }) {
  const cx = size.width / 2, cy = size.height / 2;
  const k = scale / t.scale;
  return { x: cx - (cx - t.x) * k, y: cy - (cy - t.y) * k, scale };
}

export default OrgGraph;

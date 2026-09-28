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

import { useState, useRef, useCallback, useEffect, useId, useMemo } from 'react';
import type { MouseEvent as ReactMouseEvent, WheelEvent as ReactWheelEvent } from 'react';
import { cn } from '../../../lib/cn';
import { Stack } from '../../ui/Stack';
import { CanvasZoomControls } from '../CanvasZoomControls';
import { useForceLayout, type LayoutMode } from './useForceLayout';
import { OrgGraphNode } from './OrgGraphNode';
import { OrgGraphEdge } from './OrgGraphEdge';
import { OrgGraphTooltip } from './OrgGraphTooltip';
import { OrgGraphLegend } from './OrgGraphLegend';
import type { GraphPerson, GraphRelationship, GraphDepartment } from './types';
import { degreeMap as buildDegreeMap, maxDegree as maxOfDegreeMap, nodeRadius } from './graphInsights';
import type { PresenceFilter } from './presence';

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
  'aria-label'?: string;
  'data-testid'?: string;
}

const MIN_SCALE = 0.3;
const MAX_SCALE = 3;

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

  const filteredPeople = useMemo(
    () => (deptFilter ? people.filter(p => p.department === deptFilter) : people),
    [people, deptFilter],
  );
  const filteredRels = useMemo(() => {
    if (!deptFilter) return relationships;
    const ids = new Set(filteredPeople.map(p => p.id));
    return relationships.filter(r => ids.has(r.source) && ids.has(r.target));
  }, [relationships, filteredPeople, deptFilter]);

  const { nodes, links } = useForceLayout({
    people: filteredPeople,
    relationships: filteredRels,
    departments,
    width: dimensions.width,
    height: dimensions.height,
    layout,
  });

  // Degree in the graph currently on screen — the size signal for roles that
  // may not see influence.
  const degrees = useMemo(
    () => buildDegreeMap(links.map(l => ({ source: l.source.id, target: l.target.id }))),
    [links],
  );
  const maxDeg = useMemo(() => maxOfDegreeMap(degrees), [degrees]);

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
  const spotlightActive = !!spotlightIds && spotlightIds.size > 0;
  const highlighted = spotlightActive
    ? new Set([...(spotlightIds ?? []), ...Array.from(connectedIds(activeId))])
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
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setTransform(t => ({ ...t, scale: Math.max(MIN_SCALE, Math.min(MAX_SCALE, t.scale * delta)) }));
  }, []);

  const handleMouseDown = useCallback((e: ReactMouseEvent) => {
    if (e.target === e.currentTarget || (e.target as Element).tagName === 'svg') {
      setIsPanning(true);
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
          onZoomIn={() => setTransform(t => ({ ...t, scale: Math.min(MAX_SCALE, t.scale * 1.2) }))}
          onZoomOut={() => setTransform(t => ({ ...t, scale: Math.max(MIN_SCALE, t.scale * 0.8) }))}
          onFit={() => setTransform({ x: 0, y: 0, scale: 1 })}
          data-testid={`${testId}-zoom`}
        />
      )}
    </Stack>
  );
}

export default OrgGraph;

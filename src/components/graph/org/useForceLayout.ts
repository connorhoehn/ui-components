// The org graph's layout: an animated d3-force simulation that pulls each
// department toward its own cell, or a static radial ring ordering by
// influence. Ported from the aws-agentcore portal (2.400.0).

import { useRef, useEffect, useState } from 'react';
import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCenter,
  forceCollide,
  forceX,
  forceY,
  type Simulation,
  type SimulationLinkDatum,
} from 'd3-force';
import type { GraphNode, GraphLink, GraphPerson, GraphRelationship, GraphDepartment } from './types';

export type LayoutMode = 'force' | 'radial';

export interface UseForceLayoutProps {
  people: GraphPerson[];
  relationships: GraphRelationship[];
  departments: GraphDepartment[];
  width: number;
  height: number;
  layout?: LayoutMode;
  /**
   * The drawn radius of a person, so the collide force keeps each circle AND
   * its label clear of its neighbours. Read when the simulation starts (a new
   * function each render does not restart it). Default: the old
   * influence-based radius, `15 + influence × 20`. Since 2.403.1.
   */
  nodeRadiusOf?: (person: GraphPerson) => number;
}

export interface UseForceLayoutReturn {
  nodes: GraphNode[];
  links: Array<{ source: GraphNode; target: GraphNode; type: string; strength: number }>;
  isDone: boolean;
  /**
   * True once the layout has visibly settled (force: alpha below
   * `SETTLED_ALPHA`; radial: immediately) — earlier than `isDone`, which waits
   * for d3's alphaMin. The moment to frame the viewport. Since 2.403.1.
   */
  isSettled: boolean;
}

// ── Force parameters ─────────────────────────────────────────────────────────

/** Vertical room a node's first-name label needs below its circle (10px text + gap). */
export const ORG_LABEL_BAND = 18;
/** Above this many people the forces keep their original, 56-person tuning. */
const LARGE_GRAPH = 40;
/** The aspect ratio at which the large-graph pulls are the original 0.1 / 0.1. */
const ASPECT_NEUTRAL = 16 / 9;
/** Alpha below which the force layout counts as settled for framing. */
export const SETTLED_ALPHA = 0.05;

export interface OrgForceParams {
  /** forceLink distance, px. */
  linkDistance: number;
  /** Multiplier on each relationship's strength for forceLink's stiffness. */
  linkStiffness: number;
  /** forceManyBody strength (negative = repel). */
  charge: number;
  /** Added to each node's radius for forceCollide — label room for small graphs. */
  collidePadding: number;
  /** forceX / forceY pull toward the department cell. */
  xStrength: number;
  yStrength: number;
  /** Half-width of the random scatter around a department cell at start, px. */
  jitter: number;
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/**
 * The simulation's forces for `count` people on a `width` × `height` canvas,
 * so any drawn set fills the area without overlapping. The per-node share of
 * the canvas, `spacing = √(area / count)`, sets the scale: links are ~0.7 of
 * it and the charge grows with its square, so eleven people spread as far as
 * fifty-six do instead of collapsing into a blob. For a small set (≤ 40)
 * links go soft — a star of one person and ten neighbours otherwise stays a
 * ring one link long — collide reserves the label band, and the x/y pulls are
 * weighted by the aspect ratio so a wide canvas gets a wide layout. Larger
 * sets keep the tight original packing: at 56 people on a typical canvas
 * the numbers land where the original fixed tuning was (distance 80,
 * charge −200, link stiffness 0.3, x/y 0.1).
 */
export function forceParamsFor(count: number, width: number, height: number): OrgForceParams {
  const n = Math.max(1, count);
  const w = Math.max(1, width);
  const h = Math.max(1, height);
  const spacing = Math.sqrt((w * h) / n);
  const linkDistance = clamp(spacing * 0.7, 60, 240);
  const charge = -clamp((spacing * spacing) / 70, 150, 1500);
  if (n > LARGE_GRAPH) {
    // The original 56-person tuning, with the department pulls shaped to the
    // canvas (2.403.2): on a wide canvas the x pull (toward each department's
    // cell, see `orgDepartmentCells`) weakens and the y pull strengthens in
    // proportion to aspect ÷ 16:9, so the org spreads along the width instead
    // of settling into a near-square blob in the middle. On a 16:9 canvas both
    // are the original 0.1.
    const shape = w / h / ASPECT_NEUTRAL;
    return {
      linkDistance,
      linkStiffness: 0.3,
      charge,
      collidePadding: 6,
      xStrength: clamp(0.1 / shape, 0.03, 0.2),
      yStrength: clamp(0.1 * shape, 0.03, 0.3),
      jitter: 50,
    };
  }
  // The long axis pulls weaker and the short axis harder, by the aspect
  // ratio, so the set takes the canvas's shape rather than a circle.
  const K = 0.09;
  const aspect = w / h;
  return {
    linkDistance,
    // Softer links let the charge open a star (one person, ten neighbours)
    // into the canvas instead of holding it to a ring of one link length.
    linkStiffness: 0.03,
    charge,
    collidePadding: ORG_LABEL_BAND,
    xStrength: clamp(K / aspect, 0.01, 0.3),
    yStrength: clamp(K * aspect, 0.01, 0.3),
    jitter: Math.min(linkDistance, 150),
  };
}

/**
 * A stable pseudo-random number in [0, 1) derived from a person's id (FNV-1a
 * then a murmur-style finaliser). The starting scatter must not use
 * Math.random: d3-force is otherwise deterministic, so the same org would
 * settle into a different layout on every mount.
 */
function idUnit(id: string, salt: number): number {
  let h = (0x811c9dc5 ^ salt) >>> 0;
  for (let i = 0; i < id.length; i++) h = Math.imul(h ^ id.charCodeAt(i), 0x01000193) >>> 0;
  h ^= h >>> 16; h = Math.imul(h, 0x85ebca6b) >>> 0;
  h ^= h >>> 13; h = Math.imul(h, 0xc2b2ae35) >>> 0;
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}

const defaultRadiusOf = (p: GraphPerson) => 15 + p.influenceScore * 20;

/**
 * The force simulation for a drawn set, built but not yet ticking in any
 * particular way — the hook animates it; a test can `stop()` it and `tick(n)`.
 * Internal to the org graph (not on the barrel).
 */
export function createOrgSimulation({
  people, relationships, departments, width, height, nodeRadiusOf = defaultRadiusOf,
}: Omit<UseForceLayoutProps, 'layout'>) {
  const params = forceParamsFor(people.length, width, height);
  const deptCenters = orgDepartmentCells(departments.map(d => d.name), width, height);

  const simNodes: GraphNode[] = people.map(p => {
    const center = deptCenters.get(p.department) ?? { x: width / 2, y: height / 2 };
    return {
      ...p,
      x: center.x + (idUnit(p.id, 0) - 0.5) * 2 * params.jitter,
      y: center.y + (idUnit(p.id, 1) - 0.5) * 2 * params.jitter,
    };
  });

  const peopleIds = new Set(people.map(p => p.id));
  const simLinks: GraphLink[] = relationships
    .filter(r => peopleIds.has(r.source) && peopleIds.has(r.target))
    .map(r => ({ source: r.source, target: r.target, type: r.type, strength: r.strength }));

  const sim = forceSimulation<GraphNode>(simNodes)
    .force('link', forceLink<GraphNode, SimulationLinkDatum<GraphNode>>(simLinks as SimulationLinkDatum<GraphNode>[])
      .id((d) => d.id)
      .distance(params.linkDistance)
      .strength((d) => (d as unknown as GraphLink).strength * params.linkStiffness))
    .force('charge', forceManyBody<GraphNode>().strength(params.charge))
    .force('center', forceCenter(width / 2, height / 2))
    .force('collide', forceCollide<GraphNode>().radius(d => nodeRadiusOf(d) + params.collidePadding).iterations(2))
    .force('x', forceX<GraphNode>().x(d => deptCenters.get(d.department)?.x ?? width / 2).strength(params.xStrength))
    .force('y', forceY<GraphNode>().y(d => deptCenters.get(d.department)?.y ?? height / 2).strength(params.yStrength))
    .alpha(1)
    .alphaDecay(0.02);

  return { sim, simNodes, simLinks, params };
}

/**
 * Each department's cell centre on a `width` × `height` canvas. The grid is
 * shaped to the canvas (2.403.2): `cols ≈ √(departments × aspect)`, so six
 * departments are 3 × 2 on a 16:9 canvas but 4 + 2 on a 3:1 strip — the
 * pulls then spread the org along the width. A short last row is centred.
 */
export function orgDepartmentCells(names: readonly string[], width: number, height: number): Map<string, { x: number; y: number }> {
  const d = names.length;
  const w = Math.max(1, width), h = Math.max(1, height);
  const cols = clamp(Math.round(Math.sqrt(d * (w / h))), 1, Math.max(1, d));
  const rows = Math.max(1, Math.ceil(d / cols));
  const cells = new Map<string, { x: number; y: number }>();
  names.forEach((name, i) => {
    const row = Math.floor(i / cols);
    const inRow = row === rows - 1 ? d - row * cols : cols;
    const col = i % cols;
    cells.set(name, {
      x: (col + 0.5 + (cols - inRow) / 2) * (w / cols),
      y: (row + 0.5) * (h / rows),
    });
  });
  return cells;
}

// ── Static layout helpers ────────────────────────────────────────────────────

function buildLinks(
  relationships: GraphRelationship[],
  nodeMap: Map<string, GraphNode>,
): Array<{ source: GraphNode; target: GraphNode; type: string; strength: number }> {
  const result: Array<{ source: GraphNode; target: GraphNode; type: string; strength: number }> = [];
  for (const r of relationships) {
    const s = nodeMap.get(r.source);
    const t = nodeMap.get(r.target);
    if (s && t) result.push({ source: s, target: t, type: r.type, strength: r.strength });
  }
  return result;
}

/** Ramanujan's perimeter of an ellipse with semi-axes `a`, `b`. */
function ellipsePerimeter(a: number, b: number): number {
  return Math.PI * (3 * (a + b) - Math.sqrt((3 * a + b) * (a + 3 * b)));
}

/** `count` points spread by equal arc length (not equal angle) round an ellipse, starting at the top. */
function ellipsePoints(a: number, b: number, count: number, phase: number): Array<{ x: number; y: number }> {
  const STEPS = 720;
  const at = (i: number) => {
    const t = (i * 2 * Math.PI) / STEPS - Math.PI / 2;
    return { x: Math.cos(t) * a, y: Math.sin(t) * b };
  };
  const arc: number[] = [0];
  for (let i = 1; i <= STEPS; i++) {
    const p = at(i - 1), q = at(i);
    arc.push(arc[i - 1]! + Math.hypot(q.x - p.x, q.y - p.y));
  }
  const total = arc[STEPS]!;
  const out: Array<{ x: number; y: number }> = [];
  let step = 0;
  for (let i = 0; i < count; i++) {
    const target = (((i + phase) / count) % 1) * total;
    while (step < STEPS && arc[step + 1]! < target) step++;
    out.push(at(step));
  }
  return out;
}

/** The radial layout's rings: how many, and their semi-axis step on each axis. */
export interface OrgRadialRings {
  /** Ring count (the centre person is not a ring). */
  rings: number;
  /** Semi-axes of ring k are `k × stepX`, `k × stepY`. */
  stepX: number;
  stepY: number;
  /** People on each ring, inner first. */
  counts: number[];
  /** True when the outer ring fits inside the `width` × `height` area. */
  fits: boolean;
}

/**
 * Rings for `count` people on a `width` × `height` area (OrgGraph passes its
 * clear area at the automatic fit floor). The rings are ellipses shaped to the
 * area's width:height, and their spacing comes from the head count: the
 * fewest rings whose perimeters hold everyone with the outer ring inside the
 * area's shorter half-dimension, keeping `minArc` between neighbours along a
 * ring and `minGap` between rings. When no ring count fits, the rings keep
 * their shape at the least spacing that holds everyone (the most compact
 * overflow) and "Fit to view" zooms out to it. Since 2.403.5 (was fixed
 * circles 130–680px apart, which on a 1160 × 400 canvas spanned 244% of its
 * height).
 */
export function orgRadialRings(
  count: number,
  width: number,
  height: number,
  opts: { maxRadius?: number } = {},
): OrgRadialRings {
  const others = Math.max(0, count - 1);
  const maxR = opts.maxRadius ?? 30;
  // A node's reach past its centre: its circle, plus the label band below.
  const ax = Math.max(1, width / 2 - Math.max(maxR, 40));
  const ay = Math.max(1, height / 2 - (maxR + ORG_LABEL_BAND));
  const aspect = clamp(ax / ay, 0.25, 6);
  const minArc = Math.max(76, 2 * maxR + ORG_LABEL_BAND);
  // Between rings: two circles and a label band vertically; a label's width sideways.
  const minGap = Math.max(2 * maxR + ORG_LABEL_BAND + 4, 76 / aspect);
  const capacity = (rings: number, stepY: number) => {
    const caps: number[] = [];
    for (let k = 1; k <= rings; k++) caps.push(Math.max(1, Math.floor(ellipsePerimeter(k * stepY * aspect, k * stepY) / minArc)));
    return caps;
  };
  const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0);
  const spread = (caps: number[]): number[] => {
    // People per ring in proportion to its capacity (so the outer ring is not a lone straggler).
    const total = sum(caps);
    const counts = caps.map(c => Math.min(c, Math.floor((others * c) / total)));
    let left = others - sum(counts);
    for (let k = caps.length - 1; left > 0; k = (k - 1 + caps.length) % caps.length) {
      if (counts[k]! < caps[k]!) { counts[k]!++; left--; }
    }
    return counts;
  };
  if (others === 0) return { rings: 0, stepX: 0, stepY: 0, counts: [], fits: true };
  // Inside the area: the fewest rings that hold everyone at the widest
  // spacing — capped at the old first ring's 130px, so four people do not
  // stand at the canvas's edges.
  const maxStep = Math.max(minGap, 130);
  for (let rings = 1; ay / rings >= minGap; rings++) {
    const stepY = Math.min(maxStep, ay / rings);
    const caps = capacity(rings, stepY);
    if (sum(caps) >= others) return { rings, stepX: stepY * aspect, stepY, counts: spread(caps), fits: true };
  }
  // Overflow: for each ring count, the least spacing (≥ minGap) that holds
  // everyone; keep the count whose outer ring is smallest.
  let best: OrgRadialRings | null = null;
  for (let rings = 1; rings <= 12; rings++) {
    let stepY = minGap;
    let caps = capacity(rings, stepY);
    while (sum(caps) < others) { stepY *= 1.03; caps = capacity(rings, stepY); }
    if (!best || rings * stepY < best.rings * best.stepY) {
      best = { rings, stepX: stepY * aspect, stepY, counts: spread(caps), fits: false };
    }
  }
  return best!;
}

function radialNodes(people: GraphPerson[], width: number, height: number, radiusOf: (p: GraphPerson) => number): GraphNode[] {
  if (people.length === 0) return [];
  const sorted = [...people].sort((a, b) => b.influenceScore - a.influenceScore);
  const cx = width / 2, cy = height / 2;
  const maxRadius = Math.max(...people.map(radiusOf));
  const { stepX, stepY, counts } = orgRadialRings(people.length, width, height, { maxRadius });
  const nodes: GraphNode[] = [{ ...sorted[0]!, x: cx, y: cy }];
  let idx = 1;
  counts.forEach((n, k) => {
    const ring = k + 1;
    ellipsePoints(ring * stepX, ring * stepY, n, ring % 2 ? 0 : 0.5).forEach(p => {
      nodes.push({ ...sorted[idx++]!, x: cx + p.x, y: cy + p.y });
    });
  });
  return nodes;
}

// ── Hook ─────────────────────────────────────────────────────────────────────

export function useForceLayout({ people, relationships, departments, width, height, layout = 'force', nodeRadiusOf }: UseForceLayoutProps): UseForceLayoutReturn {
  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const [links, setLinks] = useState<Array<{ source: GraphNode; target: GraphNode; type: string; strength: number }>>([]);
  const [isDone, setIsDone] = useState(false);
  const [isSettled, setIsSettled] = useState(false);
  const simRef = useRef<Simulation<GraphNode, SimulationLinkDatum<GraphNode>> | null>(null);
  const radiusRef = useRef(nodeRadiusOf);
  radiusRef.current = nodeRadiusOf;

  useEffect(() => {
    if (!people.length || !width || !height) return;

    // Stop any running force simulation before switching layouts.
    simRef.current?.stop();
    simRef.current = null;

    if (layout === 'radial') {
      const staticNodes = radialNodes(people, width, height, radiusRef.current ?? defaultRadiusOf);
      const nodeMap = new Map(staticNodes.map(n => [n.id, n]));
      setNodes(staticNodes);
      setLinks(buildLinks(relationships, nodeMap));
      setIsDone(true);
      setIsSettled(true);
      return;
    }

    // Force layout (default) — forces scaled to the drawn count and canvas.
    setIsDone(false);
    setIsSettled(false);
    const { sim, simNodes, simLinks } = createOrgSimulation({
      people, relationships, departments, width, height, nodeRadiusOf: radiusRef.current,
    });

    sim.on('tick', () => {
      if (sim.alpha() < SETTLED_ALPHA) setIsSettled(true);
      setNodes([...simNodes]);
      setLinks(simLinks.map(l => ({
        source: l.source as GraphNode,
        target: l.target as GraphNode,
        type: l.type,
        strength: l.strength,
      })));
    });

    sim.on('end', () => { setIsSettled(true); setIsDone(true); });

    simRef.current = sim;
    return () => { sim.stop(); };
  }, [people, relationships, departments, width, height, layout]);

  return { nodes, links, isDone, isSettled };
}

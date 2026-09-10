// graph/layout.ts — deterministic node placement.
//
// Every layout is a pure function of (nodes, edges, size): no Math.random, no
// timers, no DOM measurement. The same input always produces the same
// positions, so a graph re-rendered from the same data never jumps and tests
// can assert exact coordinates.

import type { GraphEdge, GraphLayout, GraphNode, GraphPoint } from './types';

export interface GraphLayoutSize {
  width: number;
  height: number;
  /** Space kept clear of the edges so a node's circle and label fit. */
  padding?: number;
}

export type GraphPositions = Map<string, GraphPoint>;

/**
 * The node the radial layout puts in the middle: the one whose `group` is
 * `'center'`, else the node with the strictly highest weight, else none.
 * "Strictly" matters: a graph with no weights has no centre rather than an
 * arbitrary one.
 */
export function graphCenterNode(nodes: GraphNode[]): GraphNode | null {
  const flagged = nodes.find((n) => n.group === 'center');
  if (flagged) return flagged;
  let best: GraphNode | null = null;
  let tie = false;
  for (const n of nodes) {
    if (typeof n.weight !== 'number') continue;
    if (!best || n.weight > (best.weight as number)) { best = n; tie = false; }
    else if (n.weight === best.weight) tie = true;
  }
  return best && !tie ? best : null;
}

/** Groups in first-appearance order, the centre bucket excluded; undefined groups collapse to ''. */
export function graphGroups(nodes: GraphNode[]): string[] {
  const seen: string[] = [];
  for (const n of nodes) {
    const g = n.group ?? '';
    if (g === 'center') continue;
    if (!seen.includes(g)) seen.push(g);
  }
  return seen;
}

export function layoutGraph(
  nodes: GraphNode[],
  edges: GraphEdge[],
  layout: GraphLayout,
  size: GraphLayoutSize,
): GraphPositions {
  if (nodes.length === 0) return new Map();
  switch (layout) {
    case 'grid': return layoutGrid(nodes, size);
    case 'force': return layoutForce(nodes, edges, size);
    case 'radial':
    default: return layoutRadial(nodes, size);
  }
}

// ---------------------------------------------------------------------------

function layoutRadial(nodes: GraphNode[], { width, height, padding = 40 }: GraphLayoutSize): GraphPositions {
  const out: GraphPositions = new Map();
  const cx = width / 2;
  const cy = height / 2;
  const center = graphCenterNode(nodes);
  const rest = nodes.filter((n) => n !== center);
  if (center) out.set(center.id, { x: cx, y: cy });
  if (rest.length === 0) return out;

  const groups = graphGroups(rest);
  const byGroup = new Map<string, GraphNode[]>();
  for (const n of rest) {
    const g = n.group ?? '';
    const list = byGroup.get(g) ?? [];
    list.push(n);
    byGroup.set(g, list);
  }

  const maxR = Math.max(24, Math.min(width, height) / 2 - padding);
  // A lone ring sits at the outer radius; several rings share the span evenly,
  // the innermost kept away from the centre node.
  const minR = groups.length > 1 ? Math.max(24, maxR * 0.45) : maxR;
  groups.forEach((g, ringIndex) => {
    const ring = byGroup.get(g) ?? [];
    const r = groups.length > 1 ? minR + ((maxR - minR) * ringIndex) / (groups.length - 1) : maxR;
    // Offsetting each ring by half a step keeps neighbouring rings' nodes from
    // stacking on the same spoke.
    const step = (2 * Math.PI) / ring.length;
    const start = -Math.PI / 2 + (ringIndex * step) / 2;
    ring.forEach((n, i) => {
      const a = start + i * step;
      out.set(n.id, { x: round(cx + r * Math.cos(a)), y: round(cy + r * Math.sin(a)) });
    });
  });
  return out;
}

function layoutGrid(nodes: GraphNode[], { width, height, padding = 40 }: GraphLayoutSize): GraphPositions {
  const out: GraphPositions = new Map();
  // Rows by group in first-appearance order; the centre bucket gets the first row.
  const rows: string[] = [];
  for (const n of nodes) {
    const g = n.group ?? '';
    if (!rows.includes(g)) rows.push(g);
  }
  rows.sort((a, b) => (a === 'center' ? -1 : b === 'center' ? 1 : 0));
  const usableW = Math.max(1, width - padding * 2);
  const usableH = Math.max(1, height - padding * 2);
  rows.forEach((g, rowIndex) => {
    const row = nodes.filter((n) => (n.group ?? '') === g);
    const y = rows.length === 1 ? height / 2 : padding + (usableH * rowIndex) / (rows.length - 1);
    row.forEach((n, i) => {
      // Cells centred in equal columns so a one-node row sits in the middle.
      const x = padding + (usableW * (i + 0.5)) / row.length;
      out.set(n.id, { x: round(x), y: round(y) });
    });
  });
  return out;
}

/**
 * A small Fruchterman–Reingold relaxation. Seeded from node order (a circle),
 * fixed iteration count, linear cooling — every step is deterministic. Then
 * the result is scaled to fit the box, so the spring constant never has to
 * match the pixel size.
 */
function layoutForce(nodes: GraphNode[], edges: GraphEdge[], { width, height, padding = 40 }: GraphLayoutSize): GraphPositions {
  const n = nodes.length;
  const index = new Map(nodes.map((node, i) => [node.id, i]));
  const px = new Float64Array(n);
  const py = new Float64Array(n);
  for (let i = 0; i < n; i++) {
    const a = (2 * Math.PI * i) / n;
    px[i] = Math.cos(a) * 100;
    py[i] = Math.sin(a) * 100;
  }
  if (n === 1) return new Map([[nodes[0].id, { x: width / 2, y: height / 2 }]]);

  const links: Array<[number, number, number]> = [];
  for (const e of edges) {
    const a = index.get(e.from);
    const b = index.get(e.to);
    if (a === undefined || b === undefined || a === b) continue;
    links.push([a, b, Math.max(0.25, e.weight ?? 1)]);
  }

  const area = 300 * 300;
  const k = Math.sqrt(area / n);
  const iterations = 120;
  const dx = new Float64Array(n);
  const dy = new Float64Array(n);
  for (let it = 0; it < iterations; it++) {
    const temp = 60 * (1 - it / iterations) + 0.5;
    dx.fill(0);
    dy.fill(0);
    // Repulsion between every pair.
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        let ddx = px[i] - px[j];
        let ddy = py[i] - py[j];
        let d = Math.hypot(ddx, ddy);
        if (d < 0.01) { ddx = 0.01 * (i - j); ddy = 0.01; d = Math.hypot(ddx, ddy); }
        const f = (k * k) / d;
        dx[i] += (ddx / d) * f; dy[i] += (ddy / d) * f;
        dx[j] -= (ddx / d) * f; dy[j] -= (ddy / d) * f;
      }
    }
    // Attraction along edges.
    for (const [a, b, w] of links) {
      const ddx = px[a] - px[b];
      const ddy = py[a] - py[b];
      const d = Math.hypot(ddx, ddy) || 0.01;
      const f = ((d * d) / k) * w;
      dx[a] -= (ddx / d) * f; dy[a] -= (ddy / d) * f;
      dx[b] += (ddx / d) * f; dy[b] += (ddy / d) * f;
    }
    // Gravity, so disconnected pieces do not drift apart forever.
    for (let i = 0; i < n; i++) {
      dx[i] -= px[i] * 0.05;
      dy[i] -= py[i] * 0.05;
      const d = Math.hypot(dx[i], dy[i]) || 1;
      const step = Math.min(d, temp);
      px[i] += (dx[i] / d) * step;
      py[i] += (dy[i] / d) * step;
    }
  }

  // Fit to the box, preserving aspect.
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (let i = 0; i < n; i++) {
    minX = Math.min(minX, px[i]); maxX = Math.max(maxX, px[i]);
    minY = Math.min(minY, py[i]); maxY = Math.max(maxY, py[i]);
  }
  const spanX = Math.max(1, maxX - minX);
  const spanY = Math.max(1, maxY - minY);
  const scale = Math.min((width - padding * 2) / spanX, (height - padding * 2) / spanY);
  const offX = (width - spanX * scale) / 2;
  const offY = (height - spanY * scale) / 2;
  const out: GraphPositions = new Map();
  nodes.forEach((node, i) => {
    out.set(node.id, { x: round(offX + (px[i] - minX) * scale), y: round(offY + (py[i] - minY) * scale) });
  });
  return out;
}

/** Two decimals: stable to compare, invisible on screen. */
function round(v: number): number {
  return Math.round(v * 100) / 100;
}

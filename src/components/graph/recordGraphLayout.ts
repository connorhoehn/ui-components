// The typed record graph's pure half: the record/edge shapes, filtering by
// type (dropping edges whose other end is hidden), and positions for the
// force / radial / hierarchy layouts. Ported from the aws-agentcore portal's
// `pages/search/searchGraph.ts` (2.400.0). No React, no DOM — the force
// layout runs a stopped d3-force simulation for a fixed number of ticks from
// deterministic starting points, so the same input always lands the same way.

import { forceCenter, forceCollide, forceLink, forceManyBody, forceSimulation, forceX, forceY } from 'd3-force';
import { clearOfOverlays, reserveCorner, type FitBounds, type FitInset, type ScreenRect } from './org/fitTransform';

export type RecordGraphType = 'person' | 'initiative' | 'work' | 'decision' | 'knowledge' | 'asset';
export type RecordGraphLayout = 'force' | 'radial' | 'hierarchy';

/** One typed org record — the same shape a search read model returns. */
export interface RecordGraphRecord {
  id: string;
  type: RecordGraphType;
  title: string;
  description?: string;
  subtitle?: string;
  /** Raw status ("in_progress", "blocked"). */
  status?: string;
  href: string;
  avatarUrl?: string;
}

/** A directed, labelled relationship. `source`/`target` are `type:id` keys. */
export interface RecordGraphEdge {
  id: string;
  source: string;
  target: string;
  label: string;
}

/**
 * A node's box: the 48px mark, a two-line 13px title and the status line.
 * 140 × 104 since 2.403.2 (was 180 × 116, which with the fixed force distances
 * only read for about a dozen records).
 */
export const RECORD_GRAPH_NODE_WIDTH = 140;
export const RECORD_GRAPH_NODE_HEIGHT = 104;

/**
 * Fit never zooms out past this: the 13px titles stay at ~10.4px and the 11px
 * edge labels at ~8.8px. A larger set overflows the canvas and the viewer
 * pans; the fit keeps the focus in view (`recordGraphViewport`). 0.7 in
 * 2.403.2–2.403.3 (9.1px titles, 7.7px edge labels); 0.8 since 2.403.4.
 */
export const RECORD_GRAPH_MIN_FIT_ZOOM = 0.8;
/** Fit never zooms in past 100% (two records do not become two giant circles). */
export const RECORD_GRAPH_MAX_FIT_ZOOM = 1;
/**
 * The automatic fit shows the whole graph when it fits at or above this zoom
 * (13px titles at ~9.1px), and only otherwise falls back to centring on the
 * focus at `RECORD_GRAPH_MIN_FIT_ZOOM`. The radial and hierarchy layouts are
 * sized so a search-page result (~25 records on 1160 × 418) qualifies.
 * Since 2.403.7.
 */
export const RECORD_GRAPH_READABLE_ZOOM = 0.7;
/**
 * How far under `RECORD_GRAPH_READABLE_ZOOM` the automatic fit still takes
 * the whole graph (2.407.4): 0.68 draws the 13px titles at ~8.8px, still
 * readable, and a whole-graph fit at 0.694 (Hierarchy, 3 selected, on the
 * 1160 × 583 canvas) is a better opening view than the selection-centred
 * 0.8 frame it fell to, which put an unselected record under the controls.
 */
export const RECORD_GRAPH_READABLE_TOLERANCE = 0.02;
/**
 * The automatic fit's second rung (2.403.8): when the whole graph is not
 * readable (`RECORD_GRAPH_READABLE_ZOOM`), the selection and its direct
 * neighbours are framed if they fit at or above this zoom (names ≈ 7.8px).
 */
export const RECORD_GRAPH_NEIGHBOURHOOD_ZOOM = 0.6;
/**
 * The hard minimum for keeping the selection whole (2.403.8): a focus fit
 * zooms out below `RECORD_GRAPH_MIN_FIT_ZOOM` as far as this so the selected
 * records' full boxes fit the canvas with a 16px margin; below it only their
 * avatar circles are kept whole. It was also the viewer's whole-graph fit
 * floor in 2.403.8; that is `RECORD_GRAPH_FIT_ALL_MIN_ZOOM` (0.25) since 2.403.9.
 */
export const RECORD_GRAPH_FOCUS_MIN_ZOOM = 0.4;

/** The fit's default padding, px — kept in step with `recordGraphViewport`. */
const LAYOUT_FIT_PADDING = 24;
/** The bottom band the fit keeps clear of the legend and the zoom controls (48px + an 8px gap). */
const LAYOUT_OVERLAY_BAND = 56;

/**
 * The flow-px area a layout aims its drawing at so the automatic fit can show
 * all of it at `RECORD_GRAPH_READABLE_ZOOM`: the canvas less the fit's padding
 * and the overlay band, at that zoom, with 2% to spare. Since 2.403.7.
 */
function readableArea(width: number, height: number): { width: number; height: number } {
  return {
    width: (Math.max(1, width - 2 * LAYOUT_FIT_PADDING) / RECORD_GRAPH_READABLE_ZOOM) * 0.98,
    height: (Math.max(1, height - LAYOUT_FIT_PADDING - LAYOUT_OVERLAY_BAND) / RECORD_GRAPH_READABLE_ZOOM) * 0.98,
  };
}

/** The canvas a layout aims to fill when the host has not measured one. */
const DEFAULT_CANVAS = { width: 1160, height: 420 };

/** Column order for the hierarchy's by-type fallback. */
const TYPE_RANK: Record<RecordGraphType, number> = {
  person: 0, initiative: 1, work: 2, decision: 2, knowledge: 2, asset: 2,
};

export interface RecordGraphLayoutOptions {
  /** The canvas the layout should fill at a readable zoom, px. Default 1160 × 420. */
  width?: number;
  height?: number;
}

export interface RecordForceParams {
  /** forceLink distance, in simulation units (see `layoutRecordGraph`). */
  linkDistance: number;
  /** forceManyBody strength (negative = repel). */
  charge: number;
  /** forceCollide radius — half a node's width plus a gap, so boxes never overlap. */
  collide: number;
  /** forceX / forceY pull toward the centre, shaped to the canvas's aspect ratio. */
  xStrength: number;
  yStrength: number;
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/** The canvas's width:height in the force simulation's space, where y is stretched so the node box is square. */
function recordSimAspect(width: number, height: number): number {
  return (Math.max(1, width) / Math.max(1, height)) * (RECORD_GRAPH_NODE_HEIGHT / RECORD_GRAPH_NODE_WIDTH);
}

/**
 * The force layout's parameters for `count` records on a `width` × `height`
 * canvas, like the org graph's `forceParamsFor`: the canvas at the fit floor
 * (`RECORD_GRAPH_MIN_FIT_ZOOM`) is shared among the records, `spacing =
 * √(area / N)`, and links are ~0.9 of it (clamped 150–260) so a dozen records
 * spread across the canvas while twenty-five pack to a readable zoom rather
 * than to 46%. Collide is fixed by the node box (half its width + a gap), and
 * the x/y pulls are weighted by the aspect ratio so a wide canvas gets a wide
 * layout. Since 2.403.2.
 */
export function recordForceParams(count: number, width = DEFAULT_CANVAS.width, height = DEFAULT_CANVAS.height): RecordForceParams {
  const n = Math.max(1, count);
  const w = Math.max(1, width) / RECORD_GRAPH_MIN_FIT_ZOOM;
  const h = Math.max(1, height) / RECORD_GRAPH_MIN_FIT_ZOOM;
  const spacing = Math.sqrt((w * h) / n);
  // The simulation runs with y stretched so the (wider than tall) node box is
  // square — its canvas is correspondingly taller.
  const aspect = recordSimAspect(width, height);
  // How full the canvas is at the floor: each record takes its box plus a gap.
  const crowd = (n * (RECORD_GRAPH_NODE_WIDTH + 32) * (RECORD_GRAPH_NODE_HEIGHT + 24)) / (w * h);
  // 0 for a sparse set (a dozen on the search page's canvas), 1 once it packs.
  const t = clamp((crowd - 0.35) / 0.35, 0, 1);
  const K = 0.2 + 0.1 * t;
  const shape = Math.pow(aspect, 1 + t);
  return {
    linkDistance: clamp(spacing * 0.75, 130, 240),
    charge: -clamp((spacing * spacing) / 60, 300, 1200),
    // + 20: two collide circles 180 apart clear the boxes at every angle (at
    // + 16 a diagonal neighbour overlapped a box corner by 4px).
    collide: RECORD_GRAPH_NODE_WIDTH / 2 + 20,
    // A packed set's outline is an equipotential of the pulls, so the pulls
    // go as aspect² once the set packs — it then fills the canvas's width
    // before it overflows its height (2.403.5; aspect¹ left 25 records on a
    // 1160 × 418 canvas 82% wide and 117% tall). A sparse set keeps aspect¹,
    // which already spreads it, so a dozen still read at 100%.
    xStrength: clamp(K / shape, 0.005, 1),
    yStrength: clamp(K * shape, 0.005, 1),
  };
}

/**
 * The records a selection-first fit frames: the `focusKeys` that are drawn,
 * plus their direct neighbours over `edges`. Empty when none of the focus is
 * drawn — the host then fits the whole graph. Since 2.403.2.
 */
export function recordGraphFitKeys(
  recordKeys: readonly string[],
  edges: readonly Pick<RecordGraphEdge, 'source' | 'target'>[],
  focusKeys: readonly string[] | undefined,
): string[] {
  const drawn = new Set(recordKeys);
  const focus = new Set((focusKeys ?? []).filter(key => drawn.has(key)));
  if (!focus.size) return [];
  const keys = new Set(focus);
  edges.forEach(edge => {
    if (!drawn.has(edge.source) || !drawn.has(edge.target)) return;
    if (focus.has(edge.source)) keys.add(edge.target);
    if (focus.has(edge.target)) keys.add(edge.source);
  });
  return recordKeys.filter(key => keys.has(key));
}

/** Plural labels, in legend/select order. */
export const RECORD_GRAPH_TYPES: { value: RecordGraphType; label: string }[] = [
  { value: 'person', label: 'People' }, { value: 'initiative', label: 'Initiatives' },
  { value: 'work', label: 'Work' }, { value: 'decision', label: 'Decisions' },
  { value: 'knowledge', label: 'Knowledge' }, { value: 'asset', label: 'Agent library' },
];

/** The key a node and a selection hold: `${type}:${id}`. */
export function recordGraphKey(record: Pick<RecordGraphRecord, 'id' | 'type'>): string {
  return `${record.type}:${record.id}`;
}

/** Deduplicate real records and discard dangling edges after filtering. */
export function filterRecordGraph<R extends RecordGraphRecord, E extends RecordGraphEdge>(
  records: R[],
  edges: E[],
  type: RecordGraphType | 'all',
): { records: R[]; edges: E[] } {
  const nodes = [...new Map(records.filter(record => type === 'all' || record.type === type)
    .map(record => [recordGraphKey(record), record])).values()];
  const ids = new Set(nodes.map(recordGraphKey));
  const links = [...new Map(edges.filter(edge => ids.has(edge.source) && ids.has(edge.target))
    .map(edge => [edge.id, edge])).values()];
  return { records: nodes, edges: links };
}

/** Horizontal / vertical pitch of the hierarchy's grid, px. */
const HIERARCHY_COLUMN = RECORD_GRAPH_NODE_WIDTH + 36;
const HIERARCHY_RANK_GAP = 96;
const HIERARCHY_ROW = RECORD_GRAPH_NODE_HEIGHT + 20;

/**
 * Longest-path ranks: a record sits one column right of its furthest
 * predecessor. Cycles are broken by a depth-first walk in `ordered` order
 * (the back edge is ignored), so any evidence terminates.
 */
function longestPathRanks(ordered: string[], edges: Pick<RecordGraphEdge, 'source' | 'target'>[]): Map<string, number> {
  const out = new Map<string, string[]>(ordered.map(id => [id, []]));
  edges.forEach(edge => { if (edge.source !== edge.target) out.get(edge.source)!.push(edge.target); });
  const state = new Map<string, 1 | 2>(); // 1 = on the stack, 2 = done
  const dag = new Map<string, string[]>(ordered.map(id => [id, []]));
  const post: string[] = [];
  const visit = (root: string) => {
    if (state.has(root)) return;
    // Iterative DFS so a long chain cannot overflow the stack.
    const stack: { id: string; next: number }[] = [{ id: root, next: 0 }];
    state.set(root, 1);
    while (stack.length) {
      const frame = stack[stack.length - 1]!;
      const targets = out.get(frame.id)!;
      if (frame.next < targets.length) {
        const target = targets[frame.next++]!;
        const s = state.get(target);
        if (s === 1) continue; // back edge — the cycle's closing link
        dag.get(frame.id)!.push(target);
        if (!s) { state.set(target, 1); stack.push({ id: target, next: 0 }); }
      } else {
        state.set(frame.id, 2);
        post.push(frame.id);
        stack.pop();
      }
    }
  };
  // Start from true roots so a cycle is broken where it closes, not where it opens.
  const incoming = new Set(edges.map(edge => edge.target));
  ordered.filter(id => !incoming.has(id)).forEach(visit);
  ordered.forEach(visit);
  const rank = new Map<string, number>(ordered.map(id => [id, 0]));
  // Reverse post-order is a topological order of the DAG.
  for (let i = post.length - 1; i >= 0; i--) {
    const id = post[i]!;
    dag.get(id)!.forEach(target => rank.set(target, Math.max(rank.get(target)!, rank.get(id)! + 1)));
  }
  return rank;
}

/**
 * Hierarchy positions. Columns are longest-path ranks; with no directed chain
 * at all (every record rank 0) the columns are record types instead (person →
 * initiative → work/decision/knowledge/asset), so it never collapses to one
 * column. A column taller than the canvas at `RECORD_GRAPH_READABLE_ZOOM`
 * wraps into side-by-side sub-columns, and each column is centred on y = 0.
 * Since 2.403.7 the gaps between columns are scaled to the canvas's width and
 * the column count — squeezed so a wide result fits at the readable zoom,
 * widened (up to twice) so a few columns fill a wide canvas — and the block
 * is centred on x = 0.
 */
function hierarchyPositions(
  records: Pick<RecordGraphRecord, 'id' | 'type'>[],
  ordered: string[],
  edges: Pick<RecordGraphEdge, 'source' | 'target'>[],
  width: number,
  height: number,
): Map<string, { x: number; y: number }> {
  let rank = longestPathRanks(ordered, edges);
  if (Math.max(...rank.values()) === 0) {
    const typeOf = new Map(records.map(record => [recordGraphKey(record), record.type]));
    const used = [...new Set(ordered.map(id => TYPE_RANK[typeOf.get(id)!]))].sort((a, b) => a - b);
    rank = new Map(ordered.map(id => [id, used.indexOf(TYPE_RANK[typeOf.get(id)!])]));
  }
  const area = readableArea(width, height);
  // As many rows as the readable height holds, the row gap squeezed from 20
  // to 12px if that buys a row.
  const maxRows = clamp(Math.floor((area.height - RECORD_GRAPH_NODE_HEIGHT) / (RECORD_GRAPH_NODE_HEIGHT + 12)) + 1, 3, 12);
  const rowPitch = clamp((area.height - RECORD_GRAPH_NODE_HEIGHT) / Math.max(1, maxRows - 1), RECORD_GRAPH_NODE_HEIGHT + 12, HIERARCHY_ROW);
  const columns = new Map<number, string[]>();
  ordered.forEach(id => {
    const r = rank.get(id)!;
    columns.set(r, [...(columns.get(r) ?? []), id]);
  });
  // One barycentre pass: order each column by where its predecessors sit, so
  // lines run straight rather than crossing.
  const index = new Map<string, number>();
  const preds = new Map<string, string[]>();
  edges.forEach(edge => preds.set(edge.target, [...(preds.get(edge.target) ?? []), edge.source]));
  const ranks = [...columns.keys()].sort((a, b) => a - b);
  const subColumnsOf = (r: number) => Math.ceil(columns.get(r)!.length / maxRows);
  const subColumns = ranks.reduce((sum, r) => sum + subColumnsOf(r), 0);
  // Box-to-box gaps: within a rank and between ranks. Natural 36 / 132 px,
  // scaled by one factor so the block spans the readable width (never below
  // 16 / 48, never over twice natural, and a lone column stays put).
  const innerGaps = subColumns - ranks.length, rankGaps = ranks.length - 1;
  const INNER = HIERARCHY_COLUMN - RECORD_GRAPH_NODE_WIDTH, RANK = INNER + HIERARCHY_RANK_GAP;
  const natural = innerGaps * INNER + rankGaps * RANK;
  // A few columns fill the canvas at 100%; a wide result, the readable area.
  const naturalWidth = subColumns * RECORD_GRAPH_NODE_WIDTH + natural;
  const room = naturalWidth > Math.max(1, width - 2 * LAYOUT_FIT_PADDING) ? area.width : Math.max(1, width - 2 * LAYOUT_FIT_PADDING);
  const scale = natural > 0 ? clamp((room - subColumns * RECORD_GRAPH_NODE_WIDTH) / natural, 0, 2) : 1;
  const inner = Math.max(16, INNER * scale), rankGap = Math.max(48, RANK * scale);
  const positions = new Map<string, { x: number; y: number }>();
  let x = 0;
  ranks.forEach(r => {
    const ids = columns.get(r)!;
    const bary = (id: string) => {
      const placed = (preds.get(id) ?? []).filter(p => index.has(p));
      return placed.length ? placed.reduce((sum, p) => sum + index.get(p)!, 0) / placed.length : Infinity;
    };
    const sorted = r === 0 ? ids : [...ids].sort((a, b) => bary(a) - bary(b));
    sorted.forEach((id, i) => index.set(id, i));
    const subs = subColumnsOf(r);
    const rows = Math.ceil(sorted.length / subs);
    sorted.forEach((id, i) => {
      const sub = Math.floor(i / rows);
      const row = i % rows;
      const inThis = Math.min(rows, sorted.length - sub * rows);
      positions.set(id, { x: x + sub * (RECORD_GRAPH_NODE_WIDTH + inner), y: (row - (inThis - 1) / 2) * rowPitch });
    });
    x += subs * RECORD_GRAPH_NODE_WIDTH + (subs - 1) * inner + rankGap;
  });
  // Centre the block on x = 0 (its boxes, not their left edges).
  const blockWidth = x - rankGap;
  positions.forEach(p => { p.x -= blockWidth / 2; });
  return positions;
}

/** Ramanujan's perimeter of an ellipse. */
function ellipsePerimeter(a: number, b: number): number {
  return Math.PI * (3 * (a + b) - Math.sqrt((3 * a + b) * (a + 3 * b)));
}

/** `count` points on an ellipse at equal arc lengths (not equal angles, which bunch up along its flat top and bottom). */
function ellipsePoints(a: number, b: number, count: number, phase: number): { x: number; y: number }[] {
  const STEPS = 720;
  const at = (i: number) => {
    const t = i * 2 * Math.PI / STEPS - Math.PI / 2;
    return { x: Math.cos(t) * a, y: Math.sin(t) * b };
  };
  const arc: number[] = [0];
  for (let i = 1; i <= STEPS; i++) {
    const p = at(i - 1), q = at(i);
    arc.push(arc[i - 1]! + Math.hypot(q.x - p.x, q.y - p.y));
  }
  const total = arc[STEPS]!;
  const out: { x: number; y: number }[] = [];
  let step = 0;
  for (let index = 0; index < count; index++) {
    const target = ((index + phase) / count) * total;
    while (step < STEPS && arc[step + 1]! < target) step++;
    out.push(at(step));
  }
  return out;
}

/** A radial ring plan: `rings` ellipses at k × (stepX, stepY), holding `counts[k-1]` records each. */
export interface RecordRadialRings {
  rings: number;
  stepX: number;
  stepY: number;
  counts: number[];
  /** Whether the outer ring fits the readable area (`RECORD_GRAPH_READABLE_ZOOM`). */
  fits: boolean;
  /**
   * Since 2.406.4: a plan for a set too big to fit at the readable zoom,
   * shaped to the canvas (`fits` is false) — its rings may sit closer than a
   * node box, so its records are placed with the same overlap resolution as
   * a fitting plan.
   */
  shaped?: true;
}

/** Arc length a record takes on a ring: its box width plus a gap. */
const RADIAL_ARC = RECORD_GRAPH_NODE_WIDTH + 30;

/**
 * Rings for `count` records (one at the centre) on a `width` × `height`
 * canvas. The spacing comes from the node box — 128px between rings
 * vertically, the canvas's aspect (≤ 2.4) sideways — and shrinks only as far
 * as it must for the outer ring's ellipse to sit inside the readable area
 * (`RECORD_GRAPH_READABLE_ZOOM`): the fewest rings that hold everyone, at the
 * widest spacing that fits. Records are shared among the rings in proportion
 * to their perimeters, so the outer ring is not a lone straggler. Past about
 * thirty records nothing fits and the natural spacing is kept (the automatic
 * fit then centres on the focus). Since 2.403.7; was a fixed 128 × 307px step.
 */
export function recordRadialRings(
  count: number,
  width = DEFAULT_CANVAS.width,
  height = DEFAULT_CANVAS.height,
  legendLabels: readonly string[] = TYPICAL_LEGEND,
): RecordRadialRings {
  // The plan the layout actually uses: the first whose records all find room.
  const plans = radialPlans(count, width, height, legendLabels);
  return placeRadial(plans)?.plan ?? plans[plans.length - 1]!;
}

/** Every ring plan that fits the readable area, preferred first, then the natural fallback. */
function radialPlans(count: number, width: number, height: number, legendLabels: readonly string[] = TYPICAL_LEGEND): RecordRadialRings[] {
  const others = Math.max(0, count - 1);
  if (!others) return [{ rings: 0, stepX: 0, stepY: 0, counts: [], fits: true }];
  const area = readableArea(width, height);
  // Half-extents of the node boxes' top-left corners that keep every box inside.
  const maxX = Math.max(RECORD_GRAPH_NODE_WIDTH / 2, (area.width - RECORD_GRAPH_NODE_WIDTH) / 2);
  const maxY = Math.max(RECORD_GRAPH_NODE_HEIGHT / 2, (area.height - RECORD_GRAPH_NODE_HEIGHT) / 2);
  const aspect = clamp(width / height, 1, 2.4);
  const naturalY = RECORD_GRAPH_NODE_HEIGHT + 24;
  const naturalX = Math.max(RADIAL_ARC, naturalY * aspect);
  const capacity = (rings: number, sx: number, sy: number) =>
    Array.from({ length: rings }, (_, k) => Math.max(1, Math.floor(ellipsePerimeter((k + 1) * sx, (k + 1) * sy) / RADIAL_ARC)));
  const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0);
  const spread = (caps: number[]) => {
    const total = sum(caps);
    const counts = caps.map(c => Math.min(c, Math.floor((others * c) / total)));
    let left = others - sum(counts);
    for (let k = caps.length - 1; left > 0; k = (k - 1 + caps.length) % caps.length) {
      if (counts[k]! < caps[k]!) { counts[k]!++; left--; }
    }
    return counts;
  };
  const plans: RecordRadialRings[] = [];
  // The natural sideways step first, at any ring count; then the whole readable width.
  for (const wide of [false, true]) {
    for (let rings = 1; rings <= 6 && maxX / rings >= RADIAL_ARC / 2; rings++) {
      const sy = Math.min(naturalY, maxY / rings);
      const sx = wide ? maxX / rings : Math.min(naturalX, maxX / rings);
      const caps = capacity(rings, sx, sy);
      if (sum(caps) >= others) plans.push({ rings, stepX: sx, stepY: sy, counts: spread(caps), fits: true });
    }
  }
  // Too many to fit (2.406.4): rings shaped to the canvas. The natural
  // fallback kept a 128px vertical step and a sideways step capped at 2.4× it,
  // so on a short, wide canvas (the 1098 × 270 answer card, 64 records) the
  // outer ellipse was four rings tall and could not be shown whole even at the
  // 0.25 fit-all floor. Every ring count is tried at a vertical step from the
  // natural one down to a node box's height, with the narrowest sideways step
  // whose rings hold everyone; the plans are ranked by the zoom at which their
  // whole drawing fits the canvas's clear area (less the padding and the
  // overlay band), so a wide canvas gets few, wide rings and a tall one more,
  // rounder rings — for any N.
  plans.push(...shapedPlans(others, width, height, legendLabels, capacity, spread));
  // Last resort: the natural spacing, as many rings as it takes.
  let rings = 1;
  while (sum(capacity(rings, naturalX, naturalY)) < others) rings++;
  plans.push({ rings, stepX: naturalX, stepY: naturalY, counts: spread(capacity(rings, naturalX, naturalY)), fits: false });
  return plans;
}

/** Screen px a node box keeps from its neighbour when a squeezed ring's records are placed. */
const RADIAL_NEED_X = RECORD_GRAPH_NODE_WIDTH + 10;
const RADIAL_NEED_Y = RECORD_GRAPH_NODE_HEIGHT + 6;
/** The legend `recordRadialRings` assumes when it is not told the record types. */
const TYPICAL_LEGEND = ['People', 'Initiatives', 'Work', 'Decisions', 'Knowledge'] as const;
/** The zooms a canvas-shaped plan is sized for: from the readable zoom down to this, in these steps. */
const SHAPED_MIN_ZOOM = 0.1;
const SHAPED_ZOOM_STEP = 0.01;
/** The most rings a canvas-shaped plan tries. */
const RADIAL_MAX_SHAPED_RINGS = 12;

/**
 * Canvas-shaped ring plans for `others` records that do not fit the readable
 * area, best whole-drawing zoom first (see `radialPlans`). Since 2.406.4.
 */
function shapedPlans(
  others: number,
  width: number,
  height: number,
  legendLabels: readonly string[],
  capacity: (rings: number, sx: number, sy: number) => number[],
  spread: (caps: number[]) => number[],
): RecordRadialRings[] {
  // The clear area the whole-graph fit will use: the canvas less the padding
  // and the legend and controls, reserved as `recordGraphInset` does (a short
  // canvas reserves them as side columns, not a bottom band), for the legend
  // the graph will draw (one label per record type present).
  const inset = recordGraphInset({ width, height }, {
    legend: legendLabels.length ? recordGraphLegendSize(legendLabels, width) : null,
    controls: RECORD_GRAPH_CONTROLS_SIZE,
  });
  const edge = (v: number) => (v > 0 ? Math.max(LAYOUT_FIT_PADDING, v + OVERLAY_GAP) : LAYOUT_FIT_PADDING);
  const clearW = Math.max(1, width - edge(inset.left) - edge(inset.right));
  const clearH = Math.max(1, height - edge(inset.top) - edge(inset.bottom));
  const total = (xs: number[]) => xs.reduce((a, b) => a + b, 0);
  const plans: RecordRadialRings[] = [];
  // From the readable zoom down, the outer ring's bounds are the clear area at
  // that zoom — the canvas's own shape, however wide — and the fewest rings
  // whose perimeters hold everyone are tried there. Rings closer than a node
  // box are packed by `ringPoints`, which returns null when there is no room,
  // and `radialPositions` then tries the next (smaller) zoom.
  for (let zoom = RECORD_GRAPH_READABLE_ZOOM; zoom >= SHAPED_MIN_ZOOM - 1e-9; zoom -= SHAPED_ZOOM_STEP) {
    const boundX = (clearW / zoom - RECORD_GRAPH_NODE_WIDTH) / 2;
    const boundY = (clearH / zoom - RECORD_GRAPH_NODE_HEIGHT) / 2;
    if (boundX <= 0 || boundY <= 0) continue;
    // A box-packing bound: no plan holds more records than the bounds' grid of boxes.
    if ((2 * boundX / RADIAL_NEED_X + 1) * (2 * boundY / RADIAL_NEED_Y + 1) < others + 1) continue;
    for (let rings = 1; rings <= RADIAL_MAX_SHAPED_RINGS && boundX / rings >= RADIAL_ARC / 2; rings++) {
      const sx = boundX / rings, sy = boundY / rings;
      const caps = capacity(rings, sx, sy);
      if (total(caps) < others) continue;
      plans.push({ rings, stepX: sx, stepY: sy, counts: spread(caps), fits: false, shaped: true });
      break;
    }
  }
  return plans;
}

/**
 * Radial positions: the best-connected record at the centre, the rest on
 * `recordRadialRings` in degree order (the inner ring around the focus holds
 * the most connected), spread at equal arc lengths. Rings squeezed to the
 * readable area can sit closer than a node box, so a record whose ring point
 * is taken moves to the nearest free spot inside the outer ring's bounds; when
 * some record finds none, the next plan is tried (wider rings, then the
 * natural spacing, which never overlaps). Since 2.403.7.
 */
function radialPositions(ordered: string[], width: number, height: number, legendLabels: readonly string[]): Map<string, { x: number; y: number }> {
  const placed = placeRadial(radialPlans(ordered.length, width, height, legendLabels));
  return placed ? new Map(ordered.map((id, i) => [id, placed.points[i]!])) : new Map();
}

/**
 * The first plan whose records all find room, and its points; the natural
 * spacing always does. The canvas-shaped plans (2.406.4) are a run ordered
 * from the largest zoom down, where a smaller zoom only adds room, so that
 * run is binary-searched rather than tried one by one — each failed packing
 * is a full grid search.
 */
function placeRadial(plans: RecordRadialRings[]): { plan: RecordRadialRings; points: { x: number; y: number }[] } | null {
  for (let i = 0; i < plans.length; i++) {
    if (!plans[i]!.shaped) {
      const points = ringPoints(plans[i]!);
      if (points) return { plan: plans[i]!, points };
      continue;
    }
    let end = i;
    while (end < plans.length && plans[end]!.shaped) end++;
    // The first index in [i, end) that places; the last one is checked first.
    const lastPoints = ringPoints(plans[end - 1]!);
    if (lastPoints) {
      let lo = i, hi = end - 1;
      let best = { plan: plans[hi]!, points: lastPoints };
      while (lo < hi) {
        const mid = Math.floor((lo + hi) / 2);
        const points = ringPoints(plans[mid]!);
        if (points) { best = { plan: plans[mid]!, points }; hi = mid; } else lo = mid + 1;
      }
      return best;
    }
    i = end - 1;
  }
  return null;
}

/** A plan's positions (centre first), or null when a squeezed plan has no room for some record. */
function ringPoints(plan: RecordRadialRings): { x: number; y: number }[] | null {
  const points: { x: number; y: number }[] = [{ x: 0, y: 0 }];
  plan.counts.forEach((n, k) => {
    const ring = k + 1;
    points.push(...ellipsePoints(ring * plan.stepX, ring * plan.stepY, n, ring % 2 ? 0.25 : 0.75));
  });
  if ((plan.fits || plan.shaped) && plan.rings > 0) {
    // Rings squeezed below a node box's height would stack boxes: place the
    // records one at a time, inner ring first, each at its ring point or —
    // when that box is taken — at the nearest free spot inside the outer
    // ring's bounds (on a grid). Deterministic, and no two boxes overlap
    // while there is room.
    const boundX = plan.rings * plan.stepX, boundY = plan.rings * plan.stepY;
    const needX = RADIAL_NEED_X, needY = RADIAL_NEED_Y;
    const placed: { x: number; y: number }[] = [points[0]!];
    const free = (x: number, y: number) => placed.every(q => Math.abs(q.x - x) >= needX || Math.abs(q.y - y) >= needY);
    // A 4px grid, coarser on a big canvas so the search stays ~20k spots.
    const GRID = Math.max(4, Math.sqrt((4 * boundX * boundY) / 20000));
    for (let i = 1; i < points.length; i++) {
      const want = points[i]!;
      let best: { x: number; y: number } | null = free(want.x, want.y) ? want : null;
      let bestCost = 0;
      if (!best) {
        for (let y = -boundY; y <= boundY + 0.01; y += GRID) {
          for (let x = -boundX; x <= boundX + 0.01; x += GRID) {
            const cost = ((x - want.x) / needX) ** 2 + ((y - want.y) / needY) ** 2;
            if (best && cost >= bestCost) continue;
            if (free(x, y)) { best = { x, y }; bestCost = cost; }
          }
        }
      }
      if (!best) return null;
      points[i] = best;
      placed.push(best);
    }
  }
  return points;
}

/**
 * Rendering positions only: never infer an edge from a shared title or type.
 * `options` is the canvas the layout should fill (default 1160 × 420): the
 * force distances, the radial rings' shape and the hierarchy's column height
 * are all sized to it at the fit floor, so the drawing reads without zooming
 * below `RECORD_GRAPH_MIN_FIT_ZOOM`. Since 2.403.7 the radial rings and the
 * hierarchy's columns are sized so a ~25-record result fits whole at
 * `RECORD_GRAPH_READABLE_ZOOM` (`recordRadialRings`).
 */
export function layoutRecordGraph(
  records: Pick<RecordGraphRecord, 'id' | 'type'>[],
  edges: Pick<RecordGraphEdge, 'source' | 'target'>[],
  layout: RecordGraphLayout,
  options: RecordGraphLayoutOptions = {},
): Map<string, { x: number; y: number }> {
  const width = options.width && options.width > 0 ? options.width : DEFAULT_CANVAS.width;
  const height = options.height && options.height > 0 ? options.height : DEFAULT_CANVAS.height;
  const ids = records.map(recordGraphKey);
  if (!ids.length) return new Map<string, { x: number; y: number }>();
  const degree = new Map(ids.map(id => [id, 0]));
  const validEdges = edges.filter(edge => degree.has(edge.source) && degree.has(edge.target));
  validEdges.forEach(edge => {
    degree.set(edge.source, degree.get(edge.source)! + 1);
    degree.set(edge.target, degree.get(edge.target)! + 1);
  });
  const ordered = [...ids].sort((a, b) => degree.get(b)! - degree.get(a)! || a.localeCompare(b));
  const positions = new Map<string, { x: number; y: number }>();
  if (layout === 'radial') {
    // The legend RecordGraph draws: one label per type present (2.406.4).
    const legendLabels = RECORD_GRAPH_TYPES.filter(t => records.some(r => r.type === t.value)).map(t => t.label);
    return radialPositions(ordered, width, height, legendLabels);
  }
  if (layout === 'hierarchy') return hierarchyPositions(records, ordered, validEdges, width, height);
  // Force: simulate with y stretched so the node box is square (collide is a
  // circle), then squash y back — boxes clear each other on both axes.
  const squash = RECORD_GRAPH_NODE_HEIGHT / RECORD_GRAPH_NODE_WIDTH;
  const params = recordForceParams(ids.length, width, height);
  const start = params.linkDistance;
  // Start from an ellipse of the canvas's (simulation-space) shape, not a
  // circle, so the pulls do not have to drag a round blob wide (2.403.5).
  const stretch = recordSimAspect(width, height);
  const nodes = ordered.map((id, index) => {
    const r = start * Math.sqrt((index + 0.5) / ordered.length) * 1.5;
    return { id, x: Math.cos(index * 2.4) * r * stretch, y: Math.sin(index * 2.4) * r / stretch };
  });
  // Deterministic initial positions and a stopped simulation avoid background
  // timers and layout jitter.
  const simulation = forceSimulation(nodes)
    .force('link', forceLink(validEdges.map(edge => ({ source: edge.source, target: edge.target })))
      .id(node => (node as typeof nodes[number]).id).distance(params.linkDistance).strength(0.1))
    .force('charge', forceManyBody().strength(params.charge))
    .force('collide', forceCollide(params.collide).iterations(3))
    // A center force alone only translates the group: disconnected records
    // can drift arbitrarily far away and make fit-to-view unreadably small.
    .force('x', forceX(0).strength(params.xStrength))
    .force('y', forceY(0).strength(params.yStrength))
    .force('center', forceCenter(0, 0)).stop();
  simulation.tick(300);
  // The aspect-shaped pulls can press a packed set harder than collide pushes
  // back, so finish with collide alone: overlapping boxes step apart and
  // nothing else moves (2.403.5).
  simulation.force('link', null).force('charge', null).force('x', null).force('y', null).force('center', null);
  simulation.tick(80);
  // A packed set can still come out a few percent taller than the area the
  // automatic fit shows at `RECORD_GRAPH_READABLE_ZOOM` (a 25-record result
  // was 505 flow px against 473 on 1160 × 418). Close its rows up by at most
  // 15%, only when that makes it fit, and never so any more boxes touch
  // (2.403.7).
  const ys = nodes.map(node => node.y * squash);
  const span = Math.max(...ys) - Math.min(...ys) + RECORD_GRAPH_NODE_HEIGHT;
  const want = (readableArea(width, height).height - RECORD_GRAPH_NODE_HEIGHT) / (span - RECORD_GRAPH_NODE_HEIGHT);
  let factor = 1;
  if (want < 1 && want >= 0.85) {
    const touching = (f: number) => {
      let count = 0;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          if (Math.abs(nodes[i]!.x - nodes[j]!.x) < RECORD_GRAPH_NODE_WIDTH
            && Math.abs(ys[i]! - ys[j]!) * f < RECORD_GRAPH_NODE_HEIGHT) count++;
        }
      }
      return count;
    };
    if (touching(want) <= touching(1)) factor = want;
  }
  nodes.forEach((node, i) => positions.set(node.id, { x: node.x, y: ys[i]! * factor }));
  return positions;
}

/** A pan/zoom viewport in xyflow's terms: screen = flow × zoom + (x, y). */
export interface RecordGraphViewport {
  x: number;
  y: number;
  zoom: number;
}

/**
 * Floor of the whole-graph fit the viewer asks for — "Fit to view" and
 * `RecordGraphHandle.fitAll()` — which, like the org graph's `fitAll`, trades
 * the readability floor for seeing everything at once. Since 2.403.5 (0.5);
 * 0.4 in 2.403.8; 0.25 since 2.403.9, below `RECORD_GRAPH_FOCUS_MIN_ZOOM`, so
 * a short canvas (the 209px expanded-conversation pane) still shows every
 * record. Only a drawing that does not fit even here centres on the focus.
 */
export const RECORD_GRAPH_FIT_ALL_MIN_ZOOM = 0.25;
/**
 * The whole-graph fit's hard minimum on a short canvas (2.406.4): where the
 * clear height (the canvas less 24px padding top and bottom) is under
 * `RECORD_GRAPH_SHORT_FIT_CLEAR_HEIGHT` and nothing is selected, a whole-graph
 * fit (`mode: 'all'` at or below `RECORD_GRAPH_FIT_ALL_MIN_ZOOM`, and `auto`
 * with no focus) goes below 0.25 as far as this, so "everything visible"
 * holds for the 270px answer card with 60+ records. With a selection the
 * 0.25 floor and the centre-on-the-selection rule are unchanged.
 */
export const RECORD_GRAPH_FIT_ALL_SHORT_MIN_ZOOM = 0.1;
/** Clear height, px, under which the short-canvas fit-all minimum applies. Since 2.406.4. */
export const RECORD_GRAPH_SHORT_FIT_CLEAR_HEIGHT = 300;

/**
 * The zoom cluster plus the full-screen button in the canvas's bottom-right
 * corner, margins included (`bottom-3 right-3`, a 34px-tall toolbar about
 * 196px wide). The fit keeps the drawing clear of it. Since 2.403.5.
 */
export const RECORD_GRAPH_CONTROLS_SIZE = { width: 212, height: 48 } as const;

/** Screen px between an overlay's box and the fitted drawing. */
const OVERLAY_GAP = 8;
/** Screen px a focus node's circle keeps from the canvas edge when nothing else fits. */
const FOCUS_EDGE_MARGIN = 16;
/**
 * A canvas whose clear height (less the default 24px padding top and bottom)
 * is under this is "short" for `recordGraphInset`. Since 2.403.9.
 */
const SHORT_CLEAR_HEIGHT = 260;
/** On a short canvas, the most of its clear height the two bottom bands may take. Since 2.403.9. */
const SHORT_BAND_SHARE = 0.4;
/** On a short canvas, the most of its width the two side columns may take instead. Since 2.403.9. */
const SHORT_SIDE_SHARE = 0.6;

/**
 * The bottom-left legend's box for these type labels on a `canvasWidth`
 * canvas, margins included: 12px text on a bordered pill (`bottom-3 left-3`),
 * capped at the canvas less 18rem, wrapping into rows past that. An estimate
 * from the label lengths — the fit reserves it before the legend is measured.
 * Since 2.403.5.
 */
export function recordGraphLegendSize(labels: readonly string[], canvasWidth: number): { width: number; height: number } {
  if (!labels.length) return { width: 0, height: 0 };
  const items = labels.map(label => 14 + Math.ceil(label.length * 5.6));
  const natural = 22 + items.reduce((sum, w) => sum + w, 0) + 12 * (labels.length - 1);
  const cap = Math.max(120, canvasWidth - 288);
  const rows = Math.max(1, Math.ceil(natural / cap));
  return { width: Math.min(natural, cap) + 12, height: 14 + rows * 16 + (rows - 1) * 4 + 12 };
}

/**
 * Insets that keep the bottom-left legend and the bottom-right controls clear:
 * each corner is reserved along the bottom or its side edge, whichever costs
 * the smaller share of the clear area (the org graph's `reserveCorner`,
 * mirrored for the left corner). On a wide canvas both land on the bottom, so
 * one band clears both. Since 2.403.5.
 *
 * On a short canvas (clear height under 260px) where the two corners' bottom
 * bands would together take more than 40% of the clear height, reserving
 * height is what makes a whole-graph fit impossible (the 209px expanded
 * conversation pane), so each corner is reserved along its side edge — the
 * legend on the left, the controls on the right — and no height is lost. Where
 * those two columns would take more than 60% of the width, a single bottom band
 * as tall as the taller corner clears both instead. Since 2.403.9.
 */
export function recordGraphInset(
  size: { width: number; height: number },
  overlays: { legend?: { width: number; height: number } | null; controls?: { width: number; height: number } | null },
): Required<FitInset> {
  let inset: Required<FitInset> = { left: 0, right: 0, top: 0, bottom: 0 };
  const { legend, controls } = overlays;
  if (legend && legend.width > 0 && controls && controls.width > 0) {
    const clearH = size.height - 2 * LAYOUT_FIT_PADDING;
    const bands = legend.height + controls.height + 2 * OVERLAY_GAP;
    if (clearH < SHORT_CLEAR_HEIGHT && bands > SHORT_BAND_SHARE * clearH) {
      return legend.width + controls.width + 2 * OVERLAY_GAP <= SHORT_SIDE_SHARE * size.width
        ? { ...inset, left: legend.width, right: controls.width }
        : { ...inset, bottom: Math.max(legend.height, controls.height) };
    }
  }
  if (overlays.controls && overlays.controls.width > 0) inset = reserveCorner(inset, size, overlays.controls);
  if (overlays.legend && overlays.legend.width > 0) {
    const mirrored = reserveCorner({ ...inset, left: inset.right, right: inset.left }, size, overlays.legend);
    inset = { ...mirrored, left: mirrored.right, right: mirrored.left };
  }
  return inset;
}

export interface RecordGraphViewportOptions {
  /**
   * `focus` frames `focusKeys` + their neighbours (`fitKeys`) when they fit at
   * or above the floor (`minZoom`). Otherwise (2.403.8) it zooms to
   * min(floor, the zoom at which the focus's full boxes fit the canvas with a
   * 16px margin), never below `focusMinZoom`, and centres on the largest of
   * the whole graph, the neighbourhood and the focus itself that fits, per
   * axis — so the focus is never clipped. When the focus's boxes do not fit
   * the clear area they are kept 16px inside the canvas, and below
   * `focusMinZoom` its avatar circles are kept in view (2.403.5). `all` frames
   * the whole graph, centred in the clear area whenever it fits at or above
   * `minZoom` (2.403.9: the focus never moves a drawing that fits); only where
   * it overflows at the floor does it centre on the focus (when `focusKeys`
   * are given, 2.403.8) or align top-left so the viewer pans.
   */
  mode: 'focus' | 'all' | 'auto';
  /**
   * `auto` — the automatic fit ladder (2.403.7, rung (b) since 2.403.8):
   * (a) the whole graph when it fits at or above this zoom; else (b) the focus
   * + neighbours when they fit at or above `neighbourhoodZoom` — unless that
   * frame would hold the whole graph below this zoom (2.407.2: with a focus,
   * fit-all only at or above it, in every layout); else (c) the
   * `focus` rule's selection fit. With no drawn `focusKeys` there is nothing
   * to centre on, so `auto` is `all` down to `fitAllMinZoom` (2.406.3; was
   * `all` at the 0.8 floor, which left 59 records under the legend and zoom
   * cluster on a 270px card canvas). Default `RECORD_GRAPH_READABLE_ZOOM`.
   */
  readableZoom?: number;
  /** Rung (b) of `auto`. Default `RECORD_GRAPH_NEIGHBOURHOOD_ZOOM`. Since 2.403.8. */
  neighbourhoodZoom?: number;
  /**
   * How far `auto` with no focus may zoom out to show every record (the
   * whole-graph fit, corners reserved). Default `RECORD_GRAPH_FIT_ALL_MIN_ZOOM`.
   * Since 2.406.3.
   */
  fitAllMinZoom?: number;
  /** How far a focus fit may zoom out to keep the selection's boxes whole. Default `RECORD_GRAPH_FOCUS_MIN_ZOOM`. Since 2.403.8. */
  focusMinZoom?: number;
  /** The focus records themselves (usually the selection) — never clipped when they fit. */
  focusKeys?: readonly string[];
  /** Focus plus direct neighbours (`recordGraphFitKeys`). Framed first when it fits. */
  fitKeys?: readonly string[];
  /** Screen px kept clear on every side (at least 16). Default 24. */
  padding?: number;
  /**
   * Screen px along each edge taken by an overlay — `recordGraphInset` for the
   * legend and controls. The drawing keeps `padding`, or the inset plus an
   * 8px gap where that is more, from each edge. Since 2.403.5.
   */
  inset?: FitInset;
  /**
   * The overlays' own boxes (2.407.4) — the bottom-left legend and the
   * bottom-right controls, margins included, as `recordGraphInset` was
   * given them. With them, a selection-centred fit on a canvas whose clear
   * height is at least `RECORD_GRAPH_SHORT_FIT_CLEAR_HEIGHT` is shifted,
   * nearest pan first, so no record sits under either while the selected
   * boxes stay whole inside the canvas (the org graph's 2.405.1 rule,
   * `clearOfOverlays`). A record pushed past the canvas edge is fine.
   */
  overlays?: { legend?: { width: number; height: number } | null; controls?: { width: number; height: number } | null };
  minZoom?: number;
  maxZoom?: number;
}

/**
 * The legend's and the controls' screen rectangles on a `size` canvas —
 * bottom-left and bottom-right corners. Since 2.407.4.
 */
export function recordGraphOverlayRects(
  size: { width: number; height: number },
  overlays: RecordGraphViewportOptions['overlays'],
): ScreenRect[] {
  const out: ScreenRect[] = [];
  const { legend, controls } = overlays ?? {};
  if (legend && legend.width > 0 && legend.height > 0) {
    out.push({ left: 0, top: size.height - legend.height, right: legend.width, bottom: size.height });
  }
  if (controls && controls.width > 0 && controls.height > 0) {
    out.push({ left: size.width - controls.width, top: size.height - controls.height, right: size.width, bottom: size.height });
  }
  return out;
}

interface Box { x0: number; y0: number; x1: number; y1: number }

/** Where a node's parts sit inside its box, flow px. */
interface NodePart { x0: number; y0: number; x1: number; y1: number }
const WHOLE_NODE: NodePart = { x0: 0, y0: 0, x1: RECORD_GRAPH_NODE_WIDTH, y1: RECORD_GRAPH_NODE_HEIGHT };
/**
 * The avatar circle: 48px, 4px below the node's top and centred, plus 6px for
 * the selection ring (2px + 2px offset) and the check badge.
 */
const NODE_CIRCLE: NodePart = {
  x0: RECORD_GRAPH_NODE_WIDTH / 2 - 30, y0: -2, x1: RECORD_GRAPH_NODE_WIDTH / 2 + 30, y1: 58,
};

function boxOf(positions: ReadonlyMap<string, { x: number; y: number }>, keys: Iterable<string>, part: NodePart = WHOLE_NODE): Box | null {
  let box: Box | null = null;
  for (const key of keys) {
    const p = positions.get(key);
    if (!p) continue;
    const x0 = p.x + part.x0, y0 = p.y + part.y0, x1 = p.x + part.x1, y1 = p.y + part.y1;
    box = box
      ? { x0: Math.min(box.x0, x0), y0: Math.min(box.y0, y0), x1: Math.max(box.x1, x1), y1: Math.max(box.y1, y1) }
      : { x0, y0, x1, y1 };
  }
  return box;
}

/**
 * The viewport that fits a laid-out record graph into a `width` × `height`
 * canvas without going below `minZoom` (default `RECORD_GRAPH_MIN_FIT_ZOOM`)
 * or above `maxZoom` (default `RECORD_GRAPH_MAX_FIT_ZOOM`). Pure, so a host or
 * test can check what a fit shows. Null when nothing is positioned or the
 * canvas is unmeasured. Since 2.403.4; `inset` and the circles-first focus
 * fallback since 2.403.5; `mode: 'auto'` (fit everything when it is readable,
 * else focus) since 2.403.7; the selection-never-clipped focus zoom (down to
 * `focusMinZoom`) and `auto`'s neighbourhood rung since 2.403.8; `all`
 * centres a drawing that fits at or above `minZoom` and never applies the
 * focus to it, since 2.403.9.
 */
export function recordGraphViewport(
  positions: ReadonlyMap<string, { x: number; y: number }>,
  size: { width: number; height: number },
  options: RecordGraphViewportOptions,
): RecordGraphViewport | null {
  const {
    minZoom = RECORD_GRAPH_MIN_FIT_ZOOM, maxZoom = RECORD_GRAPH_MAX_FIT_ZOOM, inset = {},
    readableZoom = RECORD_GRAPH_READABLE_ZOOM, neighbourhoodZoom = RECORD_GRAPH_NEIGHBOURHOOD_ZOOM,
    focusMinZoom = RECORD_GRAPH_FOCUS_MIN_ZOOM,
  } = options;
  const padding = Math.max(FOCUS_EDGE_MARGIN, options.padding ?? 24);
  const all = boxOf(positions, positions.keys());
  if (!all || size.width <= 0 || size.height <= 0) return null;
  // The clear area: padding from each edge, or an overlay's inset plus a gap.
  const edge = (v: number | undefined) => (v && v > 0 ? Math.max(padding, v + OVERLAY_GAP) : padding);
  const clear = {
    x0: edge(inset.left), x1: size.width - edge(inset.right),
    y0: edge(inset.top), y1: size.height - edge(inset.bottom),
  };
  const availW = Math.max(1, clear.x1 - clear.x0);
  const availH = Math.max(1, clear.y1 - clear.y0);
  const rawZoom = (box: Box) => Math.min(availW / (box.x1 - box.x0), availH / (box.y1 - box.y0));
  const centreAll = (zoom: number): RecordGraphViewport => ({
    x: (clear.x0 + clear.x1) / 2 - ((all.x0 + all.x1) / 2) * zoom,
    y: (clear.y0 + clear.y1) / 2 - ((all.y0 + all.y1) / 2) * zoom,
    zoom,
  });
  // Automatic: everything, when everything is readable (2.403.7) — within
  // `RECORD_GRAPH_READABLE_TOLERANCE` of it (2.407.4).
  const readable = readableZoom - RECORD_GRAPH_READABLE_TOLERANCE;
  if (options.mode === 'auto' && rawZoom(all) >= readable - 1e-9) return centreAll(Math.min(rawZoom(all), maxZoom));
  // Automatic with no focus drawn: nothing to centre on, so the whole-graph
  // fit, down to `fitAllMinZoom` (2.406.3 — the OrgGraph no-focus Radial rule
  // of 2.405.1). With a focus the ladder below is unchanged.
  if (options.mode === 'auto' && !boxOf(positions, options.focusKeys ?? [])) {
    const fitAllMinZoom = Math.min(minZoom, options.fitAllMinZoom ?? RECORD_GRAPH_FIT_ALL_MIN_ZOOM);
    return recordGraphViewport(positions, size, { ...options, mode: 'all', minZoom: fitAllMinZoom });
  }
  // A short canvas with nothing selected (2.406.4): the whole-graph fit may go
  // below its 0.25 floor, as far as 0.1, so every record is shown.
  if (
    options.mode === 'all' && rawZoom(all) < minZoom && minZoom <= RECORD_GRAPH_FIT_ALL_MIN_ZOOM
    && size.height - 2 * padding < RECORD_GRAPH_SHORT_FIT_CLEAR_HEIGHT && !boxOf(positions, options.focusKeys ?? [])
  ) {
    return centreAll(Math.max(RECORD_GRAPH_FIT_ALL_SHORT_MIN_ZOOM, Math.min(rawZoom(all), maxZoom)));
  }
  // The whole graph, when it fits the clear area at or above the floor: centred
  // there, the focus never steering it (2.403.9 — the focus offset was applied
  // on the 209px canvas although the drawing fitted, clipping three records).
  if (options.mode === 'all' && rawZoom(all) >= minZoom) return centreAll(Math.min(rawZoom(all), maxZoom));
  // In `all` the focus only steers an axis that overflows at the floor (2.403.8).
  const focus = boxOf(positions, options.focusKeys ?? []);
  const circles = focus ? boxOf(positions, options.focusKeys ?? [], NODE_CIRCLE) : null;
  // The focus's boxes with their selection rings (which rise 2px above the box).
  const whole = focus && circles ? {
    x0: Math.min(focus.x0, circles.x0), y0: Math.min(focus.y0, circles.y0),
    x1: Math.max(focus.x1, circles.x1), y1: Math.max(focus.y1, circles.y1),
  } : null;
  const near = focus ? boxOf(positions, options.fitKeys?.length ? options.fitKeys : options.focusKeys ?? []) : null;
  // Per axis: centre the first candidate that fits. When none does, a focus
  // keeps its circles in view (in the clear area, else within 16px of the
  // canvas edge), as close to centring its boxes as that allows; otherwise
  // the last candidate is start-aligned.
  const place = (zoom: number, candidates: Box[]): RecordGraphViewport => {
    const axis = (lo: 'x0' | 'y0', hi: 'x1' | 'y1', start: number, end: number, canvas: number) => {
      for (const box of candidates) {
        const span = (box[hi] - box[lo]) * zoom;
        if (span <= end - start + 0.5) return (start + end) / 2 - ((box[lo] + box[hi]) / 2) * zoom;
      }
      if (focus && circles && whole) {
        // As centred on the focus as the first of these allows: its whole
        // boxes in the clear area, clear of the legend and controls (2.403.9),
        // then 16px inside the canvas (over an overlay's corner if need be),
        // then its circles in the clear area, then its circles 16px inside.
        const centred = (start + end) / 2 - ((focus[lo] + focus[hi]) / 2) * zoom;
        const inner: [number, number] = [FOCUS_EDGE_MARGIN, canvas - FOCUS_EDGE_MARGIN];
        const tries: Array<[Box, number, number]> = [
          [whole, start, end], [whole, ...inner], [circles, start, end], [circles, ...inner],
        ];
        for (const [box, s, e] of tries) {
          const min = s - box[lo] * zoom, max = e - box[hi] * zoom;
          if (min <= max + 0.5) return clamp(centred, min, Math.max(min, max));
        }
        return FOCUS_EDGE_MARGIN - circles[lo] * zoom;
      }
      return start - candidates[candidates.length - 1]![lo] * zoom;
    };
    return {
      x: axis('x0', 'x1', clear.x0, clear.x1, size.width),
      y: axis('y0', 'y1', clear.y0, clear.y1, size.height),
      zoom,
    };
  };
  if (options.mode !== 'all' && focus && whole && near) {
    const nearZoom = rawZoom(near);
    // `focus`: the neighbourhood at or above the floor; `auto` rung (b): at or above 0.6.
    const nearFloor = options.mode === 'auto' ? Math.min(neighbourhoodZoom, minZoom) : minZoom;
    // 2.407.2: with a focus, a whole-graph frame is taken only at or above
    // `readableZoom`, in every layout. A neighbourhood that spans the whole
    // drawing (the selection linked to nearly everything — Radial's compact
    // short-canvas rings on the 1160 × 374 canvas) framed below it IS a
    // fit-all below the readable zoom (0.65, names 8.4px), so rung (b) is
    // skipped for it and the selection-centred rung (c) frames instead.
    const nearIsAll = options.mode === 'auto' && nearZoom < readable && rawZoom(all) >= nearZoom - 1e-9;
    // Rung (c)'s zoom, computed first (2.407.23): a neighbourhood framed
    // between 0.6 and the readable zoom is taken only when the selection
    // itself cannot be framed readably. On the 1160 × 335 connections canvas
    // (an answer strip plus a call row open) rung (b) fitted the
    // neighbourhood at 0.62 — names 8.1px — while the three selected records
    // fitted whole at 0.8; the protocol's readability rule calls that a
    // defect because a readable fit satisfying every other rule existed.
    const selectionZoom = Math.min(availW / (whole.x1 - whole.x0), availH / (whole.y1 - whole.y0));
    const rungC = Math.min(minZoom, Math.max(focusMinZoom, selectionZoom));
    const nearUnreadableButSelectionReadable = options.mode === 'auto' && nearZoom < readable && rungC >= readable - 1e-9;
    if (nearZoom >= nearFloor && !nearIsAll && !nearUnreadableButSelectionReadable) return clearFocusView(place(Math.min(nearZoom, maxZoom), [near]));
    // Rung (c) (2.403.8): zoom out below the floor, as far as `focusMinZoom`,
    // until the focus's full boxes fit the clear area — clear of the legend
    // and controls since 2.403.9 (was the canvas less 16px, which let a
    // selected name sit under the legend on the 209px canvas); then centre on
    // the whole graph if it fits on an axis, else the neighbourhood, else the
    // focus itself, else the focus's circles.
    return clearFocusView(place(rungC, [all, near, focus]));
  }
  const fitted = place(clamp(rawZoom(all), minZoom, maxZoom), focus ? [all, focus] : [all]);
  return focus ? clearFocusView(fitted) : fitted;

  /**
   * 2.407.4: a selection-centred view on a canvas with room to spare (clear
   * height ≥ `RECORD_GRAPH_SHORT_FIT_CLEAR_HEIGHT`) is shifted so no record
   * sits under the legend or the controls — nearest pans first, up to the
   * overlay's size plus one node, along each axis where the drawing runs
   * past the clear area — while the selected boxes stay whole in the canvas.
   * A short canvas keeps the 2.403.8 rule (overlaps there are allowed).
   */
  function clearFocusView(view: RecordGraphViewport): RecordGraphViewport {
    if (!whole || size.height - 2 * padding < RECORD_GRAPH_SHORT_FIT_CLEAR_HEIGHT) return view;
    const rects = recordGraphOverlayRects(size, options.overlays);
    if (!rects.length) return view;
    const boxes: FitBounds[] = [];
    for (const p of positions.values()) {
      boxes.push({ minX: p.x, minY: p.y, maxX: p.x + RECORD_GRAPH_NODE_WIDTH, maxY: p.y + RECORD_GRAPH_NODE_HEIGHT });
    }
    const keep: FitBounds[] = [{ minX: whole.x0, minY: whole.y0, maxX: whole.x1, maxY: whole.y1 }];
    const z = view.zoom;
    const axes = {
      x: all!.x0 * z + view.x < clear.x0 - 0.5 || all!.x1 * z + view.x > clear.x1 + 0.5,
      y: all!.y0 * z + view.y < clear.y0 - 0.5 || all!.y1 * z + view.y > clear.y1 + 0.5,
    };
    const t = clearOfOverlays({ x: view.x, y: view.y, scale: z }, boxes, rects, size, { axes, keep });
    return { x: t.x, y: t.y, zoom: z };
  }
}

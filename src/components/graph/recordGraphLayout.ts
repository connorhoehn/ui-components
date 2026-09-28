// The typed record graph's pure half: the record/edge shapes, filtering by
// type (dropping edges whose other end is hidden), and positions for the
// force / radial / hierarchy layouts. Ported from the aws-agentcore portal's
// `pages/search/searchGraph.ts` (2.400.0). No React, no DOM — the force
// layout runs a stopped d3-force simulation for a fixed number of ticks from
// deterministic starting points, so the same input always lands the same way.

import { forceCenter, forceCollide, forceLink, forceManyBody, forceSimulation, forceX, forceY } from 'd3-force';
import { reserveCorner, type FitInset } from './org/fitTransform';

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
 * column. A column taller than the canvas at the fit floor wraps into
 * side-by-side sub-columns, and each column is centred on y = 0.
 */
function hierarchyPositions(
  records: Pick<RecordGraphRecord, 'id' | 'type'>[],
  ordered: string[],
  edges: Pick<RecordGraphEdge, 'source' | 'target'>[],
  height: number,
): Map<string, { x: number; y: number }> {
  let rank = longestPathRanks(ordered, edges);
  if (Math.max(...rank.values()) === 0) {
    const typeOf = new Map(records.map(record => [recordGraphKey(record), record.type]));
    const used = [...new Set(ordered.map(id => TYPE_RANK[typeOf.get(id)!]))].sort((a, b) => a - b);
    rank = new Map(ordered.map(id => [id, used.indexOf(TYPE_RANK[typeOf.get(id)!])]));
  }
  const maxRows = clamp(Math.floor((height / RECORD_GRAPH_MIN_FIT_ZOOM) / HIERARCHY_ROW), 3, 12);
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
  const positions = new Map<string, { x: number; y: number }>();
  let x = 0;
  [...columns.keys()].sort((a, b) => a - b).forEach(r => {
    const ids = columns.get(r)!;
    const bary = (id: string) => {
      const placed = (preds.get(id) ?? []).filter(p => index.has(p));
      return placed.length ? placed.reduce((sum, p) => sum + index.get(p)!, 0) / placed.length : Infinity;
    };
    const sorted = r === 0 ? ids : [...ids].sort((a, b) => bary(a) - bary(b));
    sorted.forEach((id, i) => index.set(id, i));
    const subColumns = Math.ceil(sorted.length / maxRows);
    const rows = Math.ceil(sorted.length / subColumns);
    sorted.forEach((id, i) => {
      const sub = Math.floor(i / rows);
      const row = i % rows;
      const inThis = Math.min(rows, sorted.length - sub * rows);
      positions.set(id, { x: x + sub * HIERARCHY_COLUMN, y: (row - (inThis - 1) / 2) * HIERARCHY_ROW });
    });
    x += subColumns * HIERARCHY_COLUMN + HIERARCHY_RANK_GAP;
  });
  return positions;
}

/**
 * Rendering positions only: never infer an edge from a shared title or type.
 * `options` is the canvas the layout should fill (default 1160 × 420): the
 * force distances, the radial rings' shape and the hierarchy's column height
 * are all sized to it at the fit floor, so the drawing reads without zooming
 * below `RECORD_GRAPH_MIN_FIT_ZOOM`.
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
    // Elliptical rings shaped to the canvas: a wide canvas gets wide rings.
    // Each ring holds as many records as its perimeter has room for.
    const aspect = clamp(width / height, 1, 2.4);
    const ry = RECORD_GRAPH_NODE_HEIGHT + 24;
    const rx = Math.max(RECORD_GRAPH_NODE_WIDTH + 30, ry * aspect);
    positions.set(ordered[0]!, { x: 0, y: 0 });
    let offset = 1;
    for (let ring = 1; offset < ordered.length; ring++) {
      const a = rx * ring, b = ry * ring;
      // Ramanujan's perimeter of an ellipse.
      const perimeter = Math.PI * (3 * (a + b) - Math.sqrt((3 * a + b) * (a + 3 * b)));
      const count = Math.min(Math.max(1, Math.floor(perimeter / (RECORD_GRAPH_NODE_WIDTH + 30))), ordered.length - offset);
      // Equal arc lengths, not equal angles — equal angles bunch records up
      // along an ellipse's flat top and bottom.
      const STEPS = 720;
      const arc: number[] = [0];
      const at = (i: number) => {
        const t = i * 2 * Math.PI / STEPS - Math.PI / 2;
        return { x: Math.cos(t) * a, y: Math.sin(t) * b };
      };
      for (let i = 1; i <= STEPS; i++) {
        const p = at(i - 1), q = at(i);
        arc.push(arc[i - 1]! + Math.hypot(q.x - p.x, q.y - p.y));
      }
      const total = arc[STEPS]!;
      let step = 0;
      for (let index = 0; index < count; index++) {
        const target = ((index + (ring % 2 ? 0 : 0.5)) / count) * total;
        while (step < STEPS && arc[step + 1]! < target) step++;
        positions.set(ordered[offset++]!, at(step));
      }
    }
    return positions;
  }
  if (layout === 'hierarchy') return hierarchyPositions(records, ordered, validEdges, height);
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
  nodes.forEach(node => positions.set(node.id, { x: node.x, y: node.y * squash }));
  return positions;
}

/** A pan/zoom viewport in xyflow's terms: screen = flow × zoom + (x, y). */
export interface RecordGraphViewport {
  x: number;
  y: number;
  zoom: number;
}

/**
 * Floor of the whole-graph fit the viewer asks for — the second "Fit to view"
 * press and `RecordGraphHandle.fitAll()` — which, like the org graph's
 * `fitAll`, trades the readability floor for seeing everything at once. The
 * automatic fit keeps `RECORD_GRAPH_MIN_FIT_ZOOM`. Since 2.403.5.
 */
export const RECORD_GRAPH_FIT_ALL_MIN_ZOOM = 0.5;

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
 */
export function recordGraphInset(
  size: { width: number; height: number },
  overlays: { legend?: { width: number; height: number } | null; controls?: { width: number; height: number } | null },
): Required<FitInset> {
  let inset: Required<FitInset> = { left: 0, right: 0, top: 0, bottom: 0 };
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
   * or above the floor; at the floor it centres on the largest of the whole
   * graph, the neighbourhood and the focus itself that fits, per axis, so the
   * focus is never clipped while it fits. When the focus's boxes do not fit
   * the clear area they are kept 16px inside the canvas, and when they do not
   * fit that either, its avatar circles are kept in view (2.403.5). `all` frames the
   * whole graph, and where it overflows at the floor aligns it top-left so
   * the viewer pans.
   */
  mode: 'focus' | 'all';
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
  minZoom?: number;
  maxZoom?: number;
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
 * fallback since 2.403.5.
 */
export function recordGraphViewport(
  positions: ReadonlyMap<string, { x: number; y: number }>,
  size: { width: number; height: number },
  options: RecordGraphViewportOptions,
): RecordGraphViewport | null {
  const { minZoom = RECORD_GRAPH_MIN_FIT_ZOOM, maxZoom = RECORD_GRAPH_MAX_FIT_ZOOM, inset = {} } = options;
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
  const focus = options.mode === 'focus' ? boxOf(positions, options.focusKeys ?? []) : null;
  const circles = focus ? boxOf(positions, options.focusKeys ?? [], NODE_CIRCLE) : null;
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
      if (focus && circles) {
        // As centred on the focus as the first of these allows: its whole
        // boxes 16px inside the canvas (over an overlay's corner if need be),
        // then its circles in the clear area, then its circles 16px inside.
        const centred = (start + end) / 2 - ((focus[lo] + focus[hi]) / 2) * zoom;
        const inner: [number, number] = [FOCUS_EDGE_MARGIN, canvas - FOCUS_EDGE_MARGIN];
        const tries: Array<[Box, number, number]> = [[focus, ...inner], [circles, start, end], [circles, ...inner]];
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
  if (focus && near) {
    const nearZoom = rawZoom(near);
    if (nearZoom >= minZoom) return place(Math.min(nearZoom, maxZoom), [near]);
    // At the floor: the whole graph if it fits on an axis, else the
    // neighbourhood, else the focus itself, else the focus's circles.
    return place(minZoom, [all, near, focus]);
  }
  return place(clamp(rawZoom(all), minZoom, maxZoom), [all]);
}

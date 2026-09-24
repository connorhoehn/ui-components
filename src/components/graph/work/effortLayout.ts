import type { WorkActivityEffort, WorkGraphEdgeData, WorkGraphNodeData } from './types';

/**
 * Floor for a USER zoom-out — wheel, pinch, keyboard, the −/+ buttons. Below
 * this the cards stop being readable, so there is no point letting someone
 * wander down there by hand.
 */
export const WORK_CANVAS_MIN_ZOOM = 0.4;

/**
 * Floor for FITTING. Deliberately far below the interactive floor, because a
 * fit clamped to 0.4 is not a fit: at nine parallel efforts — today's real
 * seeded scenario — the graph does not go in the viewport at 0.4, so the top
 * row of cards sat permanently off-screen, "Fit graph" appeared to do nothing,
 * and the only way to see the rest was to discover panning.
 *
 * Fitting and zooming are different intents. "Show me all of it" must be
 * allowed to answer honestly, even when the honest answer is small.
 */
export const WORK_CANVAS_FIT_MIN_ZOOM = 0.1;

/**
 * Below this, a fitted graph is a map rather than something you can read — so
 * the canvas points at the accessible list instead of leaving the reader to
 * squint.
 */
export const WORK_CANVAS_READABLE_ZOOM = WORK_CANVAS_MIN_ZOOM;

/**
 * The zoom a CAPPED canvas opens at when the whole graph would fit only
 * smaller (realtime-examples Loop 26). Two efforts of a real day are taller
 * than a 1640×960 page's canvas is high, so fitting all of it opened at ~0.4 —
 * cards drawn in 5 px type. A capped canvas exists to be read, so it opens at
 * this zoom (or the width's fit, if smaller) anchored at the top — the newest
 * work — and pans down; "Fit graph" still shows the whole graph. A canvas
 * asked for every effort (`WORK_ACTIVITY_ALL_EFFORTS`) is a map and opens whole.
 */
export const WORK_CANVAS_OPEN_ZOOM = 0.8;

/**
 * How many parallel efforts the activity canvas draws at once by default.
 *
 * Two, because the canvas fits everything it is given into one pane: a real
 * nine-effort day fits at roughly 0.12 zoom, which is a map of the work rather
 * than something anyone can read. Two lanes stay legible, and the rest are one
 * menu choice away.
 */
export const WORK_ACTIVITY_DEFAULT_MAX_EFFORTS = 2;

/**
 * The "no cap" value for `maxEfforts` — draw every effort, however small that
 * makes them.
 *
 * ZERO is the sentinel, and it is the ONLY one: `undefined` means "the caller
 * did not choose", which takes the default of two, and a non-finite value
 * (`Infinity`) is accepted as a synonym for this because it means the same
 * thing and a host computing a cap arithmetically can land on it honestly.
 * "Show none of the work" is not a state this component has, so zero was free.
 */
export const WORK_ACTIVITY_ALL_EFFORTS = 0;

export interface WorkNodeBounds { width: number; height: number }
export interface WorkEffortLayout {
  id: string;
  title: string;
  subtitle?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  collapsedSourceCount: number;
  sourceCount: number;
  vertical: boolean;
  cyclicNodeIds: string[];
  nodes: Array<{ id: string; entityId: string; x: number; y: number; width: number; height: number }>;
  edges: Array<{ id: string; entityId: string; source: string; target: string; sourceHandle: string; targetHandle: string; labelX: number; labelY: number }>;
}

export interface EffortLayoutOptions {
  width: number;
  height?: number;
  full?: boolean;
  focusedEffortId?: string | null;
  expandedSourceEfforts?: readonly string[];
  reversedEdgeIds?: readonly string[];
  /** Measured complete node bounds, keyed by canonical entity. */
  measurements?: ReadonlyMap<string, WorkNodeBounds>;
  /** Canonical edges that will draw a pill, so their lane is reserved. */
  labelledEdgeIds?: readonly string[];
  /** Internal second-pass compaction; expanded sources always take precedence. */
  foldedForHeight?: readonly string[];
}

const instanceId = (effort: string, kind: 'node' | 'edge', id: string) => JSON.stringify([effort, kind, id]);

/** Epoch millis, or 0 when the host sent nothing parseable. Never NaN. */
function at(value: string | undefined): number {
  if (!value) return 0;
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? 0 : parsed;
}

export interface LimitEffortsOptions {
  /**
   * How many efforts may be drawn. Defaults to
   * `WORK_ACTIVITY_DEFAULT_MAX_EFFORTS` (2). `WORK_ACTIVITY_ALL_EFFORTS` (0),
   * a negative number, or a non-finite one means no cap at all.
   */
  max?: number;
  /**
   * An effort that must survive the cap whatever its age — the one the current
   * focus or selection is inside. Hiding the work someone is looking at is the
   * one thing a display filter must never do, so this effort takes the place of
   * the oldest effort that would otherwise have been shown.
   */
  keepEffortId?: string | null;
  /**
   * Keep the newest effort that holds something the person MADE (a document —
   * a deck, a page) in view even when newer run-only efforts outnumber the cap.
   * A deck saved a minute ago sat behind two probe runs and was a click away
   * rather than drawn (realtime-examples NFR #221 follow-up). Default true;
   * the selection's `keepEffortId` still wins over it.
   */
  keepLatestMade?: boolean;
}

/** Kinds that are a thing the person made, as opposed to a run that did work. */
const MADE_KINDS = new Set<WorkGraphNodeData['kind']>(['document']);

/**
 * The newest `max` efforts, in the order the host gave them — except that,
 * unless `keepLatestMade` is false, the newest effort holding a document takes
 * the last place when none of the newest does.
 *
 * Recency is the latest `updatedAt`/`startedAt` across an effort's own nodes,
 * which is the same "newest work first" rule the panel footer already claims;
 * hosts that already sort newest-first therefore get exactly their own first N.
 * The RESULT keeps source order rather than recency order, because the canvas
 * treats effort order as stable — a heartbeat must not make two lanes swap
 * places.
 */
export function limitWorkEfforts(
  efforts: readonly WorkActivityEffort[],
  nodes: readonly WorkGraphNodeData[],
  options: LimitEffortsOptions = {},
): WorkActivityEffort[] {
  const max = options.max ?? WORK_ACTIVITY_DEFAULT_MAX_EFFORTS;
  if (!Number.isFinite(max) || max <= 0 || efforts.length <= max) return [...efforts];
  const updated = new Map(nodes.map((node) => [node.id, Math.max(at(node.updatedAt), at(node.startedAt))]));
  const ranked = efforts
    .map((effort, index) => ({ index, recency: Math.max(0, ...effort.nodeIds.map((id) => updated.get(id) ?? 0)) }))
    .sort((left, right) => right.recency - left.recency || left.index - right.index);
  const shown = ranked.slice(0, max);
  const kinds = new Map(nodes.map((node) => [node.id, node.kind]));
  const holdsMade = (index: number) => efforts[index].nodeIds.some((id) => MADE_KINDS.has(kinds.get(id) as WorkGraphNodeData['kind']));
  if (options.keepLatestMade !== false && !shown.some((entry) => holdsMade(entry.index))) {
    // Ranked newest first, so the first match is the newest made work.
    const made = ranked.find((entry) => holdsMade(entry.index));
    if (made) shown[shown.length - 1] = made;
  }
  const keep = new Set(shown.map((entry) => entry.index));
  const required = options.keepEffortId ? efforts.findIndex((effort) => effort.id === options.keepEffortId) : -1;
  if (required >= 0 && !keep.has(required)) {
    // The selection displaces the oldest shown effort that is not the made
    // work kept above, unless that is all there is.
    const displaced = [...shown].reverse().find((entry) => !holdsMade(entry.index) || max === 1) ?? shown[shown.length - 1];
    keep.delete(displaced.index);
    keep.add(required);
  }
  return efforts.filter((_, index) => keep.has(index));
}

/** No inferred edges or connected-component grouping: membership is explicit. */
export function layoutWorkEfforts(
  nodes: readonly WorkGraphNodeData[],
  edges: readonly WorkGraphEdgeData[],
  efforts: readonly WorkActivityEffort[],
  options: EffortLayoutOptions,
): WorkEffortLayout[] {
  const entities = new Map(nodes.map((node) => [node.id, node]));
  const relationships = new Map(edges.map((edge) => [edge.id, edge]));
  const expanded = new Set(options.expandedSourceEfforts);
  const reversed = new Set(options.reversedEdgeIds);
  const padding = options.full ? 28 : 20;
  const gap = options.full ? 64 : 36;
  const availableWidth = Math.max(240, options.width - 32);
  const crowded = efforts.length >= 3 && !options.focusedEffortId;
  const selected = options.focusedEffortId ? efforts.filter((effort) => effort.id === options.focusedEffortId) : efforts;
  const layouts: WorkEffortLayout[] = [];
  for (const effort of selected) {
    const members = [...new Set(effort.nodeIds)].filter((id) => entities.has(id));
    const memberSet = new Set(members);
    const sources = new Set(effort.contextNodeIds?.filter((id) => memberSet.has(id)));
    const collapse = (crowded || options.foldedForHeight?.includes(effort.id)) && !expanded.has(effort.id);
    // An all-context effort must not vanish when the overview becomes crowded.
    const shown = collapse && sources.size < members.length ? members.filter((id) => !sources.has(id)) : members;
    if (!shown.length) continue;
    const shownSet = new Set(shown);
    const connections = [...new Set(effort.edgeIds)].flatMap((id) => {
      const edge = relationships.get(id);
      if (!edge || !shownSet.has(edge.fromId) || !shownSet.has(edge.toId) || edge.fromId === edge.toId) return [];
      return [{ id, from: reversed.has(id) ? edge.toId : edge.fromId, to: reversed.has(id) ? edge.fromId : edge.toId }];
    });
    const incoming = new Map(shown.map((id) => [id, 0]));
    const outgoing = new Map(shown.map((id) => [id, [] as string[]]));
    for (const edge of connections) {
      incoming.set(edge.to, incoming.get(edge.to)! + 1);
      outgoing.get(edge.from)!.push(edge.to);
    }
    const queue = shown.filter((id) => incoming.get(id) === 0).sort();
    const levels = new Map(queue.map((id) => [id, 0]));
    for (let index = 0; index < queue.length; index++) {
      const id = queue[index];
      for (const next of outgoing.get(id)!.sort()) {
        levels.set(next, Math.max(levels.get(next) ?? 0, levels.get(id)! + 1));
        incoming.set(next, incoming.get(next)! - 1);
        if (!incoming.get(next)) queue.push(next);
      }
    }
    const cyclicNodeIds = shown.filter((id) => !queue.includes(id));
    for (const id of cyclicNodeIds) levels.set(id, 0);
    const grouped = new Map<number, string[]>();
    for (const id of shown) {
      const level = levels.get(id)!;
      grouped.set(level, [...(grouped.get(level) ?? []), id]);
    }
    const size = (id: string) => options.measurements?.get(id) ?? { width: 200, height: 112 };
    // The prototype's grid, and the shape of the work itself: every step of the
    // chain is a ROW, the context it was given sits in the LEFT column beside
    // the step that used it, and the step itself sits in the RIGHT column. An
    // effort with no declared context is one column of rows.
    const contextIds = shown.filter((id) => sources.has(id));
    const chainIds = shown.filter((id) => !sources.has(id));
    const chain = (chainIds.length ? chainIds : shown).slice().sort((a, b) => (levels.get(a)! - levels.get(b)!) || (a < b ? -1 : 1));
    const aside = chainIds.length ? contextIds : [];
    const rowOf = new Map(chain.map((id, index) => [id, index]));
    const successorRow = (id: string) => {
      const rows = connections.filter((edge) => edge.from === id).map((edge) => rowOf.get(edge.to)).filter((row): row is number => row !== undefined);
      return rows.length ? Math.min(...rows) : undefined;
    };
    // One context card per row, so a row never becomes a stack of its own.
    const takenRows = new Set<number>();
    const asidePlacement = new Map<string, number>();
    let extraRow = chain.length;
    for (const id of aside.slice().sort((a, b) => (levels.get(a)! - levels.get(b)!) || (a < b ? -1 : 1))) {
      const wanted = successorRow(id);
      let row = wanted;
      if (row === undefined || takenRows.has(row)) {
        const candidates = wanted === undefined ? [] : [...Array(chain.length).keys()].filter((index) => !takenRows.has(index));
        row = candidates.length ? candidates.reduce((best, index) => Math.abs(index - wanted!) < Math.abs(best - wanted!) ? index : best) : extraRow++;
      }
      takenRows.add(row);
      asidePlacement.set(id, row);
    }
    const rowCount = Math.max(chain.length, ...[...asidePlacement.values()].map((row) => row + 1), 1);
    const columnGap = options.labelledEdgeIds?.some((id) => connections.some((edge) => edge.id === id && asidePlacement.has(edge.from))) ? 132 : 56;
    const asideWidth = aside.length ? Math.max(...aside.map((id) => size(id).width)) : 0;
    const chainX = padding + (asideWidth ? asideWidth + columnGap : 0);
    const rowsOf = (row: number) => [...chain.filter((id) => rowOf.get(id) === row), ...[...asidePlacement].filter(([, value]) => value === row).map(([id]) => id)];
    const rowHeights = [...Array(rowCount).keys()].map((row) => Math.max(0, ...rowsOf(row).map((id) => size(id).height)));
    // The lane above a row carries that row's relationship labels, one slot
    // each, so two edges into the same card never print on top of each other.
    const rowLane = [...Array(rowCount).keys()].map((row) => 32 + Math.max(1, ...rowsOf(row).map((id) => connections.filter((edge) => edge.to === id).length)) * 24);
    const stacked = rowHeights.reduce((total, height, index) => total + height + (index ? rowLane[index] : 0), 56 + padding);
    // A chain with no context beside it is one column, and a long one runs off
    // the bottom of any pane. Wrap it into a SECOND column — never a third,
    // which turns a chain into a staircase nobody can follow.
    const wrapRow = aside.length === 0 && options.height && stacked > options.height && rowCount > 2
      ? rowHeights.reduce<{ row: number; run: number }>((best, height, index) => {
        const run = best.run + height + (index ? rowLane[index] : 0);
        return run < stacked / 2 ? { row: index + 1, run } : best;
      }, { row: 0, run: 56 }).row || Math.ceil(rowCount / 2)
      : rowCount;
    const band = (row: number) => (row < wrapRow ? 0 : 1);
    const rowY = rowHeights.reduce<number[]>((tops, _height, index) => [
      ...tops,
      index === 0 || band(index) !== band(index - 1) ? 56 : tops[index - 1] + rowHeights[index - 1] + rowLane[index],
    ], []);
    const bandWidth = Math.max(0, ...chain.map((id) => size(id).width));
    const rowX = (row: number) => chainX + band(row) * (bandWidth + Math.max(96, columnGap));
    const placed: WorkEffortLayout['nodes'] = [];
    for (const id of chain) placed.push({ id: instanceId(effort.id, 'node', id), entityId: id, x: rowX(rowOf.get(id)!), y: rowY[rowOf.get(id)!], ...size(id) });
    for (const [id, row] of asidePlacement) placed.push({ id: instanceId(effort.id, 'node', id), entityId: id, x: padding, y: rowY[row], ...size(id) });
    const vertical = aside.length === 0;
    const byId = new Map(placed.map((node) => [node.entityId, node]));
    const labelSlots = new Map<string, number>();
    layouts.push({
      id: effort.id, title: effort.title, subtitle: effort.subtitle, x: 0, y: 0,
      width: Math.max(...placed.map((node) => node.x + node.width)) + padding,
      height: Math.max(...placed.map((node) => node.y + node.height)) + padding,
      collapsedSourceCount: members.length - shown.length, sourceCount: sources.size,
      vertical, cyclicNodeIds, nodes: placed,
      edges: connections.map((edge) => {
        const slot = labelSlots.get(edge.to) ?? 0;
        labelSlots.set(edge.to, slot + 1);
        const from = byId.get(edge.from)!;
        const target = byId.get(edge.to)!;
        // Orthogonal and hugging the grid: across the columns when the context
        // feeds the step beside it, straight down when the chain continues.
        const across = from.x !== target.x;
        const sourceHandle = across ? 'out-right' : 'out-bottom';
        // Anything that continues sideways enters from the side. Entering from
        // the top after crossing a column draws a loop back over the frame.
        const targetHandle = across ? 'in-left' : 'in-top';
        return {
          id: instanceId(effort.id, 'edge', edge.id), entityId: edge.id,
          source: instanceId(effort.id, 'node', edge.from), target: instanceId(effort.id, 'node', edge.to),
          sourceHandle, targetHandle,
          // Labels live in the lane between rows, never over a card.
          labelX: across ? (from.x + from.width + target.x) / 2 : target.x + target.width / 2 + 44,
          labelY: target.y - 26 - slot * 24,
        };
      }),
    });
  }
  // Parallel work reads as parallel: efforts sit side by side, newest first,
  // and the canvas scales down to hold them. Stacking is only worth it when it
  // buys a materially bigger view — wrapping trades width for height, so it
  // cannot rescue a row that is merely too tall.
  // Keep source order stable so heartbeat/status changes cannot reorder work.
  const pack = (wrap: boolean) => {
    const places: Array<{ x: number; y: number }> = [];
    let x = 16, y = 24, rowHeight = 0;
    for (const layout of layouts) {
      if (wrap && x > 16 && x + layout.width > availableWidth) {
        x = 16;
        y += rowHeight + gap;
        rowHeight = 0;
      }
      places.push({ x, y });
      x += layout.width + gap;
      rowHeight = Math.max(rowHeight, layout.height);
    }
    const width = Math.max(1, ...places.map((place, index) => place.x + layouts[index].width));
    const height = Math.max(1, ...places.map((place, index) => place.y + layouts[index].height));
    return { places, zoom: Math.min((options.width - 48) / width, ((options.height ?? height + 48) - 48) / height) };
  };
  const side = pack(false);
  const wrapped = pack(true);
  const chosen = layouts.length <= 1 || wrapped.zoom <= side.zoom * 1.25 ? side : wrapped;
  // Context stays open until keeping it open would make the whole view
  // unreadable. Crowding (three efforts or more) folds it up front; height
  // alone does not, because a fold the viewer did not ask for hides work.
  if (options.height && !options.focusedEffortId && chosen.zoom < WORK_CANVAS_MIN_ZOOM) {
    const foldable = layouts.filter((group) => group.sourceCount > 0 && group.sourceCount < group.nodes.length && group.collapsedSourceCount === 0 && !expanded.has(group.id) && !options.foldedForHeight?.includes(group.id));
    if (foldable.length) return layoutWorkEfforts(nodes, edges, efforts, { ...options, foldedForHeight: [...(options.foldedForHeight ?? []), ...foldable.map((group) => group.id)] });
  }
  for (const [index, layout] of layouts.entries()) {
    layout.x = chosen.places[index].x;
    layout.y = chosen.places[index].y;
  }
  return layouts;
}

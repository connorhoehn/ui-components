import type { WorkActivityEffort, WorkGraphEdgeData, WorkGraphNodeData } from './types';

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
    const rowY = rowHeights.reduce<number[]>((tops, _height, index) => [...tops, index === 0 ? 56 : tops[index - 1] + rowHeights[index - 1] + rowLane[index]], []);
    const placed: WorkEffortLayout['nodes'] = [];
    for (const id of chain) placed.push({ id: instanceId(effort.id, 'node', id), entityId: id, x: chainX, y: rowY[rowOf.get(id)!], ...size(id) });
    for (const [id, row] of asidePlacement) placed.push({ id: instanceId(effort.id, 'node', id), entityId: id, x: padding, y: rowY[row], ...size(id) });
    const vertical = aside.length === 0;
    const byId = new Map(placed.map((node) => [node.entityId, node]));
    const labelSlots = new Map<string, number>();
    const rowFor = (id: string) => rowOf.get(id) ?? asidePlacement.get(id) ?? 0;
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
        const targetHandle = across && rowFor(edge.from) === rowFor(edge.to) ? 'in-left' : 'in-top';
        return {
          id: instanceId(effort.id, 'edge', edge.id), entityId: edge.id,
          source: instanceId(effort.id, 'node', edge.from), target: instanceId(effort.id, 'node', edge.to),
          sourceHandle, targetHandle,
          // Labels live in the lane between rows, never over a card.
          labelX: across && targetHandle === 'in-left' ? (from.x + from.width + target.x) / 2 : target.x + target.width / 2 + 44,
          labelY: target.y - 26 - slot * 24,
        };
      }),
    });
  }
  if (options.height && !options.focusedEffortId) {
    const tooTall = layouts.filter((group) => group.height > options.height! && group.sourceCount > 0 && group.sourceCount < group.nodes.length && group.collapsedSourceCount === 0 && !expanded.has(group.id) && !options.foldedForHeight?.includes(group.id));
    if (tooTall.length) return layoutWorkEfforts(nodes, edges, efforts, { ...options, foldedForHeight: [...(options.foldedForHeight ?? []), ...tooTall.map((group) => group.id)] });
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
  for (const [index, layout] of layouts.entries()) {
    layout.x = chosen.places[index].x;
    layout.y = chosen.places[index].y;
  }
  return layouts;
}

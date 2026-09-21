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
  edges: Array<{ id: string; entityId: string; source: string; target: string; labelX: number; labelY: number }>;
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
  const crowded = (efforts.length >= 3 || (efforts.length >= 2 && availableWidth < 1200)) && !options.focusedEffortId;
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
    const columns = [...grouped.keys()].sort((a, b) => a - b);
    const naturalWidth = columns.reduce((total, level) => total + Math.max(...grouped.get(level)!.map((id) => size(id).width)), padding * 2)
      + Math.max(0, columns.length - 1) * 144;
    const vertical = naturalWidth > (selected.length === 2 ? (availableWidth - gap) / 2 : availableWidth);
    const placed: WorkEffortLayout['nodes'] = [];
    const incomingCount = (id: string) => connections.filter((edge) => edge.to === id).length;
    let reservedBottom = 0;
    let main = vertical ? 56 : padding;
    const laneAfter = (columnIndex: number) => {
      const nextColumn = grouped.get(columns[columnIndex + 1]) ?? [];
      return nextColumn.length ? Math.max(64, ...nextColumn.map((id) => incomingCount(id) * 40 + 16)) : 0;
    };
    // A vertical chain taller than the canvas wraps into a SECOND band of
    // columns rather than shrinking the whole graph past legible type. Two
    // bands, never more: a third turns a chain into a staircase nobody can
    // follow. Level order is preserved — bands read down, then right.
    const totalHeight = 56 + padding + columns.reduce((total, level, index) => total + Math.max(...grouped.get(level)!.map((id) => size(id).height)) + laneAfter(index), 0);
    const wrapAt = vertical && options.height && totalHeight > options.height ? totalHeight / 2 : Infinity;
    let bandStart = padding;
    let bandWidth = 0;
    let band = 0;
    for (const [columnIndex, level] of columns.entries()) {
      const members = grouped.get(level)!.sort();
      const levelHeight = Math.max(...members.map((id) => size(id).height));
      if (vertical && band === 0 && main > 56 && main + levelHeight + padding > wrapAt) {
        bandStart += bandWidth + 96;
        bandWidth = 0;
        main = 56;
        band = 1;
      }
      let cross = vertical ? bandStart : 56;
      let extent = 0;
      for (const id of members) {
        const bounds = size(id);
        placed.push({ id: instanceId(effort.id, 'node', id), entityId: id, x: vertical ? cross : main, y: vertical ? main : cross, ...bounds });
        const crossExtent = vertical ? bounds.width : Math.max(bounds.height, incomingCount(id) * 40);
        reservedBottom = Math.max(reservedBottom, vertical ? main + bounds.height : cross + crossExtent);
        cross += crossExtent + 28;
        extent = Math.max(extent, vertical ? bounds.height : bounds.width);
      }
      if (vertical) bandWidth = Math.max(bandWidth, cross - 28 - bandStart);
      main += extent + (vertical ? Math.max(64, laneAfter(columnIndex)) : 144);
    }
    const byId = new Map(placed.map((node) => [node.entityId, node]));
    const labelSlots = new Map<string, number>();
    layouts.push({
      id: effort.id, title: effort.title, subtitle: effort.subtitle, x: 0, y: 0,
      width: Math.max(...placed.map((node) => node.x + node.width)) + padding,
      height: reservedBottom + padding,
      collapsedSourceCount: members.length - shown.length, sourceCount: sources.size,
      vertical, cyclicNodeIds, nodes: placed,
      edges: connections.map((edge) => {
        const target = byId.get(edge.to)!;
        const slot = labelSlots.get(edge.to) ?? 0;
        labelSlots.set(edge.to, slot + 1);
        return { id: instanceId(effort.id, 'edge', edge.id), entityId: edge.id, source: instanceId(effort.id, 'node', edge.from), target: instanceId(effort.id, 'node', edge.to), labelX: vertical ? target.x + target.width / 2 : target.x - 72, labelY: vertical ? target.y - (incomingCount(edge.to) - slot) * 40 - 8 + 16 : target.y + slot * 40 + 16 };
      }),
    });
  }
  if (options.height && !options.focusedEffortId) {
    const tooTall = layouts.filter((group) => group.height > options.height! && group.sourceCount > 0 && group.sourceCount < group.nodes.length && group.collapsedSourceCount === 0 && !expanded.has(group.id) && !options.foldedForHeight?.includes(group.id));
    if (tooTall.length) return layoutWorkEfforts(nodes, edges, efforts, { ...options, foldedForHeight: [...(options.foldedForHeight ?? []), ...tooTall.map((group) => group.id)] });
  }
  // Greedy bounded packing of whole effort rectangles, never individual nodes.
  // Keep source order stable so heartbeat/status changes cannot reorder work.
  let x = 16, y = 24, rowHeight = 0;
  for (const layout of layouts) {
    if (x > 16 && x + layout.width > availableWidth) {
      x = 16;
      y += rowHeight + gap;
      rowHeight = 0;
    }
    layout.x = x;
    layout.y = y;
    x += layout.width + gap;
    rowHeight = Math.max(rowHeight, layout.height);
  }
  return layouts;
}

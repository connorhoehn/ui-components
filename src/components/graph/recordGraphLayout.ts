// The typed record graph's pure half: the record/edge shapes, filtering by
// type (dropping edges whose other end is hidden), and positions for the
// force / radial / hierarchy layouts. Ported from the aws-agentcore portal's
// `pages/search/searchGraph.ts` (2.400.0). No React, no DOM — the force
// layout runs a stopped d3-force simulation for a fixed number of ticks from
// deterministic starting points, so the same input always lands the same way.

import { forceCenter, forceCollide, forceLink, forceManyBody, forceSimulation, forceX, forceY } from 'd3-force';

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

export const RECORD_GRAPH_NODE_WIDTH = 180;
export const RECORD_GRAPH_NODE_HEIGHT = 116;

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

/** Rendering positions only: never infer an edge from a shared title or type. */
export function layoutRecordGraph(
  records: Pick<RecordGraphRecord, 'id' | 'type'>[],
  edges: Pick<RecordGraphEdge, 'source' | 'target'>[],
  layout: RecordGraphLayout,
): Map<string, { x: number; y: number }> {
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
    positions.set(ordered[0]!, { x: 0, y: 0 });
    let offset = 1;
    for (let ring = 1; offset < ordered.length; ring++) {
      const count = Math.min(ring * 7, ordered.length - offset);
      const radius = ring * 255;
      for (let index = 0; index < count; index++) {
        const angle = index * 2 * Math.PI / count - Math.PI / 2;
        positions.set(ordered[offset++]!, { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius });
      }
    }
    return positions;
  }
  if (layout === 'hierarchy') {
    // Breadth-first ranks terminate for cyclic components; disconnected records
    // remain visible in their own rows. Rank conveys direction, not approval.
    const incoming = new Set(validEdges.map(edge => edge.target));
    const ranks = new Map<string, number>();
    const roots = ids.filter(id => !incoming.has(id));
    const seed = (root: string) => {
      if (ranks.has(root)) return;
      ranks.set(root, 0);
      const queue = [root];
      for (let cursor = 0; cursor < queue.length; cursor++) {
        const id = queue[cursor]!;
        validEdges.filter(edge => edge.source === id).forEach(edge => {
          if (!ranks.has(edge.target)) {
            ranks.set(edge.target, ranks.get(id)! + 1);
            queue.push(edge.target);
          }
        });
      }
    };
    [...roots, ...ordered].forEach(seed);
    const rows = new Map<number, number>();
    ids.forEach(id => {
      const rank = ranks.get(id)!;
      const row = rows.get(rank) ?? 0;
      positions.set(id, { x: rank * 300, y: row * 160 });
      rows.set(rank, row + 1);
    });
    return positions;
  }
  const nodes = ordered.map((id, index) => ({ id, x: Math.cos(index * 2.4) * 240, y: Math.sin(index * 2.4) * 240 }));
  // Deterministic initial positions and a stopped simulation avoid background
  // timers and layout jitter.
  const simulation = forceSimulation(nodes)
    .force('link', forceLink(validEdges.map(edge => ({ source: edge.source, target: edge.target })))
      .id(node => (node as typeof nodes[number]).id).distance(200).strength(0.35))
    .force('charge', forceManyBody().strength(-350))
    .force('collide', forceCollide(96))
    // A center force alone only translates the group: disconnected records
    // can drift arbitrarily far away and make fit-to-view unreadably small.
    .force('x', forceX(0).strength(0.06))
    .force('y', forceY(0).strength(0.1))
    .force('center', forceCenter(0, 0)).stop();
  simulation.tick(180);
  nodes.forEach(node => positions.set(node.id, { x: node.x, y: node.y }));
  return positions;
}

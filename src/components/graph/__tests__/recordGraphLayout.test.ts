// Ported from the aws-agentcore portal's pages/search/__tests__/searchGraph.test.ts
// (node:test → vitest).
import { expect, test } from 'vitest';
import {
  filterRecordGraph, recordGraphKey, layoutRecordGraph, recordForceParams, recordGraphFitKeys,
  RECORD_GRAPH_MIN_FIT_ZOOM, RECORD_GRAPH_NODE_HEIGHT as NODE_H, RECORD_GRAPH_NODE_WIDTH as NODE_W,
  type RecordGraphEdge, type RecordGraphRecord, type RecordGraphType,
} from '../recordGraphLayout';

const records: RecordGraphRecord[] = [
  { id: 'shared', type: 'person', title: 'Owner', href: '/people/shared' },
  { id: 'shared', type: 'initiative', title: 'Initiative', href: '/initiatives/shared' },
  { id: 'work', type: 'work', title: 'Blocked work', href: '/work/work', status: 'blocked' },
  { id: 'guide', type: 'knowledge', title: 'A guide', href: '/knowledge/guide' },
];
const edges: RecordGraphEdge[] = [
  { id: 'owns', source: 'person:shared', target: 'initiative:shared', label: 'owns' },
  { id: 'includes', source: 'initiative:shared', target: 'work:work', label: 'includes' },
  { id: 'missing', source: 'knowledge:guide', target: 'work:missing', label: 'supports' },
];

test('mixed graph preserves typed IDs and does not create relationships for disconnected records', () => {
  const graph = filterRecordGraph([...records, records[0]], [...edges, edges[0]], 'all');
  expect(graph.records.length).toBe(4);
  expect(graph.edges.map(edge => edge.id)).toEqual(['owns', 'includes']);
  expect(recordGraphKey(records[0])).not.toBe(recordGraphKey(records[1]));
  expect(graph.records.some(record => record.id === 'guide')).toBe(true);
});

test('type filtering removes edges whose other endpoint is hidden', () => {
  const graph = filterRecordGraph(records, edges, 'person');
  expect(graph.records).toEqual([records[0]]);
  expect(graph.edges).toEqual([]);
});

test('all layouts retain disconnected records and handle cyclic evidence without mutating inputs', () => {
  const cyclic = [...edges, { id: 'cycle', source: 'work:work', target: 'person:shared', label: 'assigned to' }];
  const before = JSON.stringify({ records, cyclic });
  for (const layout of ['force', 'radial', 'hierarchy'] as const) {
    const positions = layoutRecordGraph(records, cyclic, layout);
    expect(positions.size).toBe(records.length);
    expect(new Set([...positions.values()].map(point => `${point.x},${point.y}`)).size).toBe(records.length);
    for (const position of positions.values()) {
      expect(Number.isFinite(position.x) && Number.isFinite(position.y)).toBe(true);
    }
  }
  expect(JSON.stringify({ records, cyclic })).toBe(before);
});

test('hierarchy follows directed edges and force layout is repeatable', () => {
  const hierarchy = layoutRecordGraph(records, edges, 'hierarchy');
  expect(hierarchy.get('person:shared')!.x < hierarchy.get('initiative:shared')!.x).toBe(true);
  expect(hierarchy.get('initiative:shared')!.x < hierarchy.get('work:work')!.x).toBe(true);
  expect(layoutRecordGraph(records, edges, 'force')).toEqual(layoutRecordGraph(records, edges, 'force'));
});

// ── 2.403.2: readable at the search page's density ──────────────────────────

/** The portal's failing case: 3 people, 2 initiatives, work, decisions and
 *  knowledge — 25 records and 56 edges on a 1160 × 418 canvas. */
function searchResult(count = 25) {
  const types: RecordGraphType[] = ['person', 'person', 'person', 'initiative', 'initiative',
    ...Array<RecordGraphType>(13).fill('work'), 'decision', 'decision', ...Array<RecordGraphType>(5).fill('knowledge')];
  const all: RecordGraphRecord[] = types.map((type, i) => ({ id: `r${i}`, type, title: `Record ${i}`, href: `/r/${i}` }));
  const key = (i: number) => recordGraphKey(all[i]!);
  const links: RecordGraphEdge[] = [];
  for (let i = 5; i < 25; i++) links.push({ id: `inc-${i}`, source: key(3 + (i % 2)), target: key(i), label: 'includes' });
  for (let i = 5; i < 25; i++) links.push({ id: `asg-${i}`, source: key(i % 3), target: key(i), label: 'assigned to' });
  for (let i = 5; i < 21; i++) links.push({ id: `rel-${i}`, source: key(i), target: key(i + 4), label: 'related' });
  return filterRecordGraph(all.slice(0, count), links, 'all');
}

const CANVAS = { width: 1160, height: 418 };

/** The zoom a padded fit of these positions would need on CANVAS. */
function fitZoom(positions: Map<string, { x: number; y: number }>) {
  const xs = [...positions.values()].map(p => p.x), ys = [...positions.values()].map(p => p.y);
  const w = Math.max(...xs) - Math.min(...xs) + NODE_W;
  const h = Math.max(...ys) - Math.min(...ys) + NODE_H;
  return { zoom: Math.min((CANVAS.width * 0.88) / w, (CANVAS.height * 0.88) / h), w, h, xs };
}

function overlaps(positions: Map<string, { x: number; y: number }>) {
  const v = [...positions.values()];
  let count = 0;
  for (let i = 0; i < v.length; i++) for (let j = i + 1; j < v.length; j++) {
    if (Math.abs(v[i]!.x - v[j]!.x) < NODE_W && Math.abs(v[i]!.y - v[j]!.y) < NODE_H * 0.8) count++;
  }
  return count;
}

test('force parameters scale with the record count and canvas', () => {
  const dozen = recordForceParams(12, CANVAS.width, CANVAS.height);
  const many = recordForceParams(25, CANVAS.width, CANVAS.height);
  expect(many.linkDistance).toBeLessThan(dozen.linkDistance);
  expect(many.charge).toBeGreaterThan(dozen.charge); // weaker repulsion for more records
  expect(recordForceParams(1, 4000, 4000).linkDistance).toBe(240);
  expect(recordForceParams(500, 400, 300).linkDistance).toBe(130);
  // Collide follows the node box, not the count, so boxes never overlap.
  expect(many.collide).toBeGreaterThan(NODE_W / 2);
  expect(many.collide).toBe(dozen.collide);
  // A wide canvas pulls harder vertically; a tall one horizontally.
  expect(many.yStrength).toBeGreaterThan(many.xStrength);
  const tall = recordForceParams(25, 418, 1160);
  expect(tall.xStrength).toBeGreaterThan(tall.yStrength);
});

test('force: a dozen records read at 100%, twenty-five near the floor — never the old 46%', () => {
  const dozen = searchResult(12);
  expect(fitZoom(layoutRecordGraph(dozen.records, dozen.edges, 'force', CANVAS)).zoom).toBeGreaterThanOrEqual(0.95);
  const full = searchResult();
  expect(full.records).toHaveLength(25);
  expect(full.edges).toHaveLength(56);
  const positions = layoutRecordGraph(full.records, full.edges, 'force', CANVAS);
  expect(fitZoom(positions).zoom).toBeGreaterThan(0.55);
  expect(overlaps(positions)).toBe(0);
});

test('radial rings are shaped to a wide canvas and spaced by arc length', () => {
  const full = searchResult();
  const positions = layoutRecordGraph(full.records, full.edges, 'radial', CANVAS);
  const { zoom, w, h } = fitZoom(positions);
  expect(w / h).toBeGreaterThan(1.8);
  expect(zoom).toBeGreaterThan(0.5); // was 0.26
  expect(overlaps(positions)).toBe(0);
});

test('hierarchy ranks by longest path, and wraps a tall rank into sub-columns', () => {
  const full = searchResult();
  const positions = layoutRecordGraph(full.records, full.edges, 'hierarchy', CANVAS);
  const { zoom, h } = fitZoom(positions);
  // The canvas at the fit floor bounds the column height.
  expect(h).toBeLessThanOrEqual(CANVAS.height / RECORD_GRAPH_MIN_FIT_ZOOM + NODE_H);
  expect(zoom).toBeGreaterThan(0.5); // was 0.15 — one column
  expect(new Set([...positions.values()].map(p => p.x)).size).toBeGreaterThanOrEqual(4);
  expect(overlaps(positions)).toBe(0);
  // Longest path: r5 → r9 → r13 puts r13 right of r9, which is right of r5.
  const x = (i: number) => positions.get(recordGraphKey(full.records[i]!))!.x;
  expect(x(5)).toBeLessThan(x(9));
  expect(x(9)).toBeLessThan(x(13));
  expect(x(0)).toBeLessThan(x(5));
});

test('hierarchy with no directed chain falls back to columns by record type', () => {
  const x = (positions: Map<string, { x: number; y: number }>, key: string) => positions.get(key)!.x;
  const flat = layoutRecordGraph(records, [], 'hierarchy', CANVAS);
  expect(x(flat, 'person:shared')).toBeLessThan(x(flat, 'initiative:shared'));
  expect(x(flat, 'initiative:shared')).toBeLessThan(x(flat, 'work:work'));
  expect(x(flat, 'work:work')).toBe(x(flat, 'knowledge:guide'));
  expect(new Set([...flat.values()].map(p => `${p.x},${p.y}`)).size).toBe(records.length);
});

test('recordGraphFitKeys is the drawn focus plus its direct neighbours', () => {
  const keys = records.map(recordGraphKey);
  expect(recordGraphFitKeys(keys, edges, ['person:shared'])).toEqual(['person:shared', 'initiative:shared']);
  expect(recordGraphFitKeys(keys, edges, ['initiative:shared'])).toEqual(['person:shared', 'initiative:shared', 'work:work']);
  expect(recordGraphFitKeys(keys, edges, ['person:missing'])).toEqual([]);
  expect(recordGraphFitKeys(keys, edges, undefined)).toEqual([]);
});

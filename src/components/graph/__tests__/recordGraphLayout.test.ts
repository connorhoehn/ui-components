// Ported from the aws-agentcore portal's pages/search/__tests__/searchGraph.test.ts
// (node:test → vitest).
import { expect, test } from 'vitest';
import { filterRecordGraph, recordGraphKey, layoutRecordGraph, type RecordGraphEdge, type RecordGraphRecord } from '../recordGraphLayout';

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

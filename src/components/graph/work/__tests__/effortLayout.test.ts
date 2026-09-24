import { describe, expect, it } from 'vitest';
import { layoutWorkEfforts, limitWorkEfforts } from '../effortLayout';
import type { WorkActivityEffort, WorkGraphEdgeData, WorkGraphNodeData } from '../types';

const node = (id: string): WorkGraphNodeData => ({ id, kind: 'document', title: id, status: 'running', disclosure: 'details', capabilities: [], updatedAt: '2026-09-20T13:00:00Z' });
const edge = (id: string, fromId: string, toId: string): WorkGraphEdgeData => ({ id, fromId, toId, relation: 'produced', status: 'running', disclosure: 'details', capabilities: [], updatedAt: '2026-09-20T13:00:00Z' });
const nodes = ['source', 'agent-a', 'deck', 'agent-b', 'notes', 'terminal'].map(node);
const edges = [edge('a', 'source', 'agent-a'), edge('b', 'agent-a', 'deck'), edge('c', 'source', 'agent-b'), edge('d', 'agent-b', 'notes')];
const efforts: WorkActivityEffort[] = [
  { id: 'slides', title: 'Sprint review', nodeIds: ['source', 'agent-a', 'deck'], edgeIds: ['a', 'b'], contextNodeIds: ['source'] },
  { id: 'writing', title: 'Release notes', nodeIds: ['source', 'agent-b', 'notes'], edgeIds: ['c', 'd'], contextNodeIds: ['source'] },
  { id: 'coverage', title: 'Coverage', nodeIds: ['terminal'], edgeIds: [] },
];

describe('source-backed effort layout', () => {
  it('duplicates a shared input visually without merging independent efforts or inventing edges', () => {
    const layout = layoutWorkEfforts(nodes, edges, efforts, { width: 1800, expandedSourceEfforts: ['slides', 'writing'] });
    const copies = layout.flatMap((group) => group.nodes).filter((item) => item.entityId === 'source');
    expect(layout).toHaveLength(3);
    expect(copies).toHaveLength(2);
    expect(copies[0].id).not.toBe(copies[1].id);
    expect(layout.flatMap((group) => group.edges).map((item) => item.entityId).sort()).toEqual(['a', 'b', 'c', 'd']);
    expect(layout[2].edges).toEqual([]);
  });

  it('packs complete groups without overlap even with measured tall previews', () => {
    const layout = layoutWorkEfforts(nodes, edges, efforts, { width: 650, measurements: new Map([['deck', { width: 200, height: 340 }]]) });
    for (const group of layout) {
      for (const item of group.nodes) {
        expect(item.x + item.width).toBeLessThanOrEqual(group.width);
        expect(item.y + item.height).toBeLessThanOrEqual(group.height);
      }
      for (const other of layout.filter((item) => item !== group)) {
        expect(group.x + group.width <= other.x || other.x + other.width <= group.x || group.y + group.height <= other.y || other.y + other.height <= group.y).toBe(true);
      }
    }
  });

  it('folds only authorized context and restores it when focused', () => {
    const overview = layoutWorkEfforts(nodes, edges, efforts, { width: 1000 });
    expect(overview[0].collapsedSourceCount).toBe(1);
    expect(overview[0].nodes.map((item) => item.entityId)).toEqual(['agent-a', 'deck']);
    const focused = layoutWorkEfforts(nodes, edges, efforts, { width: 1000, focusedEffortId: 'slides' });
    expect(focused).toHaveLength(1);
    expect(focused[0].nodes).toHaveLength(3);
    const privateSource = layoutWorkEfforts(nodes.filter((item) => item.id !== 'source'), edges, efforts, { width: 1000 });
    expect(privateSource[0].sourceCount).toBe(0);
    expect(privateSource.flatMap((group) => group.edges).some((item) => item.entityId === 'a')).toBe(false);
  });

  it('keeps layout identical across status, attention and title updates', () => {
    const options = { width: 1600 };
    const before = layoutWorkEfforts(nodes, edges, efforts, options);
    const after = layoutWorkEfforts(nodes.map((item) => ({ ...item, status: 'completed', title: 'An updated title', updatedAt: '2026-09-20T13:05:00Z' })), edges, efforts, options);
    expect(after).toEqual(before);
  });

  it.each([650, 2600])('reserves complete label lanes for fan-in and skipped levels at width %i', (width) => {
    const connections = [...edges, edge('skip', 'source', 'deck')];
    const [group] = layoutWorkEfforts(nodes, connections, [{ ...efforts[0], edgeIds: ['a', 'b', 'skip'] }], { width, labelledEdgeIds: ['a', 'b', 'skip'], measurements: new Map([['deck', { width: 200, height: 210 }]]) });
    const labels = group.edges.map((item) => ({ x: item.labelX - 56, y: item.labelY - 10, width: 112, height: 20 }));
    for (const label of labels) {
      expect(label.x).toBeGreaterThanOrEqual(0);
      expect(label.y).toBeGreaterThanOrEqual(0);
      expect(label.x + label.width).toBeLessThanOrEqual(group.width);
      expect(label.y + label.height).toBeLessThanOrEqual(group.height);
      for (const other of [...group.nodes, ...labels.filter((item) => item !== label)]) {
        expect(label.x + label.width <= other.x || other.x + other.width <= label.x || label.y + label.height <= other.y || other.y + other.height <= label.y).toBe(true);
      }
    }
  });

  it('lays context in the left column beside the step that used it, and the chain down the right', () => {
    const [group] = layoutWorkEfforts(nodes, edges, [efforts[0]], { width: 900, expandedSourceEfforts: ['slides'] });
    const at = (id: string) => group.nodes.find((item) => item.entityId === id)!;
    expect(at('source').x).toBeLessThan(at('agent-a').x);
    expect(at('source').y).toBe(at('agent-a').y);
    expect(at('deck').x).toBe(at('agent-a').x);
    expect(at('deck').y).toBeGreaterThan(at('agent-a').y);
    const handles = Object.fromEntries(group.edges.map((item) => [item.entityId, [item.sourceHandle, item.targetHandle]]));
    expect(handles.a).toEqual(['out-right', 'in-left']);
    expect(handles.b).toEqual(['out-bottom', 'in-top']);
  });

  it('keeps context open at two efforts and folds it only when the view stops being readable', () => {
    const roomy = layoutWorkEfforts(nodes, edges, efforts.slice(0, 2), { width: 1400, height: 900 });
    expect(roomy.every((group) => group.collapsedSourceCount === 0)).toBe(true);
    expect(roomy[0].nodes.map((item) => item.entityId)).toContain('source');
    // Crowding still folds up front, whatever the space.
    expect(layoutWorkEfforts(nodes, edges, efforts, { width: 1400, height: 900 })[0].collapsedSourceCount).toBe(1);
    // So does a pane too small to read the cards in.
    const cramped = layoutWorkEfforts(nodes, edges, efforts.slice(0, 2), { width: 300, height: 200, measurements: new Map([['deck', { width: 200, height: 900 }]]) });
    expect(cramped[0].collapsedSourceCount).toBe(1);
  });

  it('never routes a relationship back over the frame to reach the next column', () => {
    const [group] = layoutWorkEfforts(nodes, edges, [efforts[0]], { width: 900, expandedSourceEfforts: ['slides'] });
    const at = (id: string) => group.nodes.find((item) => item.entityId === id)!;
    for (const edge of group.edges) {
      const from = at(group.nodes.find((n) => n.id === edge.source)!.entityId);
      const to = at(group.nodes.find((n) => n.id === edge.target)!.entityId);
      // Sideways means entering from the side; only a straight drop enters the top.
      expect(edge.targetHandle).toBe(from.x === to.x ? 'in-top' : 'in-left');
      if (edge.targetHandle === 'in-top') expect(to.y).toBeGreaterThan(from.y);
    }
  });

  it('keeps parallel efforts side by side and scales rather than stacking them', () => {
    const side = layoutWorkEfforts(nodes, [], [efforts[2], { id: 'deck', title: 'Deck', nodeIds: ['deck'], edgeIds: [] }], { width: 420, height: 400 });
    expect(side[0].y).toBe(side[1].y);
    expect(side[1].x).toBeGreaterThan(side[0].x + side[0].width);
    const stacked = layoutWorkEfforts(nodes, [], [efforts[2], { id: 'deck', title: 'Deck', nodeIds: ['deck'], edgeIds: [] }], { width: 260, height: 900 });
    expect(stacked[1].y).toBeGreaterThan(stacked[0].y);
  });

  it('places two compact efforts side by side when they fit', () => {
    const layout = layoutWorkEfforts(nodes, [], [efforts[2], { id: 'deck', title: 'Deck', nodeIds: ['deck'], edgeIds: [] }], { width: 650 });
    expect(layout[0].y).toBe(layout[1].y);
    expect(layout[1].x).toBeGreaterThan(layout[0].x + layout[0].width);
  });

  it('retains canonical relationship IDs when displaying reverse lineage and reports cycles', () => {
    const reversed = layoutWorkEfforts(nodes, edges, [efforts[0]], { width: 1200, reversedEdgeIds: ['a'] });
    expect(reversed[0].edges[0].entityId).toBe('a');
    expect(reversed[0].edges[0].source).toBe(reversed[0].nodes.find((item) => item.entityId === 'agent-a')!.id);
    const cyclic = layoutWorkEfforts(nodes, [...edges, edge('cycle', 'deck', 'source')], [{ ...efforts[0], edgeIds: ['a', 'b', 'cycle'] }], { width: 1200 });
    expect(cyclic[0].cyclicNodeIds.sort()).toEqual(['agent-a', 'deck', 'source']);
    expect(cyclic[0].nodes).toHaveLength(3);
  });
});

describe('limitWorkEfforts keeps the newest made work in view', () => {
  const at = (id: string, kind: WorkGraphNodeData['kind'], time: string): WorkGraphNodeData => ({ ...node(id), kind, status: 'completed', updatedAt: time });
  const graph = [
    at('run-1', 'run', '2026-09-24T12:10:00Z'), at('run-2', 'run', '2026-09-24T12:09:00Z'), at('run-3', 'run', '2026-09-24T12:08:00Z'),
    at('deck', 'document', '2026-09-24T12:05:00Z'), at('run-old', 'run', '2026-09-24T11:00:00Z'), at('page', 'document', '2026-09-24T10:00:00Z'),
  ];
  const lanes: WorkActivityEffort[] = ['run-1', 'run-2', 'run-3', 'deck', 'run-old', 'page'].map((id) => ({ id: `effort.${id}`, title: id, nodeIds: [id], edgeIds: [] }));
  const ids = (list: WorkActivityEffort[]) => list.map((effort) => effort.id);

  it('a deck behind newer runs takes the last place of the default two', () => {
    expect(ids(limitWorkEfforts(lanes, graph))).toEqual(['effort.run-1', 'effort.deck']);
  });
  it('changes nothing when the newest already hold made work, or when turned off', () => {
    expect(ids(limitWorkEfforts(lanes.slice(3), graph))).toEqual(['effort.deck', 'effort.run-old']);
    expect(ids(limitWorkEfforts(lanes, graph, { keepLatestMade: false }))).toEqual(['effort.run-1', 'effort.run-2']);
  });
  it('a selection displaces the oldest run, not the kept deck; with one place the selection wins', () => {
    expect(ids(limitWorkEfforts(lanes, graph, { keepEffortId: 'effort.run-old' }))).toEqual(['effort.deck', 'effort.run-old']);
    expect(ids(limitWorkEfforts(lanes, graph, { max: 1, keepEffortId: 'effort.run-old' }))).toEqual(['effort.run-old']);
    expect(ids(limitWorkEfforts(lanes, graph, { max: 3 }))).toEqual(['effort.run-1', 'effort.run-2', 'effort.deck']);
  });
});

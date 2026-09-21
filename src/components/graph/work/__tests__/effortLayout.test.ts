import { describe, expect, it } from 'vitest';
import { layoutWorkEfforts } from '../effortLayout';
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

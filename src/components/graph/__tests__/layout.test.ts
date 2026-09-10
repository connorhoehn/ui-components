import { describe, expect, it } from 'vitest';
import { graphCenterNode, graphGroups, layoutGraph } from '../layout';
import type { GraphEdge, GraphNode } from '../types';

const SIZE = { width: 480, height: 320 };

const nodes: GraphNode[] = [
  { id: 'q', label: 'query', group: 'center' },
  { id: 'a', label: 'A', group: 'k8s', weight: 0.9 },
  { id: 'b', label: 'B', group: 'k8s', weight: 0.5 },
  { id: 'c', label: 'C', group: 'helm', weight: 0.4 },
  { id: 'd', label: 'D', weight: 0.2 },
];
const edges: GraphEdge[] = nodes.slice(1).map((n) => ({ from: 'q', to: n.id }));

const snapshot = (m: Map<string, { x: number; y: number }>) => [...m.entries()].map(([id, p]) => `${id}:${p.x},${p.y}`).join(' ');

describe('layoutGraph', () => {
  it.each(['radial', 'grid', 'force'] as const)('%s is deterministic: same input, same positions', (layout) => {
    const first = layoutGraph(nodes, edges, layout, SIZE);
    const second = layoutGraph([...nodes.map((n) => ({ ...n }))], [...edges.map((e) => ({ ...e }))], layout, SIZE);
    expect(snapshot(first)).toBe(snapshot(second));
    expect(first.size).toBe(nodes.length);
  });

  it.each(['radial', 'grid', 'force'] as const)('%s keeps every node inside the box', (layout) => {
    for (const p of layoutGraph(nodes, edges, layout, SIZE).values()) {
      expect(p.x).toBeGreaterThanOrEqual(0);
      expect(p.x).toBeLessThanOrEqual(SIZE.width);
      expect(p.y).toBeGreaterThanOrEqual(0);
      expect(p.y).toBeLessThanOrEqual(SIZE.height);
    }
  });

  it('radial puts the centre node in the middle and each group on its own ring', () => {
    const pos = layoutGraph(nodes, edges, 'radial', SIZE);
    expect(pos.get('q')).toEqual({ x: 240, y: 160 });
    const r = (id: string) => Math.hypot(pos.get(id)!.x - 240, pos.get(id)!.y - 160);
    expect(r('a')).toBeCloseTo(r('b'), 1);          // same group, same ring
    expect(r('c')).toBeGreaterThan(r('a'));         // later group, outer ring
    expect(r('d')).toBeGreaterThan(r('c'));
    expect(r('a')).toBeGreaterThan(20);             // never on top of the centre
  });

  it('radial with no centre flag uses the strictly heaviest node, and none when weights tie', () => {
    expect(graphCenterNode([{ id: 'x', label: 'x', weight: 2 }, { id: 'y', label: 'y', weight: 1 }])?.id).toBe('x');
    expect(graphCenterNode([{ id: 'x', label: 'x', weight: 1 }, { id: 'y', label: 'y', weight: 1 }])).toBeNull();
    expect(graphCenterNode([{ id: 'x', label: 'x' }, { id: 'y', label: 'y' }])).toBeNull();
    const pos = layoutGraph([{ id: 'x', label: 'x' }, { id: 'y', label: 'y' }], [], 'radial', SIZE);
    expect(pos.get('x')).not.toEqual({ x: 240, y: 160 });
  });

  it('grid lays rows out by group in first-appearance order, centre first', () => {
    const pos = layoutGraph(nodes, edges, 'grid', SIZE);
    expect(pos.get('q')!.y).toBeLessThan(pos.get('a')!.y);
    expect(pos.get('a')!.y).toBe(pos.get('b')!.y);
    expect(pos.get('a')!.x).toBeLessThan(pos.get('b')!.x);
    expect(pos.get('b')!.y).toBeLessThan(pos.get('c')!.y);
    expect(pos.get('c')!.y).toBeLessThan(pos.get('d')!.y);
    expect(pos.get('q')!.x).toBe(240); // a one-node row is centred
  });

  it('force pulls linked nodes closer than unlinked ones', () => {
    const ring: GraphNode[] = ['a', 'b', 'c', 'd', 'e', 'f'].map((id) => ({ id, label: id }));
    const pos = layoutGraph(ring, [{ from: 'a', to: 'b' }], 'force', SIZE);
    const d = (x: string, y: string) => Math.hypot(pos.get(x)!.x - pos.get(y)!.x, pos.get(x)!.y - pos.get(y)!.y);
    expect(d('a', 'b')).toBeLessThan(d('a', 'd'));
    expect(d('a', 'b')).toBeLessThan(d('c', 'f'));
  });

  it('handles the edges of the input: no nodes, one node, edges to unknown ids', () => {
    expect(layoutGraph([], [], 'force', SIZE).size).toBe(0);
    expect(layoutGraph([{ id: 'solo', label: 's' }], [{ from: 'solo', to: 'ghost' }], 'force', SIZE).get('solo')).toEqual({ x: 240, y: 160 });
    expect(layoutGraph([{ id: 'solo', label: 's' }], [], 'grid', SIZE).get('solo')).toEqual({ x: 240, y: 160 });
  });

  it('graphGroups lists groups in order, folds undefined to "" and skips the centre', () => {
    expect(graphGroups(nodes)).toEqual(['k8s', 'helm', '']);
  });
});

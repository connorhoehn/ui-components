import { describe, expect, it } from 'vitest';
import {
  closePane, countPanes, cyclePane, enclosingSplit, layoutRects, listLeaves,
  makeLeaf, neighborPane, ratioOf, setRatio, splitPane, updateLeaf,
  type PaneNode,
} from '../lib/paneTree';

/** ┌───┬───┐  a | (b over c) — the layout every navigation case below uses. */
function threePane(): PaneNode {
  const a = makeLeaf('a', 'box-a', 'agent');
  let tree: PaneNode = a;
  tree = splitPane(tree, 'a', 'row', makeLeaf('b', 'box-b', 'agent'), 's1');
  tree = splitPane(tree, 'b', 'column', makeLeaf('c', 'box-c', 'agent'), 's2');
  return tree;
}

describe('splitPane', () => {
  it('replaces the target leaf with a split holding it and the newcomer', () => {
    const tree = splitPane(makeLeaf('a', 'box-a', 'agent'), 'a', 'row', makeLeaf('b', 'box-b', 'agent'), 's1');
    expect(tree.kind).toBe('split');
    expect(listLeaves(tree).map((l) => l.id)).toEqual(['a', 'b']);
  });

  it('leaves the tree alone when the target does not exist', () => {
    const tree = makeLeaf('a', 'box-a', 'agent');
    expect(splitPane(tree, 'nope', 'row', makeLeaf('b', 'box-b', 'agent'), 's1')).toBe(tree);
  });
});

describe('closePane', () => {
  it('promotes the surviving sibling in place of the split', () => {
    const tree = closePane(threePane(), 'c');
    expect(listLeaves(tree).map((l) => l.id)).toEqual(['a', 'b']);
    // b was inside a column split with c; with c gone that split must be gone
    // too, not left as a one-child wrapper.
    expect(tree.kind === 'split' && tree.a.kind === 'leaf' && tree.b.kind === 'leaf').toBe(true);
  });

  it('refuses to remove the only pane', () => {
    const only = makeLeaf('a', 'box-a', 'agent');
    expect(closePane(only, 'a')).toBe(only);
    expect(countPanes(closePane(only, 'a'))).toBe(1);
  });
});

describe('layoutRects', () => {
  it('splits the axis by the ratio and tiles without gaps', () => {
    const rects = layoutRects(threePane());
    const a = rects.find((r) => r.id === 'a')!;
    const b = rects.find((r) => r.id === 'b')!;
    const c = rects.find((r) => r.id === 'c')!;
    expect(a.width).toBeCloseTo(0.5);
    expect(b.x).toBeCloseTo(0.5);
    // b sits above c inside the right-hand column.
    expect(b.height).toBeCloseTo(0.5);
    expect(c.y).toBeCloseTo(0.5);
    expect(a.height).toBeCloseTo(1);
  });

  it('follows a changed ratio', () => {
    const rects = layoutRects(setRatio(threePane(), 's1', 0.25));
    expect(rects.find((r) => r.id === 'a')!.width).toBeCloseTo(0.25);
    expect(rects.find((r) => r.id === 'b')!.x).toBeCloseTo(0.25);
  });

  it('clamps a ratio dragged past the edge', () => {
    expect(ratioOf(setRatio(threePane(), 's1', 0), 's1')).toBe(0.1);
    expect(ratioOf(setRatio(threePane(), 's1', 5), 's1')).toBe(0.9);
  });
});

describe('neighborPane', () => {
  const tree = threePane();

  it('crosses split boundaries rather than only finding siblings', () => {
    // b's sibling is c, but the pane to b's LEFT is a — a cousin one level up.
    // This is the case a structural (sibling-only) implementation gets wrong.
    expect(neighborPane(tree, 'b', 'left')).toBe('a');
    expect(neighborPane(tree, 'c', 'left')).toBe('a');
  });

  it('picks the vertically nearer pane when several lie in the direction', () => {
    // Right of `a` there are two candidates; b is the upper one and a's
    // centre is at y=0.5, exactly on the boundary. Either is defensible, but
    // it must be one of them and never null.
    expect(['b', 'c']).toContain(neighborPane(tree, 'a', 'right'));
  });

  it('moves between stacked panes', () => {
    expect(neighborPane(tree, 'b', 'down')).toBe('c');
    expect(neighborPane(tree, 'c', 'up')).toBe('b');
  });

  it('returns null at the edge instead of wrapping', () => {
    expect(neighborPane(tree, 'a', 'left')).toBeNull();
    expect(neighborPane(tree, 'a', 'up')).toBeNull();
    expect(neighborPane(tree, 'c', 'down')).toBeNull();
  });

  it('does not jump to a pane that shares no edge', () => {
    // Nothing is above `a`: it spans the full height, so `up` has no
    // candidate even though b and c exist.
    expect(neighborPane(tree, 'a', 'up')).toBeNull();
  });
});

describe('cyclePane', () => {
  it('wraps in both directions', () => {
    const tree = threePane();
    const order = layoutRects(tree).map((r) => r.id);
    expect(cyclePane(tree, order[0]!, 1)).toBe(order[1]);
    expect(cyclePane(tree, order[0]!, -1)).toBe(order[order.length - 1]);
  });

  it('has nothing to cycle to in a single-pane window', () => {
    expect(cyclePane(makeLeaf('a', 'box-a', 'agent'), 'a', 1)).toBeNull();
  });
});

describe('enclosingSplit', () => {
  it('finds the split a resize on that axis should move', () => {
    const tree = threePane();
    expect(enclosingSplit(tree, 'b', 'column')?.splitId).toBe('s2');
    // For b, the nearest ROW split is the outer one, and b is on its `b` side.
    expect(enclosingSplit(tree, 'b', 'row')).toEqual({ splitId: 's1', onA: false });
    expect(enclosingSplit(tree, 'a', 'row')).toEqual({ splitId: 's1', onA: true });
  });

  it('is null when no split on that axis encloses the pane', () => {
    expect(enclosingSplit(threePane(), 'a', 'column')).toBeNull();
  });
});

describe('updateLeaf', () => {
  it('retargets one pane and leaves the others alone', () => {
    const tree = updateLeaf(threePane(), 'b', { computerId: 'box-z', kindId: 'shell' });
    const leaves = listLeaves(tree);
    expect(leaves.find((l) => l.id === 'b')).toMatchObject({ computerId: 'box-z', kindId: 'shell' });
    expect(leaves.find((l) => l.id === 'a')!.computerId).toBe('box-a');
  });
});

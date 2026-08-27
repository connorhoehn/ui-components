// A tmux-shaped pane tree: binary splits all the way down.
//
// Not a grid. A grid can express "four equal panes" and nothing else — you
// cannot split one of them again without re-flowing the other three, and the
// ratio between two panes has nowhere to live. A binary tree gives you both
// for free, and it is what every multiplexer since screen has used.
//
// Directional navigation is done on geometry rather than tree structure. In a
// tree, "the pane to my right" is not a sibling relationship: it can be a
// cousin several levels up. Laying the tree out into rectangles first and
// then asking which rectangle is to the right is both simpler and correct.

export type SplitDirection = 'row' | 'column';

export interface PaneLeaf {
  kind: 'leaf';
  id: string;
  /** The computer this pane is bound to. */
  computerId: string;
  /**
   * Which registered pane kind renders this pane.
   *
   * A string, not a union: kinds come from a registry the host controls (see
   * `paneKinds.ts`), so the set is open. It is persisted in the saved layout,
   * and `resolveKind` handles an id the current registry no longer knows.
   */
  kindId: string;
}

export interface PaneSplit {
  kind: 'split';
  id: string;
  /** `row` puts children side by side; `column` stacks them. */
  direction: SplitDirection;
  /** Fraction of the axis taken by `a`. Clamped to [0.1, 0.9]. */
  ratio: number;
  a: PaneNode;
  b: PaneNode;
}

export type PaneNode = PaneLeaf | PaneSplit;

/** Panes below this get unreadable; splitting further is refused. */
export const MIN_RATIO = 0.1;
export const MAX_RATIO = 0.9;

export function makeLeaf(id: string, computerId: string, kindId: string): PaneLeaf {
  return { kind: 'leaf', id, computerId, kindId };
}

export function listLeaves(node: PaneNode): PaneLeaf[] {
  return node.kind === 'leaf' ? [node] : [...listLeaves(node.a), ...listLeaves(node.b)];
}

export function findLeaf(node: PaneNode, paneId: string): PaneLeaf | null {
  return listLeaves(node).find((leaf) => leaf.id === paneId) ?? null;
}

export function countPanes(node: PaneNode): number {
  return listLeaves(node).length;
}

/** Replace one leaf with a split holding it and a new sibling. */
export function splitPane(
  root: PaneNode,
  paneId: string,
  direction: SplitDirection,
  newPane: PaneLeaf,
  splitId: string,
): PaneNode {
  const rewrite = (node: PaneNode): PaneNode => {
    if (node.kind === 'leaf') {
      if (node.id !== paneId) return node;
      return { kind: 'split', id: splitId, direction, ratio: 0.5, a: node, b: newPane };
    }
    return { ...node, a: rewrite(node.a), b: rewrite(node.b) };
  };
  return rewrite(root);
}

/**
 * Remove a pane; its sibling takes the split's place.
 *
 * Returns the root unchanged when `paneId` is the only pane — a window with
 * no panes has nothing to render and no way back, so the last one is not
 * closeable. The caller closes the window instead.
 */
export function closePane(root: PaneNode, paneId: string): PaneNode {
  if (root.kind === 'leaf') return root;

  const rewrite = (node: PaneNode): PaneNode | null => {
    if (node.kind === 'leaf') return node.id === paneId ? null : node;
    const a = rewrite(node.a);
    const b = rewrite(node.b);
    if (a === null) return b;
    if (b === null) return a;
    if (a === node.a && b === node.b) return node;
    return { ...node, a, b };
  };

  return rewrite(root) ?? root;
}

export function setRatio(root: PaneNode, splitId: string, ratio: number): PaneNode {
  const clamped = Math.min(MAX_RATIO, Math.max(MIN_RATIO, ratio));
  const rewrite = (node: PaneNode): PaneNode => {
    if (node.kind === 'leaf') return node;
    if (node.id === splitId) return { ...node, ratio: clamped };
    return { ...node, a: rewrite(node.a), b: rewrite(node.b) };
  };
  return rewrite(root);
}

export function updateLeaf(root: PaneNode, paneId: string, patch: Partial<Omit<PaneLeaf, 'kind' | 'id'>>): PaneNode {
  const rewrite = (node: PaneNode): PaneNode => {
    if (node.kind === 'leaf') return node.id === paneId ? { ...node, ...patch } : node;
    return { ...node, a: rewrite(node.a), b: rewrite(node.b) };
  };
  return rewrite(root);
}

export interface PaneRect {
  id: string;
  /** All in 0–1 of the window, so the caller picks the pixel units. */
  x: number;
  y: number;
  width: number;
  height: number;
}

/** Flatten the tree into leaf rectangles in unit space. */
export function layoutRects(
  node: PaneNode,
  frame: { x: number; y: number; width: number; height: number } = { x: 0, y: 0, width: 1, height: 1 },
): PaneRect[] {
  if (node.kind === 'leaf') return [{ id: node.id, ...frame }];
  const { direction, ratio } = node;
  if (direction === 'row') {
    const left = frame.width * ratio;
    return [
      ...layoutRects(node.a, { ...frame, width: left }),
      ...layoutRects(node.b, { ...frame, x: frame.x + left, width: frame.width - left }),
    ];
  }
  const top = frame.height * ratio;
  return [
    ...layoutRects(node.a, { ...frame, height: top }),
    ...layoutRects(node.b, { ...frame, y: frame.y + top, height: frame.height - top }),
  ];
}

export type Direction = 'left' | 'right' | 'up' | 'down';

/**
 * The pane in a given direction, tmux's `select-pane -L/-R/-U/-D`.
 *
 * Candidates are panes that actually lie that way *and* overlap on the other
 * axis — without the overlap test, pressing "right" from a tall left-hand
 * pane could land in a pane sitting well above or below it, which feels like
 * the focus teleported. Among the survivors, the nearest edge wins.
 */
export function neighborPane(root: PaneNode, paneId: string, direction: Direction): string | null {
  const rects = layoutRects(root);
  const from = rects.find((r) => r.id === paneId);
  if (!from) return null;

  const fromCenter = { x: from.x + from.width / 2, y: from.y + from.height / 2 };
  const horizontal = direction === 'left' || direction === 'right';

  const candidates = rects.filter((r) => {
    if (r.id === paneId) return false;
    const overlaps = horizontal
      ? r.y < from.y + from.height && r.y + r.height > from.y
      : r.x < from.x + from.width && r.x + r.width > from.x;
    if (!overlaps) return false;
    // Compare against the *edge*, not the centre: a wide pane whose centre is
    // far away can still be the one immediately adjacent.
    switch (direction) {
      case 'left': return r.x + r.width <= from.x + 1e-6;
      case 'right': return r.x >= from.x + from.width - 1e-6;
      case 'up': return r.y + r.height <= from.y + 1e-6;
      case 'down': return r.y >= from.y + from.height - 1e-6;
    }
  });
  if (candidates.length === 0) return null;

  const distance = (r: PaneRect) => {
    const gap = horizontal
      ? direction === 'left' ? from.x - (r.x + r.width) : r.x - (from.x + from.width)
      : direction === 'up' ? from.y - (r.y + r.height) : r.y - (from.y + from.height);
    // Perpendicular offset breaks ties between equally-adjacent panes, so
    // "down" from a pane lands in the one directly under it.
    const offset = horizontal
      ? Math.abs(r.y + r.height / 2 - fromCenter.y)
      : Math.abs(r.x + r.width / 2 - fromCenter.x);
    return gap * 2 + offset;
  };

  return candidates.reduce((best, r) => (distance(r) < distance(best) ? r : best)).id;
}

/** Next / previous pane in layout order — the `⌃a o` cycle. */
export function cyclePane(root: PaneNode, paneId: string, delta: number): string | null {
  const rects = layoutRects(root);
  if (rects.length < 2) return null;
  const index = rects.findIndex((r) => r.id === paneId);
  if (index < 0) return rects[0]?.id ?? null;
  return rects[(index + delta + rects.length) % rects.length]?.id ?? null;
}

/** The split whose child contains `paneId` along `axis` — the one a resize moves. */
export function enclosingSplit(root: PaneNode, paneId: string, axis: SplitDirection): { splitId: string; onA: boolean } | null {
  let found: { splitId: string; onA: boolean } | null = null;
  const walk = (node: PaneNode, inheritedMatch: { splitId: string; onA: boolean } | null): void => {
    if (node.kind === 'leaf') {
      if (node.id === paneId) found = inheritedMatch;
      return;
    }
    const matches = node.direction === axis;
    walk(node.a, matches ? { splitId: node.id, onA: true } : inheritedMatch);
    walk(node.b, matches ? { splitId: node.id, onA: false } : inheritedMatch);
  };
  walk(root, null);
  return found;
}

export function ratioOf(root: PaneNode, splitId: string): number | null {
  if (root.kind === 'leaf') return null;
  if (root.id === splitId) return root.ratio;
  return ratioOf(root.a, splitId) ?? ratioOf(root.b, splitId);
}

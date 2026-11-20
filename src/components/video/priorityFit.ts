// Which items of a one-row bar give way when the row is too narrow.
// No React, no DOM: the bar measures, this decides.

export interface PriorityFitItem {
  id: string;
  /** Measured width in px; 0 means the item draws nothing and takes no part. */
  width: number;
  /** Higher stays on the row longer. */
  priority: number;
  /** False: never leaves the row. */
  collapsible: boolean;
}

/**
 * The ids to move off the row so the rest fits in `available` px, lowest
 * priority first (between equals, the one later in the row goes first). The
 * overflow control (`moreWidth`) is counted as soon as one item has gone.
 * Items that may not collapse always stay, so the result can still be wider
 * than `available` when they alone do not fit.
 */
export function fitByPriority(items: readonly PriorityFitItem[], available: number, gap: number, moreWidth: number): string[] {
  const present = items.map((item, index) => ({ ...item, index })).filter((item) => item.width > 0);
  const total = (shown: typeof present, more: boolean) => {
    const count = shown.length + (more ? 1 : 0);
    return shown.reduce((sum, item) => sum + item.width, 0) + (more ? moreWidth : 0) + Math.max(0, count - 1) * gap;
  };
  if (present.length === 0) return [];
  // Half a pixel of slack: measured widths are fractional.
  if (total(present, false) <= available + 0.5) return [];
  const order = present.filter((item) => item.collapsible).sort((a, b) => a.priority - b.priority || b.index - a.index);
  const gone = new Set<string>();
  for (const next of order) {
    gone.add(next.id);
    if (total(present.filter((item) => !gone.has(item.id)), true) <= available + 0.5) break;
  }
  return present.filter((item) => gone.has(item.id)).map((item) => item.id);
}

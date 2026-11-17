// The call grid's fit to its box (`CallDock fit="contain"`).
//
// A grid of `count` 16:9 tiles inside a `width` × `height` box with `gap`
// between cells: try every column count and keep the one whose tile is the
// largest while every row still fits the height, so nothing scrolls and no
// tile is cut. One tile fills as much of the box as 16:9 allows; two sit side
// by side in a wide box and stacked in a tall one. Pure, so the choice is
// tested without a layout engine.

/** The 16:9 tile's height over its width. */
export const GRID_FIT_ASPECT = 9 / 16;

export interface GridFit {
  /** Columns in the grid (1 when there is nothing to fit). */
  columns: number;
  /** Rows the tiles take: `ceil(count / columns)`. */
  rows: number;
  /** Each tile's width in whole px (0 when the box or the count is empty). */
  tileWidth: number;
  /** Each tile's height in whole px: `tileWidth` at 16:9, rounded down. */
  tileHeight: number;
}

/**
 * The column count that gives the largest 16:9 tile with all `count` tiles
 * visible in `width` × `height` (px, `gap` between cells). Ties go to fewer
 * columns. A box or count of zero gives a zero tile.
 */
export function gridFit(count: number, width: number, height: number, gap = 0): GridFit {
  const n = Math.max(0, Math.floor(count));
  if (n === 0 || !(width > 0) || !(height > 0)) return { columns: 1, rows: n === 0 ? 0 : n, tileWidth: 0, tileHeight: 0 };
  let best: GridFit = { columns: 1, rows: n, tileWidth: 0, tileHeight: 0 };
  let bestWidth = -1;
  for (let columns = 1; columns <= n; columns += 1) {
    const rows = Math.ceil(n / columns);
    const byWidth = (width - gap * (columns - 1)) / columns;
    const byHeight = ((height - gap * (rows - 1)) / rows) / GRID_FIT_ASPECT;
    const w = Math.min(byWidth, byHeight);
    if (w > bestWidth) {
      bestWidth = w;
      best = { columns, rows, tileWidth: 0, tileHeight: 0 };
    }
  }
  const tileWidth = Math.max(0, Math.floor(bestWidth));
  return { ...best, tileWidth, tileHeight: Math.floor(tileWidth * GRID_FIT_ASPECT) };
}

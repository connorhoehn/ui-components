// Framing for the org graph: the pan/zoom that fits a set of drawn nodes into
// the canvas. Pure, so the "fit to view" maths is tested without a DOM.

import { ORG_LABEL_BAND } from './useForceLayout';

export interface FitBounds {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

/** The SVG group's pan and zoom: screen = world × scale + (x, y). */
export interface ViewTransform {
  x: number;
  y: number;
  scale: number;
}

/**
 * The transform that centres `bounds` in a `size` canvas with `padding` px on
 * every side, zoomed as far as fits but never past `maxZoom` (so two people do
 * not become two giant circles) nor below `minZoom`. A zero-width or
 * zero-height box (one person, or a row) fits on its other axis; an empty box
 * gets `maxZoom`.
 */
export function fitTransform(
  bounds: FitBounds,
  size: { width: number; height: number },
  padding: number,
  maxZoom: number,
  minZoom = 0,
): ViewTransform {
  const bw = Math.max(0, bounds.maxX - bounds.minX);
  const bh = Math.max(0, bounds.maxY - bounds.minY);
  const availW = Math.max(1, size.width - 2 * padding);
  const availH = Math.max(1, size.height - 2 * padding);
  const fits = [bw > 0 ? availW / bw : Infinity, bh > 0 ? availH / bh : Infinity];
  const scale = Math.max(minZoom, Math.min(maxZoom, ...fits));
  const cx = (bounds.minX + bounds.maxX) / 2;
  const cy = (bounds.minY + bounds.maxY) / 2;
  return { x: size.width / 2 - cx * scale, y: size.height / 2 - cy * scale, scale };
}

/** Rough drawn width of a 10px first-name label plus its pill padding. */
export function orgLabelWidth(text: string): number {
  return Math.ceil(text.length * 6 + 10);
}

/**
 * The box that holds every drawn node: its circle, the first-name label pill
 * under it, and (for `tall` ids — the selected person) the full-name label
 * above it. Null when nothing is drawn.
 */
export function orgGraphBounds(
  nodes: ReadonlyArray<{ id: string; name: string; x: number; y: number }>,
  radiusOf: (id: string) => number,
  tall?: ReadonlySet<string>,
): FitBounds | null {
  if (nodes.length === 0) return null;
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const n of nodes) {
    const r = radiusOf(n.id);
    const isTall = tall?.has(n.id) ?? false;
    const label = isTall ? n.name : n.name.split(' ')[0] ?? '';
    const half = Math.max(r, orgLabelWidth(label) / 2);
    minX = Math.min(minX, n.x - half);
    maxX = Math.max(maxX, n.x + half);
    minY = Math.min(minY, n.y - r - (isTall ? ORG_LABEL_BAND : 0));
    maxY = Math.max(maxY, n.y + r + ORG_LABEL_BAND);
  }
  return { minX, minY, maxX, maxY };
}

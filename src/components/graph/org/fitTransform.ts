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
 * Screen px along each canvas edge that the fitted drawing keeps clear of —
 * the legend on the left, a person card the host overlays on the right. The
 * fit centres the drawing in what is left. Since 2.403.2.
 */
export interface FitInset {
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
}

/**
 * Screen zoom below which the fit does not go: the org graph's first-name
 * labels are 10px, so 1.1 keeps them at 11px. A drawing that does not fit at
 * this zoom overflows the canvas and the viewer pans. Since 2.403.2.
 */
export const ORG_FIT_MIN_ZOOM = 1.1;

/**
 * The transform that centres `bounds` in a `size` canvas — less `inset` on
 * each edge (2.403.2) and `padding` px inside that — zoomed as far as fits but
 * never past `maxZoom` (so two people do not become two giant circles) nor
 * below `minZoom`. When `minZoom` wins and the drawing overflows an axis, that
 * axis is aligned to its start (top / left of the clear area) instead of
 * centred, so the viewer sees the beginning and pans on. A zero-width or
 * zero-height box (one person, or a row) fits on its other axis; an empty box
 * gets `maxZoom`.
 */
export function fitTransform(
  bounds: FitBounds,
  size: { width: number; height: number },
  padding: number,
  maxZoom: number,
  minZoom = 0,
  inset: FitInset = {},
): ViewTransform {
  const left = Math.max(0, inset.left ?? 0);
  const right = Math.max(0, inset.right ?? 0);
  const top = Math.max(0, inset.top ?? 0);
  const bottom = Math.max(0, inset.bottom ?? 0);
  const bw = Math.max(0, bounds.maxX - bounds.minX);
  const bh = Math.max(0, bounds.maxY - bounds.minY);
  const availW = Math.max(1, size.width - left - right - 2 * padding);
  const availH = Math.max(1, size.height - top - bottom - 2 * padding);
  const fits = [bw > 0 ? availW / bw : Infinity, bh > 0 ? availH / bh : Infinity];
  const scale = Math.max(minZoom, Math.min(maxZoom, ...fits));
  const cx = (bounds.minX + bounds.maxX) / 2;
  const cy = (bounds.minY + bounds.maxY) / 2;
  // Centre of the clear area, or its start edge when the drawing overflows.
  const x = bw * scale > availW + 0.5
    ? left + padding - bounds.minX * scale
    : left + (size.width - left - right) / 2 - cx * scale;
  const y = bh * scale > availH + 0.5
    ? top + padding - bounds.minY * scale
    : top + (size.height - top - bottom) / 2 - cy * scale;
  return { x, y, scale };
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

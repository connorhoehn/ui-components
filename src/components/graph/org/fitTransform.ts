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
 * Default floor of the org graph's AUTOMATIC fit: the first-name labels are
 * 10px on a surface pill, so 0.9 draws them at 9px — still legible on the
 * pill, and it brings far more of a whole org into view than 2.403.2's 1.1
 * (11px), which left 21 of 56 people off a 1160 × 400 canvas. A drawing that
 * does not fit at this zoom overflows the canvas and the viewer pans, or
 * presses "Fit to view". `OrgGraph`'s `minFitZoom` overrides it.
 * Since 2.403.2; 0.9 since 2.403.4.
 */
export const ORG_FIT_MIN_ZOOM = 0.9;

/**
 * Hard floor of "Fit to view" / `OrgGraphHandle.fitAll()`, which fit the
 * whole drawn set with no readability floor — the viewer asked to see
 * everyone at once. Only a set that does not fit even at this zoom overflows.
 * Since 2.403.4; 0.3 since 2.403.5 (was 0.5, where a whole org in Radial
 * still left 17 of 56 people off a 1160 × 360 canvas) — the pan/zoom's own
 * minimum.
 */
export const ORG_FIT_ALL_MIN_ZOOM = 0.3;

/**
 * The zoom cluster's box in the canvas's bottom-right corner, margins
 * included (`bottom-3 right-3` + a 34px-tall, ~158px-wide toolbar). The fit
 * keeps clear of it while `controls` is on. Since 2.403.4.
 */
export const ORG_CONTROLS_SIZE = { width: 172, height: 48 } as const;

/**
 * Insets that also keep a bottom-right `corner` box (the zoom cluster) clear.
 * Clearing either edge clears the corner, so when the host's insets do not
 * already cover it, the corner is reserved along the edge that costs the
 * smaller share of the clear area — usually the bottom, the right only on a
 * strip more than ~3.6× wider than tall — rather than both. Since 2.403.4.
 */
export function reserveCorner(
  inset: Required<FitInset>,
  size: { width: number; height: number },
  corner: { width: number; height: number },
): Required<FitInset> {
  if (inset.right >= corner.width || inset.bottom >= corner.height) return inset;
  const clearW = Math.max(1, size.width - inset.left - inset.right);
  const clearH = Math.max(1, size.height - inset.top - inset.bottom);
  const costBottom = (corner.height - inset.bottom) / clearH;
  const costRight = (corner.width - inset.right) / clearW;
  return costBottom <= costRight
    ? { ...inset, bottom: corner.height }
    : { ...inset, right: corner.width };
}

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
  return unionBounds(orgNodeBoxes(nodes, radiusOf, tall));
}

/**
 * Each drawn node's own box (world px): circle, first-name pill below, and
 * the full-name label above for `tall` ids — the per-node form of
 * `orgGraphBounds`. Since 2.404.2.
 */
export function orgNodeBoxes(
  nodes: ReadonlyArray<{ id: string; name: string; x: number; y: number }>,
  radiusOf: (id: string) => number,
  tall?: ReadonlySet<string>,
): Array<FitBounds & { id: string }> {
  return nodes.map((n) => {
    const r = radiusOf(n.id);
    const isTall = tall?.has(n.id) ?? false;
    const label = isTall ? n.name : n.name.split(' ')[0] ?? '';
    const half = Math.max(r, orgLabelWidth(label) / 2);
    return {
      id: n.id,
      minX: n.x - half,
      maxX: n.x + half,
      minY: n.y - r - (isTall ? ORG_LABEL_BAND : 0),
      maxY: n.y + r + ORG_LABEL_BAND,
    };
  });
}

function unionBounds(boxes: ReadonlyArray<FitBounds>): FitBounds | null {
  if (boxes.length === 0) return null;
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const b of boxes) {
    minX = Math.min(minX, b.minX);
    maxX = Math.max(maxX, b.maxX);
    minY = Math.min(minY, b.minY);
    maxY = Math.max(maxY, b.maxY);
  }
  return { minX, minY, maxX, maxY };
}

/** A screen-px rectangle on the canvas (an overlay, or a node's drawn box). */
export interface ScreenRect {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

/**
 * The overlays a node must not sit under at the opening view: a full-height
 * or full-width strip for each keep-out edge of `inset` (the legend's column
 * on the left by default, a host's person card on the right) and, when
 * `controls` is given, the zoom cluster's bottom-right corner. Pass the
 * insets BEFORE `reserveCorner` — the corner is its own rectangle, not the
 * whole bottom band. Since 2.404.2.
 */
export function orgOverlayRects(
  size: { width: number; height: number },
  inset: FitInset,
  controls?: { width: number; height: number } | null,
): ScreenRect[] {
  const { width: W, height: H } = size;
  const out: ScreenRect[] = [];
  if ((inset.left ?? 0) > 0) out.push({ left: 0, top: 0, right: inset.left!, bottom: H });
  if ((inset.right ?? 0) > 0) out.push({ left: W - inset.right!, top: 0, right: W, bottom: H });
  if ((inset.top ?? 0) > 0) out.push({ left: 0, top: 0, right: W, bottom: inset.top! });
  if ((inset.bottom ?? 0) > 0) out.push({ left: 0, top: H - inset.bottom!, right: W, bottom: H });
  if (controls) out.push({ left: W - controls.width, top: H - controls.height, right: W, bottom: H });
  return out;
}

/** A world box under `t`, in screen px. */
export function toScreen(b: FitBounds, t: ViewTransform): ScreenRect {
  return {
    left: b.minX * t.scale + t.x,
    right: b.maxX * t.scale + t.x,
    top: b.minY * t.scale + t.y,
    bottom: b.maxY * t.scale + t.y,
  };
}

function overlaps(a: ScreenRect, b: ScreenRect): boolean {
  return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
}

/**
 * The world `boxes` whose screen box under `t` intersects any overlay — the
 * people drawn under the legend, the zoom cluster or a host card. A box
 * wholly beyond the canvas edge is not "under" anything. Since 2.404.2.
 */
export function nodesUnderOverlays<B extends FitBounds>(
  boxes: ReadonlyArray<B>,
  t: ViewTransform,
  overlays: ReadonlyArray<ScreenRect>,
  size: { width: number; height: number },
): B[] {
  const canvas = { left: 0, top: 0, right: size.width, bottom: size.height };
  return boxes.filter((b) => {
    const s = toScreen(b, t);
    return overlaps(s, canvas) && overlays.some((o) => overlaps(s, o));
  });
}

/**
 * Shift an overflowing view so that no node sits under an overlay: tries pans
 * along the overflowing `axes`, nearest first, up to the overlays' own size
 * (plus a node's box) each way, and keeps the first where no node box
 * intersects an overlay and every `keep` box (the focus) stays whole inside
 * the canvas. A node pushed beyond the canvas edge is allowed; one under an
 * overlay is not. Returns `t` unchanged when it is already clear. When no pan
 * in reach is clear (a whole org's rings at 0.9, which only Fit to view can
 * clear), it returns the nearest pan with the fewest nodes under an overlay.
 * Since 2.404.2.
 */
export function clearOfOverlays(
  t: ViewTransform,
  boxes: ReadonlyArray<FitBounds>,
  overlays: ReadonlyArray<ScreenRect>,
  size: { width: number; height: number },
  opts: { axes: { x: boolean; y: boolean }; keep?: ReadonlyArray<FitBounds>; step?: number },
): ViewTransform {
  if (overlays.length === 0 || boxes.length === 0) return t;
  const keep = opts.keep ?? [];
  const keepInside = (c: ViewTransform) => keep.every((b) => {
    const s = toScreen(b, c);
    return s.left >= 0 && s.top >= 0 && s.right <= size.width && s.bottom <= size.height;
  });
  const under = (c: ViewTransform) => nodesUnderOverlays(boxes, c, overlays, size).length;
  let bestCount = under(t);
  if (bestCount === 0 && keepInside(t)) return t;
  if (!opts.axes.x && !opts.axes.y) return t;
  if (!keepInside(t)) bestCount = Infinity;
  const step = Math.max(1, opts.step ?? 4);
  // How far to look: the overlays' size across the axis (full-span strips
  // excluded — no pan clears a node from under a strip along its length),
  // plus the largest node box, so a node can pass wholly beyond an overlay.
  let nodeW = 0, nodeH = 0;
  for (const b of boxes) {
    nodeW = Math.max(nodeW, (b.maxX - b.minX) * t.scale);
    nodeH = Math.max(nodeH, (b.maxY - b.minY) * t.scale);
  }
  let spanX = 0, spanY = 0;
  for (const o of overlays) {
    const w = o.right - o.left, h = o.bottom - o.top;
    if (w < size.width) spanX = Math.max(spanX, w);
    if (h < size.height) spanY = Math.max(spanY, h);
  }
  const rangeX = opts.axes.x ? spanX + nodeW : 0;
  const rangeY = opts.axes.y ? spanY + nodeH : 0;
  const offsets = (range: number) => {
    const out = [0];
    for (let d = step; d <= range; d += step) out.push(-d, d);
    return out;
  };
  const candidates: Array<[number, number]> = [];
  for (const dx of offsets(rangeX)) for (const dy of offsets(rangeY)) if (dx || dy) candidates.push([dx, dy]);
  candidates.sort((a, b) => Math.hypot(a[0], a[1]) - Math.hypot(b[0], b[1]));
  // Nearest clear pan wins; when none is clear (a ring passes through every
  // position of the corner), the nearest pan with the fewest nodes under an
  // overlay — never a pan that loses the focus.
  let best = t;
  for (const [dx, dy] of candidates) {
    const c = { x: t.x + dx, y: t.y + dy, scale: t.scale };
    if (!keepInside(c)) continue;
    const n = under(c);
    if (n === 0) return c;
    if (n < bestCount) { bestCount = n; best = c; }
  }
  return best;
}

export interface OrgGraphViewportArgs {
  nodes: ReadonlyArray<{ id: string; name: string; x: number; y: number }>;
  radiusOf: (id: string) => number;
  /** Focus ids that are drawn (the tall-labelled, centred people). */
  focus: ReadonlySet<string>;
  size: { width: number; height: number };
  /** The clear area's insets, AFTER `reserveCorner`. */
  inset: FitInset;
  /** What no node may sit under (`orgOverlayRects`). */
  overlays: ReadonlyArray<ScreenRect>;
  layout?: 'force' | 'radial';
  /** 'auto' — the automatic fit; 'all' — Fit to view / `fitAll()`. */
  mode: 'auto' | 'all';
  /** The automatic fit's readability floor (`minFitZoom`). */
  floor?: number;
  padding?: number;
  maxZoom?: number;
}

/**
 * `OrgGraph`'s pan/zoom for its drawn nodes — the whole framing rule in one
 * pure function. Since 2.404.2.
 *
 * - `mode: 'all'` (Fit to view) fits the whole drawn set down to
 *   `ORG_FIT_ALL_MIN_ZOOM`.
 * - The automatic fit does the same for the RADIAL layout with no focus —
 *   rings are designed to be seen whole, and at the readability floor a
 *   whole org's rings overflowed the canvas under the zoom cluster.
 * - Otherwise (Force, or a focused Radial) the automatic fit stops at
 *   `floor`; an axis that overflows there is start-aligned, or, with a
 *   focus, centred on the focus (clamped to the drawing's ends).
 * - Whenever the result overflows, the view is shifted (`clearOfOverlays`)
 *   so no node sits under an overlay; nodes beyond the canvas edge are fine.
 */
export function orgGraphViewport(a: OrgGraphViewportArgs): ViewTransform | null {
  const padding = a.padding ?? 32;
  const maxZoom = a.maxZoom ?? 1.25;
  const floor = Math.max(ORG_FIT_ALL_MIN_ZOOM, a.floor ?? ORG_FIT_MIN_ZOOM);
  const boxes = orgNodeBoxes(a.nodes, a.radiusOf, a.focus);
  const bounds = unionBounds(boxes);
  if (!bounds) return null;
  const wholeSet = a.mode === 'all' || (a.layout === 'radial' && a.focus.size === 0);
  let t = fitTransform(bounds, a.size, padding, maxZoom, wholeSet ? ORG_FIT_ALL_MIN_ZOOM : floor, a.inset);

  const left = Math.max(0, a.inset.left ?? 0), right = Math.max(0, a.inset.right ?? 0);
  const top = Math.max(0, a.inset.top ?? 0), bottom = Math.max(0, a.inset.bottom ?? 0);
  const availW = Math.max(1, a.size.width - left - right - 2 * padding);
  const availH = Math.max(1, a.size.height - top - bottom - 2 * padding);
  const overX = (bounds.maxX - bounds.minX) * t.scale > availW + 0.5;
  const overY = (bounds.maxY - bounds.minY) * t.scale > availH + 0.5;
  if (!overX && !overY) return t;

  const keep = boxes.filter(b => a.focus.has(b.id));
  const focusBounds = unionBounds(keep);
  if (!wholeSet && focusBounds) {
    // Centre the focus on each overflowing axis, but never pull the
    // drawing's own edge in past the clear area's edge.
    const s = t.scale;
    if (overX) {
      const start = left + padding - bounds.minX * s;
      const end = a.size.width - right - padding - bounds.maxX * s;
      const centred = left + (a.size.width - left - right) / 2 - ((focusBounds.minX + focusBounds.maxX) / 2) * s;
      t = { ...t, x: Math.min(start, Math.max(end, centred)) };
    }
    if (overY) {
      const start = top + padding - bounds.minY * s;
      const end = a.size.height - bottom - padding - bounds.maxY * s;
      const centred = top + (a.size.height - top - bottom) / 2 - ((focusBounds.minY + focusBounds.maxY) / 2) * s;
      t = { ...t, y: Math.min(start, Math.max(end, centred)) };
    }
  }
  return clearOfOverlays(t, boxes, a.overlays, a.size, { axes: { x: overX, y: overY }, keep });
}

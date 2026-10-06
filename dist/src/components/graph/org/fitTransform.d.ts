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
export declare const ORG_FIT_MIN_ZOOM = 0.9;
/**
 * Hard floor of "Fit to view" / `OrgGraphHandle.fitAll()`, which fit the
 * whole drawn set with no readability floor — the viewer asked to see
 * everyone at once. Only a set that does not fit even at this zoom overflows.
 * Since 2.403.4; 0.3 since 2.403.5 (was 0.5, where a whole org in Radial
 * still left 17 of 56 people off a 1160 × 360 canvas) — the pan/zoom's own
 * minimum.
 */
export declare const ORG_FIT_ALL_MIN_ZOOM = 0.3;
/**
 * The zoom cluster's box in the canvas's bottom-right corner, margins
 * included (`bottom-3 right-3` + a 34px-tall, ~158px-wide toolbar). The fit
 * keeps clear of it while `controls` is on. Since 2.403.4.
 */
export declare const ORG_CONTROLS_SIZE: {
    readonly width: 172;
    readonly height: 48;
};
/**
 * Insets that also keep a bottom-right `corner` box (the zoom cluster) clear.
 * Clearing either edge clears the corner, so when the host's insets do not
 * already cover it, the corner is reserved along the edge that costs the
 * smaller share of the clear area — usually the bottom, the right only on a
 * strip more than ~3.6× wider than tall — rather than both. Since 2.403.4.
 */
export declare function reserveCorner(inset: Required<FitInset>, size: {
    width: number;
    height: number;
}, corner: {
    width: number;
    height: number;
}): Required<FitInset>;
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
export declare function fitTransform(bounds: FitBounds, size: {
    width: number;
    height: number;
}, padding: number, maxZoom: number, minZoom?: number, inset?: FitInset): ViewTransform;
/** Rough drawn width of a 10px first-name label plus its pill padding. */
export declare function orgLabelWidth(text: string): number;
/**
 * The box that holds every drawn node: its circle, the first-name label pill
 * under it, and (for `tall` ids — the selected person) the full-name label
 * above it. Null when nothing is drawn.
 */
export declare function orgGraphBounds(nodes: ReadonlyArray<{
    id: string;
    name: string;
    x: number;
    y: number;
}>, radiusOf: (id: string) => number, tall?: ReadonlySet<string>): FitBounds | null;
/**
 * Each drawn node's own box (world px): circle, first-name pill below, and
 * the full-name label above for `tall` ids — the per-node form of
 * `orgGraphBounds`. Since 2.404.2.
 */
export declare function orgNodeBoxes(nodes: ReadonlyArray<{
    id: string;
    name: string;
    x: number;
    y: number;
}>, radiusOf: (id: string) => number, tall?: ReadonlySet<string>): Array<FitBounds & {
    id: string;
}>;
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
export declare function orgOverlayRects(size: {
    width: number;
    height: number;
}, inset: FitInset, controls?: {
    width: number;
    height: number;
} | null): ScreenRect[];
/** A world box under `t`, in screen px. */
export declare function toScreen(b: FitBounds, t: ViewTransform): ScreenRect;
/**
 * The world `boxes` whose screen box under `t` intersects any overlay — the
 * people drawn under the legend, the zoom cluster or a host card. A box
 * wholly beyond the canvas edge is not "under" anything. Since 2.404.2.
 */
export declare function nodesUnderOverlays<B extends FitBounds>(boxes: ReadonlyArray<B>, t: ViewTransform, overlays: ReadonlyArray<ScreenRect>, size: {
    width: number;
    height: number;
}): B[];
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
export declare function clearOfOverlays(t: ViewTransform, boxes: ReadonlyArray<FitBounds>, overlays: ReadonlyArray<ScreenRect>, size: {
    width: number;
    height: number;
}, opts: {
    axes: {
        x: boolean;
        y: boolean;
    };
    keep?: ReadonlyArray<FitBounds>;
    step?: number;
}): ViewTransform;
export interface OrgGraphViewportArgs {
    nodes: ReadonlyArray<{
        id: string;
        name: string;
        x: number;
        y: number;
    }>;
    radiusOf: (id: string) => number;
    /** Focus ids that are drawn (the tall-labelled, centred people). */
    focus: ReadonlySet<string>;
    size: {
        width: number;
        height: number;
    };
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
export declare function orgGraphViewport(a: OrgGraphViewportArgs): ViewTransform | null;
//# sourceMappingURL=fitTransform.d.ts.map
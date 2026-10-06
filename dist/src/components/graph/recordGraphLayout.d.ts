import { type FitInset, type ScreenRect } from './org/fitTransform';
export type RecordGraphType = 'person' | 'initiative' | 'work' | 'decision' | 'knowledge' | 'asset';
export type RecordGraphLayout = 'force' | 'radial' | 'hierarchy';
/** One typed org record — the same shape a search read model returns. */
export interface RecordGraphRecord {
    id: string;
    type: RecordGraphType;
    title: string;
    description?: string;
    subtitle?: string;
    /** Raw status ("in_progress", "blocked"). */
    status?: string;
    href: string;
    avatarUrl?: string;
}
/** A directed, labelled relationship. `source`/`target` are `type:id` keys. */
export interface RecordGraphEdge {
    id: string;
    source: string;
    target: string;
    label: string;
}
/**
 * A node's box: the 48px mark, a two-line 13px title and the status line.
 * 140 × 104 since 2.403.2 (was 180 × 116, which with the fixed force distances
 * only read for about a dozen records).
 */
export declare const RECORD_GRAPH_NODE_WIDTH = 140;
export declare const RECORD_GRAPH_NODE_HEIGHT = 104;
/**
 * Fit never zooms out past this: the 13px titles stay at ~10.4px and the 11px
 * edge labels at ~8.8px. A larger set overflows the canvas and the viewer
 * pans; the fit keeps the focus in view (`recordGraphViewport`). 0.7 in
 * 2.403.2–2.403.3 (9.1px titles, 7.7px edge labels); 0.8 since 2.403.4.
 */
export declare const RECORD_GRAPH_MIN_FIT_ZOOM = 0.8;
/** Fit never zooms in past 100% (two records do not become two giant circles). */
export declare const RECORD_GRAPH_MAX_FIT_ZOOM = 1;
/**
 * The automatic fit shows the whole graph when it fits at or above this zoom
 * (13px titles at ~9.1px), and only otherwise falls back to centring on the
 * focus at `RECORD_GRAPH_MIN_FIT_ZOOM`. The radial and hierarchy layouts are
 * sized so a search-page result (~25 records on 1160 × 418) qualifies.
 * Since 2.403.7.
 */
export declare const RECORD_GRAPH_READABLE_ZOOM = 0.7;
/**
 * How far under `RECORD_GRAPH_READABLE_ZOOM` the automatic fit still takes
 * the whole graph (2.407.4): 0.68 draws the 13px titles at ~8.8px, still
 * readable, and a whole-graph fit at 0.694 (Hierarchy, 3 selected, on the
 * 1160 × 583 canvas) is a better opening view than the selection-centred
 * 0.8 frame it fell to, which put an unselected record under the controls.
 */
export declare const RECORD_GRAPH_READABLE_TOLERANCE = 0.02;
/**
 * The automatic fit's second rung (2.403.8): when the whole graph is not
 * readable (`RECORD_GRAPH_READABLE_ZOOM`), the selection and its direct
 * neighbours are framed if they fit at or above this zoom (names ≈ 7.8px).
 */
export declare const RECORD_GRAPH_NEIGHBOURHOOD_ZOOM = 0.6;
/**
 * The hard minimum for keeping the selection whole (2.403.8): a focus fit
 * zooms out below `RECORD_GRAPH_MIN_FIT_ZOOM` as far as this so the selected
 * records' full boxes fit the canvas with a 16px margin; below it only their
 * avatar circles are kept whole. It was also the viewer's whole-graph fit
 * floor in 2.403.8; that is `RECORD_GRAPH_FIT_ALL_MIN_ZOOM` (0.25) since 2.403.9.
 */
export declare const RECORD_GRAPH_FOCUS_MIN_ZOOM = 0.4;
export interface RecordGraphLayoutOptions {
    /** The canvas the layout should fill at a readable zoom, px. Default 1160 × 420. */
    width?: number;
    height?: number;
}
export interface RecordForceParams {
    /** forceLink distance, in simulation units (see `layoutRecordGraph`). */
    linkDistance: number;
    /** forceManyBody strength (negative = repel). */
    charge: number;
    /** forceCollide radius — half a node's width plus a gap, so boxes never overlap. */
    collide: number;
    /** forceX / forceY pull toward the centre, shaped to the canvas's aspect ratio. */
    xStrength: number;
    yStrength: number;
}
/**
 * The force layout's parameters for `count` records on a `width` × `height`
 * canvas, like the org graph's `forceParamsFor`: the canvas at the fit floor
 * (`RECORD_GRAPH_MIN_FIT_ZOOM`) is shared among the records, `spacing =
 * √(area / N)`, and links are ~0.9 of it (clamped 150–260) so a dozen records
 * spread across the canvas while twenty-five pack to a readable zoom rather
 * than to 46%. Collide is fixed by the node box (half its width + a gap), and
 * the x/y pulls are weighted by the aspect ratio so a wide canvas gets a wide
 * layout. Since 2.403.2.
 */
export declare function recordForceParams(count: number, width?: number, height?: number): RecordForceParams;
/**
 * The records a selection-first fit frames: the `focusKeys` that are drawn,
 * plus their direct neighbours over `edges`. Empty when none of the focus is
 * drawn — the host then fits the whole graph. Since 2.403.2.
 */
export declare function recordGraphFitKeys(recordKeys: readonly string[], edges: readonly Pick<RecordGraphEdge, 'source' | 'target'>[], focusKeys: readonly string[] | undefined): string[];
/** Plural labels, in legend/select order. */
export declare const RECORD_GRAPH_TYPES: {
    value: RecordGraphType;
    label: string;
}[];
/** The key a node and a selection hold: `${type}:${id}`. */
export declare function recordGraphKey(record: Pick<RecordGraphRecord, 'id' | 'type'>): string;
/** Deduplicate real records and discard dangling edges after filtering. */
export declare function filterRecordGraph<R extends RecordGraphRecord, E extends RecordGraphEdge>(records: R[], edges: E[], type: RecordGraphType | 'all'): {
    records: R[];
    edges: E[];
};
/** A radial ring plan: `rings` ellipses at k × (stepX, stepY), holding `counts[k-1]` records each. */
export interface RecordRadialRings {
    rings: number;
    stepX: number;
    stepY: number;
    counts: number[];
    /** Whether the outer ring fits the readable area (`RECORD_GRAPH_READABLE_ZOOM`). */
    fits: boolean;
    /**
     * Since 2.406.4: a plan for a set too big to fit at the readable zoom,
     * shaped to the canvas (`fits` is false) — its rings may sit closer than a
     * node box, so its records are placed with the same overlap resolution as
     * a fitting plan.
     */
    shaped?: true;
}
/**
 * Rings for `count` records (one at the centre) on a `width` × `height`
 * canvas. The spacing comes from the node box — 128px between rings
 * vertically, the canvas's aspect (≤ 2.4) sideways — and shrinks only as far
 * as it must for the outer ring's ellipse to sit inside the readable area
 * (`RECORD_GRAPH_READABLE_ZOOM`): the fewest rings that hold everyone, at the
 * widest spacing that fits. Records are shared among the rings in proportion
 * to their perimeters, so the outer ring is not a lone straggler. Past about
 * thirty records nothing fits and the natural spacing is kept (the automatic
 * fit then centres on the focus). Since 2.403.7; was a fixed 128 × 307px step.
 */
export declare function recordRadialRings(count: number, width?: number, height?: number, legendLabels?: readonly string[]): RecordRadialRings;
/**
 * Rendering positions only: never infer an edge from a shared title or type.
 * `options` is the canvas the layout should fill (default 1160 × 420): the
 * force distances, the radial rings' shape and the hierarchy's column height
 * are all sized to it at the fit floor, so the drawing reads without zooming
 * below `RECORD_GRAPH_MIN_FIT_ZOOM`. Since 2.403.7 the radial rings and the
 * hierarchy's columns are sized so a ~25-record result fits whole at
 * `RECORD_GRAPH_READABLE_ZOOM` (`recordRadialRings`).
 */
export declare function layoutRecordGraph(records: Pick<RecordGraphRecord, 'id' | 'type'>[], edges: Pick<RecordGraphEdge, 'source' | 'target'>[], layout: RecordGraphLayout, options?: RecordGraphLayoutOptions): Map<string, {
    x: number;
    y: number;
}>;
/** A pan/zoom viewport in xyflow's terms: screen = flow × zoom + (x, y). */
export interface RecordGraphViewport {
    x: number;
    y: number;
    zoom: number;
}
/**
 * Floor of the whole-graph fit the viewer asks for — "Fit to view" and
 * `RecordGraphHandle.fitAll()` — which, like the org graph's `fitAll`, trades
 * the readability floor for seeing everything at once. Since 2.403.5 (0.5);
 * 0.4 in 2.403.8; 0.25 since 2.403.9, below `RECORD_GRAPH_FOCUS_MIN_ZOOM`, so
 * a short canvas (the 209px expanded-conversation pane) still shows every
 * record. Only a drawing that does not fit even here centres on the focus.
 */
export declare const RECORD_GRAPH_FIT_ALL_MIN_ZOOM = 0.25;
/**
 * The whole-graph fit's hard minimum on a short canvas (2.406.4): where the
 * clear height (the canvas less 24px padding top and bottom) is under
 * `RECORD_GRAPH_SHORT_FIT_CLEAR_HEIGHT` and nothing is selected, a whole-graph
 * fit (`mode: 'all'` at or below `RECORD_GRAPH_FIT_ALL_MIN_ZOOM`, and `auto`
 * with no focus) goes below 0.25 as far as this, so "everything visible"
 * holds for the 270px answer card with 60+ records. With a selection the
 * 0.25 floor and the centre-on-the-selection rule are unchanged.
 */
export declare const RECORD_GRAPH_FIT_ALL_SHORT_MIN_ZOOM = 0.1;
/** Clear height, px, under which the short-canvas fit-all minimum applies. Since 2.406.4. */
export declare const RECORD_GRAPH_SHORT_FIT_CLEAR_HEIGHT = 300;
/**
 * The zoom cluster plus the full-screen button in the canvas's bottom-right
 * corner, margins included (`bottom-3 right-3`, a 34px-tall toolbar about
 * 196px wide). The fit keeps the drawing clear of it. Since 2.403.5.
 */
export declare const RECORD_GRAPH_CONTROLS_SIZE: {
    readonly width: 212;
    readonly height: 48;
};
/**
 * The bottom-left legend's box for these type labels on a `canvasWidth`
 * canvas, margins included: 12px text on a bordered pill (`bottom-3 left-3`),
 * capped at the canvas less 18rem, wrapping into rows past that. An estimate
 * from the label lengths — the fit reserves it before the legend is measured.
 * Since 2.403.5.
 */
export declare function recordGraphLegendSize(labels: readonly string[], canvasWidth: number): {
    width: number;
    height: number;
};
/**
 * Insets that keep the bottom-left legend and the bottom-right controls clear:
 * each corner is reserved along the bottom or its side edge, whichever costs
 * the smaller share of the clear area (the org graph's `reserveCorner`,
 * mirrored for the left corner). On a wide canvas both land on the bottom, so
 * one band clears both. Since 2.403.5.
 *
 * On a short canvas (clear height under 260px) where the two corners' bottom
 * bands would together take more than 40% of the clear height, reserving
 * height is what makes a whole-graph fit impossible (the 209px expanded
 * conversation pane), so each corner is reserved along its side edge — the
 * legend on the left, the controls on the right — and no height is lost. Where
 * those two columns would take more than 60% of the width, a single bottom band
 * as tall as the taller corner clears both instead. Since 2.403.9.
 */
export declare function recordGraphInset(size: {
    width: number;
    height: number;
}, overlays: {
    legend?: {
        width: number;
        height: number;
    } | null;
    controls?: {
        width: number;
        height: number;
    } | null;
}): Required<FitInset>;
export interface RecordGraphViewportOptions {
    /**
     * `focus` frames `focusKeys` + their neighbours (`fitKeys`) when they fit at
     * or above the floor (`minZoom`). Otherwise (2.403.8) it zooms to
     * min(floor, the zoom at which the focus's full boxes fit the canvas with a
     * 16px margin), never below `focusMinZoom`, and centres on the largest of
     * the whole graph, the neighbourhood and the focus itself that fits, per
     * axis — so the focus is never clipped. When the focus's boxes do not fit
     * the clear area they are kept 16px inside the canvas, and below
     * `focusMinZoom` its avatar circles are kept in view (2.403.5). `all` frames
     * the whole graph, centred in the clear area whenever it fits at or above
     * `minZoom` (2.403.9: the focus never moves a drawing that fits); only where
     * it overflows at the floor does it centre on the focus (when `focusKeys`
     * are given, 2.403.8) or align top-left so the viewer pans.
     */
    mode: 'focus' | 'all' | 'auto';
    /**
     * `auto` — the automatic fit ladder (2.403.7, rung (b) since 2.403.8):
     * (a) the whole graph when it fits at or above this zoom; else (b) the focus
     * + neighbours when they fit at or above `neighbourhoodZoom` — unless that
     * frame would hold the whole graph below this zoom (2.407.2: with a focus,
     * fit-all only at or above it, in every layout); else (c) the
     * `focus` rule's selection fit. With no drawn `focusKeys` there is nothing
     * to centre on, so `auto` is `all` down to `fitAllMinZoom` (2.406.3; was
     * `all` at the 0.8 floor, which left 59 records under the legend and zoom
     * cluster on a 270px card canvas). Default `RECORD_GRAPH_READABLE_ZOOM`.
     */
    readableZoom?: number;
    /** Rung (b) of `auto`. Default `RECORD_GRAPH_NEIGHBOURHOOD_ZOOM`. Since 2.403.8. */
    neighbourhoodZoom?: number;
    /**
     * How far `auto` with no focus may zoom out to show every record (the
     * whole-graph fit, corners reserved). Default `RECORD_GRAPH_FIT_ALL_MIN_ZOOM`.
     * Since 2.406.3.
     */
    fitAllMinZoom?: number;
    /** How far a focus fit may zoom out to keep the selection's boxes whole. Default `RECORD_GRAPH_FOCUS_MIN_ZOOM`. Since 2.403.8. */
    focusMinZoom?: number;
    /** The focus records themselves (usually the selection) — never clipped when they fit. */
    focusKeys?: readonly string[];
    /** Focus plus direct neighbours (`recordGraphFitKeys`). Framed first when it fits. */
    fitKeys?: readonly string[];
    /** Screen px kept clear on every side (at least 16). Default 24. */
    padding?: number;
    /**
     * Screen px along each edge taken by an overlay — `recordGraphInset` for the
     * legend and controls. The drawing keeps `padding`, or the inset plus an
     * 8px gap where that is more, from each edge. Since 2.403.5.
     */
    inset?: FitInset;
    /**
     * The overlays' own boxes (2.407.4) — the bottom-left legend and the
     * bottom-right controls, margins included, as `recordGraphInset` was
     * given them. With them, a selection-centred fit on a canvas whose clear
     * height is at least `RECORD_GRAPH_SHORT_FIT_CLEAR_HEIGHT` is shifted,
     * nearest pan first, so no record sits under either while the selected
     * boxes stay whole inside the canvas (the org graph's 2.405.1 rule,
     * `clearOfOverlays`). A record pushed past the canvas edge is fine.
     */
    overlays?: {
        legend?: {
            width: number;
            height: number;
        } | null;
        controls?: {
            width: number;
            height: number;
        } | null;
    };
    minZoom?: number;
    maxZoom?: number;
}
/**
 * The legend's and the controls' screen rectangles on a `size` canvas —
 * bottom-left and bottom-right corners. Since 2.407.4.
 */
export declare function recordGraphOverlayRects(size: {
    width: number;
    height: number;
}, overlays: RecordGraphViewportOptions['overlays']): ScreenRect[];
/**
 * The viewport that fits a laid-out record graph into a `width` × `height`
 * canvas without going below `minZoom` (default `RECORD_GRAPH_MIN_FIT_ZOOM`)
 * or above `maxZoom` (default `RECORD_GRAPH_MAX_FIT_ZOOM`). Pure, so a host or
 * test can check what a fit shows. Null when nothing is positioned or the
 * canvas is unmeasured. Since 2.403.4; `inset` and the circles-first focus
 * fallback since 2.403.5; `mode: 'auto'` (fit everything when it is readable,
 * else focus) since 2.403.7; the selection-never-clipped focus zoom (down to
 * `focusMinZoom`) and `auto`'s neighbourhood rung since 2.403.8; `all`
 * centres a drawing that fits at or above `minZoom` and never applies the
 * focus to it, since 2.403.9.
 */
export declare function recordGraphViewport(positions: ReadonlyMap<string, {
    x: number;
    y: number;
}>, size: {
    width: number;
    height: number;
}, options: RecordGraphViewportOptions): RecordGraphViewport | null;
//# sourceMappingURL=recordGraphLayout.d.ts.map
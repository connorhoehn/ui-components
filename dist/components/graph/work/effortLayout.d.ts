import type { WorkActivityEffort, WorkGraphEdgeData, WorkGraphNodeData } from './types';
/**
 * Floor for a USER zoom-out — wheel, pinch, keyboard, the −/+ buttons. Below
 * this the cards stop being readable, so there is no point letting someone
 * wander down there by hand.
 */
export declare const WORK_CANVAS_MIN_ZOOM = 0.4;
/**
 * Floor for FITTING. Deliberately far below the interactive floor, because a
 * fit clamped to 0.4 is not a fit: at nine parallel efforts — today's real
 * seeded scenario — the graph does not go in the viewport at 0.4, so the top
 * row of cards sat permanently off-screen, "Fit graph" appeared to do nothing,
 * and the only way to see the rest was to discover panning.
 *
 * Fitting and zooming are different intents. "Show me all of it" must be
 * allowed to answer honestly, even when the honest answer is small.
 */
export declare const WORK_CANVAS_FIT_MIN_ZOOM = 0.1;
/**
 * Below this, a fitted graph is a map rather than something you can read — so
 * the canvas points at the accessible list instead of leaving the reader to
 * squint.
 */
export declare const WORK_CANVAS_READABLE_ZOOM = 0.4;
/**
 * The zoom a CAPPED canvas opens at when the whole graph would fit only
 * smaller (realtime-examples Loop 26). Two efforts of a real day are taller
 * than a 1640×960 page's canvas is high, so fitting all of it opened at ~0.4 —
 * cards drawn in 5 px type. A capped canvas exists to be read, so it opens at
 * this zoom (or the width's fit, if smaller) anchored at the top — the newest
 * work — and pans down; "Fit graph" still shows the whole graph. A canvas
 * asked for every effort (`WORK_ACTIVITY_ALL_EFFORTS`) is a map and opens whole.
 */
export declare const WORK_CANVAS_OPEN_ZOOM = 0.8;
/**
 * How many parallel efforts the activity canvas draws at once by default.
 *
 * Two, because the canvas fits everything it is given into one pane: a real
 * nine-effort day fits at roughly 0.12 zoom, which is a map of the work rather
 * than something anyone can read. Two lanes stay legible, and the rest are one
 * menu choice away.
 */
export declare const WORK_ACTIVITY_DEFAULT_MAX_EFFORTS = 2;
/**
 * The "no cap" value for `maxEfforts` — draw every effort, however small that
 * makes them.
 *
 * ZERO is the sentinel, and it is the ONLY one: `undefined` means "the caller
 * did not choose", which takes the default of two, and a non-finite value
 * (`Infinity`) is accepted as a synonym for this because it means the same
 * thing and a host computing a cap arithmetically can land on it honestly.
 * "Show none of the work" is not a state this component has, so zero was free.
 */
export declare const WORK_ACTIVITY_ALL_EFFORTS = 0;
export interface WorkNodeBounds {
    width: number;
    height: number;
}
export interface WorkEffortLayout {
    id: string;
    title: string;
    subtitle?: string;
    x: number;
    y: number;
    width: number;
    height: number;
    collapsedSourceCount: number;
    sourceCount: number;
    vertical: boolean;
    cyclicNodeIds: string[];
    nodes: Array<{
        id: string;
        entityId: string;
        x: number;
        y: number;
        width: number;
        height: number;
    }>;
    edges: Array<{
        id: string;
        entityId: string;
        source: string;
        target: string;
        sourceHandle: string;
        targetHandle: string;
        labelX: number;
        labelY: number;
    }>;
}
export interface EffortLayoutOptions {
    width: number;
    height?: number;
    full?: boolean;
    focusedEffortId?: string | null;
    expandedSourceEfforts?: readonly string[];
    reversedEdgeIds?: readonly string[];
    /** Measured complete node bounds, keyed by canonical entity. */
    measurements?: ReadonlyMap<string, WorkNodeBounds>;
    /** Canonical edges that will draw a pill, so their lane is reserved. */
    labelledEdgeIds?: readonly string[];
    /** Internal second-pass compaction; expanded sources always take precedence. */
    foldedForHeight?: readonly string[];
}
export interface LimitEffortsOptions {
    /**
     * How many efforts may be drawn. Defaults to
     * `WORK_ACTIVITY_DEFAULT_MAX_EFFORTS` (2). `WORK_ACTIVITY_ALL_EFFORTS` (0),
     * a negative number, or a non-finite one means no cap at all.
     */
    max?: number;
    /**
     * An effort that must survive the cap whatever its age — the one the current
     * focus or selection is inside. Hiding the work someone is looking at is the
     * one thing a display filter must never do, so this effort takes the place of
     * the oldest effort that would otherwise have been shown.
     */
    keepEffortId?: string | null;
    /**
     * Keep the newest effort that holds something the person MADE (a document —
     * a deck, a page) in view even when newer run-only efforts outnumber the cap.
     * A deck saved a minute ago sat behind two probe runs and was a click away
     * rather than drawn (realtime-examples NFR #221 follow-up). Default true;
     * the selection's `keepEffortId` still wins over it.
     */
    keepLatestMade?: boolean;
}
/**
 * The newest `max` efforts, in the order the host gave them — except that,
 * unless `keepLatestMade` is false, the newest effort holding a document takes
 * the last place when none of the newest does.
 *
 * Recency is the latest `updatedAt`/`startedAt` across an effort's own nodes,
 * which is the same "newest work first" rule the panel footer already claims;
 * hosts that already sort newest-first therefore get exactly their own first N.
 * The RESULT keeps source order rather than recency order, because the canvas
 * treats effort order as stable — a heartbeat must not make two lanes swap
 * places.
 */
export declare function limitWorkEfforts(efforts: readonly WorkActivityEffort[], nodes: readonly WorkGraphNodeData[], options?: LimitEffortsOptions): WorkActivityEffort[];
/** No inferred edges or connected-component grouping: membership is explicit. */
export declare function layoutWorkEfforts(nodes: readonly WorkGraphNodeData[], edges: readonly WorkGraphEdgeData[], efforts: readonly WorkActivityEffort[], options: EffortLayoutOptions): WorkEffortLayout[];
//# sourceMappingURL=effortLayout.d.ts.map
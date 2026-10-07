import { type Simulation } from 'd3-force';
import type { GraphNode, GraphLink, GraphPerson, GraphRelationship, GraphDepartment } from './types';
export type LayoutMode = 'force' | 'radial';
export interface UseForceLayoutProps {
    people: GraphPerson[];
    relationships: GraphRelationship[];
    departments: GraphDepartment[];
    width: number;
    height: number;
    layout?: LayoutMode;
    /**
     * The drawn radius of a person, so the collide force keeps each circle AND
     * its label clear of its neighbours. Read when the simulation starts (a new
     * function each render does not restart it). Default: the old
     * influence-based radius, `15 + influence × 20`. Since 2.403.1.
     */
    nodeRadiusOf?: (person: GraphPerson) => number;
}
export interface UseForceLayoutReturn {
    nodes: GraphNode[];
    links: Array<{
        source: GraphNode;
        target: GraphNode;
        type: string;
        strength: number;
    }>;
    isDone: boolean;
    /**
     * True once the layout has visibly settled (force: alpha below
     * `SETTLED_ALPHA`; radial: immediately) — earlier than `isDone`, which waits
     * for d3's alphaMin. The moment to frame the viewport. Since 2.403.1.
     */
    isSettled: boolean;
}
/** Vertical room a node's first-name label needs below its circle (10px text + gap). */
export declare const ORG_LABEL_BAND = 18;
/** Alpha below which the force layout counts as settled for framing. */
export declare const SETTLED_ALPHA = 0.05;
export interface OrgForceParams {
    /** forceLink distance, px. */
    linkDistance: number;
    /** Multiplier on each relationship's strength for forceLink's stiffness. */
    linkStiffness: number;
    /** forceManyBody strength (negative = repel). */
    charge: number;
    /** Added to each node's radius for forceCollide — label room for small graphs. */
    collidePadding: number;
    /** forceX / forceY pull toward the department cell. */
    xStrength: number;
    yStrength: number;
    /** Half-width of the random scatter around a department cell at start, px. */
    jitter: number;
}
/**
 * The simulation's forces for `count` people on a `width` × `height` canvas,
 * so any drawn set fills the area without overlapping. The per-node share of
 * the canvas, `spacing = √(area / count)`, sets the scale: links are ~0.7 of
 * it and the charge grows with its square, so eleven people spread as far as
 * fifty-six do instead of collapsing into a blob. For a small set (≤ 40)
 * links go soft — a star of one person and ten neighbours otherwise stays a
 * ring one link long — collide reserves the label band, and the x/y pulls are
 * weighted by the aspect ratio so a wide canvas gets a wide layout. Larger
 * sets keep the tight original packing: at 56 people on a typical canvas
 * the numbers land where the original fixed tuning was (distance 80,
 * charge −200, link stiffness 0.3, x/y 0.1).
 */
export declare function forceParamsFor(count: number, width: number, height: number): OrgForceParams;
/**
 * The force simulation for a drawn set, built but not yet ticking in any
 * particular way — the hook animates it; a test can `stop()` it and `tick(n)`.
 * Internal to the org graph (not on the barrel).
 */
export declare function createOrgSimulation({ people, relationships, departments, width, height, nodeRadiusOf, }: Omit<UseForceLayoutProps, 'layout'>): {
    sim: Simulation<GraphNode, undefined>;
    simNodes: GraphNode[];
    simLinks: GraphLink[];
    params: OrgForceParams;
};
/**
 * Each department's cell centre on a `width` × `height` canvas. The grid is
 * shaped to the canvas (2.403.2): `cols ≈ √(departments × aspect)`, so six
 * departments are 3 × 2 on a 16:9 canvas but 4 + 2 on a 3:1 strip — the
 * pulls then spread the org along the width. A short last row is centred.
 */
export declare function orgDepartmentCells(names: readonly string[], width: number, height: number): Map<string, {
    x: number;
    y: number;
}>;
/** The radial layout's rings: how many, and their semi-axis step on each axis. */
export interface OrgRadialRings {
    /** Ring count (the centre person is not a ring). */
    rings: number;
    /** Semi-axes of ring k are `k × stepX`, `k × stepY`. */
    stepX: number;
    stepY: number;
    /** People on each ring, inner first. */
    counts: number[];
    /** True when the outer ring fits inside the `width` × `height` area. */
    fits: boolean;
}
/**
 * Rings for `count` people on a `width` × `height` area (OrgGraph passes its
 * clear area at the automatic fit floor). The rings are ellipses shaped to the
 * area's width:height, and their spacing comes from the head count: the
 * fewest rings whose perimeters hold everyone with the outer ring inside the
 * area's shorter half-dimension, keeping `minArc` between neighbours along a
 * ring and `minGap` between rings. When no ring count fits, the rings keep
 * their shape at the least spacing that holds everyone (the most compact
 * overflow) and "Fit to view" zooms out to it. Since 2.403.5 (was fixed
 * circles 130–680px apart, which on a 1160 × 400 canvas spanned 244% of its
 * height).
 */
export declare function orgRadialRings(count: number, width: number, height: number, opts?: {
    maxRadius?: number;
}): OrgRadialRings;
export declare function useForceLayout({ people, relationships, departments, width, height, layout, nodeRadiusOf }: UseForceLayoutProps): UseForceLayoutReturn;
//# sourceMappingURL=useForceLayout.d.ts.map
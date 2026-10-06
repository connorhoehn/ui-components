export interface GraphNode {
    id: string;
    label: string;
    /** Shown on hover (`<title>`) and, for the centre node, under the label. */
    sublabel?: string;
    /**
     * Colour / legend bucket. `'center'` is special: the radial layout puts that
     * node in the middle and the legend leaves it out.
     */
    group?: string;
    /** Relative importance; scales the node radius and picks the radial centre when no node is `'center'`. */
    weight?: number;
    avatarUrl?: string;
    /** Overrides the group colour with any CSS colour. */
    color?: string;
}
export interface GraphEdge {
    from: string;
    to: string;
    label?: string;
    /** Scales the stroke width. */
    weight?: number;
}
export type GraphLayout = 'radial' | 'grid' | 'force';
export interface GraphPoint {
    x: number;
    y: number;
}
//# sourceMappingURL=types.d.ts.map
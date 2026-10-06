import type { GraphPerson, GraphRelationship } from './types';
export interface FocusOrgGraphOptions {
    /** How far out from the focus set to keep people. Default 1 (direct neighbours). */
    hops?: number;
    /** Drop relationships weaker than this before anything else. Default 0 (keep all). */
    minStrength?: number;
    /**
     * Keep at most this many relationships per person, strongest first (an edge
     * stays while either end is under the cap). Applied BEFORE the neighbourhood
     * walk, so a focused person's neighbours are their strongest K. Default: no cap.
     */
    topK?: number;
}
export interface FocusedOrgGraph {
    people: GraphPerson[];
    relationships: GraphRelationship[];
}
/**
 * The people within `hops` of `focusIds` over `relationships`, and the
 * relationships among them. Focus ids that name no one in `people` are
 * ignored; an empty (or wholly unknown) focus returns the whole graph, with
 * `minStrength`/`topK` still applied. Input order is preserved.
 */
export declare function focusOrgGraph(people: readonly GraphPerson[], relationships: readonly GraphRelationship[], focusIds: ReadonlySet<string> | readonly string[] | null | undefined, { hops, minStrength, topK }?: FocusOrgGraphOptions): FocusedOrgGraph;
//# sourceMappingURL=focusOrgGraph.d.ts.map
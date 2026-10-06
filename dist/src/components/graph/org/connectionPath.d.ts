import type { GraphPerson, GraphRelationship } from './types';
export interface PathHop {
    person: GraphPerson;
    /** Edge type connecting this person to the PREVIOUS hop (empty for hop 0). */
    viaType: string;
}
export declare const PATH_TYPE_LABELS: Record<string, string>;
/**
 * Shortest path between two people over the full (unfiltered) edge set —
 * paths are allowed to cross relationship types the current view hides,
 * because "how are these two connected at all?" is the actual question.
 */
export declare function findConnectionPath(people: GraphPerson[], edges: GraphRelationship[], fromId: string, toId: string): PathHop[] | null;
//# sourceMappingURL=connectionPath.d.ts.map
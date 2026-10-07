export type NodeCategory = 'source' | 'transform' | 'ai' | 'control' | 'sink' | 'human';
/**
 * Category assignment for every node type registered in `nodeTypes`
 * (see ./index.ts). Keys are the exact React Flow type strings.
 */
export declare const NODE_CATEGORIES: Record<string, NodeCategory>;
/** Look up the category for a node type; undefined for unknown types. */
export declare function categoryFor(nodeType: string): NodeCategory | undefined;
//# sourceMappingURL=categories.d.ts.map
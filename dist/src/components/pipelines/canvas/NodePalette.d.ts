import { type NodeCategory } from '../nodes/categories';
import type { NodeType } from '../../../types/pipeline';
export interface NodePaletteProps {
    /** Types that already exist once and cannot be added again (e.g. Trigger). */
    disabledTypes?: NodeType[];
    /**
     * The kinds in the pipeline currently open. When given, the pinned top
     * section becomes "Relevant here" — computed from THIS pipeline — instead of
     * the global recently-used list, which is shared across every pipeline and so
     * offered a document review pipeline the image nodes last touched somewhere
     * else. Omit it and the recents behaviour is unchanged.
     */
    contextTypes?: readonly string[];
    /**
     * Step kinds the SERVER can execute that are not built-in node types —
     * `transcript:store`, `media:classify`, and the other ~50 platform-api
     * registers. The palette's own catalog is the library's types only, so
     * without these it lists mostly things a document or transcript pipeline
     * never uses while omitting everything it is actually built from.
     *
     * Grouped into one section per namespace, after the built-in categories.
     */
    serverKinds?: readonly string[];
}
export interface PaletteItem {
    type: NodeType;
    icon: string;
    name: string;
    description: string;
    /** Category key, used for filter chip matching. */
    category: string;
    /** Node-category key from NODE_CATEGORIES (drives the accent color). */
    nodeCategory?: NodeCategory;
}
export declare const PALETTE_ITEMS: ReadonlyArray<{
    type: NodeType;
    name: string;
}>;
/**
 * Record that a node of `type` was added. Prepends to the ring buffer (max 5,
 * MRU order, no duplicates). Call this from the consumer's addNode handler.
 */
export declare function recordRecentType(type: NodeType): void;
export default function NodePalette({ disabledTypes, contextTypes, serverKinds, }: NodePaletteProps): import("react").JSX.Element;
//# sourceMappingURL=NodePalette.d.ts.map
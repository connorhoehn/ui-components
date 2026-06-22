import { NodeCategory } from '../nodes/categories';
import { NodeType } from '../../../types/pipeline';
export interface NodePaletteProps {
    /** Types that already exist once and cannot be added again (e.g. Trigger). */
    disabledTypes?: NodeType[];
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
export default function NodePalette({ disabledTypes }: NodePaletteProps): import("react").JSX.Element;
//# sourceMappingURL=NodePalette.d.ts.map
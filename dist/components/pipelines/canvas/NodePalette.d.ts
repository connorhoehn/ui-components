import type { NodeType } from '../../../types/pipeline';
export interface NodePaletteProps {
    /** Types that already exist once and cannot be added again (e.g. Trigger). */
    disabledTypes?: NodeType[];
}
/**
 * Flat ordered list of palette items in the same order they appear in the
 * sidebar. The 1-8 keyboard shortcut maps `digit (key - 1)` → this array.
 * Exported so PipelineCanvas can import it without re-flattening categories.
 */
export declare const PALETTE_ITEMS: ReadonlyArray<{
    type: NodeType;
    name: string;
}>;
export default function NodePalette({ disabledTypes }: NodePaletteProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=NodePalette.d.ts.map
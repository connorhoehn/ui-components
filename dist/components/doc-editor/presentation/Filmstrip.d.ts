import { type PresenceUser } from '../../shared/PresenceAvatars';
import { type SlideListItem } from './SlideList';
import type { SlideRowProps } from './SlideRow';
/** A slide the renderer appends to the deck (the Sources slide): shown, counted, not editable. */
export interface FilmstripGeneratedItem {
    id: string;
    title: string;
    thumbnailSvg?: string;
}
/** One slide in the strip. Takes `SlideRowProps` so both lists can render it. */
export declare function FilmstripThumb({ slide, index, total, thumbnailSvg, selected, uncited, changed, generating, viewers, readOnly, onSelect, onMove, onDuplicate, onDelete, canDuplicate, canDelete, dragHandle, rowRef, dragging, testIdPrefix, }: SlideRowProps): import("react").JSX.Element;
export interface FilmstripProps {
    items: readonly SlideListItem[];
    selectedId: string;
    onSelect: (id: string) => void;
    onMove: (from: number, to: number) => void;
    onDuplicate: (id: string) => void;
    onDelete: (id: string) => void;
    /** Renders the dashed "Add slide" card at the end. */
    onAdd?: () => void;
    /** False at the deck's slide cap: no add, no duplicate. */
    canAdd?: boolean;
    /**
     * Slides the agent is rewriting (`Generating…` on the thumb) or creating
     * (an id not in `items` becomes a placeholder card at the end).
     */
    generatingSlideIds?: readonly string[];
    /**
     * Slides the renderer appends after the deck's own (the Sources slide):
     * numbered on from `items`, selectable, locked. Since 2.384.1.
     */
    generatedItems?: readonly FilmstripGeneratedItem[];
    /** Slide id → the other people on that slide (live presence). Since 2.371.0. */
    slideViewers?: Readonly<Record<string, readonly PresenceUser[]>>;
    readOnly?: boolean;
    className?: string;
    /** Prefix for every row's test ids. Default `filmstrip`. */
    testIdPrefix?: string;
}
export declare function Filmstrip({ items, selectedId, onSelect, onMove, onDuplicate, onDelete, onAdd, canAdd, generatingSlideIds, generatedItems, slideViewers, readOnly, className, testIdPrefix, }: FilmstripProps): import("react").JSX.Element;
export default Filmstrip;
//# sourceMappingURL=Filmstrip.d.ts.map
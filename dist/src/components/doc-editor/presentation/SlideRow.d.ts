import type { PresenceUser } from '../../shared/PresenceAvatars';
import type { ReactNode, Ref } from 'react';
import type { DeckSlide } from './deckSpec';
export interface SlideRowProps {
    slide: DeckSlide;
    /** 0-based position in the deck; the row displays `index + 1`. */
    index: number;
    total: number;
    /** The generator's SVG for this slide, when a preview has been rendered. */
    thumbnailSvg?: string;
    selected: boolean;
    /** The slide cites nothing, so the deck cannot be saved while it is here. */
    uncited: boolean;
    /** The agent's last edit touched this slide — marked until the next one. */
    changed?: boolean;
    /** An agent edit to this slide is in flight. */
    generating?: boolean;
    /** Other people whose selected slide this is (live presence). Since 2.371.0. */
    viewers?: readonly PresenceUser[];
    readOnly?: boolean;
    onSelect: (id: string) => void;
    onMove: (from: number, to: number) => void;
    onDuplicate: (id: string) => void;
    onDelete: (id: string) => void;
    /** False at the deck's slide cap. */
    canDuplicate: boolean;
    /** False on the last remaining slide. */
    canDelete: boolean;
    /** Supplied by the sortable list; absent in the plain fallback. */
    dragHandle?: ReactNode;
    /** The sortable list's node ref. */
    rowRef?: Ref<HTMLLIElement>;
    dragging?: boolean;
    testIdPrefix: string;
}
export declare function SlideRow({ slide, index, total, thumbnailSvg, selected, uncited, changed, readOnly, onSelect, onMove, onDuplicate, onDelete, canDuplicate, canDelete, dragHandle, rowRef, dragging, testIdPrefix, }: SlideRowProps): import("react").JSX.Element;
export default SlideRow;
//# sourceMappingURL=SlideRow.d.ts.map
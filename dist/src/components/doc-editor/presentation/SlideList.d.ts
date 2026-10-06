import type { ComponentType } from 'react';
import { type SlideRowProps } from './SlideRow';
import type { DeckSlide } from './deckSpec';
export interface SlideListItem {
    slide: DeckSlide;
    /** The generator's SVG for this slide, when one has been rendered. */
    thumbnailSvg?: string;
    uncited: boolean;
    /** The agent's last edit touched it. */
    changed?: boolean;
    /** An agent edit to it is in flight. */
    generating?: boolean;
    /** Other people on this slide (live presence). Since 2.371.0. */
    viewers?: SlideRowProps['viewers'];
}
export interface SlideListProps {
    items: readonly SlideListItem[];
    selectedId: string;
    readOnly?: boolean;
    onSelect: (id: string) => void;
    onMove: (from: number, to: number) => void;
    onDuplicate: (id: string) => void;
    onDelete: (id: string) => void;
    /** False at the deck's slide cap — duplicating would exceed it. */
    canDuplicate: boolean;
    /**
     * What each row looks like. Default `SlideRow` (the list rail);
     * `Filmstrip` passes its 16:9 thumbnail. Same props either way, so the drag
     * list and the plain fallback cannot drift apart.
     */
    rowComponent?: ComponentType<SlideRowProps>;
    /** Extra classes on the `<ol>`. */
    listClassName?: string;
    testIdPrefix: string;
}
export declare function SlideList({ items, selectedId, readOnly, onSelect, onMove, onDuplicate, onDelete, canDuplicate, rowComponent: Row, listClassName, testIdPrefix, }: SlideListProps): import("react").JSX.Element;
export default SlideList;
//# sourceMappingURL=SlideList.d.ts.map
// The slide rail's list, without drag.
//
// This is both a component and the fallback: `SortableSlideList` is reached
// through `React.lazy` so that `@dnd-kit` — an OPTIONAL peer — never becomes a
// static import of the root bundle, and this renders in its place while that
// chunk loads or if it cannot be loaded at all.
//
// Which means reordering must work WITHOUT a pointer gesture, not merely as a
// concession to screen readers: every row carries move-up and move-down
// buttons, and they are the only reorder path a keyboard user, or a consumer
// who never installed `@dnd-kit`, ever has. Drag is the enhancement.

import { SlideRow } from './SlideRow';
import type { DeckSlide } from './deckSpec';

export interface SlideListItem {
  slide: DeckSlide;
  /** The generator's SVG for this slide, when one has been rendered. */
  thumbnailSvg?: string;
  uncited: boolean;
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
  testIdPrefix: string;
}

export function SlideList({
  items,
  selectedId,
  readOnly = false,
  onSelect,
  onMove,
  onDuplicate,
  onDelete,
  canDuplicate,
  testIdPrefix,
}: SlideListProps) {
  return (
    <ol className="m-0 flex list-none flex-col gap-1 p-0" data-testid={`${testIdPrefix}-list`}>
      {items.map((item, index) => (
        <SlideRow
          key={item.slide.id}
          slide={item.slide}
          index={index}
          total={items.length}
          thumbnailSvg={item.thumbnailSvg}
          selected={item.slide.id === selectedId}
          uncited={item.uncited}
          readOnly={readOnly}
          onSelect={onSelect}
          onMove={onMove}
          onDuplicate={onDuplicate}
          onDelete={onDelete}
          canDuplicate={canDuplicate}
          canDelete={items.length > 1}
          testIdPrefix={testIdPrefix}
        />
      ))}
    </ol>
  );
}

export default SlideList;

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

import type { ComponentType } from 'react';
import { cn } from '../../../lib/cn';
import { SlideRow, type SlideRowProps } from './SlideRow';
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

export function SlideList({
  items,
  selectedId,
  readOnly = false,
  onSelect,
  onMove,
  onDuplicate,
  onDelete,
  canDuplicate,
  rowComponent: Row = SlideRow,
  listClassName,
  testIdPrefix,
}: SlideListProps) {
  return (
    <ol className={cn('m-0 flex list-none flex-col gap-1 p-0', listClassName)} data-testid={`${testIdPrefix}-list`}>
      {items.map((item, index) => (
        <Row
          key={item.slide.id}
          slide={item.slide}
          index={index}
          total={items.length}
          thumbnailSvg={item.thumbnailSvg}
          selected={item.slide.id === selectedId}
          uncited={item.uncited}
          changed={item.changed}
          generating={item.generating}
          viewers={item.viewers}
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

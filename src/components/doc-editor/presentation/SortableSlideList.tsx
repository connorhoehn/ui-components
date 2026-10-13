// The slide rail's list, with drag-to-reorder.
//
// Same rows as `SlideList`, wrapped in the library's existing drag-and-drop
// primitive — `@dnd-kit`, as `DocumentTypeWizard` uses it, down to the sensor
// configuration so a drag feels the same in both places.
//
// ## Why this is its own module
//
// `@dnd-kit/*` are OPTIONAL peers (see the externals list in vite.config.ts).
// They became a hard runtime requirement of `./doc-types` the moment that
// entry shipped the wizard, and a consumer who had not installed them got
// `ERR_MODULE_NOT_FOUND` on import. `PresentationEditor` is exported from the
// ROOT entry, where that failure would hit every consumer of the library
// rather than one subpath — so the three packages are reached only through
// `React.lazy(() => import('./SortableSlideList'))`, which rollup emits as a
// separate chunk. An app that never opens a presentation never loads it.
//
// ## Why nothing moves under the pointer
//
// `useSortable` hands back a `transform` that is conventionally applied as an
// inline `style`. Inline styles are banned in this library outside a
// grandfathered allowlist, and a transform is exactly the kind of thing the
// allowlist exists for — but the affordance survives without it: the dragged
// row dims, the row under the pointer shows an insertion edge, and the list
// settles into its new order on drop. What is lost is the live preview of the
// gesture, which is a smaller loss than a new file on the styling-escape
// hatch list.

import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { cn } from '../../../lib/cn';
import { SlideRow } from './SlideRow';
import type { SlideListItem, SlideListProps } from './SlideList';

interface SortableRowProps extends Omit<SlideListProps, 'items' | 'testIdPrefix'> {
  item: SlideListItem;
  index: number;
  total: number;
  testIdPrefix: string;
}

function SortableRow({
  item,
  index,
  total,
  selectedId,
  readOnly,
  onSelect,
  onMove,
  onDuplicate,
  onDelete,
  canDuplicate,
  rowComponent: Row = SlideRow,
  testIdPrefix,
}: SortableRowProps) {
  const { attributes, listeners, setNodeRef, isDragging, isOver } = useSortable({ id: item.slide.id });
  return (
    <Row
      slide={item.slide}
      index={index}
      total={total}
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
      canDelete={total > 1}
      testIdPrefix={testIdPrefix}
      rowRef={setNodeRef}
      dragging={isDragging}
      dragHandle={
        <button
          type="button"
          title="Drag to reorder slides"
          aria-label={`Reorder slide ${index + 1}`}
          data-testid={`${testIdPrefix}-drag-handle-${item.slide.id}`}
          {...attributes}
          {...listeners}
          className={cn(
            // 12px: a control's glyph on the meta step (11px before 2.441.7).
            'mt-1 shrink-0 cursor-grab select-none touch-none border-none bg-transparent px-0.5 text-xs leading-none text-text-tertiary',
            isOver && !isDragging && 'text-info',
          )}
        >
          ⋮⋮
        </button>
      }
    />
  );
}

export function SortableSlideList({
  items,
  selectedId,
  readOnly = false,
  onSelect,
  onMove,
  onDuplicate,
  onDelete,
  canDuplicate,
  rowComponent,
  listClassName,
  testIdPrefix,
}: SlideListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const ids = items.map((item) => item.slide.id);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    const from = ids.indexOf(String(active.id));
    const to = ids.indexOf(String(over.id));
    if (from === -1 || to === -1 || from === to) return;
    onMove(from, to);
  };

  const list = (
    <ol className={cn('m-0 flex list-none flex-col gap-1 p-0', listClassName)} data-testid={`${testIdPrefix}-list`}>
      {items.map((item, index) => (
        <SortableRow
          key={item.slide.id}
          item={item}
          index={index}
          total={items.length}
          selectedId={selectedId}
          readOnly={readOnly}
          onSelect={onSelect}
          onMove={onMove}
          onDuplicate={onDuplicate}
          onDelete={onDelete}
          canDuplicate={canDuplicate}
          {...(rowComponent ? { rowComponent } : {})}
          testIdPrefix={testIdPrefix}
        />
      ))}
    </ol>
  );

  // A read-only rail still lists the slides; it just has nothing to reorder,
  // and mounting the sensors would put grab cursors on a surface that cannot
  // be changed.
  if (readOnly) return list;

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={ids} strategy={verticalListSortingStrategy}>
        {list}
      </SortableContext>
    </DndContext>
  );
}

export default SortableSlideList;

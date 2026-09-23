// One row of the slide rail: a thumbnail, its number, its title, its controls.
//
// Split out of the rail so the two list implementations — the plain one and
// the drag-sortable one behind `React.lazy` — render the SAME row. Without
// that, the fallback a consumer without `@dnd-kit` sees would be a different
// component with its own drift.
//
// The row carries an UNCITED marker rather than only colouring itself. A slide
// with no source cannot be saved, and the rail is where you find which slide
// that is when the deck is thirty long; a red tint at the far left of a
// scrolling list is not findable.

import type { ReactNode, Ref } from 'react';
import { cn } from '../../../lib/cn';
import { IconButton } from '../../ui/IconButton';
import { Text } from '../../shared/Text';
import { svgDataUri } from './svgPreview';
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

function UpIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M4 10l4-4 4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DownIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" />
      <path d="M10.5 2.5h-8v8" strokeLinecap="round" />
    </svg>
  );
}

function RemoveIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M4 4l8 8M12 4l-8 8" strokeLinecap="round" />
    </svg>
  );
}

export function SlideRow({
  slide,
  index,
  total,
  thumbnailSvg,
  selected,
  uncited,
  changed = false,
  readOnly = false,
  onSelect,
  onMove,
  onDuplicate,
  onDelete,
  canDuplicate,
  canDelete,
  dragHandle,
  rowRef,
  dragging = false,
  testIdPrefix,
}: SlideRowProps) {
  const thumbnail = svgDataUri(thumbnailSvg);
  return (
    <li
      ref={rowRef}
      data-testid={`${testIdPrefix}-row-${slide.id}`}
      data-slide-id={slide.id}
      data-changed={changed ? 'true' : undefined}
      className={cn(
        'flex items-start gap-1.5 rounded-lg border p-1.5 transition-colors',
        selected ? 'border-info bg-info-bg' : changed ? 'border-success bg-success-bg' : 'border-transparent hover:bg-surface-hover',
        dragging && 'opacity-40',
      )}
    >
      {!readOnly && (dragHandle ?? <span className="w-0" aria-hidden="true" />)}

      <button
        type="button"
        onClick={() => onSelect(slide.id)}
        aria-current={selected ? 'true' : undefined}
        data-testid={`${testIdPrefix}-select-${slide.id}`}
        className="flex min-w-0 flex-1 cursor-pointer items-start gap-2 border-none bg-transparent p-0 text-left font-[inherit]"
      >
        <span className="w-4 shrink-0 pt-0.5 text-[11px] tabular-nums text-text-tertiary">{index + 1}</span>
        <span className="flex h-11 w-[4.5rem] shrink-0 items-center justify-center overflow-hidden rounded border border-border bg-surface-hover/50">
          {thumbnail ? (
            <img
              src={thumbnail}
              alt=""
              className="h-full w-full object-contain"
              data-testid={`${testIdPrefix}-thumb-${slide.id}`}
            />
          ) : (
            <Text className="text-[9px] text-text-tertiary">no preview</Text>
          )}
        </span>
        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
          <Text as="span" className="truncate text-[12px] font-medium text-text-primary">
            {slide.title || 'Untitled slide'}
          </Text>
          <Text as="span" className="text-[10px] text-text-tertiary">{slide.layout}</Text>
          {changed && (
            <Text
              as="span"
              className="text-[10px] font-semibold text-success-fg"
              data-testid={`${testIdPrefix}-changed-${slide.id}`}
            >
              Edited by agent
            </Text>
          )}
          {uncited && (
            <Text
              as="span"
              className="text-[10px] font-semibold text-danger-fg"
              data-testid={`${testIdPrefix}-uncited-${slide.id}`}
            >
              No source
            </Text>
          )}
        </span>
      </button>

      {!readOnly && (
        <span className="flex shrink-0 flex-col gap-0.5">
          <span className="flex gap-0.5">
            <IconButton
              aria-label={`Move slide ${index + 1} up`}
              variant="ghost"
              size="sm"
              icon={<UpIcon />}
              disabled={index === 0}
              onClick={() => onMove(index, index - 1)}
              data-testid={`${testIdPrefix}-up-${slide.id}`}
            />
            <IconButton
              aria-label={`Move slide ${index + 1} down`}
              variant="ghost"
              size="sm"
              icon={<DownIcon />}
              disabled={index >= total - 1}
              onClick={() => onMove(index, index + 1)}
              data-testid={`${testIdPrefix}-down-${slide.id}`}
            />
          </span>
          <span className="flex gap-0.5">
            <IconButton
              aria-label={`Duplicate slide ${index + 1}`}
              variant="ghost"
              size="sm"
              icon={<CopyIcon />}
              disabled={!canDuplicate}
              onClick={() => onDuplicate(slide.id)}
              data-testid={`${testIdPrefix}-duplicate-${slide.id}`}
            />
            <IconButton
              aria-label={`Delete slide ${index + 1}`}
              variant="ghost"
              size="sm"
              icon={<RemoveIcon />}
              disabled={!canDelete}
              onClick={() => onDelete(slide.id)}
              data-testid={`${testIdPrefix}-delete-${slide.id}`}
            />
          </span>
        </span>
      )}
    </li>
  );
}

export default SlideRow;

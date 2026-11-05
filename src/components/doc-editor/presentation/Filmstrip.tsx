// The slide filmstrip: numbered 16:9 thumbnails down the left of the
// presentation editor, in place of the list rail (`SlideRow`).
//
// ## The thumbnails are the generator's
//
// Each thumbnail is the SVG the platform rendered for that slide — the same
// picture the stage shows, scaled down — so the strip never draws a second
// opinion of a slide. A slide with no render yet (it cites nothing, or the
// deck has not been drawn) shows its title on a blank card instead of an
// empty box.
//
// ## Same rows, same drag
//
// `FilmstripThumb` takes exactly `SlideRowProps`, so it plugs into the
// existing `SlideList` / lazy `SortableSlideList` pair through their
// `rowComponent` prop. Drag-to-reorder is that list's `@dnd-kit` drag — still
// an optional peer reached only through `React.lazy` — and the plain list is
// the fallback while it loads or when it is not installed.
//
// Moving, duplicating and deleting live in a ⋯ menu revealed on hover or
// focus, because four icon buttons on every 16:9 thumbnail crowd the picture
// the strip exists to show. The menu is a real `role="menu"`, so none of it is
// pointer-only; ↑/↓ move the selection and Alt+↑/↓ move the slide.
//
// ## `Generating…`
//
// A slide id in `generatingSlideIds` is being rewritten by the agent: its
// thumbnail dims under a quiet "Generating…" label and the row is
// `aria-busy`. An id that is not in the deck yet is a slide the agent is
// creating — it is shown as a placeholder card after the last slide until the
// real slide arrives. Nothing here invents progress; the host passes ids only
// while a request is actually in flight (`useDeckReviseStatus`).
//
// ## Generated slides (2.384.1)
//
// `generatedItems` are the slides the renderer appends to the deck — the
// Sources slide — shown after the deck's own slides and numbered on from them,
// so the strip counts what the revision, the `.pptx` and the reader count.
// They select like any thumb (the stage shows the renderer's picture) but
// carry no drag handle and no ⋯ menu, and a lock marks them: nothing here can
// change them, the slides' citations do.
//
// ## Who is on which slide
//
// `slideViewers` maps a slide id to the other people whose selected slide it
// is (the host reads it from live presence). Their avatars sit small in the
// thumbnail's top-left corner, opposite the ⋯ menu; the row names them for
// screen readers. Display only — the shell's byline owns follow and jump.

import {
  Suspense,
  lazy,
  useEffect,
  useMemo,
  useRef,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react';
import { cn } from '../../../lib/cn';
import { Button } from '../../ui/Button';
import { PlusIcon } from '../../ui/Icons';
import { DropdownMenu, type DropdownMenuItem } from '../../shared/DropdownMenu';
import { Text } from '../../shared/Text';
import { PresenceAvatars, type PresenceUser } from '../../shared/PresenceAvatars';
import SlideList, { type SlideListItem } from './SlideList';
import type { SlideRowProps } from './SlideRow';
import { svgDataUri } from './svgPreview';
import { SLIDE_LAYOUT_LABELS } from './deckSpec';

const SortableSlideList = lazy(() => import('./SortableSlideList'));

/** The row for a slide id, without `CSS.escape` (absent in some test DOMs). */
function rowFor(root: HTMLElement | null, id: string): HTMLElement | undefined {
  if (!root) return undefined;
  return Array.from(root.querySelectorAll<HTMLElement>('[data-slide-id]')).find((el) => el.dataset.slideId === id);
}

function focusThumb(root: HTMLElement | null, id: string) {
  rowFor(root, id)?.querySelector<HTMLElement>('[data-filmstrip-select]')?.focus();
}

function LockGlyph() {
  return (
    <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="3.5" y="7" width="9" height="6.5" rx="1.2" />
      <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" strokeLinecap="round" />
    </svg>
  );
}

/** A slide the renderer appends to the deck (the Sources slide): shown, counted, not editable. */
export interface FilmstripGeneratedItem {
  id: string;
  title: string;
  thumbnailSvg?: string;
}

interface FilmstripGeneratedThumbProps {
  item: FilmstripGeneratedItem;
  /** 0-based position in the whole strip. */
  index: number;
  selected: boolean;
  viewers?: readonly PresenceUser[];
  onSelect: (id: string) => void;
  testIdPrefix: string;
}

/** A locked thumb: the renderer's picture, its number, a lock — no handle, no menu. */
function FilmstripGeneratedThumb({ item, index, selected, viewers, onSelect, testIdPrefix }: FilmstripGeneratedThumbProps) {
  const thumbnail = svgDataUri(item.thumbnailSvg);
  const number = index + 1;
  return (
    <li
      data-testid={`${testIdPrefix}-row-${item.id}`}
      data-slide-id={item.id}
      data-generated="true"
      className="group flex items-start gap-1.5"
    >
      <span className="flex w-4 shrink-0 flex-col items-center gap-1 pt-0.5">
        <span className="text-[11px] tabular-nums text-text-tertiary">{number}</span>
      </span>
      <span className="relative flex min-w-0 flex-1 flex-col gap-0.5">
        <button
          data-ui-part=""
          type="button"
          onClick={() => onSelect(item.id)}
          aria-current={selected ? 'true' : undefined}
          aria-label={`Slide ${number}: ${item.title} (generated, not editable)`}
          data-testid={`${testIdPrefix}-select-${item.id}`}
          data-filmstrip-select=""
          className={cn(
            'relative block aspect-[16/9] w-full cursor-pointer overflow-hidden rounded-md border bg-surface p-0 text-left font-[inherit] transition-shadow',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
            selected ? 'border-primary ring-2 ring-primary/40' : 'border-border hover:border-border-emphasis',
          )}
        >
          {thumbnail ? (
            <img src={thumbnail} alt="" className="h-full w-full object-contain" data-testid={`${testIdPrefix}-thumb-${item.id}`} />
          ) : (
            <span className="flex h-full w-full flex-col justify-center gap-0.5 px-2">
              <Text as="span" className="line-clamp-2 text-[10px] font-semibold leading-tight text-text-primary">{item.title}</Text>
              <Text as="span" className="text-[9px] text-text-tertiary">Generated</Text>
            </span>
          )}
        </button>
        <span className="flex min-w-0 items-center gap-1.5">
          <Text as="span" className="min-w-0 flex-1 truncate text-[11px] text-text-secondary">{item.title}</Text>
          <Text
            as="span"
            className="inline-flex shrink-0 items-center gap-0.5 text-[10px] font-semibold text-text-tertiary"
            title="Built from the slides' citations; it changes as they do."
            data-testid={`${testIdPrefix}-generated-${item.id}`}
          >
            <LockGlyph />
            Generated
          </Text>
        </span>
        {viewers && viewers.length > 0 && (
          <span
            className="pointer-events-none absolute left-1 top-1"
            data-testid={`${testIdPrefix}-viewers-${item.id}`}
            aria-label={`${viewers.map((viewer) => viewer.name).join(', ')} ${viewers.length === 1 ? 'is' : 'are'} on this slide`}
            role="img"
          >
            <PresenceAvatars users={[...viewers]} maxVisible={2} size={16} />
          </span>
        )}
      </span>
    </li>
  );
}

function MoreGlyph() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
      <circle cx="3.5" cy="8" r="1.3" />
      <circle cx="8" cy="8" r="1.3" />
      <circle cx="12.5" cy="8" r="1.3" />
    </svg>
  );
}

/** One slide in the strip. Takes `SlideRowProps` so both lists can render it. */
export function FilmstripThumb({
  slide,
  index,
  total,
  thumbnailSvg,
  selected,
  uncited,
  changed = false,
  generating = false,
  viewers,
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
  const number = index + 1;
  const title = slide.title || 'Untitled slide';

  const menuItems: DropdownMenuItem[] = [
    ...(index > 0
      ? [{ label: 'Move up', trailing: '⌥↑', onSelect: () => onMove(index, index - 1), 'data-testid': `${testIdPrefix}-up-${slide.id}` }]
      : []),
    ...(index < total - 1
      ? [{ label: 'Move down', trailing: '⌥↓', onSelect: () => onMove(index, index + 1), 'data-testid': `${testIdPrefix}-down-${slide.id}` }]
      : []),
    ...(canDuplicate
      ? [{ label: 'Duplicate', onSelect: () => onDuplicate(slide.id), 'data-testid': `${testIdPrefix}-duplicate-${slide.id}` }]
      : []),
    ...(canDelete
      ? [{ label: 'Delete slide', danger: true, onSelect: () => onDelete(slide.id), 'data-testid': `${testIdPrefix}-delete-${slide.id}` }]
      : []),
  ];

  return (
    <li
      ref={rowRef}
      data-testid={`${testIdPrefix}-row-${slide.id}`}
      data-slide-id={slide.id}
      data-changed={changed ? 'true' : undefined}
      data-generating={generating ? 'true' : undefined}
      aria-busy={generating || undefined}
      className={cn('group flex items-start gap-1.5', dragging && 'opacity-40')}
    >
      <span className="flex w-4 shrink-0 flex-col items-center gap-1 pt-0.5">
        <span className="text-[11px] tabular-nums text-text-tertiary">{number}</span>
        {!readOnly && dragHandle && (
          <span className="opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">{dragHandle}</span>
        )}
      </span>

      <span className="relative flex min-w-0 flex-1 flex-col gap-0.5">
        <button
          data-ui-part=""
          type="button"
          onClick={() => onSelect(slide.id)}
          aria-current={selected ? 'true' : undefined}
          aria-label={`Slide ${number}: ${title}`}
          data-testid={`${testIdPrefix}-select-${slide.id}`}
          data-filmstrip-select=""
          className={cn(
            'relative block aspect-[16/9] w-full cursor-pointer overflow-hidden rounded-md border bg-surface p-0 text-left font-[inherit] transition-shadow',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
            selected
              ? 'border-primary ring-2 ring-primary/40'
              : changed
                ? 'border-success'
                : uncited
                  ? 'border-danger-border'
                  : 'border-border hover:border-border-emphasis',
          )}
        >
          {thumbnail ? (
            <img
              src={thumbnail}
              alt=""
              className={cn('h-full w-full object-contain', generating && 'opacity-40')}
              data-testid={`${testIdPrefix}-thumb-${slide.id}`}
            />
          ) : (
            <span className="flex h-full w-full flex-col justify-center gap-0.5 px-2">
              <Text as="span" className="line-clamp-2 text-[10px] font-semibold leading-tight text-text-primary">{title}</Text>
              <Text as="span" className="text-[9px] text-text-tertiary">{SLIDE_LAYOUT_LABELS[slide.layout]}</Text>
            </span>
          )}
          {generating && (
            <span className="absolute inset-x-0 bottom-0 bg-surface/85 px-1.5 py-0.5" data-testid={`${testIdPrefix}-generating-${slide.id}`}>
              <Text as="span" className="text-[10px] font-medium text-text-secondary">Generating…</Text>
            </span>
          )}
        </button>

        <span className="flex min-w-0 items-center gap-1.5">
          {/* A thumb with no render already shows its title on the card. */}
          {thumbnail ? (
            <Text as="span" className="min-w-0 flex-1 truncate text-[11px] text-text-secondary">{title}</Text>
          ) : (
            <span className="min-w-0 flex-1" aria-hidden="true" />
          )}
          {changed && !generating && (
            <Text as="span" className="shrink-0 text-[10px] font-semibold text-success-fg" data-testid={`${testIdPrefix}-changed-${slide.id}`}>
              Edited by agent
            </Text>
          )}
          {uncited && (
            <Text as="span" className="shrink-0 text-[10px] font-semibold text-danger-fg" data-testid={`${testIdPrefix}-uncited-${slide.id}`}>
              No source
            </Text>
          )}
        </span>

        {viewers && viewers.length > 0 && (
          <span
            className="pointer-events-none absolute left-1 top-1"
            data-testid={`${testIdPrefix}-viewers-${slide.id}`}
            aria-label={`${viewers.map((viewer) => viewer.name).join(', ')} ${viewers.length === 1 ? 'is' : 'are'} on this slide`}
            role="img"
          >
            <PresenceAvatars users={[...viewers]} maxVisible={2} size={16} />
          </span>
        )}

        {!readOnly && menuItems.length > 0 && (
          <span
            className={cn(
              'absolute right-1 top-1 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100',
              selected ? 'opacity-100' : 'opacity-0',
            )}
          >
            <DropdownMenu
              trigger={<MoreGlyph />}
              triggerLabel={`Slide ${number} actions`}
              triggerTitle="Slide actions"
              triggerClassName="h-auto bg-surface/90 px-1 py-0.5"
              triggerTestId={`${testIdPrefix}-menu-${slide.id}`}
              align="end"
              sections={[{ items: menuItems }]}
              data-testid={`${testIdPrefix}-menu-panel-${slide.id}`}
            />
          </span>
        )}
      </span>
    </li>
  );
}

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

export function Filmstrip({
  items,
  selectedId,
  onSelect,
  onMove,
  onDuplicate,
  onDelete,
  onAdd,
  canAdd = true,
  generatingSlideIds,
  generatedItems,
  slideViewers,
  readOnly = false,
  className,
  testIdPrefix = 'filmstrip',
}: FilmstripProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const generating = useMemo(() => new Set(generatingSlideIds ?? []), [generatingSlideIds]);
  const rows = useMemo(
    () => items.map((item) => {
      const viewers = slideViewers?.[item.slide.id];
      if (!generating.has(item.slide.id) && !viewers?.length) return item;
      return {
        ...item,
        ...(generating.has(item.slide.id) ? { generating: true } : {}),
        ...(viewers?.length ? { viewers } : {}),
      };
    }),
    [items, generating, slideViewers],
  );
  const placeholders = useMemo(() => {
    const ids = new Set(items.map((item) => item.slide.id));
    return [...generating].filter((id) => !ids.has(id));
  }, [items, generating]);

  // Keep the selected thumb in view when the stage moves it (←/→, a
  // deck-wide agent edit landing elsewhere). `scrollIntoView` is optional in
  // test DOMs, hence the guard.
  useEffect(() => {
    rowFor(rootRef.current, selectedId)?.scrollIntoView?.({ block: 'nearest' });
  }, [selectedId]);

  // The whole strip in order: the deck's own slides, then the generated ones.
  // ↑/↓ walk all of it; Alt+↑/↓ (a move) stays within the deck's own.
  const generated = generatedItems ?? [];
  const orderedIds = [...items.map((item) => item.slide.id), ...generated.map((item) => item.id)];

  const onKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return;
    const target = event.target as HTMLElement;
    // Only from a thumb itself: an open menu and the drag handle (dnd-kit's
    // keyboard sensor) own their arrow keys.
    if (!target.hasAttribute('data-filmstrip-select')) return;
    const index = orderedIds.indexOf(selectedId);
    if (index === -1) return;
    const delta = event.key === 'ArrowUp' ? -1 : 1;
    const to = index + delta;
    if (to < 0 || to >= orderedIds.length) return;
    event.preventDefault();
    const id = orderedIds[index]!;
    if (event.altKey) {
      if (readOnly || index >= items.length || to >= items.length) return;
      onMove(index, to);
      // The moved slide keeps focus, wherever it landed.
      requestAnimationFrame(() => focusThumb(rootRef.current, id));
      return;
    }
    const next = orderedIds[to]!;
    onSelect(next);
    focusThumb(rootRef.current, next);
  };

  const listProps = {
    items: rows,
    selectedId,
    readOnly,
    onSelect,
    onMove,
    onDuplicate,
    onDelete,
    canDuplicate: canAdd,
    rowComponent: FilmstripThumb,
    listClassName: 'gap-2.5',
    testIdPrefix,
  };

  return (
    <div
      ref={rootRef}
      role="group"
      aria-label="Slides"
      className={cn('flex min-w-0 flex-col gap-2.5', className)}
      data-testid={`${testIdPrefix}-strip`}
      onKeyDown={onKeyDown}
    >
      <Suspense fallback={<SlideList {...listProps} />}>
        {readOnly ? <SlideList {...listProps} /> : <SortableSlideList {...listProps} />}
      </Suspense>

      {placeholders.map((id) => (
        <div key={id} className="flex items-start gap-1.5" aria-busy="true" data-testid={`${testIdPrefix}-placeholder-${id}`}>
          <span className="w-4 shrink-0 pt-0.5 text-[11px] tabular-nums text-text-tertiary">{items.length + 1}</span>
          <span className="flex aspect-[16/9] min-w-0 flex-1 items-end rounded-md border border-dashed border-border bg-surface px-1.5 py-0.5">
            <Text as="span" className="text-[10px] font-medium text-text-secondary">Generating…</Text>
          </span>
        </div>
      ))}

      {generated.length > 0 && (
        <ul className="m-0 flex list-none flex-col gap-2.5 p-0" aria-label="Generated slides" data-testid={`${testIdPrefix}-generated-list`}>
          {generated.map((item, index) => (
            <FilmstripGeneratedThumb
              key={item.id}
              item={item}
              index={items.length + placeholders.length + index}
              selected={item.id === selectedId}
              {...(slideViewers?.[item.id]?.length ? { viewers: slideViewers[item.id] } : {})}
              onSelect={onSelect}
              testIdPrefix={testIdPrefix}
            />
          ))}
        </ul>
      )}

      {onAdd && !readOnly && (
        <div className="flex items-start gap-1.5">
          <span className="w-4 shrink-0" aria-hidden="true" />
          <Button
            // A control is solid-bordered or borderless; the add affordance is
            // the secondary button, not a dashed drop target (2.441.7).
            variant="secondary"
            size="sm"
            disabled={!canAdd}
            onClick={onAdd}
            className="min-w-0 flex-1"
            data-testid={`${testIdPrefix}-add`}
          >
            <span className="inline-flex items-center gap-1"><PlusIcon size={12} />Add slide</span>
          </Button>
        </div>
      )}
    </div>
  );
}

export default Filmstrip;

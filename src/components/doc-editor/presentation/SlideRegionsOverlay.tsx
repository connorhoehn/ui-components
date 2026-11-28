// SlideRegionsOverlay — edit a slide by clicking its elements (since 2.550.0), in the slide's own type with a compact emphasis bar outside the box (2.551.0).
//
// The host computes, per slide, where each editable element sits — the
// title, a bullet, a card's text, an icon, the chart — as `SlideRegion`s in
// slide units (the stage's 16:9 coordinate space, `slideSize`), from the deck
// engine's layout. The library never imports the engine. This overlay lies
// over the stage's picture as an SVG with that viewBox, so every box scales
// with the stage without a measured pixel or an inline style:
//
// - each region is a transparent button on its box: hover or focus draws a
//   subtle outline, Tab walks the regions in reading order (top to bottom,
//   then left to right), and its accessible name names the field ("Slide
//   title", "Card 2 text");
// - Enter or a click on a text region opens an editor exactly on the box, in
//   the region's font size where the host gives it (slide units, so it scales
//   too). It grows with its content; the slide stays visible around it.
//   Enter (without Shift) or leaving the field commits, Esc cancels. With
//   the region's `text` style (since 2.551.0, the engine's
//   `EditableRegion.text`) the editor is set in the slide's own family, size,
//   weight, colour, alignment and line pitch on the colour behind the text,
//   with a thin outline instead of a white box, so the edit looks like the
//   slide. A `runs` region (a title or bullet) shows the emphasis toolbar as
//   one compact row of icon buttons just above the box (below it when the
//   box is near the top), never over it, kept inside the stage. The bar is
//   HTML beside the SVG, positioned in stage percentages, so it stays at its
//   real size however small the stage is drawn;
// - an icon, graphic, chart, image or figure region calls `onPick` instead:
//   the editor opens the matching picker in its side pane;
// - a region that is a row of a list (`row`) shows small Add after, Move
//   earlier, Move later and Remove buttons while hovered or focused.
//
// A committed edit shows at once, drawn over the old picture, until the
// region's `value` catches up (the host's re-render): the overlay is
// optimistic; re-rendering, and debouncing it, is the host's job.

import { useEffect, useRef, useState, type CSSProperties, type FocusEvent, type KeyboardEvent } from 'react';
import { cn } from '../../../lib/cn';
import { EmphasisToolbar } from './DeckTextField';
import { DeckTextPreview } from './DeckTextField';
import { applyEmphasis, deckTextValue, editDeckText, emphasisAt } from './deckText';
import type { DeckEmphasis, DeckText, SlideLayout } from './deckSpec';

export type SlideRegionKind = 'text' | 'runs' | 'icon' | 'graphic' | 'chart' | 'image' | 'figure';

/** A box in slide units: x and y from the slide's top-left corner. */
export interface SlideRegionBox {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** Where a row region sits in its list: `{ list: 'items', index: 2 }`. */
export interface SlideRegionRow {
  /** The slide field holding the list: `bullets`, `items`, `figures`, `people`, `funnel`, `timeline`. */
  list: string;
  index: number;
}

/**
 * How a region's text is painted (since 2.551.0): the deck engine's
 * `EditableRegion.text`, passed through. Sizes are slide units (points on the
 * 960 x 540 stage); the overlay's SVG scales them with the stage.
 */
export interface SlideRegionTextStyle {
  /** The family the slide paints with (the engine's open family: `Carlito`, `Liberation Sans`, `Gelasio`). */
  fontFamily: string;
  /** The metric-compatible office family (`Calibri`, `Arial`, `Georgia`): the stack's second choice. */
  officeFamily?: string;
  fontSize: number;
  fontWeight: number;
  italic?: boolean;
  color: string;
  align: 'left' | 'center' | 'right';
  /** Baseline-to-baseline pitch, slide units. */
  lineHeight: number;
  letterSpacing?: number;
  uppercase?: boolean;
  /** The solid colour behind the text: the editor's background. Absent over a photograph (the editor is then transparent). */
  background?: string;
}

/**
 * A CSS font stack for an engine family: the family itself (when the page
 * loads it), its office twin, then the closest common family. `Carlito` reads
 * as Calibri, `Liberation Sans` as Arial, `Gelasio` as Georgia; anything else
 * leads with its own name over a sans fallback.
 */
export function deckFontStack(family: string, officeFamily?: string): string {
  const q = (name: string) => `"${name.replace(/["\\;{}<>]/g, '')}"`;
  const known: Record<string, string> = {
    carlito: '"Carlito", "Calibri", "Segoe UI", system-ui, sans-serif',
    calibri: '"Calibri", "Carlito", "Segoe UI", system-ui, sans-serif',
    'liberation sans': '"Liberation Sans", Arial, Helvetica, sans-serif',
    arial: 'Arial, "Liberation Sans", Helvetica, sans-serif',
    gelasio: '"Gelasio", Georgia, "Times New Roman", serif',
    georgia: 'Georgia, "Gelasio", "Times New Roman", serif',
  };
  const hit = known[family.trim().toLowerCase()];
  if (hit) return hit;
  return [q(family), officeFamily ? q(officeFamily) : null, 'sans-serif'].filter(Boolean).join(', ');
}

/** The CSS variables a styled region's editor reads (`--region-*`), and its classes. */
function regionTextStyle(text: SlideRegionTextStyle | undefined): { vars?: CSSProperties; className?: string } {
  if (!text) return {};
  const vars = {
    '--region-font': deckFontStack(text.fontFamily, text.officeFamily),
    '--region-color': text.color,
    '--region-lh': String(Math.round((text.lineHeight / text.fontSize) * 1000) / 1000),
    '--region-ls': `${text.letterSpacing ?? 0}px`,
    '--region-bg': text.background ?? 'transparent',
  } as CSSProperties;
  return {
    vars,
    className: cn(
      '[font-family:var(--region-font)] [color:var(--region-color)] [line-height:var(--region-lh)] [letter-spacing:var(--region-ls)] [background-color:var(--region-bg)]',
      text.fontWeight >= 600 ? 'font-bold' : 'font-normal',
      text.italic && 'italic',
      text.uppercase && 'uppercase',
      text.align === 'center' ? 'text-center' : text.align === 'right' ? 'text-right' : 'text-left',
    ),
  };
}

/** Where the emphasis bar sits for a box: above it when there is room, else below; left-anchored in the left half of the stage, right-anchored in the right. */
export function emphasisBarPlacement(box: SlideRegionBox, size: SlideSize = DEFAULT_SLIDE_SIZE): { side: 'above' | 'below'; anchor: 'left' | 'right'; top: number; left: number; right: number } {
  // The bar is about 34 px tall; at the smallest stage a host draws (about 480 px wide) that is ~68 slide units.
  const room = size.height * 0.125;
  const side = box.y >= room || size.height - (box.y + box.h) < room ? 'above' : 'below';
  const pct = (v: number, of: number) => (v / of) * 100;
  const anchor = box.x + box.w / 2 <= size.width / 2 ? 'left' : 'right';
  return {
    side,
    anchor,
    top: pct(side === 'above' ? box.y : box.y + box.h, size.height),
    left: pct(Math.max(0, box.x), size.width),
    right: pct(Math.max(0, size.width - (box.x + box.w)), size.width),
  };
}

export interface SlideRegion {
  /**
   * The field's path: `title`, `bullets[2]`, `items[1].icon`, `matrix.quadrants[3].text`,
   * `table.rows[0][2]`, or `deck.subtitle` for a field of the deck. Dots work too (`items.1.icon`).
   */
  path: string;
  kind: SlideRegionKind;
  box: SlideRegionBox;
  /** The current value: runs (or a string) for `runs`, the plain string otherwise. Clears an optimistic edit once it matches. */
  value?: unknown;
  /** The accessible name. Default: derived from the path ("Card 2 text"). */
  label?: string;
  /** The theme's font size for this text, in slide units. `text.fontSize` wins. */
  fontSize?: number;
  /** How the slide paints this text (since 2.551.0): the editor then looks like the slide. */
  text?: SlideRegionTextStyle;
  /** Allow line breaks (Shift+Enter) in the editor. */
  multiline?: boolean;
  /** Character cap for the editor. */
  maxLength?: number;
  /** The list this region leads a row of: turns on its row buttons. Default: derived from the path (`regionRow`). */
  row?: SlideRegionRow;
}

export interface SlideSize {
  width: number;
  height: number;
}

/** The engine's slide in points: 13.333 x 7.5 in at 72 pt. */
export const DEFAULT_SLIDE_SIZE: SlideSize = { width: 960, height: 540 };

const LIST_NOUNS: Record<string, string> = {
  bullets: 'Bullet',
  figures: 'Figure',
  people: 'Person',
  funnel: 'Stage',
  timeline: 'Step',
  quadrants: 'Quadrant',
};

const FIELD_WORDS: Record<string, string> = {
  title: 'title',
  text: 'text',
  icon: 'icon',
  value: 'value',
  label: 'label',
  delta: 'change',
  context: 'context',
  name: 'name',
  role: 'role',
  detail: 'detail',
  date: 'date',
  by: 'attribution',
  alt: 'description',
};

/** A path in either form (`items[1].icon` or `items.1.icon`) as dots. */
export function normalizeRegionPath(path: string): string {
  return path.replace(/\[(\d+)\]/g, '.$1');
}

/** The field that carries a row's buttons, per list: the bullet itself, an item's title, a figure's value, … */
const ROW_LEAD: Record<string, string | null> = {
  bullets: null,
  items: 'title',
  figures: 'value',
  people: 'name',
  funnel: 'label',
  timeline: 'label',
};

/**
 * The row a region leads, from its path: `bullets[2]` leads bullet 3,
 * `items[1].title` leads card 2. A region's own `row` wins.
 */
export function regionRow(region: SlideRegion): SlideRegionRow | undefined {
  if (region.row) return region.row;
  const [list, index, field, ...rest] = normalizeRegionPath(region.path).split('.');
  if (!list || !(list in ROW_LEAD) || index === undefined || !/^\d+$/.test(index) || rest.length) return undefined;
  const lead = ROW_LEAD[list];
  if (lead === null ? field !== undefined : field !== lead) return undefined;
  return { list, index: Number(index) };
}

/** "Slide title", "Bullet 2", "Card 3 text", "Figure 1 icon", "Table row 1, column 3": a region's name from its path. */
export function regionLabel(path: string, layout?: SlideLayout): string {
  const normal = normalizeRegionPath(path);
  if (normal.startsWith('deck.')) {
    const field = normal.slice(5);
    return field === 'title' ? 'Deck title' : field === 'subtitle' ? 'Deck subtitle' : `Deck ${field}`;
  }
  const parts = normal.split('.');
  if (parts[0] === 'table') {
    if (parts[1] === 'header') return `Table heading ${Number(parts[2]) + 1}`;
    if (parts[1] === 'rows') return `Table row ${Number(parts[2]) + 1}, column ${Number(parts[3]) + 1}`;
  }
  if (parts[0] === 'comparison' && (parts[1] === 'left' || parts[1] === 'right')) {
    const side = parts[1] === 'left' ? 'Left' : 'Right';
    if (parts[2] === 'points') return `${side} point ${Number(parts[3]) + 1}`;
    return `${side} side ${FIELD_WORDS[parts[2] ?? ''] ?? parts[2] ?? ''}`.trim();
  }
  if (parts[0] === 'quote') return parts[1] === 'by' ? 'Quote attribution' : 'Quote';
  if (parts[0] === 'closing') return parts[1] === 'nextSteps' ? `Next step ${Number(parts[2]) + 1}` : `Closing ${parts[1] === 'line' ? 'line' : parts[1]}`;
  if (parts[0] === 'agenda' && parts[1] === 'items') return `Agenda item ${Number(parts[2]) + 1}`;
  if (parts.length === 1) {
    const one: Record<string, string> = { title: 'Slide title', eyebrow: 'Eyebrow', chart: 'Chart', image: 'Image', decoration: 'Slide graphic' };
    return one[path] ?? path.charAt(0).toUpperCase() + path.slice(1);
  }
  const [list, index, field, ...rest] = parts;
  if (list === 'matrix' && index === 'quadrants') {
    const names = ['Top left', 'Top right', 'Bottom left', 'Bottom right'];
    return `${names[Number(field)] ?? 'Quadrant'} quadrant${rest[0] ? ` ${FIELD_WORDS[rest[0]] ?? rest[0]}` : ''}`;
  }
  const n = Number(index);
  if (Number.isNaN(n)) return `${list} ${parts.slice(1).join(' ')}`;
  const noun = list === 'items' ? (layout === 'process' ? 'Step' : 'Card') : LIST_NOUNS[list!] ?? list!;
  return `${noun} ${n + 1}${field ? ` ${FIELD_WORDS[field] ?? field}` : ''}`;
}

/**
 * Regions sorted by line (a band of 1/40 of the slide), then left to right.
 * The overlay keeps the host's order (the engine sends regions in reading
 * order); this is for a host that has boxes without an order.
 */
export function readingOrder(regions: readonly SlideRegion[], size: SlideSize = DEFAULT_SLIDE_SIZE): SlideRegion[] {
  const band = size.height / 40;
  return regions.slice().sort((a, b) => Math.round(a.box.y / band) - Math.round(b.box.y / band) || a.box.x - b.box.x);
}

function same(a: unknown, b: unknown): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

export interface SlideRegionsOverlayProps {
  regions: readonly SlideRegion[];
  slideSize?: SlideSize;
  /** The slide's layout: names `items` rows Card or Step. */
  layout?: SlideLayout;
  /** A text region committed: its path and new value (a string, or runs for a `runs` region). */
  onEdit: (path: string, value: DeckText) => void;
  /** An icon, graphic, chart, image or figure region was chosen. */
  onPick?: (region: SlideRegion) => void;
  onRowAdd?: (list: string, afterIndex: number) => void;
  onRowRemove?: (list: string, index: number) => void;
  onRowMove?: (list: string, from: number, to: number) => void;
  /** Open this path's editor (a new slide's title). Cleared through `onEditPathChange`. */
  editPath?: string | null;
  onEditPathChange?: (path: string | null) => void;
  /** The path whose picker is open in the side pane: drawn selected. */
  pickedPath?: string | null;
  readOnly?: boolean;
  className?: string;
  testIdPrefix?: string;
}

const ROW_BUTTON = 'flex h-5 w-5 items-center justify-center rounded-sm border border-border bg-surface text-[10px] leading-none text-text-primary shadow-sm hover:bg-surface-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary';

export function SlideRegionsOverlay({
  regions,
  slideSize = DEFAULT_SLIDE_SIZE,
  layout,
  onEdit,
  onPick,
  onRowAdd,
  onRowRemove,
  onRowMove,
  editPath,
  onEditPathChange,
  pickedPath,
  readOnly = false,
  className,
  testIdPrefix = 'slide-regions',
}: SlideRegionsOverlayProps) {
  // The engine sends regions in reading order: Tab follows the array.
  const ordered = regions;
  const [editing, setEditing] = useState<{ path: string; draft: DeckText } | null>(null);
  const [selection, setSelection] = useState<[number, number]>([0, 0]);
  const [pending, setPending] = useState<Record<string, DeckText>>({});
  const fieldRef = useRef<HTMLTextAreaElement | null>(null);
  const editorParts = useRef<Set<Element>>(new Set());
  const regionButtons = useRef<Map<string, HTMLButtonElement>>(new Map());
  const cancelled = useRef(false);

  // An optimistic value is dropped once the host's region carries it.
  useEffect(() => {
    setPending((current) => {
      const keys = Object.keys(current).filter((path) => {
        const region = regions.find((r) => r.path === path);
        return region && region.value !== undefined && same(region.value, current[path]);
      });
      if (!keys.length) return current;
      const next = { ...current };
      for (const key of keys) delete next[key];
      return next;
    });
  }, [regions]);

  const startEdit = (region: SlideRegion) => {
    if (readOnly) return;
    if (region.kind !== 'text' && region.kind !== 'runs') { onPick?.(region); return; }
    const current = pending[region.path] ?? (region.value as DeckText | undefined) ?? '';
    cancelled.current = false;
    setEditing({ path: region.path, draft: region.kind === 'runs' ? current : deckTextValue(current) });
  };

  // The host asked for an editor (a new slide's title).
  useEffect(() => {
    if (!editPath) return;
    const region = regions.find((r) => r.path === editPath);
    if (region) startEdit(region);
    onEditPathChange?.(null);
  }, [editPath]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!editing) return;
    const node = fieldRef.current;
    if (node && document.activeElement !== node) {
      node.focus({ preventScroll: true });
      node.select();
    }
  }, [editing?.path]); // eslint-disable-line react-hooks/exhaustive-deps

  const finish = (commit: boolean) => {
    if (!editing) return;
    const region = regions.find((r) => r.path === editing.path);
    const before = pending[editing.path] ?? (region?.value as DeckText | undefined) ?? '';
    if (commit && !same(before, editing.draft)) {
      setPending((current) => ({ ...current, [editing.path]: editing.draft }));
      onEdit(editing.path, editing.draft);
    }
    const path = editing.path;
    setEditing(null);
    // Back to the region's button, so Tab carries on from where the edit was.
    queueMicrotask(() => regionButtons.current.get(path)?.focus({ preventScroll: true }));
  };

  const onFieldKey = (event: KeyboardEvent<HTMLTextAreaElement>, region: SlideRegion) => {
    if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); cancelled.current = true; finish(false); return; }
    if (event.key === 'Enter' && !(region.multiline && event.shiftKey)) { event.preventDefault(); finish(true); }
  };
  const onFieldBlur = (event: FocusEvent<HTMLElement>) => {
    const to = event.relatedTarget as Element | null;
    if (to && [...editorParts.current].some((part) => part.contains(to))) return;
    if (!cancelled.current) finish(true);
  };
  const readSelection = () => {
    const node = fieldRef.current;
    if (node) setSelection([node.selectionStart ?? 0, node.selectionEnd ?? 0]);
  };
  const applyRun = (emphasis: DeckEmphasis | null) => {
    if (!editing) return;
    const node = fieldRef.current;
    const start = node?.selectionStart ?? selection[0];
    const end = node?.selectionEnd ?? selection[1];
    setEditing({ ...editing, draft: applyEmphasis(editing.draft, start, end, emphasis) });
    node?.focus({ preventScroll: true });
  };
  const part = (node: Element | null) => { if (node) editorParts.current.add(node); };

  const { width, height } = slideSize;
  const editingRegion = editing ? regions.find((r) => r.path === editing.path) : undefined;

  const bar = editing && editingRegion?.kind === 'runs' ? emphasisBarPlacement(editingRegion.box, slideSize) : null;

  return (
    <>
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid meet"
      className={cn('absolute inset-0 h-full w-full overflow-visible', className)}
      data-testid={testIdPrefix}
      role="group"
      aria-label="Slide elements"
    >
      {ordered.map((region) => {
        const { x, y, w, h } = region.box;
        const label = region.label ?? regionLabel(region.path, layout);
        const isEditing = editing?.path === region.path;
        const shown = pending[region.path];
        const row = regionRow(region);
        const look = regionTextStyle(region.text);
        const size = region.text?.fontSize ?? region.fontSize;
        return (
          <g key={region.path} className="group" data-region={region.path}>
            {!isEditing && shown !== undefined && (
              <foreignObject x={x} y={y} width={w} height={h} fontSize={size} className="pointer-events-none overflow-visible">
                <div className={cn('h-full w-full overflow-hidden [font-size:inherit]', look.className ?? 'bg-surface/90', look.className && '[&_*]:[font-family:inherit] [&_*]:[line-height:inherit]')} style={look.vars} data-testid={`${testIdPrefix}-pending-${region.path}`}>
                  <DeckTextPreview text={shown} className="[&_*]:[font-size:inherit]" />
                </div>
              </foreignObject>
            )}
            {isEditing ? (
              <foreignObject x={x} y={y} width={w} height={h} fontSize={size} className="overflow-visible" ref={part}>
                <textarea
                  style={look.vars}
                  data-styled={region.text ? 'slide' : undefined}
                  ref={fieldRef}
                  aria-label={label}
                  value={deckTextValue(editing!.draft)}
                  maxLength={region.maxLength}
                  rows={1}
                  onChange={(event) => setEditing({ path: region.path, draft: editDeckText(editing!.draft, event.target.value) })}
                  onKeyDown={(event) => onFieldKey(event, region)}
                  onBlur={onFieldBlur}
                  onSelect={readSelection}
                  onKeyUp={readSelection}
                  onMouseUp={readSelection}
                  className={cn(
                    'block min-h-full w-full resize-none overflow-hidden p-0 [field-sizing:content] [font-size:inherit]',
                    look.className
                      ? cn('rounded-none border-0 shadow-none outline outline-1 outline-offset-2 outline-primary/70 caret-primary', look.className)
                      : 'rounded-sm border border-primary bg-surface leading-tight text-text-primary shadow-md outline-none',
                  )}
                  data-testid={`${testIdPrefix}-editor`}
                  data-path={region.path}
                />
              </foreignObject>
            ) : (
              <foreignObject x={x} y={y} width={w} height={h}>
                <button
                  type="button"
                  ref={(node) => { if (node) regionButtons.current.set(region.path, node); else regionButtons.current.delete(region.path); }}
                  aria-label={label}
                  aria-pressed={region.kind !== 'text' && region.kind !== 'runs' ? pickedPath === region.path : undefined}
                  disabled={readOnly}
                  onClick={() => startEdit(region)}
                  className={cn(
                    'block h-full w-full cursor-text rounded-sm border border-transparent bg-transparent p-0 hover:border-primary/60 focus-visible:border-primary focus-visible:outline-none aria-pressed:border-primary',
                    region.kind !== 'text' && region.kind !== 'runs' && 'cursor-pointer',
                  )}
                  data-testid={`${testIdPrefix}-region-${region.path}`}
                  data-kind={region.kind}
                />
              </foreignObject>
            )}
            {row && !readOnly && !isEditing && (onRowAdd || onRowRemove || onRowMove) && (
              <foreignObject x={x + w - 96} y={Math.max(0, y - 22)} width={96} height={22} className="overflow-visible">
                <div className="flex h-full items-center justify-end gap-0.5 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 focus-within:opacity-100" data-testid={`${testIdPrefix}-row-${region.path}`}>
                  {onRowMove && (
                    <>
                      <button type="button" className={ROW_BUTTON} aria-label={`Move ${label} earlier`} disabled={row.index === 0} onClick={() => onRowMove(row.list, row.index, row.index - 1)} data-testid={`${testIdPrefix}-row-up-${region.path}`}>{'↑'}</button>
                      <button type="button" className={ROW_BUTTON} aria-label={`Move ${label} later`} onClick={() => onRowMove(row.list, row.index, row.index + 1)} data-testid={`${testIdPrefix}-row-down-${region.path}`}>{'↓'}</button>
                    </>
                  )}
                  {onRowAdd && <button type="button" className={ROW_BUTTON} aria-label={`Add after ${label}`} onClick={() => onRowAdd(row.list, row.index)} data-testid={`${testIdPrefix}-row-add-${region.path}`}>{'+'}</button>}
                  {onRowRemove && <button type="button" className={ROW_BUTTON} aria-label={`Remove ${label}`} onClick={() => onRowRemove(row.list, row.index)} data-testid={`${testIdPrefix}-row-remove-${region.path}`}>{'×'}</button>}
                </div>
              </foreignObject>
            )}
          </g>
        );
      })}
    </svg>
    {bar && editing && editingRegion && (() => {
      const [start, end] = selection;
      const vars = {
        '--bar-top': `${bar.top}%`,
        '--bar-left': `${bar.left}%`,
        '--bar-right': `${bar.right}%`,
      } as CSSProperties;
      return (
        <div
          ref={part}
          style={vars}
          onBlur={onFieldBlur}
          className={cn(
            'absolute z-10 flex max-w-full flex-nowrap items-center rounded-md border border-border bg-surface p-0.5 shadow-md [top:var(--bar-top)]',
            bar.side === 'above' ? '-translate-y-[calc(100%_+_6px)]' : 'translate-y-[6px]',
            bar.anchor === 'left' ? '[left:var(--bar-left)]' : '[right:var(--bar-right)]',
          )}
          data-testid={`${testIdPrefix}-emphasis-bar`}
          data-side={bar.side}
          data-anchor={bar.anchor}
        >
          <EmphasisToolbar
            variant="icons"
            label={`${editingRegion.label ?? regionLabel(editingRegion.path, layout)}: emphasis`}
            active={end > start ? emphasisAt(editing.draft, start, end) : undefined}
            disabled={end <= start}
            onApply={applyRun}
            testIdPrefix={`${testIdPrefix}-emphasis`}
          />
        </div>
      );
    })()}
    </>
  );
}

export default SlideRegionsOverlay;

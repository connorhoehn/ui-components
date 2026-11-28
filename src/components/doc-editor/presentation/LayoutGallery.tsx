// LayoutGallery — the deck's slide layouts as a grid of tiles, for choosing one.
//
// Each tile is a `SelectableCard` (a real button: Tab reaches it, Enter and
// Space press it, `aria-pressed` marks the current layout) holding a 16:9
// preview, the layout's name and one line on when to use it
// (`SLIDE_LAYOUT_DESCRIPTIONS`).
//
// ## Previews
//
// The host renders each layout on its server (the deck engine draws a sample
// slide per layout) and passes the SVG SOURCE per layout in `previews`. The
// tile shows it the way every slide preview in this editor is shown: as a
// `data:` URI in an `<img>` (`svgDataUri`), never as injected markup, so
// nothing inside the SVG can run. A layout with no preview gets a schematic
// drawn from plain blocks — title bar, text lines, bars, figures — so the
// grid never shows a blank frame while the host's previews are on their way.
//
// The grid answers to its own width (a container query), not the window's,
// because it lives inside a dialog as often as on a page: one column below
// 28rem, two from 28rem, three from 42rem.

import type { ReactNode } from 'react';
import { cn } from '../../../lib/cn';
import { SelectableCard } from '../../ui/SelectableCard';
import { Text } from '../../shared/Text';
import { SectionLabel } from '../../shared/SectionLabel';
import { SLIDE_LAYOUT_GROUPS, SLIDE_LAYOUT_DESCRIPTIONS, SLIDE_LAYOUT_LABELS, type SlideLayout } from './deckSpec';
import { svgDataUri } from './svgPreview';

export interface LayoutGalleryProps {
  /** Called with the tile's layout when it is pressed. */
  onSelect: (layout: SlideLayout) => void;
  /**
   * The layouts to offer, in order, as one flat list. Default: every layout,
   * grouped (`SLIDE_LAYOUT_GROUPS`: Openers, Numbers, Lists and steps,
   * Comparisons, Charts, People, Images, Closers).
   */
  layouts?: readonly SlideLayout[];
  /**
   * Layouts to leave out (since 2.550.0), in either form — for instance
   * `IMAGE_LAYOUTS` while the host has no asset store. A group left empty
   * is not shown.
   */
  hiddenLayouts?: readonly SlideLayout[];
  /**
   * SVG source per layout, rendered by the host's server. Shown through
   * `svgDataUri` in an `<img>`; a layout without one shows a schematic.
   */
  previews?: Partial<Record<SlideLayout, string>>;
  /** Marks one tile as the current choice (`aria-pressed`, the selected border). */
  selected?: SlideLayout;
  /** The list's accessible name. Default "Slide layouts". */
  label?: string;
  className?: string;
  /** Test-id prefix. Default `layout-gallery`; tiles are `<prefix>-<layout>`. */
  testIdPrefix?: string;
}

// ---------------------------------------------------------------------------
// The schematic: what a layout looks like, drawn from blocks
// ---------------------------------------------------------------------------

/** A title bar. */
function TitleBlock({ wide = false, center = false }: { wide?: boolean; center?: boolean }) {
  return <span className={cn('block h-1.5 rounded-sm bg-text-tertiary', wide ? 'w-3/4' : 'w-1/2', center && 'mx-auto')} />;
}

/** A few lines of body text. */
function LinesBlock({ count = 3, className }: { count?: number; className?: string }) {
  const widths = ['w-full', 'w-5/6', 'w-2/3', 'w-4/5', 'w-3/4', 'w-1/2'];
  return (
    <span className={cn('flex flex-col gap-1', className)}>
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className={cn('block h-1 rounded-sm bg-border-emphasis', widths[i % widths.length])} />
      ))}
    </span>
  );
}

function ChartBlock() {
  const heights = ['h-1/3', 'h-2/3', 'h-1/2', 'h-full', 'h-3/4'];
  return (
    <span className="flex min-h-0 flex-1 items-end gap-1 border-b border-l border-border-emphasis px-1">
      {heights.map((height, i) => <span key={i} className={cn('block w-full rounded-t-sm bg-primary/50', height)} />)}
    </span>
  );
}

function FiguresBlock() {
  return (
    <span className="grid flex-1 grid-cols-3 gap-1.5">
      {[0, 1, 2].map((i) => (
        <span key={i} className="flex flex-col items-center justify-center gap-1 rounded-sm bg-surface">
          <span className="block h-2.5 w-2/3 rounded-sm bg-primary/60" />
          <span className="block h-1 w-1/2 rounded-sm bg-border-emphasis" />
        </span>
      ))}
    </span>
  );
}

function TableBlock() {
  return (
    <span className="grid flex-1 grid-cols-4 gap-px overflow-hidden rounded-sm bg-border-emphasis">
      {Array.from({ length: 16 }, (_, i) => <span key={i} className={cn('block', i < 4 ? 'bg-primary/30' : 'bg-surface')} />)}
    </span>
  );
}

function TwoListsBlock({ titled = false }: { titled?: boolean }) {
  return (
    <span className="grid flex-1 grid-cols-2 gap-2">
      {[0, 1].map((i) => (
        <span key={i} className={cn('flex flex-col gap-1', titled && 'rounded-sm bg-surface p-1')}>
          {titled && <span className="block h-1.5 w-1/2 rounded-sm bg-primary/50" />}
          <LinesBlock count={3} />
        </span>
      ))}
    </span>
  );
}

function TimelineBlock() {
  return (
    <span className="relative flex flex-1 items-center justify-between px-1">
      <span className="absolute inset-x-1 top-1/2 block h-px bg-border-emphasis" />
      {[0, 1, 2, 3].map((i) => (
        <span key={i} className="relative flex flex-col items-center gap-1">
          <span className="block h-2 w-2 rounded-full bg-primary/70" />
          <span className="block h-1 w-5 rounded-sm bg-border-emphasis" />
        </span>
      ))}
    </span>
  );
}

function AgendaBlock() {
  return (
    <span className="flex flex-1 flex-col justify-center gap-1.5">
      {[0, 1, 2, 3].map((i) => (
        <span key={i} className="flex items-center gap-1.5">
          <span className={cn('block h-2 w-2 rounded-sm', i === 1 ? 'bg-primary' : 'bg-border-emphasis')} />
          <span className={cn('block h-1 rounded-sm', i === 1 ? 'w-2/3 bg-primary/60' : 'w-1/2 bg-border-emphasis')} />
        </span>
      ))}
    </span>
  );
}

function CardsBlock({ count = 3, numbered = false }: { count?: number; numbered?: boolean }) {
  return (
    <span className={cn('grid flex-1 gap-1.5', count === 4 ? 'grid-cols-4' : 'grid-cols-3')}>
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className="flex flex-col gap-1 rounded-sm bg-surface p-1">
          <span className={cn('block h-2 w-2 bg-primary/60', numbered ? 'rounded-full' : 'rounded-sm')} />
          <span className="block h-1 w-3/4 rounded-sm bg-text-tertiary" />
          <span className="block h-1 w-1/2 rounded-sm bg-border-emphasis" />
        </span>
      ))}
    </span>
  );
}

function PeopleBlock() {
  return (
    <span className="grid flex-1 grid-cols-4 gap-1.5">
      {[0, 1, 2, 3].map((i) => (
        <span key={i} className="flex flex-col items-center gap-1">
          <span className="block h-4 w-4 rounded-full bg-primary/40" />
          <span className="block h-1 w-3/4 rounded-sm bg-text-tertiary" />
        </span>
      ))}
    </span>
  );
}

function FunnelBlock() {
  return (
    <span className="flex flex-1 flex-col items-center justify-center gap-1">
      {['w-full', 'w-3/4', 'w-1/2', 'w-1/4'].map((width) => <span key={width} className={cn('block h-1.5 rounded-sm bg-primary/50', width)} />)}
    </span>
  );
}

function MatrixBlock() {
  return (
    <span className="grid flex-1 grid-cols-2 gap-px overflow-hidden rounded-sm bg-border-emphasis">
      {[0, 1, 2, 3].map((i) => <span key={i} className={cn('block', i === 1 ? 'bg-primary/30' : 'bg-surface')} />)}
    </span>
  );
}

const SCHEMATICS: Record<SlideLayout, () => ReactNode> = {
  title: () => (
    <span className="flex flex-1 flex-col justify-center gap-1.5">
      <TitleBlock wide />
      <span className="block h-1 w-1/3 rounded-sm bg-border-emphasis" />
    </span>
  ),
  section: () => (
    <span className="flex flex-1 flex-col justify-center gap-1.5">
      <span className="block h-1 w-1/5 rounded-sm bg-primary/60" />
      <TitleBlock />
    </span>
  ),
  bullets: () => (<><TitleBlock /><LinesBlock count={4} /></>),
  'two-column': () => (<><TitleBlock /><TwoListsBlock /></>),
  chart: () => (<><TitleBlock /><ChartBlock /></>),
  quote: () => (
    <span className="flex flex-1 flex-col justify-center gap-1.5 px-2">
      <LinesBlock count={2} />
      <span className="block h-1 w-1/4 self-end rounded-sm bg-primary/60" />
    </span>
  ),
  image: () => (<><TitleBlock /><span className="block flex-1 rounded-sm bg-primary/20" /></>),
  'key-figures': () => (<><TitleBlock /><FiguresBlock /></>),
  table: () => (<><TitleBlock /><TableBlock /></>),
  comparison: () => (<><TitleBlock /><TwoListsBlock titled /></>),
  timeline: () => (<><TitleBlock /><TimelineBlock /></>),
  agenda: () => (<><TitleBlock /><AgendaBlock /></>),
  closing: () => (
    <span className="flex flex-1 flex-col justify-center gap-1.5">
      <TitleBlock wide center />
      <LinesBlock count={2} className="mx-auto w-1/2" />
    </span>
  ),
  'big-quote': () => (
    <span className="flex flex-1 flex-col justify-center gap-1.5 px-1">
      <span className="block h-3 w-3 rounded-sm bg-primary/60" />
      <span className="block h-2 w-full rounded-sm bg-text-tertiary" />
      <span className="block h-2 w-3/4 rounded-sm bg-text-tertiary" />
    </span>
  ),
  process: () => (<><TitleBlock /><CardsBlock count={4} numbered /></>),
  cards: () => (<><TitleBlock /><CardsBlock count={3} /></>),
  matrix: () => (<><TitleBlock /><MatrixBlock /></>),
  'big-number': () => (
    <span className="flex flex-1 items-center gap-2">
      <span className="block h-6 w-1/3 rounded-sm bg-primary/60" />
      <LinesBlock count={3} className="flex-1" />
    </span>
  ),
  'image-text': () => (
    <span className="grid flex-1 grid-cols-2 gap-2">
      <span className="block rounded-sm bg-primary/20" />
      <span className="flex flex-col justify-center gap-1.5"><TitleBlock /><LinesBlock count={2} /></span>
    </span>
  ),
  'image-full': () => (
    <span className="flex flex-1 flex-col justify-end gap-1 rounded-sm bg-primary/25 p-1.5">
      <span className="block h-1.5 w-1/2 rounded-sm bg-text-primary" />
    </span>
  ),
  people: () => (<><TitleBlock /><PeopleBlock /></>),
  funnel: () => (<><TitleBlock /><FunnelBlock /></>),
  kpi: () => (
    <>
      <span className="grid grid-cols-3 gap-1">
        {[0, 1, 2].map((i) => <span key={i} className="block h-2 rounded-sm bg-primary/50" />)}
      </span>
      <ChartBlock />
    </>
  ),
};

/**
 * A layout drawn as blocks (title bar, text lines, bars, figures) in a 16:9
 * frame — what `LayoutGallery` shows when the host has no rendered preview.
 * Decorative: `aria-hidden`, the tile's text names the layout.
 */
export function SlideLayoutSchematic({ layout, className }: { layout: SlideLayout; className?: string }) {
  return (
    <span
      aria-hidden="true"
      data-layout-schematic={layout}
      className={cn('flex aspect-video w-full flex-col gap-2 overflow-hidden rounded-md border border-border bg-surface-muted p-3', className)}
    >
      {SCHEMATICS[layout]()}
    </span>
  );
}

/** A host's SVG preview, or the schematic when there is none. Shared with `TemplateGallery`. */
export function LayoutPreviewFrame({ svg, layout, className }: { svg?: string; layout?: SlideLayout; className?: string }) {
  const src = svgDataUri(svg);
  if (src) {
    return (
      <span className={cn('block aspect-video w-full overflow-hidden rounded-md border border-border bg-surface', className)}>
        <img src={src} alt="" draggable={false} loading="lazy" className="block h-full w-full object-contain" data-preview="svg" />
      </span>
    );
  }
  if (layout) return <SlideLayoutSchematic layout={layout} className={className} />;
  return <span aria-hidden="true" className={cn('block aspect-video w-full rounded-md border border-border bg-surface-muted', className)} />;
}

// ---------------------------------------------------------------------------
// The gallery
// ---------------------------------------------------------------------------

export function LayoutGallery({
  onSelect,
  layouts,
  hiddenLayouts,
  previews,
  selected,
  label = 'Slide layouts',
  className,
  testIdPrefix = 'layout-gallery',
}: LayoutGalleryProps) {
  const hidden = new Set(hiddenLayouts ?? []);
  const tiles = (list: readonly SlideLayout[], listLabel: string) => (
      <ul aria-label={listLabel} className="m-0 grid list-none grid-cols-1 gap-3 p-0 @md:grid-cols-2 @2xl:grid-cols-3">
        {list.filter((layout) => !hidden.has(layout)).map((layout) => (
          <li key={layout} className="min-w-0">
            <SelectableCard
              selected={selected === layout}
              onSelect={() => onSelect(layout)}
              className="flex h-full flex-col gap-2"
              data-testid={`${testIdPrefix}-${layout}`}
              data-layout={layout}
            >
              <LayoutPreviewFrame svg={previews?.[layout]} layout={layout} />
              <span className="flex min-w-0 flex-col gap-0.5">
                <Text as="span" size="sm" weight="medium" className="block">{SLIDE_LAYOUT_LABELS[layout]}</Text>
                <Text as="span" size="xs" tone="secondary" className="block">{SLIDE_LAYOUT_DESCRIPTIONS[layout]}</Text>
              </span>
            </SelectableCard>
          </li>
        ))}
      </ul>
  );
  if (layouts) {
    return (
      <div className={cn('@container min-w-0', className)} data-testid={testIdPrefix}>
        {tiles(layouts, label)}
      </div>
    );
  }
  return (
    <div role="group" aria-label={label} className={cn('@container flex min-w-0 flex-col gap-4', className)} data-testid={testIdPrefix}>
      {SLIDE_LAYOUT_GROUPS.filter((group) => group.layouts.some((layout) => !hidden.has(layout))).map((group) => (
        <section key={group.id} className="flex flex-col gap-2" data-testid={`${testIdPrefix}-group-${group.id}`}>
          <SectionLabel as="div">{group.label}</SectionLabel>
          {tiles(group.layouts, group.label)}
        </section>
      ))}
    </div>
  );
}

export default LayoutGallery;

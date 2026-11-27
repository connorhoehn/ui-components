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
import { SLIDE_LAYOUTS, SLIDE_LAYOUT_DESCRIPTIONS, SLIDE_LAYOUT_LABELS, type SlideLayout } from './deckSpec';
import { svgDataUri } from './svgPreview';

export interface LayoutGalleryProps {
  /** Called with the tile's layout when it is pressed. */
  onSelect: (layout: SlideLayout) => void;
  /** The layouts to offer, in order. Default: every layout (`SLIDE_LAYOUTS`). */
  layouts?: readonly SlideLayout[];
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
  layouts = SLIDE_LAYOUTS,
  previews,
  selected,
  label = 'Slide layouts',
  className,
  testIdPrefix = 'layout-gallery',
}: LayoutGalleryProps) {
  return (
    <div className={cn('@container min-w-0', className)} data-testid={testIdPrefix}>
      <ul aria-label={label} className="m-0 grid list-none grid-cols-1 gap-3 p-0 @md:grid-cols-2 @2xl:grid-cols-3">
        {layouts.map((layout) => (
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
    </div>
  );
}

export default LayoutGallery;

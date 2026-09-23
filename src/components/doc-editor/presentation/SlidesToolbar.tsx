// The presentation editor's toolbar: New slide, Layout, Insert, Theme, the
// chart's own Bar/Line switch, Undo/Redo, and Present.
//
// ## Only what the spec can hold
//
// A deck is a `DeckSpec`: typed layouts and plain-string fields, rendered by
// the platform. There is no rich text in it, so there is no Bold, no Italic
// and no font menu here — a button that cannot change the rendered slide is a
// lie on the toolbar. Every control below writes one real field:
//
//   Layout   → `slide.layout` (content the old layout used is kept)
//   Insert   → a new slide of that layout after the current one
//   Theme    → `spec.theme`
//   Bar/Line → `slide.chart.kind`, only on a chart slide
//
// The line "Text style comes from the theme" says so, instead of leaving the
// person to look for formatting that is not there.
//
// Present opens the host's presentation view (`PresentationView`) — the
// reading surface — rather than a second full-screen player.
//
// ## One row, at every width
//
// The bar never wraps. It used to (`flex-wrap`), and in a 1280px window the
// deck editor's toolbar took two rows (58px) — the style note alone is 170px,
// and it was shown by the WINDOW's width (`xl:`) rather than the bar's. Like
// `DocumentToolbar`, the bar measures its own box and picks a layout — see
// `SLIDES_TOOLBAR_BREAKPOINTS`. What does not fit goes behind ⋯; New slide,
// Undo/Redo and Present never leave the bar.

import type { ReactNode } from 'react';
import { cn } from '../../../lib/cn';
import { useMeasuredWidth } from '../useMeasuredWidth';
import { Button } from '../../ui/Button';
import { IconButton } from '../../ui/IconButton';
import { ChevronIcon, PlusIcon } from '../../ui/Icons';
import { DropdownMenu, type DropdownMenuSection } from '../../shared/DropdownMenu';
import { useRovingToolbar } from '../../shared/RovingToolbar';
import SegmentedControl from '../../shared/SegmentedControl';
import { Text } from '../../shared/Text';
import {
  DECK_THEMES,
  SLIDE_LAYOUTS,
  SLIDE_LAYOUT_LABELS,
  type DeckChart,
  type DeckSlide,
  type DeckTheme,
  type SlideLayout,
} from './deckSpec';

/** The layouts the Insert menu offers, in the order a person reaches for them. */
export const SLIDE_INSERTS: readonly SlideLayout[] = ['chart', 'quote', 'image', 'two-column'];

const THEME_LABELS: Record<DeckTheme, string> = {
  product: 'Product',
  engineering: 'Engineering',
  plain: 'Plain',
};

/** One-row layouts, widest first. */
export type SlidesToolbarSize = 'wide' | 'medium' | 'narrow';

/**
 * Content-box widths (px) of the bar itself, not the window.
 *
 * - wide (≥ 900): everything inline, the style note included.
 * - medium (≥ 600): Insert, Theme and the style note move behind ⋯; New
 *   slide, Layout, the chart switch, Undo/Redo, `end` and Present stay.
 * - narrow: Layout and the chart switch join them behind ⋯.
 *
 * Measured with every control on (a chart slide, undo/redo, Present): the
 * wide bar's natural width is ~850px, medium's ~560px, narrow's ~340px. The
 * deck editor's bar in the shell is ~870px at a 1280px window.
 */
export const SLIDES_TOOLBAR_BREAKPOINTS = { narrow: 600, wide: 900 } as const;

/** `null` — not measured yet — is wide: a first paint that hides controls and then shows them is worse than one frame of overflow. */
export function slidesToolbarSize(width: number | null): SlidesToolbarSize {
  if (width == null) return 'wide';
  if (width < SLIDES_TOOLBAR_BREAKPOINTS.narrow) return 'narrow';
  if (width < SLIDES_TOOLBAR_BREAKPOINTS.wide) return 'medium';
  return 'wide';
}

/** The groups a width can take off the bar and put behind ⋯. */
type ToolbarGroup = 'layout' | 'insert' | 'theme' | 'chart' | 'note';
const INLINE_GROUPS: Record<SlidesToolbarSize, ReadonlySet<ToolbarGroup>> = {
  wide: new Set<ToolbarGroup>(['layout', 'insert', 'theme', 'chart', 'note']),
  medium: new Set<ToolbarGroup>(['layout', 'chart']),
  narrow: new Set<ToolbarGroup>([]),
};

const STYLE_NOTE = 'Text style comes from the theme';
const STYLE_NOTE_TITLE = 'A deck is rendered from its layout and theme, so text has no bold, italic or font of its own.';

export interface SlidesToolbarProps {
  /** The slide on the stage. Layout and the chart switch act on it. */
  slide?: DeckSlide;
  theme: DeckTheme;
  /** Adds a slide after the current one. `layout` comes from Insert. */
  onAddSlide: (layout?: SlideLayout) => void;
  /** False at the deck's slide cap. */
  canAddSlide?: boolean;
  onLayoutChange: (layout: SlideLayout) => void;
  onThemeChange: (theme: DeckTheme) => void;
  onChartKindChange?: (kind: DeckChart['kind']) => void;
  onUndo?: () => void;
  onRedo?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
  /** Renders Present. */
  onPresent?: () => void;
  /** Before Present — revision tabs, Save, Download when the host has no header for them. */
  end?: ReactNode;
  disabled?: boolean;
  className?: string;
  /** Prefix for the controls' test ids. Default `slides-toolbar`. */
  testIdPrefix?: string;
  /**
   * How much of the bar fits on ONE row. `auto` (the default) measures the
   * bar's own box — see `SLIDES_TOOLBAR_BREAKPOINTS`. A fixed value is for
   * tests and stories.
   */
  size?: SlidesToolbarSize | 'auto';
}

function UndoGlyph({ redo }: { redo?: boolean }) {
  return (
    <svg viewBox="0 0 16 16" className={cn('h-3.5 w-3.5', redo && '-scale-x-100')} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M5.5 4.5L3 7l2.5 2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.5 7h6a3.5 3.5 0 010 7H7" strokeLinecap="round" />
    </svg>
  );
}

function PlayGlyph() {
  return (
    <svg viewBox="0 0 16 16" className="h-3 w-3" fill="currentColor" aria-hidden="true">
      <path d="M4.5 3v10l8-5-8-5z" />
    </svg>
  );
}

function Divider() {
  return <span className="mx-1 h-5 w-px shrink-0 bg-border" aria-hidden="true" />;
}

function MenuTrigger({ label, value }: { label: string; value?: string }) {
  return (
    <span className="inline-flex items-center gap-1 text-[12px]">
      <span className="text-text-secondary">{label}</span>
      {value && <span className="font-medium text-text-primary">{value}</span>}
      <ChevronIcon size={12} />
    </span>
  );
}

export function SlidesToolbar({
  slide,
  theme,
  onAddSlide,
  canAddSlide = true,
  onLayoutChange,
  onThemeChange,
  onChartKindChange,
  onUndo,
  onRedo,
  canUndo = false,
  canRedo = false,
  onPresent,
  end,
  disabled = false,
  className,
  testIdPrefix = 'slides-toolbar',
  size: sizeProp = 'auto',
}: SlidesToolbarProps) {
  const { ref: rovingRef, ...roving } = useRovingToolbar();
  const { ref: rootRef, width } = useMeasuredWidth<HTMLDivElement>(rovingRef);
  const size: SlidesToolbarSize = sizeProp === 'auto' ? slidesToolbarSize(width) : sizeProp;
  const inline = INLINE_GROUPS[size];
  const on = (g: ToolbarGroup) => inline.has(g);
  const locked = disabled;

  // What each control is, once; where it renders — the bar or ⋯ — is the
  // width's decision. A control the state rules out (no slide, at the cap) is
  // absent from both, never a dead row.
  const layoutSection: DropdownMenuSection | null = !locked && slide ? {
    label: 'Layout of this slide',
    items: SLIDE_LAYOUTS.map((layout) => ({
      label: SLIDE_LAYOUT_LABELS[layout],
      checked: layout === slide.layout,
      onSelect: () => { if (layout !== slide.layout) onLayoutChange(layout); },
      'data-testid': `${testIdPrefix}-layout-${layout}`,
    })),
  } : null;
  const insertSection: DropdownMenuSection | null = !locked && canAddSlide ? {
    label: 'New slide after this one',
    items: SLIDE_INSERTS.map((layout) => ({
      label: `${SLIDE_LAYOUT_LABELS[layout]} slide`,
      onSelect: () => onAddSlide(layout),
      'data-testid': `${testIdPrefix}-insert-${layout}`,
    })),
  } : null;
  const themeSection: DropdownMenuSection | null = !locked ? {
    label: 'Deck theme',
    items: DECK_THEMES.map((candidate) => ({
      label: THEME_LABELS[candidate],
      checked: candidate === theme,
      onSelect: () => { if (candidate !== theme) onThemeChange(candidate); },
      'data-testid': `${testIdPrefix}-theme-${candidate}`,
    })),
  } : null;
  const chart = !locked && slide?.layout === 'chart' && slide.chart && onChartKindChange ? slide.chart : null;
  const chartSection: DropdownMenuSection | null = chart && onChartKindChange ? {
    label: 'Chart type',
    items: (['bar', 'line'] as const).map((kind) => ({
      label: kind === 'bar' ? 'Bar' : 'Line',
      checked: chart.kind === kind,
      onSelect: () => { if (chart.kind !== kind) onChartKindChange(kind); },
      'data-testid': `${testIdPrefix}-chart-kind-${kind}`,
    })),
  } : null;

  // ⋯ holds, in bar order, whatever this width took off the bar. The note is
  // a heading there — a sentence, not a choice — so it is never a row that
  // does nothing. Empty means no ⋯ at all.
  const overflow: DropdownMenuSection[] = [];
  if (!on('layout') && layoutSection) overflow.push(layoutSection);
  if (!on('insert') && insertSection) overflow.push(insertSection);
  if (!on('theme') && themeSection) overflow.push(themeSection);
  if (!on('chart') && chartSection) overflow.push(chartSection);
  if (!on('note') && !locked) overflow.push({ label: STYLE_NOTE, items: [], 'data-testid': `${testIdPrefix}-style-note` });

  return (
    <div
      {...roving}
      ref={rootRef}
      role="toolbar"
      aria-label="Slide tools"
      data-size={size}
      // `flex-nowrap` and `min-w-0`: one row, always. The width rules above
      // decide what fits; the row never folds.
      className={cn('flex min-w-0 flex-1 flex-nowrap items-center gap-1', className)}
      data-testid={testIdPrefix}
    >
      <Button
        variant="primary"
        size="sm"
        disabled={locked || !canAddSlide}
        onClick={() => onAddSlide()}
        className="shrink-0 whitespace-nowrap"
        data-testid={`${testIdPrefix}-new-slide`}
      >
        <span className="inline-flex items-center gap-1"><PlusIcon size={12} />New slide</span>
      </Button>

      {on('layout') && layoutSection && slide && (
        <DropdownMenu
          trigger={<MenuTrigger label="Layout" value={SLIDE_LAYOUT_LABELS[slide.layout]} />}
          triggerLabel={`Layout: ${SLIDE_LAYOUT_LABELS[slide.layout]}`}
          triggerClassName="shrink-0 border-transparent"
          triggerTestId={`${testIdPrefix}-layout`}
          sections={[layoutSection]}
          data-testid={`${testIdPrefix}-layout-menu`}
        />
      )}

      {on('insert') && insertSection && (
        <DropdownMenu
          trigger={<MenuTrigger label="Insert" />}
          triggerLabel="Insert a slide"
          triggerClassName="shrink-0 border-transparent"
          triggerTestId={`${testIdPrefix}-insert`}
          sections={[insertSection]}
          data-testid={`${testIdPrefix}-insert-menu`}
        />
      )}

      {on('theme') && themeSection && (
        <DropdownMenu
          trigger={<MenuTrigger label="Theme" value={THEME_LABELS[theme]} />}
          triggerLabel={`Theme: ${THEME_LABELS[theme]}`}
          triggerClassName="shrink-0 border-transparent"
          triggerTestId={`${testIdPrefix}-theme`}
          sections={[themeSection]}
          data-testid={`${testIdPrefix}-theme-menu`}
        />
      )}

      {on('chart') && chart && onChartKindChange && (
        <SegmentedControl
          size="sm"
          value={chart.kind}
          onChange={(value) => onChartKindChange(value as DeckChart['kind'])}
          options={[
            { value: 'bar', label: 'Bar' },
            { value: 'line', label: 'Line' },
          ]}
          aria-label="Chart type"
          className="shrink-0"
          data-testid={`${testIdPrefix}-chart-kind`}
        />
      )}

      {(onUndo || onRedo) && (
        <>
          <Divider />
          {onUndo && (
            <IconButton
              aria-label="Undo"
              title="Undo (⌘Z)"
              variant="ghost"
              size="sm"
              icon={<UndoGlyph />}
              disabled={locked || !canUndo}
              onClick={onUndo}
              data-testid={`${testIdPrefix}-undo`}
            />
          )}
          {onRedo && (
            <IconButton
              aria-label="Redo"
              title="Redo (⇧⌘Z)"
              variant="ghost"
              size="sm"
              icon={<UndoGlyph redo />}
              disabled={locked || !canRedo}
              onClick={onRedo}
              data-testid={`${testIdPrefix}-redo`}
            />
          )}
        </>
      )}

      {overflow.length > 0 && (
        <>
          <Divider />
          <DropdownMenu
            trigger={<span className="text-[14px] leading-none" aria-hidden="true">⋯</span>}
            triggerLabel="More slide tools"
            triggerTitle="More slide tools"
            triggerClassName="shrink-0 border-transparent"
            triggerTestId={`${testIdPrefix}-more`}
            sections={overflow}
            data-testid={`${testIdPrefix}-more-menu`}
          />
        </>
      )}

      {on('note') && (
        <Text
          as="span"
          className="ml-1 shrink-0 whitespace-nowrap text-[11px] text-text-tertiary"
          title={STYLE_NOTE_TITLE}
          data-testid={`${testIdPrefix}-style-note`}
        >
          {STYLE_NOTE}
        </Text>
      )}

      <span className="min-w-0 flex-1" aria-hidden="true" />

      {end}

      {onPresent && (
        <Button variant="secondary" size="sm" onClick={onPresent} className="shrink-0 whitespace-nowrap" data-testid={`${testIdPrefix}-present`}>
          <span className="inline-flex items-center gap-1.5"><PlayGlyph />Present</span>
        </Button>
      )}
    </div>
  );
}

export default SlidesToolbar;

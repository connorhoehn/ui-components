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
// Present calls `onPresent`. `PresentationEditor` presents in place
// (`DeckPresentMode` in its own regions, since 2.548.0), or opens the host's
// view when the host passes one; never a dialog over the page.
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
  DECK_CHART_KINDS,
  DECK_CHART_KIND_LABELS,
  DECK_THEMES,
  SLIDE_LAYOUTS,
  SLIDE_LAYOUT_LABELS,
  type DeckChart,
  type DeckSlide,
  type DeckTheme,
  type DeckThemeRef,
  type SlideLayout,
  isDeckThemeRef,
} from './deckSpec';
import { DensityProvider } from '../../shared/Density';

/** The layouts the Insert menu offers, in the order a person reaches for them. */
export const SLIDE_INSERTS: readonly SlideLayout[] = ['chart', 'quote', 'image', 'two-column'];

const THEME_LABELS: Record<DeckTheme, string> = {
  product: 'Product',
  engineering: 'Engineering',
  plain: 'Plain',
};

/** A theme the host publishes, offered beside the built-ins; choosing it writes `{ ref: id }`. */
export interface SlidesToolbarTheme {
  id: string;
  name: string;
}

/** The trigger's name for the deck's theme: a built-in's label, a host theme's name, or the ref's id. */
function themeName(theme: DeckTheme | DeckThemeRef, themes: readonly SlidesToolbarTheme[]): string {
  if (isDeckThemeRef(theme)) return themes.find((candidate) => candidate.id === theme.ref)?.name ?? theme.ref;
  return THEME_LABELS[theme] ?? theme;
}

/** One-row layouts, widest first. */
export type SlidesToolbarSize = 'wide' | 'medium' | 'narrow';

/**
 * Content-box widths (px) of the bar itself, not the window.
 *
 * - wide (≥ 900): everything inline, the style note included.
 * - medium (≥ 640): Insert and the style note move behind ⋯ first — the
 *   least used. New slide, Layout, Theme, Undo/Redo, `end` and Present stay.
 *   The chart switch stays too while the bar is at least `chart` (760) wide;
 *   below that it goes behind ⋯ next (the slide form has Chart type as well).
 * - narrow: Layout and Theme join them behind ⋯.
 *
 * Collapse order, first to last: Insert and the style note, the chart switch,
 * then Layout and Theme. Until 2.549.0 Theme left with Insert below 900px,
 * which was most editors, and medium started at 600.
 *
 * Measured with every control on (a chart slide, undo/redo, Present): the
 * wide bar's natural width is ~850px and narrow's ~340px; Layout is ~110px,
 * the chart switch ~110px and Theme ~120px, so medium is ~690px with the
 * switch and ~580px without it. Nothing here was measured again in a browser
 * for 2.549.0; the widths are the earlier walk's, added up.
 */
export const SLIDES_TOOLBAR_BREAKPOINTS = { narrow: 640, chart: 760, wide: 900 } as const;

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
  // `chart` is inline at medium only from SLIDES_TOOLBAR_BREAKPOINTS.chart up.
  medium: new Set<ToolbarGroup>(['layout', 'theme', 'chart']),
  narrow: new Set<ToolbarGroup>([]),
};

const STYLE_NOTE = 'Text style comes from the theme';
const STYLE_NOTE_TITLE = 'A deck is rendered from its layout and theme, so text has no bold, italic or font of its own.';

export interface SlidesToolbarProps {
  /** The slide on the stage. Layout and the chart switch act on it. */
  slide?: DeckSlide;
  /** The deck's theme: a built-in name, or `{ ref }` naming one of `themes` (since 2.547.0). */
  theme: DeckTheme | DeckThemeRef;
  /**
   * Host-published themes (since 2.547.0), listed after the three built-ins.
   * Choosing one calls `onThemeChange({ ref: id })`. Omitted, the menu is the
   * built-ins only, as before.
   */
  themes?: readonly SlidesToolbarTheme[];
  /** Adds a slide after the current one. `layout` comes from Insert. */
  onAddSlide: (layout?: SlideLayout) => void;
  /** False at the deck's slide cap. */
  canAddSlide?: boolean;
  onLayoutChange: (layout: SlideLayout) => void;
  /** A built-in theme was chosen. */
  onThemeChange: (theme: DeckTheme) => void;
  /**
   * A host theme from `themes` was chosen (since 2.547.0): `{ ref: id }`.
   * Without it, `themes` is not offered — the menu would hold rows that do
   * nothing.
   */
  onThemeRefChange?: (theme: DeckThemeRef) => void;
  /**
   * Adds "All layouts…" to Insert (since 2.547.0): the host opens a
   * `LayoutGallery`. `PresentationEditor` passes it and shows the gallery in place of its stage.
   */
  onBrowseLayouts?: () => void;
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
  themes = [],
  onAddSlide,
  canAddSlide = true,
  onBrowseLayouts,
  onLayoutChange,
  onThemeChange,
  onThemeRefChange,
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
  // A bar told its size (no measurement) keeps the chart switch at medium.
  const chartRoom = size !== 'medium' || width == null || width >= SLIDES_TOOLBAR_BREAKPOINTS.chart;
  const on = (g: ToolbarGroup) => inline.has(g) && (g !== 'chart' || chartRoom);
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
    })).concat(onBrowseLayouts ? [{
      label: 'All layouts…',
      onSelect: onBrowseLayouts,
      'data-testid': `${testIdPrefix}-insert-all`,
    }] : []),
  } : null;
  const themeRef = isDeckThemeRef(theme) ? theme.ref : null;
  const themeSection: DropdownMenuSection | null = !locked ? {
    label: 'Deck theme',
    items: DECK_THEMES.map((candidate) => ({
      label: THEME_LABELS[candidate],
      checked: candidate === theme,
      onSelect: () => { if (candidate !== theme) onThemeChange(candidate); },
      'data-testid': `${testIdPrefix}-theme-${candidate}`,
    })).concat((onThemeRefChange ? themes : []).map((candidate) => ({
      label: candidate.name,
      checked: candidate.id === themeRef,
      onSelect: () => { if (candidate.id !== themeRef) onThemeRefChange?.({ ref: candidate.id }); },
      'data-testid': `${testIdPrefix}-theme-ref-${candidate.id}`,
    }))),
  } : null;
  const currentThemeName = themeName(theme, themes);
  const chart = !locked && slide?.layout === 'chart' && slide.chart && onChartKindChange ? slide.chart : null;
  const chartSection: DropdownMenuSection | null = chart && onChartKindChange ? {
    label: 'Chart type',
    items: DECK_CHART_KINDS.map((kind) => ({
      label: DECK_CHART_KIND_LABELS[kind],
      checked: chart.kind === kind,
      onSelect: () => { if (chart.kind !== kind) onChartKindChange(kind); },
      'data-testid': `${testIdPrefix}-chart-kind-${kind}`,
    })),
  } : null;

  // The inline switch is Bar | Line, the two kinds a person flips between.
  // A stacked-bar or pie slide adds its own kind as a third segment, so the
  // switch always shows what the slide is; that segment's width is paid for
  // by moving the style note behind ⋯ (a sentence, not a choice). All four
  // kinds are in the slide form's Chart type and in ⋯ when the switch is.
  const extraKind = chart && chart.kind !== 'bar' && chart.kind !== 'line' && on('chart') ? chart.kind : null;
  const inlineKinds: DeckChart['kind'][] = extraKind ? ['bar', 'line', extraKind] : ['bar', 'line'];

  // ⋯ holds, in bar order, whatever this width took off the bar. The note is
  // a heading there — a sentence, not a choice — so it is never a row that
  // does nothing. Empty means no ⋯ at all.
  const overflow: DropdownMenuSection[] = [];
  if (!on('layout') && layoutSection) overflow.push(layoutSection);
  if (!on('insert') && insertSection) overflow.push(insertSection);
  if (!on('theme') && themeSection) overflow.push(themeSection);
  if (!on('chart') && chartSection) overflow.push(chartSection);
  if ((!on('note') || extraKind) && !locked) overflow.push({ label: STYLE_NOTE, items: [], 'data-testid': `${testIdPrefix}-style-note` });

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
          trigger={<MenuTrigger label="Theme" value={currentThemeName} />}
          triggerLabel={`Theme: ${currentThemeName}`}
          triggerClassName="shrink-0 border-transparent"
          triggerTestId={`${testIdPrefix}-theme`}
          sections={[themeSection]}
          data-testid={`${testIdPrefix}-theme-menu`}
        />
      )}

      {on('chart') && chart && onChartKindChange && (
        <DensityProvider density="compact"><SegmentedControl
          value={chart.kind}
          onChange={(value) => onChartKindChange(value as DeckChart['kind'])}
          options={inlineKinds.map((kind) => ({ value: kind, label: DECK_CHART_KIND_LABELS[kind] }))}
          aria-label="Chart type"
          className="shrink-0"
          data-testid={`${testIdPrefix}-chart-kind`}
        /></DensityProvider>
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

      {on('note') && !extraKind && (
        <Text
          as="span"
          className="ml-1 shrink-0 whitespace-nowrap text-xs text-text-tertiary"
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

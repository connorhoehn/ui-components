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

import type { ReactNode } from 'react';
import { cn } from '../../../lib/cn';
import { Button } from '../../ui/Button';
import { IconButton } from '../../ui/IconButton';
import { ChevronIcon, PlusIcon } from '../../ui/Icons';
import { DropdownMenu } from '../../shared/DropdownMenu';
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
}: SlidesToolbarProps) {
  const roving = useRovingToolbar();
  const locked = disabled;
  return (
    <div
      {...roving}
      role="toolbar"
      aria-label="Slide tools"
      className={cn('flex min-w-0 flex-1 flex-wrap items-center gap-1', className)}
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

      {!locked && slide && (
        <DropdownMenu
          trigger={<MenuTrigger label="Layout" value={SLIDE_LAYOUT_LABELS[slide.layout]} />}
          triggerLabel={`Layout: ${SLIDE_LAYOUT_LABELS[slide.layout]}`}
          triggerClassName="border-transparent"
          triggerTestId={`${testIdPrefix}-layout`}
          sections={[
            {
              label: 'Layout of this slide',
              items: SLIDE_LAYOUTS.map((layout) => ({
                label: SLIDE_LAYOUT_LABELS[layout],
                checked: layout === slide.layout,
                onSelect: () => { if (layout !== slide.layout) onLayoutChange(layout); },
                'data-testid': `${testIdPrefix}-layout-${layout}`,
              })),
            },
          ]}
          data-testid={`${testIdPrefix}-layout-menu`}
        />
      )}

      {!locked && canAddSlide && (
        <DropdownMenu
          trigger={<MenuTrigger label="Insert" />}
          triggerLabel="Insert a slide"
          triggerClassName="border-transparent"
          triggerTestId={`${testIdPrefix}-insert`}
          sections={[
            {
              label: 'New slide after this one',
              items: SLIDE_INSERTS.map((layout) => ({
                label: `${SLIDE_LAYOUT_LABELS[layout]} slide`,
                onSelect: () => onAddSlide(layout),
                'data-testid': `${testIdPrefix}-insert-${layout}`,
              })),
            },
          ]}
          data-testid={`${testIdPrefix}-insert-menu`}
        />
      )}

      {!locked && (
        <DropdownMenu
          trigger={<MenuTrigger label="Theme" value={THEME_LABELS[theme]} />}
          triggerLabel={`Theme: ${THEME_LABELS[theme]}`}
          triggerClassName="border-transparent"
          triggerTestId={`${testIdPrefix}-theme`}
          sections={[
            {
              label: 'Deck theme',
              items: DECK_THEMES.map((candidate) => ({
                label: THEME_LABELS[candidate],
                checked: candidate === theme,
                onSelect: () => { if (candidate !== theme) onThemeChange(candidate); },
                'data-testid': `${testIdPrefix}-theme-${candidate}`,
              })),
            },
          ]}
          data-testid={`${testIdPrefix}-theme-menu`}
        />
      )}

      {!locked && slide?.layout === 'chart' && slide.chart && onChartKindChange && (
        <SegmentedControl
          size="sm"
          value={slide.chart.kind}
          onChange={(value) => onChartKindChange(value as DeckChart['kind'])}
          options={[
            { value: 'bar', label: 'Bar' },
            { value: 'line', label: 'Line' },
          ]}
          aria-label="Chart type"
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

      <Text
        as="span"
        className="ml-1 hidden text-[11px] text-text-tertiary xl:inline"
        title="A deck is rendered from its layout and theme, so text has no bold, italic or font of its own."
        data-testid={`${testIdPrefix}-style-note`}
      >
        Text style comes from the theme
      </Text>

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

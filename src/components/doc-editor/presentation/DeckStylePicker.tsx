// DeckStylePicker — the deck's five style presets as tiles (since 2.550.0).
//
// Bold, Editorial, Minimal, Playful and Corporate (the engine's `DeckStyle`).
// Each tile is a `SelectableCard` holding a 16:9 preview, the name and one
// line on the look. The preview is the host's image when it passes one
// (`previews[style]`: a URL or `data:` URI, typically the engine's render of a
// sample cover in that style) and otherwise a swatch drawn from blocks, so
// the row never shows an empty frame.
//
// The style lives on the host's theme (`styledTheme(theme, style)`), not on
// the spec: the picker reports the choice through `onChange` and the host
// applies it. Inline, in the page layout, like `LayoutGallery`.

import type { ReactNode } from 'react';
import { cn } from '../../../lib/cn';
import { SelectableCard } from '../../ui/SelectableCard';
import { Text } from '../../shared/Text';
import { DECK_STYLES, DECK_STYLE_DESCRIPTIONS, DECK_STYLE_LABELS, type DeckStyle } from './deckSpec';

export interface DeckStylePickerProps {
  value?: DeckStyle;
  onChange: (style: DeckStyle) => void;
  /** A preview image per style (URL or `data:` URI). A style without one shows a drawn swatch. */
  previews?: Partial<Record<DeckStyle, string>>;
  /** The styles to offer, in order. Default all five. */
  styles?: readonly DeckStyle[];
  /** The list's accessible name. Default "Deck styles". */
  label?: string;
  className?: string;
  /** Test-id prefix. Default `deck-style-picker`; tiles are `<prefix>-<style>`. */
  testIdPrefix?: string;
}

const SWATCHES: Record<DeckStyle, () => ReactNode> = {
  bold: () => (
    <span className="flex flex-1 flex-col justify-end gap-1 rounded-sm bg-primary p-2">
      <span className="block h-2 w-3/4 rounded-sm bg-text-inverse" />
      <span className="block h-1 w-1/3 rounded-sm bg-text-inverse/60" />
    </span>
  ),
  editorial: () => (
    <span className="relative flex flex-1 flex-col justify-center gap-1 bg-surface p-2">
      <span className="absolute right-1.5 top-1.5 block h-3 w-3 border-r-2 border-t-2 border-primary" />
      <span className="block h-px w-1/4 bg-text-primary" />
      <span className="block h-2 w-2/3 bg-text-primary" />
      <span className="block h-1 w-1/2 bg-border-emphasis" />
    </span>
  ),
  minimal: () => (
    <span className="flex flex-1 flex-col justify-center gap-1 bg-surface p-3">
      <span className="block h-1.5 w-1/2 rounded-sm bg-text-secondary" />
      <span className="block h-px w-full bg-border" />
    </span>
  ),
  playful: () => (
    <span className="relative flex flex-1 items-end gap-1 overflow-hidden rounded-lg bg-primary/15 p-2">
      <span className="absolute -right-2 -top-2 block h-8 w-8 rounded-full bg-primary/50" />
      <span className="absolute left-2 top-2 block h-1.5 w-1.5 rounded-full bg-accent" />
      <span className="absolute left-6 top-4 block h-1 w-1 rounded-full bg-primary" />
      <span className="block h-4 flex-1 rounded-md bg-surface" />
      <span className="block h-4 flex-1 rounded-md bg-surface" />
    </span>
  ),
  corporate: () => (
    <span className="flex flex-1 flex-col bg-surface">
      <span className="block h-2 w-full bg-primary" />
      <span className="flex flex-1 flex-col justify-center gap-1 p-2">
        <span className="block h-1.5 w-1/2 bg-text-primary" />
        <span className="grid grid-cols-3 gap-1">
          <span className="block h-2 bg-border-emphasis" />
          <span className="block h-2 bg-border-emphasis" />
          <span className="block h-2 bg-border-emphasis" />
        </span>
      </span>
    </span>
  ),
};

/** A style drawn as blocks in a 16:9 frame. Decorative: the tile's text names the style. */
export function DeckStyleSwatch({ style, className }: { style: DeckStyle; className?: string }) {
  return (
    <span aria-hidden="true" data-style-swatch={style} className={cn('flex aspect-video w-full overflow-hidden rounded-md border border-border bg-surface-inset', className)}>
      {SWATCHES[style]()}
    </span>
  );
}

export function DeckStylePicker({
  value,
  onChange,
  previews,
  styles = DECK_STYLES,
  label = 'Deck styles',
  className,
  testIdPrefix = 'deck-style-picker',
}: DeckStylePickerProps) {
  return (
    <div className={cn('@container min-w-0', className)} data-testid={testIdPrefix}>
      <ul aria-label={label} className="m-0 grid list-none grid-cols-2 gap-2 p-0 @md:grid-cols-3 @2xl:grid-cols-5">
        {styles.map((style) => {
          const preview = previews?.[style];
          return (
            <li key={style} className="min-w-0">
              <SelectableCard
                selected={value === style}
                onSelect={() => onChange(style)}
                padding="sm"
                className="flex h-full flex-col gap-1.5"
                data-testid={`${testIdPrefix}-${style}`}
                data-style={style}
              >
                {preview ? (
                  <span className="block aspect-video w-full overflow-hidden rounded-md border border-border bg-surface">
                    <img src={preview} alt="" draggable={false} loading="lazy" className="block h-full w-full object-cover" data-preview="image" />
                  </span>
                ) : (
                  <DeckStyleSwatch style={style} />
                )}
                <span className="flex min-w-0 flex-col gap-0.5">
                  <Text as="span" size="sm" weight="medium" className="block">{DECK_STYLE_LABELS[style]}</Text>
                  <Text as="span" size="xs" tone="secondary" className="block">{DECK_STYLE_DESCRIPTIONS[style]}</Text>
                </span>
              </SelectableCard>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default DeckStylePicker;

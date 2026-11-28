// GraphicPicker — a slide's decoration from the graphics library (since 2.550.0).
//
// Inline in the form region, never a dialog. Three kinds of choice:
//
// - Style default: no `decoration` field, so the slide takes its style's motif;
// - None: `decoration: 'none'`, nothing drawn;
// - a graphic: `{ graphic, placement? }`, with the placement (Default, Corner,
//   Background, Beside the title) chosen under the grid once a graphic is on.
//
// The host passes the catalogue rows (`items`, the engine's
// `GRAPHICS_CATALOGUE`) and, to show the artwork, `renderGraphic(name)` — the
// engine draws graphics as theme-tinted multi-tone paths in a frame
// (`graphicElements`), so only the host can draw one in its theme. Without
// it each tile shows the graphic's label.

import { useMemo, useState, type ReactNode } from 'react';
import { cn } from '../../../lib/cn';
import { SearchInput } from '../../shared/SearchInput';
import { SegmentedControl } from '../../shared/SegmentedControl';
import { SectionLabel } from '../../shared/SectionLabel';
import { Tabs } from '../../shared/Tabs';
import { Text } from '../../shared/Text';
import { DECK_DECORATION_PLACEMENTS, DECK_DECORATION_PLACEMENT_LABELS, type DeckDecoration, type DeckDecorationPlacement } from './deckSpec';
import { catalogueMatches, type DeckCatalogueItem } from './IconPicker';

/** Everything a form needs to offer decorations. Pass it to `SlideForm` / `PresentationEditor` as `graphics`. */
export interface DeckGraphicSource {
  items: readonly DeckCatalogueItem[];
  renderGraphic?: (name: string) => ReactNode;
}

export interface GraphicPickerProps {
  /** The catalogue rows (the engine's `GRAPHICS_CATALOGUE`). */
  items: readonly DeckCatalogueItem[];
  /** Draws one graphic's preview in the host's theme. */
  renderGraphic?: (name: string) => ReactNode;
  /** The slide's decoration: undefined is the style default, `'none'` is none. */
  value?: DeckDecoration | 'none';
  onChange: (value: DeckDecoration | 'none' | undefined) => void;
  /** The picker's accessible name. Default "Decoration". */
  label?: string;
  className?: string;
  /** Test-id prefix. Default `graphic-picker`; tiles are `<prefix>-<name>`. */
  testIdPrefix?: string;
}

const ALL = 'all';
const DEFAULT_PLACEMENT = 'default';

function categoryLabel(category: string): string {
  const name = category.charAt(0).toUpperCase() + category.slice(1);
  return name.endsWith('s') ? name : `${name}s`;
}

const TILE = 'flex h-full w-full flex-col items-center justify-center gap-1 rounded-md border border-border p-1.5 text-text-primary hover:bg-surface-hover aria-pressed:border-primary aria-pressed:bg-primary/10';

export function GraphicPicker({
  items,
  renderGraphic,
  value,
  onChange,
  label = 'Decoration',
  className,
  testIdPrefix = 'graphic-picker',
}: GraphicPickerProps) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(ALL);
  const categories = useMemo(() => [...new Set(items.map((item) => item.category))], [items]);
  const shown = useMemo(
    () => items.filter((item) => (category === ALL || item.category === category) && catalogueMatches(item, query)),
    [items, category, query],
  );
  const chosen = value && value !== 'none' ? value : undefined;

  return (
    <section aria-label={label} className={cn('@container flex min-w-0 flex-col gap-2 rounded-md border border-border bg-surface p-2', className)} data-testid={testIdPrefix}>
      <SearchInput value={query} onChange={setQuery} placeholder="Search graphics" aria-label={`Search ${label.toLowerCase()}`} />
      {categories.length > 1 && (
        <Tabs
          variant="pill"
          size="sm"
          aria-label={`${label} categories`}
          value={category}
          onValueChange={setCategory}
          items={[{ id: ALL, label: 'All' }, ...categories.map((id) => ({ id, label: categoryLabel(id) }))]}
          getItemTestId={(item) => `${testIdPrefix}-category-${item.id}`}
        />
      )}
      <ul aria-label={`${label}: ${shown.length} shown`} className="m-0 grid max-h-72 list-none grid-cols-3 gap-1.5 overflow-y-auto p-0 @md:grid-cols-4 @2xl:grid-cols-6">
        <li>
          <button type="button" aria-pressed={value === undefined} onClick={() => onChange(undefined)} className={TILE} data-testid={`${testIdPrefix}-default`}>
            <Text as="span" size="xs" weight="medium">Style default</Text>
            <Text as="span" size="xs" tone="tertiary">The style's motif</Text>
          </button>
        </li>
        <li>
          <button type="button" aria-pressed={value === 'none'} onClick={() => onChange('none')} className={TILE} data-testid={`${testIdPrefix}-none`}>
            <Text as="span" size="xs" weight="medium">None</Text>
            <Text as="span" size="xs" tone="tertiary">No graphic</Text>
          </button>
        </li>
        {shown.map((item) => (
          <li key={item.name}>
            <button
              type="button"
              aria-pressed={chosen?.graphic === item.name}
              aria-label={item.label}
              title={item.label}
              onClick={() => onChange({ graphic: item.name, ...(chosen?.placement ? { placement: chosen.placement } : {}) })}
              className={TILE}
              data-testid={`${testIdPrefix}-${item.name}`}
            >
              {renderGraphic && (
                <span aria-hidden="true" className="flex aspect-video w-full items-center justify-center overflow-hidden rounded-sm bg-surface-inset">
                  {renderGraphic(item.name)}
                </span>
              )}
              <Text as="span" size="xs" tone="secondary" className="line-clamp-1 w-full text-center">{item.label}</Text>
            </button>
          </li>
        ))}
      </ul>
      {chosen && (
        <div className="flex flex-wrap items-center gap-2" data-testid={`${testIdPrefix}-placement`}>
          <SectionLabel as="div">Placement</SectionLabel>
          <SegmentedControl
            size="sm"
            aria-label="Placement"
            value={chosen.placement ?? DEFAULT_PLACEMENT}
            onChange={(next) => {
              const { placement: _old, ...rest } = chosen;
              onChange(next === DEFAULT_PLACEMENT ? rest : { ...rest, placement: next as DeckDecorationPlacement });
            }}
            options={[
              { value: DEFAULT_PLACEMENT, label: 'Default', testId: `${testIdPrefix}-placement-default` },
              ...DECK_DECORATION_PLACEMENTS.map((placement) => ({
                value: placement,
                label: DECK_DECORATION_PLACEMENT_LABELS[placement],
                testId: `${testIdPrefix}-placement-${placement}`,
              })),
            ]}
          />
        </div>
      )}
    </section>
  );
}

export default GraphicPicker;

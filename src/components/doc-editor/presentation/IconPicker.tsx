// DeckIconPicker — choose an icon for a card, step, figure or comparison side (since 2.550.0).
//
// A searchable grid with category tabs, drawn inline where it is opened (the
// form region), never as a dialog or popover. Every icon is a button named by
// its label, `aria-pressed` on the current one.
//
// ## Where the artwork comes from
//
// The host passes it. The library never imports the deck engine at runtime
// (`@connorhoehn/realtime-modules` is an optional peer), so a host hands over:
//
// - `items`: catalogue rows `{ name, label, category, keywords }` — the
//   engine's `ICON_CATALOGUE` as is;
// - and either `icons`: `{ [name]: path data }`, stroked on a 24 x 24 grid —
//   the engine's `ICON_PATHS` as is (each value a path string or a list of
//   them) — or `renderIcon(name)`, for a host that draws its own.
//
// Neither given: each tile shows the icon's label alone.

import { useMemo, useState, type ReactNode } from 'react';
import { cn } from '../../../lib/cn';
import { SearchInput } from '../../shared/SearchInput';
import { Tabs } from '../../shared/Tabs';
import { Text } from '../../shared/Text';

/** One row of the engine's `ICON_CATALOGUE` or `GRAPHICS_CATALOGUE`. */
export interface DeckCatalogueItem {
  name: string;
  label: string;
  category: string;
  keywords: readonly string[];
}

/** Icon path data by name: the engine's `ICON_PATHS` (stroked, 24 x 24). */
export type DeckIconPaths = Readonly<Record<string, string | readonly string[]>>;

/** Everything a form needs to offer icons. Pass it to `SlideForm` / `PresentationEditor` as `icons`. */
export interface DeckIconSource {
  items: readonly DeckCatalogueItem[];
  icons?: DeckIconPaths;
  renderIcon?: (name: string) => ReactNode;
}

/** One icon as an inline SVG from path data, or the host's own drawing. Decorative. */
export function DeckIconGlyph({ name, icons, renderIcon, className }: {
  name: string;
  icons?: DeckIconPaths;
  renderIcon?: (name: string) => ReactNode;
  className?: string;
}) {
  if (renderIcon) return <span aria-hidden="true" className={cn('inline-flex h-5 w-5 items-center justify-center', className)}>{renderIcon(name)}</span>;
  const paths = icons?.[name];
  if (!paths) return null;
  const list = typeof paths === 'string' ? [paths] : paths;
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('h-5 w-5', className)}
      data-icon={name}
    >
      {list.map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
}

function categoryLabel(category: string): string {
  return category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ');
}

/** True when the row matches every word of the query (label, name or keyword). */
export function catalogueMatches(item: DeckCatalogueItem, query: string): boolean {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return true;
  const hay = [item.label, item.name, ...item.keywords].join(' ').toLowerCase();
  return words.every((word) => hay.includes(word));
}

export interface DeckIconPickerProps {
  /** The catalogue rows (the engine's `ICON_CATALOGUE`). */
  items: readonly DeckCatalogueItem[];
  /** Path data by name (the engine's `ICON_PATHS`). */
  icons?: DeckIconPaths;
  /** Draws one icon; wins over `icons`. */
  renderIcon?: (name: string) => ReactNode;
  /** The current icon: its tile is pressed. */
  value?: string;
  /** Called with the chosen name, or undefined for No icon. */
  onSelect: (name: string | undefined) => void;
  /** Offer a "No icon" tile. Default true. */
  allowNone?: boolean;
  /** The picker's accessible name. Default "Icons". */
  label?: string;
  className?: string;
  /** Test-id prefix. Default `icon-picker`; tiles are `<prefix>-<name>`. */
  testIdPrefix?: string;
}

const ALL = 'all';

/** A searchable, category-tabbed grid of the host's deck icons, drawn inline (never a popover). */
export function DeckIconPicker({
  items,
  icons,
  renderIcon,
  value,
  onSelect,
  allowNone = true,
  label = 'Icons',
  className,
  testIdPrefix = 'icon-picker',
}: DeckIconPickerProps) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(ALL);
  const categories = useMemo(() => [...new Set(items.map((item) => item.category))], [items]);
  const shown = useMemo(
    () => items.filter((item) => (category === ALL || item.category === category) && catalogueMatches(item, query)),
    [items, category, query],
  );

  return (
    <section aria-label={label} className={cn('@container flex min-w-0 flex-col gap-2 rounded-md border border-border bg-surface p-2', className)} data-testid={testIdPrefix}>
      <SearchInput value={query} onChange={setQuery} placeholder="Search icons" aria-label={`Search ${label.toLowerCase()}`} />
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
      <ul aria-label={`${label}: ${shown.length} shown`} className="m-0 grid max-h-64 list-none grid-cols-4 gap-1 overflow-y-auto p-0 @xs:grid-cols-6 @md:grid-cols-8">
        {allowNone && (
          <li>
            <button
              type="button"
              aria-pressed={!value}
              onClick={() => onSelect(undefined)}
              className="flex h-full w-full flex-col items-center justify-center gap-1 rounded-md border border-border p-1.5 text-text-secondary hover:bg-surface-hover aria-pressed:border-primary aria-pressed:bg-primary/10"
              data-testid={`${testIdPrefix}-none`}
            >
              <Text as="span" size="xs">No icon</Text>
            </button>
          </li>
        )}
        {shown.map((item) => (
          <li key={item.name}>
            <button
              type="button"
              aria-pressed={value === item.name}
              aria-label={item.label}
              title={item.label}
              onClick={() => onSelect(item.name)}
              className="flex h-full w-full flex-col items-center justify-center gap-1 rounded-md border border-transparent p-1.5 text-text-primary hover:bg-surface-hover aria-pressed:border-primary aria-pressed:bg-primary/10 aria-pressed:text-primary"
              data-testid={`${testIdPrefix}-${item.name}`}
            >
              <DeckIconGlyph name={item.name} icons={icons} renderIcon={renderIcon} />
              <Text as="span" size="xs" tone="secondary" className="line-clamp-1 w-full text-center">{item.label}</Text>
            </button>
          </li>
        ))}
      </ul>
      {!shown.length && <Text size="xs" tone="tertiary" data-testid={`${testIdPrefix}-empty`}>{`No icons match "${query}".`}</Text>}
    </section>
  );
}

export default DeckIconPicker;

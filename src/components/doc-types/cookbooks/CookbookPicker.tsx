// doc-types/cookbooks/CookbookPicker.tsx
//
// The gallery of known document types, as a plain picker.
//
// ## Why this is not part of CookbooksModal any more
//
// The fourteen prebuilt types were reachable through exactly one door: a
// "Cookbooks" button INSIDE the wizard's page, i.e. the good path was nested in
// the path we want people to take last. Pulling the gallery out of the modal is
// what lets it be the FIRST thing on the Document Types page and, separately,
// the body of a modal — same cards, same search, one predicate.
//
// This component knows nothing about persistence. It reports which cookbook was
// picked and lets the caller decide what installing means: the page installs and
// stays put, the modal installs and hands the new type to the wizard.

import { useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '../../../lib/cn';
import { Input } from '../../forms/Input';
import {
  COOKBOOK_CATEGORIES,
  filterCookbooks,
  type CookbookCategory,
  type DocumentTypeCookbook,
} from './index';

export interface CookbookPickerProps {
  /** Fired with the chosen cookbook. Persistence is the caller's business. */
  onPick: (cookbook: DocumentTypeCookbook) => void;
  /** Disables every action while an install is in flight. */
  busy?: boolean;
  /** Label on each card's action button. Default `Install`. */
  actionLabel?: string;
  /**
   * Names of types the host ALREADY has, lower-cased by the host or not — the
   * comparison here is case- and whitespace-insensitive.
   *
   * Opt-in, because "installed" only means something on the types ADMIN page.
   * The same picker also opens the new-document dialog, where you are starting
   * a document rather than installing a type and every cookbook is a valid
   * choice however many you have already used.
   *
   * Measured before this existed: the admin page offered "Add this type" for
   * all fourteen cookbooks including the three already installed, and clicking
   * one produced a SECOND type with the same name, same icon and same field
   * count — indistinguishable from the first in the type list, the create
   * dialog and the document chip.
   */
  installedNames?: readonly string[];
  /** Fired instead of `onPick` when an installed cookbook's card is actioned. */
  onOpenInstalled?: (cookbook: DocumentTypeCookbook) => void;
  /** Focus the search box shortly after mount. Default `false`. */
  autoFocusSearch?: boolean;
  /**
   * Testid stem for the search box, grid and empty state (`<prefix>-search`,
   * `-grid`, `-empty`). Defaults to `cookbooks`, which is what the modal's
   * existing specs address — a second mount of this picker on the same screen
   * MUST pass its own prefix or those selectors match twice.
   */
  idPrefix?: string;
  /** Testid stem for the per-card ids (`<prefix>-card-<id>`, `-use-<id>`, `-cat-<slug>`). */
  cardPrefix?: string;
  /**
   * `fixed` keeps the modal's original three 220px columns; `fluid` fills the
   * width it is given, which is what the Document Types page needs.
   */
  layout?: 'fixed' | 'fluid';
  /** Height cap on the scrolling grid. Default `max-h-[60vh]`. */
  gridHeightClassName?: string;
}

function categorySlug(cat: string): string {
  return cat.toLowerCase().replace(/[^a-z]/g, '-');
}

// ---------------------------------------------------------------------------
// Card
// ---------------------------------------------------------------------------

function CookbookCard({
  cookbook,
  onPick,
  actionLabel,
  busy,
  cardPrefix,
  layout,
  installed,
  onOpenInstalled,
}: {
  cookbook: DocumentTypeCookbook;
  onPick: (c: DocumentTypeCookbook) => void;
  actionLabel: string;
  busy: boolean;
  cardPrefix: string;
  layout: 'fixed' | 'fluid';
  installed: boolean;
  onOpenInstalled?: ((c: DocumentTypeCookbook) => void) | undefined;
}) {
  return (
    <div
      data-testid={`${cardPrefix}-card-${cookbook.id}`}
      className={cn(
        'flex flex-col gap-2 min-h-[200px] p-3.5 bg-surface border border-border rounded-[10px]',
        layout === 'fixed' && 'w-[220px]',
      )}
    >
      <div className="flex items-center gap-2.5">
        <span className="text-2xl" aria-hidden>{cookbook.icon}</span>
        <div className="text-sm font-bold text-text-primary overflow-hidden text-ellipsis">
          {cookbook.name}
        </div>
      </div>
      <div className="text-[11px] text-text-tertiary flex gap-2">
        <span>{cookbook.category}</span>
      </div>
      <div className="text-xs text-text-secondary leading-[1.4] flex-1">
        {cookbook.description}
      </div>
      {cookbook.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {cookbook.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-semibold py-0.5 px-1.5 rounded bg-surface-hover text-text-secondary lowercase"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      {/* An installed cookbook offers the way TO it, not a second copy of it.
          Disabling would say "no" without saying where the first one went. */}
      {installed ? (
        <button
          data-ui-part=""
          type="button"
          data-testid={`${cardPrefix}-installed-${cookbook.id}`}
          onClick={onOpenInstalled ? () => onOpenInstalled(cookbook) : undefined}
          disabled={busy || !onOpenInstalled}
          aria-label={`${cookbook.name} is already added`}
          className={cn(
            'mt-auto py-1.5 px-2.5 text-xs font-semibold rounded-md border border-border bg-surface-inset text-text-secondary',
            busy || !onOpenInstalled ? 'cursor-default' : 'cursor-pointer hover:text-text-primary',
          )}
        >
          {onOpenInstalled ? 'Added · Open' : 'Added'}
        </button>
      ) : (
        <button
          data-ui-part=""
          type="button"
          data-testid={`${cardPrefix}-use-${cookbook.id}`}
          onClick={() => onPick(cookbook)}
          disabled={busy}
          className={cn(
            'mt-auto py-1.5 px-2.5 text-xs font-semibold bg-primary text-on-primary border-none rounded-md',
            busy ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer',
          )}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Picker
// ---------------------------------------------------------------------------

export function CookbookPicker({
  onPick,
  busy = false,
  actionLabel = 'Install',
  autoFocusSearch = false,
  idPrefix = 'cookbooks',
  cardPrefix = 'cookbook',
  layout = 'fixed',
  gridHeightClassName = 'max-h-[60vh]',
  installedNames,
  onOpenInstalled,
}: CookbookPickerProps) {
  // Case- and whitespace-insensitive, because the host's stored name came from
  // a text field a person typed into and the cookbook's is a literal.
  const installedSet = useMemo(
    () => new Set((installedNames ?? []).map((n) => n.trim().toLowerCase())),
    [installedNames],
  );
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<CookbookCategory | 'All'>('All');
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!autoFocusSearch) return;
    // Deferred, not autoFocus: the picker mounts inside a modal whose card is
    // still animating in, and an immediate focus scrolls the backdrop.
    const t = setTimeout(() => searchRef.current?.focus(), 30);
    return () => clearTimeout(t);
  }, [autoFocusSearch]);

  const filtered = useMemo(
    () => filterCookbooks(search, activeCategory),
    [search, activeCategory],
  );

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Enter takes the top match. Typing three letters and pressing Enter is
    // the whole point of the search box.
    if (e.key === 'Enter' && !busy && filtered.length > 0) {
      e.preventDefault();
      onPick(filtered[0]);
    }
  };

  return (
    <>
      {/* Category pills. These are filter toggles: `aria-pressed` is what
          tells a screen-reader user which category is active — the colour
          swap alone said nothing. */}
      <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-1.5 mb-2.5">
        <button
          data-ui-part=""
          type="button"
          data-testid={`${cardPrefix}-cat-all`}
          aria-pressed={activeCategory === 'All'}
          onClick={() => setActiveCategory('All')}
          className={cn(
            'py-1 px-2.5 text-[11px] font-semibold rounded-xl border-none cursor-pointer',
            activeCategory === 'All'
              ? 'bg-primary text-on-primary'
              : 'bg-surface-hover text-text-secondary',
          )}
        >
          All
        </button>
        {COOKBOOK_CATEGORIES.map((cat) => (
          <button
            data-ui-part=""
            type="button"
            key={cat}
            data-testid={`${cardPrefix}-cat-${categorySlug(cat)}`}
            aria-pressed={activeCategory === cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              'py-1 px-2.5 text-[11px] font-semibold rounded-xl border-none cursor-pointer',
              activeCategory === cat
                ? 'bg-primary text-on-primary'
                : 'bg-surface-hover text-text-secondary',
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <Input
        ref={searchRef}
        type="search"
        data-testid={`${idPrefix}-search`}
        aria-label="Search cookbooks"
        placeholder="Search cookbooks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleSearchKeyDown}
        className="mb-3.5"
      />

      {filtered.length === 0 ? (
        <div
          data-testid={`${idPrefix}-empty`}
          className="text-center py-8 text-[13px] text-text-tertiary"
        >
          No cookbooks match "{search}".
        </div>
      ) : (
        <div
          data-testid={`${idPrefix}-grid`}
          className={cn(
            'grid gap-3 overflow-y-auto p-1',
            layout === 'fixed'
              ? 'grid-cols-[repeat(3,220px)] justify-center'
              : 'grid-cols-[repeat(auto-fill,minmax(210px,1fr))]',
            gridHeightClassName,
          )}
        >
          {filtered.map((cookbook) => (
            <CookbookCard
              key={cookbook.id}
              cookbook={cookbook}
              onPick={onPick}
              actionLabel={actionLabel}
              busy={busy}
              cardPrefix={cardPrefix}
              layout={layout}
              installed={installedSet.has(cookbook.name.trim().toLowerCase())}
              onOpenInstalled={onOpenInstalled}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default CookbookPicker;

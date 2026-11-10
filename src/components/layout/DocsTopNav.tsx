// src/components/layout/DocsTopNav.tsx
//
// Documentation shell's sticky top nav. Wraps the generic <TopNav> with
// the brand-left / search-center-right convention used by docs sites, plus
// a dedicated search slot that conventionally renders a Cmd-K affordance.

import type { ReactNode, CSSProperties, AnchorHTMLAttributes } from 'react';
import { cn } from '../../lib/cn';
import { TopNav, type TopNavItem } from './TopNav';
import { safeHref } from '../../lib/safeHref';

export interface DocsTopNavProps {
  items: TopNavItem[];
  activeHref?: string;
  /** Brand/logo. A string renders as a bold title; ReactNode is rendered as-is. */
  brand?: ReactNode;
  /** Optional href for the brand to link to. Default "/". Pass null to render brand as a static span. */
  brandTo?: string | null;
  /**
   * Search affordance. Convention: a button that opens a CommandPalette.
   * Falls back to a styled "Search… ⌘K" placeholder when omitted but
   * `showSearchPlaceholder` is true.
   */
  search?: ReactNode;
  /** Renders a static "Search… ⌘K" pill when `search` is omitted. Default true. */
  showSearchPlaceholder?: boolean;
  /** Right-side slot for auxiliary links (GitHub, version, theme switcher). */
  rightSlot?: ReactNode;
  renderLink?: (item: TopNavItem, props: AnchorHTMLAttributes<HTMLAnchorElement>) => ReactNode;
  className?: string;
  style?: CSSProperties;
}

function defaultBrandLink(brandTo: string, brand: ReactNode): ReactNode {
  return (
    <a
      href={safeHref(brandTo) ?? undefined}
      className="text-base font-bold text-[var(--color-text-primary)] no-underline whitespace-nowrap"
      data-testid="docs-topnav-brand"
    >
      {brand}
    </a>
  );
}

function SearchPlaceholder() {
  return (
    <div
      data-testid="docs-topnav-search-placeholder"
      className="flex items-center gap-2 min-w-[180px] cursor-pointer rounded-md border border-[var(--color-border)] bg-[var(--color-surface-hover,#f8fafc)] px-3 py-1.5 text-[13px] text-[var(--color-text-tertiary,#94a3b8)]"
    >
      <span>Search…</span>
      <kbd className="ml-auto rounded-sm border border-[var(--color-border)] bg-[var(--color-surface,#fff)] px-1.5 py-px text-[11px] text-[var(--color-text-secondary)]">
        ⌘K
      </kbd>
    </div>
  );
}

export function DocsTopNav({
  items,
  activeHref,
  brand,
  brandTo = '/',
  search,
  showSearchPlaceholder = true,
  rightSlot,
  renderLink,
  className,
  style,
}: DocsTopNavProps) {
  const brandNode = brand
    ? brandTo
      ? defaultBrandLink(brandTo, brand)
      : <span className="text-base font-bold text-[var(--color-text-primary)] whitespace-nowrap">{brand}</span>
    : undefined;

  const right = (
    <>
      {search ?? (showSearchPlaceholder ? <SearchPlaceholder /> : null)}
      {rightSlot}
    </>
  );

  return (
    <div
      data-testid="docs-topnav"
      className={cn('sticky top-0 z-[1000] bg-[var(--color-surface,#fff)]', className)}
      style={style}
    >
      <TopNav
        items={items}
        activeHref={activeHref}
        brand={brandNode}
        rightSlot={right}
        renderLink={renderLink}
        aria-label="Documentation navigation"
      />
    </div>
  );
}

export default DocsTopNav;

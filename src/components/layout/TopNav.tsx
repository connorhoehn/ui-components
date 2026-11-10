import {
  useState,
  useRef,
  useEffect,
  type CSSProperties,
  type ReactNode,
  type AnchorHTMLAttributes,
} from 'react';
import { cn } from '../../lib/cn';
import { safeHref } from '../../lib/safeHref';

export interface TopNavItem {
  label: ReactNode;
  to: string;
  icon?: ReactNode;
  badge?: ReactNode;
  disabled?: boolean;
}

export interface TopNavProps {
  items: TopNavItem[];
  /** Active href — typically the current pathname. An item is active when activeHref === item.to OR activeHref.startsWith(item.to + '/'). */
  activeHref?: string;
  /** Brand/logo slot rendered at the left. */
  brand?: ReactNode;
  /** Optional right-aligned slot (search, user menu, profile, etc.). */
  rightSlot?: ReactNode;
  /** Render function for link elements. Defaults to <a>. Use this to plug in react-router <Link>, next/link, etc. */
  renderLink?: (item: TopNavItem, props: AnchorHTMLAttributes<HTMLAnchorElement>) => ReactNode;
  /** Maximum number of items to render inline before collapsing the rest into a "More" menu. Default: render all. */
  maxVisible?: number;
  className?: string;
  style?: CSSProperties;
  'aria-label'?: string;
}

function isActive(activeHref: string | undefined, to: string): boolean {
  if (!activeHref) return false;
  if (activeHref === to) return true;
  if (to === '/') return false;
  return activeHref.startsWith(to + '/');
}

function defaultRenderLink(item: TopNavItem, props: AnchorHTMLAttributes<HTMLAnchorElement>): ReactNode {
  return <a {...props} href={safeHref(item.to) ?? undefined}>{props.children}</a>;
}

type AnchorPropsWithData = AnchorHTMLAttributes<HTMLAnchorElement> & Record<`data-${string}`, string | undefined>;

/**
 * How the active item is marked.
 *
 * The two variants are a HIERARCHY, not two interchangeable looks. Apps stack
 * them: a primary row in the header (`pill`) and a section row under it
 * (`underline`). Which one you pick says which row the reader is meant to read
 * first.
 *
 * `pill` is the PRIMARY form, for a nav sitting in a bar rather than on a
 * strip. Active is a filled tint (`--color-primary-bg` / `--color-primary-fg`)
 * plus semibold — a block of brand colour roughly 90x36, which is what makes
 * it the loudest thing in the row. It also carries no bottom border: a header
 * owns its own rule, lower down, so an underline indicator there hangs in
 * mid-air (measured at 12px above the header rule, attached to nothing), which
 * is exactly what "the nav is not aligned" looks like.
 *
 * `underline` is the SECONDARY form: a 2px rule under the active item, sitting
 * ON the strip's own bottom border. Indicator and rule are one continuous
 * line — the `-mb-px` below is what overlaps them — so it is only correct
 * where that border exists. Against a filled pill it reads as a hairline:
 * same brand colour, ~1/18th of the area.
 */
export type NavTabsVariant = 'underline' | 'pill';

/**
 * The item box, shared by BOTH variants.
 *
 * Same height, same padding, same gap, so two stacked rows keep one vertical
 * rhythm and one 28px label-to-label step (px-3 + gap-1 + px-3). They used to
 * disagree — h-8 in the header against h-10 in the section strip — which made
 * the SECOND row the taller of the two and inverted the hierarchy the variants
 * are supposed to express.
 *
 * h-9 (36px) rather than h-10, because the app shells here publish a 53px
 * header (`--app-shell-header-h`); 36px is the tallest item that centres
 * inside its 52px content box with a whole number of pixels either side.
 */
const NAV_ITEM_BASE =
  'inline-flex h-9 items-center gap-1.5 px-3 text-sm no-underline transition-colors';

function TopNavLink({
  item,
  active,
  renderLink,
  variant = 'underline',
}: {
  item: TopNavItem;
  active: boolean;
  renderLink: (item: TopNavItem, props: AnchorHTMLAttributes<HTMLAnchorElement>) => ReactNode;
  variant?: NavTabsVariant;
}) {
  const linkProps: AnchorPropsWithData = {
    'aria-current': active ? 'page' : undefined,
    'aria-disabled': item.disabled || undefined,
    'data-testid': `topnav-link-${item.to}`,
    className: cn(
      NAV_ITEM_BASE,
      variant === 'pill'
        ? cn(
            'rounded-md',
            active
              ? // Filled, not a colour swap. `text-primary on surface-hover`
                // was the same weight as an inactive item with the cursor over
                // it, so the primary row had no state a reader could find
                // without hunting.
                'font-semibold bg-[var(--color-primary-bg)] text-[var(--color-primary-fg)]'
              : 'font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)]',
          )
        : cn(
            'font-medium border-b-2 -mb-px',
            active
              ? 'border-[var(--color-primary)] text-[var(--color-text-primary)]'
              : 'border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]',
          ),
      item.disabled && 'opacity-50 pointer-events-none',
    ),
    children: (
      <>
        {item.icon}
        <span>{item.label}</span>
        {item.badge !== undefined && item.badge !== null && (
          <span className="ml-1 inline-flex items-center justify-center rounded-full px-1.5 min-w-[18px] text-[10px] font-semibold bg-[var(--color-primary)] text-white">
            {item.badge}
          </span>
        )}
      </>
    ),
  };
  return <>{renderLink(item, linkProps)}</>;
}

export function TopNav({
  items,
  activeHref,
  brand,
  rightSlot,
  renderLink = defaultRenderLink,
  maxVisible,
  className,
  style,
  'aria-label': ariaLabel = 'Main navigation',
}: TopNavProps) {
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!moreOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [moreOpen]);

  const visibleItems = maxVisible !== undefined ? items.slice(0, maxVisible) : items;
  const overflowItems = maxVisible !== undefined ? items.slice(maxVisible) : [];
  const overflowActive = overflowItems.some((i) => isActive(activeHref, i.to));

  return (
    <nav
      aria-label={ariaLabel}
      className={cn(
        'h-14 flex items-center px-6 bg-[var(--color-surface,#fff)] border-b border-[var(--color-border)]',
        className,
      )}
      style={style}
    >
      {brand && <div className="mr-10 whitespace-nowrap">{brand}</div>}
      <div className="flex items-stretch gap-1 flex-1 min-w-0">
        {visibleItems.map((item) => (
          <TopNavLink
            key={item.to}
            item={item}
            active={isActive(activeHref, item.to)}
            renderLink={renderLink}
          />
        ))}
        {overflowItems.length > 0 && (
          <div className="relative" ref={moreRef}>
            <button
              data-ui-part=""
              type="button"
              onClick={() => setMoreOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={moreOpen}
              data-testid="topnav-more"
              className={cn(
                // Same item box as the links it overflows, or "More" sits a
                // few pixels taller than the tabs it belongs to.
                NAV_ITEM_BASE,
                'font-medium border-b-2 -mb-px cursor-pointer bg-transparent border-l-0 border-r-0 border-t-0',
                overflowActive
                  ? 'border-[var(--color-primary)] text-[var(--color-text-primary)]'
                  : 'border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]',
              )}
            >
              More
              <span aria-hidden="true">▾</span>
            </button>
            {moreOpen && (
              <div
                role="menu"
                className="absolute right-0 top-full mt-1 min-w-[180px] rounded-md border border-[var(--color-border)] bg-[var(--color-surface,#fff)] shadow-lg z-10 py-1"
                data-testid="topnav-more-menu"
              >
                {overflowItems.map((item) => {
                  const active = isActive(activeHref, item.to);
                  const linkProps: AnchorPropsWithData = {
                    role: 'menuitem',
                    'aria-current': active ? 'page' : undefined,
                    'data-testid': `topnav-more-link-${item.to}`,
                    onClick: () => setMoreOpen(false),
                    className: cn(
                      'flex items-center gap-2 px-3 py-2 text-sm no-underline',
                      active
                        ? 'text-[var(--color-primary)] bg-[var(--color-surface-hover)]'
                        : 'text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]',
                    ),
                    children: (
                      <>
                        {item.icon}
                        <span className="flex-1">{item.label}</span>
                        {item.badge !== undefined && item.badge !== null && (
                          <span className="inline-flex items-center justify-center rounded-full px-1.5 min-w-[18px] text-[10px] font-semibold bg-[var(--color-primary)] text-white">
                            {item.badge}
                          </span>
                        )}
                      </>
                    ),
                  };
                  return <div key={item.to}>{renderLink(item, linkProps)}</div>;
                })}
              </div>
            )}
          </div>
        )}
      </div>
      {rightSlot && <div className="flex items-center gap-4 ml-4">{rightSlot}</div>}
    </nav>
  );
}

export interface NavTabsProps {
  items: TopNavItem[];
  activeHref?: string;
  renderLink?: (item: TopNavItem, props: AnchorHTMLAttributes<HTMLAnchorElement>) => ReactNode;
  className?: string;
  style?: CSSProperties;
  'aria-label'?: string;
  /** See NavTabsVariant. `pill` also drops the strip's bottom border, since
   *  there is no underline left for it to complete. */
  variant?: NavTabsVariant;
}

/** Sub-section navigation: link-based underline tab strip (no state — consumer routes via activeHref). */
export function NavTabs({
  items,
  activeHref,
  renderLink = defaultRenderLink,
  className,
  style,
  'aria-label': ariaLabel = 'Sub navigation',
  variant = 'underline',
}: NavTabsProps) {
  return (
    <nav
      aria-label={ariaLabel}
      className={cn(
        'inline-flex items-center gap-1',
        variant === 'underline' && 'border-b border-[var(--color-border)]',
        className,
      )}
      style={style}
    >
      {items.map((item) => (
        <TopNavLink
          key={item.to}
          item={item}
          active={isActive(activeHref, item.to)}
          renderLink={renderLink}
          variant={variant}
        />
      ))}
    </nav>
  );
}

export default TopNav;

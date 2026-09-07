import {
  useState,
  useRef,
  useEffect,
  type CSSProperties,
  type ReactNode,
  type AnchorHTMLAttributes,
} from 'react';
import { cn } from '../../lib/cn';

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
  return <a {...props} href={item.to}>{props.children}</a>;
}

type AnchorPropsWithData = AnchorHTMLAttributes<HTMLAnchorElement> & Record<`data-${string}`, string | undefined>;

function TopNavLink({
  item,
  active,
  renderLink,
}: {
  item: TopNavItem;
  active: boolean;
  renderLink: (item: TopNavItem, props: AnchorHTMLAttributes<HTMLAnchorElement>) => ReactNode;
}) {
  const linkProps: AnchorPropsWithData = {
    'aria-current': active ? 'page' : undefined,
    'aria-disabled': item.disabled || undefined,
    'data-testid': `topnav-link-${item.to}`,
    className: cn(
      'inline-flex items-center gap-1.5 px-3 h-10 text-sm font-medium no-underline border-b-2 -mb-px transition-colors',
      active
        ? 'border-[var(--color-primary)] text-[var(--color-text-primary)]'
        : 'border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]',
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
              type="button"
              onClick={() => setMoreOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={moreOpen}
              data-testid="topnav-more"
              className={cn(
                'inline-flex items-center gap-1.5 px-3 h-10 text-sm font-medium border-b-2 -mb-px transition-colors cursor-pointer bg-transparent border-l-0 border-r-0 border-t-0',
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
}

/** Sub-section navigation: link-based underline tab strip (no state — consumer routes via activeHref). */
export function NavTabs({
  items,
  activeHref,
  renderLink = defaultRenderLink,
  className,
  style,
  'aria-label': ariaLabel = 'Sub navigation',
}: NavTabsProps) {
  return (
    <nav
      aria-label={ariaLabel}
      className={cn(
        'inline-flex items-center gap-1 border-b border-[var(--color-border)]',
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
        />
      ))}
    </nav>
  );
}

export default TopNav;

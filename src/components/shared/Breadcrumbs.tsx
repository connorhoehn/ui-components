// Breadcrumbs — accessible breadcrumb navigation.
//
// Items can be links (href), click-handlers, or plain text. A plain-text item
// in the MIDDLE of the trail is deliberate, not an oversight: grouping levels
// ("Build", "Operate") are context, not destinations, and linking them to a
// page that does not exist is worse than leaving them inert.
//
// Two behaviours exist for a trail that outgrows its row:
//
//   overflow="ellipsis" (default) — the middle collapses to a dead "…".
//     Fine when the hidden levels are scenery.
//   overflow="menu" — the middle collapses to a button that opens the hidden
//     crumbs as a list. Six levels deep, the levels you skipped are exactly
//     where you want to jump back to, and a dead "…" makes you use the back
//     button four times to get there.
//
// The menu is built on `InlinePopover` rather than `DropdownMenu` on purpose.
// DropdownMenu's items are `role="menuitem"` buttons; routing a breadcrumb
// through one costs you the anchor — no middle-click to a new tab, no
// copy-link, no status-bar target preview. Those are the affordances that make
// a breadcrumb a breadcrumb, so the popover holds real `<a>` elements and the
// caller's `onClick` interception (router `navigate`) still works unchanged.

import { useRef, useState, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { InlinePopover } from './InlinePopover';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
}

export type BreadcrumbOverflow = 'ellipsis' | 'menu';

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  /** Distinguish this trail from other navigation landmarks on the page. */
  'aria-label'?: string;
  /** Custom separator rendered between items (default: "/") */
  separator?: ReactNode;
  /**
   * When set, truncate the middle of the list to fit this many visible items.
   * The first and last are always shown; middle items collapse per `overflow`.
   */
  maxItems?: number;
  /**
   * How the collapsed middle behaves. `ellipsis` (default) is inert text;
   * `menu` opens the hidden crumbs as a list of real links.
   */
  overflow?: BreadcrumbOverflow;
  /**
   * Render nothing below this many crumbs. A two-level trail usually repeats
   * what the nav rail already highlights, so shells that show breadcrumbs on
   * every route can set `minItems={3}` and let shallow pages keep the row.
   */
  minItems?: number;
  /**
   * `true` (default): the last crumb is the page you are on — primary ink,
   * `aria-current="page"`, not a link. `false`: every crumb is a place to go,
   * for a PATH that ends at the folder a file lives in, not at the file.
   * Since 2.385.0.
   */
  lastIsCurrent?: boolean;
  /**
   * Type step. `md` (default) is 14px. `sm` (2.407.13) is the 13px meta step —
   * the size of a document header's "Saved …" line and status pill, for a
   * trail that sits in that row (EditorShell's folder path). The size is on
   * every crumb, separator and ellipsis; a `className` on the nav cannot
   * reach them.
   */
  size?: BreadcrumbSize;
  className?: string;
  'data-testid'?: string;
}

export type BreadcrumbSize = 'sm' | 'md';
const CRUMB_TEXT: Record<BreadcrumbSize, string> = { sm: 'text-xs', md: 'text-sm' };

function BreadcrumbLink({
  item,
  isLast,
  block = false,
  afterActivate,
  size = 'md',
}: {
  item: BreadcrumbItem;
  isLast: boolean;
  size?: BreadcrumbSize;
  /** Full-width row styling for the overflow menu's stacked list. */
  block?: boolean;
  /** Runs after the caller's own handler — the overflow menu closes here. */
  afterActivate?: () => void;
}) {
  const activate = (e: React.MouseEvent) => {
    item.onClick?.(e);
    afterActivate?.();
  };
  const baseClass = cn(
    CRUMB_TEXT[size], 'leading-snug transition-colors duration-100',
    isLast
      ? 'text-[var(--color-text-primary)] font-medium cursor-default'
      : 'text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] font-normal',
    !block && 'block min-w-0 truncate',
    block && 'block w-full px-3 py-1.5 rounded-sm hover:bg-[var(--color-surface-hover)]',
  );

  if (isLast || (!item.href && !item.onClick)) {
    return (
      <span title={item.label} className={baseClass} aria-current={isLast ? 'page' : undefined}>
        {item.label}
      </span>
    );
  }

  if (item.href) {
    return (
      <a title={item.label} href={item.href} onClick={activate} className={cn(baseClass, 'no-underline')}>
        {item.label}
      </a>
    );
  }

  return (
    <button
      data-ui-part=""
      type="button"
      title={item.label}
      onClick={activate}
      className={cn(
        baseClass,
        'border-none bg-transparent cursor-pointer font-[inherit] p-0',
        block && 'text-left px-3 py-1.5',
      )}
    >
      {item.label}
    </button>
  );
}

function buildVisible(items: BreadcrumbItem[], maxItems: number): Array<BreadcrumbItem | null> {
  if (items.length <= maxItems) return items;
  // Always show first + last; collapse middle
  const head = items.slice(0, 1);
  const tail = items.slice(-(maxItems - 2 > 0 ? maxItems - 2 : 1));
  return [...head, null, ...tail]; // null = ellipsis sentinel
}

/** The crumbs `buildVisible` dropped, in trail order. */
function hiddenItems(items: BreadcrumbItem[], maxItems: number): BreadcrumbItem[] {
  const tailCount = maxItems - 2 > 0 ? maxItems - 2 : 1;
  return items.slice(1, items.length - tailCount);
}

function OverflowMenu({ items, size }: { items: BreadcrumbItem[]; size: BreadcrumbSize }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  return (
    <>
      <button
        data-ui-part=""
        ref={triggerRef}
        type="button"
        aria-label="Show hidden breadcrumbs"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        className={cn(CRUMB_TEXT[size], 'text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] border-none bg-transparent cursor-pointer px-1 py-0 rounded-sm leading-snug')}
      >
        &hellip;
      </button>
      <InlinePopover
        trigger={triggerRef}
        open={open}
        onClose={() => setOpen(false)}
        aria-label="Hidden breadcrumbs"
        data-testid="breadcrumb-overflow"
        className="min-w-[160px] py-1"
      >
        {/* Selecting a crumb navigates away, so the popover has no reason to
            linger — and if the caller cancels the navigation, it re-opens from
            the same trigger. */}
        <ol className="list-none m-0 p-0">
          {items.map((item, idx) => (
            <li key={`${item.label}-${idx}`}>
              <BreadcrumbLink
                item={item}
                isLast={false}
                block
                size={size}
                afterActivate={() => setOpen(false)}
              />
            </li>
          ))}
        </ol>
      </InlinePopover>
    </>
  );
}

export function Breadcrumbs({
  items,
  'aria-label': label = 'Breadcrumb',
  separator = '/',
  maxItems = 4,
  overflow = 'ellipsis',
  minItems,
  lastIsCurrent = true,
  size = 'md',
  className,
  'data-testid': testId,
}: BreadcrumbsProps) {
  if (items.length === 0) return null;
  if (minItems != null && items.length < minItems) return null;

  const visible: Array<BreadcrumbItem | null> =
    maxItems != null ? buildVisible(items, maxItems) : items;
  const hidden = maxItems != null ? hiddenItems(items, maxItems) : [];

  return (
    <nav aria-label={label} data-testid={testId} data-ui-breadcrumbs="" className={cn('flex min-w-0 max-w-full items-center overflow-hidden', className)}>
      <ol className="flex min-w-0 max-w-full items-center gap-1 list-none m-0 p-0">
        {visible.map((item, idx) => {
          const isLast = idx === visible.length - 1;
          const isEllipsis = item === null;

          return (
            <li key={idx} className={cn("flex min-w-0 items-center gap-1", isLast ? "flex-1" : "shrink-[2]")}>
              {isEllipsis ? (
                overflow === 'menu' && hidden.length > 0 ? (
                  <OverflowMenu items={hidden} size={size} />
                ) : (
                  <span
                    className={cn(CRUMB_TEXT[size], 'text-[var(--color-text-tertiary)] select-none')}
                    aria-label="More items"
                    title="Some items are hidden"
                  >
                    &hellip;
                  </span>
                )
              ) : (
                <BreadcrumbLink item={item} isLast={isLast && lastIsCurrent} size={size} />
              )}
              {!isLast && (
                <span
                  className={cn('shrink-0 text-[var(--color-text-tertiary)] select-none', CRUMB_TEXT[size])}
                  aria-hidden="true"
                >
                  {separator}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;

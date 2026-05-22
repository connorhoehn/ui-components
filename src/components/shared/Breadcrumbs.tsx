// Breadcrumbs — accessible breadcrumb navigation.
//
// Supports truncation of middle items when maxItems is set.
// Items can be links (href), click-handlers, or plain text.

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  /** Custom separator rendered between items (default: "/") */
  separator?: ReactNode;
  /**
   * When set, truncate the middle of the list to fit this many visible items.
   * The first and last are always shown; middle items collapse to "…".
   */
  maxItems?: number;
  className?: string;
  'data-testid'?: string;
}

function BreadcrumbLink({ item, isLast }: { item: BreadcrumbItem; isLast: boolean }) {
  const baseClass = cn(
    'text-sm leading-snug transition-colors duration-100',
    isLast
      ? 'text-[var(--color-text-primary)] font-medium cursor-default'
      : 'text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] font-normal',
  );

  if (isLast || (!item.href && !item.onClick)) {
    return (
      <span className={baseClass} aria-current={isLast ? 'page' : undefined}>
        {item.label}
      </span>
    );
  }

  if (item.href) {
    return (
      <a href={item.href} onClick={item.onClick} className={cn(baseClass, 'no-underline')}>
        {item.label}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={item.onClick}
      className={cn(baseClass, 'border-none bg-transparent cursor-pointer font-[inherit] p-0')}
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

export function Breadcrumbs({
  items,
  separator = '/',
  maxItems,
  className,
  'data-testid': testId,
}: BreadcrumbsProps) {
  if (items.length === 0) return null;

  const visible: Array<BreadcrumbItem | null> =
    maxItems != null ? buildVisible(items, maxItems) : items;

  return (
    <nav aria-label="Breadcrumb" data-testid={testId} className={cn('flex items-center', className)}>
      <ol className="flex items-center gap-1 flex-wrap list-none m-0 p-0">
        {visible.map((item, idx) => {
          const isLast = idx === visible.length - 1;
          const isEllipsis = item === null;

          return (
            <li key={idx} className="flex items-center gap-1">
              {isEllipsis ? (
                <span
                  className="text-sm text-[var(--color-text-tertiary)] select-none"
                  aria-label="More items"
                  title="Some items are hidden"
                >
                  &hellip;
                </span>
              ) : (
                <BreadcrumbLink item={item} isLast={isLast} />
              )}
              {!isLast && (
                <span
                  className="text-[var(--color-text-tertiary)] text-sm select-none"
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

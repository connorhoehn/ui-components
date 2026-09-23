// PageHeader — page-level title + description + actions header.
//
// Replaces the ad-hoc `<h1>Title</h1><p>Description</p><button>Action</button>`
// pattern repeated across every portal page. Supports an optional back link
// rendered above the title and an optional badge to the right of it.

import React from 'react';
import { cn } from '../../lib/cn';

export interface PageHeaderBack {
  label: string;
  to: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export interface PageHeaderProps {
  title: string;
  description?: string;
  /** Right-aligned action area (buttons, menus). */
  actions?: React.ReactNode;
  /** Optional back link rendered above the title. */
  back?: PageHeaderBack;
  /** Badge or status pill rendered to the right of the title. */
  badge?: React.ReactNode;
  /**
   * Title size. `md` (default) is the 20px heading every page has had;
   * `lg` is a 28px directory title — a page that IS the list, not a page
   * about one thing.
   */
  size?: 'md' | 'lg';
  className?: string;
}

function PageHeader({
  title,
  description,
  actions,
  back,
  badge,
  size = 'md',
  className,
}: PageHeaderProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {back && (
        <a
          href={back.to}
          onClick={back.onClick}
          className="inline-flex items-center gap-1 text-xs text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] mb-1 w-fit"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M7 2L3 6l4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {back.label}
        </a>
      )}
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0 flex items-center gap-2.5">
          <h1
            className={cn(
              'font-semibold text-[var(--color-text-primary)] leading-tight',
              size === 'lg' ? 'text-[28px] font-bold tracking-[-0.01em]' : 'text-xl',
            )}
          >
            {title}
          </h1>
          {badge}
        </div>
        {actions && (
          <div className="flex-shrink-0 flex items-center gap-2">{actions}</div>
        )}
      </div>
      {description && (
        <p className="text-sm text-[var(--color-text-secondary)]">{description}</p>
      )}
    </div>
  );
}

export { PageHeader };
export default PageHeader;

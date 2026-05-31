// src/components/layout/DocsShell.tsx
//
// Composition primitive for documentation sites: sticky topnav above,
// fixed sidebar on the left, scrolling content in the middle, optional
// right rail (typically a TableOfContents).

import type { ReactNode, CSSProperties } from 'react';
import { cn } from '../../lib/cn';

export interface DocsShellProps {
  /** Sticky top navigation. Typically <DocsTopNav>. */
  topNav: ReactNode;
  /** Left sidebar. Typically <DocsSidebar>. */
  sidebar: ReactNode;
  /** Optional right rail. Typically <TableOfContents>. */
  rightRail?: ReactNode;
  /** Main content. */
  children: ReactNode;
  /**
   * Full-bleed mode skips the centered content padding so a hosted
   * application demo (e.g. a chat panel filling the viewport) can
   * occupy the entire content rectangle.
   */
  fullBleed?: boolean;
  /** Pre-content slot (breadcrumbs, page header). Skipped when fullBleed. */
  preContent?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function DocsShell({
  topNav,
  sidebar,
  rightRail,
  children,
  fullBleed = false,
  preContent,
  className,
  style,
}: DocsShellProps) {
  return (
    <div
      data-testid="docs-shell"
      className={cn('min-h-screen flex flex-col bg-[var(--color-bg,#fff)]', className)}
      style={style}
    >
      {topNav}
      <div className="flex flex-1 min-h-0">
        <div className="flex-none">{sidebar}</div>
        <main
          data-testid="docs-shell-main"
          className={cn(
            'flex-1 min-w-0',
            fullBleed ? 'flex flex-col overflow-hidden' : 'overflow-y-auto',
          )}
        >
          {fullBleed ? (
            <div className="flex-1 flex flex-col h-full overflow-hidden">
              {children}
            </div>
          ) : (
            <div className="px-10 py-6 max-w-full">
              {preContent}
              {children}
            </div>
          )}
        </main>
        {!fullBleed && rightRail && (
          <aside
            data-testid="docs-shell-right-rail"
            className="hidden xl:block flex-none w-[220px] pr-10 pt-6"
          >
            {rightRail}
          </aside>
        )}
      </div>
    </div>
  );
}

export default DocsShell;

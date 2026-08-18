import { useEffect, useRef } from 'react';
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
  /**
   * Changing this scrolls the content pane back to the top — pass the current
   * pathname. <main> is the scroll container, not the window, so the browser's
   * scroll restoration does not apply.
   */
  scrollResetKey?: string;
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
  scrollResetKey,
}: DocsShellProps) {
  const mainRef = useRef<HTMLElement>(null);

  // Reset the content pane to the top when the route changes.
  //
  // The window is no longer the scroll container — <main> is — so the browser's
  // own scroll restoration does nothing here, and following a nav link left you
  // wherever the previous page happened to be scrolled to.
  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;
    // scrollTo is absent in jsdom and in some older engines; assigning the
    // properties works everywhere and is what scrollTo does here anyway.
    if (typeof el.scrollTo === 'function') el.scrollTo({ top: 0, left: 0 });
    else { el.scrollTop = 0; el.scrollLeft = 0; }
  }, [scrollResetKey]);

  return (
    <div
      data-testid="docs-shell"
      // h-screen, not min-h-screen: the shell owns the viewport so the sidebar
      // and main pane can scroll INDEPENDENTLY. With min-h-screen nothing is
      // height-bounded, `overflow-y-auto` on <main> never engages, and a tall
      // sidebar stretches the whole document — which is why a long nav forced
      // the content page to be enormous.
      className={cn('h-screen flex flex-col overflow-hidden bg-[var(--color-bg,#fff)]', className)}
      style={style}
    >
      {topNav}
      <div className="flex flex-1 min-h-0">
        <div className="flex-none overflow-y-auto overscroll-contain">{sidebar}</div>
        <main
          ref={mainRef}
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
            className="hidden xl:block flex-none w-[220px] pr-10 pt-6 overflow-y-auto"
          >
            {rightRail}
          </aside>
        )}
      </div>
    </div>
  );
}

export default DocsShell;

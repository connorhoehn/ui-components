// AppShell — top-level application shell compositor.
//
// Slots: sidebar?, header, children, toastRegion?, loading?, apiDegraded?
// Composes ToastProvider + optional slots into a structured chrome layout.
// Presentational — all logic lives in the caller's props.

import type { CSSProperties, ReactNode } from 'react';
import { ToastProvider } from '../shared/ToastProvider';
import { cn } from '../../lib/cn';

export interface AppShellProps {
  /** Slot: full-height left sidebar (CollapsibleSidebar etc.) */
  sidebar?: ReactNode;
  /**
   * Slot: the header row's content. The shell draws the row itself — a
   * flex row of `headerHeight`, padded, bordered, sticky — so its height is
   * pinned rather than derived from the tallest control in it. Every offset
   * below (the sidebar's top, the body's minimum height) reads that one
   * number, so a taller control can never move the anchors.
   */
  header: ReactNode;
  /**
   * Slot: a second row of chrome under the header — a section band. Sticky
   * with the header, full window width, and the sidebar hangs beneath both.
   * Rendered only when present; its height counts only then.
   */
  subheader?: ReactNode;
  /** Page content */
  children: ReactNode;
  /** Slot: override default ToastProvider region (pass null to suppress) */
  toastRegion?: ReactNode | null;
  /** When truthy, renders a full-screen loading overlay */
  loading?: boolean | ReactNode;
  /** When truthy, renders an API-degraded banner below the header */
  apiDegraded?: ReactNode;
  /**
   * Slot: a global command palette (e.g. `<CommandPalette />`). Rendered
   * once at the shell level so any page can open it via `useCommandPalette`.
   * Wrap the AppShell in `<CommandPaletteProvider>` so the palette and the
   * pages inside share the same registry.
   */
  commandPalette?: ReactNode;
  className?: string;
  /** Width of the sidebar slot in px (default 260) */
  sidebarWidth?: number;
  /** The header row's height in px (default 53). Also published as `--app-shell-header-h`. */
  headerHeight?: number;
  /** The subheader row's height in px (default 36), counted only when `subheader` is present. */
  subheaderHeight?: number;
  /**
   * Left inset of the subheader's content in px, so its tabs can share a
   * left edge with the header's own nav rather than with whatever the
   * sidebar's width happens to be. Default: the header's padding.
   */
  subheaderInset?: number;
  /** Padding around the routed page. `none` for a full-bleed surface. Default `md`. */
  contentPadding?: 'none' | 'md';
  /** Classes for the sidebar column — its padding when open vs folded, say. */
  sidebarClassName?: string;
  /** Accessible name of the sidebar landmark. Default "App sidebar". */
  sidebarLabel?: string;
  sidebarTestId?: string;
  subheaderTestId?: string;
  /**
   * The sidebar runs the full window height and the header row starts beside
   * it (2.386.0) — the collapsed icon strip's layout, where the strip's first
   * button sits in the header row. Default false: the header spans the window
   * and the sidebar hangs below the chrome.
   */
  sidebarFullHeight?: boolean;
  /**
   * How the shell sizes against the window (since 2.501.0).
   *
   * - `document` (default, back-compat): the shell is at least the window's
   *   height and the document scrolls; the chrome is sticky. Stacked pages
   *   scroll like a web page.
   * - `fill` (**recommended for portal apps**): the shell is exactly `100dvh`
   *   and the document never scrolls. The main region is `min-h-0
   *   overflow-hidden`, so a child layout (`ExplorerLayout`, `SplitPane`,
   *   `MasterDetail`, `SubNavLayout`, `WorkArea`) gets a definite height and
   *   overflow lives inside its panes. Give the page's root `flex-1 min-h-0`
   *   (the layouts above already do).
   */
  layout?: 'document' | 'fill';
}

function LoadingOverlay({ children }: { children?: ReactNode }) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="fixed inset-0 z-[9000] flex items-center justify-center bg-[var(--color-surface)] bg-opacity-80"
    >
      {children ?? (
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-[var(--color-border)] border-t-[var(--color-primary)] animate-spin" />
          <span className="text-sm text-[var(--color-text-secondary)]">Loading…</span>
        </div>
      )}
    </div>
  );
}

/**
 * AppShell wraps its children in a ToastProvider by default.
 * Pass `toastRegion={null}` to opt out (e.g. parent already has one).
 */
export function AppShell({
  sidebar,
  header,
  subheader,
  children,
  toastRegion,
  loading,
  apiDegraded,
  commandPalette,
  className,
  sidebarWidth = 260,
  headerHeight = 53,
  subheaderHeight = 36,
  subheaderInset,
  contentPadding = 'md',
  sidebarClassName,
  sidebarLabel = 'App sidebar',
  sidebarTestId = 'app-sidebar',
  subheaderTestId = 'app-subheader',
  sidebarFullHeight = false,
  layout = 'document',
}: AppShellProps) {
  const fill = layout === 'fill';
  // The one derivation. The sidebar's top and the body's minimum height both
  // read `--app-shell-chrome-h`; nothing below hard-codes a pixel of chrome.
  const chromeHeight = headerHeight + (subheader ? subheaderHeight : 0);
  const vars = {
    '--app-shell-header-h': `${headerHeight}px`,
    '--app-shell-chrome-h': `${chromeHeight}px`,
  } as CSSProperties;
  const inner = (
    <div
      className={cn('relative font-sans', fill ? 'flex h-dvh flex-col overflow-hidden' : 'min-h-screen', 'bg-[var(--color-surface-panel)] text-[var(--color-text-primary)]', className)}
      style={vars}
      data-chrome-height={chromeHeight}
      data-layout={layout}
    >
      {/* Chrome — sticky, full-width: the header row, the section band, the
          degraded banner. One block, so the two nav rows read as one piece of
          chrome sitting on the page. */}
      <div className={cn('sticky top-0 z-50', fill && 'shrink-0')} {...(sidebar && sidebarFullHeight ? { style: { marginLeft: sidebarWidth }, 'data-beside-sidebar': 'true' } : {})}>
        <div
          className="flex items-center gap-4 border-b border-[var(--color-border)] bg-[var(--color-surface)] px-6"
          style={{ height: headerHeight }}
          data-testid="app-shell-header"
        >
          {header}
        </div>
        {subheader && (
          <div
            className="border-b border-[var(--color-border)] bg-[var(--color-surface)]"
            // Border included in the height: the tabs' own indicator overlaps
            // this rule, so the row is exactly `subheaderHeight` and not one
            // more — measured, a 1px seam between band and sidebar otherwise.
            style={{ height: subheaderHeight, paddingLeft: subheaderInset, paddingRight: '1.5rem', boxSizing: 'border-box' }}
            data-testid={subheaderTestId}
          >
            {subheader}
          </div>
        )}
        {apiDegraded && (
          <div className="border-b border-[var(--color-border)]">
            {apiDegraded}
          </div>
        )}
      </div>

      {/* Body */}
      {/* Fill: the body takes the rest of the 100dvh column and never grows
          past it; document: at least the window below the chrome. */}
      <div className={cn('flex', fill ? 'min-h-0 flex-1 overflow-hidden' : 'min-h-[calc(100vh-var(--app-shell-chrome-h))]')} data-testid="app-shell-body">
        {sidebar && (
          <nav
            role="navigation"
            aria-label={sidebarLabel}
            data-testid={sidebarTestId}
            className={cn(
              'fixed left-0 bottom-0 box-border flex shrink-0 flex-col overflow-y-auto overflow-x-hidden border-r border-[var(--color-border)] bg-[var(--color-surface)] transition-[width,padding] duration-200',
              // Full height, it sits beside the chrome rather than under it,
              // so it rises above the sticky header's z-50.
              sidebarFullHeight ? 'z-[51]' : 'z-40',
              sidebarClassName,
            )}
            style={{ width: sidebarWidth, top: sidebarFullHeight ? 0 : 'var(--app-shell-chrome-h)' }}
            data-full-height={sidebarFullHeight ? 'true' : undefined}
          >
            {sidebar}
          </nav>
        )}

        {/* Main content — offset by sidebar when present. `min-w-0`: main is a
            flex item of the body row, and without it its automatic minimum
            width is its content's min-content — a truncated line, a toolbar
            that measures its own room, a composer row — so one long nowrap
            line made the whole page wider than the window (1587px at 1280 on
            the Documents list). The page is the window's width; what does
            not fit wraps, folds or scrolls inside its own pane. */}
        <main
          className={cn('relative z-[1] flex min-h-0 min-w-0 flex-1 flex-col bg-[var(--color-surface-panel)]', fill && 'overflow-hidden')}
          style={sidebar ? { marginLeft: sidebarWidth, width: `calc(100% - ${sidebarWidth}px)` } : undefined}
        >
          <div
            // The gutter reads `--ui-page-gutter`, the same token WorkArea,
            // SubNavLayout and ExplorerLayout use, so one host override moves
            // every page edge together.
            className={cn(
              'flex min-h-0 flex-1 flex-col',
              fill && 'overflow-hidden',
              contentPadding === 'md' ? 'gap-4 px-[var(--ui-page-gutter,1.5rem)] pb-[var(--ui-page-gutter,1.5rem)] pt-4' : 'gap-0 p-0',
            )}
            data-testid="app-shell-content"
            data-padding={contentPadding}
          >
            {children}
          </div>
        </main>
      </div>

      {/* Loading overlay */}
      {loading && (
        <LoadingOverlay>
          {typeof loading !== 'boolean' ? loading : undefined}
        </LoadingOverlay>
      )}

      {/* Command palette — mounts at the shell root so pages can open it
          from anywhere via useCommandPalette() / Cmd+K. */}
      {commandPalette}
    </div>
  );

  // toastRegion === null → caller manages toasts
  if (toastRegion === null) return inner;
  // toastRegion provided → render it alongside the shell (caller supplies <ToastProvider>)
  if (toastRegion !== undefined) {
    return (
      <>
        {inner}
        {toastRegion}
      </>
    );
  }
  // default → wrap in ToastProvider
  return <ToastProvider>{inner}</ToastProvider>;
}

export default AppShell;

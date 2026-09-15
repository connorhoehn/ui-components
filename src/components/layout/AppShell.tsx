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
}: AppShellProps) {
  // The one derivation. The sidebar's top and the body's minimum height both
  // read `--app-shell-chrome-h`; nothing below hard-codes a pixel of chrome.
  const chromeHeight = headerHeight + (subheader ? subheaderHeight : 0);
  const vars = {
    '--app-shell-header-h': `${headerHeight}px`,
    '--app-shell-chrome-h': `${chromeHeight}px`,
  } as CSSProperties;
  const inner = (
    <div
      className={cn('relative min-h-screen font-sans bg-[var(--color-surface-panel)] text-[var(--color-text-primary)]', className)}
      style={vars}
      data-chrome-height={chromeHeight}
    >
      {/* Chrome — sticky, full-width: the header row, the section band, the
          degraded banner. One block, so the two nav rows read as one piece of
          chrome sitting on the page. */}
      <div className="sticky top-0 z-50">
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
      <div className="flex min-h-[calc(100vh-var(--app-shell-chrome-h))]">
        {sidebar && (
          <nav
            role="navigation"
            aria-label={sidebarLabel}
            data-testid={sidebarTestId}
            className={cn(
              'fixed left-0 bottom-0 z-40 box-border flex shrink-0 flex-col overflow-y-auto overflow-x-hidden border-r border-[var(--color-border)] bg-[var(--color-surface)] transition-[width,padding] duration-200',
              sidebarClassName,
            )}
            style={{ width: sidebarWidth, top: 'var(--app-shell-chrome-h)' }}
          >
            {sidebar}
          </nav>
        )}

        {/* Main content — offset by sidebar when present */}
        <main
          className="relative z-[1] flex min-h-0 flex-1 flex-col bg-[var(--color-surface-panel)]"
          style={sidebar ? { marginLeft: sidebarWidth, width: `calc(100% - ${sidebarWidth}px)` } : undefined}
        >
          <div
            className={cn('flex min-h-0 flex-1 flex-col', contentPadding === 'md' ? 'gap-4 px-8 pb-6 pt-4' : 'gap-0 p-0')}
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

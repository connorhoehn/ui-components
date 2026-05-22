// AppShell — top-level application shell compositor.
//
// Slots: sidebar?, header, children, toastRegion?, loading?, apiDegraded?
// Composes ToastProvider + optional slots into a structured chrome layout.
// Presentational — all logic lives in the caller's props.

import type { ReactNode } from 'react';
import { ToastProvider } from '../shared/ToastProvider';
import { cn } from '../../lib/cn';

export interface AppShellProps {
  /** Slot: full-height left sidebar (CollapsibleSidebar etc.) */
  sidebar?: ReactNode;
  /** Slot: fixed top header bar */
  header: ReactNode;
  /** Page content */
  children: ReactNode;
  /** Slot: override default ToastProvider region (pass null to suppress) */
  toastRegion?: ReactNode | null;
  /** When truthy, renders a full-screen loading overlay */
  loading?: boolean | ReactNode;
  /** When truthy, renders an API-degraded banner below the header */
  apiDegraded?: ReactNode;
  className?: string;
  /** Width of the sidebar slot in px (default 260) */
  sidebarWidth?: number;
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
  children,
  toastRegion,
  loading,
  apiDegraded,
  className,
  sidebarWidth = 260,
}: AppShellProps) {
  const inner = (
    <div className={cn('relative min-h-screen font-sans bg-[var(--color-surface-panel)]', className)}>
      {/* Header — sticky, full-width */}
      <div className="sticky top-0 z-50">
        {header}
        {apiDegraded && (
          <div className="border-b border-[var(--color-border)]">
            {apiDegraded}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex min-h-[calc(100vh-var(--app-shell-header-h,53px))]">
        {sidebar && (
          <aside
            className="shrink-0 border-r border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col fixed top-[var(--app-shell-header-h,53px)] left-0 bottom-0 overflow-y-auto overflow-x-hidden z-40"
            style={{ width: sidebarWidth }}
          >
            {sidebar}
          </aside>
        )}

        {/* Main content — offset by sidebar when present */}
        <main
          className="flex-1 flex flex-col min-h-0"
          style={sidebar ? { marginLeft: sidebarWidth } : undefined}
        >
          {children}
        </main>
      </div>

      {/* Loading overlay */}
      {loading && (
        <LoadingOverlay>
          {typeof loading !== 'boolean' ? loading : undefined}
        </LoadingOverlay>
      )}
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

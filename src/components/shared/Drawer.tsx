// Drawer — right-side slide-in panel, floating or docked.
//
// FLOATING (default): portal-rendered into document.body so the backdrop
// escapes any ancestor stacking context. Closes on Escape or backdrop click.
// On open, focuses the first focusable element inside the panel for keyboard
// accessibility.
//
// Replaces the hand-rolled backdrop + aside pattern in the portal codebase
// (see TODO(T1B) in the OrgIQ portal).
//
// DOCKED (`docked`): the same chrome, rendered INLINE where it is placed —
// no portal, no backdrop, no focus trap, no Escape. It is a column in the
// layout, not something laid over it, so the page reflows around it and it
// cannot cover the host's own chrome.
//
// The two share one implementation on purpose. A docked panel that is a
// separate component drifts from the floating one — different padding,
// different border, a different close glyph — and then the app has two panels
// that are supposed to look the same and do not. Consumers had a local
// `Panel.tsx` doing exactly that; this is what replaces it.

import React, { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../lib/cn';
import { focusInitialElement, restoreFocus, trapTabKey } from '../../lib/focusTrap';
import { useOverlayLayer } from '../../lib/overlayStack';

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  /**
   * Panel width in pixels. Defaults to 460 floating; docked it defaults to
   * filling its parent, because the column a docked panel sits in is normally
   * already sized by the layout.
   */
  width?: number;
  children: React.ReactNode;
  footer?: React.ReactNode;
  /**
   * Render inline in the layout instead of as an overlay: no portal, no
   * backdrop, no focus trap, no Escape handler. `open={false}` still renders
   * nothing, so the same flag drives both forms.
   *
   * A docked panel is not a dialog — it does not take focus and does not trap
   * it — so it is a `<complementary>` region rather than `role="dialog"`,
   * named by its title (or `aria-label`) the same way.
   */
  docked?: boolean;
  /**
   * Controls beside the close button in the header — a filter toggle, an
   * "open in full page" link. Rendered in both forms.
   */
  actions?: React.ReactNode;
  /** Classes on the panel element itself. */
  className?: string;
  /** Classes on the scrolling body. Overrides its default padding via tw-merge. */
  bodyClassName?: string;
  /**
   * Accessible name for the dialog when there is no visible `title` to point
   * at. When `title` IS set the heading labels the dialog via
   * `aria-labelledby` and this prop is unnecessary.
   */
  'aria-label'?: string;
  'data-testid'?: string;
}

function Drawer({
  open,
  onClose,
  title,
  subtitle,
  width,
  children,
  footer,
  docked = false,
  actions,
  className,
  bodyClassName,
  'aria-label': ariaLabel,
  'data-testid': testId,
}: DrawerProps) {
  const panelRef = useRef<HTMLElement | null>(null);
  // Element focused before the drawer opened, restored on close so keyboard
  // users resume from the trigger instead of the top of the document.
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const headingId = useId();
  // Only the top layer consumes Escape — a dialog or palette opened over the
  // drawer must not take the drawer down with it.
  const isTopLayer = useOverlayLayer(open && !docked);
  const resolvedWidth = width ?? (docked ? undefined : 460);

  // Escape-to-close plus the Tab/Shift+Tab focus trap. Without the trap, Tab
  // from the last control walks into the page BEHIND the drawer, which is the
  // classic "dialog leaks focus" failure.
  useEffect(() => {
    if (!open || docked) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isTopLayer()) onClose();
        return;
      }
      if (!isTopLayer()) return;
      trapTabKey(e, panelRef.current);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose, isTopLayer, docked]);

  // Move focus into the panel when it opens; restore it on close.
  useEffect(() => {
    if (!open || docked) return;
    previouslyFocusedRef.current =
      (typeof document !== 'undefined' ? document.activeElement : null) as HTMLElement | null;
    focusInitialElement(panelRef.current);
    return () => {
      restoreFocus(previouslyFocusedRef.current);
      previouslyFocusedRef.current = null;
    };
  }, [open, docked]);

  if (!open) return null;

  // Header, body and footer are built once and rendered by both forms, so the
  // docked panel cannot drift away from the floating one.
  const header = (
    <div className="flex items-start justify-between p-5 border-b border-[var(--color-border)] flex-shrink-0">
      <div className="min-w-0">
        {title && (
          <h2 id={headingId} className="text-base font-semibold text-[var(--color-text-primary)]">
            {title}
          </h2>
        )}
        {subtitle && (
          <p className="text-sm text-[var(--color-text-secondary)] mt-0.5">
            {subtitle}
          </p>
        )}
      </div>
      <div className="ml-4 flex flex-shrink-0 items-center gap-1">
        {actions}
        <button
          type="button"
          onClick={onClose}
          className="flex-shrink-0 p-1 rounded hover:bg-[var(--color-surface-hover)] text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors"
          aria-label="Close"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M4 4l8 8M12 4l-8 8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );

  const body = <div className={cn('flex-1 overflow-y-auto p-5', bodyClassName)}>{children}</div>;

  const footerRow = footer ? (
    <div className="flex-shrink-0 border-t border-[var(--color-border)] p-4 bg-[var(--color-surface-inset,#f8fafc)]">
      {footer}
    </div>
  ) : null;

  if (docked) {
    // A docked panel with nothing to put in a header is a width shell — a
    // column whose contents bring their own chrome (a ChannelHeader, say).
    // Drawing a lone close button above them would be a second, competing
    // header, which is exactly what the hand-rolled version got wrong.
    const hasHeader = !!(title || subtitle || actions);
    return (
      <aside
        ref={panelRef}
        role="complementary"
        aria-labelledby={title ? headingId : undefined}
        aria-label={title ? undefined : ariaLabel}
        data-testid={testId}
        data-docked="true"
        className={cn(
          'relative flex h-full min-h-0 flex-shrink-0 flex-col overflow-hidden',
          'bg-surface border-l border-[var(--color-border)]',
          resolvedWidth === undefined && 'w-full',
          className,
        )}
        {...(resolvedWidth === undefined ? {} : { style: { width: resolvedWidth } })}
      >
        {hasHeader && header}
        {body}
        {footerRow}
      </aside>
    );
  }

  return createPortal(
    <div className="fixed inset-0 z-[9000]" data-testid={testId}>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-[1px]"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Panel */}
      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? headingId : undefined}
        aria-label={title ? undefined : ariaLabel}
        className={cn(
          'absolute right-0 top-0 h-full bg-surface shadow-xl flex flex-col',
          'transition-transform duration-200',
          open ? 'translate-x-0' : 'translate-x-full',
          className,
        )}
        style={{ width: resolvedWidth }}
      >
        {header}
        {body}
        {footerRow}
      </aside>
    </div>,
    document.body,
  );
}

export { Drawer };
export default Drawer;

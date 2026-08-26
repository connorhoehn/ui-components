// Drawer — right-side slide-in panel.
//
// Portal-rendered into document.body so the backdrop escapes any ancestor
// stacking context. Closes on Escape or backdrop click. On open, focuses
// the first focusable element inside the panel for keyboard accessibility.
//
// Replaces the hand-rolled backdrop + aside pattern in the portal codebase
// (see TODO(T1B) in the OrgIQ portal).

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
  /** Panel width in pixels. Defaults to 460. */
  width?: number;
  children: React.ReactNode;
  footer?: React.ReactNode;
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
  width = 460,
  children,
  footer,
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
  const isTopLayer = useOverlayLayer(open);

  // Escape-to-close plus the Tab/Shift+Tab focus trap. Without the trap, Tab
  // from the last control walks into the page BEHIND the drawer, which is the
  // classic "dialog leaks focus" failure.
  useEffect(() => {
    if (!open) return;
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
  }, [open, onClose, isTopLayer]);

  // Move focus into the panel when it opens; restore it on close.
  useEffect(() => {
    if (!open) return;
    previouslyFocusedRef.current =
      (typeof document !== 'undefined' ? document.activeElement : null) as HTMLElement | null;
    focusInitialElement(panelRef.current);
    return () => {
      restoreFocus(previouslyFocusedRef.current);
      previouslyFocusedRef.current = null;
    };
  }, [open]);

  if (!open) return null;

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
        )}
        style={{ width }}
      >
        {/* Header */}
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
          <button
            type="button"
            onClick={onClose}
            className="ml-4 flex-shrink-0 p-1 rounded hover:bg-[var(--color-surface-hover)] text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors"
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
        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5">{children}</div>
        {/* Footer */}
        {footer && (
          <div className="flex-shrink-0 border-t border-[var(--color-border)] p-4 bg-[var(--color-surface-inset,#f8fafc)]">
            {footer}
          </div>
        )}
      </aside>
    </div>,
    document.body,
  );
}

export { Drawer };
export default Drawer;

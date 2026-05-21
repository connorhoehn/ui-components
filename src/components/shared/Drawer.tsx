// Drawer — right-side slide-in panel.
//
// Portal-rendered into document.body so the backdrop escapes any ancestor
// stacking context. Closes on Escape or backdrop click. On open, focuses
// the first focusable element inside the panel for keyboard accessibility.
//
// Replaces the hand-rolled backdrop + aside pattern in the portal codebase
// (see TODO(T1B) in the OrgIQ portal).

import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../lib/cn';

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  /** Panel width in pixels. Defaults to 460. */
  width?: number;
  children: React.ReactNode;
  footer?: React.ReactNode;
  'data-testid'?: string;
}

// Same focusable selector used in Modal — keep these in sync.
const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]',
].join(',');

function Drawer({
  open,
  onClose,
  title,
  subtitle,
  width = 460,
  children,
  footer,
  'data-testid': testId,
}: DrawerProps) {
  const panelRef = useRef<HTMLElement | null>(null);

  // Escape-to-close handler. Only wired up while the drawer is open so
  // background pages keep their own keyboard handlers when we're not visible.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  // Move focus into the panel when it opens. Defer slightly so the panel DOM
  // is committed before we query for focusable children.
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;
    const focusable = panel.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
    if (focusable) {
      focusable.focus();
    } else {
      // Nothing focusable — focus the panel itself so SR announces it.
      panel.setAttribute('tabindex', '-1');
      panel.focus();
    }
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
        aria-label={title}
        className={cn(
          'absolute right-0 top-0 h-full bg-white shadow-xl flex flex-col',
          'transition-transform duration-200',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
        style={{ width }}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-[var(--color-border)] flex-shrink-0">
          <div className="min-w-0">
            {title && (
              <h2 className="text-base font-semibold text-[var(--color-text-primary)]">
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

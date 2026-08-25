// src/lib/focusTrap.ts
//
// Shared focus-trap primitives for overlay surfaces (dialogs, drawers,
// lightboxes). Modal.tsx and InlinePopover.tsx grew their own copies of this
// logic first; those are left alone deliberately (working code, own tests) but
// every NEW trap should come from here so the four-way drift stops.
//
// Nothing here is exported from a public barrel — it is an internal helper.

import { useEffect, useRef } from 'react';
import { useOverlayLayer } from './overlayStack';

/**
 * CSS selector matching everything that can hold focus. Buttons, links with
 * `href`, form controls (when not disabled), `[tabindex]` (excluding -1), and
 * contenteditable elements all qualify per WAI-ARIA authoring practice.
 */
export const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]',
].join(',');

/**
 * All focusable descendants of `root`, in DOM order.
 *
 * jsdom doesn't compute layout, so `offsetParent` is null even for visible
 * elements — visibility is approximated by inline `display`/`visibility` and
 * `aria-hidden`, which is what the Modal implementation has always done.
 */
export function getFocusableElements(root: HTMLElement): HTMLElement[] {
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter((el) => {
    if (el.getAttribute('aria-hidden') === 'true') return false;
    if (el.style.display === 'none' || el.style.visibility === 'hidden') return false;
    return true;
  });
}

/**
 * Handle a Tab / Shift+Tab keydown so focus cycles inside `container` instead
 * of escaping into the page behind the overlay.
 *
 * Returns true when the event was handled (and `preventDefault()` was called),
 * so callers can early-return. Non-Tab keys are ignored.
 */
export function trapTabKey(e: KeyboardEvent, container: HTMLElement | null): boolean {
  if (e.key !== 'Tab' || !container) return false;

  const focusables = getFocusableElements(container);
  if (focusables.length === 0) {
    // Nothing focusable inside — keep focus pinned to the container itself
    // rather than letting Tab walk the page behind the overlay.
    e.preventDefault();
    return true;
  }

  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  const active = (container.ownerDocument?.activeElement ?? null) as HTMLElement | null;

  // Focus escaped the container (browser focus restore, programmatic blur, a
  // portal sibling…) — pull it back rather than continuing outwards.
  if (!active || !container.contains(active)) {
    e.preventDefault();
    first.focus();
    return true;
  }

  if (e.shiftKey && active === first) {
    e.preventDefault();
    last.focus();
    return true;
  }
  if (!e.shiftKey && active === last) {
    e.preventDefault();
    first.focus();
    return true;
  }
  return false;
}

/**
 * Move focus into an overlay on open: the `[data-autofocus]` element if the
 * caller marked one, else the first focusable child, else the container itself
 * (given `tabindex="-1"` so screen readers announce the dialog).
 */
export function focusInitialElement(container: HTMLElement | null): void {
  if (!container) return;
  const autofocus = container.querySelector<HTMLElement>('[data-autofocus]');
  if (autofocus) {
    autofocus.focus();
    return;
  }
  const focusables = getFocusableElements(container);
  if (focusables.length > 0) {
    focusables[0].focus();
    return;
  }
  container.setAttribute('tabindex', '-1');
  container.focus();
}

/**
 * Restore focus to `element` if it is still in the document. Overlays that
 * skip this strand keyboard and screen-reader users on `<body>`, where the
 * next Tab restarts from the top of the page.
 */
export function restoreFocus(element: HTMLElement | null): void {
  if (!element) return;
  if (typeof element.focus !== 'function') return;
  if (!element.ownerDocument?.contains(element)) return;
  element.focus();
}

/**
 * The dismiss half of an overlay, for the many small anchored surfaces —
 * dropdown menus, filter popovers, icon pickers, error cards — that render a
 * panel over the page but are not full `Modal`s.
 *
 * Five of them had grown the same partial implementation independently, and
 * every one was missing a different piece: `UserMenu` closed on Escape but
 * dropped focus on `<body>`; `PipelineCard`'s and `RunsFilterBar`'s menus had
 * no Escape at all; `IconPicker` handled Escape only while focus sat in its
 * custom-emoji input; `ErrorOverlay` could only be dismissed by finding its
 * `×` with the mouse. This gives all of them the same two guarantees:
 *
 *  1. Escape closes the layer — but only when it is the TOP layer, so a menu
 *     inside a dialog doesn't take the dialog down with it (see overlayStack).
 *  2. When the layer closes, focus goes back to whatever had it when the
 *     layer opened, which for a click-to-open menu is the trigger. Without
 *     this, dismissing strands the user at the top of the document.
 *
 * This deliberately does NOT trap Tab. These are non-modal surfaces where
 * tabbing out is a legitimate way to leave; a trap would be wrong. Use
 * `trapTabKey` for anything that sets `aria-modal="true"`.
 */
export function useDismissableLayer(open: boolean, onClose: () => void): void {
  const isTopLayer = useOverlayLayer(open);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  // Held in a ref so a caller passing an inline arrow doesn't re-bind the
  // listener on every render.
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (!isTopLayer()) return;
      onCloseRef.current();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, isTopLayer]);

  useEffect(() => {
    if (!open) return;
    previouslyFocusedRef.current =
      (typeof document !== 'undefined' ? document.activeElement : null) as HTMLElement | null;
    return () => {
      restoreFocus(previouslyFocusedRef.current);
      previouslyFocusedRef.current = null;
    };
  }, [open]);
}

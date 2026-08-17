// frontend/src/components/shared/InlinePopover.tsx
//
// InlinePopover — lightweight anchored popover. Renders into a portal,
// positioned next to a trigger element ref. Dismisses on:
//   - click outside the panel
//   - Escape key
//   - focus moving outside the panel + trigger
//
// Focus is moved into the panel on open and restored to the trigger on
// close (basic focus trap; Tab/Shift+Tab cycle within the panel).
//
// Three placements: 'bottom-start' (default) anchors the top-left of the
// popover to the bottom-left of the trigger. 'bottom-end' anchors the
// top-RIGHT of the popover to the bottom-right of the trigger (for
// triggers sitting at the viewport's right edge). 'right' anchors the
// left edge to the trigger's right edge, top-aligned.

import {
  type CSSProperties,
  type ReactNode,
  type RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../lib/cn';

export type InlinePopoverPlacement = 'bottom-start' | 'bottom-end' | 'right';

export interface InlinePopoverProps {
  /** Ref to the anchor element (the visible trigger). */
  trigger: RefObject<HTMLElement | null>;
  /** Whether the popover is currently open. Controlled by the caller. */
  open: boolean;
  /** Fires when the popover should dismiss (outside click / Esc / tab-out). */
  onClose: () => void;
  /** Placement relative to the trigger. Defaults to 'bottom-start'. */
  placement?: InlinePopoverPlacement;
  /** Pixel gap between trigger and panel. Default 6. */
  offset?: number;
  /** Optional className for the panel. */
  className?: string;
  /** Optional z-index (default 9500 — under modals at 10000). */
  zIndex?: number;
  /** Optional testid for the panel. Default 'inline-popover'. */
  'data-testid'?: string;
  children: ReactNode;
}

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]',
].join(',');

function getFocusable(root: HTMLElement): HTMLElement[] {
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (el) => el.getAttribute('aria-hidden') !== 'true',
  );
}

function computePosition(
  anchor: DOMRect,
  placement: InlinePopoverPlacement,
  offset: number,
): CSSProperties {
  if (placement === 'right') {
    return {
      position: 'fixed',
      top: anchor.top,
      left: anchor.right + offset,
    };
  }
  if (placement === 'bottom-end') {
    // Anchor the panel's top-RIGHT corner to the trigger's bottom-right:
    // left edge at anchor.right, then shift back by the panel's own width.
    return {
      position: 'fixed',
      top: anchor.bottom + offset,
      left: anchor.right,
      transform: 'translateX(-100%)',
    };
  }
  // bottom-start
  return {
    position: 'fixed',
    top: anchor.bottom + offset,
    left: anchor.left,
  };
}

export function InlinePopover({
  trigger,
  open,
  onClose,
  placement = 'bottom-start',
  offset = 6,
  className,
  zIndex = 9500,
  'data-testid': testId = 'inline-popover',
  children,
}: InlinePopoverProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState<CSSProperties | null>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  // Recompute anchored position whenever the popover opens, or when
  // the viewport scrolls / resizes while it's open.
  const recompute = useCallback(() => {
    const el = trigger.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPosition(computePosition(rect, placement, offset));
  }, [trigger, placement, offset]);

  useLayoutEffect(() => {
    if (!open) {
      setPosition(null);
      return;
    }
    recompute();
  }, [open, recompute]);

  useEffect(() => {
    if (!open) return;
    const handler = () => recompute();
    window.addEventListener('scroll', handler, true);
    window.addEventListener('resize', handler);
    return () => {
      window.removeEventListener('scroll', handler, true);
      window.removeEventListener('resize', handler);
    };
  }, [open, recompute]);

  // Capture focus on open; restore to trigger on close.
  useEffect(() => {
    if (!open) return;
    const active =
      typeof document !== 'undefined'
        ? (document.activeElement as HTMLElement | null)
        : null;
    previouslyFocusedRef.current = active;
    // Defer until panel is mounted.
    queueMicrotask(() => {
      const panel = panelRef.current;
      if (!panel) return;
      const focusables = getFocusable(panel);
      if (focusables.length > 0) {
        focusables[0].focus();
      } else {
        panel.setAttribute('tabindex', '-1');
        panel.focus();
      }
    });
    return () => {
      const prev = previouslyFocusedRef.current;
      if (prev && typeof prev.focus === 'function' && document.contains(prev)) {
        prev.focus();
      }
      previouslyFocusedRef.current = null;
    };
  }, [open]);

  // ESC + focus trap.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      const panel = panelRef.current;
      if (!panel) return;
      const focusables = getFocusable(panel);
      if (focusables.length === 0) {
        e.preventDefault();
        return;
      }
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (!active || !panel.contains(active)) {
        e.preventDefault();
        first.focus();
        return;
      }
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  // Outside-click dismiss. The trigger itself is excluded so the parent
  // can implement a "click trigger to toggle" pattern without flicker.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      const target = e.target as Node | null;
      if (!target) return;
      if (panelRef.current?.contains(target)) return;
      if (trigger.current?.contains(target)) return;
      onClose();
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open, onClose, trigger]);

  if (!open || !position) return null;
  if (typeof document === 'undefined') return null;

  return createPortal(
    <div
      ref={panelRef}
      role="dialog"
      data-testid={testId}
      data-placement={placement}
      className={cn(
        'min-w-[160px] rounded-lg border border-border bg-white',
        'shadow-lg p-1 text-sm text-slate-700',
        className,
      )}
      style={{ ...position, zIndex }}
    >
      {children}
    </div>,
    document.body,
  );
}

export default InlinePopover;

// InlineMenu — lightweight anchored popover that renders IN PLACE: no
// portal, no focus trap.
//
// InlinePopover (this directory) portals to `document.body` and traps focus
// inside the panel — right for a floating menu that must escape a clipping
// ancestor (a scrollable list row, a canvas node) or survive its trigger
// unmounting mid-interaction. That machinery is overkill, and sometimes
// actively wrong, for a small panel that already has room to render in its
// own stacking context: the portal breaks anything that expects the panel
// at its normal DOM position — a CSS descendant selector scoped to the
// trigger's container, a snapshot asserting DOM structure, `document
// .activeElement` walks relative to a non-portalled ancestor.
//
// Anchoring is pure CSS, not `getBoundingClientRect`: the panel is
// `position: absolute`, so the caller must render its trigger and this
// component inside a shared `position: relative` wrapper (or supply one via
// `className`/a parent element). There is no scroll/resize recompute and no
// viewport-edge flip-and-clamp — if the caller's layout can clip the panel
// or the trigger can scroll out from under it, use InlinePopover instead.
//
// Dismiss: outside pointerdown (the `trigger` ref, when passed, is excluded
// — same as InlinePopover — so a "click trigger to toggle" caller doesn't
// see it flicker closed-then-open) and Escape, scoped to the top overlay
// layer via `useOverlayLayer` (see lib/overlayStack.ts) so two stacked
// menus don't both close on one keypress. There is no focus capture on open
// and no Tab cycling: focus stays wherever it was, and Tab walks out of the
// panel into whatever follows it in document order, the same as any other
// static content on the page.

import { useEffect, useRef, type ReactNode, type RefObject } from 'react';
import { cn } from '../../lib/cn';
import { useOverlayLayer } from '../../lib/overlayStack';

export type InlineMenuPlacement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';

const PLACEMENT_CLASSES: Record<InlineMenuPlacement, string> = {
  'bottom-start': 'top-full left-0 mt-1',
  'bottom-end': 'top-full right-0 mt-1',
  'top-start': 'bottom-full left-0 mb-1',
  'top-end': 'bottom-full right-0 mb-1',
};

export interface InlineMenuProps {
  /** Whether the panel is currently open. Controlled by the caller. */
  open: boolean;
  /** Fires when the panel should dismiss (outside click / Esc). */
  onClose: () => void;
  /**
   * Placement relative to the nearest `position: relative` ancestor —
   * normally a wrapper around the trigger this panel is anchored to.
   * Defaults to 'bottom-start'.
   */
  placement?: InlineMenuPlacement;
  /**
   * Ref to the trigger element, so a pointerdown on it doesn't count as an
   * "outside" click. Optional — omit it if the caller handles its own
   * open/close toggling some other way.
   */
  trigger?: RefObject<HTMLElement | null>;
  /**
   * ARIA role for the panel. Default `'group'` — a plain labelled
   * container, appropriate when the panel isn't a focus-trapping dialog
   * (this component doesn't trap focus) and may or may not hold menu items.
   * Pass `'menu'` when every child is a `menuitem`.
   */
  role?: string;
  /** Optional className for the panel. */
  className?: string;
  /** Optional testid for the panel. Default 'inline-menu'. */
  'data-testid'?: string;
  /** Accessible name for the panel. */
  'aria-label'?: string;
  /** Id of an element inside the panel that names it. */
  'aria-labelledby'?: string;
  children: ReactNode;
}

export function InlineMenu({
  open,
  onClose,
  placement = 'bottom-start',
  trigger,
  role = 'group',
  className,
  'data-testid': testId = 'inline-menu',
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  children,
}: InlineMenuProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  // Escape belongs to the top layer only — see lib/overlayStack.ts for why
  // a bare `e.stopPropagation()` cannot achieve that on its own.
  const isTopLayer = useOverlayLayer(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (!isTopLayer()) return;
      e.stopPropagation();
      onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose, isTopLayer]);

  // Outside-click dismiss. The trigger itself is excluded so the parent can
  // implement a "click trigger to toggle" pattern without flicker.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      const target = e.target as Node | null;
      if (!target) return;
      if (panelRef.current?.contains(target)) return;
      if (trigger?.current?.contains(target)) return;
      onClose();
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open, onClose, trigger]);

  if (!open) return null;

  return (
    <div
      ref={panelRef}
      role={role}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      data-testid={testId}
      data-placement={placement}
      className={cn(
        'absolute z-20 min-w-[160px] rounded-lg border border-border bg-surface',
        'shadow-lg p-1 text-sm text-text-primary',
        PLACEMENT_CLASSES[placement],
        className,
      )}
    >
      {children}
    </div>
  );
}

export default InlineMenu;

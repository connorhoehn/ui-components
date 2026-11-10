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
// left edge to the trigger's right edge, top-aligned. 'top-start' /
// 'top-end' (since 2.517.0) open ABOVE the trigger, start- or end-aligned:
// for a trigger in a footer row.

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
import { useOverlayLayer } from '../../lib/overlayStack';

export type InlinePopoverPlacement = 'bottom-start' | 'bottom-end' | 'right' | 'top-start' | 'top-end';

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
  /** Minimum z-index (default 9500); raised above the trigger's containing layers. */
  zIndex?: number;
  /** Optional testid for the panel. Default 'inline-popover'. */
  'data-testid'?: string;
  /**
   * Accessible name for the `role="dialog"` panel. A dialog with no name
   * announces as a bare "dialog", so callers that don't render their own
   * labelled surface inside should pass one.
   */
  'aria-label'?: string;
  /** Id of an element inside the panel that names it. */
  'aria-labelledby'?: string;
  /**
   * What this popover is, emitted as `data-ui-dialog` (default `popover`).
   * Name a purpose an audit should recognise, e.g. `command-help` for a
   * composer's supported-commands help. Since 2.442.0.
   */
  kind?: string;
  /**
   * Keep clear of every keep-out surface (`[data-uic-keepout]`, e.g. a pinned
   * composer dock and the question panel above it) that does not contain the
   * trigger, whichever side of the trigger it is on (since 2.517.0). A panel
   * that would cover one moves beside it (left, then right) or above it,
   * whichever fits first; with no room anywhere it stays where it was. The
   * voice dock's cards use this so a confirmation never covers the panel it
   * answers. Default false: only the keep-out below the trigger counts.
   */
  avoidKeepouts?: boolean;
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

/** The width a right-hand flyout needs before it flips to the left. */
const FLYOUT_MIN_WIDTH = 240;

function computePosition(
  anchor: DOMRect,
  placement: InlinePopoverPlacement,
  offset: number,
): CSSProperties {
  if (placement === 'right') {
    // A flyout from a menu at the window's right edge opens to the LEFT
    // rather than over its own menu (2.390.5).
    const room = typeof window !== 'undefined' ? window.innerWidth - anchor.right - offset : Infinity;
    if (room < FLYOUT_MIN_WIDTH && anchor.left > FLYOUT_MIN_WIDTH) {
      return { position: 'fixed', top: anchor.top, left: anchor.left - offset, transform: 'translateX(-100%)' };
    }
    return {
      position: 'fixed',
      top: anchor.top,
      left: anchor.right + offset,
    };
  }
  if (placement === 'top-start' || placement === 'top-end') {
    // The panel's bottom edge `offset` above the trigger; the correction pass
    // replaces the transform with explicit coordinates when it has to move it.
    return {
      position: 'fixed',
      top: anchor.top - offset,
      left: placement === 'top-end' ? anchor.right : anchor.left,
      transform: placement === 'top-end' ? 'translate(-100%, -100%)' : 'translateY(-100%)',
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

/**
 * The attribute a pinned surface — a composer dock at the foot of an editor —
 * puts on itself so popovers never cover it. A popover anchored ABOVE such a
 * surface treats its top edge as the bottom of the screen: it flips up, or
 * slides up, rather than opening over it. A popover opened from INSIDE it
 * (its own menus) is unaffected.
 */
export const POPOVER_KEEPOUT_ATTR = 'data-uic-keepout';

/** The lowest y a popover anchored at `anchor` may reach: the viewport, or a keep-out surface below the anchor. */
export function popoverFloor(anchor: DOMRect | null, viewportHeight: number, doc: Document = document): number {
  let floor = viewportHeight;
  if (!anchor) return floor;
  doc.querySelectorAll<HTMLElement>(`[${POPOVER_KEEPOUT_ATTR}="bottom"]`).forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.height === 0 && r.width === 0) return;
    if (r.top >= anchor.bottom && r.top < floor) floor = r.top;
  });
  return floor;
}

/**
 * The attribute a bounded surface — a conversation pane beside a page, a side
 * panel — puts on itself so a popover opened from INSIDE it stays inside it
 * horizontally (since 2.434.0). Without it a `bottom-end` menu from a control
 * near the pane's left edge hung its panel left over the page beside the pane
 * (the folded "More ▾" of a narrow pane's tab bar covered the content column).
 * The nearest such ancestor of the trigger wins; the viewport still applies.
 */
export const POPOVER_BOUNDARY_ATTR = 'data-uic-popover-boundary';

/** The horizontal span a popover anchored at `trigger` must stay within: its nearest boundary ancestor, else the viewport. */
export function popoverBounds(trigger: HTMLElement | null, viewportWidth: number): { left: number; right: number } {
  const host = trigger?.closest<HTMLElement>(`[${POPOVER_BOUNDARY_ATTR}]`) ?? null;
  if (!host) return { left: 0, right: viewportWidth };
  const r = host.getBoundingClientRect();
  if (r.width === 0) return { left: 0, right: viewportWidth };
  return { left: Math.max(0, r.left), right: Math.min(viewportWidth, r.right) };
}

interface Box { top: number; left: number; width: number; height: number }

function overlaps(a: Box, b: DOMRect): boolean {
  return a.left < b.right && a.left + a.width > b.left && a.top < b.bottom && a.top + a.height > b.top;
}

/**
 * Where a panel at `box` should go so it covers none of `keepouts`: beside the
 * first one it covers (left, then right) or above it, whichever fits inside
 * `bounds` and clear of every keep-out; `null` when it covers none or nothing
 * fits. Exported for tests. Since 2.517.0.
 */
export function avoidKeepoutBoxes(
  box: Box,
  keepouts: DOMRect[],
  bounds: { left: number; right: number; top: number; bottom: number },
  margin = 8,
): { top: number; left: number } | null {
  const hit = keepouts.find((k) => overlaps(box, k));
  if (!hit) return null;
  const clear = (b: Box) =>
    b.left >= bounds.left && b.left + b.width <= bounds.right && b.top >= bounds.top && b.top + b.height <= bounds.bottom
    && !keepouts.some((k) => overlaps(b, k));
  const options: Box[] = [
    { ...box, left: hit.left - margin - box.width },
    { ...box, left: hit.right + margin },
    { ...box, top: hit.top - margin - box.height },
  ];
  const fit = options.find(clear);
  return fit ? { top: fit.top, left: fit.left } : null;
}

// Open order of popover panels. A submenu is portalled on its own, so to its
// parent it looks like "outside": a mousedown on a submenu row closed the
// parent, which unmounted the submenu before the click landed, and the row's
// action never ran. A panel opened LATER is treated as inside.
let popoverSeq = 0;

export function InlinePopover({
  trigger,
  open,
  onClose,
  placement = 'bottom-start',
  offset = 6,
  className,
  zIndex = 9500,
  'data-testid': testId = 'inline-popover',
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  kind = 'popover',
  avoidKeepouts = false,
  children,
}: InlinePopoverProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState<CSSProperties | null>(null);
  const [layerZ, setLayerZ] = useState(zIndex);
  const clampedRef = useRef(false);
  // The rect the current position was derived from. The correction pass below
  // measures the PANEL, which is enough to slide it back on screen and not
  // enough to decide it belongs on the other side of its trigger.
  const anchorRectRef = useRef<DOMRect | null>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const closedByEscapeRef = useRef(false);
  // Escape/Tab belong to the top layer only. See lib/overlayStack.ts for why
  // the `e.stopPropagation()` below cannot achieve this on its own.
  const isTopLayer = useOverlayLayer(open);
  const seqRef = useRef(0);
  if (open && seqRef.current === 0) seqRef.current = ++popoverSeq;
  if (!open && seqRef.current !== 0) seqRef.current = 0;

  // Recompute anchored position whenever the popover opens, or when
  // the viewport scrolls / resizes while it's open.
  const recompute = useCallback(() => {
    const el = trigger.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    // Portalling removes the trigger's stacking context. A menu opened in a
    // modal (or another menu) must still paint above that containing layer.
    let nextZ = zIndex;
    for (let ancestor: HTMLElement | null = el; ancestor; ancestor = ancestor.parentElement) {
      const value = Number.parseInt(window.getComputedStyle(ancestor).zIndex, 10);
      if (Number.isFinite(value)) nextZ = Math.max(nextZ, value + 1);
    }
    setLayerZ(nextZ);
    clampedRef.current = false;
    anchorRectRef.current = rect;
    setPosition(computePosition(rect, placement, offset));
  }, [trigger, placement, offset, zIndex]);

  useLayoutEffect(() => {
    if (!open) {
      setPosition(null);
      return;
    }
    recompute();
  }, [open, recompute]);

  // Second pass, once the panel has a measured size: keep it on screen. A
  // 380px form hanging off a team row near the bottom of a rail would
  // otherwise run past the fold with its buttons below it. Corrections are
  // written as explicit top/left, which also retires the bottom-end
  // transform — the measured rect already includes it.
  useLayoutEffect(() => {
    if (!open || !position) return;
    // One correction per anchor-derived position, or the correction's own
    // re-render would measure and correct again forever.
    if (clampedRef.current) return;
    clampedRef.current = true;
    const panel = panelRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) return;
    const margin = 8;
    const anchorRect = anchorRectRef.current;
    const floor = popoverFloor(anchorRect, window.innerHeight);
    const maxH = floor - margin * 2;
    let top = r.top;
    let left = r.left;
    let changed = false;
    const anchor = anchorRectRef.current;
    // FLIP before sliding. A panel opened from a control near the foot of the
    // screen has no room below it, and sliding it up until it fits lands it ON
    // TOP of the trigger — the composer's "Share a document" button opened a
    // panel over the composer. Putting it on the other side of the anchor is
    // what a reader expects and what every popover library does; sliding is
    // the fallback for when neither side has room.
    const flipped =
      !placement.startsWith('bottom') || !anchor
        ? false
        : r.bottom > floor - margin
          && anchor.top - offset - r.height >= margin;
    if (flipped) {
      top = anchor!.top - offset - r.height;
      changed = true;
    } else if (r.height > maxH) {
      top = margin;
      changed = true;
    } else if (r.bottom > floor - margin) {
      top = floor - margin - r.height;
      changed = true;
    }
    if (top < margin) {
      top = margin;
      changed = true;
    }
    // Horizontally inside the trigger's boundary (a pane), else the viewport;
    // a panel wider than the boundary keeps its left edge in it.
    const bounds = popoverBounds(trigger.current, window.innerWidth);
    const minLeft = bounds.left + margin;
    const maxRight = bounds.right - margin;
    if (r.right > maxRight) {
      left = Math.max(minLeft, maxRight - r.width);
      changed = true;
    }
    if (left < minLeft) {
      left = minLeft;
      changed = true;
    }
    if (avoidKeepouts) {
      const keepouts: DOMRect[] = [];
      document.querySelectorAll<HTMLElement>('[data-uic-keepout]').forEach((el) => {
        if (trigger.current && el.contains(trigger.current)) return;
        if (panel.contains(el)) return;
        const k = el.getBoundingClientRect();
        if (k.width > 0 && k.height > 0) keepouts.push(k);
      });
      const moved = avoidKeepoutBoxes(
        { top, left, width: r.width, height: r.height },
        keepouts,
        { left: minLeft, right: maxRight, top: margin, bottom: window.innerHeight - margin },
        margin,
      );
      if (moved) {
        top = moved.top;
        left = moved.left;
        changed = true;
      }
    }
    if (!changed) return;
    setPosition({ position: 'fixed', top, left, maxHeight: maxH, overflowY: 'auto' });
  }, [open, position, avoidKeepouts]);

  // The correction above runs once per anchor-derived position, so a panel
  // whose content grows AFTER it was placed (a live feed filling in, a tab
  // switch, an async list) kept its old top and ran off the screen — up past
  // the window's top for a panel flipped above a footer trigger. Re-anchor
  // when the panel's size changes and it no longer fits the viewport (since
  // 2.446.1). The corrected position always fits, so this cannot loop.
  useEffect(() => {
    if (!open || !position || typeof ResizeObserver === 'undefined') return;
    const panel = panelRef.current;
    if (!panel) return;
    const observer = new ResizeObserver(() => {
      const r = panel.getBoundingClientRect();
      if (r.width === 0 && r.height === 0) return;
      if (r.top < 0 || r.bottom > window.innerHeight) recompute();
    });
    observer.observe(panel);
    return () => observer.disconnect();
  }, [open, position, recompute]);

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
    closedByEscapeRef.current = false;
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
      // Back to what had focus when the panel opened (a keyboard opener such
      // as a focused row keeps it). When that was nothing — <body>, because a
      // pointer press did not focus its button (Safari, synthetic clicks) —
      // or it has left the document, an Escape returns focus to the trigger
      // instead of dropping the reader at the top of the page (2.441.8).
      // Other dismissals (hover-out, outside click) keep the old rule, so a
      // hover card never pulls focus onto its trigger and reopens.
      const prev = previouslyFocusedRef.current;
      const anchor = trigger.current;
      const prevUsable = !!prev && prev !== document.body && document.contains(prev);
      const escaped = closedByEscapeRef.current;
      closedByEscapeRef.current = false;
      const target = prevUsable ? prev : escaped && anchor && document.contains(anchor) ? anchor : null;
      if (target && typeof target.focus === 'function' && document.contains(target)) {
        target.focus();
      }
      previouslyFocusedRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // ESC + focus trap.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (!isTopLayer()) return;
        e.stopPropagation();
        closedByEscapeRef.current = true;
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      if (!isTopLayer()) return;
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
  }, [open, onClose, isTopLayer]);

  // Outside-click dismiss. The trigger itself is excluded so the parent
  // can implement a "click trigger to toggle" pattern without flicker.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      const target = e.target as Node | null;
      if (!target) return;
      if (panelRef.current?.contains(target)) return;
      if (trigger.current?.contains(target)) return;
      const other = (target as Element).closest?.('[data-uic-popover-seq]');
      if (other && Number(other.getAttribute('data-uic-popover-seq')) > seqRef.current) return;
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
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      data-testid={testId}
      data-placement={placement}
      data-ui-dialog={kind}
      data-uic-popover-seq={seqRef.current || undefined}
      className={cn(
        // `bg-surface`, NOT `bg-white`. This panel is PORTALLED to
        // document.body and its text is `text-text-primary`, which flips to
        // near-white under [data-theme="dark"]. A literal white background
        // does not flip, so the whole menu became #f1f5f9-on-#ffffff —
        // 1.10:1, invisible. `--color-surface` is #ffffff in light, so
        // adopting the token is a no-op there and a fix in dark.
        'min-w-[160px] rounded-lg border border-border bg-surface',
        'shadow-lg p-1 text-sm text-text-primary',
        className,
      )}
      style={{ ...position, zIndex: layerZ }}
    >
      {children}
    </div>,
    document.body,
  );
}

export default InlinePopover;

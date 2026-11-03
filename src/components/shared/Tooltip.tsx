// Tooltip — hover/focus label for an icon-only control or a truncated value.
//
// `InlinePopover` exists but is click-driven with a focus trap and outside-
// click dismissal, built for menus and cards with interactive content inside.
// A tooltip is read-only text that must never steal focus or capture Tab, so
// it gets its own minimal implementation rather than bending InlinePopover to
// a shape it isn't for.
//
// Same open/close delay discipline as PersonHoverCard: opening waits out a
// passing pointer (~350ms), closing waits long enough to be dismissable but
// short enough that a tooltip never lingers once you've moved on. Focus opens
// it immediately (keyboard users get no "hover", so there is no transit to
// protect) and Escape closes it while focused.

import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../lib/cn';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  content: ReactNode;
  children: ReactElement;
  placement?: TooltipPlacement;
  /** ms before hover opens the tooltip. Default 350. */
  openDelay?: number;
  /** ms before leaving closes it. Default 100. */
  closeDelay?: number;
  disabled?: boolean;
  className?: string;
  'data-testid'?: string;
}

function computePosition(anchor: DOMRect, tip: DOMRect, placement: TooltipPlacement): CSSProperties {
  const gap = 6, inset = 8, width = tip.width, height = tip.height;
  let left = anchor.left + (anchor.width - width) / 2;
  let top = placement === 'top' ? anchor.top - height - gap : anchor.bottom + gap;
  if (placement === 'left' || placement === 'right') {
    left = placement === 'left' ? anchor.left - width - gap : anchor.right + gap;
    top = anchor.top + (anchor.height - height) / 2;
    if (left < inset && anchor.right + gap + width <= window.innerWidth - inset) left = anchor.right + gap;
    else if (left + width > window.innerWidth - inset && anchor.left - width - gap >= inset) left = anchor.left - width - gap;
  } else {
    if (top < inset && anchor.bottom + gap + height <= window.innerHeight - inset) top = anchor.bottom + gap;
    else if (top + height > window.innerHeight - inset && anchor.top - height - gap >= inset) top = anchor.top - height - gap;
  }
  return { position: 'fixed', left: Math.max(inset, Math.min(left, window.innerWidth - width - inset)), top: Math.max(inset, Math.min(top, window.innerHeight - height - inset)) };
}

export function Tooltip({
  content,
  children,
  placement = 'top',
  openDelay = 350,
  closeDelay = 100,
  disabled = false,
  className,
  'data-testid': testId = 'tooltip',
}: TooltipProps) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<CSSProperties | null>(null);
  const triggerRef = useRef<HTMLSpanElement | null>(null);
  const tipRef = useRef<HTMLDivElement | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tooltipId = useId();

  const clear = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  }, []);

  useEffect(() => clear, [clear]);

  const recompute = useCallback(() => {
    const el = triggerRef.current;
    if (!el || !tipRef.current) return;
    setPosition(computePosition(el.getBoundingClientRect(), tipRef.current.getBoundingClientRect(), placement));
  }, [placement]);

  useLayoutEffect(() => {
    if (!open) { setPosition(null); return; }
    recompute();
    window.addEventListener('resize', recompute);
    window.addEventListener('scroll', recompute, true);
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(recompute);
    if (tipRef.current) observer?.observe(tipRef.current);
    return () => { window.removeEventListener('resize', recompute); window.removeEventListener('scroll', recompute, true); observer?.disconnect(); };
  }, [open, recompute, content]);

  const scheduleOpen = useCallback(() => {
    if (disabled) return;
    clear();
    timer.current = setTimeout(() => setOpen(true), openDelay);
  }, [clear, disabled, openDelay]);

  const scheduleClose = useCallback(() => {
    clear();
    timer.current = setTimeout(() => setOpen(false), closeDelay);
  }, [clear, closeDelay]);

  const closeNow = useCallback(() => {
    clear();
    setOpen(false);
  }, [clear]);

  return (
    <>
      <span
        ref={triggerRef}
        className="inline-flex"
        onMouseEnter={scheduleOpen}
        onMouseLeave={scheduleClose}
        onFocus={(event) => {
          // React portal focus bubbles through its trigger even though the
          // menu is outside this span. Do not reopen the trigger's tooltip.
          if (disabled || !event.currentTarget.contains(event.target)) return;
          clear();
          setOpen(true);
        }}
        onBlur={closeNow}
        onClickCapture={closeNow}
        onKeyDownCapture={(event) => {
          if (['Escape', 'Enter', ' '].includes(event.key)) closeNow();
        }}
        aria-describedby={open ? tooltipId : undefined}
      >
        {children}
      </span>

      {open &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            ref={tipRef}
            role="tooltip"
            id={tooltipId}
            data-testid={testId}
            className={cn(
              'pointer-events-none z-[9500] w-max max-w-[min(20rem,calc(100vw-16px))] break-words rounded-md border border-border bg-surface px-2 py-1 text-xs text-text-primary shadow-lg',
              className,
            )}
            // Position only — placement is measured from the trigger's
            // getBoundingClientRect at open time and cannot be a class. The
            // stacking order was a static literal and is now `z-[9500]`.
            style={position || { position: 'fixed', visibility: 'hidden' }}
          >
            {content}
          </div>,
          document.body,
        )}
    </>
  );
}

export default Tooltip;

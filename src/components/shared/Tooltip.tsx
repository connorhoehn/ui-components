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

function computePosition(anchor: DOMRect, placement: TooltipPlacement, offset: number): CSSProperties {
  switch (placement) {
    case 'top':
      return { position: 'fixed', bottom: window.innerHeight - anchor.top + offset, left: anchor.left + anchor.width / 2, transform: 'translateX(-50%)' };
    case 'left':
      return { position: 'fixed', top: anchor.top + anchor.height / 2, right: window.innerWidth - anchor.left + offset, transform: 'translateY(-50%)' };
    case 'right':
      return { position: 'fixed', top: anchor.top + anchor.height / 2, left: anchor.right + offset, transform: 'translateY(-50%)' };
    case 'bottom':
    default:
      return { position: 'fixed', top: anchor.bottom + offset, left: anchor.left + anchor.width / 2, transform: 'translateX(-50%)' };
  }
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
    if (!el) return;
    setPosition(computePosition(el.getBoundingClientRect(), placement, 6));
  }, [placement]);

  useLayoutEffect(() => {
    if (open) recompute();
    else setPosition(null);
  }, [open, recompute]);

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
        position &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            role="tooltip"
            id={tooltipId}
            data-testid={testId}
            className={cn(
              'pointer-events-none z-[9500] max-w-xs rounded-md border border-border bg-surface px-2 py-1 text-xs text-text-primary shadow-lg',
              className,
            )}
            // Position only — placement is measured from the trigger's
            // getBoundingClientRect at open time and cannot be a class. The
            // stacking order was a static literal and is now `z-[9500]`.
            style={position}
          >
            {content}
          </div>,
          document.body,
        )}
    </>
  );
}

export default Tooltip;

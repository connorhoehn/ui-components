// HoverCard (2.437.0) — an anchored, non-modal, non-trapping card for any
// subject: a person, an initiative's facts, a header's description.
//
// The rules (one timing for the whole library):
// - Hover opens it after `HOVER_CARD_OPEN_MS` (300); leaving the trigger or
//   the card closes it after `HOVER_CARD_CLOSE_MS` (250), long enough to
//   cross into the card.
// - Keyboard focus opens it too (`openOnFocus`, default true), so the
//   content is reachable without a pointer; blur closes it.
// - Enter or Space on the trigger pins it (`pinOnKey`, default true) until
//   the same key, Escape or a click outside. A host whose trigger already
//   acts on click (opens a pane) keeps its own `onClick`.
// - It NEVER takes focus and never traps Tab: the trigger keeps focus for the
//   card's whole life, Tab moves on past it, and Escape closes it leaving
//   focus where it was. (`InlinePopover` moves focus into its panel — right
//   for a form, wrong for a card you glance at.)
//
// The trigger is a render prop so any control can carry it:
//   <HoverCard label="Observability details" content={…}>
//     {(trigger) => <IconButton aria-label="Initiative details" {...trigger} />}
//   </HoverCard>
import {
  useCallback, useEffect, useId, useLayoutEffect, useRef, useState,
  type FocusEvent, type KeyboardEvent, type MouseEvent, type ReactNode, type RefCallback,
} from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../lib/cn';

export const HOVER_CARD_OPEN_MS = 300;
export const HOVER_CARD_CLOSE_MS = 250;

export type HoverCardWidth = 'sm' | 'md' | 'lg' | 'xl';
const WIDTH: Record<HoverCardWidth, string> = { sm: 'w-64', md: 'w-72', lg: 'w-80', xl: 'w-[32rem] max-w-[calc(100vw-16px)]' };

export interface HoverCardTriggerProps {
  ref: RefCallback<HTMLElement>;
  onMouseEnter: (e: MouseEvent<HTMLElement>) => void;
  onMouseLeave: (e: MouseEvent<HTMLElement>) => void;
  onFocus: (e: FocusEvent<HTMLElement>) => void;
  onBlur: (e: FocusEvent<HTMLElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLElement>) => void;
  'aria-expanded': boolean;
  'aria-controls': string | undefined;
  'aria-describedby': string | undefined;
}

export interface HoverCardProps {
  /** The card's accessible name. */
  label: string;
  /** What the card shows. Rendered only while open. */
  content: ReactNode;
  children: (trigger: HoverCardTriggerProps) => ReactNode;
  width?: HoverCardWidth;
  /** Open on keyboard focus. Default true. */
  openOnFocus?: boolean;
  /** Enter/Space on the trigger pins the card. Default true. */
  pinOnKey?: boolean;
  /** Told whenever the card opens or closes (lazy-load its content). */
  onOpenChange?: (open: boolean) => void;
  className?: string;
  'data-testid'?: string;
}

export function HoverCard({
  label, content, children, width = 'md', openOnFocus = true, pinOnKey = true, onOpenChange, className,
  'data-testid': testId = 'hover-card',
}: HoverCardProps) {
  const [hoverOpen, setHoverOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  const open = hoverOpen || pinned;
  const anchor = useRef<HTMLElement | null>(null);
  const panel = useRef<HTMLDivElement | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const id = useId();

  const clear = useCallback(() => { if (timer.current) { clearTimeout(timer.current); timer.current = null; } }, []);
  const later = useCallback((next: boolean, ms: number) => {
    clear();
    timer.current = setTimeout(() => { timer.current = null; setHoverOpen(next); }, ms);
  }, [clear]);
  useEffect(() => clear, [clear]);

  const changed = useRef(onOpenChange);
  changed.current = onOpenChange;
  const was = useRef(false);
  useEffect(() => {
    if (was.current !== open) { was.current = open; changed.current?.(open); }
  }, [open]);

  const dismiss = useCallback(() => { clear(); setHoverOpen(false); setPinned(false); }, [clear]);

  // Escape and a click outside close a pinned card; focus is never moved.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e: globalThis.KeyboardEvent) => { if (e.key === 'Escape') dismiss(); };
    const onDown = (e: globalThis.MouseEvent) => {
      const t = e.target as Node | null;
      if (t && (anchor.current?.contains(t) || panel.current?.contains(t))) return;
      dismiss();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDown);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('mousedown', onDown); };
  }, [open, dismiss]);

  // Placed before paint under the trigger, inside the viewport.
  useLayoutEffect(() => {
    if (!open) return;
    const a = anchor.current, p = panel.current;
    if (!a || !p) return;
    const r = a.getBoundingClientRect();
    const w = p.offsetWidth || 0;
    const left = Math.max(8, Math.min(r.left, window.innerWidth - w - 8));
    p.style.position = 'fixed';
    p.style.top = `${r.bottom + 6}px`;
    p.style.left = `${left}px`;
    p.style.zIndex = '9500';
  }, [open]);

  const trigger: HoverCardTriggerProps = {
    ref: (node) => { anchor.current = node; },
    onMouseEnter: () => later(true, HOVER_CARD_OPEN_MS),
    onMouseLeave: () => later(false, HOVER_CARD_CLOSE_MS),
    onFocus: () => { if (openOnFocus) { clear(); setHoverOpen(true); } },
    onBlur: () => { if (openOnFocus) later(false, HOVER_CARD_CLOSE_MS); },
    onKeyDown: (e) => {
      if (e.key === 'Escape' && open) { e.stopPropagation(); dismiss(); return; }
      if (pinOnKey && (e.key === 'Enter' || e.key === ' ')) { clear(); setPinned((v) => !v); }
    },
    'aria-expanded': open,
    'aria-controls': open ? id : undefined,
    'aria-describedby': open ? id : undefined,
  };

  return (
    <>
      {children(trigger)}
      {open && typeof document !== 'undefined' && createPortal(
        <div
          ref={panel}
          id={id}
          role="dialog"
          aria-modal="false"
          aria-label={label}
          data-testid={testId}
          data-pinned={pinned ? 'true' : 'false'}
          onMouseEnter={clear}
          onMouseLeave={() => { if (!pinned) later(false, HOVER_CARD_CLOSE_MS); }}
          className={cn('rounded-lg border border-border bg-surface p-3 shadow-lg', WIDTH[width], className)}
        >
          {content}
        </div>,
        document.body,
      )}
    </>
  );
}

export default HoverCard;

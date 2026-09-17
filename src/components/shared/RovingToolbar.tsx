// RovingToolbar — a group of related controls that costs ONE tab stop.
//
// ## The problem it exists for
//
// A row of icon buttons is the most natural thing in the world to build and
// one of the easiest to make unusable. Every button is focusable, so every
// button is a tab stop, so a bar of eleven format controls sits between the
// reader and whatever comes after it. Measured on this product's own chat
// composer: 14 stops between entering the composer and leaving it, 11 of them
// Bold/Italic/Quote and friends. The message action bar had the same shape at
// 8 stops PER MESSAGE.
//
// Removing the buttons from the tab order fixes the count and breaks the
// keyboard. The WAI-ARIA toolbar pattern is the answer to exactly this: the
// group is one stop, and the arrow keys move within it.
//
// ## Why it reads the DOM instead of taking a list of items
//
// Toolbars here have conditional children (Emoji only when `allowEmoji`),
// wrapper spans holding popovers, separators, and buttons that disable
// themselves. A descriptor API would force every caller to flatten all of
// that. Reading the rendered buttons keeps callers writing ordinary JSX.
//
// The index is derived from `document.activeElement` on each keypress rather
// than held in state, so a HELD arrow key cannot outrun a re-render — two
// keydowns in one tick both read the true current element.

import { useCallback, useEffect, useRef, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface RovingToolbarProps {
  /** Accessible name — a toolbar without one is an unlabelled group. */
  label: string;
  children: ReactNode;
  /** Arrow keys that move. Vertical leaves Left/Right alone, and vice versa. */
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  'data-testid'?: string;
}

export function RovingToolbar({
  label,
  children,
  orientation = 'horizontal',
  className,
  'data-testid': testId,
}: RovingToolbarProps) {
  const ref = useRef<HTMLDivElement>(null);
  /** Which control holds the tab stop while focus is elsewhere on the page. */
  const activeRef = useRef(0);

  const items = useCallback((): HTMLButtonElement[] => {
    const root = ref.current;
    if (!root) return [];
    return Array.from(root.querySelectorAll<HTMLButtonElement>('button')).filter(
      (b) => !b.disabled && b.getAttribute('aria-hidden') !== 'true',
    );
  }, []);

  const apply = useCallback((index: number) => {
    const els = items();
    if (els.length === 0) return;
    const next = ((index % els.length) + els.length) % els.length;
    activeRef.current = next;
    els.forEach((el, i) => { el.tabIndex = i === next ? 0 : -1; });
    return els[next];
  }, [items]);

  // Runs on every render: controls appear and disappear (a disabled Send, an
  // Emoji button behind a flag), and the tab stop must never be left on an
  // index that no longer exists — that would drop the whole bar out of the
  // tab order rather than merely moving the stop.
  useEffect(() => {
    const els = items();
    if (els.length === 0) return;
    apply(Math.min(activeRef.current, els.length - 1));
  });

  const prevKey = orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp';
  const nextKey = orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown';

  return (
    <div
      ref={ref}
      role="toolbar"
      aria-label={label}
      aria-orientation={orientation}
      data-testid={testId}
      onFocus={(event) => {
        // Tabbing or clicking into a control makes it the stop, so coming back
        // returns you where you were instead of to the start.
        const i = items().indexOf(event.target as unknown as HTMLButtonElement);
        if (i >= 0) apply(i);
      }}
      onKeyDown={(event) => {
        const els = items();
        if (els.length === 0) return;
        // From the REAL focused element, never from state — a held arrow key
        // fires faster than React re-renders.
        const here = els.indexOf(document.activeElement as HTMLButtonElement);
        const from = here >= 0 ? here : activeRef.current;
        let to: number | null = null;
        if (event.key === nextKey) to = from + 1;
        else if (event.key === prevKey) to = from - 1;
        else if (event.key === 'Home') to = 0;
        else if (event.key === 'End') to = els.length - 1;
        if (to === null) return;
        event.preventDefault();
        apply(to)?.focus();
      }}
      className={cn('flex items-center', className)}
    >
      {children}
    </div>
  );
}

export default RovingToolbar;

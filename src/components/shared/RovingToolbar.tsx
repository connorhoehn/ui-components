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
import type React from 'react';
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

/**
 * The behaviour on its own, for an element that already exists.
 *
 * `DocumentToolbar` is the case this is for: it had `role="toolbar"` and its
 * own classes, density attribute and layout long before it had the keyboard
 * contract — it was PROMISING the pattern to screen readers (22 tab stops,
 * arrow keys inert) rather than implementing it. Spreading this onto that div
 * adds the behaviour without a wrapper element and without teaching the
 * component about someone else's class names.
 *
 * Returns `ref`, `onKeyDown` and `onFocus` to spread. You still supply
 * `role="toolbar"` and a name.
 */
export function useRovingToolbar(
  { orientation = 'horizontal' }: { orientation?: 'horizontal' | 'vertical' } = {},
) {
  const ref = useRef<HTMLDivElement>(null);
  /** Which control holds the tab stop while focus is elsewhere on the page. */
  const activeRef = useRef(0);

  const items = useCallback((): HTMLButtonElement[] => {
    const root = ref.current;
    if (!root) return [];
    return Array.from(root.querySelectorAll<HTMLButtonElement>('button')).filter(
      (b) =>
        !b.disabled &&
        b.getAttribute('aria-hidden') !== 'true' &&
        // NOT the contents of a nested widget. An open menu or listbox often
        // renders inside the toolbar it belongs to, and its items are buttons
        // too — collecting them made the bar treat a menu's own rows as its
        // controls, so Home/End moved toolbar focus and closed the menu
        // mid-keystroke. DocumentToolbar's alignment menu caught this.
        !b.closest('[role="menu"],[role="listbox"],[role="dialog"],[role="menubar"],[role="grid"]'),
    );
  }, []);

  const apply = useCallback((index: number) => {
    const els = items();
    if (els.length === 0) return undefined;
    const next = ((index % els.length) + els.length) % els.length;
    activeRef.current = next;
    els.forEach((el, i) => { el.tabIndex = i === next ? 0 : -1; });
    return els[next];
  }, [items]);

  // Runs on every render: controls appear and disappear, and the tab stop must
  // never be left on an index that no longer exists — that would drop the
  // whole bar out of the tab order rather than merely moving the stop.
  useEffect(() => {
    const els = items();
    if (els.length === 0) return;
    apply(Math.min(activeRef.current, els.length - 1));
  });

  const prevKey = orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp';
  const nextKey = orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown';

  return {
    ref,
    'aria-orientation': orientation,
    onFocus: (event: React.FocusEvent) => {
      // Tabbing or clicking into a control makes it the stop, so coming back
      // returns you where you were instead of to the start.
      const i = items().indexOf(event.target as unknown as HTMLButtonElement);
      if (i >= 0) apply(i);
    },
    onKeyDown: (event: React.KeyboardEvent) => {
      const els = items();
      if (els.length === 0) return;
      // Act ONLY when focus is on one of our own controls.
      //
      // Anything else focused inside the bar is a nested widget that owns
      // these keys: a native select stepping its value, or an open menu whose
      // Home/End jump within the menu. Falling back to the stored index here
      // meant the toolbar swallowed those keys and moved along the bar
      // instead — it broke DocumentToolbar's alignment menu the moment this
      // hook was attached to it.
      const from = els.indexOf(document.activeElement as HTMLButtonElement);
      if (from < 0) return;
      let to: number | null = null;
      if (event.key === nextKey) to = from + 1;
      else if (event.key === prevKey) to = from - 1;
      else if (event.key === 'Home') to = 0;
      else if (event.key === 'End') to = els.length - 1;
      if (to === null) return;
      event.preventDefault();
      apply(to)?.focus();
    },
  };
}

export function RovingToolbar({
  label,
  children,
  orientation = 'horizontal',
  className,
  'data-testid': testId,
}: RovingToolbarProps) {
  const roving = useRovingToolbar({ orientation });
  return (
    <div
      {...roving}
      role="toolbar"
      aria-label={label}
      data-testid={testId}
      className={cn('flex items-center', className)}
    >
      {children}
    </div>
  );
}

export default RovingToolbar;

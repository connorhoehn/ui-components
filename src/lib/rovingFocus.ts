// src/lib/rovingFocus.ts
//
// Arrow-key focus movement for composite widgets (tablist, radiogroup,
// menu, toolbar…). A role like `tab` or `radio` PROMISES arrow keys to a
// screen-reader user — several hand-rolled tab bars in this library set the
// role and stop there, so the promise was broken. This is the shared
// implementation those call sites use.
//
// Manual-activation semantics: arrows move focus only. The focused item is
// then activated with Enter/Space by the browser's native button handling,
// which is a valid WAI-ARIA pattern and avoids changing what a click does.
//
// Internal helper — not exported from any public barrel.

import type { KeyboardEvent as ReactKeyboardEvent } from 'react';

export interface RovingFocusOptions {
  /** Selector for the items that participate. Default `[role="tab"]`. */
  itemSelector?: string;
  /**
   * Layout orientation. 'horizontal' (default) responds to Left/Right,
   * 'vertical' to Up/Down, 'both' to all four. Home/End always apply.
   */
  orientation?: 'horizontal' | 'vertical' | 'both';
}

const HORIZONTAL_KEYS = new Set(['ArrowLeft', 'ArrowRight']);
const VERTICAL_KEYS = new Set(['ArrowUp', 'ArrowDown']);
const BOUNDARY_KEYS = new Set(['Home', 'End']);

/**
 * Move focus between sibling items of a composite widget.
 *
 * Call from the container's `onKeyDown`; the container is taken from
 * `e.currentTarget`. Wraps around at both ends and skips disabled items.
 * Returns true when focus moved (and the event was consumed).
 */
export function handleRovingKeyDown(
  e: ReactKeyboardEvent<HTMLElement>,
  options: RovingFocusOptions = {},
): boolean {
  const { itemSelector = '[role="tab"]', orientation = 'horizontal' } = options;

  const wantsHorizontal = orientation === 'horizontal' || orientation === 'both';
  const wantsVertical = orientation === 'vertical' || orientation === 'both';

  const isNav =
    (wantsHorizontal && HORIZONTAL_KEYS.has(e.key)) ||
    (wantsVertical && VERTICAL_KEYS.has(e.key)) ||
    BOUNDARY_KEYS.has(e.key);
  if (!isNav) return false;

  const container = e.currentTarget;
  const items = Array.from(container.querySelectorAll<HTMLElement>(itemSelector)).filter(
    (el) => !el.hasAttribute('disabled') && el.getAttribute('aria-disabled') !== 'true',
  );
  if (items.length === 0) return false;

  const active = (container.ownerDocument?.activeElement ?? null) as HTMLElement | null;
  const current = active ? items.indexOf(active) : -1;

  let next: number;
  if (e.key === 'Home') {
    next = 0;
  } else if (e.key === 'End') {
    next = items.length - 1;
  } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
    next = current < 0 ? 0 : (current + 1) % items.length;
  } else {
    next = current <= 0 ? items.length - 1 : current - 1;
  }

  e.preventDefault();
  items[next].focus();
  return true;
}

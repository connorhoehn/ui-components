// src/lib/activationKey.ts
//
// Keyboard activation for elements that carry `role="button"` (or any other
// role whose activation contract is "Enter or Space") but are not a real
// `<button>`.
//
// Prefer a real `<button type="button">`: it gets Enter *and* Space from the
// browser for free, and it cannot drift. Reach for this helper only when the
// markup genuinely cannot be a button — e.g. the element already sits inside
// another button, or it is a table row / list row that must stay a `<div>`.
//
// Two things go wrong when this is hand-rolled, and both were found in the
// wild in this repo:
//
//   1. Only `Enter` is handled. The ARIA button contract is Enter *and*
//      Space, so Space fell through to the browser and scrolled the page
//      instead of activating the control.
//   2. Space is handled but not `preventDefault()`ed, so the control fires
//      *and* the page scrolls underneath it.
//
// `'Spacebar'` is the legacy IE/Edge `key` value for Space; it costs nothing
// to accept and some assistive-tech bridges still emit it.

import type { KeyboardEvent } from 'react';

/** True for the keys that activate a `role="button"`: Enter and Space. */
export function isActivationKey(key: string): boolean {
  return key === 'Enter' || key === ' ' || key === 'Spacebar';
}

/**
 * Build an `onKeyDown` handler that runs `action` on Enter or Space and
 * suppresses the browser default (page scroll on Space, and for good measure
 * any implicit form submit on Enter).
 *
 * ```tsx
 * <div role="button" tabIndex={0} onClick={open} onKeyDown={onActivationKey(open)} />
 * ```
 */
export function onActivationKey<E extends KeyboardEvent<Element>>(
  action: (e: E) => void,
): (e: E) => void {
  return (e: E) => {
    if (!isActivationKey(e.key)) return;
    e.preventDefault();
    action(e);
  };
}

export default onActivationKey;

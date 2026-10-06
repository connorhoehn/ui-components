import { type RefObject } from 'react';
/**
 * Invoke `onClickOutside` when a mousedown occurs outside the ref element.
 * Useful for closing popovers, dropdowns, and modals on outside click.
 *
 * @param ref React ref to the element that should not trigger the callback.
 *   Accepts a nullable ref — under React 19's types `useRef<HTMLDivElement>(null)`
 *   yields `RefObject<HTMLDivElement | null>`, so the previous non-null
 *   `RefObject<T>` signature rejected every ref a component can actually
 *   create (including this hook's own example below). Widening is
 *   source-compatible for existing callers.
 * @param onClickOutside Callback invoked on outside click
 * @param enabled Enable/disable the listener (default: true)
 *
 * @example
 * const menuRef = useRef<HTMLDivElement>(null);
 * useClickOutside(menuRef, () => setMenuOpen(false), menuOpen);
 */
export declare function useClickOutside<T extends HTMLElement>(ref: RefObject<T | null>, onClickOutside: () => void, enabled?: boolean): void;
//# sourceMappingURL=useClickOutside.d.ts.map
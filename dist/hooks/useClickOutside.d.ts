import { type RefObject } from 'react';
/**
 * Invoke `onClickOutside` when a mousedown occurs outside the ref element.
 * Useful for closing popovers, dropdowns, and modals on outside click.
 *
 * @param ref React ref to the element that should not trigger the callback
 * @param onClickOutside Callback invoked on outside click
 * @param enabled Enable/disable the listener (default: true)
 *
 * @example
 * const menuRef = useRef<HTMLDivElement>(null);
 * useClickOutside(menuRef, () => setMenuOpen(false), menuOpen);
 */
export declare function useClickOutside<T extends HTMLElement>(ref: RefObject<T>, onClickOutside: () => void, enabled?: boolean): void;
//# sourceMappingURL=useClickOutside.d.ts.map
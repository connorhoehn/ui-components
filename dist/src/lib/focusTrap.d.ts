/**
 * CSS selector matching everything that can hold focus. Buttons, links with
 * `href`, form controls (when not disabled), `[tabindex]` (excluding -1), and
 * contenteditable elements all qualify per WAI-ARIA authoring practice.
 */
export declare const FOCUSABLE_SELECTOR: string;
/**
 * All focusable descendants of `root`, in DOM order.
 *
 * jsdom doesn't compute layout, so `offsetParent` is null even for visible
 * elements — visibility is approximated by inline `display`/`visibility` and
 * `aria-hidden`, which is what the Modal implementation has always done.
 */
export declare function getFocusableElements(root: HTMLElement): HTMLElement[];
/**
 * Handle a Tab / Shift+Tab keydown so focus cycles inside `container` instead
 * of escaping into the page behind the overlay.
 *
 * Returns true when the event was handled (and `preventDefault()` was called),
 * so callers can early-return. Non-Tab keys are ignored.
 */
export declare function trapTabKey(e: KeyboardEvent, container: HTMLElement | null): boolean;
/**
 * Move focus into an overlay on open: the `[data-autofocus]` element if the
 * caller marked one, else the first focusable child, else the container itself
 * (given `tabindex="-1"` so screen readers announce the dialog).
 */
export declare function focusInitialElement(container: HTMLElement | null): void;
/**
 * Restore focus to `element` if it is still in the document. Overlays that
 * skip this strand keyboard and screen-reader users on `<body>`, where the
 * next Tab restarts from the top of the page.
 */
export declare function restoreFocus(element: HTMLElement | null): void;
/**
 * The dismiss half of an overlay, for the many small anchored surfaces —
 * dropdown menus, filter popovers, icon pickers, error cards — that render a
 * panel over the page but are not full `Modal`s.
 *
 * Five of them had grown the same partial implementation independently, and
 * every one was missing a different piece: `UserMenu` closed on Escape but
 * dropped focus on `<body>`; `PipelineCard`'s and `RunsFilterBar`'s menus had
 * no Escape at all; `IconPicker` handled Escape only while focus sat in its
 * custom-emoji input; `ErrorOverlay` could only be dismissed by finding its
 * `×` with the mouse. This gives all of them the same two guarantees:
 *
 *  1. Escape closes the layer — but only when it is the TOP layer, so a menu
 *     inside a dialog doesn't take the dialog down with it (see overlayStack).
 *  2. When the layer closes, focus goes back to whatever had it when the
 *     layer opened, which for a click-to-open menu is the trigger. Without
 *     this, dismissing strands the user at the top of the document.
 *
 * This deliberately does NOT trap Tab. These are non-modal surfaces where
 * tabbing out is a legitimate way to leave; a trap would be wrong. Use
 * `trapTabKey` for anything that sets `aria-modal="true"`.
 */
export declare function useDismissableLayer(open: boolean, onClose: () => void): void;
//# sourceMappingURL=focusTrap.d.ts.map
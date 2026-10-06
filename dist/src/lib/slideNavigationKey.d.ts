export type SlideKeyIntent = 'previous' | 'next' | 'first' | 'last';
/** True when the event came from a control that uses arrow keys itself. */
export declare function isTextEntryTarget(target: EventTarget | null): boolean;
export interface SlideKeyEventLike {
    key: string;
    target: EventTarget | null;
    ctrlKey?: boolean;
    metaKey?: boolean;
    altKey?: boolean;
    shiftKey?: boolean;
}
/**
 * Which way the deck should move for this key press, or `null` to leave the
 * event alone. Modified presses are always `null`: ⌘← is "back" in a browser
 * and Alt+← is the same on Windows, and neither belongs to us.
 */
export declare function slideNavigationIntent(event: SlideKeyEventLike): SlideKeyIntent | null;
/**
 * The 1-based slide number an intent lands on, clamped to the deck. Returns
 * the current index unchanged when there is nowhere to go, so a caller can
 * skip a no-op state update.
 */
export declare function nextSlideIndex(intent: SlideKeyIntent, current: number, total: number): number;
//# sourceMappingURL=slideNavigationKey.d.ts.map
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
/**
 * Move focus between sibling items of a composite widget.
 *
 * Call from the container's `onKeyDown`; the container is taken from
 * `e.currentTarget`. Wraps around at both ends and skips disabled items.
 * Returns true when focus moved (and the event was consumed).
 */
export declare function handleRovingKeyDown(e: ReactKeyboardEvent<HTMLElement>, options?: RovingFocusOptions): boolean;
//# sourceMappingURL=rovingFocus.d.ts.map
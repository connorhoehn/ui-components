import { type ReactNode } from 'react';
import type React from 'react';
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
export declare function useRovingToolbar({ orientation }?: {
    orientation?: 'horizontal' | 'vertical';
}): {
    ref: React.RefObject<HTMLDivElement | null>;
    'aria-orientation': "horizontal" | "vertical";
    onFocus: (event: React.FocusEvent) => void;
    onKeyDown: (event: React.KeyboardEvent) => void;
};
export declare function RovingToolbar({ label, children, orientation, className, 'data-testid': testId, }: RovingToolbarProps): React.JSX.Element;
export default RovingToolbar;
//# sourceMappingURL=RovingToolbar.d.ts.map
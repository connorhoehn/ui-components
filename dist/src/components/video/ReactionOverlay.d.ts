import { type CSSProperties } from 'react';
/** Testid-safe name for a reaction emoji: 'heart', 'thumbs-up', … for the
 *  default set, hyphen-joined hex codepoints for anything else. Exported so
 *  consumers can build `reaction-option-${reactionEmojiName(e)}` selectors. */
export declare function reactionEmojiName(emoji: string): string;
export interface Reaction {
    id: string;
    emoji: string;
    userId?: string;
    displayName?: string;
}
export interface ReactionOverlayProps {
    reactions: Reaction[];
    /**
     * Positioning / sizing classes from the caller. Prefer this over `style`:
     * the overlay is `absolute inset-0` by default, and callers wanting to
     * scope it to a sub-region had no seam but an inline style (banned in
     * demos and stories). Composed through `cn()`, so a caller class wins.
     */
    className?: string;
    /** @deprecated Use `className`. Kept so existing callers keep compiling. */
    style?: CSSProperties;
}
export declare function ReactionOverlay({ reactions, className, style }: ReactionOverlayProps): import("react").JSX.Element;
export interface ReactionPickerProps {
    onReact: (emoji: string) => void;
    emojis?: string[];
    /**
     * Positioning / spacing classes from the caller. Prefer this over `style`:
     * the picker is usually floated over a call stage, which previously
     * required an inline style (banned in demos and stories). Composed
     * through `cn()`, so a caller class wins.
     */
    className?: string;
    /** @deprecated Use `className`. Kept so existing callers keep compiling. */
    style?: CSSProperties;
}
export declare function ReactionPicker({ onReact, emojis, className, style }: ReactionPickerProps): import("react").JSX.Element;
export interface ReactionPickerButtonProps {
    onReact: (emoji: string) => void;
    emojis?: string[];
    /** Close the popover after an emoji is picked. Default true. */
    closeOnReact?: boolean;
    /** Horizontal anchoring of the popover relative to the trigger. Default
     *  'center'. Use 'right' when the button sits near the widget's right
     *  edge (docked CallWidget) so the row doesn't overflow the clip rect. */
    align?: 'center' | 'left' | 'right';
    /** Dims the trigger and blocks opening — e.g. while the send path
     *  is unavailable. */
    disabled?: boolean;
    /**
     * `chrome` (default): the round translucent trigger of the dark call
     * control row. `surface`: an outline button that follows the page theme,
     * 32px like `CallDock`'s header controls — for the in-call shelf.
     */
    tone?: 'chrome' | 'surface';
    className?: string;
}
/**
 * Icon trigger + popover pairing of ReactionPicker, sized to sit in a call
 * control row next to CallControls' 36px round buttons.
 *
 * The popover is positioned `absolute` against the wrapper — NEVER
 * `position: fixed` — because CallWidget applies a CSS transform to its
 * root, which makes transformed ancestors the containing block for fixed
 * children. Absolute-in-relative keeps the popover anchored to the button
 * in both the docked and expanded layouts.
 */
export declare function ReactionPickerButton({ onReact, emojis, closeOnReact, align, disabled, tone, className, }: ReactionPickerButtonProps): import("react").JSX.Element;
//# sourceMappingURL=ReactionOverlay.d.ts.map
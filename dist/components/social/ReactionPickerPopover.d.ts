import { type CSSProperties, type RefObject } from 'react';
export declare const DEFAULT_PICKER_EMOJIS: readonly ['👍', '❤️', '🔥', '😂', '👏', '🎉', '😮', '💯', '😀', '😅', '😉', '😍', '😘', '🤣', '🥰', '😇', '🤔', '😎', '😢', '😡', '🤯', '😱', '🙃', '🤩', '🙏', '🤝', '👋', '👌', '✌️', '🤞', '🤘', '🫶', '✨', '⭐', '💫', '🌟', '⚡', '💥', '☀️', '🌈', '🚀', '🎯', '🏆', '💪', '🎊', '🎈', '🥳', '🎁', '☕', '🍕', '🍔', '🍩', '🍦', '🍓', '🍻', '🍷', '👀', '🤖', '👻', '😺', '🐶', '🦄', '🐝', '🌸'];
export interface ReactionPickerPopoverProps {
    /** Controls visibility. */
    open: boolean;
    /** Fires with the chosen emoji. */
    onSelect: (emoji: string) => void;
    /** Fires when the popover should close (Escape, click outside, select). */
    onClose: () => void;
    /**
     * Trigger element to anchor against. When provided, the popover positions
     * itself above the trigger; otherwise it falls back to absolute centering
     * at top:auto/left:0 (useful inside a relatively-positioned container).
     */
    triggerRef?: RefObject<HTMLElement | null>;
    /** Override the emoji list. Defaults to 64. */
    emojis?: readonly string[];
    /** Render a search input above the grid. Defaults to true. */
    showSearch?: boolean;
    className?: string;
    style?: CSSProperties;
}
export declare function ReactionPickerPopover({ open, onSelect, onClose, triggerRef, emojis, showSearch, className, style, }: ReactionPickerPopoverProps): import("react").JSX.Element | null;
export default ReactionPickerPopover;
//# sourceMappingURL=ReactionPickerPopover.d.ts.map
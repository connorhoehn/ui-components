export interface MessageActionBarProps {
    /** Emoji offered inline. Keep it short; the picker covers the rest. */
    quickReactions?: readonly string[];
    onReact?: (emoji: string) => void;
    /**
     * Opens the full emoji picker, at the button that asked for it. Omit to show
     * only the quick row.
     */
    onOpenReactionPicker?: (trigger: HTMLElement) => void;
    onReply?: () => void;
    /**
     * Send this message to ANOTHER conversation.
     *
     * Sits next to Reply because the two are the same gesture pointed different
     * ways — reply keeps the message where it is, forward moves a copy
     * somewhere else — and putting it after Pin would bury it among the
     * channel-admin controls, which is not what it is.
     *
     * Absent means this message cannot be forwarded, and nothing renders. That
     * is a real state rather than a permission: a card or a system notice is
     * not a thing you can relocate (see ChatPanel's `onForwardMessage`), so a
     * disabled Forward would be a promise the product will not keep — the same
     * rule `onTogglePin` follows above.
     *
     * Hands back the BUTTON that was pressed, so the destination picker can
     * open against it instead of in the middle of a dimmed page. Same hand-back
     * `RailSectionHeader` does for the rail's + buttons, and the reason is the
     * same: only the bar knows which of the transcript's many Forward buttons
     * this click came from, and the host that owns the picker cannot ask.
     */
    onForward?: (trigger: HTMLElement) => void;
    /** Pin/unpin. Absent means this viewer may not pin here — the control is
     *  then not rendered at all, rather than rendered disabled: a greyed pin is
     *  a promise the product will not keep. */
    onTogglePin?: () => void;
    pinned?: boolean;
    onCopyLink?: () => void;
    /** Own-message actions. Absent for other people's messages. */
    onEdit?: () => void;
    onDelete?: () => void;
    className?: string;
    'data-testid'?: string;
}
export declare function MessageActionBar({ quickReactions, onReact, onOpenReactionPicker, onReply, onForward, onTogglePin, pinned, onCopyLink, onEdit, onDelete, className, 'data-testid': testId, }: MessageActionBarProps): import("react").JSX.Element | null;
export default MessageActionBar;
//# sourceMappingURL=MessageActionBar.d.ts.map
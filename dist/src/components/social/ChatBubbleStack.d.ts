export interface ChatBubble {
    id: string;
    author: string;
    avatarUrl?: string;
    color?: string;
    /** Plain text. The host strips markup; this component never renders HTML. */
    text: string;
    /** Where it came from — the room — for the small caption. */
    channelLabel?: string;
}
export interface ChatBubbleStackProps {
    bubbles: ChatBubble[];
    /** The reader clicked a bubble: open the conversation there. */
    onOpen: (id: string) => void;
    /** A bubble timed out or was dismissed. */
    onDismiss: (id: string) => void;
    /** How long a bubble stays. Default 8 s. */
    dismissAfterMs?: number;
    /** At most this many on screen; older ones go first. Default 3. */
    max?: number;
    className?: string;
    'data-testid'?: string;
}
export declare function ChatBubbleStack({ bubbles, onOpen, onDismiss, dismissAfterMs, max, className, 'data-testid': testId, }: ChatBubbleStackProps): import("react").JSX.Element | null;
export default ChatBubbleStack;
//# sourceMappingURL=ChatBubbleStack.d.ts.map
export interface StreamChatMessage {
    id: string;
    /** Who sent it. */
    displayName: string;
    /** The message body. */
    content: string;
    /** ISO timestamp, rendered as HH:MM. */
    timestamp?: string;
}
export interface StreamChatTickerProps {
    messages: readonly StreamChatMessage[];
    /** How many messages are on screen at once. */
    visibleCount?: number;
    /** Rotation interval in ms. 0 disables rotation and pins the newest. */
    rotateMs?: number;
    /**
     * How many recent messages the ticker may cycle through.
     *
     * Without a cap, a long call's history keeps growing and the rotation takes
     * minutes to come back around to anything current — a "live" ticker showing
     * a message from twenty minutes ago is worse than showing none.
     */
    window?: number;
    className?: string;
    'data-testid'?: string;
}
export declare function StreamChatTicker({ messages, visibleCount, rotateMs, window: windowSize, className, 'data-testid': testId, }: StreamChatTickerProps): import("react").JSX.Element | null;
export default StreamChatTicker;
//# sourceMappingURL=StreamChatTicker.d.ts.map
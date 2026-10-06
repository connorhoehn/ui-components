export interface QuotedMessage {
    messageId: string;
    author: string;
    /** ISO timestamp of the quoted message. */
    timestamp?: string;
    /** Plain text of the original. Trimmed for display; the full text is not needed. */
    text: string;
}
export interface QuoteBlockProps {
    quote: QuotedMessage;
    /** Jumps to the original. Omit when the original is unreachable (deleted,
     *  or outside a window this client cannot load) — the quote then reads as
     *  what it is, a record of something said, rather than a dead control. */
    onJump?: (messageId: string) => void;
    /** Removes the quote — only meaningful in the composer. */
    onDismiss?: () => void;
    className?: string;
    'data-testid'?: string;
}
/** Caps an excerpt on a word boundary so a quote never dominates its reply. */
export declare function excerpt(text: string, limit?: number): string;
export declare function QuoteBlock({ quote, onJump, onDismiss, className, 'data-testid': testId, }: QuoteBlockProps): import("react").JSX.Element;
export default QuoteBlock;
//# sourceMappingURL=QuoteBlock.d.ts.map
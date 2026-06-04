export interface AgUiReasoningBlockProps {
    /** Reasoning text accumulated from REASONING_MESSAGE_CONTENT events. */
    reasoning: string;
    /** Whether the parent message is still streaming. Drives the "thinking..." vs "Reasoning" label. */
    isStreaming?: boolean;
    /** Default open state. Defaults to false (collapsed). */
    defaultOpen?: boolean;
    /** Optional className for outer wrapper. */
    className?: string;
}
export declare function AgUiReasoningBlock({ reasoning, isStreaming, defaultOpen, className, }: AgUiReasoningBlockProps): import("react/jsx-runtime").JSX.Element | null;
export default AgUiReasoningBlock;
//# sourceMappingURL=AgUiReasoningBlock.d.ts.map
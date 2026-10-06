export interface ThinkingBlockProps {
    /** the thinking/reasoning text */
    content: string;
    /** if true, show "Thinking…" and ThinkingDots when content empty */
    streaming?: boolean;
    /** default false (collapsed) */
    defaultOpen?: boolean;
    className?: string;
}
/**
 * A collapsible `<details>` block for showing chain-of-thought reasoning.
 *
 * Pair with a parser that strips `<thinking>...</thinking>` from the assistant
 * message and feeds the extracted text into `content`.
 */
export declare function ThinkingBlock({ content, streaming, defaultOpen, className, }: ThinkingBlockProps): import("react").JSX.Element;
//# sourceMappingURL=ThinkingBlock.d.ts.map
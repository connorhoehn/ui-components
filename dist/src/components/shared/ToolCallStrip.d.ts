export interface ToolCall {
    id: string;
    name: string;
    done: boolean;
    args?: string;
}
export interface ToolCallStripProps {
    toolCalls: ToolCall[];
    className?: string;
}
export interface ToolCallPillProps {
    name: string;
    done: boolean;
    /**
     * Tooltip text, rendered as the pill's `title` attribute — a place for the
     * raw tool id when `name` is a friendlier display label ("searched
     * knowledge base" vs. the tool's actual name) and the two need to differ.
     * Undefined (the default) renders no `title`, same as today.
     */
    title?: string;
    className?: string;
}
/**
 * A single pill rendering one tool call's name + done/pending state.
 */
export declare function ToolCallPill({ name, done, title, className }: ToolCallPillProps): import("react").JSX.Element;
/**
 * A compact strip of tool call pills.
 */
export declare function ToolCallStrip({ toolCalls, className }: ToolCallStripProps): import("react").JSX.Element;
//# sourceMappingURL=ToolCallStrip.d.ts.map
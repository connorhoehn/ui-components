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
    className?: string;
}
/**
 * A single pill rendering one tool call's name + done/pending state.
 */
export declare function ToolCallPill({ name, done, className }: ToolCallPillProps): import("react").JSX.Element;
/**
 * A compact strip of tool call pills.
 */
export declare function ToolCallStrip({ toolCalls, className }: ToolCallStripProps): import("react").JSX.Element;
//# sourceMappingURL=ToolCallStrip.d.ts.map
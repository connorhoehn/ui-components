export interface TypingIndicatorProps {
    /**
     * Names currently typing. Empty array → renders nothing (component returns null
     * so callers don't have to wrap it in a conditional).
     */
    names: string[];
    /** Render only the animated dots, with no banner text. Default: false. */
    compact?: boolean;
    /** Dot color override (passes through to ThinkingDots). */
    color?: string;
    /** Dot size (passes through to ThinkingDots). Default 'sm'. */
    size?: 'sm' | 'md';
    className?: string;
    'data-testid'?: string;
}
/** Formats a list of typing user names. Trims to a max of 2 explicit names + "+N others". */
export declare function formatTypingBanner(names: string[]): string;
export declare function TypingIndicator({ names, compact, color, size, className, 'data-testid': testId, }: TypingIndicatorProps): import("react").JSX.Element | null;
export default TypingIndicator;
//# sourceMappingURL=TypingIndicator.d.ts.map
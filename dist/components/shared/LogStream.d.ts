import type { CSSProperties, ReactNode } from 'react';
export type LogLevel = 'debug' | 'info' | 'warn' | 'error';
export interface LogLine {
    id: string;
    /** Pre-formatted timestamp string (e.g. "10:48:21.024"). Optional. */
    timestamp?: string;
    /** Severity. Drives glyph + color. */
    level?: LogLevel;
    /** Optional source/component prefix (e.g. "auth-svc", "pipeline-7"). */
    source?: string;
    /** The log message body. */
    message: ReactNode;
}
export interface LogStreamProps {
    lines: LogLine[];
    /** When true, autoscroll to the latest line as new lines arrive. Default true. */
    follow?: boolean;
    /** When true, render the small timestamp column. Default true. */
    showTimestamp?: boolean;
    /** When true, render the level glyph. Default true. */
    showLevel?: boolean;
    /** When true, render the source prefix column. Default true. */
    showSource?: boolean;
    /** Header title. Default: "Log stream". Set to null to hide the header. */
    title?: string | null;
    /** Optional right-side meta slot in the header (overrides default line count). */
    headerSlot?: ReactNode;
    /** Empty-state message when lines is empty. */
    emptyMessage?: ReactNode;
    /** Optional max-height for the scroll region. */
    maxHeight?: string;
    /**
     * Colour family for the scroll region. `'code'` (default) is today's
     * permanently-dark console — `--color-surface-subtle` with a `#0b1020`
     * fallback for hosts that don't define it, `--color-text-primary` with a
     * `#e5e7eb` fallback for the text. `'surface'` follows the host theme
     * instead (`bg-surface-inset text-text-primary`), for a log panel embedded
     * in an otherwise light-themed page rather than a terminal pane.
     * `'transparent'` keeps the light-on-dark text but paints no background at
     * all, for a log sitting over a surface that owns its own — the working-state
     * backdrop in `RisingParticles`, whose star field an opaque scroll region
     * would hide completely.
     */
    tone?: 'code' | 'surface' | 'transparent';
    /** When provided, renders a "Clear" button in the header. */
    onClear?: () => void;
    className?: string;
    style?: CSSProperties;
    'data-testid'?: string;
}
export declare function LogStream({ lines, follow, showTimestamp, showLevel, showSource, title, headerSlot, emptyMessage, maxHeight, tone, onClear, className, style, 'data-testid': testId, }: LogStreamProps): import("react").JSX.Element;
/** Alias kept for clarity in contexts where "terminal log" reads better. */
export declare const TerminalLog: typeof LogStream;
export default LogStream;
//# sourceMappingURL=LogStream.d.ts.map
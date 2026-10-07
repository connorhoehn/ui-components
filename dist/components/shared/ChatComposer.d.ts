import type { CSSProperties, ReactNode } from 'react';
export interface ChatComposerProps {
    value: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
    disabled?: boolean;
    /** false: single-line input, true: textarea (default false) */
    multiline?: boolean;
    placeholder?: string;
    /** default '→' */
    submitLabel?: string | ReactNode;
    className?: string;
    style?: CSSProperties;
    autoFocus?: boolean;
    /** for multiline, max rows before scroll (default 4) */
    maxRows?: number;
    /**
     * Accessible name for the message field (default "Message").
     *
     * The field is rendered internally, so a host has no way to wrap it in its
     * own `<label>`; without this it had no accessible name at all and announced
     * as a bare "edit text". A `placeholder` is not a substitute — browsers only
     * fall back to it, and it is gone the moment the user types.
     */
    'aria-label'?: string;
    /** Id of an existing visible element naming the field; wins over `aria-label`. */
    'aria-labelledby'?: string;
    /**
     * Accessible name for the send button. Only applied when `submitLabel` has
     * no readable text of its own — the default `'→'` and any icon node. When
     * `submitLabel` IS words ("Send", "Post"), that visible text is the name and
     * this is ignored, so the spoken name can never contradict what is on screen.
     */
    submitAriaLabel?: string;
}
/**
 * Chat input with send button. Stateless — value/onChange controlled by parent.
 *
 * - Enter submits (Shift+Enter inserts newline in multiline mode).
 * - Submit disabled when `disabled` or value is empty/whitespace.
 */
export declare function ChatComposer({ value, onChange, onSubmit, disabled, multiline, placeholder, submitLabel, className, style, autoFocus, maxRows, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledBy, submitAriaLabel, }: ChatComposerProps): import("react").JSX.Element;
//# sourceMappingURL=ChatComposer.d.ts.map
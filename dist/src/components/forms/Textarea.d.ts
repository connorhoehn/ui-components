import { type TextareaHTMLAttributes } from 'react';
export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'rows'> {
    /** Fixed row count. Mutually exclusive with autoResize. */
    rows?: number;
    /** Minimum visible rows (used with autoResize). Default: 2. */
    minRows?: number;
    /** Maximum rows before the box scrolls (used with autoResize). */
    maxRows?: number;
    /** Grow to fit content automatically. Default: false. */
    autoResize?: boolean;
    /** When true, applies a danger-colored border. */
    invalid?: boolean;
    'data-testid'?: string;
}
export declare const Textarea: import("react").ForwardRefExoticComponent<TextareaProps & import("react").RefAttributes<HTMLTextAreaElement>>;
export default Textarea;
//# sourceMappingURL=Textarea.d.ts.map
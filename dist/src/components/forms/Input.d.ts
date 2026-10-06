import { type InputHTMLAttributes, type ReactNode } from 'react';
export type InputSize = 'sm' | 'md';
export type InputType = 'text' | 'number' | 'url' | 'password' | 'email' | 'search' | 'date' | 'datetime-local' | 'time';
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'prefix'> {
    type?: InputType;
    size?: InputSize;
    /** Node rendered inside the left edge of the input (icon, currency symbol, etc.) */
    prefix?: ReactNode;
    /** Node rendered inside the right edge of the input (unit, clear button, etc.) */
    suffix?: ReactNode;
    /** When true, applies a danger-colored border. */
    invalid?: boolean;
    /** When true, renders the input value in a monospace font (e.g. JSONPath, code). */
    mono?: boolean;
    'data-testid'?: string;
}
export declare const Input: import("react").ForwardRefExoticComponent<InputProps & import("react").RefAttributes<HTMLInputElement>>;
export default Input;
//# sourceMappingURL=Input.d.ts.map
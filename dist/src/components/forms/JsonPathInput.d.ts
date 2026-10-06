export interface JsonPathSample {
    /** Short display label, e.g. '$.trigger.imageRef' */
    label: string;
    /** The value to paste into the input when clicked */
    value: string;
}
export interface JsonPathInputProps {
    value: string;
    onChange: (value: string) => void;
    samples?: JsonPathSample[];
    placeholder?: string;
    invalid?: boolean;
    errorMessage?: string;
    disabled?: boolean;
    size?: 'sm' | 'md';
    /**
     * When true, validate that value starts with '$.' on blur and surface the
     * error via the errorMessage slot (caller receives the validated value
     * unchanged — validation is display-only here).
     */
    enforcePrefix?: boolean;
    'data-testid'?: string;
}
export declare const JsonPathInput: import("react").ForwardRefExoticComponent<JsonPathInputProps & import("react").RefAttributes<HTMLInputElement>>;
export default JsonPathInput;
//# sourceMappingURL=JsonPathInput.d.ts.map
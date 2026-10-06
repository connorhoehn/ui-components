export interface NumberInputProps {
    /**
     * `undefined` renders an empty field, for a genuinely optional numeric
     * setting. Distinguishing "unset" from 0 matters: 0 is a real value for a
     * seed, a threshold or an offset.
     */
    value: number | undefined;
    onChange: (value: number) => void;
    /**
     * Called when the field is emptied. Supplying it is what makes the field
     * clearable — without it, deleting the text leaves the previous value in
     * place, because a half-typed "-" or "" cannot be parsed to a number.
     *
     * Kept separate from `onChange` so widening that callback's parameter to
     * `number | undefined` doesn't break every existing caller.
     */
    onClear?: () => void;
    min?: number;
    max?: number;
    step?: number;
    /** Rendered as a right-edge suffix: 'px' | '°' | '%' | … */
    unit?: string;
    placeholder?: string;
    invalid?: boolean;
    disabled?: boolean;
    size?: 'sm' | 'md';
    /**
     * Id of the rendered `<input>`, so an external `<label htmlFor>` can point
     * at it. Without this the prop was silently dropped and the label named
     * nothing.
     */
    id?: string;
    /** Form field name, for label association and form submission. */
    name?: string;
    /** Accessible name. Required when no visible `<label>` is wired up. */
    'aria-label'?: string;
    /** Id of the element that labels this control. */
    'aria-labelledby'?: string;
    /** Id(s) of hint / error text describing this control. */
    'aria-describedby'?: string;
    'aria-invalid'?: boolean;
    'aria-required'?: boolean;
    required?: boolean;
    'data-testid'?: string;
}
export declare const NumberInput: import("react").ForwardRefExoticComponent<NumberInputProps & import("react").RefAttributes<HTMLInputElement>>;
export default NumberInput;
//# sourceMappingURL=NumberInput.d.ts.map
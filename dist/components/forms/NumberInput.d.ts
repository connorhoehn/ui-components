export interface NumberInputProps {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    /** Rendered as a right-edge suffix: 'px' | '°' | '%' | … */
    unit?: string;
    placeholder?: string;
    invalid?: boolean;
    disabled?: boolean;
    size?: 'sm' | 'md';
    'data-testid'?: string;
}
export declare const NumberInput: import("react").ForwardRefExoticComponent<NumberInputProps & import("react").RefAttributes<HTMLInputElement>>;
export default NumberInput;
//# sourceMappingURL=NumberInput.d.ts.map
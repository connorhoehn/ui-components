export interface ColorInputProps {
    /** Hex color value, e.g. "#3b82f6". */
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
    /** Accessible name. Required when no visible <label> wraps this. */
    'aria-label'?: string;
    className?: string;
    'data-testid'?: string;
}
export declare const ColorInput: import("react").ForwardRefExoticComponent<ColorInputProps & import("react").RefAttributes<HTMLInputElement>>;
export default ColorInput;
//# sourceMappingURL=ColorInput.d.ts.map
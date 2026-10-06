export interface RadioOption<T extends string = string> {
    value: T;
    label: string;
    /** Short caption rendered below the label in muted text. */
    description?: string;
}
export interface RadioGroupProps<T extends string = string> {
    /** Used as the HTML radio group name and as a stable ID base for labels. */
    name: string;
    value: T;
    onChange: (value: T) => void;
    options: RadioOption<T>[];
    disabled?: boolean;
    /** @default 'vertical' */
    orientation?: 'vertical' | 'horizontal';
    'data-testid'?: string;
}
export declare function RadioGroup<T extends string = string>({ name, value, onChange, options, disabled, orientation, 'data-testid': testId, }: RadioGroupProps<T>): import("react").JSX.Element;
export default RadioGroup;
//# sourceMappingURL=RadioGroup.d.ts.map
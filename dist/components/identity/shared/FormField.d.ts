export interface FormFieldProps {
    label: string;
    name: string;
    type?: 'text' | 'email' | 'password' | 'textarea' | 'select' | 'checkbox' | 'number';
    value: string | boolean | number;
    onChange: (value: string | boolean | number) => void;
    error?: string;
    required?: boolean;
    placeholder?: string;
    options?: Array<{
        value: string;
        label: string;
    }>;
    helpText?: string;
    disabled?: boolean;
}
export declare function FormField({ label, name, type, value, onChange, error, required, placeholder, options, helpText, disabled, }: FormFieldProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=FormField.d.ts.map
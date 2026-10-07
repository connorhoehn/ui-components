export interface ToggleFieldProps {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    help?: string;
    disabled?: boolean;
    'data-testid'?: string;
}
export default function ToggleField({ label, checked, onChange, help, disabled, 'data-testid': testId, }: ToggleFieldProps): import("react").JSX.Element;
//# sourceMappingURL=ToggleField.d.ts.map
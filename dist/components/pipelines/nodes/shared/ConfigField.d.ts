import type { ReactNode } from 'react';
export interface ConfigFieldProps {
    label: string;
    required?: boolean;
    help?: string;
    error?: string;
    children: ReactNode;
    className?: string;
}
export default function ConfigField({ label, required, help, error, children, className }: ConfigFieldProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ConfigField.d.ts.map
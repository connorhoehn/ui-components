import { type ReactNode } from 'react';
export interface FilePickerButtonProps {
    onFiles: (files: File[]) => void;
    /** The input's `accept`, e.g. ".md,.txt". */
    accept?: string;
    multiple?: boolean;
    /** `secondary` is a 36px bordered button, `primary` the brand one. */
    variant?: 'secondary' | 'primary';
    icon?: ReactNode;
    disabled?: boolean;
    children: ReactNode;
    className?: string;
    'aria-label'?: string;
    'data-testid'?: string;
}
export declare function FilePickerButton({ onFiles, accept, multiple, variant, icon, disabled, children, className, 'aria-label': ariaLabel, 'data-testid': testId, }: FilePickerButtonProps): import("react").JSX.Element;
export default FilePickerButton;
//# sourceMappingURL=FilePickerButton.d.ts.map
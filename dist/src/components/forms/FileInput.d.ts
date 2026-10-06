import { type InputHTMLAttributes } from 'react';
export interface FileInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange' | 'value' | 'defaultValue'> {
    /**
     * Called with the picked files. Always an array (never a FileList), and never
     * called with the raw event — the input resets itself immediately afterwards,
     * so an event held past this callback would already be stale.
     */
    onFiles: (files: File[]) => void;
    'data-testid'?: string;
}
export declare const FileInput: import("react").ForwardRefExoticComponent<FileInputProps & import("react").RefAttributes<HTMLInputElement>>;
export default FileInput;
//# sourceMappingURL=FileInput.d.ts.map
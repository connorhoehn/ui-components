import { type InputHTMLAttributes } from 'react';
export interface FileUploadDropProps {
    /** Comma-separated MIME types or extensions, e.g. "image/*,.pdf" */
    accept?: string;
    /** Max individual file size in bytes */
    maxSize?: number;
    multiple?: boolean;
    onFiles: (files: File[]) => void;
    onError?: (message: string) => void;
    disabled?: boolean;
    /** Custom drop-zone label */
    label?: string;
    className?: string;
    'data-testid'?: string;
    /**
     * `data-testid` on the hidden `<input type="file">`.
     *
     * The zone's own testid lands on the wrapper, and the input is
     * `aria-hidden` with `tabIndex={-1}`, so a test had no way to reach the
     * element it must fire a `change` at — there is no cross-browser way to
     * drive a real file picker. That is a real adoption blocker, not a
     * nicety: a host whose spec selects the input by testid could not move
     * off its hand-rolled drop zone at all.
     */
    inputTestId?: string;
    /**
     * Extra attributes for the hidden input — `name`, `capture`, `form`, a
     * `webkitdirectory`. `type`, `accept`, `multiple`, `disabled`, `ref` and
     * `onChange` are owned here and cannot be overridden: they are the
     * component's contract, not decoration.
     */
    inputProps?: Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'accept' | 'multiple' | 'disabled' | 'onChange' | 'ref' | 'className'>;
}
export declare function FileUploadDrop({ accept, maxSize, multiple, onFiles, onError, disabled, label, className, 'data-testid': testId, inputTestId, inputProps, }: FileUploadDropProps): import("react").JSX.Element;
export default FileUploadDrop;
//# sourceMappingURL=FileUploadDrop.d.ts.map
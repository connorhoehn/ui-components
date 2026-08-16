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
}
export declare function FileUploadDrop({ accept, maxSize, multiple, onFiles, onError, disabled, label, className, 'data-testid': testId, }: FileUploadDropProps): import("react").JSX.Element;
export default FileUploadDrop;
//# sourceMappingURL=FileUploadDrop.d.ts.map
export interface StagedFile {
    /** Stable id for keying and removal — the File object itself is not a key. */
    id: string;
    file: File;
}
export interface ComposerAttachmentsProps {
    files: readonly StagedFile[];
    onRemove: (id: string) => void;
    disabled?: boolean;
    className?: string;
    'data-testid'?: string;
}
/** Bytes as something a person reads. */
export declare function formatBytes(bytes: number): string;
export declare function ComposerAttachments({ files, onRemove, disabled, className, 'data-testid': testId, }: ComposerAttachmentsProps): import("react").JSX.Element | null;
export default ComposerAttachments;
//# sourceMappingURL=ComposerAttachments.d.ts.map
export declare const MAX_IMAGE_BYTES: number;
export declare const MAX_ATTACHMENT_BYTES: number;
export interface UploadedDocumentFile {
    url: string;
    name: string;
    size: number;
    type: string;
}
export interface DocumentImageUpload {
    uploadImage: (file: File) => Promise<string>;
    uploadFile: (file: File) => Promise<UploadedDocumentFile>;
    accepts: (file: File) => boolean;
}
export interface DocumentUploadCompletion {
    mine: boolean;
    transferId: string;
    downloadUrl?: string;
}
/** Structural injection keeps the UI package independent of the runtime package. */
export type DocumentFileUploadHook = (channel: string, options: {
    displayName: string;
    previewMaxEdge: number;
    onComplete: (completion: DocumentUploadCompletion) => void;
}) => {
    upload: (file: File) => Promise<{
        status: string;
        error?: string;
        transferId?: string;
    }>;
};
export declare function acceptsDocumentImage(file: File): boolean;
/** Reference editor upload binding; waits for the server's stable asset URL, never a data URI. */
export declare function useDocumentImageUpload(documentId: string | null | undefined, displayName: string, useFileUpload: DocumentFileUploadHook, timeoutMs?: number): DocumentImageUpload;
//# sourceMappingURL=useDocumentImageUpload.d.ts.map
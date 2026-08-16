import { type ReactNode } from 'react';
export interface UploadedImage {
    imageId: string;
    width: number;
    height: number;
    mimeType: string;
    sizeBytes: number;
}
export interface PipelineEditorServices {
    /**
     * Resolve an imageId to a browser-loadable URL. Used by every node body
     * that renders `<img src=...>` for a produced image (crop, adjust, save,
     * generate, etc.). The host is responsible for any auth wrangling — the
     * URL must work with a bare `<img>` tag (cookie session, signed URL,
     * permissive route, etc.).
     */
    getImageUrl(imageId: string): string;
    /**
     * Optional upload helper used by image-source / image picker primitives.
     * Hosts that mount an upload UI implement this against their backend.
     * Nodes that just render produced images do NOT need this method.
     */
    uploadImage?(input: File | {
        url: string;
    }): Promise<UploadedImage>;
}
export declare function PipelineEditorServicesProvider({ services, children, }: {
    services: PipelineEditorServices;
    children: ReactNode;
}): import("react").JSX.Element;
/**
 * Returns the host-provided `getImageUrl(imageId): string` callback.
 * Throws when called outside a provider — catches the "I forgot to mount
 * the services provider" misuse at first render rather than first
 * thumbnail.
 */
export declare function useImageUrl(): (imageId: string) => string;
export declare function usePipelineEditorServices(): PipelineEditorServices;
//# sourceMappingURL=PipelineEditorServicesContext.d.ts.map
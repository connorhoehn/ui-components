export interface ImageLightboxImage {
    src: string;
    alt?: string;
    caption?: string;
}
export interface ImageLightboxProps {
    images: ImageLightboxImage[];
    /** Index of the open image, or null when the lightbox is closed. */
    openIndex: number | null;
    onClose: () => void;
    /**
     * Controlled navigation callback. When provided, prev/next/arrow-keys
     * call this and the parent is expected to update `openIndex`. When
     * omitted, the lightbox navigates with internal fallback state.
     */
    onNavigate?: (index: number) => void;
}
export declare function ImageLightbox({ images, openIndex, onClose, onNavigate }: ImageLightboxProps): import("react").ReactPortal | null;
export default ImageLightbox;
//# sourceMappingURL=ImageLightbox.d.ts.map
import { type ReactNode } from 'react';
export type ImageThumbnailSize = 'sm' | 'md' | 'lg';
export type ImageThumbnailAspect = 'square' | 'video' | 'auto';
export interface ImageThumbnailProps {
    src: string;
    alt: string;
    size?: ImageThumbnailSize;
    aspectRatio?: ImageThumbnailAspect;
    rounded?: boolean;
    /** Rendered when the image fails to load. Defaults to a broken-image icon. */
    fallback?: ReactNode;
    loading?: 'lazy' | 'eager';
    className?: string;
    'data-testid'?: string;
}
export declare function ImageThumbnail({ src, alt, size, aspectRatio, rounded, fallback, loading, className, 'data-testid': testId, }: ImageThumbnailProps): import("react").JSX.Element;
export default ImageThumbnail;
//# sourceMappingURL=ImageThumbnail.d.ts.map
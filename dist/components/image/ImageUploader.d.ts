import { type UploadedImage } from '../pipelines/services';
export interface ImageUploaderValue {
    imageId: string;
    width?: number;
    height?: number;
    mimeType?: string;
}
export interface ImageUploaderProps {
    /** Current uploaded image (null until something has been uploaded). */
    value: ImageUploaderValue | null;
    onChange: (next: UploadedImage | null) => void;
    /** Max upload size in bytes. Default: 8 * 1024 * 1024 (8 MB). */
    maxSize?: number;
    /** Accepted mime types. Default: 'image/*'. */
    accept?: string;
    /** When true, hide the URL input and accept only drag-drop + file picker. */
    fileOnly?: boolean;
    /** When true, hide the file picker and accept only URL. */
    urlOnly?: boolean;
    className?: string;
    'data-testid'?: string;
}
export declare function ImageUploader(props: ImageUploaderProps): import("react").JSX.Element;
export default ImageUploader;
//# sourceMappingURL=ImageUploader.d.ts.map
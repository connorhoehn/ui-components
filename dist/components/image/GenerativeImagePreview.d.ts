export type GenerativeImagePreviewStatus = 'synthesizing' | 'done';
export interface GenerativeImagePreviewProps {
    status: GenerativeImagePreviewStatus;
    /** Produced-image URL; rendered when status is 'done'. */
    src?: string;
    alt?: string;
    /** Epoch ms when synthesis started — enables the elapsed-time chip. */
    startedAt?: number;
    /** Caller controls size (width/height/aspect), like ImageThumbnail. */
    className?: string;
}
export declare function GenerativeImagePreview({ status, src, alt, startedAt, className, }: GenerativeImagePreviewProps): import("react").JSX.Element;
export default GenerativeImagePreview;
//# sourceMappingURL=GenerativeImagePreview.d.ts.map
import type { VisionObject, VisionPerson, VisionResult } from './types';
export interface ImageWithBBoxOverlayProps {
    imageUrl?: string;
    imageDataUrl?: string;
    /** Pixel dimensions of the source image. Required for bbox scaling. If
     *  omitted, the component infers them from the natural image size on load. */
    imageWidth?: number;
    imageHeight?: number;
    people?: VisionPerson[];
    objects?: VisionObject[];
    /** Whether to render people, objects, or both. Default: both. */
    show?: 'people' | 'objects' | 'both';
    /** Called when the user clicks a person box. */
    onSelectPerson?: (person: VisionPerson) => void;
    /** Called when the user clicks an object box. */
    onSelectObject?: (object: VisionObject) => void;
    className?: string;
    alt?: string;
}
/**
 * Renders a source image with overlaid bounding boxes for detected people
 * (indigo) and objects (amber). Boxes scale with the rendered image size
 * via percentage-based positioning, so the component is responsive without
 * needing a canvas. Hovering a box surfaces the label tooltip.
 */
export declare function ImageWithBBoxOverlay({ imageUrl, imageDataUrl, imageWidth, imageHeight, people, objects, show, onSelectPerson, onSelectObject, className, alt, }: ImageWithBBoxOverlayProps): import("react").JSX.Element;
export default ImageWithBBoxOverlay;
/** Convenience: pull all the bbox-related props out of a `VisionResult`. */
export declare function imageOverlayPropsFrom(result: VisionResult): {
    imageUrl: string | undefined;
    imageDataUrl: string | undefined;
    imageWidth: number | undefined;
    imageHeight: number | undefined;
    people: VisionPerson[] | undefined;
    objects: VisionObject[] | undefined;
};
//# sourceMappingURL=ImageWithBBoxOverlay.d.ts.map
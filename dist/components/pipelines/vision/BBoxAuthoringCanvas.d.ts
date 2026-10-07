import type { AuthoringBBox } from '../../../types/pipeline';
export type { AuthoringBBox };
export interface BBoxAuthoringCanvasProps {
    imageUrl: string;
    imageWidth: number;
    imageHeight: number;
    /** Current boxes — controlled. */
    boxes: AuthoringBBox[];
    /** Called when the user edits the set (add / move / resize / label / delete). */
    onChange: (next: AuthoringBBox[]) => void;
    /** When true, render boxes but disable editing. */
    readOnly?: boolean;
    className?: string;
}
export declare function BBoxAuthoringCanvas({ imageUrl, imageWidth, imageHeight, boxes, onChange, readOnly, className, }: BBoxAuthoringCanvasProps): import("react").JSX.Element;
export default BBoxAuthoringCanvas;
//# sourceMappingURL=BBoxAuthoringCanvas.d.ts.map
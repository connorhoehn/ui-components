import type { VisionResult } from './types';
export interface VisionResultViewerProps {
    result: VisionResult;
    /** Whether to render the image overlay + per-section panels. Default: true. */
    showImage?: boolean;
    showCaption?: boolean;
    showPeople?: boolean;
    showObjects?: boolean;
    showTags?: boolean;
    showEdits?: boolean;
    showRawText?: boolean;
    /** Fires when a tag is clicked (e.g. to filter the activity stream). */
    onTagClick?: (tag: string) => void;
    /** Fires when "Apply" is clicked on an edit recommendation. */
    onApplyEdit?: (edit: string) => void;
    className?: string;
}
/**
 * Top-level vision-result composite. Renders every populated section of a
 * `VisionResult`, gracefully omitting sections the model didn't emit.
 *
 * Layout: two-column on `md+` (image left, panels right), single-column on
 * mobile. Selecting a person in the people list highlights the corresponding
 * bbox on the image and vice versa.
 *
 * Designed to be embedded in `PipelineRunsPage` as the expanded view of a
 * `pipeline.image.vision.completed` step, OR rendered standalone for direct
 * vision-model exploration.
 */
export declare function VisionResultViewer({ result, showImage, showCaption, showPeople, showObjects, showTags, showEdits, showRawText, onTagClick, onApplyEdit, className, }: VisionResultViewerProps): import("react/jsx-runtime").JSX.Element;
export default VisionResultViewer;
//# sourceMappingURL=VisionResultViewer.d.ts.map
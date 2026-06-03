import type { VisionResult } from './types';
export interface EditRecommendationsPanelProps {
    exposure?: VisionResult['exposure'];
    whiteBalance?: VisionResult['whiteBalance'];
    contrast?: VisionResult['contrast'];
    composition?: VisionResult['composition'];
    edits?: VisionResult['edits'];
    onApplyEdit?: (edit: string) => void;
    className?: string;
}
/**
 * Photographer-style edit panel: exposure / WB / contrast verdicts +
 * actionable edit suggestions. Each edit row has an optional "Apply" hook
 * for downstream pipelines (e.g. queueing an `image:edit-apply` step).
 */
export declare function EditRecommendationsPanel({ exposure, whiteBalance, contrast, composition, edits, onApplyEdit, className, }: EditRecommendationsPanelProps): import("react/jsx-runtime").JSX.Element | null;
export default EditRecommendationsPanel;
//# sourceMappingURL=EditRecommendationsPanel.d.ts.map
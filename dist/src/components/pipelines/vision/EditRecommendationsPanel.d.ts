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
export declare function EditRecommendationsPanel({ exposure, whiteBalance, contrast, composition, edits, onApplyEdit, className, }: EditRecommendationsPanelProps): import("react").JSX.Element | null;
export default EditRecommendationsPanel;
//# sourceMappingURL=EditRecommendationsPanel.d.ts.map
import type { VisionResult } from './types';
export interface CaptionPanelProps {
    result: Pick<VisionResult, 'caption' | 'setting' | 'location' | 'timeOfDay' | 'mood' | 'colors'>;
    className?: string;
}
/**
 * Caption + scene metadata header.
 */
export declare function CaptionPanel({ result, className }: CaptionPanelProps): import("react").JSX.Element | null;
export default CaptionPanel;
//# sourceMappingURL=CaptionPanel.d.ts.map
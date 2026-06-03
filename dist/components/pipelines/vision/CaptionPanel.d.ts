import type { VisionResult } from './types';
export interface CaptionPanelProps {
    result: Pick<VisionResult, 'caption' | 'setting' | 'location' | 'timeOfDay' | 'mood' | 'colors'>;
    className?: string;
}
/**
 * Caption + scene metadata header. Renders compactly even when the model
 * only filled `caption`; setting/location/tod/mood/colors are individually
 * optional and each renders as a chip.
 */
export declare function CaptionPanel({ result, className }: CaptionPanelProps): import("react/jsx-runtime").JSX.Element | null;
export default CaptionPanel;
//# sourceMappingURL=CaptionPanel.d.ts.map
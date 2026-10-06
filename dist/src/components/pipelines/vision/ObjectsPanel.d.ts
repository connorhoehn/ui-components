import type { VisionObject } from './types';
export interface ObjectsPanelProps {
    objects: VisionObject[];
    onSelect?: (object: VisionObject) => void;
    className?: string;
}
/**
 * Compact 2-column list of detected objects with bbox preview chips.
 */
export declare function ObjectsPanel({ objects, onSelect, className }: ObjectsPanelProps): import("react").JSX.Element | null;
export default ObjectsPanel;
//# sourceMappingURL=ObjectsPanel.d.ts.map
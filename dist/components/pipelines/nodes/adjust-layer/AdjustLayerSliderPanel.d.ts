import type { AdjustLayer } from '../../../../types/pipeline';
export interface AdjustLayerSliderPanelProps {
    /** Current layer stack from node.data.layers. Controlled. */
    layers: AdjustLayer[];
    onChange: (next: AdjustLayer[]) => void;
    /**
     * Auto-wired source imageId resolved from the upstream run's latest step
     * output. May be undefined if no run exists yet.
     */
    autoSourceImageId?: string;
    /**
     * Manual pin (from node.data.previewSourceImageId). When set, wins over
     * `autoSourceImageId`.
     */
    pinnedSourceImageId?: string;
    /**
     * Called when the user pins or clears a manual override. Writes through
     * to `nodeData.previewSourceImageId` in the host editor.
     */
    onPinnedSourceImageIdChange?: (next: string | undefined) => void;
    /**
     * Deprecated single-source prop kept for backwards compatibility. If
     * neither `autoSourceImageId` nor `pinnedSourceImageId` is supplied, this
     * is treated as the auto-wired source.
     * @deprecated Use `autoSourceImageId` + `pinnedSourceImageId`.
     */
    sourceImageId?: string;
    /** Base URL for the platform-api. Defaults to '' (same origin). */
    apiBase?: string;
}
export default function AdjustLayerSliderPanel({ layers, onChange, autoSourceImageId, pinnedSourceImageId, onPinnedSourceImageIdChange, sourceImageId, apiBase, }: AdjustLayerSliderPanelProps): import("react").JSX.Element;
//# sourceMappingURL=AdjustLayerSliderPanel.d.ts.map
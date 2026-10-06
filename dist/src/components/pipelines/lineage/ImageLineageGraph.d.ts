import type { ImageLineageEntry } from './useImageLineage';
export interface ImageLineageGraphProps {
    entries: ImageLineageEntry[];
    selectedImageId?: string;
    onSelect?: (imageId: string) => void;
    /**
     * Maximum number of nodes to render initially. When `entries.length`
     * exceeds this, only the most-recent-first window is rendered and a
     * banner offers "Show all". Defaults to 100.
     */
    maxRenderedNodes?: number;
}
export declare function ImageLineageGraph({ entries, selectedImageId, onSelect, maxRenderedNodes, }: ImageLineageGraphProps): import("react").JSX.Element;
export default ImageLineageGraph;
//# sourceMappingURL=ImageLineageGraph.d.ts.map
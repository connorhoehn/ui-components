import type { WorkActivityNodeDetail, WorkGraphNodeData, WorkGraphSelection } from './types';
/**
 * The host's preview is its own artwork at its own size. Give it the box and
 * let it scale into it: an SVG with a viewBox letterboxes itself, an image gets
 * object-contain, and plain markup simply fills. Cropping a slide to fit is the
 * one thing a thumbnail must never do.
 */
export declare const PREVIEW_FIT = "flex items-center justify-center [&>*]:h-full [&>*]:w-full [&_img]:h-full [&_img]:w-full [&_img]:object-contain [&_svg]:h-full [&_svg]:w-full";
export declare function WorkActivityNode({ node, detail, selected, selectedRevisionId, live, onSelect, onFeedback }: {
    node: WorkGraphNodeData;
    detail?: WorkActivityNodeDetail;
    selected: boolean;
    selectedRevisionId?: string;
    live: boolean;
    onSelect: (selection: WorkGraphSelection) => void;
    onFeedback?: (selection: Exclude<WorkGraphSelection, null>) => void;
}): import("react").JSX.Element;
//# sourceMappingURL=WorkActivityNode.d.ts.map
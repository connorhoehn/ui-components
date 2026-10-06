export interface NodeThumbStripImage {
    imageId: string;
    alt?: string;
}
export interface NodeThumbStripProps {
    images: NodeThumbStripImage[];
    /** Maximum tiles in the row (including the "+N" tile). Default 4. */
    max?: number;
    'data-testid'?: string;
}
export declare function NodeThumbStrip({ images, max, 'data-testid': testId, }: NodeThumbStripProps): import("react").JSX.Element | null;
export default NodeThumbStrip;
//# sourceMappingURL=NodeThumbStrip.d.ts.map
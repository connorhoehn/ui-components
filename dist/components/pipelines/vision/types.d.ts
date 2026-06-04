export interface VisionBBox {
    /** Pixel coordinates relative to the source image. */
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}
export type VisionAgeBucket = 'infant' | 'child' | 'teen' | 'young_adult' | 'adult' | 'senior';
export interface VisionPerson {
    /** 1-based index within the PEOPLE list. Used as the badge label. */
    index: number;
    bbox: VisionBBox;
    ageBucket?: VisionAgeBucket;
    gender?: string;
    /** 'toward_camera' / 'profile_left' / 'away' / etc. — free string. */
    faceOrientation?: string;
    /** 'smiling' / 'neutral' / 'concentrating' / etc. */
    expression?: string;
    /** ':: walking on the beach' — a short verb phrase. */
    activity?: string;
    /** Comma-separated free description of clothing. */
    clothing?: string;
}
export interface VisionObject {
    label: string;
    bbox: VisionBBox;
    confidence?: number;
}
export type VisionContrastVerdict = 'low' | 'normal' | 'high';
export interface VisionExposure {
    verdict: 'underexposed' | 'correct' | 'overexposed' | string;
    evAdjustment: number;
    rationale: string;
}
export interface VisionWhiteBalance {
    verdict: 'cool' | 'neutral' | 'warm' | string;
    kelvinShift: number;
    rationale: string;
}
/**
 * Full structured result of a single vision-step run. Every section is
 * optional — different model endpoints fill different subsets. The
 * `imageUrl` (or `imageDataUrl`) is required for any panel that overlays
 * bounding boxes on the source image.
 */
export interface VisionResult {
    /** Source image used during analysis. Either a URL or a data: URI. */
    imageUrl?: string;
    imageDataUrl?: string;
    /** Pixel dimensions of the source image. Required for bbox scaling. */
    imageWidth?: number;
    imageHeight?: number;
    caption?: string;
    setting?: string;
    location?: string;
    timeOfDay?: string;
    mood?: string;
    colors?: string[];
    people?: VisionPerson[];
    objects?: VisionObject[];
    text?: string[];
    tags?: string[];
    exposure?: VisionExposure;
    whiteBalance?: VisionWhiteBalance;
    contrast?: VisionContrastVerdict;
    composition?: string;
    edits?: string[];
    /** Free-form raw text returned by the model. Useful for re-parse on
     *  schema bumps and for replay/debug views. */
    rawText?: string;
    model?: {
        endpointId: string;
        latencyMs: number;
        tokensIn?: number;
        tokensOut?: number;
    };
}
//# sourceMappingURL=types.d.ts.map
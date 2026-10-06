import { type ReactNode } from 'react';
export interface MediaEffectsFilterOption {
    id: string;
    label: string;
    /**
     * The CSS filter the effect applies (RM presets carry it as `cssFilter`).
     * The grid layout paints each filter thumbnail with it.
     */
    cssFilter?: string;
    /** Glyph for a face-effect button in the grid layout. */
    icon?: ReactNode;
}
export interface MediaEffectsBackgroundOption {
    id: string;
    label: string;
    /** Thumbnail + replacement image URL, rendered as the chip's preview. */
    url: string;
}
export interface MediaEffectsTrayProps {
    filters: MediaEffectsFilterOption[];
    /** 'none' = no filter active. */
    activeFilterId: string;
    onSelectFilter: (id: string) => void;
    backgrounds: MediaEffectsBackgroundOption[];
    backgroundMode: 'none' | 'blur' | 'image';
    /** Only meaningful when backgroundMode === 'image'. */
    activeBackgroundUrl: string | null;
    /** ('none', null) | ('blur', null) | ('image', url) */
    onSelectBackground: (mode: 'none' | 'blur' | 'image', url: string | null) => void;
    faceSprites: MediaEffectsFilterOption[];
    /** null = no sprite active. */
    activeFaceSpriteId: string | null;
    onSelectFaceSprite: (id: string | null) => void;
    /** Dims every chip and blocks clicks — e.g. while the engine loads. */
    disabled?: boolean;
    /** Compact = tighter paddings for popover placement. */
    compact?: boolean;
    /**
     * `strip` (default): pill chips on the dark call chrome, for a popover or
     * the pre-join room. `grid`: the call-settings Effects tab — thumbnail
     * tiles in `columns` columns under "Filter · Reset", "Background" and "Face
     * effects" headings, painted in the page theme (light or dark).
     */
    layout?: 'strip' | 'grid';
    /** Grid columns. Default 3. */
    columns?: number;
    /** Grid: a live frame for the thumbnails (the preview stream), filtered per tile. */
    thumbnailStream?: MediaStream | null;
    /** Grid: a still frame for the thumbnails when there is no stream. */
    thumbnailSrc?: string;
    /** Grid: filter tiles before "More..." folds the rest. Default 5. */
    filterLimit?: number;
    /** Grid: when set, a dashed "+ Custom" tile opens a file picker (images ≤ 5 MB). */
    onSelectCustomBackground?: (file: File) => void;
    /** Grid: background replacement cannot run here (no WebGL / segmenter failed). */
    backgroundsUnsupported?: boolean;
    className?: string;
    'data-testid'?: string;
}
export declare function MediaEffectsTray({ filters, activeFilterId, onSelectFilter, backgrounds, backgroundMode, activeBackgroundUrl, onSelectBackground, faceSprites, activeFaceSpriteId, onSelectFaceSprite, disabled, compact, layout, columns, thumbnailStream, thumbnailSrc, filterLimit, onSelectCustomBackground, backgroundsUnsupported, className, 'data-testid': testId, }: MediaEffectsTrayProps): import("react").JSX.Element;
/**
 * RM sprite labels carry their emoji ("🕶️ Sunglasses"). Split it off so the
 * grid shows the glyph in the tile and the words underneath, as the mockup
 * does. A label without a leading emoji keeps its whole text.
 */
export declare function splitEffectLabel(label: string): {
    glyph: string | null;
    text: string;
};
export default MediaEffectsTray;
//# sourceMappingURL=MediaEffectsTray.d.ts.map
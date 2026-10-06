import type { MediaEffectsTrayProps } from '../../components/video/MediaEffectsTray';
export type RMBackgroundMode = 'none' | 'blur' | 'image';
/**
 * Minimum shape needed from useMediaEffects()'s MediaEffectsController.
 * Registry entries may carry extra fields (cssFilter, render fns) — the
 * tray only reads id/label/url.
 */
export interface RMMediaEffectsControllerSource {
    filterId: string;
    backgroundMode: RMBackgroundMode;
    backgroundImageUrl: string | null;
    faceSpriteId: string | null;
    filters: Array<{
        id: string;
        label: string;
        cssFilter?: string;
    }>;
    backgrounds: Array<{
        id: string;
        label: string;
        url: string;
    }>;
    /** `icon` (RM ≥ 0.97.4): the sprite's emoji, separate from a plain label. */
    faceSprites: Array<{
        id: string;
        label: string;
        icon?: string;
    }>;
    setFilter(id: string): void;
    setBackgroundMode(mode: RMBackgroundMode): void;
    setBackgroundImageUrl(url: string | null): void;
    setFaceSpriteId(id: string | null): void;
}
export interface WrappedMediaEffectsTrayProps extends Pick<MediaEffectsTrayProps, 'disabled' | 'compact' | 'className' | 'data-testid' | 'layout' | 'columns' | 'thumbnailStream' | 'thumbnailSrc' | 'onSelectCustomBackground' | 'backgroundsUnsupported'> {
    /** Return value of useMediaEffects() from realtime-modules. */
    controller: RMMediaEffectsControllerSource;
}
export declare function WrappedMediaEffectsTray({ controller, ...rest }: WrappedMediaEffectsTrayProps): import("react").JSX.Element;
//# sourceMappingURL=WrappedMediaEffectsTray.d.ts.map
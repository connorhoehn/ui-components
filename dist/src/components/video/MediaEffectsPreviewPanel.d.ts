import type { ReactNode } from 'react';
import type { MediaEffectsTrayProps } from './MediaEffectsTray';
/**
 * The safety gate, hoisted out of the component so it can be asserted on
 * directly. Every selection handler in this panel is wrapped in it.
 *
 * Outside a preview session the wrapped callback is a no-op — a click
 * cannot reach the controller, and therefore cannot reach peers. The
 * `disabled` attribute on the chips is the SECOND layer, not this one;
 * disabling is a rendering detail a refactor can drop, whereas this
 * refuses to run.
 */
export declare function guardedSelection<A extends unknown[]>(previewActive: boolean, fn: (...args: A) => void): (...args: A) => void;
export interface MediaEffectsPreviewPanelProps extends Pick<MediaEffectsTrayProps, 'filters' | 'activeFilterId' | 'onSelectFilter' | 'backgrounds' | 'backgroundMode' | 'activeBackgroundUrl' | 'onSelectBackground' | 'faceSprites' | 'activeFaceSpriteId' | 'onSelectFaceSprite'> {
    /**
     * True while a preview session is open — i.e. the controller has a
     * non-null `draft` and its setters write that draft instead of the
     * live pipeline. When false the panel renders read-only and NO
     * selection callback fires, so nothing can reach peers.
     */
    previewActive: boolean;
    /**
     * The draft self-view (built from the controller's `previewTrack`).
     * Never published. Pass null for the camera-off / warming-up state.
     */
    previewStream: MediaStream | null;
    /** Draft differs from live. Gates Apply. */
    isDirty: boolean;
    /** Commit the draft — the only thing that changes what peers see. */
    onApply: () => void;
    /** Discard the draft and dismiss. Live stays untouched. */
    onCancel: () => void;
    /** Extra dimming on top of `previewActive`, e.g. while the engine warms. */
    disabled?: boolean;
    /** Panel heading. Defaults to "Video effects" (Teams' wording). */
    title?: string;
    /** Label for the commit button. Defaults to "Apply". */
    applyLabel?: string;
    /**
     * `chrome` (default): the dark call-chrome panel with its private-preview
     * notice and pinned Apply/Cancel footer. `surface`: the call-settings
     * Effects tab — page-themed, a "Preview · Only you" chip on the preview, a
     * one-line hint, and the tray in its grid layout. Pair `surface` with
     * `showFooter={false}` when the host (CallSettingsDrawer) owns the footer.
     */
    variant?: 'chrome' | 'surface';
    /** Render the Apply/Cancel footer. Default true. */
    showFooter?: boolean;
    /** Surface: the line under the preview. Default "Changes appear in the call after Apply." */
    hint?: ReactNode;
    /** Surface: grid thumbnails fall back to this still when there is no preview stream. */
    thumbnailSrc?: string;
    /** Surface: "+ Custom" background tile. See MediaEffectsTray. */
    onSelectCustomBackground?: (file: File) => void;
    /** Surface: the background section says it cannot run here. */
    backgroundsUnsupported?: boolean;
    className?: string;
    'data-testid'?: string;
}
export declare function MediaEffectsPreviewPanel({ previewActive, previewStream, isDirty, onApply, onCancel, filters, activeFilterId, onSelectFilter, backgrounds, backgroundMode, activeBackgroundUrl, onSelectBackground, faceSprites, activeFaceSpriteId, onSelectFaceSprite, disabled, title, applyLabel, variant, showFooter, hint, thumbnailSrc, onSelectCustomBackground, backgroundsUnsupported, className, 'data-testid': testId, }: MediaEffectsPreviewPanelProps): import("react").JSX.Element;
export default MediaEffectsPreviewPanel;
//# sourceMappingURL=MediaEffectsPreviewPanel.d.ts.map
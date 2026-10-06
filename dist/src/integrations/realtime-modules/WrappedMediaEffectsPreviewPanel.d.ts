import type { MediaEffectsPreviewPanelProps } from '../../components/video/MediaEffectsPreviewPanel';
import type { RMBackgroundMode, RMMediaEffectsControllerSource } from './WrappedMediaEffectsTray';
/** The four values a preview session snapshots and commits. */
export interface RMMediaEffectsSettings {
    filterId: string;
    backgroundMode: RMBackgroundMode;
    backgroundImageUrl: string | null;
    faceSpriteId: string | null;
}
/**
 * useMediaEffects()'s controller plus the preview-session surface added
 * for the audition-before-publish flow.
 */
export interface RMMediaEffectsPreviewControllerSource extends RMMediaEffectsControllerSource {
    /** Non-null only during a preview session. */
    draft: RMMediaEffectsSettings | null;
    /** Draft differs from live. */
    isDirty: boolean;
    /** The draft self-view. NEVER published. */
    previewTrack: MediaStreamTrack | null;
    /** Snapshot live → draft; the setters now write the draft. */
    beginPreview(): void;
    /** Commit the draft to live — the only thing peers ever see. */
    applyPreview(): void;
    /** Discard the draft; live untouched. */
    cancelPreview(): void;
}
export interface WrappedMediaEffectsPreviewPanelProps extends Pick<MediaEffectsPreviewPanelProps, 'disabled' | 'title' | 'applyLabel' | 'className' | 'data-testid' | 'variant' | 'showFooter' | 'hint' | 'thumbnailSrc' | 'onSelectCustomBackground' | 'backgroundsUnsupported'> {
    /** Mounts the surface and opens a preview session. */
    open: boolean;
    /** Return value of useMediaEffects() from realtime-modules. */
    controller: RMMediaEffectsPreviewControllerSource;
    /** Host closes its dialog/panel here. Fired after Apply AND Cancel. */
    onClose: () => void;
    /** Extra hook fired only on Apply (e.g. a "Effects updated" toast). */
    onApplied?: () => void;
}
export declare function WrappedMediaEffectsPreviewPanel({ open, controller, onClose, onApplied, ...rest }: WrappedMediaEffectsPreviewPanelProps): import("react").JSX.Element | null;
/**
 * How many of the four settings the open preview session changes — the
 * "2 changes" in the call-settings Effects footer. 0 outside a session.
 */
export declare function mediaEffectsChangeCount(controller: RMMediaEffectsPreviewControllerSource): number;
export default WrappedMediaEffectsPreviewPanel;
//# sourceMappingURL=WrappedMediaEffectsPreviewPanel.d.ts.map
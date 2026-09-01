import { type ReactNode } from 'react';
export type CallSettingsTab = 'effects' | 'people' | 'chat';
export interface CallSettingsDialogProps {
    open: boolean;
    /** Backdrop click, Escape and the ✕ button all fire this. */
    onClose: () => void;
    /** Live self-preview stream — rendered muted, mirrored, autoplaying.
     *  Pass null for the "Camera off" empty state. */
    previewStream: MediaStream | null;
    /** Tab shown each time the dialog opens. Ignored (falls back to the
     *  first available tab) when that tab's slot is missing. */
    initialTab?: CallSettingsTab;
    /** "Effects" tab body — e.g. a <MediaEffectsTray/> wired to the
     *  consumer's effects engine. Omit to hide the tab. */
    effectsContent?: ReactNode;
    /** "People" tab body — e.g. an <InviteCandidateList/> wired to the
     *  consumer's roster + invite call. Omit to hide the tab. */
    peopleContent?: ReactNode;
    /** "Chat" tab body — e.g. a chat panel wired to the call's channel.
     *  Omit to hide the tab. */
    chatContent?: ReactNode;
    /**
     * Show the small live self-preview on the left. Default true.
     *
     * Pass false when the tab body brings its own (larger) preview — which
     * is exactly what <MediaEffectsPreviewPanel> does. Two self-views side
     * by side, one live and one draft, is the confusing arrangement the
     * preview-before-publish work exists to remove.
     */
    showPreview?: boolean;
    /** Dialog heading. Defaults to "Call settings". */
    title?: string;
    className?: string;
}
export declare function CallSettingsDialog({ open, onClose, previewStream, initialTab, effectsContent, peopleContent, chatContent, showPreview, title, className, }: CallSettingsDialogProps): import("react").JSX.Element;
export default CallSettingsDialog;
//# sourceMappingURL=CallSettingsDialog.d.ts.map
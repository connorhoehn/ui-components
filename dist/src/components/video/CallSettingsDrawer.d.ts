import { type ReactNode } from 'react';
export type CallSettingsDrawerTab = 'audio-video' | 'effects' | 'captions';
export interface CallSettingsEffectsFooter {
    /** Settings the open preview changes. 0 disables Apply. */
    changeCount: number;
    onCancel: () => void;
    onApply: () => void;
    applying?: boolean;
}
export interface CallSettingsDrawerProps {
    open: boolean;
    onClose: () => void;
    /** The tab shown when the drawer opens. Default `audio-video`. */
    initialTab?: CallSettingsDrawerTab;
    /** Controlled tab (optional). */
    tab?: CallSettingsDrawerTab;
    onTabChange?: (tab: CallSettingsDrawerTab) => void;
    /** Docked in the page column (default) or floating over it (the incoming-call gear). */
    docked?: boolean;
    audioVideo: ReactNode;
    effects: ReactNode;
    captions: ReactNode;
    /** The Effects tab's footer. Without it the Effects tab shows the Done footer. */
    effectsFooter?: CallSettingsEffectsFooter;
    /** Floating width in px. Docked, the drawer fills its column. */
    width?: number;
    className?: string;
    'data-testid'?: string;
}
export declare function CallSettingsDrawer({ open, onClose, initialTab, tab: tabProp, onTabChange, docked, audioVideo, effects, captions, effectsFooter, width, className, 'data-testid': testId, }: CallSettingsDrawerProps): import("react").JSX.Element;
export interface CallCaptionsSettingsProps {
    enabled: boolean;
    onEnabledChange: (on: boolean) => void;
    language: string;
    onLanguageChange?: (language: string) => void;
    /** Default: English only. */
    languages?: {
        value: string;
        label: string;
    }[];
    className?: string;
}
/** The Captions tab body: the live-captions switch and the language. */
export declare function CallCaptionsSettings({ enabled, onEnabledChange, language, onLanguageChange, languages, className, }: CallCaptionsSettingsProps): import("react").JSX.Element;
export default CallSettingsDrawer;
//# sourceMappingURL=CallSettingsDrawer.d.ts.map
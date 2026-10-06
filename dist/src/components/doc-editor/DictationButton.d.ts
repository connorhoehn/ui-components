export type DictationButtonState = 'unsupported' | 'idle' | 'starting' | 'listening' | 'transcribing' | 'error';
export interface DictationButtonProps {
    state: DictationButtonState;
    micActive: boolean;
    /** Why pressing will not record; the button stays visible and says so. */
    unavailableReason?: string;
    onStart: () => void;
    onStop: () => void;
    className?: string;
    'data-testid'?: string;
}
/** A press shorter than this is a click: it toggles instead of stopping on release. */
export declare const DICTATION_HOLD_MS = 250;
export declare function dictationButtonLabel(state: DictationButtonState, micActive: boolean, unavailableReason?: string): string;
export declare function DictationButton({ state, micActive, unavailableReason, onStart, onStop, className, 'data-testid': testId, }: DictationButtonProps): import("react").JSX.Element;
export default DictationButton;
//# sourceMappingURL=DictationButton.d.ts.map
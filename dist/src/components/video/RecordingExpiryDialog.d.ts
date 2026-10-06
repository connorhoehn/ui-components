export type RecordingExpiryChoice = '30d' | '90d' | '365d' | 'never' | 'custom';
export interface RecordingExpiryDialogProps {
    open: boolean;
    /** ISO, or null when the recording does not expire. */
    expiresAt: string | null | undefined;
    /** Resolves when the server has the new value; rejects with a reason to show. */
    onSave: (expiresAt: string | null) => Promise<void> | void;
    onClose: () => void;
    title?: string;
    'data-testid'?: string;
}
/** What a choice means as an instant: end of that day in local time. */
export declare function resolveExpiryChoice(choice: RecordingExpiryChoice, customDate: string, now?: number): string | null | undefined;
export declare function RecordingExpiryDialog({ open, expiresAt, onSave, onClose, title, 'data-testid': testId, }: RecordingExpiryDialogProps): import("react").JSX.Element;
export default RecordingExpiryDialog;
//# sourceMappingURL=RecordingExpiryDialog.d.ts.map
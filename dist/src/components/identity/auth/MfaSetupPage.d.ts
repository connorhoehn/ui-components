/** The four wizard steps, in the order the user walks them. */
export type MfaSetupStep = 'name' | 'scan' | 'verify' | 'backup';
/** The enrolment payload the identity server returns from `onSetup`. */
export interface MfaSetupResult {
    deviceId: string;
    qrCode: string;
    secret: string;
    backupCodes: string[];
}
export interface MfaSetupPageProps {
    onSetup: (deviceName: string) => Promise<MfaSetupResult>;
    onVerify: (deviceId: string, code: string) => Promise<{
        success: boolean;
        backupCodes?: string[];
    }>;
    onComplete: () => void;
    userEmail?: string;
    /**
     * Step the wizard opens on. Optional and **initial-only** — the page keeps
     * owning the step afterwards, so Back/Continue still work exactly as they
     * do without the prop. Omit it and the wizard opens on `'name'`, which is
     * the historical behaviour.
     *
     * It exists because every step past the first was previously reachable
     * only by clicking through the one before it: a host cannot deep-link a
     * user back into a half-finished enrolment (`/mfa/setup?step=scan` after a
     * reload), a story cannot show the scan or backup screens, and a test has
     * to drive the whole flow to assert on the last one.
     *
     * `'scan'` renders the QR code, so it needs `initialSetupResult` as well;
     * without it the wizard falls back to `'name'` rather than rendering an
     * empty card.
     */
    initialStep?: MfaSetupStep;
    /**
     * Seeds the enrolment payload that `onSetup` would normally have returned,
     * so `initialStep` can open on a step that needs it — `'scan'` (QR code +
     * secret) and `'backup'` (the backup-code grid). Initial-only: a later
     * real `onSetup` call replaces it.
     *
     * Use it when the host already holds the payload (resuming an enrolment
     * after a reload) or when a story/test wants a specific step rendered
     * directly instead of clicking to it.
     */
    initialSetupResult?: MfaSetupResult;
    /**
     * Seeds the device-name field, so a wizard opened at a later
     * `initialStep` still shows the name the user typed on step 1 (it appears
     * as the QR caption). Initial-only — the field stays editable.
     */
    initialDeviceName?: string;
}
export declare function MfaSetupPage({ onSetup, onVerify, onComplete, userEmail, initialStep, initialSetupResult, initialDeviceName, }: MfaSetupPageProps): import("react").JSX.Element;
export default MfaSetupPage;
//# sourceMappingURL=MfaSetupPage.d.ts.map
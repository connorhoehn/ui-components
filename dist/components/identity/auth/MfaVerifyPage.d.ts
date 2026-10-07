/** Which challenge the page presents: authenticator code or backup code. */
export type MfaVerifyMode = 'totp' | 'backup';
export interface MfaVerifyPageProps {
    onVerify: (code: string) => Promise<void>;
    onVerifyBackup: (code: string) => Promise<void>;
    error?: string | null;
    /**
     * Challenge the page opens on. Optional and **initial-only** — the page
     * still owns the mode afterwards, so the two "use … instead" links keep
     * flipping it. Omit it and the page opens on `'totp'`, which is the
     * historical behaviour.
     *
     * It exists because the backup-code form was previously reachable only by
     * clicking "Use a backup code instead": a host that already knows the user
     * has lost their authenticator cannot land them on the right challenge, a
     * story cannot show that form, and a test has to click before asserting.
     */
    defaultMode?: MfaVerifyMode;
}
export declare function MfaVerifyPage({ onVerify, onVerifyBackup, error, defaultMode, }: MfaVerifyPageProps): import("react").JSX.Element;
export default MfaVerifyPage;
//# sourceMappingURL=MfaVerifyPage.d.ts.map
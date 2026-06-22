export interface MfaVerifyPageProps {
    onVerify: (code: string) => Promise<void>;
    onVerifyBackup: (code: string) => Promise<void>;
    error?: string | null;
}
export declare function MfaVerifyPage({ onVerify, onVerifyBackup, error, }: MfaVerifyPageProps): import("react").JSX.Element;
export default MfaVerifyPage;
//# sourceMappingURL=MfaVerifyPage.d.ts.map
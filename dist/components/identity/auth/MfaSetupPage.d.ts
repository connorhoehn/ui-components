export interface MfaSetupPageProps {
    onSetup: (deviceName: string) => Promise<{
        deviceId: string;
        qrCode: string;
        secret: string;
        backupCodes: string[];
    }>;
    onVerify: (deviceId: string, code: string) => Promise<{
        success: boolean;
        backupCodes?: string[];
    }>;
    onComplete: () => void;
    userEmail?: string;
}
export declare function MfaSetupPage({ onSetup, onVerify, onComplete, userEmail, }: MfaSetupPageProps): import("react").JSX.Element;
export default MfaSetupPage;
//# sourceMappingURL=MfaSetupPage.d.ts.map
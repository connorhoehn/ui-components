export interface MfaDevice {
    deviceId: string;
    deviceName: string;
    deviceType: string;
    isVerified: boolean;
    createdAt: string;
    lastUsed?: string;
}
export interface MfaDashboardPageProps {
    devices: MfaDevice[];
    userEmail?: string;
    mfaEnabled: boolean;
    onAddDevice: () => void;
    onRenameDevice: (deviceId: string, newName: string) => Promise<void>;
    onRemoveDevice: (deviceId: string) => Promise<void>;
    loading?: boolean;
}
export declare function MfaDashboardPage({ devices, userEmail, mfaEnabled, onAddDevice, onRenameDevice, onRemoveDevice, loading, }: MfaDashboardPageProps): import("react/jsx-runtime").JSX.Element;
export default MfaDashboardPage;
//# sourceMappingURL=MfaDashboardPage.d.ts.map
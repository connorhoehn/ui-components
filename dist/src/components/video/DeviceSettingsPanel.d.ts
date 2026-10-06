import { type ReactNode } from 'react';
export interface DevicePreferences {
    microphoneId?: string;
    cameraId?: string;
    speakerId?: string;
}
export interface DeviceSettingsPanelProps {
    value: DevicePreferences;
    onChange: (next: DevicePreferences) => void;
    /** Hide the camera row for an audio-only call. */
    showCamera?: boolean;
    /** Extra rows the host wants under the pickers (a level meter, a note). */
    children?: ReactNode;
    'data-testid'?: string;
}
export declare function DeviceSettingsPanel({ value, onChange, showCamera, children, 'data-testid': testId, }: DeviceSettingsPanelProps): import("react").JSX.Element;
export default DeviceSettingsPanel;
//# sourceMappingURL=DeviceSettingsPanel.d.ts.map
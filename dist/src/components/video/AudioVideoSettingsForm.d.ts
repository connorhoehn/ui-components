import type { DeviceOption, MediaPermission } from './DeviceToggleSelect';
export interface AudioVideoSettings {
    microphoneId?: string;
    speakerId?: string;
    cameraId?: string;
    noiseSuppression: boolean;
    echoCancellation: boolean;
    autoGainControl: boolean;
    /** 0..1 local playback gain. */
    volume: number;
    mirrorPreview: boolean;
    quality: 'auto' | '720p' | '480p' | '360p';
    frameRate: 'auto' | 30 | 15;
    rememberDevices: boolean;
}
export interface AudioVideoSettingsFormProps {
    value: AudioVideoSettings;
    onChange: (next: AudioVideoSettings) => void;
    devices: {
        microphones: DeviceOption[];
        speakers: DeviceOption[];
        cameras: DeviceOption[];
    };
    permission: {
        microphone: MediaPermission;
        camera: MediaPermission;
    };
    /** 0..1 live level of the selected microphone. */
    micLevel: number;
    previewStream: MediaStream | null;
    cameraOn: boolean;
    /** `HTMLMediaElement.setSinkId` exists. False (Safari) hides the Speakers select; the volume row stays. */
    speakerSelectionSupported: boolean;
    onTestMic: () => void | Promise<void>;
    onTestSound: () => void | Promise<void>;
    testMicState?: 'idle' | 'recording' | 'playing';
    /** Who the preview placeholder shows when the camera is off. */
    selfName?: string;
    selfAvatarUrl?: string;
    className?: string;
    'data-testid'?: string;
}
export declare function AudioVideoSettingsForm({ value, onChange, devices, permission, micLevel, previewStream, cameraOn, speakerSelectionSupported, onTestMic, onTestSound, testMicState, selfName, selfAvatarUrl, className, 'data-testid': testId, }: AudioVideoSettingsFormProps): import("react").JSX.Element;
export default AudioVideoSettingsForm;
//# sourceMappingURL=AudioVideoSettingsForm.d.ts.map
import type { AudioVideoSettings, AudioVideoSettingsFormProps } from '../../components/video/AudioVideoSettingsForm';
import type { DeviceOption, MediaPermission } from '../../components/video/DeviceToggleSelect';
/** Minimum shape of RM `useMediaDevices()`. */
export interface RMMediaDevicesSource {
    microphones: DeviceOption[];
    cameras: DeviceOption[];
    speakers: DeviceOption[];
    permission: {
        microphone: MediaPermission;
        camera: MediaPermission;
    };
    speakerSelectionSupported: boolean;
}
/** Minimum shape of RM `useAudioVideoSettings()`. */
export interface RMAudioVideoSettingsSource {
    settings: AudioVideoSettings;
    update(patch: Partial<AudioVideoSettings>): void;
    previewStream: MediaStream | null;
    micLevel: number;
    testMic(): Promise<void>;
    testSound(): Promise<void>;
    testMicState: 'idle' | 'recording' | 'playing';
}
export interface WrappedAudioVideoSettingsFormProps extends Pick<AudioVideoSettingsFormProps, 'selfName' | 'selfAvatarUrl' | 'className' | 'data-testid'> {
    devices: RMMediaDevicesSource;
    settings: RMAudioVideoSettingsSource;
    /** Whether the viewer's camera is on (the preview shows "Camera is off" otherwise). */
    cameraOn: boolean;
}
export declare function WrappedAudioVideoSettingsForm({ devices, settings, cameraOn, ...rest }: WrappedAudioVideoSettingsFormProps): import("react").JSX.Element;
export default WrappedAudioVideoSettingsForm;
//# sourceMappingURL=WrappedAudioVideoSettingsForm.d.ts.map
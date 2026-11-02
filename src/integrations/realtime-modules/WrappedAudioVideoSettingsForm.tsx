// ui-components/src/integrations/realtime-modules/WrappedAudioVideoSettingsForm.tsx
//
// AudioVideoSettingsForm bound to realtime-modules' device hooks:
//   devices  = useMediaDevices()        — the lists, permission, setSinkId support
//   settings = useAudioVideoSettings()  — the chosen values, level, preview, tests
// Typed structurally (the minimum each hook must return), the same way
// WrappedMediaEffectsTray types useMediaEffects(), so this adapter compiles
// against any RM version that returns these fields.

import { AudioVideoSettingsForm } from '../../components/video/AudioVideoSettingsForm';
import type {
  AudioVideoSettings,
  AudioVideoSettingsFormProps,
} from '../../components/video/AudioVideoSettingsForm';
import type { DeviceOption, MediaPermission } from '../../components/video/DeviceToggleSelect';

/** Minimum shape of RM `useMediaDevices()`. */
export interface RMMediaDevicesSource {
  microphones: DeviceOption[];
  cameras: DeviceOption[];
  speakers: DeviceOption[];
  permission: { microphone: MediaPermission; camera: MediaPermission };
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

export interface WrappedAudioVideoSettingsFormProps
  extends Pick<AudioVideoSettingsFormProps, 'selfName' | 'selfAvatarUrl' | 'layout' | 'previewControls' | 'className' | 'data-testid'> {
  devices: RMMediaDevicesSource;
  settings: RMAudioVideoSettingsSource;
  /** Whether the viewer's camera is on (the preview shows "Camera is off" otherwise). */
  cameraOn: boolean;
}

export function WrappedAudioVideoSettingsForm({
  devices,
  settings,
  cameraOn,
  ...rest
}: WrappedAudioVideoSettingsFormProps) {
  return (
    <AudioVideoSettingsForm
      {...rest}
      value={settings.settings}
      onChange={(next) => settings.update(next)}
      devices={{ microphones: devices.microphones, speakers: devices.speakers, cameras: devices.cameras }}
      permission={devices.permission}
      micLevel={settings.micLevel}
      previewStream={settings.previewStream}
      cameraOn={cameraOn}
      speakerSelectionSupported={devices.speakerSelectionSupported}
      onTestMic={() => settings.testMic()}
      onTestSound={() => settings.testSound()}
      testMicState={settings.testMicState}
    />
  );
}

export default WrappedAudioVideoSettingsForm;

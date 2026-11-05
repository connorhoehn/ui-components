// ui-components/src/components/video/AudioVideoSettingsForm.tsx
//
// The "Audio & video" tab of call settings: microphone (with a live input
// level, Test mic and noise reduction), speakers (with volume and Test
// sound), camera (with a mirrored preview), quality, an Advanced disclosure
// and "Use these devices next time". Controlled and immediate — every change
// goes straight to `onChange`, which is why the drawer has a Done button and
// no Cancel.
//
// The successor to DeviceSettingsPanel (three bare selects), which stays for
// its existing callers. Device lists, permission, level and the preview
// stream come from RM `useMediaDevices` / `useAudioVideoSettings`; see
// WrappedAudioVideoSettingsForm for the binding.

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Select } from '../forms/Select';
import { Checkbox } from '../forms/Checkbox';
import Switch from '../shared/Switch';
import { InlineAlert } from '../shared/InlineAlert';
import { Avatar } from '../shared/Avatar';
import SkeletonCard from '../shared/SkeletonCard';
import { Button } from '../ui/Button';
import { Disclosure } from '../ui/Disclosure';
import { StreamVideo } from './StreamVideo';
import { AudioLevelMeter } from './AudioLevelMeter';
import { VolumeSlider } from './VolumeSlider';
import type { DeviceOption, MediaPermission } from './DeviceToggleSelect';
import { PreJoinDeviceSetup } from './PreJoinDeviceSetup';

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
  devices: { microphones: DeviceOption[]; speakers: DeviceOption[]; cameras: DeviceOption[] };
  permission: { microphone: MediaPermission; camera: MediaPermission };
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
  /** Two-column device setup; the default stack remains the call-settings form. */
  layout?: 'stack' | 'prejoin';
  /** Capture and effects actions under the pre-join preview. */
  previewControls?: ReactNode;
  className?: string;
  'data-testid'?: string;
}

const QUALITY_OPTIONS = [
  { value: 'auto', label: 'Auto' },
  { value: '720p', label: '720p' },
  { value: '480p', label: '480p' },
  { value: '360p', label: '360p' },
];

const FRAME_RATE_OPTIONS = [
  { value: 'auto', label: 'Auto' },
  { value: '30', label: '30 fps' },
  { value: '15', label: '15 fps' },
];

function deviceOptions(list: DeviceOption[], none: string) {
  return list.length
    ? list.map((d) => ({ value: d.deviceId, label: d.label }))
    : [{ value: '', label: none, disabled: true }];
}

function Section({ children, divided = true, className }: { children: ReactNode; divided?: boolean; className?: string }) {
  return (
    <section data-ui-part="" className={cn('flex flex-col gap-2.5 py-3.5 first:pt-0', divided && 'border-b border-border', className)}>
      {children}
    </section>
  );
}

function FieldLabel({ children, htmlFor }: { children: ReactNode; htmlFor?: string }) {
  return (
    <label htmlFor={htmlFor} className="text-[15px] font-semibold text-text-primary">
      {children}
    </label>
  );
}

function CheckRow({
  checked,
  onChange,
  children,
  testId,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  children: ReactNode;
  testId: string;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm text-text-primary">
      <Checkbox checked={checked} onChange={(v) => onChange(v)} className="h-[18px] w-[18px]" data-testid={testId} />
      {children}
    </label>
  );
}

export function AudioVideoSettingsForm({
  value,
  onChange,
  devices,
  permission,
  micLevel,
  previewStream,
  cameraOn,
  speakerSelectionSupported,
  onTestMic,
  onTestSound,
  testMicState = 'idle',
  selfName = 'You',
  selfAvatarUrl,
  layout = 'stack',
  previewControls,
  className,
  'data-testid': testId = 'audio-video-settings-form',
}: AudioVideoSettingsFormProps) {
  const set = (patch: Partial<AudioVideoSettings>) => onChange({ ...value, ...patch });
  const micDenied = permission.microphone === 'denied';
  const camDenied = permission.camera === 'denied';
  const selectClass = 'w-full h-9 text-sm';
  const testMicLabel = testMicState === 'recording' ? 'Recording…' : testMicState === 'playing' ? 'Playing…' : 'Test mic';

  let preview: ReactNode;
  if (camDenied) {
    preview = null;
  } else if (!cameraOn) {
    preview = (
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-sm text-white/75" data-testid="settings-preview-off">
        <Avatar name={selfName} size={48} {...(selfAvatarUrl ? { src: selfAvatarUrl } : {})} color="rgba(255,255,255,0.2)" showTitle={false} />
        Camera is off
      </div>
    );
  } else if (!previewStream) {
    preview = (
      <div className="h-full w-full [&>*]:!h-full" data-testid="settings-preview-loading">
        <SkeletonCard height="100%" rounded="lg" />
      </div>
    );
  } else {
    preview = (
      <StreamVideo
        stream={previewStream}
        muted
        className={cn('h-full w-full object-cover', value.mirrorPreview && 'scale-x-[-1]')}
      />
    );
  }

  if (layout === 'prejoin') return <PreJoinDeviceSetup value={value} onChange={onChange} devices={devices} permission={permission}
    micLevel={micLevel} previewStream={previewStream} cameraOn={cameraOn} speakerSelectionSupported={speakerSelectionSupported}
    onTestMic={onTestMic} onTestSound={onTestSound} testMicState={testMicState} preview={preview} previewControls={previewControls}
    selfName={selfName} selfAvatarUrl={selfAvatarUrl} className={className} data-testid={testId} />;

  return (
    <div className={cn('flex flex-col', className)} data-testid={testId} data-layout={layout}>
      <Section>
        <FieldLabel htmlFor={`${testId}-mic`}>Microphone</FieldLabel>
        {micDenied ? (
          <InlineAlert tone="error" data-testid="settings-mic-denied">
            Microphone blocked — allow it in the browser&apos;s site settings
          </InlineAlert>
        ) : (
          <Select
              chevron="custom"
            id={`${testId}-mic`}
            value={value.microphoneId ?? devices.microphones[0]?.deviceId ?? ''}
            onChange={(e) => set({ microphoneId: e.target.value })}
            options={deviceOptions(devices.microphones, 'No microphone found')}
            disabled={devices.microphones.length === 0}
            className={selectClass}
            data-testid="settings-mic-select"
          />
        )}
        <div className="flex items-center gap-3">
          <span className="w-24 shrink-0 text-sm text-text-primary">Input level</span>
          <AudioLevelMeter level={micLevel} disabled={micDenied} data-testid="settings-mic-level" />
          <Button
            variant="ghost"
            onClick={() => void onTestMic()}
            disabled={micDenied || testMicState !== 'idle'}
            data-testid="settings-test-mic"
            className="ml-auto shrink-0"
          >
            {testMicLabel}
          </Button>
        </div>
        <div className="flex items-center justify-between gap-3">
          <span id={`${testId}-noise`} className="text-sm text-text-primary">
            Noise reduction
          </span>
          <Switch
            checked={value.noiseSuppression}
            onChange={(v) => set({ noiseSuppression: v })}
            disabled={micDenied}
            aria-labelledby={`${testId}-noise`}
            data-testid="settings-noise"
          />
        </div>
      </Section>

      <Section>
        {speakerSelectionSupported && (
          <>
            <FieldLabel htmlFor={`${testId}-speaker`}>Speakers</FieldLabel>
            <Select
              chevron="custom"
              id={`${testId}-speaker`}
              value={value.speakerId ?? devices.speakers[0]?.deviceId ?? ''}
              onChange={(e) => set({ speakerId: e.target.value })}
              options={deviceOptions(devices.speakers, 'No speakers found')}
              disabled={devices.speakers.length === 0}
              className={selectClass}
              data-testid="settings-speaker-select"
            />
          </>
        )}
        {!speakerSelectionSupported && <FieldLabel>Volume</FieldLabel>}
        <VolumeSlider value={value.volume} onChange={(v) => set({ volume: v })} onTest={() => void onTestSound()} />
      </Section>

      <Section>
        <FieldLabel htmlFor={`${testId}-camera`}>Camera</FieldLabel>
        {camDenied ? (
          <InlineAlert tone="error" data-testid="settings-camera-denied">
            Camera blocked — allow it in the browser&apos;s site settings
          </InlineAlert>
        ) : (
          <>
            <Select
              chevron="custom"
              id={`${testId}-camera`}
              value={value.cameraId ?? devices.cameras[0]?.deviceId ?? ''}
              onChange={(e) => set({ cameraId: e.target.value })}
              options={deviceOptions(devices.cameras, 'No camera found')}
              disabled={devices.cameras.length === 0}
              className={selectClass}
              data-testid="settings-camera-select"
            />
            <div
              className={'relative aspect-[338/156] w-full overflow-hidden rounded-lg bg-video-stage'}
              data-testid="settings-preview"
              data-mirrored={value.mirrorPreview ? 'true' : 'false'}
            >
              {preview}
              <span className="absolute bottom-2 left-2 rounded bg-black/65 px-2 py-0.5 text-xs font-semibold text-white">
                Your preview
              </span>
            </div>
          </>
        )}
        <CheckRow checked={value.mirrorPreview} onChange={(v) => set({ mirrorPreview: v })} testId="settings-mirror">
          Mirror my preview
        </CheckRow>
        <div className="flex items-center justify-between gap-3">
          <label htmlFor={`${testId}-quality`} className="text-sm text-text-primary">
            Quality
          </label>
          <Select
              chevron="custom"
            id={`${testId}-quality`}
            value={value.quality}
            onChange={(e) => set({ quality: e.target.value as AudioVideoSettings['quality'] })}
            options={QUALITY_OPTIONS}
            className="h-9 w-full text-sm"
              wrapperClassName="w-32 shrink-0"
            data-testid="settings-quality"
          />
        </div>
      </Section>

      <Section className="py-1.5">
        <Disclosure
          summary="Advanced"
          variant="plain"
          density="compact"
          data-testid="settings-advanced"
          summaryClassName="text-[15px] font-medium text-text-primary"
          bodyClassName="flex flex-col gap-3 pt-3"
        >
          <div className="flex items-center justify-between gap-3">
            <span id={`${testId}-echo`} className="text-sm text-text-primary">Echo cancellation</span>
            <Switch
              checked={value.echoCancellation}
              onChange={(v) => set({ echoCancellation: v })}
              aria-labelledby={`${testId}-echo`}
              data-testid="settings-echo"
            />
          </div>
          <div className="flex items-center justify-between gap-3">
            <span id={`${testId}-agc`} className="text-sm text-text-primary">Auto gain control</span>
            <Switch
              checked={value.autoGainControl}
              onChange={(v) => set({ autoGainControl: v })}
              aria-labelledby={`${testId}-agc`}
              data-testid="settings-agc"
            />
          </div>
          <div className="flex items-center justify-between gap-3">
            <label htmlFor={`${testId}-fps`} className="text-sm text-text-primary">Frame rate</label>
            <Select
              chevron="custom"
              id={`${testId}-fps`}
              value={String(value.frameRate)}
              onChange={(e) => {
                const v = e.target.value;
                set({ frameRate: v === 'auto' ? 'auto' : (Number(v) as 30 | 15) });
              }}
              options={FRAME_RATE_OPTIONS}
              className="h-9 w-full text-sm"
              wrapperClassName="w-32 shrink-0"
              data-testid="settings-frame-rate"
            />
          </div>
        </Disclosure>
      </Section>

      <Section divided={false} className="pt-2.5 pb-0">
        <CheckRow checked={value.rememberDevices} onChange={(v) => set({ rememberDevices: v })} testId="settings-remember">
          Use these devices next time
        </CheckRow>
      </Section>
    </div>
  );
}

export default AudioVideoSettingsForm;

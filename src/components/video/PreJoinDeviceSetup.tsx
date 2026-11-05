import type { ReactNode } from 'react';
import type { AudioVideoSettingsFormProps } from './AudioVideoSettingsForm';
import { Select } from '../forms/Select';
import { Button } from '../ui/Button';
import { Disclosure } from '../ui/Disclosure';
import Switch from '../shared/Switch';
import InlineAlert from '../shared/InlineAlert';
import { AudioLevelMeter } from './AudioLevelMeter';
import { VolumeSlider } from './VolumeSlider';
import { MicIcon, VideoIcon, SpeakerIcon } from './MediaIcons';

/** One responsive green-room form for the shared call host. */
export function PreJoinDeviceSetup({ value, onChange, devices, permission, micLevel, cameraOn,
  speakerSelectionSupported, onTestMic, onTestSound, testMicState = 'idle', preview, previewControls,
  selfName = 'You', className, 'data-testid': testId = 'audio-video-settings-form',
}: AudioVideoSettingsFormProps & { preview: ReactNode }) {
  const set = (patch: Partial<typeof value>) => onChange({ ...value, ...patch });
  const device = (kind: 'camera' | 'microphone' | 'speaker', label: string, icon: ReactNode) => {
    const list = kind === 'camera' ? devices.cameras : kind === 'microphone' ? devices.microphones : devices.speakers;
    const key = kind === 'camera' ? 'cameraId' : kind === 'microphone' ? 'microphoneId' : 'speakerId';
    const blocked = kind !== 'speaker' && permission[kind] === 'denied';
    const id = kind === 'microphone' ? 'mic' : kind;
    return <div className="flex min-w-0 flex-col gap-2">
      <label htmlFor={`${testId}-${id}`} className="text-sm font-semibold text-text-primary">{label}</label>
      {blocked ? <InlineAlert tone="error" data-testid={`settings-${id}-denied`}>{label} blocked — allow it in the browser’s site settings</InlineAlert>
        : <Select id={`${testId}-${id}`} value={value[key] ?? list[0]?.deviceId ?? ''}
          onChange={event => set({ [key]: event.target.value })} disabled={!list.length}
          options={list.length ? list.map(item => ({ value: item.deviceId, label: item.label, icon })) : [{ value: '', label: `No ${kind} found`, disabled: true, icon }]}
          className="h-10 w-full min-w-0 bg-surface text-sm" data-testid={`settings-${id}-select`} />}
    </div>;
  };
  return <div className={`grid min-w-0 grid-cols-1 items-start gap-5 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] ${className ?? ''}`}
    data-testid={testId} data-layout="prejoin">
    <section data-ui-part="" className="flex min-w-0 flex-col gap-3" aria-label="Camera preview">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-video-stage"
        data-testid="settings-preview" data-mirrored={value.mirrorPreview ? 'true' : 'false'}>
        {preview}
        <span className="absolute bottom-3 left-3 max-w-[calc(100%-24px)] truncate rounded-md bg-black/65 px-2 py-1 text-xs font-medium text-white">{selfName} · Your preview</span>
      </div>
      <div role="group" aria-label="Preview controls" className="flex min-w-0 flex-wrap items-center gap-2" data-testid="prejoin-preview-controls">
        {previewControls}
        <Button size="sm" variant="secondary" aria-pressed={value.mirrorPreview} onClick={() => set({ mirrorPreview: !value.mirrorPreview })}
          data-testid="settings-mirror">Mirror</Button>
      </div>
      <span className="text-xs text-text-secondary">{cameraOn ? 'Your camera is on. This is how you’ll appear in the huddle.' : 'Your camera is off. You can turn it on when you’re ready.'}</span>
    </section>
    <section data-ui-part="" className="flex min-w-0 flex-col gap-4" aria-label="Device setup">
      {device('camera', 'Camera', <VideoIcon size={16} />)}
      <div className="flex min-w-0 flex-col gap-2">
        {device('microphone', 'Microphone', <MicIcon size={16} />)}
        <Disclosure summary="Microphone test & settings" variant="plain" density="compact" data-testid="settings-mic-test-panel"
          bodyClassName="flex min-w-0 flex-col gap-3 pt-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <AudioLevelMeter level={micLevel} disabled={permission.microphone === 'denied'} data-testid="settings-mic-level" />
            <Button size="sm" variant="secondary" onClick={() => void onTestMic()} disabled={permission.microphone === 'denied' || testMicState !== 'idle'} data-testid="settings-test-mic">
              {testMicState === 'recording' ? 'Recording…' : testMicState === 'playing' ? 'Playing…' : 'Test mic'}
            </Button>
          </div>
          <div className="flex items-center justify-between gap-3 text-sm text-text-secondary">
            <span>Noise reduction</span><Switch checked={value.noiseSuppression} onChange={noiseSuppression => set({ noiseSuppression })} aria-label="Noise reduction" data-testid="settings-noise" />
          </div>
        </Disclosure>
      </div>
      <div className="flex min-w-0 flex-col gap-2">
        {speakerSelectionSupported && device('speaker', 'Speakers', <SpeakerIcon size={16} />)}
        <Disclosure summary="Speaker test & volume" variant="plain" density="compact" data-testid="settings-speaker-test-panel" bodyClassName="pt-3">
          <VolumeSlider value={value.volume} onChange={volume => set({ volume })} onTest={() => void onTestSound()} />
        </Disclosure>
      </div>
      <Disclosure summary="Advanced settings" variant="plain" density="compact" data-testid="settings-advanced" bodyClassName="flex min-w-0 flex-col gap-3 pt-3">
        <div className="flex items-center justify-between gap-3 text-sm text-text-secondary">
          <span>Echo cancellation</span><Switch checked={value.echoCancellation} onChange={echoCancellation => set({ echoCancellation })} aria-label="Echo cancellation" data-testid="settings-echo" />
        </div>
        <div className="flex items-center justify-between gap-3 text-sm text-text-secondary">
          <span>Auto gain control</span><Switch checked={value.autoGainControl} onChange={autoGainControl => set({ autoGainControl })} aria-label="Auto gain control" data-testid="settings-agc" />
        </div>
        <Select aria-label="Video quality" value={value.quality} onChange={event => set({ quality: event.target.value as typeof value.quality })}
          options={['auto', '720p', '480p', '360p'].map(v => ({ value: v, label: v === 'auto' ? 'Quality · Auto' : `Quality · ${v}` }))} className="w-full" data-testid="settings-quality" />
        <Select aria-label="Frame rate" value={String(value.frameRate)} onChange={event => set({ frameRate: event.target.value === 'auto' ? 'auto' : Number(event.target.value) as 15 | 30 })}
          options={['auto', '30', '15'].map(v => ({ value: v, label: v === 'auto' ? 'Frame rate · Auto' : `${v} fps` }))} className="w-full" data-testid="settings-frame-rate" />
      </Disclosure>
    </section>
  </div>;
}

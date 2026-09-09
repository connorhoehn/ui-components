// DeviceSettingsPanel — which microphone, camera and speaker a call uses.
//
// The "Devices" tab of CallSettingsDialog. Three pickers and a speaker test;
// the host owns the chosen ids (it persists them and applies them — the
// microphone and camera at acquisition, the speaker via `setSinkId` on every
// media element it renders). This panel knows nothing about calls: it lists,
// it lets the person choose, it reports.
//
// The speaker picker is HIDDEN, not disabled, where the browser cannot route
// output (`canSelectSpeaker` false — Safari): a disabled control promises a
// capability the browser does not have.

import { useCallback, useRef, useState, type ReactNode } from 'react';
import { Select } from '../forms/Select';
import { Button } from '../ui/Button';
import { useMediaDevices } from '../../hooks/useMediaDevices';

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

/** A short tone through the chosen output, so "which speaker" is answerable by ear. */
function useSpeakerTest() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const play = useCallback(async (sinkId: string | undefined) => {
    if (typeof AudioContext === 'undefined') return;
    setPlaying(true);
    try {
      const ctx = new AudioContext();
      const dest = ctx.createMediaStreamDestination();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.value = 660;
      gain.gain.value = 0.08;
      osc.connect(gain).connect(dest);
      const el = audioRef.current ?? document.createElement('audio');
      audioRef.current = el;
      el.srcObject = dest.stream;
      const sinkable = el as HTMLAudioElement & { setSinkId?: (id: string) => Promise<void> };
      if (sinkId && sinkable.setSinkId) await sinkable.setSinkId(sinkId).catch(() => undefined);
      osc.start();
      await el.play().catch(() => undefined);
      await new Promise((r) => setTimeout(r, 700));
      osc.stop();
      el.pause();
      el.srcObject = null;
      await ctx.close();
    } finally {
      setPlaying(false);
    }
  }, []);
  return { play, playing };
}

export function DeviceSettingsPanel({
  value,
  onChange,
  showCamera = true,
  children,
  'data-testid': testId = 'device-settings',
}: DeviceSettingsPanelProps) {
  const devices = useMediaDevices();
  const { play, playing } = useSpeakerTest();

  if (!devices.supported) {
    return (
      <p data-testid={`${testId}-unsupported`} className="m-0 text-sm text-text-tertiary">
        This browser does not let a page choose its devices.
      </p>
    );
  }

  const options = (list: { deviceId: string; label: string }[], current: string | undefined) => [
    { value: '', label: 'System default' },
    // A remembered device that is not plugged in right now is kept as its own
    // option rather than silently reset: the person chose it, and it may be
    // back tomorrow.
    ...(current && !list.some((d) => d.deviceId === current) ? [{ value: current, label: 'Remembered device (not connected)' }] : []),
    ...list.map((d) => ({ value: d.deviceId, label: d.label })),
  ];

  return (
    <div data-testid={testId} className="flex flex-col gap-3">
      {devices.labelsHidden ? (
        <p data-testid={`${testId}-labels-hidden`} className="m-0 text-xs text-text-tertiary">
          Device names appear once the browser has been allowed to use your microphone or camera.
        </p>
      ) : null}
      <label className="flex flex-col gap-1 text-xs font-semibold text-text-secondary">
        Microphone
        <Select
          size="sm"
          data-testid={`${testId}-microphone`}
          value={value.microphoneId ?? ''}
          onChange={(e) => onChange({ ...value, microphoneId: e.target.value || undefined })}
          options={options(devices.microphones, value.microphoneId)}
        />
      </label>
      {showCamera ? (
        <label className="flex flex-col gap-1 text-xs font-semibold text-text-secondary">
          Camera
          <Select
            size="sm"
            data-testid={`${testId}-camera`}
            value={value.cameraId ?? ''}
            onChange={(e) => onChange({ ...value, cameraId: e.target.value || undefined })}
            options={options(devices.cameras, value.cameraId)}
          />
        </label>
      ) : null}
      {devices.canSelectSpeaker ? (
        <label className="flex flex-col gap-1 text-xs font-semibold text-text-secondary">
          Speaker
          <span className="flex items-center gap-2">
            <Select
              size="sm"
              data-testid={`${testId}-speaker`}
              value={value.speakerId ?? ''}
              onChange={(e) => onChange({ ...value, speakerId: e.target.value || undefined })}
              options={options(devices.speakers, value.speakerId)}
              className="min-w-0 flex-1"
            />
            <Button variant="ghost" size="sm" disabled={playing} onClick={() => void play(value.speakerId)} data-testid={`${testId}-speaker-test`}>
              {playing ? 'Playing…' : 'Test'}
            </Button>
          </span>
        </label>
      ) : null}
      {children}
    </div>
  );
}

export default DeviceSettingsPanel;

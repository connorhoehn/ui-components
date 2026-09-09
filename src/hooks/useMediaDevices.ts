// useMediaDevices — the microphones, cameras and speakers this browser can see.
//
// Why a hook and not a one-shot call: the list CHANGES — a headset is plugged
// in mid-call, Bluetooth connects, a webcam is unplugged — and the browser
// says so with `devicechange`. It also changes SHAPE: before the person has
// granted a media permission, `enumerateDevices` answers with devices whose
// `label` is empty, so a picker built from the first answer shows "Microphone",
// "Microphone", "Microphone". Re-enumerating after permission is what turns
// those into names, and this hook does it on `devicechange` and on demand.
//
// Speaker selection (`audiooutput`) is only enumerable where the browser
// supports `HTMLMediaElement.setSinkId` — Chromium, not Safari — so
// `canSelectSpeaker` is exposed and a picker should hide rather than disable.

import { useCallback, useEffect, useState } from 'react';

export interface MediaDeviceOption {
  deviceId: string;
  label: string;
  kind: MediaDeviceKind;
}

export interface MediaDevices {
  microphones: MediaDeviceOption[];
  cameras: MediaDeviceOption[];
  speakers: MediaDeviceOption[];
  /** True until the first enumeration has answered. */
  loading: boolean;
  /** False where `enumerateDevices` does not exist (insecure context, SSR). */
  supported: boolean;
  /** False where the browser cannot route audio to a chosen output. */
  canSelectSpeaker: boolean;
  /** True when at least one device came back without a label — permission not yet granted. */
  labelsHidden: boolean;
  refresh: () => Promise<void>;
}

function fallbackLabel(kind: MediaDeviceKind, index: number): string {
  const noun = kind === 'audioinput' ? 'Microphone' : kind === 'videoinput' ? 'Camera' : 'Speaker';
  return `${noun} ${index + 1}`;
}

export function useMediaDevices(): MediaDevices {
  const supported = typeof navigator !== 'undefined' && !!navigator.mediaDevices?.enumerateDevices;
  const canSelectSpeaker =
    typeof HTMLMediaElement !== 'undefined' && typeof (HTMLMediaElement.prototype as unknown as { setSinkId?: unknown }).setSinkId === 'function';
  const [state, setState] = useState<Pick<MediaDevices, 'microphones' | 'cameras' | 'speakers' | 'loading' | 'labelsHidden'>>({
    microphones: [], cameras: [], speakers: [], loading: supported, labelsHidden: false,
  });

  const refresh = useCallback(async () => {
    if (!supported) return;
    try {
      const all = await navigator.mediaDevices.enumerateDevices();
      const byKind = (kind: MediaDeviceKind) =>
        all.filter((d) => d.kind === kind && d.deviceId !== '')
          .map((d, i) => ({ deviceId: d.deviceId, kind, label: d.label || fallbackLabel(kind, i) }));
      setState({
        microphones: byKind('audioinput'),
        cameras: byKind('videoinput'),
        speakers: canSelectSpeaker ? byKind('audiooutput') : [],
        loading: false,
        labelsHidden: all.some((d) => d.deviceId !== '' && !d.label),
      });
    } catch {
      setState((s) => ({ ...s, loading: false }));
    }
  }, [supported, canSelectSpeaker]);

  useEffect(() => {
    if (!supported) return;
    void refresh();
    const md = navigator.mediaDevices;
    md.addEventListener?.('devicechange', refresh);
    return () => { md.removeEventListener?.('devicechange', refresh); };
  }, [supported, refresh]);

  return { ...state, supported, canSelectSpeaker, refresh };
}

export default useMediaDevices;

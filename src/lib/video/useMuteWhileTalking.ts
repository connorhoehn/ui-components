// useMuteWhileTalking — detect "user is talking while muted" and surface
// a nag toast. Runs a single Web Audio analyzer on the local mic track,
// debounced so brief breaths/coughs don't fire. Only active when
// `isMuted === true` AND `localStream` has a live audio track.
//
// Single shared AudioContext (same singleton pattern as
// useActiveSpeaker) so this doesn't fight for browser context slots.

import { useEffect, useState } from 'react';

interface UseMuteWhileTalkingOptions {
  localStream: MediaStream | null;
  isMuted: boolean;
  /** dB threshold for "talking". Default -45 — well above ambient. */
  threshold?: number;
  /** Sustained talking duration (ms) before the toast fires. Default 1500. */
  triggerMs?: number;
  /** Cool-down between toast fires (ms). Default 6000. */
  cooldownMs?: number;
}

let sharedAudioContext: AudioContext | null = null;
function getSharedAudioContext(): AudioContext | null {
  if (sharedAudioContext) return sharedAudioContext;
  try {
    sharedAudioContext = new AudioContext();
    return sharedAudioContext;
  } catch { return null; }
}

export function useMuteWhileTalking({
  localStream,
  isMuted,
  threshold = -45,
  triggerMs = 1500,
  cooldownMs = 6000,
}: UseMuteWhileTalkingOptions): boolean {
  const [showNag, setShowNag] = useState(false);

  useEffect(() => {
    if (!isMuted || !localStream) return;
    const audioTracks = localStream.getAudioTracks().filter((t) => t.readyState === 'live');
    if (audioTracks.length === 0) return;

    const ctx = getSharedAudioContext();
    if (!ctx) return;

    let source: MediaStreamAudioSourceNode;
    let analyser: AnalyserNode;
    try {
      source = ctx.createMediaStreamSource(localStream);
      analyser = ctx.createAnalyser();
      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = 0.6;
      source.connect(analyser);
    } catch {
      // Stream already connected elsewhere in StrictMode double-mount.
      return;
    }

    let talkingSinceMs: number | null = null;
    let lastFiredMs = 0;
    let cancelled = false;
    // Handle for the auto-dismiss timer scheduled from inside the interval
    // below. It is nested one level down, so the effect cleanup has to hold
    // its handle explicitly or it outlives the unmount.
    let dismissTimeout: ReturnType<typeof setTimeout> | null = null;
    const data = new Float32Array(analyser.frequencyBinCount);

    const interval = setInterval(() => {
      if (cancelled) return;
      analyser.getFloatTimeDomainData(data);
      let sum = 0;
      for (let i = 0; i < data.length; i++) sum += data[i] * data[i];
      const db = 20 * Math.log10(Math.sqrt(sum / data.length));
      const now = Date.now();
      if (db > threshold) {
        if (talkingSinceMs == null) talkingSinceMs = now;
        if (now - talkingSinceMs >= triggerMs && now - lastFiredMs > cooldownMs) {
          setShowNag(true);
          lastFiredMs = now;
          // Auto-dismiss after 3s.
          if (dismissTimeout !== null) clearTimeout(dismissTimeout);
          dismissTimeout = setTimeout(() => {
            dismissTimeout = null;
            if (!cancelled) setShowNag(false);
          }, 3000);
          talkingSinceMs = null;
        }
      } else {
        talkingSinceMs = null;
      }
    }, 200);

    return () => {
      cancelled = true;
      clearInterval(interval);
      if (dismissTimeout !== null) {
        clearTimeout(dismissTimeout);
        dismissTimeout = null;
      }
      try { source.disconnect(); } catch { /* */ }
      try { analyser.disconnect(); } catch { /* */ }
    };
  }, [localStream, isMuted, threshold, triggerMs, cooldownMs]);

  // When user unmutes, dismiss the nag immediately.
  useEffect(() => {
    if (!isMuted) setShowNag(false);
  }, [isMuted]);

  return showNag;
}

/**
 * useActiveSpeaker — detects the loudest currently-speaking participant
 * via Web Audio API analysis of each MediaStream.
 *
 * Wave 7 refactor: previously created one `AudioContext` per
 * participant, which (a) Chrome warns about past 6 contexts and (b)
 * hits a hard browser limit around 25. Now uses a SINGLE shared
 * AudioContext + per-participant `MediaStreamAudioSourceNode →
 * AnalyserNode`. Drops N contexts → 1 with no semantic change.
 */

import { useEffect, useState } from 'react';

interface ParticipantWithStreams {
  participantId: string;
  streams: MediaStream[];
}

interface UseActiveSpeakerOptions {
  participants: ParticipantWithStreams[];
  threshold?: number;
  smoothingTimeConstant?: number;
  pollIntervalMs?: number;
}

let sharedAudioContext: AudioContext | null = null;
function getSharedAudioContext(): AudioContext | null {
  if (sharedAudioContext) return sharedAudioContext;
  try {
    sharedAudioContext = new AudioContext();
    return sharedAudioContext;
  } catch {
    return null;
  }
}

export function useActiveSpeaker({
  participants,
  threshold = -40,
  smoothingTimeConstant = 0.8,
  pollIntervalMs = 200,
}: UseActiveSpeakerOptions) {
  const [activeSpeakerId, setActiveSpeakerId] = useState<string | null>(null);

  useEffect(() => {
    const ctx = getSharedAudioContext();
    if (!ctx) return;
    // Buffer is allocated once per analyser rather than once per poll tick:
    // at 5Hz × N participants the old `new Float32Array(...)` inside the
    // interval churned N×5 short-lived typed arrays per second purely for GC.
    const analyserMap = new Map<
      string,
      { analyser: AnalyserNode; buffer: Float32Array<ArrayBuffer> }
    >();
    const sourceMap = new Map<string, MediaStreamAudioSourceNode>();

    for (const p of participants) {
      const stream = p.streams[0];
      if (!stream || stream.getAudioTracks().length === 0) continue;
      try {
        const source = ctx.createMediaStreamSource(stream);
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 512;
        analyser.smoothingTimeConstant = smoothingTimeConstant;
        source.connect(analyser);
        analyserMap.set(p.participantId, {
          analyser,
          buffer: new Float32Array(analyser.frequencyBinCount),
        });
        sourceMap.set(p.participantId, source);
      } catch {
        // Most common: stream already connected in StrictMode double-mount.
      }
    }

    const intervalId = setInterval(() => {
      let loudestId: string | null = null;
      let maxDb = threshold;
      analyserMap.forEach(({ analyser, buffer: data }, pid) => {
        analyser.getFloatTimeDomainData(data);
        let sumSquares = 0;
        for (let i = 0; i < data.length; i++) sumSquares += data[i] * data[i];
        const rms = Math.sqrt(sumSquares / data.length);
        const db = 20 * Math.log10(rms);
        if (db > maxDb) { maxDb = db; loudestId = pid; }
      });
      setActiveSpeakerId(loudestId);
    }, pollIntervalMs);

    return () => {
      clearInterval(intervalId);
      sourceMap.forEach((s) => { try { s.disconnect(); } catch { /* */ } });
      analyserMap.forEach(({ analyser }) => { try { analyser.disconnect(); } catch { /* */ } });
    };
  }, [participants, threshold, smoothingTimeConstant, pollIntervalMs]);

  return { activeSpeakerId };
}

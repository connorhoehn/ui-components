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
    const analyserMap = new Map<string, AnalyserNode>();
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
        analyserMap.set(p.participantId, analyser);
        sourceMap.set(p.participantId, source);
      } catch {
        // Most common: stream already connected in StrictMode double-mount.
      }
    }

    const intervalId = setInterval(() => {
      let loudestId: string | null = null;
      let maxDb = threshold;
      analyserMap.forEach((analyser, pid) => {
        const data = new Float32Array(analyser.frequencyBinCount);
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
      analyserMap.forEach((a) => { try { a.disconnect(); } catch { /* */ } });
    };
  }, [participants, threshold, smoothingTimeConstant, pollIntervalMs]);

  return { activeSpeakerId };
}

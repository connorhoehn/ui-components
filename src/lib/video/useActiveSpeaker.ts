/**
 * useActiveSpeaker — detects the loudest currently-speaking participant
 * via Web Audio API analysis of each MediaStream.
 *
 * Wave 7 refactor: previously created one `AudioContext` per
 * participant, which (a) Chrome warns about past 6 contexts and (b)
 * hits a hard browser limit around 25. Now uses a SINGLE shared
 * AudioContext + per-participant `MediaStreamAudioSourceNode →
 * AnalyserNode`. Drops N contexts → 1 with no semantic change.
 *
 * Hold (2.407.7): with several people talking at once the loudest voice
 * changes on nearly every poll, so the speaking ring used to jump every
 * 200 ms. The active speaker now changes only when a DIFFERENT participant
 * has been the loudest on every poll for at least `holdMs` (default 600)
 * and, on each of those polls, louder than the current speaker by more than
 * `marginDb` (default 3). Silence is held the same way: the ring clears once
 * nobody has been above `threshold` for `holdMs`. The first speaker after
 * silence takes the ring at once. `holdMs: 0` is the old behaviour — the
 * loudest voice on every poll.
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
  /**
   * How long (ms) a different participant must stay the loudest before the
   * ring moves to them — and how long silence must last before it clears.
   * Default 600. `0` switches on every poll (the pre-2.407.7 behaviour).
   */
  holdMs?: number;
  /**
   * How much louder (dB) than the current speaker a challenger must be, on
   * every poll of the hold, to count. Default 3. Ignored when `holdMs` is 0.
   */
  marginDb?: number;
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
  holdMs = 600,
  marginDb = 3,
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

    // The held speaker and the challenger, local to this analyser graph: a
    // rebuilt graph (new participants/streams) starts from no one.
    let current: string | null = null;
    let challenger: string | null | undefined;
    let challengerSince = 0;

    const intervalId = setInterval(() => {
      let loudestId: string | null = null;
      let maxDb = threshold;
      const levels = new Map<string, number>();
      analyserMap.forEach(({ analyser, buffer: data }, pid) => {
        analyser.getFloatTimeDomainData(data);
        let sumSquares = 0;
        for (let i = 0; i < data.length; i++) sumSquares += data[i] * data[i];
        const rms = Math.sqrt(sumSquares / data.length);
        const db = 20 * Math.log10(rms);
        levels.set(pid, db);
        if (db > maxDb) { maxDb = db; loudestId = pid; }
      });

      const take = (id: string | null) => {
        current = id;
        challenger = undefined;
        setActiveSpeakerId(id);
      };
      if (holdMs <= 0 || current === null) {
        take(loudestId);
        return;
      }
      if (loudestId === current) {
        challenger = undefined;
        return;
      }
      // Silence challenges like a person does; a person must also beat the
      // current speaker's level by the margin (a quiet current speaker — below
      // the threshold — reads as -Infinity, so anyone audible beats them).
      const currentDb = levels.get(current);
      const beats =
        loudestId === null ||
        maxDb > (currentDb != null && currentDb > threshold ? currentDb : -Infinity) + marginDb;
      if (!beats) {
        challenger = undefined;
        return;
      }
      const now = Date.now();
      if (challenger !== loudestId) {
        challenger = loudestId;
        challengerSince = now;
      }
      if (now - challengerSince >= holdMs) take(loudestId);
    }, pollIntervalMs);

    return () => {
      clearInterval(intervalId);
      sourceMap.forEach((s) => { try { s.disconnect(); } catch { /* */ } });
      analyserMap.forEach(({ analyser }) => { try { analyser.disconnect(); } catch { /* */ } });
    };
  }, [participants, threshold, smoothingTimeConstant, pollIntervalMs, holdMs, marginDb]);

  return { activeSpeakerId };
}

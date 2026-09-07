// useAudioLevel — a measured 0..1 loudness for a MediaStream, or null.
//
// Exists for the audio-only broadcast: a stage with no picture has to show the
// audience SOMETHING that moves, and the honest something is the actual audio.
// A decorative equaliser that dances at a fixed rate is a picture of a working
// stream, which is exactly the class of claim this surface keeps getting wrong.
//
// `null` is a first-class answer and means "cannot measure", not "silent":
//
//   * no Web Audio in this environment (jsdom, older embedded webviews);
//   * the stream carries no audio track;
//   * the AudioContext will not leave `suspended` — Chrome keeps it there
//     until a user gesture, and a meter pinned at zero would read as a dead
//     stream when the audio is fine.
//
// Callers render a static presentation on null rather than a flat meter.
//
// Analyser only: the stream is never connected to a destination, so this adds
// no audio path and cannot double up or silence what the <video> is playing.

import { useEffect, useRef, useState } from 'react';

/** How often the meter re-renders. ~12fps is plenty for five bars. */
const SAMPLE_INTERVAL_MS = 80;
/** Smoothing, so a single loud consonant does not spike the whole meter. */
const DECAY = 0.6;

export function useAudioLevel(stream: MediaStream | null | undefined): number | null {
  const [level, setLevel] = useState<number | null>(null);
  const levelRef = useRef(0);

  useEffect(() => {
    levelRef.current = 0;
    setLevel(null);
    if (!stream || typeof stream.getAudioTracks !== 'function') return;
    if (stream.getAudioTracks().length === 0) return;

    const Ctor: typeof AudioContext | undefined =
      typeof window === 'undefined'
        ? undefined
        : (window.AudioContext ?? (window as any).webkitAudioContext);
    if (!Ctor) return;

    let ctx: AudioContext;
    let source: MediaStreamAudioSourceNode;
    let analyser: AnalyserNode;
    try {
      ctx = new Ctor();
      analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      source = ctx.createMediaStreamSource(stream);
      source.connect(analyser);
    } catch {
      // Some browsers throw on a stream with no live audio track. Not an
      // error worth surfacing — the caller's fallback is fine.
      return;
    }
    // Best-effort: Chrome will refuse without a gesture, and the guard below
    // turns that into `null` rather than a meter stuck at zero.
    void ctx.resume?.().catch(() => { /* stays suspended; handled below */ });

    const bins = new Uint8Array(analyser.frequencyBinCount);
    const timer = setInterval(() => {
      if (ctx.state !== 'running') { setLevel(null); return; }
      analyser.getByteTimeDomainData(bins);
      // RMS around the 128 midpoint of unsigned 8-bit PCM.
      let sum = 0;
      for (let i = 0; i < bins.length; i++) {
        const d = (bins[i] - 128) / 128;
        sum += d * d;
      }
      const rms = Math.sqrt(sum / bins.length);
      // Speech RMS lives well under 0.3; scale so ordinary talking fills the
      // meter rather than nudging the first bar.
      const scaled = Math.min(1, rms * 3.5);
      const next = Math.max(scaled, levelRef.current * DECAY);
      levelRef.current = next;
      setLevel(next);
    }, SAMPLE_INTERVAL_MS);

    return () => {
      clearInterval(timer);
      try { source.disconnect(); } catch { /* teardown is best-effort */ }
      try { analyser.disconnect(); } catch { /* teardown is best-effort */ }
      try { void ctx.close?.(); } catch { /* teardown is best-effort */ }
    };
  }, [stream]);

  return level;
}

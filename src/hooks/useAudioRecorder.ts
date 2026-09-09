// useAudioRecorder — one voice message, from microphone to Blob.
//
// MediaRecorder is small but has edges every caller re-learns: the mime type
// has to be probed (Safari records mp4, Chromium webm/opus), the tracks have
// to be stopped or the tab keeps the red dot, the object URL has to be
// revoked, and a message needs a ceiling or somebody records for an hour.
// This hook owns all four and hands the host a state machine.

import { useCallback, useEffect, useRef, useState } from 'react';

export type AudioRecorderState = 'idle' | 'starting' | 'recording' | 'recorded' | 'error';

export interface UseAudioRecorderOptions {
  /** How to get a microphone — the host owns device preferences and constraints. */
  getStream: () => Promise<MediaStream>;
  /** Recording stops itself here. */
  maxMs?: number;
  /** Preferred container; falls back through what the browser can encode. */
  mimeType?: string;
  audioBitsPerSecond?: number;
}

export interface AudioRecorder {
  state: AudioRecorderState;
  /** Wall time recorded so far (live while recording, final once recorded). */
  elapsedMs: number;
  blob: Blob | null;
  /** Object URL for `blob`, for a preview player. Revoked on reset/unmount. */
  url: string | null;
  mimeType: string | null;
  error: string | null;
  start: () => Promise<void>;
  stop: () => void;
  reset: () => void;
}

const CANDIDATES = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg;codecs=opus'];

/** The first container this browser can record, or `undefined` for its default. */
export function pickRecordingMimeType(preferred?: string): string | undefined {
  const MR = (globalThis as { MediaRecorder?: { isTypeSupported?: (t: string) => boolean } }).MediaRecorder;
  if (!MR?.isTypeSupported) return preferred;
  for (const t of [preferred, ...CANDIDATES]) if (t && MR.isTypeSupported(t)) return t;
  return undefined;
}

export function useAudioRecorder({ getStream, maxMs = 60_000, mimeType, audioBitsPerSecond = 24_000 }: UseAudioRecorderOptions): AudioRecorder {
  const [state, setState] = useState<AudioRecorderState>('idle');
  const [elapsedMs, setElapsedMs] = useState(0);
  const [blob, setBlob] = useState<Blob | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [usedMime, setUsedMime] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const startedAtRef = useRef(0);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const urlRef = useRef<string | null>(null);

  const clearTick = () => { if (tickRef.current) { clearInterval(tickRef.current); tickRef.current = null; } };
  const releaseStream = () => { streamRef.current?.getTracks().forEach((t) => t.stop()); streamRef.current = null; };
  const revoke = () => { if (urlRef.current) { try { URL.revokeObjectURL(urlRef.current); } catch { /* jsdom */ } urlRef.current = null; } };

  const stop = useCallback(() => {
    const r = recorderRef.current;
    if (r && r.state !== 'inactive') r.stop();
    else releaseStream();
    clearTick();
  }, []);

  const start = useCallback(async () => {
    if (typeof MediaRecorder === 'undefined') { setError('This browser cannot record audio.'); setState('error'); return; }
    setError(null); setBlob(null); revoke(); setUrl(null); setElapsedMs(0); chunksRef.current = [];
    setState('starting');
    let stream: MediaStream;
    try { stream = await getStream(); } catch (err) {
      setError(err instanceof Error && err.name === 'NotAllowedError' ? 'Microphone access was blocked.' : 'Could not open the microphone.');
      setState('error');
      return;
    }
    streamRef.current = stream;
    const type = pickRecordingMimeType(mimeType);
    let recorder: MediaRecorder;
    try { recorder = new MediaRecorder(stream, { ...(type ? { mimeType: type } : {}), audioBitsPerSecond }); } catch {
      releaseStream(); setError('Could not start recording.'); setState('error'); return;
    }
    recorderRef.current = recorder;
    recorder.ondataavailable = (e: BlobEvent) => { if (e.data && e.data.size > 0) chunksRef.current.push(e.data); };
    recorder.onstop = () => {
      const finalType = recorder.mimeType || type || 'audio/webm';
      const out = new Blob(chunksRef.current, { type: finalType });
      releaseStream(); clearTick();
      setElapsedMs(Date.now() - startedAtRef.current);
      setBlob(out); setUsedMime(finalType);
      let next: string | null = null;
      try { next = URL.createObjectURL(out); } catch { /* jsdom */ }
      urlRef.current = next; setUrl(next);
      setState('recorded');
    };
    recorder.onerror = () => { releaseStream(); clearTick(); setError('Recording failed.'); setState('error'); };
    startedAtRef.current = Date.now();
    recorder.start(1000);
    setState('recording');
    tickRef.current = setInterval(() => {
      const ms = Date.now() - startedAtRef.current;
      setElapsedMs(ms);
      if (ms >= maxMs) stop();
    }, 200);
  }, [getStream, maxMs, mimeType, audioBitsPerSecond, stop]);

  const reset = useCallback(() => {
    stop(); revoke(); chunksRef.current = [];
    setBlob(null); setUrl(null); setUsedMime(null); setElapsedMs(0); setError(null); setState('idle');
  }, [stop]);

  useEffect(() => () => { stop(); revoke(); }, [stop]);

  return { state, elapsedMs, blob, url, mimeType: usedMime, error, start, stop, reset };
}

export default useAudioRecorder;

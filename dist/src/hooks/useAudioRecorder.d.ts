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
/** The first container this browser can record, or `undefined` for its default. */
export declare function pickRecordingMimeType(preferred?: string): string | undefined;
export declare function useAudioRecorder({ getStream, maxMs, mimeType, audioBitsPerSecond }: UseAudioRecorderOptions): AudioRecorder;
export default useAudioRecorder;
//# sourceMappingURL=useAudioRecorder.d.ts.map
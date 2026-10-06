/**
 * What kind of source a URL names, by extension.
 *
 * `'unknown'` is a real answer and not a failure: a signed or extensionless
 * URL gets the previous behaviour rather than a guess, because guessing wrong
 * in either direction breaks playback silently. Query strings and fragments
 * are stripped first — a signed `.m3u8?X-Amz-...` is still a playlist.
 */
export declare function sourceKind(url: string): 'hls' | 'progressive' | 'unknown';
export interface RecordingPlayerProps {
    playlistUrl: string | null;
    poster?: string;
    autoPlay?: boolean;
    muted?: boolean;
    onLoadedMetadata?: (durationSec: number) => void;
    onTimeUpdate?: (currentTime: number, duration: number) => void;
    onError?: (err: Error) => void;
    /** Hide the download button (private channels). Default false. */
    hideDownload?: boolean;
    className?: string;
}
export declare function RecordingPlayer({ playlistUrl, poster, autoPlay, muted, onLoadedMetadata, onTimeUpdate, onError, hideDownload, className, }: RecordingPlayerProps): import("react").JSX.Element;
export default RecordingPlayer;
//# sourceMappingURL=RecordingPlayer.d.ts.map
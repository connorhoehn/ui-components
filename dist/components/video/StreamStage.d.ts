import { type ReactNode } from 'react';
import { type StreamChatMessage } from './StreamChatTicker';
/**
 * A stream with audio and no usable picture.
 *
 * NOT the same as a stream with nothing in it: a MediaStream with no tracks at
 * all is a failure, and putting a friendly "Audio only" card over it would be
 * the same category of lie as the black rectangle it replaced. Exported
 * because a host that already knows its publisher's shape can pass `audioOnly`
 * directly instead of re-deriving this.
 */
export declare function streamIsAudioOnly(stream: MediaStream | null | undefined): boolean;
export interface StreamStageProps {
    /**
     * The live stream, realtime transport. Null renders the placeholder — a
     * stage with no stream is the normal state before a broadcast starts, not
     * an error.
     */
    stream?: MediaStream | null;
    /**
     * The live stream, near-realtime transport: an HLS playlist URL, typically
     * from `useLVSLiveHls`. Used when `stream` is absent.
     */
    playlistUrl?: string | null;
    /** Surfaced when HLS cannot play — an unsupported browser, a dead playlist. */
    onPlaybackError?: (err: Error) => void;
    /**
     * Called by the "Try again" control, in addition to the stage's own retry.
     * Use it when recovery needs something the stage cannot do — re-issuing a
     * signed playlist URL, re-subscribing over WHEP.
     *
     * It is also the ONLY thing that can offer a way back from `ended`: there is
     * no playlist left to re-attach there, so the stage's own retry could not
     * succeed and no button is drawn without this.
     */
    onRetry?: () => void;
    /** Replaces the default wording once a stream has failed to start. */
    notStartedLabel?: string;
    /**
     * Shown when a stream that WAS playing goes away — the broadcaster hung up.
     *
     * A distinct state from "not started". Both render an empty stage, but the
     * placeholder tells the audience to keep waiting, which is the wrong thing
     * to say about something that is over.
     */
    endedLabel?: ReactNode;
    /** How long to wait before saying so. Default 10s. */
    stallAfterMs?: number;
    /** Name of the stream or call, shown top-left. */
    title?: string;
    /**
     * Watchers, when the number is KNOWN. Pass `null` (or omit) when it is not.
     *
     * `null`/omitted and `0` are DIFFERENT claims and this component keeps them
     * apart: null renders no badge at all ("nobody has told us"), and a numeric
     * 0 renders "0 watching" ("somebody counted, and the answer was nobody").
     *
     * They were collapsed once — 0 was suppressed as if it were unknown — and
     * that is the wrong way round for this codebase specifically. Viewer count
     * here was STRUCTURALLY zero for a long time (the tracker had no callers at
     * all, so every channel reported an empty house), and a visible "0 watching"
     * is the only thing that distinguishes a working counter from a missing
     * one. Suppressing the zero hides exactly the failure worth catching.
     *
     * So a caller must never turn "not told" into 0 to satisfy the type. Omit
     * the prop instead — see WrappedStreamStage, which spreads it conditionally.
     */
    viewerCount?: number | null;
    /**
     * The caller's claim that this should be live. It is ANDed with what the
     * player actually managed to do, so on the HLS path a claim alone will not
     * light the badge — a composed playlist URL is not a broadcast.
     */
    live?: boolean;
    /**
     * Force the audio-only presentation on or off. Omitted, the stage works it
     * out: no usable video track on the realtime path, `videoWidth === 0` on
     * the HLS path.
     */
    audioOnly?: boolean;
    /** Who is broadcasting. Gives an audio-only stream a face and a name. */
    speakerName?: string;
    speakerAvatarUrl?: string;
    /**
     * Chat to rotate over the video. Empty or omitted renders no ticker at all,
     * so a silent stream is not carrying an empty chat frame.
     */
    chatMessages?: readonly StreamChatMessage[];
    /** Forwarded to the ticker. */
    chatVisibleCount?: number;
    chatRotateMs?: number;
    /**
     * Whether the stream starts muted. Default true, and effectively mandatory:
     * browsers refuse to autoplay audible media, so an unmuted stage would not
     * start at all. The viewer can unmute from the stage itself.
     */
    muted?: boolean;
    /** Offer a fullscreen control. Default true; hidden where the API is absent. */
    allowFullscreen?: boolean;
    /**
     * Show how far behind the live edge HLS playback is. Default true. HLS runs
     * seconds behind by construction, and a viewer who does not know that reads
     * the delay as a frozen stream.
     */
    showLatency?: boolean;
    /** Controls rendered bottom-right, e.g. leave / mute / fullscreen. */
    controls?: ReactNode;
    /** Shown centred when there is no stream. */
    placeholder?: ReactNode;
    className?: string;
    'data-testid'?: string;
}
export declare function StreamStage({ stream, playlistUrl, onPlaybackError, onRetry, title, viewerCount, live, audioOnly: audioOnlyProp, speakerName, speakerAvatarUrl, notStartedLabel, endedLabel, stallAfterMs, chatMessages, chatVisibleCount, chatRotateMs, muted: mutedInitial, allowFullscreen, showLatency, controls, placeholder, className, 'data-testid': testId, }: StreamStageProps): import("react").JSX.Element;
export default StreamStage;
//# sourceMappingURL=StreamStage.d.ts.map
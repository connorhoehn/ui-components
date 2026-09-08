// StreamStage — the surface a live stream or call is watched on.
//
// ## Why this exists as a composite
//
// The library had the PARTS of a stream surface and no stream surface:
// `StreamVideo` wires a MediaStream into a <video>, `ViewerCount` is a badge,
// `StreamChatTicker` rotates chat. Every app that wanted a watchable stream had
// to assemble those itself, which meant re-deciding the same things — where
// chat floats, whether the badge is over or beside the video, what happens
// before the stream arrives — and getting a different answer each time.
//
// ## Overlay, not columns
//
// Chat, viewer count and title all float OVER the video rather than taking
// layout beside it. On a stream the video is the content; a chat column that
// steals 320px is 320px of the thing you came to watch. Overlaying also means
// the stage works unchanged at any size, from a sidebar tile to full screen,
// which a column layout does not.
//
// Everything overlaid is `pointer-events-none` except deliberate controls, so
// the video keeps its own click targets (play, fullscreen, PiP).
//
// ## Two transports, one stage
//
// LVS delivers the same channel two ways and they are NOT interchangeable:
//
//   `stream`      — a MediaStream from WHEP (`useLVSSubscriber`). Sub-second,
//                   one peer connection per viewer. That per-viewer cost is
//                   what makes a CALL work and what makes a thousand-viewer
//                   broadcast expensive.
//   `playlistUrl` — an HLS playlist from `useLVSLiveHls`. Segmented plain
//                   HTTP, so a CDN can carry it to an audience of any size.
//                   Costs a few seconds of latency.
//
// The stage takes either, because the chrome is identical either way — a
// viewer cannot tell which transport they are on, and neither should the code
// that lays out the LIVE badge. `stream` wins when both are given: it is the
// lower-latency source, so passing both reads as "realtime, with HLS as the
// thing I fall back to", and that is what happens.
//
// ## One rule governs everything below
//
// The stage may not make a claim it cannot support. Every state here exists
// because an earlier version collapsed two situations into one appearance and
// the viewer read the wrong one:
//
//   black rectangle + LIVE badge   was an AUDIO-ONLY broadcast working fine
//   frozen frame + LIVE badge      was a stalled stream
//   "Waiting for the stream…"      was a broadcast that had already ended,
//                                  or one that was never going to start
//   "0 watching"                   was an unmeasured counter, while someone
//                                  was demonstrably watching
//   "HLS error: networkError"      was a 503 saying "no active producers" —
//                                  hls.js's enum name, shown to a stranger,
//                                  and blaming a network that was fine
//
// The last of those is why the failure a viewer reads is built from
// `hls.failure.kind`, never from `hls.failure.detail`: the classification is
// the library's job, the sentence is the viewer's, and the hls.js vocabulary
// lives on `data-error-detail` and in the console where it belongs.
//
// The phase machine in `streamStagePhase.ts` is where those are told apart,
// and `data-phase` on the root element is the whole answer in one attribute.

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { useHlsSource } from '../../lib/video/useHlsSource';
import { useAudioLevel } from '../../lib/video/useAudioLevel';
import { useTrackStateBump, streamHasUsableVideo } from '../../lib/video/useTrackStateBump';
import { StreamVideo } from './StreamVideo';
import { ViewerCount, isKnownViewerCount } from './ViewerCount';
import { StreamAudioOnly } from './StreamAudioOnly';
import { streamStagePhase, stagePhaseIsLive, type StreamStagePhase } from './streamStagePhase';

/**
 * How long a stream may say "Connecting…" — or promise one is coming at all —
 * before admitting nothing is happening. A live manifest answers in a second
 * or two; ten seconds is generous enough that a slow one is never called dead.
 */
const STALL_AFTER_MS = 10_000;
import { StreamChatTicker, type StreamChatMessage } from './StreamChatTicker';

/**
 * A stream with audio and no usable picture.
 *
 * NOT the same as a stream with nothing in it: a MediaStream with no tracks at
 * all is a failure, and putting a friendly "Audio only" card over it would be
 * the same category of lie as the black rectangle it replaced. Exported
 * because a host that already knows its publisher's shape can pass `audioOnly`
 * directly instead of re-deriving this.
 */
export function streamIsAudioOnly(stream: MediaStream | null | undefined): boolean {
  if (!stream || typeof stream.getVideoTracks !== 'function') return false;
  if (typeof stream.getAudioTracks !== 'function') return false;
  if (stream.getAudioTracks().length === 0) return false;
  return !streamHasUsableVideo(stream);
}

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

/** Shared look for the small pill controls along the bottom edge. */
const PILL =
  'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium cursor-pointer border-none transition-colors';

export function StreamStage({
  stream = null,
  playlistUrl = null,
  onPlaybackError,
  onRetry,
  title,
  viewerCount,
  live = false,
  audioOnly: audioOnlyProp,
  speakerName,
  speakerAvatarUrl,
  notStartedLabel,
  endedLabel,
  stallAfterMs = STALL_AFTER_MS,
  chatMessages,
  chatVisibleCount,
  chatRotateMs,
  muted: mutedInitial = true,
  allowFullscreen = true,
  showLatency = true,
  controls,
  placeholder,
  className,
  'data-testid': testId = 'stream-stage',
}: StreamStageProps) {
  // Autoplay costs the sound, so the stage has to offer it back.
  //
  // A stream starts muted because no browser will autoplay audible media —
  // correct, and it leaves the audience with a silent picture and no way to
  // fix it. On an AUDIO-ONLY broadcast, which is what a call from a machine
  // with a busy camera produces, muted means the viewer gets nothing at all:
  // a black rectangle wearing a LIVE badge. Observed exactly that way.
  const [muted, setMuted] = useState(mutedInitial);
  useEffect(() => { setMuted(mutedInitial); }, [mutedInitial]);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  // Only engaged on the HLS path; passing null keeps the hook inert when a
  // MediaStream is driving the stage.
  const hls = useHlsSource(videoRef, stream ? null : playlistUrl, {
    live: true,
    onError: onPlaybackError,
  });

  // "It ended" and "it has not started" look identical — an empty stage — and
  // are opposite messages. Once this stage has had a source, losing it means
  // the broadcast is over, and telling the audience to keep waiting for it is
  // the one thing that is certainly wrong.
  //
  // Per MOUNT, deliberately: a viewer who opens the stage after a broadcast
  // has finished never had a source here, and for them "waiting" is right.
  const hadSource = useRef(false);
  if (stream || playlistUrl) hadSource.current = true;

  // Audio-only, re-derived on every track transition: an inbound WebRTC video
  // track arrives muted and unmutes later, and a stage that decided "audio
  // only" once would keep the card over live video.
  // Guarded: hosts and tests both pass `{}` as a stand-in stream, and
  // useTrackStateBump calls getVideoTracks() unconditionally.
  const trackableStream =
    stream && typeof stream.getVideoTracks === 'function' ? stream : null;
  const trackBump = useTrackStateBump(trackableStream, title ?? 'stream');
  // eslint-disable-next-line react-hooks/exhaustive-deps -- trackBump IS the invalidation signal
  const streamAudioOnly = useMemo(() => streamIsAudioOnly(stream), [stream, trackBump]);
  // Whether the realtime stream carries anything yet. WHEP hands the stream
  // over before its tracks arrive, so "empty" is a normal first moment — and,
  // if it lasts, the realtime spelling of a black rectangle wearing a LIVE
  // badge. `null` where the caller passed a stand-in we cannot interrogate.
  // eslint-disable-next-line react-hooks/exhaustive-deps -- trackBump IS the invalidation signal
  const streamHasTracks = useMemo(
    () => (stream && typeof stream.getTracks === 'function' ? stream.getTracks().length > 0 : null),
    [stream, trackBump],
  );

  // The grace period, and the reason it runs with NO source too.
  //
  // It used to run only on the HLS path, so a stage mounted with nothing at
  // all sat on "Waiting for the stream to start…" for as long as the tab was
  // open — an unbounded promise about a broadcast that may never exist. That
  // is the same forever-state as the spinner, wearing different words.
  const settled =
    (Boolean(stream) && streamHasTracks !== false) || (Boolean(playlistUrl) && !hls.loading);
  const [graceExpired, setGraceExpired] = useState(false);
  useEffect(() => {
    setGraceExpired(false);
    if (settled || hls.error) return;
    const timer = setTimeout(() => setGraceExpired(true), stallAfterMs);
    return () => clearTimeout(timer);
  }, [settled, hls.error, stallAfterMs]);

  const rawPhase: StreamStagePhase = streamStagePhase({
    hasStream: Boolean(stream),
    streamHasTracks,
    hasPlaylist: Boolean(playlistUrl),
    hadSource: hadSource.current,
    graceExpired,
    hls,
  });

  // A packager that answers "no active producers" has not FAILED — it has
  // told us the channel is empty, which is the same fact the grace timeout
  // discovers the slow way. One fact, one appearance: route it to the state
  // that already says so, instead of a second red error that means the same
  // thing in different words.
  //
  // The classification stays visible on `data-error-kind` for anyone
  // debugging; it is only the VIEWER who is spared the distinction.
  const failure = hls.failure ?? null;
  // Whether THIS viewer ever saw the broadcast run. `hadSource` cannot answer
  // that on the HLS path — a playlist URL exists from mount — so an empty
  // channel and a finished one are the same 503 without it. With it, someone
  // who was watching when it stopped is told it ended, and someone who arrived
  // to an empty channel is told nothing is on.
  const everPlayed = useRef(false);
  if (rawPhase === 'playing') everPlayed.current = true;
  const phase: StreamStagePhase =
    rawPhase === 'error' && failure?.kind === 'no-broadcast'
      ? (everPlayed.current ? 'ended' : 'not-started')
      : rawPhase;

  // WHY the stage is empty, which is a different question from whether it is.
  //
  // Two roads reach `ended` and only one of them is an ending:
  //
  //   withdrawn  — the host took the source away. `streamStagePhase` returned
  //                `ended` on its own because the playlist is gone, and the
  //                only thing that removes it is the session going away. A
  //                deliberate stop.
  //   stopped    — the playlist is STILL attached and the packager answered
  //                "no active producers". The broadcaster's publish stopped
  //                reaching the server. A crashed tab, a dropped network and a
  //                clean hang-up are the same 503 here, so this branch does
  //                not know that the broadcast ended — it only knows the
  //                stream stopped arriving.
  //
  // They used to share the sentence "The broadcast has ended.", which turned
  // every broadcaster-side failure into a decision the broadcaster never made
  // and sent the audience away from a stream that was about to come back.
  // `useHlsSource` deliberately refuses this guess (its `no-broadcast` copy is
  // neutral on purpose); rewriting the phase here threw that neutrality away.
  const endedReason: 'withdrawn' | 'stopped' | null =
    phase !== 'ended' ? null : rawPhase === 'ended' ? 'withdrawn' : 'stopped';
  const playing = live && stagePhaseIsLive(phase);

  const detectedAudioOnly = stream ? streamAudioOnly : hls.audioOnly === true;
  const isAudioOnly =
    (audioOnlyProp ?? detectedAudioOnly) &&
    (phase === 'playing' || phase === 'buffering' || phase === 'stalled');

  // Measured only when it will be shown, and only on the realtime path — Web
  // Audio cannot tap an <video> element without inserting itself into the
  // audio path, which is not a risk worth taking on the mass-audience surface.
  const audioLevel = useAudioLevel(isAudioOnly && stream ? stream : null);

  const [isFullscreen, setIsFullscreen] = useState(false);
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const onChange = () => setIsFullscreen(document.fullscreenElement === containerRef.current);
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);
  const toggleFullscreen = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    try {
      if (typeof document !== 'undefined' && document.fullscreenElement) {
        void document.exitFullscreen?.();
        return;
      }
      const req =
        el.requestFullscreen ?? (el as any).webkitRequestFullscreen ?? (el as any).msRequestFullscreen;
      const result = req?.call(el);
      if (result && typeof result.catch === 'function') result.catch(() => { /* refused */ });
    } catch { /* fullscreen is an affordance, never a failure path */ }
  }, []);
  const fullscreenSupported =
    typeof document !== 'undefined' &&
    (document.fullscreenEnabled !== false) &&
    typeof Element !== 'undefined' &&
    Boolean(
      Element.prototype.requestFullscreen ??
        (Element.prototype as any).webkitRequestFullscreen,
    );

  const hlsRetry = hls.retry;
  const retry = useCallback(() => {
    hlsRetry?.();
    onRetry?.();
  }, [hlsRetry, onRetry]);

  const hasSource = Boolean(stream || playlistUrl);
  const onHls = Boolean(playlistUrl) && !stream;
  // No STAGE chrome over a stage that is only carrying a message. A Full
  // screen button on "Nothing is being broadcast right now." is an offer to
  // enlarge an apology.
  const showStageChrome =
    hasSource && phase !== 'error' && phase !== 'not-started' && phase !== 'ended';
  // …but the HOST's controls are a different thing, and hiding them here was
  // a trap: `controls` is where the Leave button lives, so a broadcast that
  // ended took away the only way out of the stage it left behind. A viewer
  // must always be able to leave whatever they are looking at.
  const showControlRow = showStageChrome || Boolean(controls);

  // Whether pressing "Try again" could plausibly change anything. A browser
  // with no HLS support is the case where it certainly cannot, and a control
  // that can never succeed is worse than no control.
  const retryable = failure ? failure.retryable : true;
  const canRetry = (onHls || Boolean(onRetry)) && retryable;
  // "Try again" is for something that went wrong. Nothing went wrong with an
  // empty channel — you are looking again to see whether it filled up.
  const retryLabel = failure?.kind === 'no-broadcast' ? 'Check again' : 'Try again';

  return (
    <div
      ref={containerRef}
      data-testid={testId}
      data-live={String(playing)}
      data-phase={phase}
      data-audio-only={String(isAudioOnly)}
      data-transport={stream ? 'realtime' : playlistUrl ? 'hls' : 'none'}
      // The developer's copy of what went wrong. hls.js's vocabulary and the
      // HTTP status live HERE and in the console — never in the sentence a
      // viewer reads. ("HLS error: networkError" was on screen for a room
      // whose broadcast simply was not producing.)
      data-error-kind={failure?.kind}
      data-error-detail={failure?.detail}
      // Always black, in both themes: letterbox bars around a video are black
      // everywhere video is watched, and a white stage in light mode makes the
      // frame edges glow. This is one of the few surfaces that should not
      // follow the app's palette.
      className={cn('relative h-full w-full overflow-hidden rounded-lg bg-black', className)}
    >
      {/* The media layer stays mounted for as long as a source exists, through
          buffering, stalling and "nothing is being broadcast" alike. Unmounting
          it on a bad phase would throw away the very player that is retrying. */}
      {stream ? (
        <StreamVideo stream={stream} muted={muted} className="h-full w-full object-contain" />
      ) : playlistUrl ? (
        <video
          ref={videoRef}
          data-testid={`${testId}-hls`}
          autoPlay
          playsInline
          muted={muted}
          className="h-full w-full object-contain"
        />
      ) : null}

      {/* Audio-only is a working broadcast, not a broken one. Over the media
          layer rather than instead of it: the element is still decoding audio
          and must keep doing so. */}
      {isAudioOnly && (
        <StreamAudioOnly
          data-testid={`${testId}-audio-only`}
          name={speakerName}
          avatarUrl={speakerAvatarUrl}
          level={audioLevel}
          active={phase !== 'stalled' && !muted}
          muted={muted}
        />
      )}

      {/* One overlay, one claim. */}
      {phase === 'idle' && (
        <StageMessage testId={`${testId}-placeholder`}>
          {placeholder ?? 'Waiting for the stream to start…'}
        </StageMessage>
      )}

      {phase === 'ended' && (
        <StageMessage testId={`${testId}-ended`} data-ended-reason={endedReason}>
          {/* An explicit `endedLabel` still wins — a host that KNOWS the
              broadcast was ended (it watched the session close) may say so. */}
          <span>
            {endedLabel
              ?? (endedReason === 'withdrawn'
                ? 'The broadcast has ended.'
                : 'The stream stopped.')}
          </span>
          {/* The second line exists only for the case we cannot call: it tells
              the viewer the truth (nothing is arriving) and that waiting is a
              reasonable thing to do, instead of sending them away from a
              broadcast whose author is reconnecting. */}
          {endedReason === 'stopped' && !endedLabel && (
            <span className="text-xs text-white/60">
              Nothing is arriving from the broadcaster right now — they may be
              reconnecting.
            </span>
          )}
          {/* Only where the HOST can actually go and look — re-signing a URL,
              re-subscribing. On the `withdrawn` road the stage's own HLS retry
              cannot help: there is no playlist left to re-attach, so a button
              wired to it would be one that can never succeed. On the `stopped`
              road the playlist IS still attached, so the stage can genuinely
              retry it and the button is offered whether or not the host
              supplied one. */}
          {endedReason === 'stopped'
            ? canRetry && (
              <RetryButton testId={`${testId}-retry`} label="Try again" onClick={retry} />
            )
            : onRetry && (
              <RetryButton testId={`${testId}-retry`} label="Check again" onClick={retry} />
            )}
        </StageMessage>
      )}

      {/* The end of every "waiting" road. Whether the stage never had a source
          or has a playlist nobody is broadcasting to, after the grace period
          it says the same true thing and offers the only useful action. */}
      {phase === 'not-started' && (
        <StageMessage testId={`${testId}-not-started`}>
          <span>{notStartedLabel ?? 'Nothing is being broadcast right now.'}</span>
          {canRetry && (
            <RetryButton testId={`${testId}-retry`} label={retryLabel} onClick={retry} />
          )}
        </StageMessage>
      )}

      {/* Connecting is its own state. Without it the stage is black from the
          moment it mounts, so "about to play" and "there is nothing here" look
          exactly the same for as long as the manifest takes. */}
      {phase === 'connecting' && (
        <StageMessage testId={`${testId}-connecting`}>Connecting…</StageMessage>
      )}

      {/* Buffering keeps the frame visible and stays out of the way: it is the
          ordinary hiccup of a live edge and does not deserve a black wash. */}
      {phase === 'buffering' && (
        <div
          data-testid={`${testId}-buffering`}
          className="pointer-events-none absolute left-1/2 top-3 z-10 -translate-x-1/2 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white/90"
        >
          Buffering…
        </div>
      )}

      {/* Stalled is NOT buffering, and saying "buffering" about it forever is
          the false promise this component keeps having to unlearn. The picture
          on screen is a frame from the past; say so, and offer a way out. */}
      {phase === 'stalled' && (
        <StageMessage testId={`${testId}-stalled`} dim>
          <span>The stream has stopped responding.</span>
          <span className="text-xs text-white/60">
            The picture below is the last frame that arrived.
          </span>
          {canRetry && <RetryButton testId={`${testId}-retry`} onClick={retry} />}
        </StageMessage>
      )}

      {/* An unplayable stream says so. Before this the stage sat black and
          indistinguishable from a broadcast that had not started. */}
      {phase === 'error' && (
        <StageMessage testId={`${testId}-error`} dim>
          {/* `hls.error` is the VIEWER's sentence — useHlsSource keeps the
              hls.js enum and the HTTP status in `failure.detail` instead. */}
          <span>{hls.error ?? 'This stream could not be played.'}</span>
          {canRetry && (
            <RetryButton testId={`${testId}-retry`} label={retryLabel} onClick={retry} />
          )}
        </StageMessage>
      )}

      {/* Top-left: identity. */}
      {(title || playing || isKnownViewerCount(viewerCount)) && (
        <div className="pointer-events-none absolute left-3 top-3 flex items-center gap-2">
          {playing && (
            <span
              data-testid={`${testId}-live`}
              className="rounded bg-danger px-1.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white"
            >
              Live
            </span>
          )}
          {title && (
            <span className="truncate text-sm font-medium text-white drop-shadow">{title}</span>
          )}
          {isKnownViewerCount(viewerCount) && <ViewerCount count={viewerCount} />}
        </div>
      )}

      {/* Bottom-left: chat, out of the way of controls on the right. */}
      {chatMessages && chatMessages.length > 0 && (
        <StreamChatTicker
          messages={chatMessages}
          visibleCount={chatVisibleCount}
          rotateMs={chatRotateMs}
          className="absolute bottom-3 left-3"
          data-testid={`${testId}-chat`}
        />
      )}

      {/* Bottom-right: every control in ONE row.

          Mute and the host's `controls` were both absolutely positioned at
          bottom-3 right-3 and drew on top of each other for any host that
          passed both. */}
      {showControlRow && (
        <div
          data-testid={`${testId}-controls`}
          className="absolute bottom-3 right-3 z-10 flex items-center gap-2"
        >
          {/* How far behind live, and the way back to it.

              HLS is seconds behind by construction. A viewer who is not told
              that reads the delay as a frozen stream — the same misreading
              that makes a stalled stream and a working one look alike. */}
          {showStageChrome && onHls && showLatency && (phase === 'playing' || phase === 'buffering') && (
            <button
              type="button"
              data-testid={`${testId}-latency`}
              onClick={() => hls.seekToLive?.()}
              title="This broadcast is delivered over HLS, a few seconds behind the source. Click to jump to the live edge."
              aria-label="Jump to the live edge"
              className={cn(PILL, 'bg-black/50 text-white/80 hover:bg-black/70')}
            >
              {typeof hls.latencySec === 'number' && Number.isFinite(hls.latencySec)
                ? `${Math.max(1, Math.round(hls.latencySec))}s behind`
                : 'Behind live'}
            </button>
          )}

          {/* Sound, offered back.

              Prominent while muted and understated once not: a viewer who
              cannot hear a live stream has no content at all, so the control
              has to read as the next thing to do rather than as chrome. Only
              shown once something is actually playing — an unmute button over
              a stage with nothing on it is a button that does nothing. */}
          {showStageChrome && playing && (
            <button
              type="button"
              data-testid={`${testId}-mute-toggle`}
              aria-label={muted ? 'Unmute' : 'Mute'}
              aria-pressed={muted}
              onClick={() => setMuted((m) => !m)}
              className={cn(
                PILL,
                muted
                  ? 'bg-white text-black hover:bg-white/90'
                  : 'bg-black/50 text-white/80 hover:bg-black/70',
              )}
            >
              <span aria-hidden>{muted ? '\u{1F507}' : '\u{1F50A}'}</span>
              {muted ? 'Unmute' : 'Mute'}
            </button>
          )}

          {showStageChrome && allowFullscreen && fullscreenSupported && (
            <button
              type="button"
              data-testid={`${testId}-fullscreen`}
              aria-label={isFullscreen ? 'Exit full screen' : 'Full screen'}
              aria-pressed={isFullscreen}
              onClick={toggleFullscreen}
              className={cn(PILL, 'bg-black/50 text-white/80 hover:bg-black/70')}
            >
              <span aria-hidden>{isFullscreen ? '↙' : '↗'}</span>
              {isFullscreen ? 'Exit' : 'Full screen'}
            </button>
          )}

          {controls}
        </div>
      )}
    </div>
  );
}

function StageMessage({
  testId,
  dim,
  children,
  'data-ended-reason': endedReason,
}: {
  testId: string;
  /** Wash the frame behind, for states where the frame itself is misleading. */
  dim?: boolean;
  children: ReactNode;
  /** Why the stage is empty, for tests and for anyone debugging a report of
   *  "it said the broadcast ended and it hadn't". Never rendered. */
  'data-ended-reason'?: string | null;
}) {
  return (
    <div
      data-testid={testId}
      data-ended-reason={endedReason ?? undefined}
      className={cn(
        'absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 px-6 text-center text-sm text-white/70',
        dim && 'bg-black/60',
      )}
    >
      {children}
    </div>
  );
}

function RetryButton({
  testId,
  label = 'Try again',
  onClick,
}: {
  testId: string;
  /** What the press actually attempts. "Try again" over an empty channel is
      an offer to fix something that is not broken; "Check again" is true. */
  label?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      data-testid={testId}
      onClick={onClick}
      className={cn(PILL, 'bg-white text-black hover:bg-white/90')}
    >
      {label}
    </button>
  );
}

export default StreamStage;

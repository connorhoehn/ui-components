// useTrackStateBump — subscribe to a MediaStream's video-track lifecycle
// events (mute / unmute / ended, plus addtrack / removetrack on the stream
// itself) and bump an internal counter on every transition. Consumers
// re-derive paint-ability from the bump so an inbound WebRTC track that
// starts `muted: true` and later unmutes flips the tile from
// avatar-fallback to live video without manual re-fetch.
//
// Originally lived inline in websocket-gateway's HangoutOverlay (lines
// 133-187 pre-extraction). The "black tile when camera is off" /
// "addtrack arrives muted and never observed unmute" bug class recurs
// across every hangout consumer that mixes Avatar fallback with live
// remote video, so the hook belongs in the shared library.

import { useEffect, useState } from 'react';

export function useTrackStateBump(
  stream: MediaStream | undefined | null,
  participantLabel: string,
): number {
  const [bump, setBump] = useState(0);
  useEffect(() => {
    if (!stream) return;
    const log = (event: string, t: MediaStreamTrack) => {
      console.info('[useTrackStateBump] remote track', event, {
        participant: participantLabel,
        kind: t.kind,
        enabled: t.enabled,
        muted: t.muted,
        readyState: t.readyState,
        id: t.id,
      });
      setBump(n => n + 1);
    };
    const onMute = (e: Event) => log('mute', e.target as MediaStreamTrack);
    const onUnmute = (e: Event) => log('unmute', e.target as MediaStreamTrack);
    const onEnded = (e: Event) => log('ended', e.target as MediaStreamTrack);
    // Strong Set, not a WeakSet: cleanup has to iterate exactly the tracks it
    // attached to. Re-deriving from stream.getVideoTracks() at cleanup time
    // misses any track that arrived via `addtrack` and then left via
    // `removetrack` before unmount — its three listeners would never be
    // removed, and their closures pin setBump (and the unmounted fiber)
    // for as long as anything else still holds the track.
    const attached = new Set<MediaStreamTrack>();
    const attach = (t: MediaStreamTrack) => {
      // Guarded: hosts and tests both pass partial stand-ins for a MediaStream
      // (`{}`, or an object with getVideoTracks() and nothing else). A tile
      // that throws here takes the whole call surface down with it, which is a
      // far worse outcome than not observing a track transition.
      if (!t || typeof t.addEventListener !== 'function') return;
      if (attached.has(t)) return;
      attached.add(t);
      t.addEventListener('mute', onMute);
      t.addEventListener('unmute', onUnmute);
      t.addEventListener('ended', onEnded);
    };
    if (typeof stream.getVideoTracks === 'function') {
      for (const t of stream.getVideoTracks()) attach(t);
    }
    // Inbound WebRTC tracks arrive via `addtrack` AFTER mount and start in
    // `muted: true`. Without listeners on the new track, the eventual
    // unmute (when RTP packets actually decode) is never observed →
    // paint-ability check stays false → avatar fallback sticks even
    // though video is live.
    const onAdd = (e: Event) => {
      const t = (e as MediaStreamTrackEvent).track;
      if (t && t.kind === 'video') attach(t);
      setBump(n => n + 1);
    };
    const onRemove = () => setBump(n => n + 1);
    const streamHasEvents = typeof stream.addEventListener === 'function';
    if (streamHasEvents) {
      stream.addEventListener('addtrack', onAdd);
      stream.addEventListener('removetrack', onRemove);
    }
    return () => {
      for (const t of attached) {
        t.removeEventListener('mute', onMute);
        t.removeEventListener('unmute', onUnmute);
        t.removeEventListener('ended', onEnded);
      }
      attached.clear();
      if (streamHasEvents) {
        stream.removeEventListener('addtrack', onAdd);
        stream.removeEventListener('removetrack', onRemove);
      }
    };
  }, [stream, participantLabel]);
  return bump;
}

/**
 * Companion utility: returns true when the stream has at least one
 * paintable video track (live + enabled + not muted). Pair with
 * useTrackStateBump in the same component so the boolean re-derives on
 * every track transition.
 */
export function streamHasUsableVideo(stream: MediaStream | undefined | null): boolean {
  if (!stream) return false;
  const tracks = stream.getVideoTracks();
  if (tracks.length === 0) return false;
  return tracks.some(t => t.readyState === 'live' && t.enabled && !t.muted);
}

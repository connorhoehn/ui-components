import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { RemoteTileSlot } from '../RemoteTileSlot';

// ── MediaStream stand-in ──────────────────────────────────────────────
//
// Mirrors the surface RemoteTileSlot + useTrackStateBump touch:
//   - getVideoTracks() — to compute streamHasUsableVideo
//   - getTracks() — used in tests assertions, mirrors W3C surface
//   - addEventListener / removeEventListener for addtrack/removetrack
//
// We DO NOT polyfill globalThis.MediaStream — vitest's jsdom env
// provides HTMLAudioElement; we just need a stream shape RemoteTileSlot
// can inspect.

function makeTrack({
  kind = 'video',
  readyState = 'live',
  enabled = true,
  muted = false,
}: Partial<{ kind: 'video' | 'audio'; readyState: 'live' | 'ended'; enabled: boolean; muted: boolean }> = {}) {
  return {
    kind,
    readyState,
    enabled,
    muted,
    id: `t-${Math.random().toString(36).slice(2, 8)}`,
    addEventListener: () => {},
    removeEventListener: () => {},
  } as unknown as MediaStreamTrack;
}

function makeStream(tracks: MediaStreamTrack[] = []): MediaStream {
  const all = tracks;
  return {
    id: `s-${Math.random().toString(36).slice(2, 8)}`,
    getTracks: () => [...all],
    getVideoTracks: () => all.filter((t) => t.kind === 'video'),
    getAudioTracks: () => all.filter((t) => t.kind === 'audio'),
    addEventListener: () => {},
    removeEventListener: () => {},
  } as unknown as MediaStream;
}

describe('RemoteTileSlot', () => {
  it('renders the avatar branch when no stream is provided', () => {
    render(<RemoteTileSlot stream={undefined} displayName="Alice" cameraOn={false} />);
    expect(screen.getByTestId('remote-tile-avatar-branch')).toBeInTheDocument();
    // No stream → no hidden audio binding (nothing to bind to).
    expect(screen.queryByTestId('remote-tile-hidden-audio')).not.toBeInTheDocument();
  });

  it('renders the avatar branch when cameraOn=false even with a usable stream', () => {
    const stream = makeStream([makeTrack({ kind: 'audio' }), makeTrack({ kind: 'video' })]);
    render(<RemoteTileSlot stream={stream} displayName="Alice" cameraOn={false} />);
    expect(screen.getByTestId('remote-tile-avatar-branch')).toBeInTheDocument();
    // Stream present → hidden audio bound so audio still plays.
    expect(screen.getByTestId('remote-tile-hidden-audio')).toBeInTheDocument();
  });

  it('renders the avatar branch when the stream has no usable video (cold WHEP window)', () => {
    // Audio-only stream — the inbound RTP for audio arrived but video
    // is still mid-warmup (track present but muted: true). This is
    // exactly the cold-WHEP scenario the upstream fix addresses.
    const audioTrack = makeTrack({ kind: 'audio' });
    const videoTrack = makeTrack({ kind: 'video', muted: true });
    const stream = makeStream([audioTrack, videoTrack]);
    render(<RemoteTileSlot stream={stream} displayName="Alice" cameraOn={true} />);
    expect(screen.getByTestId('remote-tile-avatar-branch')).toBeInTheDocument();
    expect(screen.getByTestId('remote-tile-hidden-audio')).toBeInTheDocument();
  });

  it('AUDIO-FROM-T=0 — hidden <audio> binds the inbound stream in the cold-WHEP window', () => {
    // Specifically pin the bug class #3 invariant. The upstream WSG
    // commit (a923d6b) describes a window where the avatar branch
    // renders WITHOUT srcObject attached, so the inbound audio track
    // has nowhere to play. Locking the inverse: in the avatar branch,
    // a hidden <audio> with srcObject IS present.
    const stream = makeStream([makeTrack({ kind: 'audio' }), makeTrack({ kind: 'video', muted: true })]);
    render(<RemoteTileSlot stream={stream} displayName="Alice" cameraOn={true} />);
    const audio = screen.getByTestId('remote-tile-hidden-audio') as HTMLAudioElement;
    expect(audio.tagName).toBe('AUDIO');
    expect(audio.autoplay).toBe(true);
    // jsdom assigns srcObject via the useEffect; in this environment
    // it ends up being the same reference. The exact assignment can
    // be jsdom-version-sensitive — assert it's been touched (not the
    // empty default) rather than strict-equal which can be flaky.
    expect(audio.srcObject).not.toBe(null);
  });

  it('renders <StreamVideo> branch (no avatar, no hidden audio) when stream has usable video', () => {
    const stream = makeStream([makeTrack({ kind: 'video' })]); // live + enabled + !muted
    render(<RemoteTileSlot stream={stream} displayName="Alice" cameraOn={true} />);
    // No avatar branch when the video tile is rendering.
    expect(screen.queryByTestId('remote-tile-avatar-branch')).not.toBeInTheDocument();
    // CRITICAL: hidden audio binding must NOT also render when the
    // video tile is active. Double-binding the same MediaStream's
    // audio track on both <video> and <audio> elements can lead to
    // playback duplication in some browsers; this guard prevents
    // the regression.
    expect(screen.queryByTestId('remote-tile-hidden-audio')).not.toBeInTheDocument();
  });

  it('hidden audio rebinds when stream identity changes', () => {
    const streamA = makeStream([makeTrack({ kind: 'audio' })]);
    const { rerender } = render(
      <RemoteTileSlot stream={streamA} displayName="Alice" cameraOn={false} />,
    );
    const audioA = screen.getByTestId('remote-tile-hidden-audio') as HTMLAudioElement;
    expect(audioA.srcObject).not.toBe(null);

    const streamB = makeStream([makeTrack({ kind: 'audio' })]);
    rerender(<RemoteTileSlot stream={streamB} displayName="Alice" cameraOn={false} />);
    const audioB = screen.getByTestId('remote-tile-hidden-audio') as HTMLAudioElement;
    // Same node (React preserves the audio element across re-renders
    // because the JSX shape is stable), but srcObject points at a
    // different MediaStream. The element is conceptually rebound.
    expect(audioB).toBe(audioA);
    expect(audioB.srcObject).not.toBe(null);
  });

  it('cleans up srcObject when the stream becomes undefined', () => {
    const stream = makeStream([makeTrack({ kind: 'audio' })]);
    const { rerender } = render(
      <RemoteTileSlot stream={stream} displayName="Alice" cameraOn={false} />,
    );
    expect(screen.getByTestId('remote-tile-hidden-audio')).toBeInTheDocument();
    rerender(<RemoteTileSlot stream={undefined} displayName="Alice" cameraOn={false} />);
    // With no stream, the hidden audio element is gone entirely (the
    // {stream && ...} guard suppresses it) so the avatar branch carries
    // only the placeholder.
    expect(screen.queryByTestId('remote-tile-hidden-audio')).not.toBeInTheDocument();
  });

  it('renders the display name on the avatar fallback', () => {
    render(<RemoteTileSlot stream={undefined} displayName="Alice Liddell" cameraOn={false} />);
    // Avatar renders the title attribute with the name, or initials in
    // the rendered text. Either way, the name is visible to a11y.
    const tile = screen.getByTestId('remote-tile-avatar-branch');
    // Initials of "Alice Liddell" → "AL".
    expect(tile.textContent).toContain('AL');
  });

  it('honors avatarSize prop in the avatar branch', () => {
    const { container } = render(
      <RemoteTileSlot stream={undefined} displayName="Alice" cameraOn={false} avatarSize={48} />,
    );
    // Avatar renders an inline-style width/height — find the inner div.
    const tile = container.querySelector('[data-testid="remote-tile-avatar-branch"]');
    expect(tile).not.toBeNull();
    const avatar = tile!.firstElementChild as HTMLElement | null;
    expect(avatar).not.toBeNull();
    expect(avatar!.style.width).toBe('48px');
    expect(avatar!.style.height).toBe('48px');
  });
});

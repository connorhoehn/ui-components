// The mass-audience watch path: what a stage TELLS someone who is only
// watching, and never doing anything about it.
//
// A viewer has no console, no network tab and no second machine. Everything
// they can know about a broadcast is what this component says, so the tests
// below are about claims — which one is on screen, and whether it is true —
// not about layout.

import { render, screen, cleanup, fireEvent, act } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { HlsFailure, HlsPhase } from '../../../lib/video/useHlsSource';
import { hlsFailureText } from '../../../lib/video/useHlsSource';

const hlsState = {
  error: null as string | null,
  failure: null as HlsFailure | null,
  loading: false,
  phase: 'playing' as HlsPhase,
  audioOnly: null as boolean | null,
  latencySec: null as number | null,
  seekToLive: vi.fn(),
  retry: vi.fn(),
};
// Only the HOOK is replaced. `hlsFailureText` stays real, because the point
// of these tests is that the viewer's sentence is the one the library builds.
vi.mock('../../../lib/video/useHlsSource', async (importOriginal) => ({
  ...(await importOriginal<typeof import('../../../lib/video/useHlsSource')>()),
  useHlsSource: () => hlsState,
}));

import { StreamStage, streamIsAudioOnly } from '../StreamStage';

const PLAYLIST = 'http://lvs.local/api/channels/ch-1/hls/master.m3u8';

afterEach(cleanup);
beforeEach(() => {
  hlsState.error = null;
  hlsState.failure = null;
  hlsState.loading = false;
  hlsState.phase = 'playing';
  hlsState.audioOnly = null;
  hlsState.latencySec = null;
  hlsState.seekToLive = vi.fn();
  hlsState.retry = vi.fn();
});

/** A MediaStream stand-in. jsdom has none, and only the track methods matter. */
function fakeStream(opts: { video?: boolean; audio?: boolean } = {}) {
  const videoTracks = opts.video
    ? [{ kind: 'video', readyState: 'live', enabled: true, muted: false }]
    : [];
  const audioTracks = opts.audio === false ? [] : [{ kind: 'audio' }];
  return {
    id: 's1',
    getTracks: () => [...videoTracks, ...audioTracks],
    getVideoTracks: () => videoTracks,
    getAudioTracks: () => audioTracks,
    addEventListener: () => {},
    removeEventListener: () => {},
  } as unknown as MediaStream;
}

describe('an audio-only broadcast', () => {
  // THE common case: a call published from a machine whose camera is busy.
  // The stage used to render it literally — a black rectangle wearing a LIVE
  // badge — so everything the viewer could see said "broken" about a broadcast
  // that was working.
  it('says so, rather than showing a black rectangle', () => {
    render(<StreamStage live stream={fakeStream({ video: false })} speakerName="Alex Chen" />);
    const card = screen.getByTestId('stream-stage-audio-only');
    expect(card).toBeInTheDocument();
    expect(screen.getByTestId('stream-stage')).toHaveAttribute('data-audio-only', 'true');
    // Identity, so a stream with no picture still has a who.
    expect(card).toHaveTextContent('Alex Chen');
  });

  it('names the fix when the viewer is the one who cannot hear it', () => {
    render(<StreamStage live stream={fakeStream({ video: false })} />);
    expect(screen.getByTestId('stream-stage-audio-only-hint')).toHaveTextContent(/unmute/i);
    fireEvent.click(screen.getByTestId('stream-stage-mute-toggle'));
    expect(screen.getByTestId('stream-stage-audio-only-hint')).not.toHaveTextContent(/unmute/i);
  });

  it('gets out of the way as soon as a video track arrives', () => {
    const { rerender } = render(<StreamStage live stream={fakeStream({ video: false })} />);
    expect(screen.getByTestId('stream-stage-audio-only')).toBeInTheDocument();
    rerender(<StreamStage live stream={fakeStream({ video: true })} />);
    expect(screen.queryByTestId('stream-stage-audio-only')).toBeNull();
  });

  it('takes the HLS player’s word for it on the near-realtime path', () => {
    hlsState.audioOnly = true;
    render(<StreamStage live playlistUrl={PLAYLIST} />);
    expect(screen.getByTestId('stream-stage-audio-only')).toBeInTheDocument();
  });

  // "Not known yet" is not "there is no video", and an audio-only card over a
  // video stream is the same class of lie in the other direction.
  it('waits for an answer rather than assuming', () => {
    hlsState.audioOnly = null;
    render(<StreamStage live playlistUrl={PLAYLIST} />);
    expect(screen.queryByTestId('stream-stage-audio-only')).toBeNull();
  });

  it('lets a host that already knows override the detection', () => {
    render(<StreamStage live audioOnly stream={fakeStream({ video: true })} />);
    expect(screen.getByTestId('stream-stage-audio-only')).toBeInTheDocument();
  });

  // A stream with nothing in it is a failure. Dressing it as "Audio only"
  // would be the friendly version of the same black rectangle.
  it('is not claimed for a stream with no tracks at all', () => {
    expect(streamIsAudioOnly(fakeStream({ video: false, audio: false }))).toBe(false);
    expect(streamIsAudioOnly({} as MediaStream)).toBe(false);
    expect(streamIsAudioOnly(null)).toBe(false);
  });
});

describe('latency', () => {
  // HLS runs seconds behind by construction. A viewer who is not told that
  // reads the delay as a frozen stream — the same misreading that makes a
  // stalled stream and a working one look alike.
  it('tells an HLS viewer how far behind live they are', () => {
    hlsState.latencySec = 6.4;
    render(<StreamStage live playlistUrl={PLAYLIST} />);
    expect(screen.getByTestId('stream-stage-latency')).toHaveTextContent('6s behind');
  });

  it('says so in words when the number is unmeasurable', () => {
    hlsState.latencySec = null;
    render(<StreamStage live playlistUrl={PLAYLIST} />);
    expect(screen.getByTestId('stream-stage-latency')).toHaveTextContent('Behind live');
  });

  it('offers the way back to the live edge', () => {
    hlsState.latencySec = 22;
    render(<StreamStage live playlistUrl={PLAYLIST} />);
    fireEvent.click(screen.getByTestId('stream-stage-latency'));
    expect(hlsState.seekToLive).toHaveBeenCalled();
  });

  // The realtime transport IS the live edge; a "behind live" pill on it would
  // be inventing a delay that does not exist.
  it('is absent on the realtime path', () => {
    render(<StreamStage live stream={fakeStream({ video: true })} />);
    expect(screen.queryByTestId('stream-stage-latency')).toBeNull();
  });
});

describe('buffering, stalled and over are three different things', () => {
  it('keeps the frame and stays quiet for an ordinary rebuffer', () => {
    hlsState.phase = 'buffering';
    render(<StreamStage live playlistUrl={PLAYLIST} />);
    expect(screen.getByTestId('stream-stage-buffering')).toBeInTheDocument();
    // Still live: a momentary rebuffer at the live edge is not a broken stream.
    expect(screen.getByTestId('stream-stage')).toHaveAttribute('data-live', 'true');
    expect(screen.queryByTestId('stream-stage-stalled')).toBeNull();
  });

  it('stops calling a frozen frame LIVE', () => {
    hlsState.phase = 'stalled';
    render(<StreamStage live playlistUrl={PLAYLIST} />);
    expect(screen.getByTestId('stream-stage-stalled')).toBeInTheDocument();
    expect(screen.getByTestId('stream-stage')).toHaveAttribute('data-live', 'false');
    expect(screen.queryByTestId('stream-stage-live')).toBeNull();
    expect(screen.queryByTestId('stream-stage-buffering')).toBeNull();
  });

  it('says what the picture on screen actually is', () => {
    hlsState.phase = 'stalled';
    render(<StreamStage live playlistUrl={PLAYLIST} />);
    expect(screen.getByTestId('stream-stage-stalled')).toHaveTextContent(/last frame/i);
  });

  it('never shows two of them at once', () => {
    for (const p of ['connecting', 'playing', 'buffering', 'stalled', 'error'] as const) {
      cleanup();
      hlsState.phase = p;
      hlsState.loading = p === 'connecting';
      hlsState.error = p === 'error' ? 'nope' : null;
      render(<StreamStage live playlistUrl={PLAYLIST} />);
      const shown = [
        'connecting',
        'buffering',
        'stalled',
        'error',
        'not-started',
        'ended',
        'placeholder',
      ].filter((id) => screen.queryByTestId(`stream-stage-${id}`) !== null);
      expect(shown.length).toBeLessThanOrEqual(1);
    }
  });
});

describe('every road out of waiting ends somewhere', () => {
  // The highest-value property in this file. A stage that can sit on a
  // "waiting" message with no exit is the failure mode this codebase keeps
  // re-shipping, so the promise is bounded on EVERY path, including the one
  // with no source at all — which used to have no timer running.
  it('stops promising a stream that has no source and never arrives', async () => {
    render(<StreamStage stallAfterMs={20} />);
    expect(screen.getByTestId('stream-stage-placeholder')).toBeInTheDocument();
    expect(await screen.findByTestId('stream-stage-not-started')).toHaveTextContent(
      'Nothing is being broadcast right now.',
    );
    expect(screen.queryByTestId('stream-stage-placeholder')).toBeNull();
  });

  it('stops promising a playlist nobody is broadcasting to', async () => {
    hlsState.loading = true;
    hlsState.phase = 'connecting';
    render(<StreamStage live playlistUrl={PLAYLIST} stallAfterMs={20} />);
    expect(await screen.findByTestId('stream-stage-not-started')).toBeInTheDocument();
    // …and takes the LIVE badge down with it.
    expect(screen.getByTestId('stream-stage')).toHaveAttribute('data-live', 'false');
  });

  it('offers a way out of every dead end rather than only naming it', async () => {
    hlsState.loading = true;
    hlsState.phase = 'connecting';
    render(<StreamStage live playlistUrl={PLAYLIST} stallAfterMs={20} />);
    await screen.findByTestId('stream-stage-not-started');
    fireEvent.click(screen.getByTestId('stream-stage-retry'));
    expect(hlsState.retry).toHaveBeenCalled();
  });

  it('lets the host retry what the stage cannot — a re-signed URL, a resubscribe', () => {
    hlsState.phase = 'error';
    hlsState.error = 'HLS error: networkError';
    const onRetry = vi.fn();
    render(<StreamStage live playlistUrl={PLAYLIST} onRetry={onRetry} />);
    fireEvent.click(screen.getByTestId('stream-stage-retry'));
    expect(onRetry).toHaveBeenCalled();
    expect(hlsState.retry).toHaveBeenCalled();
  });

  // A broadcast that is OVER is not a broadcast that is late, and the grace
  // period must not turn one into the other.
  it('does not relabel an ended broadcast as never-started', async () => {
    const { rerender } = render(<StreamStage live playlistUrl={PLAYLIST} stallAfterMs={20} />);
    rerender(<StreamStage playlistUrl={null} stallAfterMs={20} />);
    await act(async () => { await new Promise((r) => setTimeout(r, 40)); });
    expect(screen.getByTestId('stream-stage-ended')).toBeInTheDocument();
    expect(screen.queryByTestId('stream-stage-not-started')).toBeNull();
  });
});

describe('a realtime subscription that delivers nothing', () => {
  // WHEP hands the MediaStream over before `addtrack` fires, so an empty one
  // is a normal first moment. Left unqualified it is the realtime spelling of
  // the HLS bug: a LIVE badge over a black rectangle, forever.
  it('says connecting rather than LIVE while the stream is still empty', () => {
    render(<StreamStage live stream={fakeStream({ video: false, audio: false })} />);
    expect(screen.getByTestId('stream-stage')).toHaveAttribute('data-phase', 'connecting');
    expect(screen.getByTestId('stream-stage')).toHaveAttribute('data-live', 'false');
  });

  it('gives up on it too', async () => {
    render(<StreamStage live stallAfterMs={20} stream={fakeStream({ video: false, audio: false })} />);
    expect(await screen.findByTestId('stream-stage-not-started')).toBeInTheDocument();
  });

  it('starts playing the moment a track lands', () => {
    const { rerender } = render(
      <StreamStage live stream={fakeStream({ video: false, audio: false })} />,
    );
    rerender(<StreamStage live stream={fakeStream({ video: false })} />);
    expect(screen.getByTestId('stream-stage')).toHaveAttribute('data-phase', 'playing');
  });
});

describe('the viewer count', () => {
  // `null` carries "nobody measured", so a numeric 0 is free to mean what it
  // says: somebody counted and the answer was nobody. Collapsing the two back
  // together deletes the honest case — and this gauge was once STRUCTURALLY
  // zero (the tracker had no callers at all), so a visible "0 watching" is
  // exactly what tells a broadcaster the number is live rather than missing.
  it('shows a measured zero', () => {
    render(<StreamStage live playlistUrl={PLAYLIST} viewerCount={0} />);
    expect(screen.getByText('0 watching')).toBeInTheDocument();
  });

  it('says nothing when the count is explicitly unknown', () => {
    const { container } = render(<StreamStage live playlistUrl={PLAYLIST} viewerCount={null} />);
    expect(container.textContent).not.toMatch(/watching/);
  });

  it('shows a real one', () => {
    render(<StreamStage live playlistUrl={PLAYLIST} viewerCount={128} />);
    expect(screen.getByText('128 watching')).toBeInTheDocument();
  });
});

describe('fullscreen', () => {
  const original = Element.prototype.requestFullscreen;
  afterEach(() => {
    if (original) Element.prototype.requestFullscreen = original;
    else delete (Element.prototype as any).requestFullscreen;
  });

  it('is offered, and asks the STAGE to go fullscreen — chrome and all', () => {
    const req = vi.fn(() => Promise.resolve());
    Element.prototype.requestFullscreen = req as unknown as Element['requestFullscreen'];
    render(<StreamStage live playlistUrl={PLAYLIST} />);
    const button = screen.getByTestId('stream-stage-fullscreen');
    fireEvent.click(button);
    expect(req).toHaveBeenCalled();
    // The element that went fullscreen is the stage root, not the bare
    // <video> — otherwise the LIVE badge, chat and unmute control all vanish
    // at exactly the moment the viewer is most committed to watching.
    expect(req.mock.instances[0]).toBe(screen.getByTestId('stream-stage'));
  });

  // No API, no button. An affordance that silently does nothing is worse than
  // its absence.
  it('is hidden where the browser has no fullscreen API', () => {
    delete (Element.prototype as any).requestFullscreen;
    render(<StreamStage live playlistUrl={PLAYLIST} />);
    expect(screen.queryByTestId('stream-stage-fullscreen')).toBeNull();
  });

  it('is not offered over a stage with nothing on it', () => {
    Element.prototype.requestFullscreen = vi.fn(() => Promise.resolve()) as unknown as Element['requestFullscreen'];
    render(<StreamStage />);
    expect(screen.queryByTestId('stream-stage-fullscreen')).toBeNull();
  });
});


/** Put the stage in the failure the real hook would report for `kind`. */
function failWith(kind: HlsFailure['kind'], status: number | null, detail: string) {
  const failure: HlsFailure = {
    kind,
    status,
    detail,
    retryable: kind !== 'unsupported',
  };
  hlsState.phase = 'error';
  hlsState.failure = failure;
  hlsState.error = hlsFailureText(failure);
}

// What a viewer is told when the broadcast will not play.
//
// Observed live: clicking Watch on a room whose broadcast was not producing
// rendered "HLS error: networkError" on the black stage. That is hls.js's own
// enum name — it means nothing to a viewer, and here it was also WRONG: the
// network was fine, the packager answered 503 "no active producers in
// channel". Three different things (empty channel, dead network, wedged
// backend) had one indistinguishable, jargon-shaped appearance.
describe('what a failure SAYS to someone watching', () => {
  const jargon = /hls|networkError|mediaError|manifest|HTTP|50\d|40\d/;

  it('turns a 503 "no active producers" into the state that already means that', () => {
    failWith('no-broadcast', 503, 'manifestLoadError / networkError / HTTP 503');
    render(<StreamStage live playlistUrl={PLAYLIST} />);
    // One fact, one appearance: the same words the grace timeout produces.
    expect(screen.getByTestId('stream-stage-not-started')).toHaveTextContent(
      'Nothing is being broadcast right now.',
    );
    expect(screen.queryByTestId('stream-stage-error')).toBeNull();
    expect(screen.getByTestId('stream-stage')).toHaveAttribute('data-phase', 'not-started');
    // …and the badge goes out with it.
    expect(screen.getByTestId('stream-stage')).toHaveAttribute('data-live', 'false');
  });

  // Same 503, two different viewers. `hadSource` cannot tell them apart on
  // this path — a playlist URL exists from mount — so the stage remembers
  // whether THIS viewer ever saw it run.
  it('tells someone who was watching that it ended', () => {
    const { rerender } = render(<StreamStage live playlistUrl={PLAYLIST} />);
    expect(screen.getByTestId('stream-stage-live')).toBeInTheDocument();
    failWith('no-broadcast', 503, 'manifestLoadError / networkError / HTTP 503');
    rerender(<StreamStage live playlistUrl={PLAYLIST} />);
    expect(screen.getByTestId('stream-stage-ended')).toBeInTheDocument();
    expect(screen.queryByTestId('stream-stage-not-started')).toBeNull();
  });

  it('says the connection when there was no answer at all', () => {
    failWith('network', null, 'manifestLoadTimeOut / networkError');
    render(<StreamStage live playlistUrl={PLAYLIST} />);
    expect(screen.getByTestId('stream-stage-error')).toHaveTextContent(
      /cannot reach the broadcast/i,
    );
  });

  it('owns a 500 rather than blaming the viewer for it', () => {
    failWith('server', 500, 'manifestLoadError / networkError / HTTP 500');
    render(<StreamStage live playlistUrl={PLAYLIST} />);
    expect(screen.getByTestId('stream-stage-error')).toHaveTextContent(/on our side/i);
  });

  it('never puts an hls.js enum or a status code in front of a viewer', () => {
    for (const [kind, status] of [
      ['no-broadcast', 503],
      ['network', null],
      ['server', 500],
      ['media', null],
      ['unsupported', null],
      ['other', null],
    ] as const) {
      failWith(kind, status, 'manifestLoadError / networkError / HTTP 503');
      const { unmount } = render(<StreamStage live playlistUrl={PLAYLIST} />);
      expect(screen.getByTestId('stream-stage').textContent ?? '').not.toMatch(jargon);
      unmount();
    }
  });

  // The detail is not thrown away — it moves off the screen and onto the DOM,
  // where whoever is debugging can still find it.
  it('keeps the developer detail on the element', () => {
    failWith('no-broadcast', 503, 'manifestLoadError / networkError / HTTP 503');
    render(<StreamStage live playlistUrl={PLAYLIST} />);
    const root = screen.getByTestId('stream-stage');
    expect(root).toHaveAttribute('data-error-kind', 'no-broadcast');
    expect(root.getAttribute('data-error-detail')).toContain('HTTP 503');
  });
});

// A control that can never succeed is worse than no control.
describe('what "try again" promises', () => {
  it('offers to look again, not to fix something, at an empty channel', () => {
    failWith('no-broadcast', 503, 'manifestLoadError / networkError / HTTP 503');
    render(<StreamStage live playlistUrl={PLAYLIST} />);
    expect(screen.getByTestId('stream-stage-retry')).toHaveTextContent('Check again');
  });

  it('still says try again for something that genuinely broke', () => {
    failWith('server', 500, 'manifestLoadError / networkError / HTTP 500');
    render(<StreamStage live playlistUrl={PLAYLIST} />);
    expect(screen.getByTestId('stream-stage-retry')).toHaveTextContent('Try again');
  });

  // Nothing about pressing a button twice gives a browser Media Source
  // Extensions.
  it('offers nothing at all where a retry cannot possibly work', () => {
    failWith('unsupported', null, 'no MSE and canPlayType() rejects the playlist');
    render(<StreamStage live playlistUrl={PLAYLIST} />);
    expect(screen.getByTestId('stream-stage-error')).toBeInTheDocument();
    expect(screen.queryByTestId('stream-stage-retry')).toBeNull();
  });

  // An ended broadcast has no playlist left to re-attach, so the stage's own
  // retry is meaningless — but a host that can go and look again may say so.
  it('says nothing about retrying an ended broadcast the host cannot recheck', async () => {
    const { rerender } = render(<StreamStage live playlistUrl={PLAYLIST} stallAfterMs={20} />);
    rerender(<StreamStage playlistUrl={null} stallAfterMs={20} />);
    await act(async () => { await new Promise((r) => setTimeout(r, 40)); });
    expect(screen.getByTestId('stream-stage-ended')).toBeInTheDocument();
    expect(screen.queryByTestId('stream-stage-retry')).toBeNull();
  });

  it('offers to re-check an ended broadcast when the host can', async () => {
    const onRetry = vi.fn();
    const { rerender } = render(
      <StreamStage live playlistUrl={PLAYLIST} onRetry={onRetry} stallAfterMs={20} />,
    );
    rerender(<StreamStage playlistUrl={null} onRetry={onRetry} stallAfterMs={20} />);
    await act(async () => { await new Promise((r) => setTimeout(r, 40)); });
    fireEvent.click(screen.getByTestId('stream-stage-retry'));
    expect(onRetry).toHaveBeenCalled();
  });
});

// The stage's own chrome and the HOST's controls are different things, and
// collapsing them took away the only way out: `controls` is where the Leave
// button lives, so a broadcast that ended left the viewer looking at "The
// broadcast has ended." with nothing to press.
describe('the way out survives every dead end', () => {
  const leave = <button data-testid="leave">Leave</button>;

  it('keeps the host controls when the broadcast ends', async () => {
    const { rerender } = render(
      <StreamStage live playlistUrl={PLAYLIST} controls={leave} stallAfterMs={20} />,
    );
    rerender(<StreamStage playlistUrl={null} controls={leave} stallAfterMs={20} />);
    await act(async () => { await new Promise((r) => setTimeout(r, 40)); });
    expect(screen.getByTestId('stream-stage-ended')).toBeInTheDocument();
    expect(screen.getByTestId('leave')).toBeInTheDocument();
  });

  it('keeps them on a stage that never had a source', async () => {
    render(<StreamStage controls={leave} stallAfterMs={20} />);
    expect(screen.getByTestId('leave')).toBeInTheDocument();
    await screen.findByTestId('stream-stage-not-started');
    expect(screen.getByTestId('leave')).toBeInTheDocument();
  });

  it('keeps them through a playback failure', () => {
    failWith('server', 500, 'manifestLoadError / networkError / HTTP 500');
    render(<StreamStage live playlistUrl={PLAYLIST} controls={leave} />);
    expect(screen.getByTestId('leave')).toBeInTheDocument();
  });

  // …without bringing the stage's own chrome along. A Full screen button on
  // an apology is an offer to enlarge it.
  it('does not bring the stage chrome with them', async () => {
    Element.prototype.requestFullscreen = vi.fn(() => Promise.resolve()) as unknown as Element['requestFullscreen'];
    render(<StreamStage controls={leave} stallAfterMs={20} />);
    await screen.findByTestId('stream-stage-not-started');
    expect(screen.queryByTestId('stream-stage-fullscreen')).toBeNull();
    expect(screen.queryByTestId('stream-stage-mute-toggle')).toBeNull();
  });
});

// The LIVE badge has to mean something.
//
// On the HLS path a caller typically knows only that it composed a playlist
// URL — string concatenation, not a broadcast. A room whose channel was
// provisioned once and has been idle ever since therefore rendered a black
// rectangle wearing a LIVE badge, which is the single most confident lie the
// component could tell. `live` is now the caller's CLAIM, ANDed with what the
// player actually managed to do.

import { render, screen, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it, vi, beforeEach } from 'vitest';

const hlsState = { error: null as string | null, loading: false };
vi.mock('../../../lib/video/useHlsSource', () => ({
  useHlsSource: () => hlsState,
}));

import { StreamStage } from '../StreamStage';

afterEach(cleanup);
beforeEach(() => {
  hlsState.error = null;
  hlsState.loading = false;
});

const PLAYLIST = 'http://lvs.local/api/channels/ch-1/hls/master.m3u8';

describe('a claim of live, on the HLS path', () => {
  it('lights the badge once the player is actually playing', () => {
    render(<StreamStage live playlistUrl={PLAYLIST} title="#room" />);
    expect(screen.getByTestId('stream-stage-live')).toBeInTheDocument();
    expect(screen.getByTestId('stream-stage')).toHaveAttribute('data-live', 'true');
  });

  it('withholds it while the manifest is still loading', () => {
    hlsState.loading = true;
    render(<StreamStage live playlistUrl={PLAYLIST} title="#room" />);
    expect(screen.queryByTestId('stream-stage-live')).toBeNull();
    expect(screen.getByTestId('stream-stage')).toHaveAttribute('data-live', 'false');
  });

  // The screenshot case: a provisioned channel with nothing on it.
  it('withholds it when playback failed', () => {
    hlsState.error = 'Stream unavailable';
    render(<StreamStage live playlistUrl={PLAYLIST} title="#room" />);
    expect(screen.queryByTestId('stream-stage-live')).toBeNull();
    expect(screen.getByTestId('stream-stage-error')).toHaveTextContent('Stream unavailable');
  });

  it('says it is connecting rather than sitting black', () => {
    hlsState.loading = true;
    render(<StreamStage live playlistUrl={PLAYLIST} />);
    expect(screen.getByTestId('stream-stage-connecting')).toBeInTheDocument();
  });

  it('drops the connecting notice once an error replaces it', () => {
    hlsState.loading = true;
    hlsState.error = 'Stream unavailable';
    render(<StreamStage live playlistUrl={PLAYLIST} />);
    expect(screen.queryByTestId('stream-stage-connecting')).toBeNull();
  });

  // A realtime MediaStream is evidence in itself — the caller could not have
  // produced one without a peer connection — so that path is untouched.
  it('leaves the realtime path alone', () => {
    const stream = { getTracks: () => [], getVideoTracks: () => [], getAudioTracks: () => [] };
    hlsState.loading = true;
    render(<StreamStage live stream={stream as unknown as MediaStream} title="#room" />);
    expect(screen.getByTestId('stream-stage')).toHaveAttribute('data-live', 'true');
  });
});

describe('a stream that never starts', () => {
  it('says "Connecting…" first', () => {
    hlsState.loading = true;
    render(<StreamStage live playlistUrl={PLAYLIST} stallAfterMs={50} />);
    expect(screen.getByTestId('stream-stage-connecting')).toBeInTheDocument();
    expect(screen.queryByTestId('stream-stage-not-started')).toBeNull();
  });

  // HLS does not error on a channel nobody is broadcasting to — it simply
  // never delivers a segment — so without this the viewer waits on a spinner
  // forever, told nothing.
  it('admits nothing is coming once the grace period passes', async () => {
    hlsState.loading = true;
    render(<StreamStage live playlistUrl={PLAYLIST} stallAfterMs={30} />);
    expect(await screen.findByTestId('stream-stage-not-started')).toHaveTextContent(
      'Nothing is being broadcast right now.',
    );
    expect(screen.queryByTestId('stream-stage-connecting')).toBeNull();
  });

  it('lets the host word it', async () => {
    hlsState.loading = true;
    render(
      <StreamStage live playlistUrl={PLAYLIST} stallAfterMs={30} notStartedLabel="The show starts at 8." />,
    );
    expect(await screen.findByTestId('stream-stage-not-started')).toHaveTextContent(
      'The show starts at 8.',
    );
  });

  it('never calls a playing stream stalled', async () => {
    hlsState.loading = false;
    render(<StreamStage live playlistUrl={PLAYLIST} stallAfterMs={30} />);
    await new Promise((r) => setTimeout(r, 60));
    expect(screen.queryByTestId('stream-stage-not-started')).toBeNull();
    expect(screen.getByTestId('stream-stage')).toHaveAttribute('data-live', 'true');
  });

  it('leaves a real error to say its own piece', async () => {
    hlsState.loading = true;
    hlsState.error = 'Stream unavailable';
    render(<StreamStage live playlistUrl={PLAYLIST} stallAfterMs={30} />);
    await new Promise((r) => setTimeout(r, 60));
    expect(screen.queryByTestId('stream-stage-not-started')).toBeNull();
    expect(screen.getByTestId('stream-stage-error')).toBeInTheDocument();
  });
});

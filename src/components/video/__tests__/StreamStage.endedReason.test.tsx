// Ending and failing are different facts, and the stage used to say the same
// sentence about both.
//
// Two roads reach the `ended` phase:
//
//   withdrawn — the host took the source away. The playlist is gone, and the
//               only thing that removes it is the session closing. A decision.
//   stopped   — the playlist is STILL attached and the packager answered "no
//               active producers" (a 503). The broadcaster's publish stopped
//               reaching the server. A crashed tab, a dropped network and a
//               clean hang-up are indistinguishable here.
//
// Both rendered "The broadcast has ended.", which turned every broadcaster-side
// failure into a decision the broadcaster never made and sent the audience away
// from a stream that was about to come back. `useHlsSource` refuses that guess
// on purpose — its own `no-broadcast` copy is deliberately neutral — and the
// phase rewrite in StreamStage threw the neutrality away.

import { render, screen, cleanup } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const hlsState = {
  phase: 'playing' as string,
  error: null as string | null,
  loading: false,
  // Faithful to the real hook: every `no-broadcast` it produces carries
  // `retryable: true` (useHlsSource.ts:155).
  failure: null as { kind: string; detail?: string; retryable?: boolean } | null,
  audioOnly: false,
};
vi.mock('../../../lib/video/useHlsSource', () => ({
  useHlsSource: () => hlsState,
}));

import { StreamStage } from '../StreamStage';

const PLAYLIST = 'http://lvs.local/api/channels/ch-1/hls/master.m3u8';

afterEach(cleanup);
beforeEach(() => {
  hlsState.phase = 'playing';
  hlsState.error = null;
  hlsState.loading = false;
  hlsState.failure = null;
  hlsState.audioOnly = false;
});

describe('why the stage is empty', () => {
  // The host withdrew the source. This one really is an ending.
  it('says the broadcast ended when the source was taken away', () => {
    const { rerender } = render(<StreamStage live playlistUrl={PLAYLIST} />);
    rerender(<StreamStage live playlistUrl={null} />);

    const ended = screen.getByTestId('stream-stage-ended');
    expect(ended).toHaveTextContent('The broadcast has ended.');
    expect(ended).toHaveAttribute('data-ended-reason', 'withdrawn');
  });

  // The playlist is still there and the packager says nobody is producing.
  // Nothing here distinguishes a hang-up from a broadcaster whose wifi died,
  // so the stage must not pick one.
  it('does not call a stalled publish an ending', () => {
    const { rerender } = render(<StreamStage live playlistUrl={PLAYLIST} />);

    hlsState.phase = 'error';
    hlsState.failure = { kind: 'no-broadcast', detail: '503', retryable: true };
    rerender(<StreamStage live playlistUrl={PLAYLIST} />);

    const ended = screen.getByTestId('stream-stage-ended');
    expect(ended).toHaveAttribute('data-ended-reason', 'stopped');
    expect(ended).not.toHaveTextContent('The broadcast has ended.');
    expect(ended).toHaveTextContent('The stream stopped.');
    // And says waiting is reasonable, rather than sending the audience away.
    expect(ended).toHaveTextContent(/may be reconnecting/i);
  });

  // On the `stopped` road the playlist IS still attached, so the stage's own
  // retry can genuinely succeed — unlike the withdrawn road, where there is
  // nothing left to re-attach and a retry button could never work.
  it('offers a retry the viewer can actually use when the stream stopped', () => {
    const { rerender } = render(<StreamStage live playlistUrl={PLAYLIST} />);
    hlsState.phase = 'error';
    hlsState.failure = { kind: 'no-broadcast', retryable: true };
    rerender(<StreamStage live playlistUrl={PLAYLIST} />);

    expect(screen.getByTestId('stream-stage-retry')).toBeInTheDocument();
  });

  // A viewer arriving at a channel nobody ever broadcast to has not watched
  // anything end. That distinction already worked and must keep working.
  it('still says nothing is on when the viewer never saw it play', () => {
    hlsState.phase = 'error';
    hlsState.failure = { kind: 'no-broadcast', retryable: true };
    render(<StreamStage live playlistUrl={PLAYLIST} />);

    expect(screen.getByTestId('stream-stage-not-started')).toBeInTheDocument();
    expect(screen.queryByTestId('stream-stage-ended')).toBeNull();
  });

  // A host that KNOWS the broadcast was ended still gets to say so.
  it('lets an explicit endedLabel win over both', () => {
    const { rerender } = render(<StreamStage live playlistUrl={PLAYLIST} />);
    hlsState.phase = 'error';
    hlsState.failure = { kind: 'no-broadcast', retryable: true };
    rerender(<StreamStage live playlistUrl={PLAYLIST} endedLabel="Hank ended the broadcast." />);

    expect(screen.getByTestId('stream-stage-ended')).toHaveTextContent('Hank ended the broadcast.');
  });
});

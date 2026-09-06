import { render, screen, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

// The mapping under test: one component, two transports, mode as data.
const subscriber = vi.fn();
const liveHls = vi.fn();

vi.mock('@connorhoehn/realtime-modules/client/video', () => ({
  useLVSSubscriber: (o: unknown) => subscriber(o),
  useLVSLiveHls: (o: unknown) => liveHls(o),
}));

import { WrappedStreamStage } from '../WrappedStreamStage';

const ARN = 'arn:local:ivs:channel/abc';

function mockHooks({
  stream = null as MediaStream | null,
  phase = 'idle',
  playlistUrl = null as string | null,
  ready = false,
} = {}) {
  subscriber.mockReturnValue({ stream, phase, error: null, tracks: new Map() });
  liveHls.mockReturnValue({ playlistUrl, ready, tokenExpiresInSec: null });
}

afterEach(() => { cleanup(); subscriber.mockReset(); liveHls.mockReset(); });

describe('WrappedStreamStage — transport selection', () => {
  // A component whose job is "let people watch" should default to the mode
  // that scales; realtime is the deliberate, more expensive choice.
  it('defaults to near-realtime', () => {
    mockHooks({ playlistUrl: 'http://lvs/hls/master.m3u8', ready: true });
    render(<WrappedStreamStage channelArn={ARN} />);
    expect(screen.getByTestId('stream-stage')).toHaveAttribute('data-transport', 'hls');
    expect(screen.getByTestId('stream-stage-hls')).toBeInTheDocument();
  });

  it('uses WHEP when asked for realtime', () => {
    const stream = { id: 's' } as unknown as MediaStream;
    mockHooks({ stream, phase: 'live' });
    render(<WrappedStreamStage channelArn={ARN} mode="realtime" />);
    expect(screen.getByTestId('stream-stage')).toHaveAttribute('data-transport', 'realtime');
  });

  // Each hook must stay inert on the other mode — a broadcast that also opens
  // a peer connection per viewer has thrown away the reason to use HLS.
  it('does not open a WHEP connection for a broadcast', () => {
    mockHooks({ playlistUrl: 'http://lvs/hls/master.m3u8', ready: true });
    render(<WrappedStreamStage channelArn={ARN} mode="near-realtime" />);
    expect(subscriber).toHaveBeenCalledWith(expect.objectContaining({ autoStart: false }));
  });

  it('does not build an HLS url for a realtime viewer', () => {
    mockHooks({ stream: { id: 's' } as unknown as MediaStream, phase: 'live' });
    render(<WrappedStreamStage channelArn={ARN} mode="realtime" />);
    expect(liveHls).toHaveBeenCalledWith(expect.objectContaining({ channelArn: null }));
  });

  it('is idle with no channel — the pre-broadcast state, not an error', () => {
    mockHooks();
    render(<WrappedStreamStage channelArn={null} />);
    expect(screen.getByTestId('stream-stage-placeholder')).toBeInTheDocument();
    expect(screen.getByTestId('stream-stage')).toHaveAttribute('data-transport', 'none');
  });

  it('marks LIVE from the transport that is actually carrying the stream', () => {
    mockHooks({ playlistUrl: 'u', ready: true });
    const { rerender } = render(<WrappedStreamStage channelArn={ARN} />);
    expect(screen.getByTestId('stream-stage')).toHaveAttribute('data-live', 'true');

    mockHooks({ stream: null, phase: 'connecting' });
    rerender(<WrappedStreamStage channelArn={ARN} mode="realtime" />);
    expect(screen.getByTestId('stream-stage')).toHaveAttribute('data-live', 'false');
  });

  it('passes the playback token to the HLS composer', () => {
    mockHooks({ playlistUrl: 'u', ready: true });
    render(<WrappedStreamStage channelArn={ARN} playbackToken="jwt" />);
    expect(liveHls).toHaveBeenCalledWith(expect.objectContaining({ playbackToken: 'jwt' }));
  });

  // The wrapper resolves the transport and nothing else.
  it('forwards stage chrome untouched', () => {
    mockHooks({ playlistUrl: 'u', ready: true });
    render(<WrappedStreamStage channelArn={ARN} title="All hands" viewerCount={1200} />);
    expect(screen.getByText('All hands')).toBeInTheDocument();
    expect(screen.getByText(/1[,.]?2/)).toBeInTheDocument();
  });

  it('reports transport status for the host to render its own chrome', () => {
    const onStatusChange = vi.fn();
    mockHooks({ playlistUrl: 'u', ready: true });
    render(<WrappedStreamStage channelArn={ARN} onStatusChange={onStatusChange} />);
    expect(onStatusChange).toHaveBeenCalledWith(
      expect.objectContaining({ mode: 'near-realtime', live: true }),
    );
  });
});

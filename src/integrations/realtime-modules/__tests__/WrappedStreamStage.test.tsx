import { render, screen, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

// The mapping under test: one component, two transports, mode as data.
const subscriber = vi.fn();
const liveHls = vi.fn();
const viewerCount = vi.fn();

vi.mock('@connorhoehn/realtime-modules/client/video', () => ({
  useLVSSubscriber: (o: unknown) => subscriber(o),
  useLVSLiveHls: (o: unknown) => liveHls(o),
  useLVSViewerCount: (o: unknown) => viewerCount(o),
}));

import { WrappedStreamStage } from '../WrappedStreamStage';

const ARN = 'arn:local:ivs:channel/abc';

function mockHooks({
  stream = null as MediaStream | null,
  phase = 'idle',
  playlistUrl = null as string | null,
  ready = false,
  viewers = null as number | null,
} = {}) {
  subscriber.mockReturnValue({ stream, phase, error: null, tracks: new Map() });
  liveHls.mockReturnValue({ playlistUrl, ready, tokenExpiresInSec: null });
  viewerCount.mockReturnValue({ viewerCount: viewers, error: null });
}

afterEach(() => { cleanup(); subscriber.mockReset(); liveHls.mockReset(); viewerCount.mockReset(); });

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
  // Structural, not a flag. useLVSSubscriber THROWS outside an LVSProvider —
  // it is not inert when unused — so a broadcast that merely asked it not to
  // start still crashed in any host without that provider, which is most of
  // them: HLS needs no provider at all. Only the chosen hook may run.
  it('never calls the WHEP hook for a broadcast', () => {
    mockHooks({ playlistUrl: 'http://lvs/hls/master.m3u8', ready: true });
    render(<WrappedStreamStage channelArn={ARN} mode="near-realtime" />);
    expect(subscriber).not.toHaveBeenCalled();
  });

  it('never calls the HLS hook for a realtime viewer', () => {
    mockHooks({ stream: { id: 's' } as unknown as MediaStream, phase: 'live' });
    render(<WrappedStreamStage channelArn={ARN} mode="realtime" />);
    expect(liveHls).not.toHaveBeenCalled();
  });

  // The regression this split exists for: a near-realtime viewer must render
  // even when the realtime hook would throw for want of a provider.
  it('renders a broadcast when the WHEP hook would throw', () => {
    subscriber.mockImplementation(() => {
      throw new Error('[lvs] useLVSContext called outside <LVSProvider>');
    });
    liveHls.mockReturnValue({ playlistUrl: 'http://lvs/hls/master.m3u8', ready: true, tokenExpiresInSec: null });
    viewerCount.mockReturnValue({ viewerCount: null, error: null });
    render(<WrappedStreamStage channelArn={ARN} mode="near-realtime" />);
    expect(screen.getByTestId('stream-stage')).toHaveAttribute('data-transport', 'hls');
  });

  it('is idle with no channel — the pre-broadcast state, not an error', () => {
    mockHooks();
    render(<WrappedStreamStage channelArn={null} />);
    expect(screen.getByTestId('stream-stage-placeholder')).toBeInTheDocument();
    expect(screen.getByTestId('stream-stage')).toHaveAttribute('data-transport', 'none');
  });

  // This used to assert that a composed playlist URL made the stage LIVE. It
  // does not, and asserting it kept the bug in place: `ready` means only that
  // a URL could be built out of a channelArn and a base URL, so an idle
  // channel that was provisioned once rendered a black rectangle wearing a
  // LIVE badge. The badge now waits for the player — see StreamStage.
  it('does not call itself live on a composed URL alone', () => {
    mockHooks({ playlistUrl: 'u', ready: true });
    render(<WrappedStreamStage channelArn={ARN} />);
    expect(screen.getByTestId('stream-stage')).toHaveAttribute('data-transport', 'hls');
    expect(screen.getByTestId('stream-stage')).toHaveAttribute('data-live', 'false');
  });

  it('is not live while the realtime subscriber is still connecting', () => {
    mockHooks({ stream: null, phase: 'connecting' });
    render(<WrappedStreamStage channelArn={ARN} mode="realtime" />);
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


// The number a broadcast is about. StreamStage has accepted `viewerCount`
// from the beginning and nothing ever supplied one, so a stream to a mass
// audience reported no audience at all.
describe('WrappedStreamStage — the audience', () => {
  it('shows the count on the near-realtime leg, which is the one that scales', () => {
    mockHooks({ playlistUrl: 'u', ready: true, viewers: 1200 });
    render(<WrappedStreamStage channelArn={ARN} />);
    expect(screen.getByText('1.2K watching')).toBeInTheDocument();
  });

  it('shows it on the realtime leg too', () => {
    const stream = { id: 's' } as unknown as MediaStream;
    mockHooks({ stream, phase: 'live', viewers: 3 });
    render(<WrappedStreamStage channelArn={ARN} mode="realtime" />);
    expect(screen.getByText('3 watching')).toBeInTheDocument();
  });

  // "We have not been told" must not render as an empty house.
  it('says nothing when the count is unknown', () => {
    mockHooks({ playlistUrl: 'u', ready: true, viewers: null });
    render(<WrappedStreamStage channelArn={ARN} />);
    expect(screen.queryByText(/watching/)).toBeNull();
  });

  it('reports a genuine zero', () => {
    mockHooks({ playlistUrl: 'u', ready: true, viewers: 0 });
    render(<WrappedStreamStage channelArn={ARN} />);
    expect(screen.getByText('0 watching')).toBeInTheDocument();
  });

  it('counts the channel being watched', () => {
    mockHooks({ playlistUrl: 'u', ready: true, viewers: 5 });
    render(<WrappedStreamStage channelArn={ARN} baseUrl="http://lvs.local" />);
    expect(viewerCount).toHaveBeenCalledWith(
      expect.objectContaining({ channelArn: ARN, baseUrl: 'http://lvs.local' }),
    );
  });
});

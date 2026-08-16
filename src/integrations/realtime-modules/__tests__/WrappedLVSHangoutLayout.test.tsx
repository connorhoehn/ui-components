import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import type { HangoutParticipant, HangoutConnectionState } from '@connorhoehn/realtime-modules/client/video';

// jsdom doesn't ship a MediaStream — supply a minimal shim sufficient
// for the wrapper's `el.srcObject = stream` assignment AND for
// useTrackStateBump's `stream.addEventListener('addtrack', ...)` /
// StreamVideo's mutation-rebind path. Both surface needs are
// EventTarget-shaped; we satisfy them with a tiny in-memory dispatcher.
if (typeof (globalThis as any).MediaStream === 'undefined') {
  class MediaStreamShim {
    id = Math.random().toString(36).slice(2);
    _listeners = new Map<string, Set<EventListener>>();
    getTracks(): MediaStreamTrack[] { return []; }
    getAudioTracks(): MediaStreamTrack[] { return []; }
    getVideoTracks(): MediaStreamTrack[] { return []; }
    addEventListener(type: string, handler: EventListener) {
      let s = this._listeners.get(type);
      if (!s) { s = new Set(); this._listeners.set(type, s); }
      s.add(handler);
    }
    removeEventListener(type: string, handler: EventListener) {
      const s = this._listeners.get(type);
      if (s) s.delete(handler);
    }
    dispatchEvent(event: Event) {
      const s = this._listeners.get(event.type);
      if (s) for (const h of s) h(event);
      return true;
    }
  }
  (globalThis as any).MediaStream = MediaStreamShim;
}

// Hoisted mock — must use vi.hoisted because vi.mock is hoisted above
// imports.
const mockState = vi.hoisted(() => ({
  current: {
    participants: [] as HangoutParticipant[],
    isJoined: false,
    isScreenSharing: false,
    isCameraEnabled: true,
    error: null as string | null,
    connectionState: 'connected' as HangoutConnectionState,
    toggleMute: vi.fn(),
    toggleCamera: vi.fn(),
    enableCamera: vi.fn(),
    disableCamera: vi.fn(),
    leave: vi.fn(),
  },
}));

vi.mock('@connorhoehn/realtime-modules/client/video', async () => {
  const actual = await vi.importActual<typeof import('@connorhoehn/realtime-modules/client/video')>(
    '@connorhoehn/realtime-modules/client/video',
  );
  return {
    ...actual,
    useLVSHangout: () => mockState.current,
  };
});

// Import AFTER the mock so the wrapper picks it up.
const { WrappedLVSHangoutLayout } = await import('../WrappedLVSHangoutLayout');

function makeLocal(participantId = 'me'): HangoutParticipant {
  return {
    participantId,
    displayName: 'Me',
    isLocal: true,
    userId: 'Me',
    streams: [new MediaStream()],
    hasAudio: true,
    hasVideo: true,
  };
}

function makeRemote(
  participantId: string,
  overrides: Partial<HangoutParticipant> = {},
): HangoutParticipant {
  return {
    participantId,
    displayName: `User ${participantId}`,
    isLocal: false,
    userId: `User ${participantId}`,
    streams: [new MediaStream()],
    hasAudio: true,
    hasVideo: true,
    ...overrides,
  };
}

describe('WrappedLVSHangoutLayout', () => {
  beforeEach(() => {
    mockState.current = {
      participants: [],
      isJoined: false,
      isScreenSharing: false,
      isCameraEnabled: true,
      error: null,
      connectionState: 'connected',
      toggleMute: vi.fn(),
      toggleCamera: vi.fn(),
      enableCamera: vi.fn(),
      disableCamera: vi.fn(),
      leave: vi.fn(),
    };
  });

  it('renders an empty layout when no participants', () => {
    render(
      <WrappedLVSHangoutLayout
        stageToken="t"
        participantId="me"
        data-testid="wrap"
      />,
    );
    expect(screen.getByTestId('wrap')).toBeInTheDocument();
  });

  it('renders the local tile when participants includes a local entry', () => {
    mockState.current.participants = [makeLocal('me-123')];
    render(
      <WrappedLVSHangoutLayout
        stageToken="t"
        participantId="me-123"
        localTileLabel="You"
        data-testid="wrap"
      />,
    );
    // HangoutLayout renders the local tile with the override label
    expect(screen.getByText('You')).toBeInTheDocument();
  });

  it('renders remote tiles using displayName fallback when displayName is set', () => {
    mockState.current.participants = [
      makeLocal('me'),
      makeRemote('alice-123', { displayName: 'Alice' }),
      makeRemote('bob-456', { displayName: 'Bob' }),
    ];
    render(
      <WrappedLVSHangoutLayout
        stageToken="t"
        participantId="me"
        data-testid="wrap"
      />,
    );
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('omits the local tile when showLocalAsTile=false', () => {
    mockState.current.participants = [
      makeLocal('me'),
      makeRemote('alice', { displayName: 'Alice' }),
    ];
    render(
      <WrappedLVSHangoutLayout
        stageToken="t"
        participantId="me"
        localTileLabel="You"
        showLocalAsTile={false}
        data-testid="wrap"
      />,
    );
    expect(screen.queryByText('You')).not.toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
  });

  it('passes state to the overlay render-prop with correct counts', () => {
    mockState.current.participants = [
      makeLocal('me'),
      makeRemote('alice'),
      makeRemote('bob'),
    ];
    mockState.current.connectionState = 'reconnecting';
    mockState.current.error = null;

    const overlay = vi.fn(() => <div data-testid="my-overlay">overlay</div>);
    render(
      <WrappedLVSHangoutLayout
        stageToken="t"
        participantId="me"
        overlay={overlay}
        data-testid="wrap"
      />,
    );
    expect(screen.getByTestId('my-overlay')).toBeInTheDocument();
    expect(overlay).toHaveBeenCalledWith({
      connectionState: 'reconnecting',
      error: null,
      participantCount: 3,
      remoteCount: 2,
    });
  });

  it('reflects error state in overlay payload', () => {
    mockState.current.participants = [makeLocal('me')];
    mockState.current.connectionState = 'failed';
    mockState.current.error = 'token expired';

    const overlay = vi.fn(() => <div>boom</div>);
    render(
      <WrappedLVSHangoutLayout
        stageToken="t"
        participantId="me"
        overlay={overlay}
      />,
    );
    expect(overlay).toHaveBeenCalledWith(
      expect.objectContaining({
        connectionState: 'failed',
        error: 'token expired',
      }),
    );
  });

  it('renders spotlightContent inside the layout', () => {
    mockState.current.participants = [makeLocal('me'), makeRemote('alice')];
    render(
      <WrappedLVSHangoutLayout
        stageToken="t"
        participantId="me"
        spotlightContent={<div data-testid="spot">REC</div>}
      />,
    );
    expect(screen.getByTestId('spot')).toBeInTheDocument();
  });

  it('projects a remote screenStream into the spotlight slot', () => {
    mockState.current.participants = [
      makeLocal('me'),
      makeRemote('alice', {
        displayName: 'Alice',
        screenStream: new MediaStream(),
      }),
    ];
    render(
      <WrappedLVSHangoutLayout
        stageToken="t"
        participantId="me"
        data-testid="wrap"
      />,
    );
    const spotlight = screen.getByTestId('hangout-spotlight');
    expect(spotlight.getAttribute('data-spotlight-type')).toBe('screen');
    expect(spotlight.getAttribute('data-spotlight-user')).toBe('Alice');
  });

  // ── composite-discipline tests (2.30.0 refinement) ───────────────────
  // The wrapper now delegates to <RemoteTileSlot> for remote camera
  // tiles and <StreamVideo> for screen tiles, so consumers inherit the
  // avatar-fallback + audio-from-t=0 behaviour without per-consumer
  // wiring. These tests pin that contract.

  it('renders remote camera tiles via <RemoteTileSlot> (audio-from-t=0 inheritance)', () => {
    mockState.current.participants = [
      makeLocal('me'),
      makeRemote('alice', { displayName: 'Alice', hasVideo: false }),
    ];
    render(
      <WrappedLVSHangoutLayout
        stageToken="t"
        participantId="me"
        data-testid="wrap"
      />,
    );
    // hasVideo=false → RemoteTileSlot takes the avatar branch, and
    // that branch renders the hidden <audio> binding shipped in 2.29.0.
    expect(screen.getByTestId('remote-tile-avatar-branch')).toBeInTheDocument();
    expect(screen.getByTestId('remote-tile-hidden-audio')).toBeInTheDocument();
  });

  it('renders the local camera tile inline (not via RemoteTileSlot) so it can mirror + mute', () => {
    mockState.current.participants = [makeLocal('me')];
    render(
      <WrappedLVSHangoutLayout
        stageToken="t"
        participantId="me"
        data-testid="wrap"
      />,
    );
    // Local-only roster — there's no remote, so no RemoteTileSlot.
    expect(screen.queryByTestId('remote-tile-avatar-branch')).not.toBeInTheDocument();
    expect(screen.queryByTestId('remote-tile-hidden-audio')).not.toBeInTheDocument();
  });

  it('local-camera fallback (no stream) renders the avatar tile, not RemoteTileSlot', () => {
    mockState.current.participants = [
      { ...makeLocal('me'), streams: [], hasVideo: false },
    ];
    render(
      <WrappedLVSHangoutLayout
        stageToken="t"
        participantId="me"
        data-testid="wrap"
      />,
    );
    expect(screen.getByTestId('local-camera-avatar')).toBeInTheDocument();
    // No remote-tile testids in the local branch.
    expect(screen.queryByTestId('remote-tile-avatar-branch')).not.toBeInTheDocument();
  });

  it('projects a local screenStream into the spotlight slot', () => {
    mockState.current.participants = [
      {
        ...makeLocal('me'),
        displayName: 'Me',
        screenStream: new MediaStream(),
      },
      makeRemote('alice', { displayName: 'Alice' }),
    ];
    render(
      <WrappedLVSHangoutLayout
        stageToken="t"
        participantId="me"
        localTileLabel="Me"
        data-testid="wrap"
      />,
    );
    const spotlight = screen.getByTestId('hangout-spotlight');
    expect(spotlight.getAttribute('data-spotlight-type')).toBe('screen');
    expect(spotlight.getAttribute('data-spotlight-user')).toBe('Me');
  });
});

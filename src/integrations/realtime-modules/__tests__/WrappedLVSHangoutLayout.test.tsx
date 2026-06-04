import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import type { HangoutParticipant, HangoutConnectionState } from '@connorhoehn/realtime-modules/client/video';

// jsdom doesn't ship a MediaStream — supply a minimal shim sufficient
// for the wrapper's `el.srcObject = stream` assignment.
if (typeof (globalThis as any).MediaStream === 'undefined') {
  class MediaStreamShim {
    id = Math.random().toString(36).slice(2);
    getTracks() { return []; }
    getAudioTracks() { return []; }
    getVideoTracks() { return []; }
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

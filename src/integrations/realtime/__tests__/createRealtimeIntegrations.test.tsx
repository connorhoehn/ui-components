// The scope-agnostic entry binds its hook-bound wrappers to an INJECTED bag of
// realtime-modules functions. These tests hand it a fake bag and poison the
// canonical package, so a wrapper that still reached for
// `@connorhoehn/realtime-modules` would throw instead of passing.
import { render, screen, renderHook, cleanup } from '@testing-library/react';
import type { ReactNode } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

const poisoned = () => {
  throw new Error('integrations/realtime reached the canonical @connorhoehn/realtime-modules package');
};
vi.mock('@connorhoehn/realtime-modules/client', () => ({ useCapabilities: poisoned }));
vi.mock('@connorhoehn/realtime-modules/client/video', () => ({
  useLVSHangout: poisoned,
  useLVSSubscriber: poisoned,
  useLVSLiveHls: poisoned,
  useLVSViewerCount: poisoned,
}));
vi.mock('@connorhoehn/realtime-modules/client/hangout-rooms', () => ({ useRoomOccupancy: poisoned }));
vi.mock('@connorhoehn/realtime-modules/call', () => ({ lobbyForChannel: poisoned }));

import {
  createRealtimeIntegrations,
  RealtimeIntegrationsProvider,
  useRealtimeIntegrations,
  useRealtimeCapabilities,
  type RealtimeClientModules,
} from '../index';
import type { RMRoom } from '../../realtime-modules/types';

function fakeModules() {
  const occupancy = {
    slug: 'general',
    count: 2,
    members: [
      { userId: 'u-a', displayName: 'Ada', participantId: 'p-a' },
      { userId: 'u-b', displayName: 'Bo', participantId: 'p-b' },
    ],
  };
  return {
    useCapabilities: vi.fn(() => ({ enabled: { chat: true, video: true }, isLoading: false, error: null })),
    useRoomOccupancy: vi.fn(() => ({ occupancy })),
    useLVSHangout: vi.fn(() => ({ participants: [], connectionState: 'connected', error: null })),
    useLVSSubscriber: vi.fn(() => ({ stream: { id: 's' } as unknown as MediaStream, phase: 'live', error: null, tracks: new Map() })),
    useLVSLiveHls: vi.fn(() => ({ playlistUrl: 'http://lvs/hls/master.m3u8', ready: true, tokenExpiresInSec: null })),
    useLVSViewerCount: vi.fn(() => ({ viewerCount: 7, error: null })),
    lobbyForChannel: vi.fn((channel: string | null) => (channel?.startsWith('dm:') ? `lobby:${channel}` : null)),
  };
}
const asModules = (m: ReturnType<typeof fakeModules>) => m as unknown as RealtimeClientModules;

function room(slug: string, name: string): RMRoom {
  return {
    orgId: 'org-1', roomId: slug, slug, name, createdBy: 'u-1',
    createdAt: '2026-05-30T00:00:00.000Z', visibility: 'org',
    settings: { audioOnly: false, recordingEnabled: false, softCap: 25 },
    state: 'active', lastActiveAt: '2026-05-30T00:00:00.000Z',
  };
}

afterEach(cleanup);

describe('createRealtimeIntegrations — every wrapper calls the injected function', () => {
  it('HangoutRoomRow drives occupancy off the injected useRoomOccupancy', () => {
    const m = fakeModules();
    const { HangoutRoomRow } = createRealtimeIntegrations(asModules(m));
    const subscribe = vi.fn(() => () => {});
    render(<HangoutRoomRow slug="general" name="General" subscribeRoomsIndex={subscribe} />);
    expect(m.useRoomOccupancy).toHaveBeenCalledWith('general', { subscribeRoomsIndex: subscribe });
    expect(screen.getByTestId('room-row')).toHaveAttribute('data-room-active-count', '2');
  });

  it('HangoutRoomsSection and WrappedHangoutRoomsList render rows through the injected hook', () => {
    const m = fakeModules();
    const { WrappedHangoutRoomsList } = createRealtimeIntegrations(asModules(m));
    render(
      <WrappedHangoutRoomsList
        hangoutRooms={{
          rooms: [room('general', 'General')],
          isLoading: false,
          error: null,
          refetch: vi.fn(),
          createRoom: vi.fn(),
          archiveRoom: vi.fn(),
          joinRoom: vi.fn(),
        }}
        subscribeRoomsIndex={() => () => {}}
      />,
    );
    expect(screen.getByTestId('rooms-section')).toBeInTheDocument();
    expect(screen.getByText('General')).toBeInTheDocument();
    expect(m.useRoomOccupancy).toHaveBeenCalled();
  });

  it('RealtimeCapabilityProvider asks the injected useCapabilities and intersects with the declaration', () => {
    const m = fakeModules();
    const { RealtimeCapabilityProvider } = createRealtimeIntegrations(asModules(m));
    const wrapper = ({ children }: { children: ReactNode }) => (
      <RealtimeCapabilityProvider capabilities={{ chat: true, video: true }} channel="c-1">
        {children}
      </RealtimeCapabilityProvider>
    );
    const { result } = renderHook(() => useRealtimeCapabilities(), { wrapper });
    expect(m.useCapabilities).toHaveBeenCalledWith(['chat', 'video'], 'c-1');
    expect(result.current.can.chat).toBe(true);
    expect(result.current.can.video).toBe(true);
    expect(result.current.can.presence).toBe(false);
  });

  it('conversationFeaturesFor asks the injected lobbyForChannel', () => {
    const m = fakeModules();
    const { conversationFeaturesFor } = createRealtimeIntegrations(asModules(m));
    expect(conversationFeaturesFor({ channel: 'dm:a:b' })).toContain('calls');
    expect(conversationFeaturesFor({ channel: 'general' })).not.toContain('calls');
    expect(m.lobbyForChannel).toHaveBeenCalledWith('dm:a:b');
  });

  it('WrappedStreamStage uses the injected LVS hooks for each transport', () => {
    const m = fakeModules();
    const { WrappedStreamStage } = createRealtimeIntegrations(asModules(m));
    render(<WrappedStreamStage channelArn="arn:ch" />);
    expect(screen.getByTestId('stream-stage')).toHaveAttribute('data-transport', 'hls');
    expect(m.useLVSLiveHls).toHaveBeenCalled();
    expect(m.useLVSSubscriber).not.toHaveBeenCalled();
    cleanup();
    render(<WrappedStreamStage channelArn="arn:ch" mode="realtime" />);
    expect(screen.getByTestId('stream-stage')).toHaveAttribute('data-transport', 'realtime');
    expect(m.useLVSSubscriber).toHaveBeenCalled();
    expect(m.useLVSViewerCount).toHaveBeenCalled();
  });

  it('WrappedLVSHangoutLayout uses the injected useLVSHangout', () => {
    const m = fakeModules();
    const { WrappedLVSHangoutLayout } = createRealtimeIntegrations(asModules(m));
    render(
      <WrappedLVSHangoutLayout
        stageToken="tok"
        participantId="p-self-123456"
        data-testid="lvs"
        overlay={(s) => <span data-testid="state">{s.connectionState}</span>}
      />,
    );
    expect(m.useLVSHangout).toHaveBeenCalledWith(
      expect.objectContaining({ stageToken: 'tok', participantId: 'p-self-123456' }),
    );
    expect(screen.getByTestId('lvs')).toBeInTheDocument();
    expect(screen.getByTestId('state')).toHaveTextContent('connected');
  });
});

describe('RealtimeIntegrationsProvider', () => {
  it('binds once per modules object and serves the bound set', () => {
    const modules = asModules(fakeModules());
    const wrapper = ({ children }: { children: ReactNode }) => (
      <RealtimeIntegrationsProvider modules={modules}>{children}</RealtimeIntegrationsProvider>
    );
    const { result, rerender } = renderHook(() => useRealtimeIntegrations(), { wrapper });
    const first = result.current;
    expect(typeof first.WrappedStreamStage).toBe('function');
    rerender();
    // Stable identity: a re-render must not re-mint components (that remounts).
    expect(result.current).toBe(first);
    expect(result.current.WrappedStreamStage).toBe(first.WrappedStreamStage);
  });

  it('throws a named error outside a provider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => renderHook(() => useRealtimeIntegrations())).toThrow(/RealtimeIntegrationsProvider/);
    spy.mockRestore();
  });
});

// The call block host, driven by fake call hooks shaped like realtime-modules'.
// The type assertion at the bottom pins `CallBlockModules` to what
// `/client/video` actually exports (checked by `npm run lint`).
import { act, cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { ReactNode } from 'react';
import * as video from '@connorhoehn/realtime-modules/client/video';
import { callHostUnavailable, createCallBlockHost, type CallBlockCall, type CallBlockModules, type CallBlockRing } from '../CallBlockHost';
import * as barrel from '../index';

afterEach(cleanup);
beforeEach(() => { window.localStorage.clear(); start.mockClear(); rejoin.mockClear(); accept.mockClear(); seenLobbies.length = 0; captureAtEntry.length = 0; deviceRequests.length = 0; previewRequests.length = 0; knownIdleCall = false; });

let phase: CallBlockCall['phase'] = 'idle';
let latestCallOptions: Parameters<CallBlockModules['useConversationCall']>[0];
const captureAtEntry: Array<{ micOn: boolean; cameraOn: boolean } | undefined> = [];
const start = vi.fn(async () => { captureAtEntry.push(latestCallOptions.initialMedia); });
const rejoin = vi.fn(async () => { captureAtEntry.push(latestCallOptions.initialMedia); });
const accept = vi.fn(async () => { captureAtEntry.push(latestCallOptions.initialMedia); });
let knownIdleCall = false;
let incomingAccept: ((ring: never) => void) | undefined;
const deviceRequests: Array<{ requestOnMount?: boolean } | undefined> = [];
const previewRequests: Array<{ preview: boolean; previewAudio: boolean; previewVideo: boolean }> = [];
const seenLobbies: string[] = [];

function fakeCall(lobbyName: string): CallBlockCall {
  seenLobbies.push(lobbyName);
  return {
    phase,
    call: phase === 'idle' && !knownIdleCall ? null : { callId: 'c-1', host: 'u-vera', startedAt: 1, participantCount: 1, participants: [] },
    error: null, callingTo: null, elapsedMs: null, activeSpeakerId: null,
    self: { audioOn: true, cameraOn: true, screenSharing: false },
    devices: { prefs: {}, set: vi.fn(), list: { microphones: [], cameras: [], speakers: [], permission: { microphone: 'granted', camera: 'granted' } } },
    toggleMic: vi.fn(), toggleCamera: vi.fn(), toggleScreenShare: vi.fn(),
    start, rejoin, accept, leave: vi.fn(async () => {}),
  };
}

const modules: CallBlockModules = {
  LVSProvider: ({ children }: { children?: ReactNode }) => <>{children}</>,
  useConversationCall: (opts) => { latestCallOptions = opts; return fakeCall(opts.lobbyName); },
  useIncomingConversationCalls: (opts) => { incomingAccept = opts.onAccept; return { rings: [], accept: vi.fn(), decline: vi.fn() }; },
  useMediaDevices: (opts) => { deviceRequests.push(opts); return { microphones: [], cameras: [], speakers: [], permission: { microphone: 'granted', camera: 'granted' }, speakerSelectionSupported: false }; },
  conversationCallDockProps: () => null,
  useAudioVideoSettings: ((opts: any) => { previewRequests.push(opts); return { settings: {}, update: vi.fn(), previewStream: null, micLevel: 0, testMic: async () => {}, testSound: async () => {}, testMicState: 'idle' }; }) as unknown as CallBlockModules['useAudioVideoSettings'],
};
const calls = createCallBlockHost(modules);

function Shell({ children }: { children: ReactNode }) {
  return <calls.CallHostProvider self={{ userId: 'u-vera', displayName: 'Vera Green' }} tenant="orgiq" scopeKey="orgiq|u-vera"
    platformApiUrl="http://platform" getIdToken={() => 'token'} videoUrl="http://sfu" gateway={null} gatewayConfigured connectionState="connected">
    {children}
  </calls.CallHostProvider>;
}

function Page({ channel }: { channel: string }) {
  const view = calls.useCallBlock(channel, { bind: { title: 'Auth Migration huddle' } });
  const host = calls.useCallHost();
  return <div>
    <span data-testid="bound">{host?.lobby?.lobbyName ?? 'none'}</span>
    <span data-testid="here">{String(view.here)}</span>
    <button type="button" data-testid="rejoin" onClick={() => host?.call.rejoin()}>Join known huddle</button>
    <button type="button" data-testid="huddle" onClick={() => host?.startBound?.()}>Huddle</button>
    {view.block}
  </div>;
}

describe('CallBlockHost', () => {
  it('a page binds its lobby; the footer Huddle runs its start through the device check', async () => {
    phase = 'idle';
    render(<Shell><Page channel="pipelines:run:r-1" /></Shell>);
    expect(screen.getByTestId('bound')).toHaveTextContent('pipelines:run:r-1');
    expect(screen.getByTestId('here')).toHaveTextContent('true');
    expect(seenLobbies.at(-1)).toBe('pipelines:run:r-1');
    await act(async () => { screen.getByTestId('huddle').click(); });
    // Not remembered: the check shows before any start.
    expect(screen.getByTestId('prejoin-dialog')).toBeInTheDocument();
    expect(start).not.toHaveBeenCalled();
    await act(async () => { screen.getByTestId('prejoin-join').click(); });
    expect(start).toHaveBeenCalledWith([], undefined);
  });

  it('unmounting the page unbinds while nothing is on', () => {
    phase = 'idle';
    const { rerender } = render(<Shell><Page channel="pipelines:run:r-1" /></Shell>);
    rerender(<Shell><span /></Shell>);
    expect(screen.queryByTestId('bound')).toBeNull();
  });

  it('while the call is the conversation\'s, the composer block draws (the sink claim slot)', () => {
    phase = 'idle';
    const { rerender } = render(<Shell><Page channel="pipelines:run:r-1" /></Shell>);
    expect(screen.queryByTestId('composer-call-dock')).toBeNull();
    phase = 'live';
    rerender(<Shell><Page channel="pipelines:run:r-1" /></Shell>);
    expect(screen.getByTestId('composer-call-dock')).toBeInTheDocument();
    rerender(<Shell><Page channel="pipelines:run:r-2" /></Shell>);
    expect(screen.queryByTestId('composer-call-dock')).toBeNull();
  });

  it('no call can start without a gateway, platform-api, a sign-in or a connection — said in the bar\'s words', () => {
    expect(callHostUnavailable({ gatewayConfigured: false, platformApiUrl: 'x', signedIn: true, connectionState: 'connected' })).toMatch(/realtime gateway/);
    expect(callHostUnavailable({ gatewayConfigured: true, platformApiUrl: null, signedIn: true, connectionState: 'connected' })).toMatch(/platform-api/);
    expect(callHostUnavailable({ gatewayConfigured: true, platformApiUrl: 'x', signedIn: false, connectionState: 'connected' })).toBe('Sign in to start a call');
    expect(callHostUnavailable({ gatewayConfigured: true, platformApiUrl: 'x', signedIn: true, connectionState: 'connecting' })).toBe('Connecting to the realtime gateway…');
    expect(callHostUnavailable({ gatewayConfigured: true, platformApiUrl: 'x', signedIn: true, connectionState: 'connected' })).toBeNull();
  });

  it('the installed /client/video module satisfies CallBlockModules, and the entry exports the factory', () => {
    const bound = barrel.createCallBlockHost(video);
    expect(typeof bound.useCallBlock).toBe('function');
    expect(typeof barrel.callDrawn).toBe('function');
  });
});


describe('CallBlockHost initial capture intent', () => {
  const choice = (remember: boolean) => window.localStorage.setItem('ui.call-prejoin.v1', JSON.stringify({ micOn: false, cameraOn: false, remember }));
  it('both-off preview requests neither permission; entry sees both-off before native start', async () => {
    phase = 'idle'; choice(false);
    render(<Shell><Page channel="initiative:off" /></Shell>);
    await act(async () => { screen.getByTestId('huddle').click(); });
    expect(deviceRequests.at(-1)).toEqual({ requestOnMount: false });
    expect(previewRequests.at(-1)).toEqual({ preview: false, previewAudio: false, previewVideo: false });
    expect(start).not.toHaveBeenCalled();
    await act(async () => { screen.getByTestId('prejoin-join').click(); });
    expect(captureAtEntry).toEqual([{ micOn: false, cameraOn: false }]);
  });
  it('switching on only the camera previews only video and passes that intention before entry', async () => {
    phase = 'idle'; choice(false);
    render(<Shell><Page channel="initiative:camera" /></Shell>);
    await act(async () => { screen.getByTestId('huddle').click(); });
    await act(async () => { screen.getByTestId('prejoin-camera').click(); });
    expect(previewRequests.at(-1)).toEqual({ preview: true, previewAudio: false, previewVideo: true });
    await act(async () => { screen.getByTestId('prejoin-join').click(); });
    expect(captureAtEntry).toEqual([{ micOn: false, cameraOn: true }]);
  });
  it('remembered both-off enters without preview or device-permission request', async () => {
    phase = 'idle'; choice(true);
    render(<Shell><Page channel="initiative:remember" /></Shell>);
    await act(async () => { screen.getByTestId('huddle').click(); });
    expect(screen.queryByTestId('prejoin-dialog')).toBeNull();
    expect(deviceRequests).toEqual([]);
    expect(previewRequests).toEqual([]);
    expect(captureAtEntry).toEqual([{ micOn: false, cameraOn: false }]);
  });
  it('a discovered existing huddle joins with its selected both-off intent', async () => {
    phase = 'idle'; knownIdleCall = true; choice(false);
    render(<Shell><Page channel="initiative:known" /></Shell>);
    await act(async () => { screen.getByTestId('rejoin').click(); });
    await act(async () => { screen.getByTestId('prejoin-join').click(); });
    expect(rejoin).toHaveBeenCalledTimes(1);
    expect(captureAtEntry).toEqual([{ micOn: false, cameraOn: false }]);
  });
  it('accept binds the incoming lobby first, then accepts with both-off intent', async () => {
    phase = 'idle'; choice(false);
    render(<Shell><Page channel="initiative:old" /></Shell>);
    const ring = { callId: 'incoming-off', lobbyName: 'initiative:ring', channel: 'initiative:ring', callerId: 'u-eli', callerName: 'Eli', audioOnly: false, kind: 'invite', targeted: true, receivedAt: 1 } as CallBlockRing;
    await act(async () => { incomingAccept!(ring as never); });
    expect(screen.getByTestId('bound')).toHaveTextContent('initiative:ring');
    expect(accept).not.toHaveBeenCalled();
    await act(async () => { screen.getByTestId('prejoin-join').click(); });
    expect(accept).toHaveBeenCalledWith(ring);
    expect(captureAtEntry).toEqual([{ micOn: false, cameraOn: false }]);
  });
});


describe('native call device feedback', () => {
  it('shows one dismissible nonfatal warning and keeps the live call controls and tiles', async () => {
    const native = createCallBlockHost({ ...modules, conversationCallDockProps: video.conversationCallDockProps });
    phase = 'live';
    const call = { ...fakeCall('initiative:receiver'), self: { audioOn: false, cameraOn: false, screenSharing: false },
      media: { captureError: 'Failed to enable microphone: Permission denied' } };
    const { rerender } = render(<native.ConversationCallDock call={call} title="Receiver" onOpenPeople={() => {}} />);
    expect(screen.getByTestId('conversation-call-dock-capture-error')).toHaveTextContent('You can keep listening');
    expect(screen.getByTestId('conversation-call-dock-capture-error')).toHaveTextContent('turn the device on to retry');
    expect(screen.getAllByTestId('conversation-call-dock-capture-error')).toHaveLength(1);
    expect(screen.getByTestId('conversation-call-dock')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Leave/ })).toBeInTheDocument();
    expect(call.error).toBeNull();
    expect(call.phase).toBe('live');
    await act(async () => { screen.getByRole('button', { name: 'Dismiss' }).click(); });
    expect(screen.queryByTestId('conversation-call-dock-capture-error')).toBeNull();
    expect(screen.getByTestId('conversation-call-dock')).toBeInTheDocument();
    rerender(<native.ConversationCallDock call={{ ...call, media: { captureError: null } }} title="Receiver" onOpenPeople={() => {}} />);
    expect(screen.queryByTestId('conversation-call-dock-capture-error')).toBeNull();
  });
});

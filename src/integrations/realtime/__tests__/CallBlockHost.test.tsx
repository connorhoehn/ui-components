// The call block host, driven by fake call hooks shaped like realtime-modules'.
// The type assertion at the bottom pins `CallBlockModules` to what
// `/client/video` actually exports (checked by `npm run lint`).
import { act, cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { ReactNode } from 'react';
import * as video from '@connorhoehn/realtime-modules/client/video';
import { callHostUnavailable, createCallBlockHost, type CallBlockCall, type CallBlockModules } from '../CallBlockHost';
import * as barrel from '../index';

afterEach(cleanup);
beforeEach(() => { window.localStorage.clear(); });

let phase: CallBlockCall['phase'] = 'idle';
const start = vi.fn(async () => {});
const rejoin = vi.fn(async () => {});
const seenLobbies: string[] = [];

function fakeCall(lobbyName: string): CallBlockCall {
  seenLobbies.push(lobbyName);
  return {
    phase,
    call: phase === 'idle' ? null : { callId: 'c-1', host: 'u-vera', startedAt: 1, participantCount: 1, participants: [] },
    error: null, callingTo: null, elapsedMs: null, activeSpeakerId: null,
    self: { audioOn: true, cameraOn: true, screenSharing: false },
    devices: { prefs: {}, set: vi.fn(), list: { microphones: [], cameras: [], speakers: [], permission: { microphone: 'granted', camera: 'granted' } } },
    toggleMic: vi.fn(), toggleCamera: vi.fn(), toggleScreenShare: vi.fn(),
    start, rejoin, accept: vi.fn(async () => {}), leave: vi.fn(async () => {}),
  };
}

const modules: CallBlockModules = {
  LVSProvider: ({ children }: { children?: ReactNode }) => <>{children}</>,
  useConversationCall: (opts) => fakeCall(opts.lobbyName),
  useIncomingConversationCalls: () => ({ rings: [], accept: vi.fn(), decline: vi.fn() }),
  useMediaDevices: () => ({ microphones: [], cameras: [], speakers: [], permission: { microphone: 'granted', camera: 'granted' }, speakerSelectionSupported: false }),
  conversationCallDockProps: () => null,
  useAudioVideoSettings: (() => ({ settings: {}, update: vi.fn(), previewStream: null, micLevel: 0, testMic: async () => {}, testSound: async () => {}, testMicState: 'idle' })) as unknown as CallBlockModules['useAudioVideoSettings'],
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

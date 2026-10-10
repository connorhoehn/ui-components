// ConversationCallDock + IncomingCallToast — the conversation-call pair of the
// scope-agnostic entry. The dock is driven by RM's real (pure)
// `conversationCallDockProps`, injected the way an app would; the settings hook
// is a fake. The type assertions at the bottom pin the structural mirrors to
// what realtime-modules actually returns (checked by `npm run lint`).
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, expectTypeOf, it, vi } from 'vitest';
import {
  conversationCallDockProps,
  type ConversationCallDockProps as RMDockProps,
  type ConversationCallResult,
  type IncomingConversationCall,
  type UseAudioVideoSettingsResult,
} from '@connorhoehn/realtime-modules/client/video';
import type { CallDockProps } from '../../../components/video/CallDock';
import type { RMAudioVideoSettingsSource } from '../../realtime-modules/WrappedAudioVideoSettingsForm';
import {
  createConversationCallDock,
  IncomingCallToast,
  incomingCallTitle,
  type RMConversationCallParticipant,
  type RMConversationCallSource,
  type RMIncomingConversationCall,
} from '../index';

afterEach(cleanup);

function person(id: string, name: string, isLocal = false): RMConversationCallParticipant {
  return {
    id, userId: id, displayName: name, isLocal, state: 'in-call',
    audioOn: true, cameraOn: true, screenSharing: false, participantId: null, stream: null, screenStream: null,
  };
}

function fakeCall(over: Partial<RMConversationCallSource> = {}): RMConversationCallSource {
  return {
    phase: 'live',
    call: { participants: [person('u-vera', 'Vera Green', true), person('u-nora', 'Nora DaSilva')], participantCount: 2 },
    error: null,
    callingTo: null,
    elapsedMs: 4_000,
    activeSpeakerId: null,
    self: { audioOn: true, cameraOn: true, screenSharing: false },
    devices: {
      prefs: {},
      set: vi.fn(),
      list: {
        microphones: [{ deviceId: 'mic-1', label: 'Built-in mic' }],
        cameras: [{ deviceId: 'cam-1', label: 'FaceTime camera' }],
        speakers: [],
        permission: { microphone: 'granted', camera: 'granted' },
      },
    },
    toggleMic: vi.fn(),
    toggleCamera: vi.fn(),
    toggleScreenShare: vi.fn(),
    leave: vi.fn(),
    rejoin: vi.fn(),
    ...over,
  };
}

function fakeSettings() {
  return {
    settings: {
      noiseSuppression: true, echoCancellation: true, autoGainControl: true, volume: 1,
      mirrorPreview: true, quality: 'auto' as const, frameRate: 'auto' as const, rememberDevices: true,
    },
    update: vi.fn(),
    constraints: vi.fn(() => ({})),
    previewStream: null,
    previewError: null,
    micLevel: 0,
    testMic: vi.fn(async () => undefined),
    testSound: vi.fn(async () => undefined),
    testMicState: 'idle' as const,
  };
}

function bind() {
  const settings = fakeSettings();
  const rm = {
    conversationCallDockProps: vi.fn(conversationCallDockProps),
    useAudioVideoSettings: vi.fn(() => settings),
  };
  return { rm, settings, Dock: createConversationCallDock(rm as never) };
}

describe('ConversationCallDock', () => {
  it('draws nothing while the call is idle or ringing', () => {
    const { Dock } = bind();
    const { container, rerender } = render(<Dock call={fakeCall({ phase: 'idle', call: null })} title="Auth Migration" onOpenPeople={() => {}} />);
    expect(container).toBeEmptyDOMElement();
    rerender(<Dock call={fakeCall({ phase: 'ringing', call: null })} title="Auth Migration" onOpenPeople={() => {}} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('names who is being rung while calling, and Cancel leaves', () => {
    const { Dock } = bind();
    const call = fakeCall({ phase: 'calling', callingTo: 'Nora DaSilva', call: { participants: [person('u-vera', 'Vera Green', true)], participantCount: 1 } });
    render(<Dock call={call} title="Auth Migration" onOpenPeople={() => {}} data-testid="initiative-call-dock" />);
    expect(screen.getByTestId('initiative-call-dock')).toBeInTheDocument();
    expect(screen.getByTestId('call-dock-meta')).toHaveTextContent('Calling Nora DaSilva…');
    fireEvent.click(screen.getByTestId('call-dock-leave'));
    expect(call.leave).toHaveBeenCalledTimes(1);
  });

  it('draws ringing invitees as placeholder tiles after the caller, and drops them once they answer (2.436.0)', () => {
    const { Dock } = bind();
    const ring = (id: string, name: string): RMConversationCallParticipant => ({ ...person(id, name), state: 'ringing' });
    const calling = fakeCall({
      phase: 'calling', callingTo: 'Nora DaSilva',
      call: { participants: [person('u-vera', 'Vera Green', true), ring('u-nora', 'Nora DaSilva'), ring('u-ian', 'Ian Park'),
        { ...person('u-sam', 'Sam Lee'), state: 'declined' }], participantCount: 1 },
    });
    const { rerender } = render(<Dock call={calling} title="Observability" onOpenPeople={() => {}} />);
    const row = screen.getByTestId('call-dock-tile-row');
    expect(row).toHaveAttribute('data-tile-count', '3');
    const tiles = row.querySelectorAll('[data-peer-id]');
    expect(tiles[0]).toHaveAttribute('data-is-local', 'true');
    const ringing = row.querySelectorAll('[data-ringing="true"]');
    expect([...ringing].map(t => t.getAttribute('data-peer-id'))).toEqual(['u-nora', 'u-ian']);
    expect(ringing[0]).toHaveAttribute('aria-label', 'Nora DaSilva, ringing');
    expect(ringing[0]).toHaveTextContent('Ringing…');
    // The head count is the people in the call, never the invitees.
    expect(screen.getByTestId('call-dock-meta')).toHaveTextContent('Calling Nora DaSilva…');
    rerender(<Dock call={fakeCall({ call: { participants: [person('u-vera', 'Vera Green', true), person('u-nora', 'Nora DaSilva'), ring('u-ian', 'Ian Park')], participantCount: 2 } })}
      title="Observability" onOpenPeople={() => {}} />);
    expect(screen.getByTestId('call-dock-meta')).toHaveTextContent('2 people');
    expect([...screen.getByTestId('call-dock-tile-row').querySelectorAll('[data-ringing="true"]')].map(t => t.getAttribute('data-peer-id'))).toEqual(['u-ian']);
    expect(screen.getByTestId('call-dock-tile-row')).toHaveAttribute('data-tile-count', '3');
  });

  it('live: the head count, one tile per person in the call, and the notice above the shelf', () => {
    const { Dock, rm } = bind();
    const onOpenPeople = vi.fn();
    render(
      <Dock call={fakeCall()} title="Auth Migration" onOpenPeople={onOpenPeople} notice="Nora Chang has no sign-in, so the call will not ring them." />,
    );
    expect(screen.getByTestId('call-dock-meta')).toHaveTextContent('2 people');
    expect(screen.getByTestId('conversation-call-dock-notice')).toHaveTextContent('Nora Chang has no sign-in');
    fireEvent.click(screen.getByTestId('call-dock-people'));
    expect(onOpenPeople).toHaveBeenCalled();
    expect(rm.conversationCallDockProps).toHaveBeenCalled();
    const ui = rm.conversationCallDockProps.mock.calls[0]![1];
    expect(ui.title).toBe('Auth Migration');
    // Default tiles: StreamVideo when there is a stream, initials otherwise.
    expect(ui.tile(person('u-x', 'X'))).toBeUndefined();
  });

  it('forwards layout="grid": the tiles only, in a grid, the bar keeps the controls', () => {
    const { Dock } = bind();
    const { rerender } = render(<Dock call={fakeCall()} title="Auth Migration" onOpenPeople={() => {}} layout="grid" data-testid="shell-dock" />);
    expect(screen.getByTestId('shell-dock')).toHaveAttribute('data-layout', 'grid');
    expect(screen.getByTestId('call-dock-tile-row')).toHaveAttribute('data-variant', 'grid');
    expect(screen.getByTestId('call-dock-tile-row')).toHaveAttribute('data-tile-count', '2');
    expect(screen.queryByTestId('call-dock-leave')).toBeNull();
    rerender(<Dock call={fakeCall()} title="Auth Migration" onOpenPeople={() => {}} data-testid="shell-dock" />);
    expect(screen.getByTestId('shell-dock')).toHaveAttribute('data-layout', 'shelf');
    expect(screen.getByTestId('call-dock-leave')).toBeInTheDocument();
  });

  it('forwards layout="stack", tileSize and the call\'s documents (2.432.0)', () => {
    const { Dock } = bind();
    const onOpenDocuments = vi.fn();
    const { rerender } = render(<Dock call={fakeCall()} title="Auth Migration" onOpenPeople={() => {}} layout="stack" data-testid="shell-dock"
      documents={[{ id: 'd1', title: 'Auth architecture' }, { id: 'd2', title: 'Migration brief' }]} onOpenDocuments={onOpenDocuments} />);
    expect(screen.getByTestId('shell-dock')).toHaveAttribute('data-layout', 'stack');
    expect(screen.getByTestId('call-dock-tile-row')).toHaveAttribute('data-variant', 'grid');
    expect(screen.getByTestId('call-dock-leave')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('call-dock-more'));
    fireEvent.click(screen.getByTestId('call-dock-documents'));
    expect(onOpenDocuments).toHaveBeenCalledOnce();
    rerender(<Dock call={fakeCall()} title="Auth Migration" onOpenPeople={() => {}} tileSize="lg" data-testid="shell-dock"
      documents={[{ id: 'd1', title: 'Auth architecture' }]} onOpenDocuments={onOpenDocuments} />);
    expect(screen.getByTestId('shell-dock')).toHaveAttribute('data-tile-size', 'lg');
    expect(screen.getByTestId('call-dock-document-d1')).toHaveTextContent('Auth architecture');
    expect(screen.getByTestId('call-dock-documents')).toHaveAttribute('aria-label', 'Documents (1)');
  });

  it('opens its own device settings, previewing only while open, and keeps the call in step', () => {
    const { Dock, rm, settings } = bind();
    const call = fakeCall();
    render(<Dock call={call} title="Auth Migration" onOpenPeople={() => {}} selfName="Vera Green" />);
    expect(rm.useAudioVideoSettings).toHaveBeenLastCalledWith({ preview: false });
    fireEvent.click(screen.getByTestId('call-dock-settings'));
    expect(screen.getByRole('dialog', { name: 'Call devices' })).toBeInTheDocument();
    expect(rm.useAudioVideoSettings).toHaveBeenLastCalledWith({ preview: true });
    expect(screen.getByTestId('conversation-call-dock-settings')).toBeInTheDocument();
    expect(settings.update).not.toHaveBeenCalled();
  });

  it("uses the host's settings surface when given one", () => {
    const { Dock } = bind();
    const onOpenSettings = vi.fn();
    render(<Dock call={fakeCall()} title="t" onOpenPeople={() => {}} onOpenSettings={onOpenSettings} />);
    fireEvent.click(screen.getByTestId('call-dock-settings'));
    expect(onOpenSettings).toHaveBeenCalled();
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('ended: Dismiss leaves', () => {
    const { Dock } = bind();
    const call = fakeCall({ phase: 'ended' });
    render(<Dock call={call} title="t" onOpenPeople={() => {}} />);
    fireEvent.click(screen.getByTestId('call-dock-dismiss'));
    expect(call.leave).toHaveBeenCalled();
  });
});

describe('IncomingCallToast', () => {
  const ring: RMIncomingConversationCall = { callId: 'c1', callerName: 'Vera Green', kind: 'invite', audioOnly: false };

  it('names the caller and the kind of call, and answers', () => {
    const onAccept = vi.fn();
    const onDecline = vi.fn();
    render(<IncomingCallToast ring={ring} onAccept={onAccept} onDecline={onDecline} />);
    const toast = screen.getByTestId('incoming-call-toast');
    expect(toast).toHaveTextContent('Vera Green is calling');
    expect(toast).toHaveTextContent('Video call');
    fireEvent.click(screen.getByTestId('incoming-call-accept'));
    fireEvent.click(screen.getByTestId('incoming-call-decline'));
    expect(onAccept).toHaveBeenCalledTimes(1);
    expect(onDecline).toHaveBeenCalledTimes(1);
  });

  it('an audio call, and a knock', () => {
    render(<IncomingCallToast ring={{ ...ring, audioOnly: true, kind: 'knock' }} onAccept={() => {}} onDecline={() => {}} data-testid="t" />);
    expect(screen.getByTestId('t')).toHaveTextContent('Vera Green asks to join');
    expect(screen.getByTestId('t')).toHaveTextContent('Audio call');
    expect(screen.getByTestId('incoming-call-accept')).toHaveTextContent('Let in');
    expect(incomingCallTitle(ring)).toBe('Vera Green is calling');
  });
});

describe('mirrors agree with realtime-modules (compile time)', () => {
  it('RM results fit the props, and RM dock props fit CallDock', () => {
    expectTypeOf<IncomingConversationCall>().toMatchTypeOf<RMIncomingConversationCall>();
    expectTypeOf<RMDockProps>().toMatchTypeOf<CallDockProps>();
    expectTypeOf<UseAudioVideoSettingsResult>().toMatchTypeOf<RMAudioVideoSettingsSource>();
    // The hook's `devices.list` is the full UseMediaDevicesResult; the mirror needs a subset.
    expectTypeOf<ConversationCallResult>().toMatchTypeOf<RMConversationCallSource>();
  });
});

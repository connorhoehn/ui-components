// src/integrations/realtime/ConversationCallDock.stories.tsx
//
// The conversation-call pair driven by mocked `useConversationCall()` /
// `useIncomingConversationCalls()` results — no gateway, platform-api or SFU.
// The dock is bound to RM's real (pure) `conversationCallDockProps` and a fake
// `useAudioVideoSettings`, the way an app binds it with createConversationCallDock.

import type { Meta, StoryObj } from '@storybook/react-vite';
import { conversationCallDockProps } from '@connorhoehn/realtime-modules/client/video';
import { createConversationCallDock } from './ConversationCallDock';
import { IncomingCallToast } from './IncomingCallToast';
import type { RMConversationCallParticipant, RMConversationCallSource } from './conversationCallTypes';

const noop = () => {};

const ConversationCallDock = createConversationCallDock({
  conversationCallDockProps,
  useAudioVideoSettings: () => ({
    settings: {
      noiseSuppression: true, echoCancellation: true, autoGainControl: true, volume: 1,
      mirrorPreview: true, quality: 'auto', frameRate: 'auto', rememberDevices: true,
    },
    update: noop,
    constraints: () => ({}),
    previewStream: null,
    previewError: null,
    micLevel: 0.2,
    testMic: async () => {},
    testSound: async () => {},
    testMicState: 'idle',
  }),
});

function person(id: string, name: string, isLocal = false): RMConversationCallParticipant {
  return {
    id, userId: id, displayName: name, isLocal, state: 'in-call',
    audioOn: true, cameraOn: false, screenSharing: false, participantId: null, stream: null, screenStream: null,
  };
}

function mockCall(over: Partial<RMConversationCallSource>): RMConversationCallSource {
  return {
    phase: 'live',
    call: { participants: [person('u-vera', 'Vera Green', true), person('u-nora', 'Nora DaSilva')], participantCount: 2 },
    error: null,
    callingTo: null,
    elapsedMs: 94_000,
    activeSpeakerId: null,
    self: { audioOn: true, cameraOn: false, screenSharing: false },
    devices: {
      prefs: {},
      set: noop,
      list: {
        microphones: [{ deviceId: 'mic', label: 'MacBook Pro Microphone' }],
        cameras: [{ deviceId: 'cam', label: 'FaceTime HD Camera' }],
        speakers: [{ deviceId: 'spk', label: 'MacBook Pro Speakers' }],
        permission: { microphone: 'granted', camera: 'granted' },
      },
    },
    toggleMic: noop,
    toggleCamera: noop,
    toggleScreenShare: noop,
    leave: noop,
    rejoin: noop,
    ...over,
  };
}

const meta = {
  title: 'Integrations/ConversationCallDock',
  component: ConversationCallDock,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'The shelf of a DM / room call docked above a composer, from `useConversationCall()`\'s result. ' +
          'Bind once with `createConversationCallDock({ conversationCallDockProps, useAudioVideoSettings })` ' +
          '(or import the canonical `ConversationCallDock` from `integrations/realtime-modules`). ' +
          'Renders nothing while idle or ringing — `IncomingCallToast` answers a ring.',
      },
    },
  },
  args: { title: 'Auth Migration', onOpenPeople: noop, call: mockCall({}) },
} satisfies Meta<typeof ConversationCallDock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Live: Story = {};

export const Calling: Story = {
  args: {
    call: mockCall({
      phase: 'calling',
      callingTo: 'Nora DaSilva',
      elapsedMs: null,
      call: { participants: [person('u-vera', 'Vera Green', true)], participantCount: 1 },
    }),
    notice: 'Nora Chang has no OrgIQ sign-in in this workspace, so the call will not ring them.',
  },
};

export const Ended: Story = { args: { call: mockCall({ phase: 'ended' }) } };

export const Failed: Story = {
  args: { call: mockCall({ phase: 'failed', error: { message: 'the SFU refused the session' } }) },
};

export const IncomingRing: Story = {
  render: () => (
    <IncomingCallToast
      ring={{ callId: 'c1', callerName: 'Vera Green', kind: 'invite', audioOnly: false }}
      onAccept={noop}
      onDecline={noop}
    />
  ),
};

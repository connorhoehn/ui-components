import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { CallDock, type CallDockParticipant, type CallDockProps } from './CallDock';
import { StreamVideo } from './StreamVideo';
import { SparklesIcon } from './MediaIcons';
import { CallSidePanelToggles } from './CallSidePanel';
import { ReactionPickerButton } from './ReactionOverlay';
import { RecordingChip } from './RecordingChip';
import { CAST, DEVICES, REVIEW_DOCS, fakeCameraStream, noop, themed } from './documentCallStoryKit';

// The in-call dock under a document (mockup 02). Stories render it at the
// pane width it gets at 1672 × 941 (1240px) and at 1280 × 720 (compact).

function video(key: string, hue: number) {
  const s = fakeCameraStream(key, hue);
  return s ? <StreamVideo stream={s} muted /> : undefined;
}

function person(
  who: keyof typeof CAST,
  over: Partial<CallDockParticipant> = {},
): CallDockParticipant {
  const c = CAST[who];
  const cameraOn = over.cameraOn ?? true;
  return {
    id: c.userId,
    userId: c.userId,
    displayName: c.name,
    cameraOn,
    audioOn: true,
    screenSharing: false,
    presenting: false,
    connection: 'connected',
    videoElement: cameraOn ? video(c.userId, c.hue) : undefined,
    ...over,
  };
}

const PEOPLE: CallDockParticipant[] = [
  person('connor'),
  person('alice', { presenting: true }),
  person('frank'),
  person('bob', { cameraOn: false, audioOn: false, videoElement: undefined }),
];

function base(over: Partial<CallDockProps> = {}): CallDockProps {
  return {
    title: 'Auth architecture review',
    participantCount: 4,
    elapsedMs: 9 * 60_000 + 41_000,
    phase: 'active',
    documents: [{ ...REVIEW_DOCS[0]!, presenting: false }, REVIEW_DOCS[1]!],
    participants: PEOPLE,
    localParticipantId: CAST.connor.userId,
    activeSpeakerId: null,
    followingUserId: CAST.alice.userId,
    mic: { on: true, onToggle: noop, devices: DEVICES.microphones, selectedDeviceId: 'mbp-mic', onSelectDevice: noop, permission: 'granted' },
    camera: {
      on: true,
      onToggle: noop,
      devices: DEVICES.cameras,
      selectedDeviceId: 'facetime',
      onSelectDevice: noop,
      permission: 'granted',
      extraItems: [{ label: 'Blur background…', onSelect: noop }],
    },
    screenShare: { on: false, onToggle: noop },
    onOpenPeople: noop,
    onOpenDocuments: noop,
    onOpenSettings: noop,
    onPopOut: noop,
    onLeave: noop,
    ...over,
  };
}

function Interactive(props: CallDockProps) {
  const [mic, setMic] = useState(props.mic.on);
  const [cam, setCam] = useState(props.camera.on);
  return (
    <CallDock
      {...props}
      mic={{ ...props.mic, on: mic, onToggle: () => setMic((v) => !v) }}
      camera={{ ...props.camera, on: cam, onToggle: () => setCam((v) => !v) }}
    />
  );
}

const meta = {
  title: 'Video/Document calls/CallDock',
  component: CallDock,
  parameters: { layout: 'fullscreen' },
  render: (args) => (
    <div className="w-[1312px] border border-border">
      <Interactive {...args} />
    </div>
  ),
} satisfies Meta<typeof CallDock>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Mockup 02: four people, following Alice (accent ring), Bob camera off and muted. */
export const Active: Story = { args: base(), decorators: [themed('light')] };
export const ActiveDark: Story = { args: base(), decorators: [themed('dark')] };

/** 1280 × 720: 132 × 74 tiles; the doc chips and the Documents button fold away with the width. */
export const Compact: Story = {
  args: base({ compact: true }),
  decorators: [themed('light')],
  render: (args) => (
    <div className="w-[938px] border border-border">
      <Interactive {...args} />
    </div>
  ),
};
export const CompactDark: Story = { ...Compact, decorators: [themed('dark')] };

export const Connecting: Story = { args: base({ phase: 'connecting', participantCount: 1 }), decorators: [themed('light')] };
export const Reconnecting: Story = { args: base({ phase: 'reconnecting' }), decorators: [themed('light')] };
export const ReconnectingDark: Story = { args: base({ phase: 'reconnecting' }), decorators: [themed('dark')] };

export const MicOffAndSharing: Story = {
  args: base({
    mic: { ...base().mic, on: false },
    screenShare: { on: true, onToggle: noop },
    participants: [person('connor', { screenSharing: true, audioOn: false }), ...PEOPLE.slice(1)],
  }),
  decorators: [themed('light')],
};

export const MicBlocked: Story = {
  args: base({ mic: { ...base().mic, permission: 'denied' }, screenShare: { on: false, onToggle: noop, disabledReason: 'Alice is sharing' } }),
  decorators: [themed('light')],
};

/** More than six people: the row ends with a +N tile. */
export const Overflow: Story = {
  args: base({
    participantCount: 9,
    participants: [
      ...PEOPLE,
      person('carol'),
      ...['Dan Ortiz', 'Eve Park', 'Gus Lee', 'Hana Ito'].map((n, i) => ({
        ...person('carol'),
        id: `u-${i}`,
        userId: `u-${i}`,
        displayName: n,
        cameraOn: false,
        videoElement: undefined,
      })),
    ],
  }),
  decorators: [themed('light')],
};

/** The host with others present: Leave asks first. */
export const HostLeave: Story = {
  args: base({ canEndForEveryone: true, onEndForEveryone: noop }),
  decorators: [themed('light')],
};

export const Ended: Story = {
  args: base({ phase: 'ended', elapsedMs: 12 * 60_000 + 4_000, endedSummary: <strong>Recording will appear in the conversation</strong>, onDismiss: noop }),
  decorators: [themed('light')],
};
export const EndedDark: Story = { ...Ended, decorators: [themed('dark')] };

export const Failed: Story = {
  args: base({ phase: 'error', error: { message: 'the media server stopped answering', onRetry: noop }, onDismiss: noop }),
  decorators: [themed('light')],
};

/** A join that never connected (2.397.2): the banner and its retry take their own copy. */
export const JoinFailed: Story = {
  args: base({
    phase: 'error',
    participantCount: 1,
    error: { message: 'the server could not be reached', title: "Couldn't join the call — the server could not be reached", retryLabel: 'Try again', onRetry: noop },
    onDismiss: noop,
  }),
  decorators: [themed('light')],
};
export const JoinFailedDark: Story = { ...JoinFailed, decorators: [themed('dark')] };

/**
 * Bob's camera is off but he is still talking: his video element stays
 * mounted (invisible) so the audio on that stream keeps playing, and the
 * tile shows his initials. An explicit `audioElement` sink works too.
 */
export const CameraOffRemoteWithAudio: Story = {
  args: base({
    participants: [
      ...PEOPLE.slice(0, 3),
      person('bob', {
        cameraOn: false,
        audioOn: true,
        videoElement: video(CAST.bob.userId, CAST.bob.hue),
        audioElement: <audio data-testid="bob-audio" autoPlay />,
      }),
    ],
    activeSpeakerId: CAST.bob.userId,
    followingUserId: null,
  }),
  decorators: [themed('light')],
};
export const CameraOffRemoteWithAudioDark: Story = { ...CameraOffRemoteWithAudio, decorators: [themed('dark')] };

/**
 * The live editor column (~780px): the title and "4 people · 09:41" keep
 * their natural width; the document chips and the Documents button fold
 * away, and People/Share drop to icon + count, so nothing truncates.
 */
export const EditorColumn780: Story = {
  args: base(),
  decorators: [themed('light')],
  render: (args) => (
    <div className="w-[780px] border border-border">
      <Interactive {...args} />
    </div>
  ),
};
export const EditorColumn780Dark: Story = { ...EditorColumn780, decorators: [themed('dark')] };
/** 1240px: the chips are back and shrink before the title does. */
export const EditorColumn1240: Story = {
  args: base(),
  decorators: [themed('light')],
  render: (args) => (
    <div className="w-[1240px] border border-border">
      <Interactive {...args} />
    </div>
  ),
};

/**
 * A conversation call (the shelf above a chat composer): no review documents,
 * so no chips and no Documents button; the host's reactions trigger and
 * side-panel toggles ride in `extras`, before the settings gear.
 */
const CONVERSATION_TABS = [
  { id: 'chat', label: 'Chat', content: null },
  { id: 'people', label: 'People', content: null },
  { id: 'effects', label: 'Effects', icon: <SparklesIcon size={16} />, content: null },
  { id: 'captions', label: 'Captions', content: null },
];
const conversationExtras = (
  <>
    <ReactionPickerButton tone="surface" onReact={noop} align="right" />
    <RecordingChip armed active />
    <CallSidePanelToggles tone="surface" tabs={CONVERSATION_TABS} activeTab="chat" onTabChange={noop} />
  </>
);
export const Conversation: Story = {
  args: base({ title: '#general', documents: undefined, onOpenDocuments: undefined, compact: true, extras: conversationExtras }),
  decorators: [themed('light')],
  render: (args) => (
    <div className="w-[760px] border border-border">
      <Interactive {...args} />
    </div>
  ),
};
export const ConversationDark: Story = { ...Conversation, decorators: [themed('dark')] };

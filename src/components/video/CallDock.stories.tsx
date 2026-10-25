import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useMemo, useState } from 'react';
import { useActiveSpeaker } from '../../lib/video/useActiveSpeaker';
import { Button } from '../ui/Button';
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

/**
 * The chat column at a 1280×720 window (~904px) with a DM's long name and the
 * host's full extras: title + meta + controls do not fit one line, so the
 * controls take their own right-aligned line instead of covering the name
 * and the clock (2.403.2).
 */
export const ConversationChatColumn904: Story = {
  args: base({
    title: 'Carol Johnson (@e2e-carol-9vstoy)',
    documents: undefined,
    onOpenDocuments: undefined,
    compact: true,
    extras: conversationExtras,
  }),
  decorators: [themed('light')],
  render: (args) => (
    <div className="w-[904px] border border-border">
      <Interactive {...args} />
    </div>
  ),
};
export const ConversationChatColumn904Dark: Story = { ...ConversationChatColumn904, decorators: [themed('dark')] };


/**
 * The chat column with a side pane open (~650px at 1280×720) and a phone-ish
 * 520px column, with the host's full extras: the labels are already icons,
 * so the controls wrap onto a second right-aligned line; settings, pop-out
 * and Leave stay together and Leave is last and never clipped.
 */
export const ConversationChatColumn640: Story = {
  args: base({
    title: 'Carol Johnson (@e2e-carol-9vstoy)',
    documents: undefined,
    onOpenDocuments: undefined,
    compact: true,
    extras: conversationExtras,
  }),
  decorators: [themed('light')],
  render: (args) => (
    <div className="w-[640px] border border-border">
      <Interactive {...args} />
    </div>
  ),
};
export const ConversationChatColumn640Dark: Story = { ...ConversationChatColumn640, decorators: [themed('dark')] };

export const ConversationChatColumn520: Story = {
  ...ConversationChatColumn640,
  render: (args) => (
    <div className="w-[520px] border border-border">
      <Interactive {...args} />
    </div>
  ),
};
export const ConversationChatColumn520Dark: Story = { ...ConversationChatColumn520, decorators: [themed('dark')] };

/**
 * A 1:1 ring from the DM header before the callee answers: "Calling Frank
 * Davis…", no clock and no head count, mic and camera usable, Share disabled
 * until someone joins, and Leave reads Cancel.
 */
export const Calling: Story = {
  args: base({
    title: 'Frank Davis',
    phase: 'calling',
    callingTo: 'Frank Davis',
    participantCount: 1,
    elapsedMs: 33_000,
    participants: [PEOPLE[0]!],
    documents: undefined,
    onOpenDocuments: undefined,
    compact: true,
    extras: conversationExtras,
  }),
  decorators: [themed('light')],
  render: (args) => (
    <div className="w-[760px] border border-border">
      <Interactive {...args} />
    </div>
  ),
};
export const CallingDark: Story = { ...Calling, decorators: [themed('dark')] };

/**
 * Four simulated voices on the Web Audio graph, each changing loudness every
 * 200 ms — everyone talking at once — fed to `useActiveSpeaker`, with the clock
 * ticking every second. With the 600 ms hold (2.407.7) the green ring stays
 * put until someone is clearly and steadily the loudest; "No hold" is the old
 * behaviour, where it jumps on nearly every poll. The clock ticks re-render
 * only the meta line, never the tiles. Press Start (audio needs a gesture);
 * the voices are analysed, not played.
 */
function FourPeopleTalkingDemo(props: CallDockProps) {
  const [started, setStarted] = useState(false);
  const [hold, setHold] = useState(true);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [streams, setStreams] = useState<MediaStream[] | null>(null);

  useEffect(() => {
    if (!started) return;
    const ctx = new AudioContext();
    const voices = PEOPLE.map((_, i) => {
      const osc = ctx.createOscillator();
      osc.frequency.value = 180 + i * 70;
      const gain = ctx.createGain();
      gain.gain.value = 0;
      const out = ctx.createMediaStreamDestination();
      osc.connect(gain).connect(out);
      osc.start();
      return { gain, stream: out.stream };
    });
    setStreams(voices.map((v) => v.stream));
    const talk = setInterval(() => {
      for (const v of voices) v.gain.gain.value = Math.random() < 0.7 ? 0.2 + Math.random() * 0.4 : 0;
    }, 200);
    const clock = setInterval(() => setElapsedMs((ms) => ms + 1000), 1000);
    return () => {
      clearInterval(talk);
      clearInterval(clock);
      void ctx.close();
    };
  }, [started]);

  const speakers = useMemo(
    () => (streams ? PEOPLE.map((p, i) => ({ participantId: p.userId, streams: [streams[i]!] })) : []),
    [streams],
  );
  const { activeSpeakerId } = useActiveSpeaker({ participants: speakers, holdMs: hold ? 600 : 0 });

  return (
    <div className="flex w-[1312px] flex-col gap-3 border border-border p-3">
      <div className="flex items-center gap-2">
        <Button size="sm" onClick={() => setStarted(true)} disabled={started} data-testid="four-talking-start">
          Start
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setHold((h) => !h)} aria-pressed={hold} data-testid="four-talking-hold">
          {hold ? 'Hold 600 ms (on)' : 'No hold'}
        </Button>
      </div>
      <CallDock {...props} elapsedMs={elapsedMs} activeSpeakerId={activeSpeakerId} followingUserId={null} />
    </div>
  );
}

export const FourPeopleTalking: Story = {
  args: base({ elapsedMs: 0 }),
  decorators: [themed('light')],
  render: (args) => <FourPeopleTalkingDemo {...args} />,
};

/** The dedicated call page owns the grid while chat remains beside it. */
export const DedicatedStage: Story = {
  args: base({ layout: 'stage' }),
  decorators: [themed('light')],
};

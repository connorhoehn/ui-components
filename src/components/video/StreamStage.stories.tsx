import type { Meta, StoryObj } from '@storybook/react-vite';
import { StreamStage } from './StreamStage';

// The watch surface: video with identity and chat floating OVER it. Chat during
// a stream is a ticker, not a column — you read it with peripheral attention
// while watching, and a column would take its width from the video itself.

const meta: Meta<typeof StreamStage> = {
  title: 'Video/StreamStage',
  component: StreamStage,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ height: 460, padding: 16, background: 'var(--color-surface-panel)' }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof StreamStage>;

const CHAT = [
  { id: '1', displayName: 'Alex Chen', content: 'joining from the train, audio only' },
  { id: '2', displayName: 'Bea Okonjo', content: 'can you share the deck again?' },
  { id: '3', displayName: 'Sam Ruiz', content: 'the new canvas is live 🎉' },
  { id: '4', displayName: 'Priya N', content: 'following along' },
  { id: '5', displayName: 'Tom L', content: 'audio is much better now' },
];

/** Before a broadcast starts — the normal state, not an error. */
export const WaitingForStream: Story = {
  args: { title: 'Weekly standup' },
};

export const LiveWithChat: Story = {
  name: 'Live, chat rotating over the video',
  args: {
    title: 'Weekly standup',
    live: true,
    viewerCount: 42,
    chatMessages: CHAT,
    chatRotateMs: 2000,
  },
};

/** A silent stream carries no empty chat frame. */
export const LiveNoChat: Story = {
  args: { title: 'Design review', live: true, viewerCount: 7 },
};

/** Rotation off pins the newest messages — useful for screenshots and tests. */
export const ChatPinned: Story = {
  args: {
    title: 'Incident bridge',
    live: true,
    viewerCount: 128,
    chatMessages: CHAT,
    chatRotateMs: 0,
    chatVisibleCount: 4,
  },
};

// ---------------------------------------------------------------------------
// The states a viewer can actually end up in.
//
// Everything below is a screen someone watching a broadcast has been shown for
// real, and most of them used to be indistinguishable from each other: a black
// rectangle, or a still frame, under a LIVE badge.
// ---------------------------------------------------------------------------

/**
 * AUDIO-ONLY — the common case, not an edge one. A call published from a
 * machine whose camera is busy carries audio and no video, and the stage used
 * to render that literally.
 */
export const AudioOnly: Story = {
  args: {
    title: 'Incident bridge',
    live: true,
    audioOnly: true,
    speakerName: 'Nora DaSilva',
    viewerCount: 31,
    muted: false,
  },
};

/** The same broadcast while the viewer is still muted: the fix gets named. */
export const AudioOnlyMuted: Story = {
  args: { ...AudioOnly.args, muted: true },
};

/**
 * NOTHING IS BEING BROADCAST. Where every "waiting" road ends — with or
 * without a playlist. A stage that can sit on "Waiting for the stream…" with
 * no exit is the failure this component keeps having to unlearn.
 */
export const NothingBeingBroadcast: Story = {
  args: { title: 'Weekly standup', stallAfterMs: 1200 },
};

/** Wording the host owns, on the same bounded promise. */
export const NotStartedHostWording: Story = {
  args: {
    title: 'All hands',
    stallAfterMs: 1200,
    notStartedLabel: 'The show starts at 8.',
  },
};

// "The broadcast has ended." has no story: it is reachable only by HOLDING a
// source and then losing it, per mount, which is the whole point of the
// distinction. StreamStage.test.tsx drives that transition.

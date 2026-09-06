import type { Meta, StoryObj } from '@storybook/react-vite';
import { StreamStage } from './StreamStage';

// The same stage, both transports. A viewer cannot tell which one they are on
// — which is the point: the choice is about cost and latency, not chrome.
//
//   realtime      WHEP, sub-second, ONE PEER CONNECTION PER VIEWER.
//                 What a conversation needs; what makes a big audience dear.
//   near-realtime HLS, segmented plain HTTP, cacheable, any audience size.
//                 Costs a few seconds.
//
// If viewers talk back they need realtime. If they watch, near-realtime is
// cheaper by orders of magnitude.

const CHAT = [
  { id: '1', displayName: 'Nora DaSilva', content: 'audio is good here' },
  { id: '2', displayName: 'Sam Ito', content: 'is this being recorded?' },
];

const meta: Meta<typeof StreamStage> = {
  title: 'Video/StreamStage (transports)',
  component: StreamStage,
  decorators: [
    (Story) => (
      <div style={{ height: 420, width: '100%', maxWidth: 760 }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof StreamStage>;

/**
 * NEAR-REALTIME. The stage takes an HLS playlist URL — typically from
 * `useLVSLiveHls`. This is the one to reach for when an audience watches.
 * (The URL here is fake, so the stage shows its playback error, which is
 * itself the point: an unplayable stream says so instead of sitting black.)
 */
export const NearRealtimeHls: Story = {
  args: {
    playlistUrl: 'https://example.invalid/hls/master.m3u8',
    title: 'All hands',
    viewerCount: 1240,
    live: true,
    chatMessages: CHAT,
  },
};

/**
 * REALTIME. The stage takes a MediaStream — from `useLVSSubscriber`. Same
 * chrome exactly; the difference is latency and what it costs to serve.
 */
export const RealtimeWhep: Story = {
  args: {
    stream: null, // a real MediaStream at runtime
    title: 'Design sync',
    viewerCount: 4,
    live: true,
    placeholder: 'A MediaStream renders here (WHEP).',
  },
};

/** No channel yet — the normal state before a broadcast starts. */
export const BeforeItStarts: Story = {
  args: { title: 'All hands', live: false },
};

/** Both given: `stream` wins, because it is the lower-latency source. */
export const BothGivenRealtimeWins: Story = {
  args: {
    stream: null,
    playlistUrl: 'https://example.invalid/hls/master.m3u8',
    title: 'Realtime preferred',
    live: true,
  },
};

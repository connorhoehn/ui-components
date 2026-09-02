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

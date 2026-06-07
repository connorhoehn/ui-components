import type { Meta, StoryObj } from '@storybook/react-vite';
import { CallWidget, type CallWidgetParticipant } from './CallWidget';

const meta = {
  title: 'Video/CallWidget',
  component: CallWidget,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div className="relative w-full h-[500px] bg-slate-50">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CallWidget>;

export default meta;
type Story = StoryObj<typeof meta>;

const alice: CallWidgetParticipant = {
  id: 'alice',
  displayName: 'Alice Johnson',
  isMuted: false,
  isSpeaking: false,
};

const bob: CallWidgetParticipant = {
  id: 'bob',
  displayName: 'Bob Smith',
  isMuted: true,
  isSpeaking: false,
};

export const Ringing: Story = {
  args: {
    state: 'ringing',
    mode: 'audio',
    participants: [],
    callerName: 'Alice Johnson',
    contained: true,
    draggable: false,
    position: 'bottom-right',
    onAnswer: () => console.log('answered'),
    onDecline: () => console.log('declined'),
  },
};

export const Connecting: Story = {
  args: {
    state: 'connecting',
    mode: 'audio',
    participants: [],
    contained: true,
    draggable: false,
    position: 'bottom-right',
  },
};

export const ActiveAudioCall: Story = {
  args: {
    state: 'active',
    mode: 'audio',
    participants: [alice, bob],
    localParticipant: { id: 'me', displayName: 'Me', isMuted: false },
    duration: 142,
    isMuted: false,
    contained: true,
    draggable: false,
    position: 'bottom-right',
    onToggleMute: () => console.log('toggle mute'),
    onEndCall: () => console.log('end call'),
  },
};

export const ActiveVideoCall: Story = {
  args: {
    state: 'active',
    mode: 'video',
    participants: [alice],
    localParticipant: { id: 'me', displayName: 'Me', isMuted: false },
    duration: 65,
    isMuted: false,
    isCameraOn: false,
    contained: true,
    draggable: false,
    position: 'bottom-right',
    onToggleMute: () => console.log('toggle mute'),
    onToggleCamera: () => console.log('toggle camera'),
    onEndCall: () => console.log('end call'),
  },
};

export const Minimized: Story = {
  args: {
    state: 'active',
    mode: 'audio',
    participants: [alice, bob],
    localParticipant: { id: 'me', displayName: 'Me' },
    duration: 302,
    minimized: true,
    contained: true,
    draggable: false,
    position: 'bottom-right',
    onToggleMute: () => console.log('toggle mute'),
    onEndCall: () => console.log('end call'),
    onMinimize: () => console.log('expand'),
  },
};

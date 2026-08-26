import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { ChatPanel } from '../social/ChatPanel';
import type { ChatMessage } from '../../hooks/useChat';
import { CallWidget, type CallWidgetParticipant } from './CallWidget';
import type { CallSidePanelTab } from './CallSidePanel';

const meta = {
  title: 'Video/CallWidget',
  component: CallWidget,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div className="relative w-full h-[500px] bg-surface-panel">
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

// ── Docked side panel ──────────────────────────────────────────────────
// The card widens and the stage column grows with it; both columns share
// ONE height, with the video stage and the chat's message list absorbing
// the slack, so there is no dead band under the control row.

const DOCK_MESSAGES: ChatMessage[] = Array.from({ length: 18 }, (_, i) => ({
  clientId: ['alice', 'bob', 'me'][i % 3],
  displayName: ['Alice Johnson', 'Bob Smith', 'You'][i % 3],
  content: [
    'Can everyone see my screen?',
    'Yep, looks good.',
    'One sec, grabbing the link…',
  ][i % 3],
  timestamp: new Date(1750000000000 + i * 60_000).toISOString(),
}));

function DockedWidget() {
  const [tab, setTab] = useState<string | null>('chat');
  const tabs: CallSidePanelTab[] = [
    {
      id: 'chat',
      label: 'Chat',
      badgeCount: 3,
      // No showHeader/fill here: inside the dock the panel takes both from
      // <DockedPanelContext>.
      content: <ChatPanel tone="dark" messages={DOCK_MESSAGES} onSend={() => {}} />,
    },
    {
      id: 'people',
      label: 'People',
      content: (
        <ul className="m-0 flex list-none flex-col gap-1 p-3 text-[13px] text-white">
          {['Alice Johnson', 'Bob Smith', 'You'].map((n) => (
            <li key={n} className="rounded px-2 py-1.5 hover:bg-white/10">{n}</li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <CallWidget
      state="active"
      mode="video"
      participants={[alice]}
      localParticipant={{ id: 'me', displayName: 'Me', isMuted: false }}
      duration={15}
      isCameraOn={false}
      contained
      draggable={false}
      position="bottom-right"
      sidePanelTabs={tabs}
      activeSidePanelTab={tab}
      onSidePanelTabChange={setTab}
      onToggleMute={() => {}}
      onToggleCamera={() => {}}
      onEndCall={() => {}}
    />
  );
}

export const DockedSidePanel: Story = {
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div className="relative h-[640px] w-full bg-surface-panel">
        <Story />
      </div>
    ),
  ],
  args: { state: 'active', mode: 'video', participants: [] },
  render: () => <DockedWidget />,
};

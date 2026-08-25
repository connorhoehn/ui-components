import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { ConversationList } from '../social/ConversationList';
import { Button } from '../ui/Button';
import CallSidePanel from './CallSidePanel';

// CallSidePanel is a shell — these stories fake the in-call context: a
// dark "video stage" placeholder on the left, the panel as its flex
// sibling on the right, exactly the placement contract the component
// documents. No camera, no realtime hooks, no external URLs.

/** Stand-in for the video layout the panel sits beside. */
function FakeStage() {
  return (
    <div className="flex min-w-0 flex-1 items-center justify-center bg-video-stage text-sm text-white/40">
      video layout (flex-1 sibling)
    </div>
  );
}

/** A plausible chat body so the scrollable slot has something to scroll. */
function FakeChatBody() {
  return (
    <ul className="m-0 flex list-none flex-col gap-2 p-3">
      {Array.from({ length: 24 }, (_, i) => (
        <li key={i} className="rounded-lg bg-white/10 px-3 py-2 text-[13px] text-white">
          {i % 3 === 0 ? 'Can everyone see my screen?' : i % 3 === 1 ? 'Yep, looks good.' : 'One sec, grabbing the link…'}
        </li>
      ))}
    </ul>
  );
}

const meta = {
  title: 'Video/CallSidePanel',
  component: CallSidePanel,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: {
    open: true,
    onClose: () => {},
    title: 'Chat',
    children: null,
  },
} satisfies Meta<typeof CallSidePanel>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The documented placement: panel as a flex sibling of the video stage. */
export const InCallChat: Story = {
  render: (args) => (
    <div className="flex h-[480px]">
      <FakeStage />
      <CallSidePanel {...args}>
        <FakeChatBody />
      </CallSidePanel>
    </div>
  ),
};

/** Hosting a dark-tone ConversationList — a DM switcher inside the call. */
export const ConversationSwitcher: Story = {
  render: (args) => {
    const [active, setActive] = useState<string | null>('dm:alice');
    return (
      <div className="flex h-[480px]">
        <FakeStage />
        <CallSidePanel {...args} title="Messages">
          <div className="p-2">
            <ConversationList
              tone="dark"
              activeChannel={active}
              onSelect={setActive}
              onNewChat={() => {}}
              items={[
                {
                  channel: 'dm:alice',
                  peers: [{ userId: 'u-alice', displayName: 'Alice Chen', online: true }],
                  lastMessagePreview: 'See you at standup',
                  lastMessageAt: '2026-08-25T14:05:00',
                  unreadCount: 3,
                },
                {
                  channel: 'dm:bob',
                  peers: [{ userId: 'u-bob', displayName: 'Bob Martinez', online: false }],
                  lastMessagePreview: 'thanks!',
                  lastMessageAt: '2026-08-25T11:42:00',
                },
              ]}
            />
          </div>
        </CallSidePanel>
      </div>
    );
  },
};

/** Wider panel via widthClassName. */
export const Wide: Story = {
  render: (args) => (
    <div className="flex h-[480px]">
      <FakeStage />
      <CallSidePanel {...args} widthClassName="w-96" title="Transcript">
        <FakeChatBody />
      </CallSidePanel>
    </div>
  ),
};

/** Open/close wiring — the stage reflows to full width when closed. */
export const Openable: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <div className="flex h-[480px] flex-col gap-2 p-2">
        <div>
          <Button variant="secondary" size="sm" onClick={() => setOpen((v) => !v)}>
            Toggle panel
          </Button>
        </div>
        <div className="flex min-h-0 flex-1">
          <FakeStage />
          <CallSidePanel open={open} onClose={() => setOpen(false)} title="Chat">
            <FakeChatBody />
          </CallSidePanel>
        </div>
      </div>
    );
  },
};

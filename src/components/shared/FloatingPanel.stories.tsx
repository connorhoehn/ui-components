import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { FloatingPanel } from './FloatingPanel';
import { ChatPanel } from '../social/ChatPanel';
import { Button } from '../ui/Button';
import type { ChatMessage } from '../../hooks/useChat';

const meta = {
  title: 'Shared/FloatingPanel',
  component: FloatingPanel,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof FloatingPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

const MESSAGES: ChatMessage[] = [
  { clientId: 'client-alice', displayName: 'Alice Johnson', content: 'Can everyone see the deploy dashboard?', timestamp: '2026-08-25T17:58:00.000Z' },
  { clientId: 'client-bob', displayName: 'Bob Smith', content: 'Yep — the green bar on the left is the canary.', timestamp: '2026-08-25T17:58:40.000Z' },
  { clientId: 'client-cai', displayName: 'Cai Lund', content: 'Rolling the second wave now.', timestamp: '2026-08-25T17:59:10.000Z' },
];

function StoryShell({ children }: { children: (open: boolean, setOpen: (v: boolean) => void) => React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="relative h-[36rem] bg-video-stage p-6">
      <span className="text-white/25 text-xs font-mono">call stage</span>
      {!open && (
        <div className="mt-4">
          <Button variant="secondary" size="sm" onClick={() => setOpen(true)}>
            Reopen panel
          </Button>
        </div>
      )}
      {children(open, setOpen)}
    </div>
  );
}

/** The headline use: an in-call chat floating next to the call widget on
 *  dark chrome. Drag it by the header; ✕ closes it. */
export const DarkCallChat: Story = {
  args: { open: true, onClose: () => {}, title: 'In-call chat', children: null },
  render: () => (
    <StoryShell>
      {(open, setOpen) => (
        <FloatingPanel
          open={open}
          onClose={() => setOpen(false)}
          title="In-call chat"
          defaultPosition="right-center"
          tone="dark"
        >
          <div className="flex-1 min-h-0 overflow-y-auto px-3 pb-3">
            <ChatPanel
              tone="dark"
              messages={MESSAGES}
              onSend={() => {}}
              typingUsers={['Bob Smith']}
            />
          </div>
        </FloatingPanel>
      )}
    </StoryShell>
  ),
};

/** Light tone for panels floated over regular app surfaces. */
export const LightPanel: Story = {
  args: { open: true, onClose: () => {}, title: 'Notes', children: null },
  render: () => (
    <StoryShell>
      {(open, setOpen) => (
        <FloatingPanel
          open={open}
          onClose={() => setOpen(false)}
          title="Notes"
          defaultPosition="left-center"
          tone="light"
          heightClassName="h-64"
        >
          <p className="m-0 p-3 text-[13px] text-text-secondary">
            Any call-adjacent tool can live here — the body slot stretches
            (`min-h-0 flex-1`) so fill-height children just work.
          </p>
        </FloatingPanel>
      )}
    </StoryShell>
  ),
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { ChatLabShell, ChatLabPill, type LabEvent, type LabStep } from './ChatLabShell';

// The agent lab as a SIDE PANE (`variant="pane"`) — beside a conversation that
// stays on screen, at the two widths a chat side pane actually gets. The shell
// paints in the code palette in both themes; the dark stories check that the
// host theme around it does not leak in.

const STEPS: LabStep[] = [
  { id: 's1', title: 'Read the call notes', kind: 'read', status: 'done', iterations: 2 },
  { id: 's2', title: 'Write the haiku', kind: 'write', status: 'running', iterations: 1 },
  { id: 's3', title: 'Post it to the conversation', kind: 'post', status: 'pending' },
];

const EVENTS: LabEvent[] = [
  { id: 'e1', at: '2026-09-28T10:48:21.024Z', kind: 'command', text: '/agent write a haiku about this call' },
  { id: 'e2', at: '2026-09-28T10:48:23.000Z', kind: 'tool', text: 'Read notes.md', detail: '{"file":"notes.md"}' },
  { id: 'e3', at: '2026-09-28T10:48:25.000Z', kind: 'text', text: 'Drafting three lines from the call…' },
];

function Frame({ width, dark, children }: { width: 420 | 520; dark?: boolean; children: ReactNode }) {
  return (
    <ThemeProvider preset={dark ? 'dark' : 'light'}>
      <div className={width === 420 ? 'h-[560px] w-[420px] bg-surface' : 'h-[560px] w-[520px] bg-surface'}>
        {children}
      </div>
    </ThemeProvider>
  );
}

const meta: Meta<typeof ChatLabShell> = {
  title: 'Social/ChatLabShell',
  component: ChatLabShell,
  args: {
    variant: 'pane',
    title: 'Read the call notes · Write the haiku · Post it to the conversation',
    status: 'running',
    model: 'us.anthropic.claude-sonnet-5-20260514-v1:0',
    contextBudgetTokens: 200_000,
    contextTokens: 42_000,
    iterations: 3,
    steps: STEPS,
    events: EVENTS,
    shell: { sessionId: 'box-1', onRequestShell: () => {} },
    onInstruct: () => {},
    onStop: () => {},
    onBackToChat: () => {},
    onOpenRun: () => {},
    onOpenGraph: () => {},
  },
};
export default meta;

type Story = StoryObj<typeof ChatLabShell>;

export const Pane420Light: Story = { render: (args) => <Frame width={420}><ChatLabShell {...args} /></Frame> };
export const Pane520Light: Story = { render: (args) => <Frame width={520}><ChatLabShell {...args} /></Frame> };
export const Pane420Dark: Story = { render: (args) => <Frame width={420} dark><ChatLabShell {...args} /></Frame> };
export const Pane520Dark: Story = { render: (args) => <Frame width={520} dark><ChatLabShell {...args} /></Frame> };

/** The first 20–40 s: no plan yet, nothing to instruct, the ground rising. */
export const PanePlanning: Story = {
  args: { status: 'planning', steps: [], events: [], iterations: 0, contextTokens: 0, title: 'Planning the steps…' },
  render: (args) => <Frame width={420}><ChatLabShell {...args} /></Frame>,
};

/** The whole-column layout, unchanged, for hosts that still swap the column. */
export const Column: Story = {
  args: { variant: 'column' },
  render: (args) => <div className="h-[560px] w-[760px]"><ChatLabShell {...args} /></div>,
};

/** What the composer keeps while the pane is closed. */
export const Pill: StoryObj<typeof ChatLabPill> = {
  render: () => <ChatLabPill status="running" contextTokens={42_000} contextBudgetTokens={200_000} onOpen={() => {}} />,
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import { AgentRunCard } from './AgentRunCard';
import type { LabStep } from './ChatLabShell';

// An agent loop's card in the transcript. The loop is a thing happening in the
// conversation, the way a call is: the card streams where it is, and "Open lab"
// opens the detail beside the chat instead of in place of it.

const STEPS: LabStep[] = [
  { id: 's1', title: 'Read the call notes', kind: 'read', status: 'done' },
  { id: 's2', title: 'Write the haiku', kind: 'write', status: 'running' },
  { id: 's3', title: 'Post it to the conversation', kind: 'post', status: 'pending' },
];
const DONE = STEPS.map((step) => ({ ...step, status: 'done' as const }));
const BUDGET = { contextTokens: 42_000, contextBudgetTokens: 200_000 };

const meta: Meta<typeof AgentRunCard> = {
  title: 'Social/AgentRunCard/Agent loop',
  component: AgentRunCard,
  args: {
    runId: 'loop-1',
    instruction: 'write a haiku about this call',
    agentName: 'Agent',
    command: '/agent',
    requestedBy: 'Grace',
    onOpenLab: () => {},
  },
  decorators: [(Story) => <div className="max-w-[520px] p-4"><Story /></div>],
};
export default meta;

type Story = StoryObj<typeof AgentRunCard>;

export const Planning: Story = { args: { loop: { phase: 'planning', elapsedMs: 12_000 } } };
export const Starting: Story = { args: { loop: { phase: 'starting', elapsedMs: 31_000, steps: STEPS.map((s) => ({ ...s, status: 'pending' as const })) } } };
export const Running: Story = { args: { loop: { phase: 'running', elapsedMs: 64_000, steps: STEPS, ...BUDGET } } };
export const Waiting: Story = { args: { loop: { phase: 'waiting', steps: [DONE[0]!, { ...STEPS[1]!, status: 'pending' }, STEPS[2]!], ...BUDGET } } };
export const Done: Story = { args: { loop: { phase: 'done', steps: DONE, ...BUDGET, outcome: 'Posted the haiku to the conversation' } } };
export const Failed: Story = { args: { loop: { phase: 'failed', steps: [DONE[0]!, { ...STEPS[1]!, status: 'failed' }, { ...STEPS[2]!, status: 'skipped' }], ...BUDGET, outcome: 'The box ran out of disk while writing.' } } };
export const Stopped: Story = { args: { loop: { phase: 'stopped', steps: [DONE[0]!, { ...STEPS[1]!, status: 'skipped' }, { ...STEPS[2]!, status: 'skipped' }], ...BUDGET } } };
export const BudgetSpent: Story = { args: { loop: { phase: 'budget', steps: [DONE[0]!, { ...STEPS[1]!, status: 'failed' }, STEPS[2]!], contextTokens: 200_000, contextBudgetTokens: 200_000 } } };
/** A document's ~267px conversation column. */
export const Narrow: Story = {
  args: { loop: { phase: 'running', elapsedMs: 64_000, steps: STEPS, ...BUDGET } },
  decorators: [(Story) => <div className="w-[267px]"><Story /></div>],
};

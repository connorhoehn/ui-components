import type { Meta, StoryObj } from '@storybook/react-vite';
import { WorkActivityNode } from './WorkActivityNode';

const meta = {
  title: 'Graph/WorkActivityNode',
  component: WorkActivityNode,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: {
    node: { id: 'diagram-run', kind: 'run', title: 'Draw diagram run', status: 'completed', disclosure: 'details', capabilities: [], updatedAt: '2026-10-31T11:45:00Z' },
    selected: false,
    live: true,
    onSelect: () => {},
  },
} satisfies Meta<typeof WorkActivityNode>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Conversation: Story = {
  args: {
    node: { ...meta.args.node, id: 'general', kind: 'project', title: '#general', status: 'idle' },
    detail: { lines: ['Channel'], badge: 'Channel', footer: { label: 'Conversation · #general' } },
  },
};

/** The summary keeps the card's full reading width when a status is present. */
export const LongSummaryWithStatus: Story = {
  args: {
    detail: {
      lines: ['Rendered the payment-reconciliation sequence diagram for the Northstar review.'],
      badge: 'Completed',
      footer: { label: 'Run · Northstar Payments' },
    },
  },
};

export const Waiting: Story = {
  args: {
    node: { ...meta.args.node, status: 'waiting' },
    detail: { lines: ['Review the proposed deployment before it starts.'], pause: { reason: 'awaiting_approval' } },
  },
};

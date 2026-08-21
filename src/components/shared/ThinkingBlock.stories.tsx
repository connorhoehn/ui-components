import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThinkingBlock } from './ThinkingBlock';

const meta = {
  title: 'Shared/ThinkingBlock',
  component: ThinkingBlock,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof ThinkingBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Finished: Story = {
  args: {
    content:
      'The user asked for run timings. I should query the last run, group steps by node, and surface the slowest three.',
    defaultOpen: true,
  },
};

export const Streaming: Story = {
  args: { content: '', streaming: true, defaultOpen: true },
};

export const Collapsed: Story = {
  args: { content: 'Hidden until expanded.' },
};

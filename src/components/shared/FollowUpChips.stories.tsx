import type { Meta, StoryObj } from '@storybook/react-vite';
import { FollowUpChips } from './FollowUpChips';

const meta = {
  title: 'Shared/FollowUpChips',
  component: FollowUpChips,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof FollowUpChips>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    suggestions: ['Why did step 3 fail?', 'Show the run diff', 'Retry from approval'],
    onSelect: () => {},
  },
};

export const WithLabelAndRefresh: Story = {
  args: {
    label: 'Follow up:',
    suggestions: ['Summarize this run', 'Compare with previous'],
    onSelect: () => {},
    onRefresh: () => {},
  },
};

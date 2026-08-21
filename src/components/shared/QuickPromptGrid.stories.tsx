import type { Meta, StoryObj } from '@storybook/react-vite';
import { QuickPromptGrid } from './QuickPromptGrid';

const meta = {
  title: 'Shared/QuickPromptGrid',
  component: QuickPromptGrid,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof QuickPromptGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Try asking:',
    prompts: [
      { label: 'Summarize the last run', hint: 'steps, timings, cost' },
      { label: 'Why did step 3 fail?', hint: 'root-cause the error' },
      { label: 'Draft a retry plan' },
      { label: 'Compare with yesterday', hint: 'run diff' },
    ],
    onSelect: () => {},
  },
};

export const TwoColumns: Story = {
  args: {
    columns: 2,
    prompts: [{ label: 'A' }, { label: 'B' }, { label: 'C' }, { label: 'D' }],
    onSelect: () => {},
  },
};

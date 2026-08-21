import type { Meta, StoryObj } from '@storybook/react-vite';
import { ToolCallStrip } from './ToolCallStrip';

const meta = {
  title: 'Shared/ToolCallStrip',
  component: ToolCallStrip,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof ToolCallStrip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Mixed: Story = {
  args: {
    toolCalls: [
      { id: '1', name: 'search_docs', done: true },
      { id: '2', name: 'read_file', done: true },
      { id: '3', name: 'run_query', done: false },
    ],
  },
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import { InlineAlert } from './InlineAlert';

const meta = {
  title: 'Shared/InlineAlert',
  component: InlineAlert,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof InlineAlert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Error: Story = {
  args: { tone: 'error', children: 'Sync failed: connection timeout after 30s.' },
};

export const Success: Story = {
  args: { tone: 'success', children: 'All 14 items imported.' },
};

export const Warning: Story = {
  args: { tone: 'warning', children: '3 rows were skipped (missing IDs).' },
};

export const InfoDismissible: Story = {
  args: { tone: 'info', children: 'A newer schema version is available.', onDismiss: () => {} },
};

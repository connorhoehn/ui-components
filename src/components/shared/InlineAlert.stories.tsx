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

/** `palette="code"` for an alert inside a log console or debugger panel. One
 *  panel background across all four severities — the accent border and the
 *  text carry the severity, the way a terminal signals it. */
export const CodePalette: Story = {
  args: { tone: 'error', palette: 'code', children: 'stream closed: EPIPE' },
  render: () => (
    <div className="flex flex-col gap-2 bg-code-bg p-4 rounded">
      <InlineAlert palette="code" tone="error">stream closed: EPIPE</InlineAlert>
      <InlineAlert palette="code" tone="warning">buffer truncated at 10k lines.</InlineAlert>
      <InlineAlert palette="code" tone="success">attached to pty/3.</InlineAlert>
      <InlineAlert palette="code" tone="info">read-only — the run has finished.</InlineAlert>
    </div>
  ),
};

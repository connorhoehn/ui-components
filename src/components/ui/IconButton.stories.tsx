import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconButton } from './IconButton';

const meta = {
  title: 'UI/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: 'select', options: ['ghost', 'primary', 'danger'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    tone: { control: 'radio', options: ['surface', 'code'] },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ghost: Story = {
  args: { 'aria-label': 'Close', children: '✕' },
};

export const Primary: Story = {
  args: { 'aria-label': 'Add', variant: 'primary', children: '+' },
};

export const Danger: Story = {
  args: { 'aria-label': 'Delete', variant: 'danger', children: '🗑' },
};

export const Sizes: Story = {
  args: { 'aria-label': 'Close', children: '✕' },
  render: () => (
    <div className="flex items-center gap-2">
      <IconButton aria-label="Close small" size="sm">✕</IconButton>
      <IconButton aria-label="Close medium" size="md">✕</IconButton>
      <IconButton aria-label="Close large" size="lg">✕</IconButton>
    </div>
  ),
};

/** The `code` family — pane chrome on a terminal surface. These controls sit
 *  in a `TitledFrame`'s title row, where the surface-family ghost renders as a
 *  light smear on black. */
export const CodeTone: Story = {
  args: { 'aria-label': 'Close pane', tone: 'code', children: '✕' },
  render: () => (
    <div className="flex items-center gap-2 bg-code-bg p-4 rounded">
      <IconButton tone="code" aria-label="Split pane" size="sm">⫿</IconButton>
      <IconButton tone="code" aria-label="Attach" variant="primary" size="sm">▶</IconButton>
      <IconButton tone="code" aria-label="Kill pane" variant="danger" size="sm">✕</IconButton>
    </div>
  ),
};

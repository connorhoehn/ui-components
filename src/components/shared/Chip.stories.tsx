import type { Meta, StoryObj } from '@storybook/react-vite';
import Chip from './Chip';

const meta = {
  title: 'Shared/Chip',
  component: Chip,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: 'Neutral' },
};

export const SoftSuccess: Story = {
  args: { tone: 'success', children: 'Active' },
};

export const SoftDanger: Story = {
  args: { tone: 'danger', children: 'Failed' },
};

export const SolidInfo: Story = {
  args: { tone: 'info', solid: true, children: 'Info' },
};

export const Tiny: Story = {
  args: { tone: 'warning', size: 'xs', children: 'beta' },
};

export const MonoCount: Story = {
  name: 'Mono (count chip)',
  args: { tone: 'purple', mono: true, children: '0x1F' },
};

/** `palette="code"` renders in the permanently-dark terminal family, for
 *  chips inside a log console or terminal pane. The semantic `tone` still
 *  picks the accent — the two axes are independent. It is spelled `palette`
 *  rather than `tone` here only because `tone` was already taken. */
export const CodePalette: Story = {
  args: { palette: 'code', children: 'running' },
  render: () => (
    <div className="flex flex-wrap items-center gap-2 bg-code-bg p-4 rounded">
      <Chip palette="code">idle</Chip>
      <Chip palette="code" tone="success" dot="pulse">running</Chip>
      <Chip palette="code" tone="danger">exit 1</Chip>
      <Chip palette="code" tone="info" mono>3.2s</Chip>
      <Chip palette="code" tone="warning" solid uppercase>stale</Chip>
    </div>
  ),
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { EditableHeading } from './EditableHeading';

// A title renamed in place: click the text or the pencil; Enter or blur
// commits, Escape reverts, an empty commit keeps the old value.

function Live(props: { size?: 'md' | 'lg'; readOnly?: boolean }) {
  const [v, setV] = useState('Auth architecture review');
  return <EditableHeading value={v} onCommit={setV} editLabel="Rename call" {...props} />;
}

const meta = {
  title: 'Shared/EditableHeading',
  component: EditableHeading,
  parameters: { layout: 'padded' },
  args: { value: 'Auth architecture review', onCommit: () => {} },
} satisfies Meta<typeof EditableHeading>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { render: () => <Live /> };
export const Large: Story = { render: () => <Live size="lg" /> };
export const ReadOnly: Story = { render: () => <Live readOnly /> };
export const Dark: Story = {
  render: () => (
    <div data-theme="dark" className="w-[360px] bg-surface p-4">
      <Live />
    </div>
  ),
};

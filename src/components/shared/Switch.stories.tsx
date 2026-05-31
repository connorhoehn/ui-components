import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import Switch from './Switch';

const meta = {
  title: 'Shared/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

function Harness({ initial = false, size = 'md', disabled = false }: {
  initial?: boolean;
  size?: 'sm' | 'md';
  disabled?: boolean;
}) {
  const [on, setOn] = useState(initial);
  return (
    <Switch
      checked={on}
      onChange={setOn}
      size={size}
      disabled={disabled}
      aria-label="Toggle setting"
    />
  );
}

export const Off: Story = {
  args: { checked: false, onChange: () => {}, 'aria-label': 'Toggle' },
};

export const On: Story = {
  args: { checked: true, onChange: () => {}, 'aria-label': 'Toggle' },
};

export const Small: Story = {
  args: { checked: true, size: 'sm', onChange: () => {}, 'aria-label': 'Toggle' },
};

export const Disabled: Story = {
  args: { checked: false, disabled: true, onChange: () => {}, 'aria-label': 'Toggle' },
};

export const Interactive: Story = {
  args: { checked: false, onChange: () => {}, 'aria-label': 'Toggle' },
  render: () => <Harness />,
};

export const InteractiveSmall: Story = {
  args: { checked: false, onChange: () => {}, 'aria-label': 'Toggle' },
  render: () => <Harness initial size="sm" />,
};

import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ColorInput } from './ColorInput';

const meta = {
  title: 'Forms/ColorInput',
  component: ColorInput,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof ColorInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  args: { value: '#9333ea', onChange: () => {}, 'aria-label': 'Cursor color' },
  render: () => {
    const [color, setColor] = useState('#9333ea');
    return (
      <div className="flex items-center gap-3">
        <ColorInput value={color} onChange={setColor} aria-label="Cursor color" />
        <span className="font-mono text-sm text-text-secondary">{color}</span>
      </div>
    );
  },
};

export const Disabled: Story = {
  args: { value: '#16a34a', onChange: () => {}, disabled: true, 'aria-label': 'Locked color' },
};

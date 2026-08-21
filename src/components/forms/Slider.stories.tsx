import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Slider } from './Slider';

const meta = {
  title: 'Forms/Slider',
  component: Slider,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  args: { value: 40, onChange: () => {}, 'aria-label': 'Quality' },
  render: () => {
    const [value, setValue] = useState(40);
    return (
      <div className="w-64">
        <Slider value={value} onChange={setValue} aria-label="Quality" />
      </div>
    );
  },
};

export const FormattedReadout: Story = {
  args: { value: 0.7, onChange: () => {}, 'aria-label': 'Temperature' },
  render: () => {
    const [value, setValue] = useState(0.7);
    return (
      <div className="w-64">
        <Slider
          value={value}
          onChange={setValue}
          min={0}
          max={2}
          step={0.1}
          readout={(v) => v.toFixed(1)}
          aria-label="Temperature"
        />
      </div>
    );
  },
};

export const NoReadout: Story = {
  args: { value: 25, onChange: () => {}, readout: false, 'aria-label': 'Size' },
  render: (args) => (
    <div className="w-40">
      <Slider {...args} />
    </div>
  ),
};

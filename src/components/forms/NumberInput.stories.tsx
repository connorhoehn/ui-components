import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { NumberInput } from './NumberInput';

function Controlled(props: React.ComponentProps<typeof NumberInput>) {
  const [val, setVal] = useState<number>(props.value ?? 0);
  return (
    <div className="w-48">
      <NumberInput {...props} value={val} onChange={setVal} />
    </div>
  );
}

const meta = {
  title: 'Forms/NumberInput',
  component: NumberInput,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md'] },
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof NumberInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <Controlled {...args} />,
  args: { value: 42, onChange: () => {}, size: 'md' },
};

export const WithUnitPx: Story = {
  render: (args) => <Controlled {...args} />,
  args: { value: 100, onChange: () => {}, unit: 'px', min: 0, max: 2000, size: 'md' },
};

export const WithUnitDegrees: Story = {
  render: (args) => <Controlled {...args} />,
  args: { value: 90, onChange: () => {}, unit: '°', min: 0, max: 360, step: 1, size: 'md' },
};

export const Clamped: Story = {
  name: 'Clamped (blur to clamp)',
  render: (args) => (
    <div className="flex flex-col gap-2 w-48">
      <p className="text-[11px] text-neutral">
        Type a value outside 0–100 then blur to see clamping.
      </p>
      <Controlled {...args} />
    </div>
  ),
  args: { value: 50, onChange: () => {}, unit: '%', min: 0, max: 100, step: 1, size: 'md' },
};

export const Disabled: Story = {
  render: (args) => <Controlled {...args} />,
  args: { value: 25, onChange: () => {}, unit: 'px', disabled: true, size: 'md' },
};

export const Invalid: Story = {
  render: (args) => <Controlled {...args} />,
  args: { value: -1, onChange: () => {}, unit: 'px', invalid: true, min: 0, size: 'md' },
};

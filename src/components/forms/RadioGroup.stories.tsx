import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { RadioGroup } from './RadioGroup';
import type { RadioOption } from './RadioGroup';

const errorPolicyOptions: RadioOption[] = [
  { value: 'stop',     label: 'Stop pipeline',    description: 'Halt execution immediately on error.' },
  { value: 'continue', label: 'Continue',          description: 'Skip the failed node and carry on.' },
  { value: 'retry',    label: 'Retry (3×)',        description: 'Retry the node up to 3 times before failing.' },
];

const shortOptions: RadioOption[] = [
  { value: 'and', label: 'AND' },
  { value: 'or',  label: 'OR' },
  { value: 'not', label: 'NOT' },
];

function Controlled(props: React.ComponentProps<typeof RadioGroup>) {
  const [val, setVal] = useState(props.value ?? props.options[0].value);
  return <RadioGroup {...props} value={val} onChange={setVal} />;
}

const meta = {
  title: 'Forms/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    orientation: { control: 'radio', options: ['vertical', 'horizontal'] },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultVertical: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    name: 'error-policy',
    options: errorPolicyOptions,
    value: 'stop',
    onChange: () => {},
    orientation: 'vertical',
  },
};

export const WithDescriptions: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    name: 'error-policy',
    options: errorPolicyOptions,
    value: 'retry',
    onChange: () => {},
    orientation: 'vertical',
  },
};

export const HorizontalOrientation: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    name: 'condition-mode',
    options: shortOptions,
    value: 'and',
    onChange: () => {},
    orientation: 'horizontal',
  },
};

export const Disabled: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    name: 'error-policy',
    options: errorPolicyOptions,
    value: 'continue',
    onChange: () => {},
    disabled: true,
    orientation: 'vertical',
  },
};

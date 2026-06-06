import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from './Select';

const providerOptions = [
  { value: 'anthropic', label: 'Anthropic' },
  { value: 'bedrock', label: 'Bedrock' },
  { value: 'claude-code', label: 'Claude Code (subprocess)' },
];

const meta = {
  title: 'Forms/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md'] },
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean' },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: providerOptions,
    value: 'anthropic',
    onChange: () => {},
  },
};

export const WithPlaceholder: Story = {
  args: {
    options: providerOptions,
    placeholder: 'Choose a provider…',
    value: '',
    onChange: () => {},
  },
};

export const Small: Story = {
  args: {
    options: providerOptions,
    value: 'bedrock',
    size: 'sm',
    onChange: () => {},
  },
};

export const Invalid: Story = {
  args: {
    options: providerOptions,
    value: '',
    invalid: true,
    placeholder: 'Required',
    onChange: () => {},
  },
};

export const Disabled: Story = {
  args: {
    options: providerOptions,
    value: 'anthropic',
    disabled: true,
    onChange: () => {},
  },
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './Input';

const meta = {
  title: 'Forms/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    type: {
      control: 'radio',
      options: ['text', 'number', 'url', 'password', 'email', 'search'],
    },
    size: { control: 'radio', options: ['sm', 'md'] },
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean' },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: 'Enter text…', size: 'md' },
};

export const Small: Story = {
  args: { placeholder: 'Small input', size: 'sm' },
};

export const Invalid: Story = {
  args: { placeholder: 'Bad value', invalid: true, value: 'oops', onChange: () => {} },
};

export const Disabled: Story = {
  args: { placeholder: 'Cannot edit', disabled: true },
};

export const WithPrefix: Story = {
  args: {
    placeholder: '0.00',
    type: 'number',
    prefix: <span className="text-xs font-mono">$</span>,
  },
};

export const WithSuffix: Story = {
  args: {
    placeholder: 'Enter weight',
    type: 'number',
    suffix: <span className="text-xs font-mono">kg</span>,
  },
};

export const SearchType: Story = {
  args: { type: 'search', placeholder: 'Search nodes…' },
};

export const NumberType: Story = {
  args: { type: 'number', placeholder: '42', min: 0, max: 100 },
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea } from './Textarea';

const meta = {
  title: 'Forms/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean' },
    autoResize: { control: 'boolean' },
    minRows: { control: 'number' },
    maxRows: { control: 'number' },
    rows: { control: 'number' },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter a system prompt…',
    rows: 4,
  },
};

export const AutoResize: Story = {
  args: {
    placeholder: 'Starts at 2 rows, grows as you type…',
    autoResize: true,
    minRows: 2,
    maxRows: 8,
  },
};

export const Invalid: Story = {
  args: {
    value: '',
    invalid: true,
    placeholder: 'Required',
    onChange: () => {},
  },
};

export const Disabled: Story = {
  args: {
    value: 'Cannot edit this content.',
    disabled: true,
    onChange: () => {},
  },
};

export const TallFixed: Story = {
  args: {
    placeholder: 'A large prompt…',
    rows: 8,
  },
};

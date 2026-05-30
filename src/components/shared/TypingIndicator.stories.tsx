import type { Meta, StoryObj } from '@storybook/react-vite';
import TypingIndicator from './TypingIndicator';

const meta = {
  title: 'Shared/TypingIndicator',
  component: TypingIndicator,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md'] },
    compact: { control: 'boolean' },
  },
} satisfies Meta<typeof TypingIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OneUser: Story = { args: { names: ['Alice'] } };
export const TwoUsers: Story = { args: { names: ['Alice', 'Bob'] } };
export const ThreeUsers: Story = { args: { names: ['Alice', 'Bob', 'Charlie'] } };
export const ManyUsers: Story = {
  args: { names: ['Alice', 'Bob', 'Charlie', 'Dana', 'Eve'] },
};
export const Compact: Story = {
  args: { names: ['Alice', 'Bob'], compact: true },
};
export const Empty: Story = { args: { names: [] } };

import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger', 'danger-solid'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { variant: 'primary', children: 'Click me' },
};

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Secondary' },
};

export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Ghost' },
};

export const Danger: Story = {
  args: { variant: 'danger', children: 'Delete' },
};

export const DangerSolid: Story = {
  args: { variant: 'danger-solid', children: 'Delete permanently' },
};

export const Small: Story = {
  args: { variant: 'primary', size: 'sm', children: 'Small' },
};

export const Large: Story = {
  args: { variant: 'primary', size: 'lg', children: 'Large' },
};

export const Disabled: Story = {
  args: { variant: 'primary', children: 'Disabled', disabled: true },
};

export const FullWidth: Story = {
  args: { variant: 'primary', children: 'Full width', fullWidth: true },
  parameters: { layout: 'padded' },
};

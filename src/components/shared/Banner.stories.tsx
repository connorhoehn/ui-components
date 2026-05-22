import type { Meta, StoryObj } from '@storybook/react-vite';
import Banner from './Banner';

const meta = {
  title: 'Shared/Banner',
  component: Banner,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['error', 'warning', 'info', 'success'],
    },
  },
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Error',
    children: 'Something went wrong. Please try again.',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Warning',
    children: 'Your session will expire in 5 minutes.',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Info',
    children: 'A new version is available. Refresh to update.',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Success',
    children: 'Your changes have been saved.',
  },
};

export const Dismissible: Story = {
  args: {
    variant: 'info',
    title: 'Dismissible',
    children: 'Click the × to dismiss this banner.',
    onDismiss: () => alert('dismissed'),
  },
};

export const NoTitle: Story = {
  args: {
    variant: 'warning',
    children: 'Maintenance window starts at 2 AM UTC.',
  },
};

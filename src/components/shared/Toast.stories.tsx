import type { Meta, StoryObj } from '@storybook/react-vite';
import Toast from './Toast';

const meta = {
  title: 'Shared/Toast',
  component: Toast,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

const noopDismiss = () => {};

export const Info: Story = {
  args: {
    id: 't1',
    type: 'info',
    message: 'Saved draft.',
    onDismiss: noopDismiss,
  },
};

export const Success: Story = {
  args: {
    id: 't2',
    type: 'success',
    message: 'Pipeline deployed successfully.',
    onDismiss: noopDismiss,
  },
};

export const Warning: Story = {
  args: {
    id: 't3',
    type: 'warning',
    message: 'Approaching rate limit.',
    onDismiss: noopDismiss,
  },
};

export const Error: Story = {
  args: {
    id: 't4',
    type: 'error',
    message: 'Failed to upload — retry?',
    actionLabel: 'Retry',
    onAction: () => {},
    onDismiss: noopDismiss,
  },
};

export const Exiting: Story = {
  name: 'Exiting (fade-out animation)',
  args: {
    id: 't5',
    type: 'success',
    message: 'Closing…',
    exiting: true,
    onDismiss: noopDismiss,
  },
};

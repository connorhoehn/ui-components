import type { Meta, StoryObj } from '@storybook/react-vite';
import ErrorState from './ErrorState';

const meta = {
  title: 'Shared/ErrorState',
  component: ErrorState,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof ErrorState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    title: 'Could not load runs',
    body: 'The pipeline runs API returned 503. The dashboard will retry automatically.',
  },
};

export const WithRetry: Story = {
  args: {
    title: 'Failed to load runs',
    body: 'Network unreachable. Check your VPN.',
    actionLabel: 'Retry',
    onAction: () => console.log('retry'),
  },
};

export const CustomIcon: Story = {
  args: {
    icon: '🚧',
    title: 'Under maintenance',
    body: 'The pipeline service is paused for a scheduled migration. Runs will resume at 18:00 UTC.',
  },
};

export const RichDescription: Story = {
  args: {
    title: 'Permission denied',
    description: (
      <>
        Your role does not include <code>pipeline:read</code>.{' '}
        <a href="/admin/access" className="underline">Request access</a>.
      </>
    ),
  },
};

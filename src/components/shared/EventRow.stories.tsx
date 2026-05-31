import type { Meta, StoryObj } from '@storybook/react-vite';
import EventRow from './EventRow';

const meta = {
  title: 'Shared/EventRow',
  component: EventRow,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof EventRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: {
    timestamp: '12:04:33',
    type: 'pipeline.started',
    summary: 'Pipeline csv-import started run #1842.',
    severity: 'info',
  },
};

export const Warning: Story = {
  args: {
    timestamp: '12:05:01',
    type: 'pipeline.retry',
    summary: 'Step transform retrying (attempt 2 of 3).',
    severity: 'warning',
  },
};

export const Error: Story = {
  args: {
    timestamp: '12:05:48',
    type: 'pipeline.failed',
    summary: 'Run #1842 failed at step transform: ValueError.',
    severity: 'error',
  },
};

export const Selected: Story = {
  args: {
    timestamp: '12:06:00',
    type: 'pipeline.completed',
    summary: 'Run #1843 completed in 4.2s.',
    severity: 'success',
    selected: true,
    onClick: () => {},
  },
};

export const Clickable: Story = {
  args: {
    timestamp: '12:07:11',
    type: 'audit.access',
    summary: 'alice@example.com accessed billing dashboard.',
    severity: 'info',
    onClick: () => alert('clicked event row'),
  },
};

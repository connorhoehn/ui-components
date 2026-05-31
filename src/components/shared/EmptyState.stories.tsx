import type { Meta, StoryObj } from '@storybook/react-vite';
import EmptyState from './EmptyState';

const meta = {
  title: 'Shared/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    icon: '📭',
    title: 'No notifications yet',
    body: 'When something needs your attention, it will show up here.',
  },
};

export const WithAction: Story = {
  args: {
    icon: '📊',
    title: 'No dashboards',
    body: 'Create your first dashboard to start tracking metrics.',
    actionLabel: 'Create dashboard',
    onAction: () => alert('create dashboard'),
  },
};

export const RichDescription: Story = {
  args: {
    icon: '⚙️',
    title: 'No pipelines',
    description: (
      <span>
        Try the <strong>quickstart template</strong> or build one from scratch.
      </span>
    ),
    actionLabel: 'Start from template',
    onAction: () => {},
  },
};

export const CustomAction: Story = {
  args: {
    icon: '🔍',
    title: 'No results',
    description: 'Try a different search query.',
    action: (
      <div className="flex gap-2">
        <button type="button" className="rounded border border-slate-300 px-3 py-1 text-sm">Clear filters</button>
        <button type="button" className="rounded bg-blue-600 px-3 py-1 text-sm font-semibold text-white">Browse all</button>
      </div>
    ),
  },
};

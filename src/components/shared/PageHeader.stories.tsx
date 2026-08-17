import type { Meta, StoryObj } from '@storybook/react-vite';
import { PageHeader } from './PageHeader';
import { Button } from '../ui/Button';

const meta = {
  title: 'Shared/PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    title: 'Projects',
  },
};

export const WithDescription: Story = {
  args: {
    title: 'Projects',
    description: 'Manage and monitor all your active projects.',
  },
};

export const WithActions: Story = {
  args: {
    title: 'Projects',
    description: 'Manage and monitor all your active projects.',
    actions: (
      <>
        <Button variant="secondary" size="sm">Import</Button>
        <Button variant="primary" size="sm">New project</Button>
      </>
    ),
  },
};

export const WithBack: Story = {
  args: {
    title: 'Project Details',
    description: 'Apollo — production deployment pipeline',
    back: { label: 'Back to Projects', to: '/projects' },
  },
};

export const WithBadge: Story = {
  args: {
    title: 'Pipeline Runs',
    badge: (
      <span className="rounded-full border border-success-border bg-success-bg px-2 py-0.5 text-[11px] font-semibold text-success-fg">
        LIVE
      </span>
    ),
    actions: <Button variant="ghost" size="sm">Refresh</Button>,
  },
};

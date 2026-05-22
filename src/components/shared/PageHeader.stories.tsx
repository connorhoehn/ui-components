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
      <span style={{
        background: '#dcfce7',
        color: '#166534',
        fontSize: 11,
        fontWeight: 600,
        padding: '2px 8px',
        borderRadius: 9999,
        border: '1px solid #bbf7d0',
      }}>
        LIVE
      </span>
    ),
    actions: <Button variant="ghost" size="sm">Refresh</Button>,
  },
};

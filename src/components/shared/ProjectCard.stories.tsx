import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProjectCard } from './ProjectCard';

const meta = {
  title: 'Shared/ProjectCard',
  component: ProjectCard,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof ProjectCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Active: Story = {
  args: {
    name: 'Search revamp',
    id: 'proj-search',
    status: 'active',
    contributorNames: ['Alex Chen', 'Bo Diaz', 'Cai Lund'],
    contributorCount: 5,
    activityLabel: 'active 2m ago',
    presenceDotColor: 'var(--color-success)',
    activityItems: [
      { id: '1', actor: 'Alex Chen', action: 'completed', ticketId: 'SR-4', subject: 'Query parser', kind: 'task' },
      { id: '2', actor: 'Bo Diaz', action: 'merged', subject: 'Ranking tweak', kind: 'pr' },
    ],
  },
};

export const Paused: Story = {
  args: { name: 'Legacy migration', id: 'proj-legacy', status: 'paused', activityLabel: 'idle 3d' },
};

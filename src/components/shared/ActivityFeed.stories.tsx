import type { Meta, StoryObj } from '@storybook/react-vite';
import { ActivityFeed } from './ActivityFeed';

const ITEMS = [
  { id: '1', actor: 'Alex Chen', action: 'completed', ticketId: 'K8S-182', subject: 'Rollout config', timeLabel: '2m ago', kind: 'task' },
  { id: '2', actor: 'Bo Diaz', action: 'merged', ticketId: 'API-77', subject: 'Rate limiter', timeLabel: '9m ago', kind: 'pr' },
  { id: '3', actor: 'Cai Lund', action: 'decided', subject: 'Schema v2 rollout', timeLabel: '1h ago', kind: 'decision' },
  { id: '4', actor: 'Dee Park', action: 'commented', subject: 'Design doc', timeLabel: '2h ago', kind: 'comment' },
];

const meta = {
  title: 'Shared/ActivityFeed',
  component: ActivityFeed,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof ActivityFeed>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Rotating: Story = {
  args: { items: ITEMS, visibleCount: 3, rotateMs: 2500 },
};

export const Static: Story = {
  args: { items: ITEMS.slice(0, 2), rotateMs: 0 },
};

export const Empty: Story = {
  args: { items: [] },
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import AlertList, { type AlertListEntry } from './AlertList';

const items: AlertListEntry[] = [
  {
    id: 'a1',
    severity: 'critical',
    title: 'API latency spike',
    description: 'p95 over 800ms for 5min',
    timestamp: '10:48:21',
  },
  {
    id: 'a2',
    severity: 'warning',
    title: 'Queue depth high',
    description: '12 events pending',
    timestamp: '10:46:02',
  },
  {
    id: 'a3',
    severity: 'info',
    title: 'Deploy started',
    description: 'frontend@2.11.1 rolling',
    timestamp: '10:42:10',
  },
  {
    id: 'a4',
    severity: 'warning',
    title: 'Disk space low',
    description: '92% on node-04',
    timestamp: '10:39:55',
    resolved: true,
  },
];

const meta = {
  title: 'Observability/AlertList',
  component: AlertList,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: { items, maxHeight: '320px' },
} satisfies Meta<typeof AlertList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MixedSeverity: Story = {};

export const AllActive: Story = {
  args: {
    items: items.map((i) => ({ ...i, resolved: false })),
  },
};

export const AllResolved: Story = {
  args: {
    items: items.map((i) => ({ ...i, resolved: true })),
  },
};

export const Empty: Story = { args: { items: [] } };

export const Loading: Story = { args: { items: [], loading: true } };

export const CustomTitle: Story = {
  args: { title: 'Active incidents' },
};

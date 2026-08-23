import type { Meta, StoryObj } from '@storybook/react-vite';
import AlertsPanel, { type Alert } from './AlertsPanel';

const now = Date.now();
const iso = (minutesAgo: number) => new Date(now - minutesAgo * 60_000).toISOString();

const alerts: Alert[] = [
  {
    id: 'a1',
    severity: 'critical',
    message: 'node-2 unreachable — 9 resources orphaned',
    timestamp: iso(2),
    category: 'health',
  },
  {
    id: 'a2',
    severity: 'error',
    message: 'pipeline run-8801 failed after 3 retries',
    timestamp: iso(14),
    category: 'performance',
  },
  {
    id: 'a3',
    severity: 'warning',
    message: 'Connection pool at 82% capacity',
    timestamp: iso(46),
    category: 'capacity',
  },
  {
    id: 'a4',
    severity: 'info',
    message: 'Cluster rebalanced across 3 nodes',
    timestamp: iso(180),
    category: 'health',
  },
];

const meta = {
  title: 'Observability/AlertsPanel',
  component: AlertsPanel,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: { alerts },
} satisfies Meta<typeof AlertsPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Timestamps are ISO in, relative ("2m ago") out. */
export const MixedSeverity: Story = {};

/** With `onDismiss` each row grows a dismiss control. */
export const Dismissible: Story = { args: { onDismiss: () => {} } };

/** The state operators actually want to see. */
export const Empty: Story = { args: { alerts: [] } };

export const CriticalOnly: Story = {
  args: { alerts: alerts.filter((a) => a.severity === 'critical') },
};

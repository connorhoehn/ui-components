import type { Meta, StoryObj } from '@storybook/react-vite';
import HealthGrid, { type HealthGridEntry } from './HealthGrid';

const nodes: HealthGridEntry[] = [
  { id: 'api', label: 'API Gateway', status: 'healthy' },
  { id: 'w1', label: 'Worker Pool 1', status: 'healthy' },
  { id: 'w2', label: 'Worker Pool 2', status: 'degraded', reason: 'CPU 87%' },
  { id: 'w3', label: 'Worker Pool 3', status: 'down', reason: 'unreachable' },
  { id: 'redis', label: 'Redis Primary', status: 'healthy' },
  { id: 'pg', label: 'Postgres', status: 'degraded', reason: 'replication lag 4s' },
];

const meta = {
  title: 'Observability/HealthGrid',
  component: HealthGrid,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: { items: nodes, title: 'Node Health' },
  argTypes: {
    columns: { control: 'radio', options: [1, 2, 3, 4, 6] },
    dense: { control: 'boolean' },
  },
} satisfies Meta<typeof HealthGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ThreeColumns: Story = { args: { columns: 3 } };
export const TwoColumns: Story = { args: { columns: 2 } };
export const FourColumns: Story = { args: { columns: 4 } };
export const SixColumns: Story = { args: { columns: 6 } };
export const Dense: Story = { args: { columns: 3, dense: true } };
export const NoTitle: Story = { args: { title: undefined } };
export const Empty: Story = { args: { items: [] } };

export const AllHealthy: Story = {
  args: { items: nodes.map((n) => ({ ...n, status: 'healthy' as const, reason: undefined })) },
};

export const AllDown: Story = {
  args: { items: nodes.map((n) => ({ ...n, status: 'down' as const, reason: 'offline' })) },
};

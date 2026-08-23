import type { Meta, StoryObj } from '@storybook/react-vite';
import HealthCell from './HealthCell';

const meta = {
  title: 'Observability/HealthCell',
  component: HealthCell,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: { status: 'healthy', label: 'API Gateway' },
  argTypes: {
    status: { control: 'radio', options: ['healthy', 'degraded', 'down', 'unknown'] },
    dense: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <div className="w-[220px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof HealthCell>;

export default meta;
type Story = StoryObj<typeof meta>;

/** No `reason` — the sub-line falls back to the status word. */
export const Healthy: Story = {};

export const Degraded: Story = {
  args: { status: 'degraded', label: 'Worker Pool 2', reason: 'CPU 87% for 6m' },
};

export const Down: Story = {
  args: { status: 'down', label: 'Worker Pool 3', reason: 'unreachable since 10:41' },
};

/** Nothing has reported yet — neutral surface, no alarm. */
export const Unknown: Story = {
  args: { status: 'unknown', label: 'edge-eu-west', reason: 'awaiting first heartbeat' },
};

/** Tighter padding for packed grids. */
export const Dense: Story = {
  args: { status: 'degraded', label: 'Postgres', reason: 'replication lag 4s', dense: true },
};

export const AllStatuses: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-2">
      <HealthCell status="healthy" label="API Gateway" />
      <HealthCell status="degraded" label="Worker Pool 2" reason="CPU 87%" />
      <HealthCell status="down" label="Worker Pool 3" reason="unreachable" />
      <HealthCell status="unknown" label="edge-eu-west" />
    </div>
  ),
};

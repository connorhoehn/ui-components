import type { Meta, StoryObj } from '@storybook/react-vite';
import AlertItem from './AlertItem';
import { Button } from '../../ui/Button';

const meta = {
  title: 'Observability/AlertItem',
  component: AlertItem,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: {
    severity: 'warning',
    title: 'Queue depth high',
    description: '12 events pending on ingest-worker-2',
    timestamp: '10:46:02',
  },
  argTypes: {
    severity: { control: 'radio', options: ['critical', 'warning', 'info'] },
    resolved: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <div className="w-[420px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AlertItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Critical: Story = {
  args: {
    severity: 'critical',
    title: 'API latency spike',
    description: 'p95 over 800ms for 5 minutes',
    timestamp: '10:48:21',
  },
};

export const Warning: Story = {};

export const Info: Story = {
  args: {
    severity: 'info',
    title: 'Deploy started',
    description: 'frontend@2.11.1 rolling out',
    timestamp: '10:42:10',
  },
};

/** Resolved rows drop their severity tint and dim, keeping history readable. */
export const Resolved: Story = {
  args: { severity: 'critical', resolved: true },
};

/** Title-only — description and timestamp are both optional. */
export const TitleOnly: Story = {
  args: { description: undefined, timestamp: undefined },
};

/** The `action` slot right-aligns a host-wired control. */
export const WithAction: Story = {
  args: {
    severity: 'critical',
    action: (
      <Button size="sm" variant="ghost" onClick={() => {}}>
        Ack
      </Button>
    ),
  },
};

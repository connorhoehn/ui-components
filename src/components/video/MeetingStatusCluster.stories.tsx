import type { Meta, StoryObj } from '@storybook/react-vite';
import { MeetingStatusCluster } from './MeetingStatusCluster';

const meta = {
  title: 'Video/MeetingStatusCluster',
  component: MeetingStatusCluster,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof MeetingStatusCluster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Recording: Story = { args: { recording: { armed: true, active: true }, elapsedMs: (32 * 60 + 52) * 1000, onOpenOptions: () => {} } };
export const Ticking: Story = { args: { startedAt: Date.now() - 65_000 } };

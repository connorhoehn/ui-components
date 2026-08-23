import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatsCard } from './StatsCard';

const meta = {
  title: 'Video/StatsCard',
  component: StatsCard,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  // Sized through the component's own `className` — no wrapper decorator.
  args: { className: 'w-64' },
} satisfies Meta<typeof StatsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/** `metrics: null` is the documented empty state — no stream is publishing. */
export const NoData: Story = {
  args: { metrics: null },
};

/** A healthy 1080p60 publish. */
export const Healthy: Story = {
  args: {
    metrics: {
      bitrateBps: 4_200_000,
      fps: 60,
      resolution: { width: 1920, height: 1080 },
      packetsLost: 0,
    },
  },
};

/** Jitter is optional — supplying it adds a fifth row. */
export const WithJitter: Story = {
  args: {
    metrics: {
      bitrateBps: 2_400_000,
      fps: 30,
      resolution: { width: 1280, height: 720 },
      packetsLost: 14,
      jitter: 8.42,
    },
  },
};

/** A struggling connection: sub-Mbps bitrate falls back to Kbps formatting and
 *  the packet-loss count is climbing. */
export const Degraded: Story = {
  args: {
    metrics: {
      bitrateBps: 320_000,
      fps: 12,
      resolution: { width: 640, height: 360 },
      packetsLost: 1832,
      jitter: 96.1,
    },
  },
};

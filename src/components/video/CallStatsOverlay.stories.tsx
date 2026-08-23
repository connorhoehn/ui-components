import type { Meta, StoryObj } from '@storybook/react-vite';
import { CallStatsOverlay } from './CallStatsOverlay';

// The overlay is absolutely positioned, so every story provides a relatively
// positioned stage to dock against.

const meta = {
  title: 'Video/CallStatsOverlay',
  component: CallStatsOverlay,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div className="relative w-[420px] h-[236px] rounded-lg bg-video-stage grid place-items-center">
        <span className="text-white/25 text-xs font-mono">call stage</span>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CallStatsOverlay>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A healthy call: good quality plus the full metric block. */
export const Healthy: Story = {
  args: {
    stats: { networkQuality: 'good', bitrateKbps: 1850, latencyMs: 42, packetLossPct: 0.2 },
  },
};

/** A degrading call — the badge drops bars and the loss figure climbs. */
export const Degraded: Story = {
  args: {
    stats: { networkQuality: 'poor', bitrateKbps: 320, latencyMs: 410, packetLossPct: 7.4 },
    position: 'top-right',
  },
};

/** Connection lost entirely. */
export const Disconnected: Story = {
  args: {
    stats: { networkQuality: 'dead', bitrateKbps: 0, latencyMs: 0, packetLossPct: 100 },
  },
};

/** Quality only — the metrics block is omitted when no numeric field is set. */
export const QualityOnly: Story = {
  args: { stats: { networkQuality: 'medium' }, position: 'bottom-left' },
};

/** Metrics without a quality grade — the badge is omitted instead. */
export const MetricsOnly: Story = {
  args: { stats: { bitrateKbps: 990, latencyMs: 88 }, position: 'bottom-right' },
};

/** No stats at all: the component renders `null`, so callers don't need their
 *  own visibility gate. The stage below is intentionally bare. */
export const NoStats: Story = {
  args: { stats: undefined },
};

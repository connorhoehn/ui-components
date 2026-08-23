import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatusStrip } from './StatusStrip';

// One strip, five phases. The dot colour and label are driven entirely by
// `phase`; the three numeric slots each disappear when undefined.

const meta = {
  title: 'Video/StatusStrip',
  component: StatusStrip,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof StatusStrip>;

export default meta;
type Story = StoryObj<typeof meta>;

/** `playing` is relabelled LIVE — the strip is written for broadcast, not VOD. */
export const Live: Story = {
  args: { phase: 'playing', bitrateBps: 2_400_000, viewerCount: 1284, duration: 3725 },
};

/** Establishing the connection: amber dot, no metrics yet. */
export const Connecting: Story = {
  args: { phase: 'connecting' },
};

/** Mid-stream stall — metrics stay on screen so you can watch the bitrate drop. */
export const Buffering: Story = {
  args: { phase: 'buffering', bitrateBps: 180_000, viewerCount: 1284, duration: 3725 },
};

/** The auto-recovery phase, distinct from the initial connect. */
export const Reconnecting: Story = {
  args: { phase: 'reconnecting', viewerCount: 1284 },
};

/** Terminal failure: red dot, error label. */
export const Error: Story = {
  args: { phase: 'error' },
};

/** Nothing has started yet. */
export const Idle: Story = {
  args: { phase: 'idle' },
};

/** Every numeric slot omitted — the strip collapses to just the phase pill. */
export const PhaseOnly: Story = {
  args: { phase: 'live' },
};

/** The strip is `inline-flex` by default. `className` stretches it across a
 *  player footer and spreads the slots — no wrapper `<div>`, no inline style. */
export const FullWidthFooter: Story = {
  args: {
    phase: 'playing',
    bitrateBps: 2_400_000,
    viewerCount: 1284,
    duration: 3725,
    className: 'flex w-[480px] justify-between rounded-t-none',
  },
};

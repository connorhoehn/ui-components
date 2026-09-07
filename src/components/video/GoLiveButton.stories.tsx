import type { Meta, StoryObj } from '@storybook/react';
import { GoLiveButton } from './GoLiveButton';

/**
 * The other end of the watch surface. `StreamStage` is what an audience sees;
 * this is the only place anyone DECIDES there should be an audience.
 *
 * It is a prototype for an open product question — is a broadcast a distinct
 * thing you announce, or is every room call implicitly watchable? — so hosts
 * gate it behind their own flag rather than it defaulting on.
 */
const meta: Meta<typeof GoLiveButton> = {
  title: 'Video/GoLiveButton',
  component: GoLiveButton,
};
export default meta;

type Story = StoryObj<typeof GoLiveButton>;

/** Resting. The click starts the broadcast AND tells the channel. */
export const Ready: Story = { args: {} };

export const Starting: Story = { args: { starting: true } };

/** Live, with nobody watching yet — and the counter proving it is working. */
export const LiveEmptyHouse: Story = { args: { live: true, viewerCount: 0 } };

/**
 * Live, with the count UNKNOWN. Nothing is shown rather than a zero: a
 * broadcaster shown "0 watching" by a counter that is merely absent has been
 * told the most discouraging possible untrue thing.
 */
export const LiveCountUnknown: Story = { args: { live: true, viewerCount: null } };

export const LiveWithAudience: Story = {
  args: { live: true, viewerCount: 42, onEndBroadcast: () => {} },
};

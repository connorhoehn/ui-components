import type { Meta, StoryObj } from '@storybook/react';
import { GoLiveButton } from './GoLiveButton';

/**
 * The other end of the watch surface. `StreamStage` is what an audience sees;
 * this is the only place anyone DECIDES there should be an audience.
 *
 * The states below are the broadcaster's whole journey, and the interesting
 * ones are the two that used to be indistinguishable from success: a call
 * that is up while nothing is being broadcast, and a start that failed.
 */
const meta: Meta<typeof GoLiveButton> = {
  title: 'Video/GoLiveButton',
  component: GoLiveButton,
  args: { channelName: '#design' },
};
export default meta;

type Story = StoryObj<typeof GoLiveButton>;

/**
 * Resting. The click starts the broadcast AND tells the channel — said under
 * the button, naming the channel, rather than left in a tooltip that a touch
 * user never sees.
 */
export const Ready: Story = { args: {} };

/** The gap between the click and being watchable, which is seconds long. */
export const Starting: Story = { args: { starting: true } };

/** Live, with nobody watching yet — and the counter proving it is working. */
export const LiveEmptyHouse: Story = {
  args: { live: true, streamReady: true, viewerCount: 0 },
};

/**
 * Live, with the count UNKNOWN. Nothing is shown rather than a zero: a
 * broadcaster shown "0 watching" by a counter that is merely absent has been
 * told the most discouraging possible untrue thing.
 */
export const LiveCountUnknown: Story = {
  args: { live: true, streamReady: true, viewerCount: null },
};

export const LiveWithAudience: Story = {
  args: { live: true, streamReady: true, viewerCount: 42, onEndBroadcast: () => {} },
};

/**
 * On the call, broadcasting NOTHING — the state this control used to render
 * as "You are live". The audience side of it is silent (a viewer is simply
 * never offered anything), so the broadcaster is the only person who can
 * notice, which is exactly why it has to be said here.
 */
export const CallUpButNoStream: Story = {
  args: { live: true, streamReady: false },
};

/** No handler to end it, so the label says where the real stop control is. */
export const LiveEndedElsewhere: Story = {
  args: {
    live: true,
    streamReady: true,
    viewerCount: 3,
    endHint: 'Hang up in the call window to end the broadcast.',
  },
};

/** A failure that says something a person can act on. */
export const FailedToStart: Story = {
  args: {
    error: 'The call ended before it started. Check no other app is using your camera or microphone, then try again.',
  },
};

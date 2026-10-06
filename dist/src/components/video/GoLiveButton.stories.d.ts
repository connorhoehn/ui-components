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
declare const meta: Meta<typeof GoLiveButton>;
export default meta;
type Story = StoryObj<typeof GoLiveButton>;
/**
 * Resting. The click starts the broadcast AND tells the channel — said under
 * the button, naming the channel, rather than left in a tooltip that a touch
 * user never sees.
 */
export declare const Ready: Story;
/** The gap between the click and being watchable, which is seconds long. */
export declare const Starting: Story;
/** Live, with nobody watching yet — and the counter proving it is working. */
export declare const LiveEmptyHouse: Story;
/**
 * Live, with the count UNKNOWN. Nothing is shown rather than a zero: a
 * broadcaster shown "0 watching" by a counter that is merely absent has been
 * told the most discouraging possible untrue thing.
 */
export declare const LiveCountUnknown: Story;
export declare const LiveWithAudience: Story;
/**
 * On the call, broadcasting NOTHING — the state this control used to render
 * as "You are live". The audience side of it is silent (a viewer is simply
 * never offered anything), so the broadcaster is the only person who can
 * notice, which is exactly why it has to be said here.
 */
export declare const CallUpButNoStream: Story;
/** No handler to end it, so the label says where the real stop control is. */
export declare const LiveEndedElsewhere: Story;
/** A failure that says something a person can act on. */
export declare const FailedToStart: Story;
//# sourceMappingURL=GoLiveButton.stories.d.ts.map
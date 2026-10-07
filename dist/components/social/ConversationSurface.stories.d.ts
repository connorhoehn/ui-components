import type { Meta, StoryObj } from '@storybook/react-vite';
import { ConversationSurface } from './ConversationSurface';
declare const meta: Meta<typeof ConversationSurface>;
export default meta;
type Story = StoryObj<typeof ConversationSurface>;
/** Everything the surface can offer. */
export declare const Everything: Story;
/**
 * What a product that ships only messaging looks like. Not a greyed tab and
 * not an upsell — no tab bar at all, because a tab that cannot do anything is
 * worse than a tab that is not there.
 */
export declare const ChatOnly: Story;
/** Chat plus calling: the shape most existing products want to paste in. */
export declare const ChatAndCalls: Story;
/**
 * A deployment with documents but no telephony — the conversation is a place
 * to write together, and the call buttons never render because no handler was
 * supplied.
 */
export declare const ChatAndDocuments: Story;
/** Someone is already on a call: the controls say Join, not Call. */
export declare const CallInProgress: Story;
/**
 * The call you are on, docked to this conversation: the mockup-02 shelf
 * (`CallDock` without documents) sits in ChatPanel's `dock` slot, directly
 * above the composer, which keeps the bottom edge.
 */
export declare const CallDockedAboveComposer: Story;
/**
 * The mass-audience option, said out loud.
 *
 * Watching and joining are different products of the same room: joining costs
 * a peer connection per head, watching is near-realtime and a CDN carries it
 * to any audience. That choice used to be offered as a bare 👁 with its whole
 * explanation in a `title` — invisible on touch, unannounced by plenty of
 * screen readers, and ambiguous even to someone hovering it.
 */
export declare const Watchable: Story;
/**
 * With an audience already measured, and the product's own word for it.
 *
 * The count follows the same rule as everywhere else on this path: a numeric
 * 0 is a measured empty house and renders; `null`/omitted is "nobody measured"
 * and renders nothing, because a channel that has never been counted must not
 * claim an audience.
 */
export declare const WatchableWithAudience: Story;
/** Every view, with nothing in it yet — what a brand-new channel looks like. */
export declare const NothingYet: Story;
//# sourceMappingURL=ConversationSurface.stories.d.ts.map
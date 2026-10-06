import type { Meta, StoryObj } from '@storybook/react-vite';
import { ConversationRail } from './ConversationRail';
declare const meta: Meta<typeof ConversationRail>;
export default meta;
type Story = StoryObj<typeof ConversationRail>;
/** The default rail: fixed destinations above, grouped conversations below. */
export declare const Default: Story;
/**
 * A product with no activity feed to point at. The shelf is absent rather
 * than empty — a strip with nothing in it is chrome that explains nothing.
 */
export declare const NoShelf: Story;
/**
 * One run of rows, for a host that wants the compact behaviour the bare
 * `ConversationList` gives by default.
 */
export declare const Flat: Story;
/** Cold start: signed in, nobody messaged yet. */
export declare const NothingYet: Story;
/**
 * Host chrome above and below. The rail owns the middle; the workspace
 * identity and the signed-in row belong to the app around it.
 */
export declare const WithHeaderAndFooter: Story;
/**
 * **The assembly.** Rail plus surface under one `RailSelection` — which is
 * the whole reason the selection is a single value: the pane switches between
 * the mentions view and a conversation by reading `selected.kind`, and there
 * is no second piece of state to keep in sync.
 *
 * Copy this story, swap the fixtures for your own channels and messages, and
 * you have a messaging app.
 */
export declare const WholeApp: StoryObj;
//# sourceMappingURL=ConversationRail.stories.d.ts.map
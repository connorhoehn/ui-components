import type { StoryObj } from '@storybook/react-vite';
import { TaskComposer } from './TaskComposer';
/**
 * A prompt box with somewhere to start.
 *
 * The two fields are not the interesting part. A bare composer is correct,
 * general, and the least approachable thing on a page: it asks you to already
 * know what to type while the surface around it is full of context the app has
 * and the box does not. The strip above closes that gap without taking the
 * general case away — every card is ignorable and the fields stay free-typed.
 *
 * Choosing a card FILLS the fields; it does not submit. A card that dispatched
 * an agent on one click would make the strip a minefield.
 */
declare const meta: {
    title: string;
    component: typeof TaskComposer;
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** What the Work page shows an SME with initiatives in flight. */
export declare const WithSuggestions: Story;
/**
 * No suggestions, no shelf. An empty state for an optional nicety is itself
 * noise, so the strip disappears rather than apologising for itself.
 */
export declare const Bare: Story;
/** While the host is still working out what to suggest. */
export declare const Loading: Story;
//# sourceMappingURL=TaskComposer.stories.d.ts.map
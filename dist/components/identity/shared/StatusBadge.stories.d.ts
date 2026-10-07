import type { StoryObj } from '@storybook/react-vite';
import { StatusBadge } from './StatusBadge';
declare const meta: {
    title: string;
    component: typeof StatusBadge;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        status: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** A single badge; the tone is derived from the status string. */
export declare const Default: Story;
/**
 * Every status the built-in map recognises, so the tone assignments can be
 * compared side by side.
 */
export declare const AllKnownStatuses: Story;
/** An unmapped status falls through to the neutral tone. */
export declare const UnmappedStatus: Story;
/**
 * `variant` overrides the status→tone lookup — use it when the same word
 * means different things in different contexts.
 */
export declare const VariantOverride: Story;
//# sourceMappingURL=StatusBadge.stories.d.ts.map
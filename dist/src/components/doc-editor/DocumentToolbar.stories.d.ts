import type { StoryObj } from '@storybook/react-vite';
import DocumentToolbar from './DocumentToolbar';
/**
 * The formatting bar over a page, at each of its three one-row layouts.
 *
 * It never wraps. `Auto` (the default in the app) measures the bar's own box;
 * the fixed sizes are here to see each layout without dragging.
 */
declare const meta: {
    title: string;
    component: typeof DocumentToolbar;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** Measures its own box: drag the frame's edge and watch. */
export declare const Auto: Story;
/** Everything on the bar — the layout at 1240px of bar and up. */
export declare const Wide: Story;
/** Colour, alignment, spacing, inserts and clear behind ⋯; Comment is an icon. */
export declare const Medium: Story;
/** The three selects fold into one Style ▾. */
export declare const Narrow: Story;
//# sourceMappingURL=DocumentToolbar.stories.d.ts.map
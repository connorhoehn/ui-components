import type { StoryObj } from '@storybook/react-vite';
import { SlidesToolbar } from './SlidesToolbar';
/**
 * The deck editor's toolbar, at each of its three one-row layouts.
 *
 * It never wraps. `Auto` (the default in the app) measures the bar's own box;
 * the fixed sizes are here to see each layout without dragging. Present stays
 * on the bar at every width.
 */
declare const meta: {
    title: string;
    component: typeof SlidesToolbar;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** Measures its own box: drag the frame's edge and watch the groups move behind ⋯. */
export declare const Auto: Story;
/** Everything inline — the bar at a full-width editor. */
export declare const Wide: Story;
/** Insert, Theme and the style note behind ⋯; Layout and the chart switch stay. */
export declare const Medium: Story;
/** Layout and the chart switch join them; New slide, Undo/Redo and Present remain. */
export declare const Narrow: Story;
//# sourceMappingURL=SlidesToolbar.stories.d.ts.map
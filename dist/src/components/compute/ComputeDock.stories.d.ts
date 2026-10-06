import type { StoryObj } from '@storybook/react-vite';
import { ComputeDock } from './components/ComputeDock';
/**
 * Every story shares one fleet and one mock shell transport. What differs
 * story to story is which boxes are seeded into the dock and which layout
 * mode it starts in — see the per-story decorator.
 */
declare const meta: {
    title: string;
    component: typeof ComputeDock;
    parameters: {
        layout: string;
    };
    decorators: ((Story: import("storybook/internal/csf").PartialStoryFn<import("@storybook/react").ReactRenderer, {
        hotkeys?: boolean;
        reconcile?: boolean;
        className?: string;
    }>) => import("react").JSX.Element)[];
};
export default meta;
type Story = StoryObj<typeof meta>;
/**
 * The default layout: one strip pinned to the bottom, tabbed, one shell
 * visible at a time. This is "working in one shell" — click a tab, or press
 * `⌥1`/`⌥2` to jump, and type `help` in either; both are simulated PTYs, not
 * static output. Hidden tabs stay mounted (their sockets survive) and are
 * merely styled invisible, which is why switching tabs never shows a
 * reconnect.
 */
export declare const Docked: Story;
/**
 * Every seeded shell tiled at once, tmux-style — the layout for watching
 * several boxes rather than driving one. Three panes here so the two-column
 * grid actually wraps; each tile carries its own label and close button
 * because with several on screen the tab strip's single active label is no
 * longer enough to say which is which.
 */
export declare const Grid: Story;
/**
 * The same tiling as Grid, but as a narrow column down the right edge instead
 * of filling the bottom strip — the layout for keeping shells to hand while
 * the page beside them is still usable. Compare against Docked: same two
 * boxes, same shells, only the chrome around them changes.
 */
export declare const Stack: Story;
/**
 * A draggable window parked over the page rather than docked to an edge.
 * `ComputeDock` hands this layout to `FloatingPanel` for the drag, snap and
 * anchor-persistence behaviour rather than re-solving that itself — this
 * story is what reviews that hand-off actually renders a usable terminal
 * window, not just that the panel opens.
 */
export declare const Floating: Story;
//# sourceMappingURL=ComputeDock.stories.d.ts.map
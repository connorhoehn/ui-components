import type { StoryObj } from '@storybook/react-vite';
/**
 * The two WebGL backdrops, knocked off from ReactBits and ported onto raw
 * WebGL. Both need a real GPU to show anything — in a headless snapshot the
 * particle field falls through to its CSS twin and the ripple grid renders
 * nothing at all, which is the intended behaviour and not a broken story.
 */
declare const meta: {
    title: string;
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** The defaults: a couple of hundred white points over the near-black gradient. */
export declare const Particles: Story;
/** What an agent shell wears mid-turn: indigo-tinted, soft-edged, pointer-aware. */
export declare const WorkingSurface: Story;
/** The activity-canvas preset: grey lines on near-white, subtle enough to put nodes on. */
export declare const ActivityGrid: Story;
/**
 * The preset on the panel shapes it actually meets — wide and squat, then
 * tall and narrow. The grid reaches every side of both. At ReactBits' full
 * fade (`edgeFade={1}`, the third box) it is an oval in the middle of the wide
 * one, which is the bug this preset exists to not have.
 */
export declare const ActivityGridFillsItsSection: Story;
/** ReactBits' own default: glowing white lines on a dark ground. */
export declare const RippleGridDark: Story;
/** The switch itself — flip to Agent and the surface answers. */
export declare const ConsoleSwitch: Story;
//# sourceMappingURL=Backgrounds.stories.d.ts.map
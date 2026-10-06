import type { StoryObj } from '@storybook/react-vite';
import { PaneStatusLine } from './components/PaneStatusLine';
import type { Computer } from './types';
/**
 * The dense, single-line status a terminal multiplexer puts at the foot of
 * an unfocused pane — what model it is on, how full its context window is,
 * what the last run cost, and how long before the reaper stops it. This is
 * the surface you read about a box you are NOT currently looking at, so
 * every story here is deliberately a different pane at a glance rather than
 * a wall of identical rows.
 */
declare const meta: {
    title: string;
    component: typeof PaneStatusLine;
    parameters: {
        layout: string;
    };
    args: {
        models: import("./types").ComputeModel[];
    };
    decorators: ((Story: import("storybook/internal/csf").PartialStoryFn<import("@storybook/react").ReactRenderer, {
        computer: Computer;
        modelId?: string | null;
        models?: import("./types").ComputeModel[];
        idleWindowMs?: number;
        broadcasting?: boolean;
        mode?: string;
        variant?: 'full' | 'meta';
        extra?: import("react").ReactNode;
        className?: string;
        'data-testid'?: string;
    }>) => import("react").JSX.Element)[];
};
export default meta;
type Story = StoryObj<typeof meta>;
/** A healthy pane: running, project named, expiry meter reads mid-scale and neutral. */
export declare const WithPlentyOfRunway: Story;
/**
 * Under five minutes to reap. The meter crosses `warnAbove` here and paints
 * amber — the one thing on this line that changes while your eyes are on a
 * different pane, which is the reason the meter exists instead of just the
 * `stops in 4m` text next to it.
 */
export declare const ExpiringSoon: Story;
/** Context usage above 85% switches the `ctx N%` figure to the caution colour. */
export declare const NearContextLimit: Story;
/** The broadcast flag adds a chip saying the prompt bar reaches this pane too. */
export declare const Broadcasting: Story;
//# sourceMappingURL=PaneStatusLine.stories.d.ts.map
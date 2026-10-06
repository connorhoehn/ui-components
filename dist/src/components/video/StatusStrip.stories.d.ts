import type { StoryObj } from '@storybook/react-vite';
import { StatusStrip } from './StatusStrip';
declare const meta: {
    title: string;
    component: typeof StatusStrip;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** `playing` is relabelled LIVE — the strip is written for broadcast, not VOD. */
export declare const Live: Story;
/** Establishing the connection: amber dot, no metrics yet. */
export declare const Connecting: Story;
/** Mid-stream stall — metrics stay on screen so you can watch the bitrate drop. */
export declare const Buffering: Story;
/** The auto-recovery phase, distinct from the initial connect. */
export declare const Reconnecting: Story;
/** Terminal failure: red dot, error label. */
export declare const Error: Story;
/** Nothing has started yet. */
export declare const Idle: Story;
/** Every numeric slot omitted — the strip collapses to just the phase pill. */
export declare const PhaseOnly: Story;
/** The strip is `inline-flex` by default. `className` stretches it across a
 *  player footer and spreads the slots — no wrapper `<div>`, no inline style. */
export declare const FullWidthFooter: Story;
//# sourceMappingURL=StatusStrip.stories.d.ts.map
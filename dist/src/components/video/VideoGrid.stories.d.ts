import type { StoryObj } from '@storybook/react-vite';
import { VideoGrid } from './VideoGrid';
declare const meta: {
    title: string;
    component: typeof VideoGrid;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        className: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** No participants — the grid collapses to nothing. Callers that need a
 *  "waiting for others" affordance should use HangoutGrid. */
export declare const Empty: Story;
/** One participant: a single full-width tile. */
export declare const Solo: Story;
/** 2–4 participants: 2 columns. */
export declare const FourUp: Story;
/** 5–9 participants: 3 columns. */
export declare const NineUp: Story;
/** Speaking + muted states are per-tile borders/badges, not layout changes. */
export declare const MixedStates: Story;
//# sourceMappingURL=VideoGrid.stories.d.ts.map
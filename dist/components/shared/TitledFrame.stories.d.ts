import type { StoryObj } from '@storybook/react-vite';
import { TitledFrame } from './TitledFrame';
declare const meta: {
    title: string;
    component: typeof TitledFrame;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
/** In a pane grid exactly one frame is active — the border is how you know
 *  which one has the keyboard. */
export declare const PaneGrid: Story;
export declare const WithAction: Story;
/** `surface` themes with the app instead of the terminal — for a frame that
 *  does not contain a PTY. */
export declare const SurfaceTone: Story;
export declare const LongTitle: Story;
//# sourceMappingURL=TitledFrame.stories.d.ts.map
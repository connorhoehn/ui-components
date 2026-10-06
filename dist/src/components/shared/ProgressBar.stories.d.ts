import type { StoryObj } from '@storybook/react-vite';
import { ProgressBar } from './ProgressBar';
declare const meta: {
    title: string;
    component: typeof ProgressBar;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const LabelledRatio: Story;
export declare const Percentage: Story;
export declare const Small: Story;
/** Turns green only once every item is done. */
export declare const CompletesInAnotherTone: Story;
//# sourceMappingURL=ProgressBar.stories.d.ts.map
import type { StoryObj } from '@storybook/react-vite';
import { HuddleBar } from './HuddleBar';
declare const meta: {
    title: string;
    component: typeof HuddleBar;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** Idle beside the footer's left group: one row, one size, one weight scale. */
export declare const IdleInFooter: Story;
export declare const LiveInFooter: Story;
//# sourceMappingURL=HuddleBar.stories.d.ts.map
import type { StoryObj } from '@storybook/react-vite';
import VideoDockSlot from './VideoDockSlot';
declare const meta: {
    title: string;
    component: typeof VideoDockSlot;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const NoCall: Story;
export declare const AwaitingDrop: Story;
/** The chat shelf's drop prompt: a one-line strip above the composer. */
export declare const AwaitingDropCompact: Story;
export declare const Docked: Story;
export declare const DockedWithoutUndock: Story;
//# sourceMappingURL=VideoDockSlot.stories.d.ts.map
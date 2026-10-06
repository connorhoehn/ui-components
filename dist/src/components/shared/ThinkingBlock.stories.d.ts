import type { StoryObj } from '@storybook/react-vite';
import { ThinkingBlock } from './ThinkingBlock';
declare const meta: {
    title: string;
    component: typeof ThinkingBlock;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Finished: Story;
export declare const Streaming: Story;
export declare const Collapsed: Story;
//# sourceMappingURL=ThinkingBlock.stories.d.ts.map
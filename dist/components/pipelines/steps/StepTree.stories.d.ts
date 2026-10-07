import type { StoryObj } from '@storybook/react-vite';
import { StepTree } from './StepTree';
declare const meta: {
    title: string;
    component: typeof StepTree;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Linear: Story;
export declare const ForkJoin: Story;
export declare const LiveRun: Story;
export declare const ArtifactsAndRetries: Story;
//# sourceMappingURL=StepTree.stories.d.ts.map
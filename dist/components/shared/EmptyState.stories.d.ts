import type { StoryObj } from '@storybook/react-vite';
import EmptyState from './EmptyState';
declare const meta: {
    title: string;
    component: typeof EmptyState;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Basic: Story;
export declare const WithAction: Story;
export declare const RichDescription: Story;
export declare const CustomAction: Story;
export declare const WithGuidedActions: Story;
//# sourceMappingURL=EmptyState.stories.d.ts.map
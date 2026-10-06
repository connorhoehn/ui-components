import type { StoryObj } from '@storybook/react-vite';
import { NetworkErrorBoundary } from './NetworkErrorBoundary';
declare const meta: {
    title: string;
    component: typeof NetworkErrorBoundary;
    tags: string[];
    parameters: {
        layout: string;
        docs: {
            description: {
                component: string;
            };
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Healthy: Story;
export declare const CaughtError: Story;
export declare const CustomFallback: Story;
export declare const RetryClearsError: Story;
//# sourceMappingURL=NetworkErrorBoundary.stories.d.ts.map
import type { StoryObj } from '@storybook/react-vite';
import { CapabilityBoundary } from './CapabilityBoundary';
declare const meta: {
    title: string;
    component: typeof CapabilityBoundary;
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
export declare const Enabled: Story;
export declare const Disabled: Story;
export declare const Loading: Story;
export declare const LoadingNoSlot: Story;
//# sourceMappingURL=CapabilityBoundary.stories.d.ts.map
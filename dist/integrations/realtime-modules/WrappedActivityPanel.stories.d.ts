import type { StoryObj } from '@storybook/react-vite';
import { WrappedActivityPanel } from './WrappedActivityPanel';
import type { RMUseActivityReturn } from './types';
declare const meta: {
    title: string;
    component: typeof WrappedActivityPanel;
    tags: string[];
    parameters: {
        layout: string;
        docs: {
            description: {
                component: string;
            };
        };
    };
    decorators: ((Story: import("storybook/internal/csf").PartialStoryFn<import("@storybook/react").ReactRenderer, {
        activity: RMUseActivityReturn;
        visibleCount?: number | undefined;
        rotateMs?: number | undefined;
        staggerMs?: number | undefined;
        kindColors?: Record<string, string> | undefined;
        className?: string | undefined;
    }>) => import("react").JSX.Element)[];
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Empty: Story;
export declare const Populated: Story;
export declare const RotatingSubset: Story;
export declare const CapabilityDenied: Story;
//# sourceMappingURL=WrappedActivityPanel.stories.d.ts.map
import type { StoryObj } from '@storybook/react-vite';
import { WrappedReactionsOverlay } from './WrappedReactionsOverlay';
import type { RMUseReactionsReturn } from './types';
declare const meta: {
    title: string;
    component: typeof WrappedReactionsOverlay;
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
        reactions: RMUseReactionsReturn;
        ttlMs?: number | undefined;
    }>) => import("react").JSX.Element)[];
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Idle: Story;
export declare const SingleDrift: Story;
export declare const RapidFire: Story;
//# sourceMappingURL=WrappedReactionsOverlay.stories.d.ts.map
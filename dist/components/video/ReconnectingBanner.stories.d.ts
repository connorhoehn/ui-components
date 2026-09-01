import type { StoryObj } from '@storybook/react-vite';
import { ReconnectingBanner } from './ReconnectingBanner';
declare const meta: {
    title: string;
    component: typeof ReconnectingBanner;
    tags: string[];
    parameters: {
        layout: string;
    };
    decorators: ((Story: import("storybook/internal/csf").PartialStoryFn<import("@storybook/react").ReactRenderer, {
        show: boolean;
        label?: string | undefined;
    }>) => import("react").JSX.Element)[];
};
export default meta;
type Story = StoryObj<typeof meta>;
/** The default warning pill. */
export declare const Reconnecting: Story;
/** A more specific label — e.g. when you know which leg is retrying. */
export declare const CustomLabel: Story;
/** `show: false` renders nothing, so callers don't need their own gate. */
export declare const Hidden: Story;
//# sourceMappingURL=ReconnectingBanner.stories.d.ts.map
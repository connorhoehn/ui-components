import type { StoryObj } from '@storybook/react-vite';
import MetricCard from './MetricCard';
declare const meta: {
    title: string;
    component: typeof MetricCard;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        title: string;
        timeRange: string;
        children: import("react").JSX.Element;
    };
    decorators: ((Story: import("storybook/internal/csf").PartialStoryFn<import("@storybook/react").ReactRenderer, {
        title: string;
        timeRange?: string;
        children: import("react").ReactNode;
        onMaximize?: () => void;
        sample?: boolean;
    }>) => import("react").JSX.Element)[];
};
export default meta;
type Story = StoryObj<typeof meta>;
/** The card is a frame — any chart (or table) can be its child. */
export declare const WithChart: Story;
/** `timeRange` is optional; omit it for a metric that isn't windowed. */
export declare const NoTimeRange: Story;
/** The maximize affordance only renders when the host wires a handler. */
export declare const Maximizable: Story;
/** Non-chart child: the frame doesn't assume its content. */
export declare const TextContent: Story;
//# sourceMappingURL=MetricCard.stories.d.ts.map
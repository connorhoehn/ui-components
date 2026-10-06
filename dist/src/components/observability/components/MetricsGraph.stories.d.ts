import type { StoryObj } from '@storybook/react-vite';
import MetricsGraph from './MetricsGraph';
declare const meta: {
    title: string;
    component: typeof MetricsGraph;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        title: string;
        data: number[];
    };
    decorators: ((Story: import("storybook/internal/csf").PartialStoryFn<import("@storybook/react").ReactRenderer, {
        title: string;
        data?: number[];
        series?: import("./MetricsGraph").MetricsGraphSeries[];
        yLabel?: string;
        sparkWidth?: number;
        sparkHeight?: number;
    }>) => import("react").JSX.Element)[];
};
export default meta;
type Story = StoryObj<typeof meta>;
/** Bare `data` array — the single-series shorthand. */
export declare const SingleSeries: Story;
export declare const WithYLabel: Story;
/** Explicit `series` wins over `data`; colours come from the tone scale. */
export declare const MultiSeries: Story;
/** No samples in the window. */
export declare const NoData: Story;
//# sourceMappingURL=MetricsGraph.stories.d.ts.map
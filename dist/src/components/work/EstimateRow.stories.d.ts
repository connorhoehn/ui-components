import type { StoryObj } from '@storybook/react-vite';
import { EstimateRow } from './EstimateRow';
declare const meta: {
    title: string;
    component: typeof EstimateRow;
    tags: string[];
    parameters: {
        layout: string;
    };
    decorators: ((Story: import("storybook/internal/csf").PartialStoryFn<import("@storybook/react").ReactRenderer, {
        label: string;
        estimate: import("./EstimateRow").RunEstimate;
        className?: string;
        'data-testid'?: string;
    }>) => import("react").JSX.Element)[];
    args: {
        label: string;
        estimate: {
            kind: "range";
            low: number;
            high: number;
            unit: "usd";
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const CostRange: Story;
export declare const DurationRange: Story;
export declare const NoPriorRuns: Story;
export declare const Loading: Story;
export declare const Dark: Story;
//# sourceMappingURL=EstimateRow.stories.d.ts.map
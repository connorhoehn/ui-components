import type { StoryObj } from '@storybook/react-vite';
import { LineChart } from './Chart';
declare const meta: {
    title: string;
    component: typeof LineChart;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Line: Story;
export declare const StackedArea: Story;
export declare const Bar: Story;
//# sourceMappingURL=Chart.stories.d.ts.map
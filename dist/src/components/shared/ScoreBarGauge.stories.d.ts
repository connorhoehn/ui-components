import type { StoryObj } from '@storybook/react-vite';
import { ScoreBarGauge } from './ScoreBarGauge';
declare const meta: {
    title: string;
    component: typeof ScoreBarGauge;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const AboveThreshold: Story;
export declare const BelowThreshold: Story;
export declare const ForcedTone: Story;
//# sourceMappingURL=ScoreBarGauge.stories.d.ts.map
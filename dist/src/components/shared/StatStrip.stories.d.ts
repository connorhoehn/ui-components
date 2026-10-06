import type { StoryObj } from '@storybook/react-vite';
import { StatStrip } from './StatStrip';
declare const meta: {
    title: string;
    component: typeof StatStrip;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        items: ({
            label: string;
            value: number;
            hint: string;
            tone?: undefined;
        } | {
            hint?: undefined;
            label: string;
            value: number;
            tone: "danger";
        } | {
            hint?: undefined;
            label: string;
            value: string;
            tone: "accent";
        })[];
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
/** The Distillation tier flow: counts joined by labelled arrows, with health lines. */
export declare const TierFlow: Story;
export declare const FramelessFlow: Story;
export declare const Dark: Story;
//# sourceMappingURL=StatStrip.stories.d.ts.map
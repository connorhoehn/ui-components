import type { StoryObj } from '@storybook/react-vite';
import { DotMeter } from './DotMeter';
declare const meta: {
    title: string;
    component: typeof DotMeter;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
/** The reset time is what makes a quota actionable — 89% is only alarming
 *  until you know it clears in nine minutes. */
export declare const Quota: Story;
/** Past `warnAbove` the fill changes tone; below it, a half-spent budget is
 *  deliberately neutral. */
export declare const Warning: Story;
export declare const Counted: Story;
export declare const SurfaceTone: Story;
export declare const Edges: Story;
//# sourceMappingURL=DotMeter.stories.d.ts.map
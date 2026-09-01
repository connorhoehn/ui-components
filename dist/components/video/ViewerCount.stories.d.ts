import type { StoryObj } from '@storybook/react-vite';
import { ViewerCount } from './ViewerCount';
declare const meta: {
    title: string;
    component: typeof ViewerCount;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** Under 1000, the raw number is shown. */
export declare const Small: Story;
/** Nobody watching yet. */
export declare const Zero: Story;
/** At 1000+ the badge switches to one-decimal thousands ("12.4K"). */
export declare const Thousands: Story;
/** Overlay use: position via `className`, not `style` — the `style` prop is
 *  deprecated and only kept so existing callers keep compiling. */
export declare const OverlaidOnPlayer: Story;
//# sourceMappingURL=ViewerCount.stories.d.ts.map
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
/**
 * A MEASURED empty house. Shown, not swallowed: viewer count in this codebase
 * was structurally zero for a long time (the tracker had no callers at all),
 * so a visible "0 watching" is the only thing that tells a broadcaster the
 * counter works rather than being absent.
 */
export declare const Zero: Story;
/**
 * NEVER MEASURED — renders nothing at all.
 *
 * Upstream `getViewerCount` returns `null` when it cannot measure, and a
 * channel nobody has counted must not claim an audience of zero. The story
 * renders an empty frame on purpose; that IS the component's answer.
 */
export declare const Unknown: Story;
/** At 1000+ the badge switches to one-decimal thousands ("12.4K"). */
export declare const Thousands: Story;
/** Overlay use: position via `className`, not `style` — the `style` prop is
 *  deprecated and only kept so existing callers keep compiling. */
export declare const OverlaidOnPlayer: Story;
//# sourceMappingURL=ViewerCount.stories.d.ts.map
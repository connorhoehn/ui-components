import type { StoryObj } from '@storybook/react-vite';
import { CallStartedBanner } from './CallStartedBanner';
declare const meta: {
    title: string;
    component: typeof CallStartedBanner;
    tags: string[];
    parameters: {
        layout: string;
    };
    decorators: ((Story: import("storybook/internal/csf").PartialStoryFn<import("@storybook/react").ReactRenderer, {
        callerName: string;
        callerAvatarUrl?: string;
        context?: string;
        mode?: import("./CallStartedBanner").CallStartedBannerMode;
        media?: import("./CallStartedBanner").CallStartedBannerMedia;
        onJoin?: () => void;
        onDismiss?: () => void;
        autoExpireSec?: number;
        className?: string;
        style?: import("react").CSSProperties;
    }>) => import("react").JSX.Element)[];
    args: {
        autoExpireSec: number;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** Broadcast framing — use for ambient hangouts where several people are
 *  invited at once. */
export declare const Started: Story;
/** Direct framing — use when the recipient is specifically the callee. */
export declare const Calling: Story;
/** Without `context` the banner is a single line. */
export declare const NoContext: Story;
/** Join-only: omitting `onDismiss` removes the dismiss action, so the banner
 *  can only be resolved by joining (or by the auto-expire timer). */
export declare const JoinOnly: Story;
/** Long names truncate rather than wrapping the action buttons off the edge. */
export declare const LongName: Story;
/** With the real 30s auto-expire behaviour — the banner disappears on its own.
 *  Reload the story to see it again. */
export declare const AutoExpiring: Story;
//# sourceMappingURL=CallStartedBanner.stories.d.ts.map
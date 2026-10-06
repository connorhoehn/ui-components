import type { StoryObj } from '@storybook/react-vite';
import { CallParticipantStrip, type CallStripParticipant } from './CallParticipantStrip';
declare const meta: {
    title: string;
    component: typeof CallParticipantStrip;
    tags: string[];
    parameters: {
        layout: string;
    };
    decorators: ((Story: import("storybook/internal/csf").PartialStoryFn<import("@storybook/react").ReactRenderer, {
        participants: CallStripParticipant[];
        localFallback?: CallStripParticipant;
        maxVisible?: number;
        avatarSize?: number;
        testId?: string;
        className?: string;
        style?: import("react").CSSProperties;
    }>) => import("react").JSX.Element)[];
};
export default meta;
type Story = StoryObj<typeof meta>;
/** Three people, all fine. Avatar colour is hashed from the display name, so
 *  the same person is the same colour everywhere in the call surface. */
export declare const Populated: Story;
/** Speaking gets a green dot bottom-right; muted gets a red mic-slash badge
 *  top-right. Both can be true at once — that's the "talking while muted" case. */
export declare const SpeakingAndMuted: Story;
/** Past `maxVisible` the strip collapses into a `+N` counter instead of
 *  wrapping to a second row. */
export declare const Overflow: Story;
/** Nobody has joined yet — `localFallback` renders your own (slightly larger)
 *  avatar so the strip is never blank while a call is ringing. */
export declare const LocalFallbackOnly: Story;
/** No participants and no fallback — the strip renders empty padding. */
export declare const Empty: Story;
/** Bigger avatars for a full-screen call surface. */
export declare const LargeAvatars: Story;
//# sourceMappingURL=CallParticipantStrip.stories.d.ts.map
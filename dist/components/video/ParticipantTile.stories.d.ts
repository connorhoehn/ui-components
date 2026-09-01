import type { StoryObj } from '@storybook/react-vite';
import { ParticipantTile } from './ParticipantTile';
declare const meta: {
    title: string;
    component: typeof ParticipantTile;
    tags: string[];
    parameters: {
        layout: string;
    };
    decorators: ((Story: import("storybook/internal/csf").PartialStoryFn<import("@storybook/react").ReactRenderer, {
        id: string;
        displayName: string;
        avatarUrl?: string | undefined;
        isSpeaking?: boolean | undefined;
        isMuted?: boolean | undefined;
        isLocal?: boolean | undefined;
        isSpotlight?: boolean | undefined;
        videoElement?: import("react").ReactNode;
        onClick?: (() => void) | undefined;
        fillParent?: boolean | undefined;
        className?: string | undefined;
        style?: import("react").CSSProperties | undefined;
    }>) => import("react").JSX.Element)[];
};
export default meta;
type Story = StoryObj<typeof meta>;
/** Camera off — the deterministic name-hashed backdrop plus initials, so a
 *  participant is never an empty black square. */
export declare const AvatarFallback: Story;
/** With a caller-supplied media element in the `videoElement` slot. */
export declare const WithVideo: Story;
/** Speaking: green border + corner dot. Tiles deliberately do NOT reflow on
 *  speaker change (Meet/Teams/Zoom convention). */
export declare const Speaking: Story;
/** Muted: red mic-slash corner badge plus the inline glyph in the name badge. */
export declare const Muted: Story;
/** The local user's tile labels itself "You" rather than repeating the name. */
export declare const Local: Story;
/** Spotlight emphasis — bigger initials chip and a larger mute badge. */
export declare const Spotlight: Story;
/** Clickable tiles (pin / promote-to-spotlight) get a pointer cursor plus a
 *  hover border, and become keyboard-activatable. */
export declare const Clickable: Story;
//# sourceMappingURL=ParticipantTile.stories.d.ts.map
import type { StoryObj } from '@storybook/react-vite';
import { RosterPanel, type RosterParticipant } from './RosterPanel';
declare const meta: {
    title: string;
    component: typeof RosterPanel;
    tags: string[];
    parameters: {
        layout: string;
    };
    decorators: ((Story: import("storybook/internal/csf").PartialStoryFn<import("@storybook/react").ReactRenderer, {
        participants: RosterParticipant[];
        activeSpeakerId?: string | null;
        onParticipantClick?: (id: string) => void;
        count?: number;
        title?: string;
        footer?: import("react").ReactNode;
        tone?: 'light' | 'dark';
        className?: string;
    }>) => import("react").JSX.Element)[];
};
export default meta;
type Story = StoryObj<typeof meta>;
/** The full vocabulary in one list: local "(you)" suffix, mute glyph,
 *  screen-share dot, raised hand, and an active speaker ring. */
export declare const Populated: Story;
/** Nobody but you. */
export declare const JustYou: Story;
/** Rows are only interactive when `onParticipantClick` is supplied — without
 *  it every row renders as a disabled button with a default cursor. */
export declare const Clickable: Story;
/** `count` overrides the header number — use it when the panel is showing a
 *  paginated slice of a much larger call. */
export declare const TruncatedWithTotalCount: Story;
/** The `footer` slot takes arbitrary content — typically an invite action. */
export declare const WithFooterAction: Story;
/** Empty roster — header still renders with a zero count. */
export declare const Empty: Story;
//# sourceMappingURL=RosterPanel.stories.d.ts.map
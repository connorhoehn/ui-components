import type { StoryObj } from '@storybook/react-vite';
import { CallWidget, type CallWidgetParticipant } from './CallWidget';
declare const meta: {
    title: string;
    component: typeof CallWidget;
    tags: string[];
    parameters: {
        layout: string;
    };
    decorators: ((Story: import("storybook/internal/csf").PartialStoryFn<import("@storybook/react").ReactRenderer, {
        state: import("./CallWidget").CallWidgetState;
        mode: import("./CallWidget").CallMode;
        participants: CallWidgetParticipant[];
        localParticipant?: CallWidgetParticipant | undefined;
        callerName?: string | undefined;
        duration?: number | undefined;
        isMuted?: boolean | undefined;
        isCameraOn?: boolean | undefined;
        isScreenSharing?: boolean | undefined;
        onAnswer?: (() => void) | undefined;
        onDecline?: (() => void) | undefined;
        onEndCall?: (() => void) | undefined;
        onToggleMute?: (() => void) | undefined;
        onToggleCamera?: (() => void) | undefined;
        onToggleScreenShare?: (() => void) | undefined;
        onUpgradeToVideo?: (() => void) | undefined;
        onAddParticipant?: ((participantId: string) => void) | undefined;
        availableParticipants?: CallWidgetParticipant[] | undefined;
        onMinimize?: (() => void) | undefined;
        minimized?: boolean | undefined;
        position?: "bottom-right" | "bottom-left" | "top-right" | "top-left" | undefined;
        contained?: boolean | undefined;
        draggable?: boolean | undefined;
        layoutComponent?: import("react").ReactNode;
        callStats?: import("./CallStatsOverlay").CallStatsOverlayStats | undefined;
        className?: string | undefined;
        style?: import("react").CSSProperties | undefined;
        dataAttrs?: Record<string, string | number | undefined> | undefined;
    }>) => import("react/jsx-runtime").JSX.Element)[];
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Ringing: Story;
export declare const Connecting: Story;
export declare const ActiveAudioCall: Story;
export declare const ActiveVideoCall: Story;
export declare const Minimized: Story;
//# sourceMappingURL=CallWidget.stories.d.ts.map
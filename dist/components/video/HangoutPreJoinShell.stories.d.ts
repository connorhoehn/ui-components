import type { StoryObj } from '@storybook/react-vite';
import HangoutPreJoinShell, { type PreJoinRosterEntry } from './HangoutPreJoinShell';
declare const meta: {
    title: string;
    component: typeof HangoutPreJoinShell;
    tags: string[];
    parameters: {
        layout: string;
    };
    decorators: ((Story: import("storybook/internal/csf").PartialStoryFn<import("@storybook/react").ReactRenderer, {
        channelName: string;
        localIdentity?: import("./HangoutPreJoinShell").PreJoinLocalIdentity | undefined;
        previewStream: MediaStream | null;
        permission: import("./HangoutPreJoinShell").PreJoinPermission;
        permissionMessage?: string | null | undefined;
        audioEnabled: boolean;
        videoEnabled: boolean;
        onToggleAudio: () => void;
        onToggleVideo: () => void;
        onRetryPermission?: (() => void) | undefined;
        participants?: PreJoinRosterEntry[] | undefined;
        readyState?: import("./HangoutPreJoinShell").PreJoinReadyState | undefined;
        readyLoading?: boolean | undefined;
        effectsSlot?: import("react").ReactNode;
        onJoin: (intent: {
            audio: boolean;
            video: boolean;
        }) => void;
        onCancel: () => void;
        joinLabel?: string | undefined;
        joinDisabled?: boolean | undefined;
        subtitleOverride?: string | undefined;
        className?: string | undefined;
        'data-testid'?: string | undefined;
    }>) => import("react").JSX.Element)[];
    args: {
        channelName: string;
        previewStream: null;
        onToggleAudio: () => void;
        onToggleVideo: () => void;
        onJoin: () => void;
        onCancel: () => void;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** Permission still being requested — spinner over the preview, toggles
 *  disabled, Join reads "Allow camera to join". */
export declare const AwaitingPermission: Story;
/** Granted, camera off. With `localIdentity` set you get the Meet/Teams
 *  identity tile instead of the bare "Camera off" text. */
export declare const CameraOffWithIdentity: Story;
/** Same state without `localIdentity` — the legacy text fallback, kept so
 *  existing consumers are unaffected. */
export declare const CameraOffLegacyFallback: Story;
/** Permission denied — the shell swaps the preview for PermissionDeniedCard
 *  and keeps Join disabled. `onRetryPermission` adds the retry action. */
export declare const PermissionDenied: Story;
/** No camera attached at all — a different fallback from "denied". */
export declare const NoDevice: Story;
/** First one in: the roster is empty and the subtitle says so. */
export declare const EmptyRoom: Story;
/** Others are publishing but still mid-handshake — an amber note explains you
 *  can join anyway. */
export declare const OthersStillConnecting: Story;
/** Fully wired pre-flight: the toggles drive the intent object handed to
 *  `onJoin`, which is how a consumer spawns the publisher already muted. */
export declare const Interactive: Story;
//# sourceMappingURL=HangoutPreJoinShell.stories.d.ts.map
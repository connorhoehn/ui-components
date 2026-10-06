import { type ReactNode } from 'react';
import { type DeviceOption, type MediaPermission } from './DeviceToggleSelect';
export type HuddleBarPhase = 'idle' | 'live' | 'connecting' | 'ringing' | 'reconnecting' | 'ended';
/** One media control: the toggle, and an optional device list behind a caret. */
export interface HuddleBarMedia {
    on: boolean;
    onToggle: () => void;
    permission?: MediaPermission;
    /** With a list (and `onSelectDevice`) the toggle gets its device caret; without, it is a bare icon toggle. */
    devices?: DeviceOption[];
    selectedDeviceId?: string;
    onSelectDevice?: (deviceId: string) => void;
    /** 0..1 input level (microphone). */
    level?: number;
    disabledReason?: string;
}
export interface HuddleBarProps {
    /** The call's name: the place or person it is with. */
    name: string;
    /**
     * Default `live`. `idle` is the pre-call bar: `name` is the page's context,
     * the bar draws `onStart` and the chat button (and no timer, counts, media
     * or Leave). Since 2.416.0.
     */
    phase?: HuddleBarPhase;
    /**
     * Visible wording for the current phase ("Calling Mira…", "Reconnecting…").
     * Default: "Connecting…", "Ringing…", "Reconnecting…" or "Ended" for a phase
     * that is not `live`; nothing while live. Pass `null` to draw none. Since 2.413.0.
     */
    statusLabel?: string | null;
    /** Epoch ms the call went live. Draws a ticking timer while `live`. */
    startedAt?: number | null;
    /** People in the call now. */
    participantCount?: number;
    /** Invitees still ringing, counted apart from `participantCount`. */
    ringingCount?: number;
    mic?: HuddleBarMedia;
    camera?: HuddleBarMedia;
    /** The share-page control (a host's "Share page" button, or a menu). Drawn after the media toggles. */
    shareSlot?: ReactNode;
    /** The chat toggle. Absent: no chat button. */
    onToggleChat?: () => void;
    chatOpen?: boolean;
    /** Unread chat count on the toggle. */
    chatUnread?: number;
    /** Toggles the call's media panel (tiles, roster). Absent: no button. Since 2.413.0. */
    onToggleMedia?: () => void;
    mediaOpen?: boolean;
    /** Accessible name and tooltip of the media toggle. Default "Participants". */
    mediaToggleLabel?: string;
    /** Idle only: the Huddle action that starts the page's call. Absent: no start button. Since 2.416.0. */
    onStart?: () => void;
    /** Idle only: label of the start button. Default "Huddle". */
    startLabel?: string;
    /** Idle only: disables the start button and is its tooltip. */
    startDisabledReason?: string;
    /** Wording of the chat button (the icon alone below the bar's `@lg` width). Default "Chat". Since 2.416.0. */
    chatLabel?: string;
    /** Disables the chat button and is its tooltip. Since 2.416.0. */
    chatDisabledReason?: string;
    /** Not drawn while `idle`. */
    onLeave?: () => void;
    /** Default "Leave". */
    leaveLabel?: string;
    /** Extra controls before Leave. */
    extras?: ReactNode;
    className?: string;
    'data-testid'?: string;
}
export declare function HuddleBar({ name, phase, statusLabel, startedAt, participantCount, ringingCount, mic, camera, shareSlot, onToggleChat, chatOpen, chatUnread, onToggleMedia, mediaOpen, mediaToggleLabel, onStart, startLabel, startDisabledReason, chatLabel, chatDisabledReason, onLeave, leaveLabel, extras, className, 'data-testid': testId, }: HuddleBarProps): import("react").JSX.Element;
export default HuddleBar;
//# sourceMappingURL=HuddleBar.d.ts.map
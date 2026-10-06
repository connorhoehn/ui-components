import { type RefObject } from 'react';
import { type DeviceToggleSelectProps } from './DeviceToggleSelect';
export interface IncomingCallPopoverProps {
    open: boolean;
    anchorRef: RefObject<HTMLElement | null>;
    compact?: boolean;
    caller: {
        name: string;
        avatarUrl?: string;
        color?: string;
    };
    title: string;
    documents: {
        id: string;
        title: string;
    }[];
    /** Opens a document without answering. */
    onOpenDocument: (id: string) => void;
    participants: {
        id: string;
        name: string;
        avatarUrl?: string;
    }[];
    participantCount: number;
    mic: Omit<DeviceToggleSelectProps, 'kind'>;
    camera: Omit<DeviceToggleSelectProps, 'kind'>;
    onOpenSettings: () => void;
    /** Already in a call: the primary action reads "Switch". */
    busy?: boolean;
    onJoin: () => void;
    onSwitch?: () => void;
    /** Not now, the ×, and an outside click. */
    onDecline: () => void;
    /** Close without answering (the invite keeps ringing elsewhere until it expires). */
    onDismiss: () => void;
    /**
     * Where focus lands when the popover opens. `join` (default, 2.395.0):
     * the primary "Join call" (or "Switch"), so Enter answers and the × carries
     * no focus ring (mockups 05/05b). `close`: the ×, the first control.
     */
    initialFocus?: 'join' | 'close';
    /** Pulse the phone while ringing. Default true. */
    ringing?: boolean;
    className?: string;
    'data-testid'?: string;
}
export declare function IncomingCallPopover({ open, anchorRef, compact, caller, title, documents, onOpenDocument, participants, participantCount, mic, camera, onOpenSettings, busy, onJoin, onSwitch, onDecline, onDismiss, ringing, initialFocus, className, 'data-testid': testId, }: IncomingCallPopoverProps): import("react").JSX.Element;
export default IncomingCallPopover;
//# sourceMappingURL=IncomingCallPopover.d.ts.map
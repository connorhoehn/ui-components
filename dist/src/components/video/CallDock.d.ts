import { type ReactNode } from 'react';
import { type DeviceToggleSelectProps } from './DeviceToggleSelect';
import type { HangoutLayoutParticipant } from './HangoutLayoutTypes';
export interface CallDockParticipant extends HangoutLayoutParticipant {
    userId: string;
    cameraOn: boolean;
    audioOn: boolean;
    screenSharing: boolean;
    presenting: boolean;
    connection: 'connected' | 'reconnecting';
    /**
     * An audio sink independent of the camera (an `<audio autoPlay>` on the
     * person's stream). Optional: with camera off the dock keeps `videoElement`
     * mounted but invisible anyway, so the audio that rides that stream plays.
     */
    audioElement?: ReactNode;
}
/**
 * `calling` is the caller's side of a ring before anyone answers: the call
 * exists but nobody else is in it, so the meta names who is being called
 * instead of "1 person · 00:33".
 */
export type CallDockPhase = 'calling' | 'connecting' | 'active' | 'reconnecting' | 'ended' | 'error';
export interface CallDockProps {
    title: string;
    participantCount: number;
    /** Elapsed call time; null before the call has a start time. */
    elapsedMs: number | null;
    phase: CallDockPhase;
    /** `phase: 'calling'`: who is being rung — the meta reads "Calling <name>…" (else "Calling…"). */
    callingTo?: string;
    /** The review documents; omit (or pass []) with no `onOpenDocuments` for a call without documents. */
    documents?: {
        id: string;
        title: string;
        presenting?: boolean;
    }[];
    /** Everyone in the call, the viewer included (matched by `localParticipantId`). */
    participants: CallDockParticipant[];
    localParticipantId: string;
    activeSpeakerId?: string | null;
    /** The person being followed — their tile gets the accent ring. */
    followingUserId?: string | null;
    mic: Omit<DeviceToggleSelectProps, 'kind'>;
    camera: Omit<DeviceToggleSelectProps, 'kind'>;
    screenShare: {
        on: boolean;
        disabledReason?: string;
        onToggle: () => void;
    };
    onOpenPeople: () => void;
    /** Omitted → no Documents button (a conversation call). */
    onOpenDocuments?: () => void;
    peopleOpen?: boolean;
    documentsOpen?: boolean;
    onOpenSettings: () => void;
    /** Host controls rendered in the controls row, before the settings gear. */
    extras?: ReactNode;
    onPopOut: () => void;
    onLeave: () => void;
    /** The host with others present: Leave asks "Leave the call? Others stay on." with End for everyone. */
    canEndForEveryone?: boolean;
    onEndForEveryone?: () => void;
    onTileClick?: (userId: string) => void;
    onTitleClick?: () => void;
    onDocumentClick?: (id: string) => void;
    /** Ended: the line after "Call ended · 12:04 · ". */
    endedSummary?: ReactNode;
    /**
     * The error banner. `title` replaces the default "Lost the call — <message>"
     * (a join that never connected reads "Couldn't join the call — …"), and
     * `retryLabel` replaces "Rejoin" ("Try again" for that same case).
     */
    error?: {
        message: string;
        onRetry: () => void;
        title?: string;
        retryLabel?: string;
    };
    onDismiss?: () => void;
    /** 132 × 74 tiles (a 1280 × 720 window) instead of 176 × 88 (the mockup's 166 × 84 at its 1.054 scale). */
    compact?: boolean;
    className?: string;
    'data-testid'?: string;
}
/** "09:41", or "1:02:03" past an hour. */
export declare function formatCallElapsed(ms: number): string;
export declare function CallDock({ title, participantCount, elapsedMs, phase, callingTo, documents, participants, localParticipantId, activeSpeakerId, followingUserId, mic, camera, screenShare, onOpenPeople, onOpenDocuments, peopleOpen, documentsOpen, onOpenSettings, extras, onPopOut, onLeave, canEndForEveryone, onEndForEveryone, onTileClick, onTitleClick, onDocumentClick, endedSummary, error, onDismiss, compact, className, 'data-testid': testId, }: CallDockProps): import("react").JSX.Element;
export default CallDock;
//# sourceMappingURL=CallDock.d.ts.map
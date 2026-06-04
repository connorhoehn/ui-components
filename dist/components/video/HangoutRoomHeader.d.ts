import type { ReactNode } from 'react';
export type HangoutPhase = 'idle' | 'joining' | 'joined' | 'reconnecting' | 'ended' | 'failed';
export interface HangoutRoomHeaderRecording {
    /** Whether recording is armed for this room. When false, no pill is rendered. */
    armed: boolean;
    /** Whether the recording is actively writing (someone is publishing). */
    active: boolean;
}
export interface HangoutRoomHeaderProps {
    channelName: string;
    subtitle?: ReactNode;
    recording?: HangoutRoomHeaderRecording;
    elapsedLabel?: string;
    phase?: HangoutPhase;
    actions?: ReactNode;
    className?: string;
    'data-testid'?: string;
}
export declare function HangoutRoomHeader({ channelName, subtitle, recording, elapsedLabel, phase, actions, className, 'data-testid': testId, }: HangoutRoomHeaderProps): import("react/jsx-runtime").JSX.Element;
export default HangoutRoomHeader;
//# sourceMappingURL=HangoutRoomHeader.d.ts.map
import type { ReactNode } from 'react';
import { type RecordingChipState } from './RecordingChip';
export type HangoutPhase = 'idle' | 'joining' | 'joined' | 'reconnecting' | 'ended' | 'failed';
/** Same two states as RecordingChip; kept as a named alias for existing consumers. */
export type HangoutRoomHeaderRecording = RecordingChipState;
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
export declare function HangoutRoomHeader({ channelName, subtitle, recording, elapsedLabel, phase, actions, className, 'data-testid': testId, }: HangoutRoomHeaderProps): import("react").JSX.Element;
export default HangoutRoomHeader;
//# sourceMappingURL=HangoutRoomHeader.d.ts.map
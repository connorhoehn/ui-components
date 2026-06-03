import type { ReactNode } from 'react';
import type { RMUseVideoHangoutReturn } from './types';
import type { HangoutMode } from '../../components/video/HangoutLayout';
export interface WrappedHangoutLayoutProps {
    /** Return value of useVideoHangout(channel) from realtime-modules */
    hangout: RMUseVideoHangoutReturn;
    /** The local user's clientId (used to separate local vs remote tiles) */
    localClientId?: string | null;
    /** Keyed by participant clientId — caller wires actual <video> elements */
    videoElements?: Record<string, ReactNode>;
    /** Forwarded to HangoutLayout */
    mode?: HangoutMode;
    spotlightContent?: ReactNode;
    activeSpeakerId?: string | null;
    speakerHysteresisMs?: number;
    onParticipantClick?: (id: string) => void;
    className?: string;
}
export declare function WrappedHangoutLayout({ hangout, localClientId, videoElements, mode, spotlightContent, activeSpeakerId, speakerHysteresisMs, onParticipantClick, className, }: WrappedHangoutLayoutProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=WrappedHangoutLayout.d.ts.map
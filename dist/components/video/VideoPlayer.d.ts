import { type CSSProperties } from 'react';
export type PlayerPhase = 'idle' | 'connecting' | 'buffering' | 'playing' | 'error';
export interface VideoPlayerProps {
    src?: string;
    /**
     * MediaStream source for WebRTC playback (WHEP, RTCPeerConnection.ontrack,
     * getUserMedia, etc.). When set, attached to the underlying <video>'s
     * `srcObject`. Takes precedence over `src` if both are supplied. Pass
     * `null` to clear.
     */
    stream?: MediaStream | null;
    autoPlay?: boolean;
    muted?: boolean;
    loop?: boolean;
    controls?: boolean;
    poster?: string;
    phase?: PlayerPhase;
    className?: string;
    style?: CSSProperties;
    onPhaseChange?: (phase: PlayerPhase) => void;
    onTimeUpdate?: (currentTime: number, duration: number) => void;
}
export declare function VideoPlayer({ src, stream, autoPlay, muted, loop, controls, poster, phase: controlledPhase, className, style, onPhaseChange, onTimeUpdate, }: VideoPlayerProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=VideoPlayer.d.ts.map
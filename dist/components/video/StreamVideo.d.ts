import { type MutableRefObject } from 'react';
export type StreamVideoPlayState = 'playing' | 'paused-by-autoplay' | 'ended';
export interface StreamVideoProps {
    stream: MediaStream;
    muted?: boolean;
    /** Optional external ref. Lets callers reach the underlying <video>
     *  for OS-level Picture-in-Picture. */
    videoRef?: MutableRefObject<HTMLVideoElement | null>;
    /** Tailwind class overrides. Defaults to `h-full w-full object-cover`. */
    className?: string;
    /** Notifies on playback state transitions. Fires `paused-by-autoplay`
     *  when the browser rejects autoplay with `NotAllowedError`. */
    onPlayStateChange?: (state: StreamVideoPlayState) => void;
}
export declare function StreamVideo({ stream, muted, videoRef, className, onPlayStateChange, }: StreamVideoProps): import("react").JSX.Element;
//# sourceMappingURL=StreamVideo.d.ts.map
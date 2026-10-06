export interface AudioPlayerProps {
    src: string;
    autoPlay?: boolean;
    /** Fires once, the first time playback starts — "mark as listened". */
    onFirstPlay?: () => void;
    onEnded?: () => void;
    /** Length to show before metadata arrives, in seconds. */
    durationHint?: number;
    /** `sm` fits a table row. */
    size?: 'sm' | 'md';
    className?: string;
    'data-testid'?: string;
}
export declare function formatAudioTime(seconds: number): string;
export declare function AudioPlayer({ src, autoPlay, onFirstPlay, onEnded, durationHint, size, className, 'data-testid': testId }: AudioPlayerProps): import("react").JSX.Element;
export default AudioPlayer;
//# sourceMappingURL=AudioPlayer.d.ts.map
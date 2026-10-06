export interface AudioLevelMeterProps {
    /** 0..1. Values outside the range are clamped. */
    level: number;
    /** Number of segments. Default 10. */
    segments?: number;
    /** Accessible name. Default `Input level`. */
    label?: string;
    /** Dim every segment (microphone off or blocked). */
    disabled?: boolean;
    className?: string;
    'data-testid'?: string;
}
export declare function AudioLevelMeter({ level, segments, label, disabled, className, 'data-testid': testId, }: AudioLevelMeterProps): import("react").JSX.Element;
export default AudioLevelMeter;
//# sourceMappingURL=AudioLevelMeter.d.ts.map
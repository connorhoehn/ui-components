export interface RecordingChipState {
    /** Recording is on for this call — it will record, or is recording. */
    armed: boolean;
    /** Bytes are being written right now. Implies armed. */
    active: boolean;
}
export interface RecordingChipProps extends RecordingChipState {
    /** Overrides the default hover copy for each state. */
    titles?: Partial<Record<'armed' | 'active', string>>;
    className?: string;
    'data-testid'?: string;
}
export declare const RECORDING_CHIP_TITLES: {
    readonly active: 'Recording — saved to /recordings when the call ends';
    readonly armed: 'Recording armed — will start once the call is under way';
};
export declare function RecordingChip({ armed, active, titles, className, 'data-testid': testId, }: RecordingChipProps): import("react").JSX.Element | null;
export default RecordingChip;
//# sourceMappingURL=RecordingChip.d.ts.map
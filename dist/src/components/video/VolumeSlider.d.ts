export interface VolumeSliderProps {
    /** 0..1. */
    value: number;
    onChange: (value: number) => void;
    /** When set, a "Test sound" button follows the slider. */
    onTest?: () => void;
    /** Label of the test button. Default `Test sound`. */
    testLabel?: string;
    /** Disables the test button (a test is already playing). */
    testing?: boolean;
    muted?: boolean;
    disabled?: boolean;
    className?: string;
    'data-testid'?: string;
    /** Test id of the test button. Default `settings-test-sound`. */
    testButtonTestId?: string;
}
export declare function VolumeSlider({ value, onChange, onTest, testLabel, testing, muted, disabled, className, 'data-testid': testId, testButtonTestId, }: VolumeSliderProps): import("react").JSX.Element;
export default VolumeSlider;
//# sourceMappingURL=VolumeSlider.d.ts.map
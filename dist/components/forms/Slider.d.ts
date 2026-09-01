export interface SliderProps {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    /** Accessible name. Required when no visible label is wired up. */
    'aria-label'?: string;
    /**
     * Show the current value beside the track. Pass a formatter to control how
     * it reads (units, decimal places); `true` uses the raw number.
     * @default true
     */
    readout?: boolean | ((value: number) => string);
    disabled?: boolean;
    className?: string;
    'data-testid'?: string;
}
export declare const Slider: import("react").ForwardRefExoticComponent<SliderProps & import("react").RefAttributes<HTMLInputElement>>;
export default Slider;
//# sourceMappingURL=Slider.d.ts.map
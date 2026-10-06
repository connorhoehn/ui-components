export interface RangeSliderProps {
    value: readonly [number, number];
    min: number;
    max: number;
    step?: number;
    minDistance?: number;
    labels: readonly [string, string];
    formatValue?: (value: number) => string;
    onChange: (value: [number, number]) => void;
    className?: string;
}
/** Two native keyboard-operable handles on one track, with stable tab order. */
export declare function RangeSlider({ value, min, max, step, minDistance, labels, formatValue, onChange, className }: RangeSliderProps): import("react").JSX.Element;
//# sourceMappingURL=RangeSlider.d.ts.map
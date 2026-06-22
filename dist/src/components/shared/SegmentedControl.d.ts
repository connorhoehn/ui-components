import { ReactNode } from 'react';
export interface SegmentOption {
    label: string;
    value: string;
    icon?: ReactNode;
}
export interface SegmentedControlProps {
    options: SegmentOption[];
    value: string;
    onChange: (value: string) => void;
    size?: 'sm' | 'md';
    className?: string;
}
export declare function SegmentedControl({ options, value, onChange, size, className, }: SegmentedControlProps): import("react").JSX.Element;
export default SegmentedControl;
//# sourceMappingURL=SegmentedControl.d.ts.map
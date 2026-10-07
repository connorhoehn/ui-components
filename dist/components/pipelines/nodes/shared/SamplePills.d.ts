export interface SamplePillsProps {
    /** Suggestions to offer. Renders nothing when empty. */
    samples: readonly string[];
    onSelect: (value: string) => void;
    /** Accessible name for the group, e.g. "Upstream image refs". */
    'aria-label'?: string;
    className?: string;
}
export default function SamplePills({ samples, onSelect, 'aria-label': ariaLabel, className, }: SamplePillsProps): import("react").JSX.Element | null;
//# sourceMappingURL=SamplePills.d.ts.map
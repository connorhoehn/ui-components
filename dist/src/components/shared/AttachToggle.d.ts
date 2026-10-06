export interface AttachToggleProps {
    attached: boolean;
    onToggle: () => void;
    labels?: {
        add: string;
        added: string;
    };
    size?: 'sm' | 'md';
    /** Names the thing, e.g. "Add Release plan to the prompt". */
    'aria-label'?: string;
    /** -1 inside a roving list, where only the current row's controls are tab stops. */
    tabIndex?: number;
    className?: string;
    'data-testid'?: string;
}
export declare function AttachToggle({ attached, onToggle, labels, size, tabIndex, className, 'aria-label': ariaLabel, 'data-testid': testId, }: AttachToggleProps): import("react").JSX.Element;
export default AttachToggle;
//# sourceMappingURL=AttachToggle.d.ts.map
export interface EditableHeadingProps {
    value: string;
    /** Called with the trimmed new value. Not called when it is empty or unchanged. */
    onCommit: (next: string) => void;
    /** Shown while editing an empty input. */
    placeholder?: string;
    /** `md` = 16px (drawer title), `lg` = 20px. Default `md`. */
    size?: 'md' | 'lg';
    /** Render as plain text with no pencil (someone who may not rename it). */
    readOnly?: boolean;
    /** Accessible name of the pencil button. Default `Rename`. */
    editLabel?: string;
    className?: string;
    'data-testid'?: string;
}
export declare function EditableHeading({ value, onCommit, placeholder, size, readOnly, editLabel, className, 'data-testid': testId, }: EditableHeadingProps): import("react").JSX.Element;
export default EditableHeading;
//# sourceMappingURL=EditableHeading.d.ts.map
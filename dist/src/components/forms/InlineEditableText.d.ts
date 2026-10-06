import { type InputSize } from './Input';
export interface InlineEditableTextProps {
    value: string;
    /** Called once per edit, with the committed value (trimmed). */
    onCommit: (value: string) => void;
    /** Accessible name, used as the edit button's and the input's label. */
    label: string;
    /** Shown in place of an empty value, and in the empty input. */
    placeholder?: string;
    maxLength?: number;
    /** An empty value is refused (the old one comes back). Default false. */
    required?: boolean;
    disabled?: boolean;
    size?: InputSize;
    /** `'title'` reads as a heading; `'muted'` as secondary text. */
    tone?: 'title' | 'muted';
    /**
     * While editing, size the input to its value (`field-sizing: content`)
     * instead of the Input's full width, so whatever sits after it on the row
     * — a status pill — stays beside the words rather than being pushed to the
     * row's end. The display state already sizes to its text.
     */
    fitContent?: boolean;
    className?: string;
    'data-testid'?: string;
}
export declare function InlineEditableText({ value, onCommit, label, placeholder, maxLength, required, disabled, size, tone, fitContent, className, 'data-testid': testId, }: InlineEditableTextProps): import("react").JSX.Element;
export default InlineEditableText;
//# sourceMappingURL=InlineEditableText.d.ts.map
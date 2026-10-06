export interface SpeakerNotesProps {
    value: string | undefined;
    /** `undefined` when the box is emptied. */
    onChange: (notes: string | undefined) => void;
    readOnly?: boolean;
    /** Default `MAX_NOTES_CHARS` (2000), the generator's cap. */
    maxLength?: number;
    placeholder?: string;
    className?: string;
    /** Test id of the textarea. Default `speaker-notes`; the pane is `<id>-pane`. */
    'data-testid'?: string;
}
export declare function SpeakerNotes({ value, onChange, readOnly, maxLength, placeholder, className, 'data-testid': testId, }: SpeakerNotesProps): import("react").JSX.Element;
export default SpeakerNotes;
//# sourceMappingURL=SpeakerNotes.d.ts.map
export interface TagEditorProps {
    /** Accessible name for the draft-tag box; defaults to the placeholder text. */
    'aria-label'?: string;
    value: string[];
    onChange: (tags: string[]) => void;
    placeholder?: string;
    suggestions?: string[];
    /**
     * Lowercase tags before insertion. Defaults to true to preserve historical
     * behavior. Set false when you need case-sensitive identifiers (e.g. Cedar
     * action names like `ViewSalary`).
     */
    lowercase?: boolean;
}
export default function TagEditor({ 'aria-label': ariaLabel, value, onChange, placeholder, suggestions, lowercase, }: TagEditorProps): import("react").JSX.Element;
//# sourceMappingURL=TagEditor.d.ts.map
export interface CodeEditorProps {
    value: string;
    onChange: (next: string) => void;
    /** Hint for future syntax highlighting. Phase 1: purely cosmetic / no-op. */
    language?: 'jsonpath' | 'javascript' | 'template' | 'plain';
    placeholder?: string;
    /** Minimum visible lines. Default 4. */
    minLines?: number;
    /** Maximum visible lines before the editor starts scrolling. Default 20. */
    maxLines?: number;
    readOnly?: boolean;
    /** Available context variables — rendered as clickable insert pills. */
    variables?: string[];
    'aria-label'?: string;
}
export default function CodeEditor({ value, onChange, language: _language, // Phase 1: accepted but not applied yet
placeholder, minLines, maxLines, readOnly, variables, 'aria-label': ariaLabel, }: CodeEditorProps): import("react").JSX.Element;
//# sourceMappingURL=CodeEditor.d.ts.map
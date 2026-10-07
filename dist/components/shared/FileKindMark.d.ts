export type FileKind = 'page' | 'presentation' | 'recording' | 'transcript' | 'diagram' | 'folder' | 'agent' | 'experiment' | 'call' | 'conversation' | 'media' | 'workflow';
/** `outline` (since 2.386.5): the glyph alone, in the kind's colour, no box fill — an editor's title mark. */
export type FileKindMarkVariant = 'tinted' | 'plain' | 'glyph' | 'outline' | 'app';
export type FileKindMarkSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export interface FileKindMarkProps {
    kind: FileKind;
    /** `sm` 18px (tree rows), `md` 22px (default), `lg` 28px, `xl` 32px, `2xl` 40px (an editor head, beside the title and its save line). */
    size?: FileKindMarkSize;
    /** Accessible name. Omit when the file's name is already beside the mark. */
    label?: string;
    /**
     * `tinted` (default) is the glyph in a coloured box, one colour per kind.
     * `plain` is the glyph alone, secondary ink, same box size — for a list row
     * whose title is the thing to read.
     * `glyph` (2.386.0) is the file-tree mark: no box, a glyph that fills it
     * (18px at `sm`), neutral ink for pages and folders, and the two kinds a
     * reader scans for drawn in colour — a deck as a three-colour bar chart, a
     * diagram as two linked nodes in the brand colour. A selected tree row
     * turns the neutral ink to its own text colour (`currentColor`).
     */
    variant?: FileKindMarkVariant;
    className?: string;
    'data-testid'?: string;
}
/** What each kind is called, for a caller building a "Page · Sprint planning" line. */
export declare const FILE_KIND_LABELS: Record<FileKind, string>;
export declare function FileKindMark({ kind, size, variant, label, className, 'data-testid': testId }: FileKindMarkProps): import("react").JSX.Element;
export default FileKindMark;
//# sourceMappingURL=FileKindMark.d.ts.map
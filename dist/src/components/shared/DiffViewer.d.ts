import { type ReactNode } from 'react';
export interface DiffAnnotation {
    /** Path as it appears in the diff (new side). */
    file: string;
    /** New-side line number. Omit for a file-level note. */
    line?: number;
    severity?: 'critical' | 'warning' | 'info';
    note: string;
    /** Who said it — a reviewer model, a person. */
    author?: string;
}
export interface DiffViewerProps {
    /** Unified diff — real `git diff` output. */
    diff: string;
    annotations?: readonly DiffAnnotation[];
    /** Start with every file collapsed (big changes). Default false. */
    defaultCollapsed?: boolean;
    /** Hard cap on rendered lines per file, beyond which the file truncates. */
    maxLinesPerFile?: number;
    /** Note rendered when the caller knows the diff itself was truncated upstream. */
    truncatedNote?: ReactNode;
    className?: string;
    'data-testid'?: string;
}
export interface DiffLine {
    kind: 'add' | 'del' | 'ctx' | 'hunk';
    text: string;
    oldNo: number | null;
    newNo: number | null;
}
export interface DiffFile {
    path: string;
    oldPath: string | null;
    status: 'added' | 'deleted' | 'renamed' | 'modified';
    adds: number;
    dels: number;
    lines: DiffLine[];
    binary: boolean;
}
/** Parse unified git diff output. Exported for tests and for hosts that need
 *  the file list without rendering. */
export declare function parseUnifiedDiff(diff: string): DiffFile[];
export declare function DiffViewer({ diff, annotations, defaultCollapsed, maxLinesPerFile, truncatedNote, className, 'data-testid': testId, }: DiffViewerProps): import("react").JSX.Element;
export default DiffViewer;
//# sourceMappingURL=DiffViewer.d.ts.map
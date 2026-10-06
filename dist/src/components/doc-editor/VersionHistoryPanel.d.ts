import type { VersionEntry, SnapshotSection } from '../../hooks/useVersionHistory';
interface VersionHistoryPanelProps {
    versions: VersionEntry[];
    loading: boolean;
    previewTimestamp: number | null;
    onFetch: () => void;
    onPreview: (timestamp: number) => void;
    onClearPreview: () => void;
    onClose: () => void;
    /** Save a named version. */
    onSaveVersion?: (name: string) => void;
    /** Trigger comparison for a version timestamp. */
    onCompare?: (timestamp: number) => void;
    /** Dismiss the diff view. */
    onClearCompare: () => void;
    /** Sections from the compared historical version (null when no compare active). */
    compareSections: SnapshotSection[] | null;
    /** Currently compared timestamp. */
    compareTimestamp: number | null;
    /** Current document sections for diff. */
    currentSections: SnapshotSection[];
    /** Restore to a historical version. */
    onRestore?: (timestamp: number) => void;
    /**
     * Inline, filling the box it is placed in — a document editor's Versions tab
     * inside `EditorShell` — instead of sliding in over the page from the right
     * edge of the window.
     */
    docked?: boolean;
}
export default function VersionHistoryPanel({ versions, loading, previewTimestamp, onFetch: _onFetch, onPreview, onClearPreview, onClose, onSaveVersion, onCompare, onClearCompare, compareSections, compareTimestamp, currentSections, onRestore, docked, }: VersionHistoryPanelProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=VersionHistoryPanel.d.ts.map
import type { SnapshotSection } from '../../hooks/useVersionHistory';
interface DiffViewerProps {
    /** Sections from the historical (older) version. */
    oldSections: SnapshotSection[];
    /** Sections from the current (newer) version. */
    newSections: SnapshotSection[];
    /** Called when the user dismisses the diff view. */
    onClose: () => void;
}
export default function DiffViewer({ oldSections, newSections, onClose }: DiffViewerProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=DiffViewer.d.ts.map
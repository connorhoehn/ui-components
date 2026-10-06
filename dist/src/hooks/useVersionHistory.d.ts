import * as Y from 'yjs';
import type { GatewayMessage } from '../types/gateway';
export interface VersionEntry {
    timestamp: number;
    age: number;
    name?: string;
    author?: string;
    type?: 'manual' | 'auto' | 'pre-restore';
}
/** Plain-object snapshot of a section for diffing (no Y.js references). */
export interface SnapshotSection {
    id: string;
    type: string;
    title: string;
    /** Plain text extracted from the section's rich-text content. */
    textContent: string;
    items: Array<{
        id: string;
        text: string;
        status: string;
        assignee: string;
        priority: string;
    }>;
}
export interface UseVersionHistoryOptions {
    channel: string;
    sendMessage: (msg: Record<string, unknown>) => void;
    onMessage: (handler: (msg: GatewayMessage) => void) => () => void;
}
export interface UseVersionHistoryReturn {
    versions: VersionEntry[];
    loading: boolean;
    fetchVersions: () => void;
    previewVersion: (timestamp: number) => void;
    restoreVersion: (timestamp: number) => void;
    previewDoc: Y.Doc | null;
    previewTimestamp: number | null;
    clearPreview: () => void;
    /** Save a named version snapshot. */
    saveVersion: (name: string) => void;
    /** Extract sections as plain JSON from a Y.Doc (live or preview). */
    extractSections: (doc: Y.Doc) => SnapshotSection[];
    /** Compare sections: load preview for a given timestamp, returns sections via callback. */
    compareSections: SnapshotSection[] | null;
    compareTimestamp: number | null;
    compareVersion: (timestamp: number) => void;
    clearCompare: () => void;
}
export declare function useVersionHistory(options: UseVersionHistoryOptions): UseVersionHistoryReturn;
//# sourceMappingURL=useVersionHistory.d.ts.map
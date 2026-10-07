import type { ViewMode, Section } from '../../types/document';
import type { Doc as YDoc } from 'yjs';
import type { UseVersionHistoryReturn } from '../../hooks/useVersionHistory';
import type { MyItem } from '../../hooks/useMyMentionsAndTasks';
import type { VideoSession } from '../../hooks/useVideoSessions';
export interface EditorSidebarManagerProps {
    showHistory: boolean;
    showMyItems: boolean;
    showVideoHistory: boolean;
    closePanel: () => void;
    versionHistory: UseVersionHistoryReturn;
    ydoc: YDoc | null;
    myItems: MyItem[];
    /**
     * Jump to an item in the document.
     *
     * `commentId` is not optional decoration — it is the ONLY landmark a canvas
     * has. A page-shaped document files its comments under an empty section id
     * (they are anchored to a text range instead), so a handler that reads only
     * the section id is inert on every page document.
     */
    onNavigateToSection: (sectionId: string, commentId?: string) => void;
    videoSessions: {
        sessions: VideoSession[];
        loading: boolean;
        fetchSessions: () => void;
    };
    showTOC: boolean;
    /**
     * True when the document is page-shaped (`meta.schemaVersion >= 2`).
     *
     * The TOC links to `#section-<id>` anchors that only the section renderers
     * emit. On a canvas those elements do not exist — the headings carry no ids
     * at all — so the panel was a list of dead links, and on a CONVERTED document
     * it listed the frozen pre-conversion headings, which is worse than empty.
     * `DocumentOutline` + `useDocumentOutline` are the canvas equivalent.
     */
    isCanvas?: boolean;
    commentSidebarOpen: boolean;
    sections: Section[];
    focusedSectionId: string | null;
    mode: ViewMode;
}
export default function EditorSidebarManager({ showHistory, showMyItems, showVideoHistory, closePanel, versionHistory, ydoc, myItems, onNavigateToSection, videoSessions, showTOC, isCanvas, commentSidebarOpen, sections, focusedSectionId, mode, }: EditorSidebarManagerProps): import("react").JSX.Element;
//# sourceMappingURL=EditorSidebarManager.d.ts.map
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
    onNavigateToSection: (sectionId: string) => void;
    videoSessions: {
        sessions: VideoSession[];
        loading: boolean;
        fetchSessions: () => void;
    };
    showTOC: boolean;
    commentSidebarOpen: boolean;
    sections: Section[];
    focusedSectionId: string | null;
    mode: ViewMode;
}
export default function EditorSidebarManager({ showHistory, showMyItems, showVideoHistory, closePanel, versionHistory, ydoc, myItems, onNavigateToSection, videoSessions, showTOC, commentSidebarOpen, sections, focusedSectionId, mode, }: EditorSidebarManagerProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=EditorSidebarManager.d.ts.map
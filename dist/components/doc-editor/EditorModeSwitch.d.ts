import type { RefObject } from 'react';
import type { ViewMode, Participant, Section, CommentThread, SectionReview } from '../../types/document';
import type { TaskItem } from '../../types/document';
import type { Doc as YDoc, XmlFragment } from 'yjs';
import type { CollaborationProvider } from './TiptapEditor';
export interface EditorModeSwitchProps {
    mode: ViewMode;
    isEmpty: boolean;
    isFinalized: boolean;
    sections: Section[];
    documentId: string;
    displayName: string;
    color: string;
    userId: string;
    ydoc: YDoc | null;
    provider: CollaborationProvider | null;
    getSectionFragment: (sectionId: string) => XmlFragment | null;
    updateSection: (sectionId: string, patch: Partial<Section>) => void;
    participants: Participant[];
    focusedSectionId: string | null;
    onSectionFocus: (sectionId: string) => void;
    comments: Record<string, CommentThread[]>;
    onAddComment: (sectionId: string, text: string, parentCommentId?: string | null) => void;
    onResolveThread: (sectionId: string, commentId: string) => void;
    onUnresolveThread: (sectionId: string, commentId: string) => void;
    onUpdateCursorInfo?: (name: string, color: string) => void;
    onOpenComments: (sectionId: string) => void;
    onAddItem: (sectionId: string, item: Omit<TaskItem, 'id'>) => void;
    onUpdateItem: (sectionId: string, itemId: string, patch: Partial<TaskItem>) => void;
    onRemoveItem: (sectionId: string, itemId: string) => void;
    restItems: Record<string, TaskItem[]>;
    /**
     * Per-section item-load failures from `useDocumentItems`, keyed by sectionId.
     * A section listed here failed to fetch its action items, which is NOT the
     * same as having none — without this the two render identically and the
     * reader is told "no items" for content that exists on the server.
     */
    itemErrors?: Record<string, string>;
    commentSidebarOpen: boolean;
    commentSectionId: string | null;
    commentSidebarTop: number;
    sectionListRef: RefObject<HTMLDivElement | null>;
    onCloseComments: () => void;
    showVideoCall: boolean;
    isVideoDocked?: boolean;
    showInlineVideo: boolean;
    sidebarFixed: boolean;
    videoSpacerRef: RefObject<HTMLDivElement | null>;
    videoLeft: number;
    FIXED_TOP: number;
    showTOC: boolean;
    sectionReviews: Record<string, SectionReview[]>;
    reviewSection: (sectionId: string, status: string, comment?: string) => void;
    headerMeta: import('../../types/document').DocumentMeta;
    onLoadDemo: () => void;
    activityPublish: (eventType: string, detail: Record<string, unknown>) => void;
}
export default function EditorModeSwitch({ mode, isEmpty, isFinalized, sections, documentId, displayName, color, userId, ydoc, provider, getSectionFragment, updateSection, participants, focusedSectionId, onSectionFocus, comments, onAddComment, onResolveThread, onUnresolveThread, onUpdateCursorInfo, onOpenComments, onAddItem, onUpdateItem, onRemoveItem, restItems, itemErrors, commentSidebarOpen, commentSectionId, commentSidebarTop, sectionListRef, onCloseComments, showVideoCall, isVideoDocked, showInlineVideo, sidebarFixed, videoSpacerRef, videoLeft, FIXED_TOP, showTOC, sectionReviews, reviewSection, headerMeta, onLoadDemo, activityPublish, }: EditorModeSwitchProps): import("react").JSX.Element;
//# sourceMappingURL=EditorModeSwitch.d.ts.map
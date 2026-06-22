import { XmlFragment } from 'yjs';
import { Section, TaskItem, Participant, CommentThread, ViewMode } from '../types/document';
import { CollaborationProvider } from '../components/doc-editor/TiptapEditor';
import type * as Y from 'yjs';
export interface SectionRendererProps {
    section: Section;
    viewMode: ViewMode;
    editable: boolean;
    fragment?: XmlFragment | null;
    ydoc?: Y.Doc | null;
    provider?: CollaborationProvider | null;
    user?: {
        name: string;
        color: string;
    };
    onUpdateSection?: (patch: Partial<Section>) => void;
    onAddItem?: (item: Omit<TaskItem, 'id'>) => void;
    onUpdateItem?: (itemId: string, patch: Partial<TaskItem>) => void;
    onRemoveItem?: (itemId: string) => void;
    participants?: Participant[];
    onUpdateCursorInfo?: (name: string, color: string) => void;
    comments?: CommentThread[];
    commentCount?: number;
    onOpenComments?: (sectionId: string) => void;
    onNavigateToEditor?: (sectionId: string) => void;
}
export type SectionRenderer = React.ComponentType<SectionRendererProps>;
//# sourceMappingURL=types.d.ts.map
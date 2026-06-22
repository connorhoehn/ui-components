import { XmlFragment } from 'yjs';
import { Section, Participant, DocumentMeta, CommentThread } from '../../types/document';
import { CollaborationProvider } from './TiptapEditor';
import * as Y from 'yjs';
interface ReaderModeProps {
    sections: Section[];
    participants: Participant[];
    meta: DocumentMeta;
    commentCounts?: Record<string, number>;
    /** Plain-text content extracted from each section's Y.XmlFragment */
    sectionContentTexts?: Record<string, string>;
    /** Threaded comments per section */
    comments?: Record<string, CommentThread[]>;
    /** Y.js fragment getter for rich-text rendering */
    getSectionFragment?: (sectionId: string) => XmlFragment | null;
    /** Y.Doc instance for collaboration */
    ydoc?: Y.Doc | null;
    /** Collaboration provider for awareness */
    provider?: CollaborationProvider | null;
}
export default function ReaderMode({ sections, participants, meta, commentCounts, sectionContentTexts, comments, getSectionFragment, ydoc, provider, }: ReaderModeProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=ReaderMode.d.ts.map
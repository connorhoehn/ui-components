import { XmlFragment } from 'yjs';
import { DocumentMeta, Section, TaskItem } from '../../types/document';
import { CollaborationProvider } from './TiptapEditor';
import * as Y from 'yjs';
export declare function generateSummaryBullets(allItems: TaskItem[], sections: Section[]): string[];
export declare function HeaderBanner({ meta, participantCount, }: {
    meta: DocumentMeta;
    participantCount: number;
}): import("react").JSX.Element;
export declare function ExecutiveSummaryCard({ bullets, contentText, fragment, ydoc, provider, }: {
    bullets: string[];
    contentText?: string;
    fragment?: XmlFragment | null;
    ydoc?: Y.Doc | null;
    provider?: CollaborationProvider | null;
}): import("react").JSX.Element;
//# sourceMappingURL=ReaderSummary.d.ts.map
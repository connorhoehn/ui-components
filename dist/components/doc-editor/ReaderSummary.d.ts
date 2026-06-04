import type { XmlFragment } from 'yjs';
import * as Y from 'yjs';
import type { DocumentMeta, Section, TaskItem } from '../../types/document';
import type { CollaborationProvider } from './TiptapEditor';
export declare function generateSummaryBullets(allItems: TaskItem[], sections: Section[]): string[];
export declare function HeaderBanner({ meta, participantCount, }: {
    meta: DocumentMeta;
    participantCount: number;
}): import("react/jsx-runtime").JSX.Element;
export declare function ExecutiveSummaryCard({ bullets, contentText, fragment, ydoc, provider, }: {
    bullets: string[];
    contentText?: string;
    fragment?: XmlFragment | null;
    ydoc?: Y.Doc | null;
    provider?: CollaborationProvider | null;
}): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ReaderSummary.d.ts.map
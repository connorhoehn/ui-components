import type { MyItem } from '../../hooks/useMyMentionsAndTasks';
interface MyMentionsPanelProps {
    items: MyItem[];
    /**
     * Jump to the item in the document.
     *
     * `commentId` is not optional decoration — it is the ONLY landmark a canvas
     * has. A page-shaped document renders no `#section-<id>` elements and files
     * its comments under an EMPTY section id (they are anchored to a text range
     * instead), so passing the section id alone meant every row here was inert on
     * every page document: the row highlighted on hover and the click did
     * nothing, with no error. See `./canvas/scrollToDocumentTarget`, which
     * resolves whichever landmark the document in front of it actually has.
     */
    onNavigateToSection: (sectionId: string, commentId?: string) => void;
    onClose: () => void;
}
export default function MyMentionsPanel({ items, onNavigateToSection, onClose, }: MyMentionsPanelProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=MyMentionsPanel.d.ts.map
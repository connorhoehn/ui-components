interface Section {
    id: string;
    title: string;
}
interface TableOfContentsProps {
    sections: Section[];
    focusedSectionId: string | null;
}
/**
 * @deprecated Part of the legacy SECTIONED document editor, which is deprecated
 * (2026-09-22). New documents are pages — use `DocumentOutline` (the page outline); decks use
 * `PresentationView`, whiteboards the diagram surface. Kept so existing
 * sectioned documents still open until they are converted to a page.
 */
export default function TableOfContents({ sections, focusedSectionId }: TableOfContentsProps): import("react").JSX.Element | null;
export {};
//# sourceMappingURL=TableOfContents.d.ts.map
interface Section {
    id: string;
    title: string;
}
interface TableOfContentsProps {
    sections: Section[];
    focusedSectionId: string | null;
}
export default function TableOfContents({ sections, focusedSectionId }: TableOfContentsProps): import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=TableOfContents.d.ts.map
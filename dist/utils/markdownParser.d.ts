import type { Section, TaskItem, DocumentMeta } from '../types/document';
export interface ParsedDocument {
    meta: Partial<DocumentMeta>;
    sections: ParsedSection[];
}
export interface ParsedSection {
    id: string;
    type: Section['type'];
    title: string;
    contentMarkdown: string;
    items: TaskItem[];
}
/**
 * Infer the section type from its title and body content.
 */
export declare function inferSectionType(title: string, content: string): Section['type'];
/**
 * Parse a full markdown string into a structured ParsedDocument.
 *
 * Rules:
 * 1. `# ` at the start of the document is the document title.
 * 2. Each `## ` heading starts a new section.
 * 3. Checkbox lines (`- [ ]` / `- [x]`) become TaskItem entries.
 * 4. If no `##` headings exist the entire text is one 'summary' section.
 */
export declare function parseMarkdownToSections(markdown: string): ParsedDocument;
//# sourceMappingURL=markdownParser.d.ts.map
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
/**
 * Convert markdown into the inner XML of a canvas body fragment.
 *
 * ## Node names are camelCase here, deliberately
 *
 * This is the WRITE side. ProseMirror's schema names the nodes `bulletList`,
 * `taskList`, `codeBlock`, and a Y.XmlElement keeps whatever name it is
 * constructed with — so the body has to be built with the camelCase spellings
 * or the editor's binding will not recognise the nodes.
 *
 * The READ side is the opposite: `Y.XmlFragment.toString()` lowercases every
 * name, so `canvasBodyToMarkdown` in `documentExport.ts` matches
 * `<bulletlist>`. The asymmetry is real and both halves are load-bearing;
 * making either side agree with the other breaks it.
 */
export declare function parseMarkdownToCanvasXml(markdown: string): string;
//# sourceMappingURL=markdownParser.d.ts.map
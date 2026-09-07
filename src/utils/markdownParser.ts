// frontend/src/utils/markdownParser.ts
//
// Zero-dependency markdown parser that converts AI-generated markdown
// into structured document sections. Uses simple regex splitting
// rather than a full AST library for speed and bundle size.

import type { Section, TaskItem, DocumentMeta } from '../types/document';

/** Generate a simple unique ID (no external dependency). */
function uid(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

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

// ---------------------------------------------------------------------------
// Heading regex: match lines starting with ## (section) or # (title).
// We split on ## but capture # as the document title.
// ---------------------------------------------------------------------------

const TASK_LINE = /^- \[([ xX])\]\s+(.+)$/;

/**
 * Infer the section type from its title and body content.
 */
export function inferSectionType(
  title: string,
  content: string,
): Section['type'] {
  const lower = title.toLowerCase();
  if (TASK_LINE.test(content) || /- \[[ xX]\]/.test(content)) return 'tasks';
  if (lower.includes('decision')) return 'decisions';
  if (lower.includes('summary')) return 'summary';
  return 'notes';
}

/**
 * Parse a block of markdown lines and extract TaskItem entries from checkbox
 * lines. Returns the items and the remaining (non-checkbox) content.
 */
function extractTasks(body: string): { items: TaskItem[]; remaining: string } {
  const lines = body.split('\n');
  const items: TaskItem[] = [];
  const rest: string[] = [];

  for (const line of lines) {
    const match = line.match(TASK_LINE);
    if (match) {
      const checked = match[1].toLowerCase() === 'x';
      items.push({
        id: uid(),
        text: match[2].trim(),
        status: checked ? 'done' : 'pending',
        assignee: '',
        ackedBy: '',
        ackedAt: '',
        priority: 'medium',
        notes: '',
      });
    } else {
      rest.push(line);
    }
  }

  return {
    items,
    remaining: rest.join('\n').trim(),
  };
}

/**
 * Parse a full markdown string into a structured ParsedDocument.
 *
 * Rules:
 * 1. `# ` at the start of the document is the document title.
 * 2. Each `## ` heading starts a new section.
 * 3. Checkbox lines (`- [ ]` / `- [x]`) become TaskItem entries.
 * 4. If no `##` headings exist the entire text is one 'summary' section.
 */
export function parseMarkdownToSections(markdown: string): ParsedDocument {
  const meta: Partial<DocumentMeta> = {};
  const sections: ParsedSection[] = [];

  // Normalise line endings
  const text = markdown.replace(/\r\n/g, '\n');

  // Extract document title (first # heading)
  const titleMatch = text.match(/^# (.+)$/m);
  if (titleMatch) {
    meta.title = titleMatch[1].trim();
  }

  // Split on ## headings. We use a regex that keeps the delimiter.
  // The split produces: [preamble, heading1, body1, heading2, body2, ...]
  const parts = text.split(/^## /m);

  // If there is only one part (no ## headings), treat entire doc as summary.
  if (parts.length <= 1) {
    // Remove the title line if present
    const body = text.replace(/^# .+\n*/m, '').trim();
    if (body.length > 0) {
      const { items, remaining } = extractTasks(body);
      sections.push({
        id: uid(),
        type: 'summary',
        title: meta.title ?? 'Untitled',
        contentMarkdown: remaining,
        items,
      });
    }
    return { meta, sections };
  }

  // parts[0] is preamble (before first ##), parts[1..] each start with heading text
  for (let i = 1; i < parts.length; i++) {
    const chunk = parts[i];
    // First line of chunk is the heading text (rest of the line after ##)
    const newlineIdx = chunk.indexOf('\n');
    const title =
      newlineIdx === -1 ? chunk.trim() : chunk.slice(0, newlineIdx).trim();
    const body = newlineIdx === -1 ? '' : chunk.slice(newlineIdx + 1).trim();

    const { items, remaining } = extractTasks(body);
    const sectionType = inferSectionType(title, body);

    sections.push({
      id: uid(),
      type: sectionType,
      title,
      contentMarkdown: remaining,
      items,
    });
  }

  return { meta, sections };
}

// ---------------------------------------------------------------------------
// Canvas (page-shaped) parsing
// ---------------------------------------------------------------------------
//
// `parseMarkdownToSections` produces the LEGACY shape. Writing its output into
// a page-shaped document puts sections into `ydoc.getArray('sections')` — the
// root that a canvas keeps frozen and never renders. The write succeeds, the
// CRDT update goes out, and nothing appears on screen: "Load demo" (and every
// AI-generated-document path built on it) looks like a dead button.
//
// A canvas has one continuous body, so markdown destined for it has to become
// block XML, not sections.

/** Escape text for embedding in the XML the fixture/Y.Xml parsers read. */
function xmlEscape(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

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
export function parseMarkdownToCanvasXml(markdown: string): string {
  const text = markdown.replace(/\r\n/g, '\n');
  const lines = text.split('\n');
  const out: string[] = [];

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === '') {
      i++;
      continue;
    }

    // Fenced code block
    if (/^```/.test(line.trim())) {
      const body: string[] = [];
      i++;
      while (i < lines.length && !/^```/.test(lines[i].trim())) {
        body.push(lines[i]);
        i++;
      }
      i++; // consume the closing fence
      out.push(`<codeBlock>${xmlEscape(body.join('\n'))}</codeBlock>`);
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      out.push(
        `<heading level="${heading[1].length}">${xmlEscape(heading[2].trim())}</heading>`,
      );
      i++;
      continue;
    }

    if (/^(---|\*\*\*|___)\s*$/.test(line.trim())) {
      out.push('<horizontalRule></horizontalRule>');
      i++;
      continue;
    }

    if (/^>\s?/.test(line)) {
      const quoted: string[] = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        quoted.push(lines[i].replace(/^>\s?/, ''));
        i++;
      }
      out.push(`<blockquote><paragraph>${xmlEscape(quoted.join(' ').trim())}</paragraph></blockquote>`);
      continue;
    }

    // Task list — checked BEFORE the bullet list, since `- [ ] x` also matches
    // the plain bullet pattern and would otherwise lose its checkbox.
    if (TASK_LINE.test(line.trim())) {
      const items: string[] = [];
      while (i < lines.length && TASK_LINE.test(lines[i].trim())) {
        const m = lines[i].trim().match(TASK_LINE)!;
        const checked = m[1].toLowerCase() === 'x';
        items.push(
          `<taskItem checked="${checked}"><paragraph>${xmlEscape(m[2].trim())}</paragraph></taskItem>`,
        );
        i++;
      }
      out.push(`<taskList>${items.join('')}</taskList>`);
      continue;
    }

    if (/^\s*[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (
        i < lines.length &&
        /^\s*[-*]\s+/.test(lines[i]) &&
        !TASK_LINE.test(lines[i].trim())
      ) {
        items.push(
          `<listItem><paragraph>${xmlEscape(lines[i].replace(/^\s*[-*]\s+/, '').trim())}</paragraph></listItem>`,
        );
        i++;
      }
      out.push(`<bulletList>${items.join('')}</bulletList>`);
      continue;
    }

    if (/^\s*\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        items.push(
          `<listItem><paragraph>${xmlEscape(lines[i].replace(/^\s*\d+\.\s+/, '').trim())}</paragraph></listItem>`,
        );
        i++;
      }
      out.push(`<orderedList>${items.join('')}</orderedList>`);
      continue;
    }

    // Everything else is a paragraph, joined until the next blank line.
    const para: string[] = [];
    while (i < lines.length && lines[i].trim() !== '' && !isBlockStart(lines[i])) {
      para.push(lines[i].trim());
      i++;
    }
    if (para.length > 0) {
      out.push(`<paragraph>${xmlEscape(para.join(' '))}</paragraph>`);
    } else {
      // Defensive: `isBlockStart` was true on the first line of the run, which
      // every branch above should already have consumed. Advance rather than
      // spin forever.
      i++;
    }
  }

  return out.join('');
}

/** Does this line open a block that is not a paragraph? */
function isBlockStart(line: string): boolean {
  return (
    /^#{1,6}\s+/.test(line) ||
    /^```/.test(line.trim()) ||
    /^>\s?/.test(line) ||
    /^\s*[-*]\s+/.test(line) ||
    /^\s*\d+\.\s+/.test(line) ||
    /^(---|\*\*\*|___)\s*$/.test(line.trim())
  );
}

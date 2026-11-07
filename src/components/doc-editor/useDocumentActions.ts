// frontend/src/components/doc-editor/useDocumentActions.ts
//
// Custom hook encapsulating demo loading, document clear, and export logic.
// Extracted from DocumentEditorPage to reduce that file's responsibilities.

import { useState, useCallback } from 'react';
import type { UseWebSocketReturn } from '../../hooks/useWebSocket';
import type { XmlFragment } from 'yjs';
import type { CommentThread } from '../../types/document';
import { parseMarkdownToSections } from '../../utils/markdownParser';
import { exportToMarkdown } from '../../utils/documentExport';
import { DEMO_MARKDOWN } from '../../utils/demoDocument';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Extract plain text from a Y.XmlFragment.
 */
function xmlFragmentToText(frag: { toString(): string }): string {
  const xml = frag.toString();
  return xml
    .replace(/<\/?(paragraph|heading|blockquote|codeBlock|bulletList|orderedList|listItem|taskList|taskItem|horizontalRule|hardBreak|doc)[^>]*>/g, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/**
 * The canvas body, as markdown.
 *
 * A page-shaped document keeps its content in ONE XmlFragment, not in
 * `sections` — so an export built from `data.sections` produced a file with a
 * title and nothing under it. Silently: you get a download, it opens, and your
 * document is not in it.
 *
 * Structure is read from the node names rather than stripped out, because
 * "Export Markdown" that flattens every heading and list into loose lines is
 * only half an answer.
 */
export function canvasFragmentToMarkdown(frag: { toString(): string } | null | undefined): string {
  const xml = frag?.toString()?.trim();
  if (!xml) return '';
  if (typeof DOMParser === 'undefined') return '';

  const parsed = new DOMParser().parseFromString(`<doc>${xml}</doc>`, 'text/xml');
  if (parsed.querySelector('parsererror')) return '';

  const textOf = (el: Element) => (el.textContent ?? '').replace(/\s+/g, ' ').trim();

  // Node names arrive LOWERCASED. `Y.XmlFragment.toString()` calls
  // `nodeName.toLocaleLowerCase()` on every element (yjs YXmlElement.toString),
  // so the fragment that holds `bulletList` serialises as `<bulletlist>`. A
  // switch on the ProseMirror camelCase spellings therefore matched `heading`
  // and `paragraph` — which are already lowercase — and silently fell through
  // to the default for every list, task list, code block and rule, flattening
  // them into loose lines. Same failure mode as the shape bug itself: plausible
  // output, quietly wrong, nothing red.
  const named = (el: Element) => el.nodeName.toLowerCase();

  const block = (el: Element, depth: number): string[] => {
    const name = named(el);
    const indent = '  '.repeat(depth);
    switch (name) {
      case 'heading': {
        const level = Number(el.getAttribute('level') ?? '1');
        return [`${'#'.repeat(Math.min(Math.max(level, 1), 6))} ${textOf(el)}`];
      }
      case 'paragraph':
        return textOf(el) ? [textOf(el)] : [];
      case 'blockquote':
        return [`> ${textOf(el)}`];
      case 'codeblock':
        return ['```', el.textContent ?? '', '```'];
      case 'horizontalrule':
        return ['---'];
      case 'bulletlist':
      case 'orderedlist':
      case 'tasklist': {
        const out: string[] = [];
        let n = 1;
        for (const li of Array.from(el.children)) {
          const marker =
            named(li) === 'taskitem'
              ? (li.getAttribute('checked') === 'true' ? '- [x] ' : '- [ ] ')
              : name === 'orderedlist'
                ? `${n++}. `
                : '- ';
          out.push(`${indent}${marker}${textOf(li)}`);
          // Nested lists hang off the item, so they are walked, not flattened.
          for (const child of Array.from(li.children)) {
            if (named(child).endsWith('list')) out.push(...block(child, depth + 1));
          }
        }
        return out;
      }
      // A diagram is a picture; markdown has nowhere to put it, and dropping
      // it silently would misrepresent the document's length.
      case 'macro':
        return [`_[${el.getAttribute('data-macro') ?? 'macro'}]_`];
      default:
        return textOf(el) ? [textOf(el)] : [];
    }
  };

  const root = parsed.documentElement;
  const lines: string[] = [];
  for (const el of Array.from(root.children)) lines.push(...block(el, 0), '');
  return lines.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

/**
 * Minimal markdown-to-HTML converter for PDF export.
 */
const PRINT_CSS = `
  body { font-family: system-ui, sans-serif; max-width: 800px; margin: 40px auto; padding: 0 20px; color: #1e293b; line-height: 1.6; }
  h1 { font-size: 24px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; }
  h2 { font-size: 18px; margin-top: 24px; }
  h3 { font-size: 14px; color: #64748b; }
  ul { padding-left: 20px; }
  li { margin: 4px 0; }
  blockquote { border-left: 3px solid #e2e8f0; margin: 8px 0; padding: 4px 12px; color: #64748b; }
  code { background: #f1f5f9; padding: 2px 4px; border-radius: 3px; font-size: 13px; }
  @media print { body { margin: 0; } }
`;

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function simpleMarkdownToHtml(rawMd: string): string {
  // Escaped first: the print window is same-origin, so raw markup would run.
  const md = escapeHtml(rawMd);
  return md
    .split('\n')
    .map(line => {
      if (line.startsWith('### ')) return `<h3>${line.slice(4)}</h3>`;
      if (line.startsWith('## ')) return `<h2>${line.slice(3)}</h2>`;
      if (line.startsWith('# ')) return `<h1>${line.slice(2)}</h1>`;
      if (line.startsWith('&gt; ')) return `<blockquote>${line.slice(5)}</blockquote>`;
      if (line.startsWith('- [x] ')) return `<li>&#9745; ${line.slice(6)}</li>`;
      if (line.startsWith('- [ ] ')) return `<li>&#9744; ${line.slice(6)}</li>`;
      if (line.startsWith('- ')) return `<li>${line.slice(2)}</li>`;
      if (line.trim() === '') return '<br/>';
      return `<p>${line}</p>`;
    })
    .join('\n')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Write the export out, in whichever of the three formats was asked for.
 *
 * Both shapes converge here — they differ only in how the markdown was
 * produced, and keeping one writer is what stops the canvas branch from quietly
 * growing its own (differently broken) copy of the PDF path.
 */
function writeExport(
  format: 'markdown' | 'pdf' | 'json',
  title: string | undefined,
  markdown: string,
  json: unknown,
) {
  const name = title || 'document';

  if (format === 'json') {
    const blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' });
    downloadBlob(blob, `${name}.json`);
    return;
  }

  if (format === 'markdown') {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    downloadBlob(blob, `${name}.md`);
    return;
  }

  const printWindow = window.open('', '_blank');
  if (!printWindow) return;
  printWindow.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>${escapeHtml(title || 'Document')}</title></head><body>${simpleMarkdownToHtml(markdown)}</body></html>`);
  // Styled through a constructed stylesheet (CSSOM), not a <style> element or
  // style attribute, so a strict style-src CSP on the opener does not block it.
  try {
    const sheet = new (printWindow as unknown as { CSSStyleSheet: typeof CSSStyleSheet }).CSSStyleSheet();
    sheet.replaceSync(PRINT_CSS);
    printWindow.document.adoptedStyleSheets = [sheet];
  } catch {
    /* unstyled print is still readable */
  }
  printWindow.document.close();
  printWindow.print();
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

interface UseDocumentActionsArgs {
  documentId: string;
  userId: string;
  ws: UseWebSocketReturn;
  updateMeta: (meta: import('../../types/document').DocumentMeta) => void;
  addSection: (section: import('../../types/document').Section) => void;
  exportJSON: () => { meta: import('../../types/document').DocumentMeta; sections: import('../../types/document').Section[] } | null;
  getSectionFragment: (sectionId: string) => XmlFragment | null;
  /** The canvas body fragment, for page-shaped documents. Null on legacy ones. */
  getCanvasFragment?: () => XmlFragment | null;
  /**
   * Whether this document is page-shaped (`meta.schemaVersion >= 2`).
   *
   * Do NOT infer this as `sections.length === 0`. That inference is WRONG on
   * exactly the documents that matter most: converting a document does not
   * clear the legacy roots — realtime-modules says so in as many words,
   * "ydoc.getArray('sections') ← kept, frozen, never read at version >= 2" — so
   * every CONVERTED document still has a full section array. The inference says
   * "legacy", and Export writes out the pre-conversion content. You get a file,
   * it opens, and everything typed on the page since the conversion is missing
   * from it, with no error and no empty file to tip you off.
   *
   * The gate is the schema version and nothing else. `useIsCanvasDocument` in
   * `./canvas/documentShape` computes it.
   */
  isCanvas?: boolean;
  comments: Record<string, CommentThread[]>;
}

export function useDocumentActions({
  documentId,
  userId,
  ws,
  updateMeta,
  addSection,
  exportJSON,
  getSectionFragment,
  getCanvasFragment,
  isCanvas = false,
  comments,
}: UseDocumentActionsArgs) {
  const [demoLoaded, setDemoLoaded] = useState(false);

  const handleLoadDemo = useCallback(() => {
    const parsed = parseMarkdownToSections(DEMO_MARKDOWN);

    updateMeta({
      id: documentId,
      title: parsed.meta.title || 'Untitled',
      sourceType: 'notes',
      sourceId: '',
      createdBy: userId,
      createdAt: new Date().toISOString(),
      aiModel: '',
      status: 'draft',
    });

    for (const section of parsed.sections) {
      addSection({
        id: section.id,
        type: section.type,
        title: section.title,
        collapsed: false,
        items: section.items,
      });
    }

    setDemoLoaded(true);
  }, [documentId, userId, updateMeta, addSection]);

  const handleClearDocument = useCallback(() => {
    ws.sendMessage({
      service: 'crdt',
      action: 'clearDocument',
      channel: `doc:${documentId}`,
    });
    setDemoLoaded(false);
  }, [ws, documentId]);

  const handleExport = useCallback((format: 'markdown' | 'pdf' | 'json') => {
    const data = exportJSON();
    if (!data) return;

    // A page-shaped document keeps its whole body in ONE fragment. Its
    // `sections` array may still be full — conversion freezes it rather than
    // clearing it — but nothing renders it and nothing may export it, so the
    // canvas branch REPLACES the section list rather than adding to it.
    if (isCanvas) {
      const canvasMarkdown = canvasFragmentToMarkdown(getCanvasFragment?.() ?? null);
      // Frozen legacy sections are not this document. Shipping them under
      // `sections` in a JSON export presents pre-conversion content as the
      // current document, which is the same lie the markdown export was told.
      data.sections = [];
      (data as unknown as { body: string }).body = canvasMarkdown;
      // Comments on a canvas are anchored to text ranges, so they are filed
      // under an empty section id rather than per section.
      const anchored = Object.values(comments).flat();
      if (anchored.length > 0) {
        (data as unknown as { comments: CommentThread[] }).comments = anchored;
      }
      writeExport(
        format,
        data.meta.title,
        canvasMarkdown
          ? `# ${data.meta.title || 'Document'}\n\n${canvasMarkdown}\n`
          : `# ${data.meta.title || 'Document'}\n`,
        data,
      );
      return;
    }

    // Enrich sections with rich-text content and comments
    for (const section of data.sections) {
      const frag = getSectionFragment(section.id);
      if (frag) {
        (section as any).contentText = xmlFragmentToText(frag);
      }
      const sectionComments = comments[section.id];
      if (sectionComments && sectionComments.length > 0) {
        (section as any).comments = sectionComments;
      }
    }

    writeExport(format, data.meta.title, exportToMarkdown(data), data);
  }, [exportJSON, getSectionFragment, getCanvasFragment, isCanvas, comments]);

  return {
    demoLoaded,
    handleLoadDemo,
    handleClearDocument,
    handleExport,
  };
}

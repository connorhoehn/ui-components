// Export a document to markdown / plain text — on BOTH shapes.
//
// A document in this library is one of two things:
//
//   legacy / "section-shaped"  `ydoc.getArray('sections')`, one Y.XmlFragment
//                              per section, no `meta.schemaVersion`
//   canvas / "page-shaped"     ONE Y.XmlFragment at `body`, and
//                              `meta.schemaVersion >= 2`
//
// This file used to know only the first one. `for (const section of
// doc.sections)` does not FAIL on a page-shaped document — it loops zero times,
// so Export produced a file containing the title and nothing else. You get a
// download, it opens, and your document is not in it. Nothing red anywhere.
//
// ## `sections.length === 0` is NOT the gate — it is backwards
//
// Converting a legacy document to a canvas does not clear the legacy roots.
// realtime-modules says so in as many words:
//
//     ydoc.getArray('sections')   ← kept, frozen, never read at version >= 2
//
// So a CONVERTED document has a FULL `sections` array AND a canvas body. An
// emptiness check reads that as "legacy" and exports the pre-conversion
// content: a real file, that opens, missing everything written since the
// conversion. That is strictly worse than the empty export it replaced,
// because it looks right.
//
// The schema version is the gate. `isCanvasDocument` in
// `components/doc-editor/canvas/documentShape` is the one implementation of it
// and this file delegates to it rather than growing a second.
//
// See `__tests__/documentExport.shapes.test.ts`, which applies the old
// emptiness gate to the converted fixture and asserts the bug comes back — so
// the rest of the cases are proven to discriminate rather than passing by
// accident.

import type { Doc as YDoc } from 'yjs';
import type { DocumentData, Section, TaskItem, CommentThread } from '../types/document';
import {
  CANVAS_SCHEMA_VERSION,
  canvasBody,
  isCanvasDocument,
} from '../components/doc-editor/canvas/documentShape';

// `documentShape` imports only `react` and `yjs` types, so this direction
// (utils → that module) introduces no cycle; the reverse — importing the
// serializer out of `doc-editor/useDocumentActions`, which imports this file —
// would.

// ---------------------------------------------------------------------------
// The shape of the thing being exported
// ---------------------------------------------------------------------------

/**
 * What a caller can hand these functions beyond the plain JSON.
 *
 * A caller that has the live Y.Doc should pass it: that is the only source
 * that cannot be stale. `bodyMarkdown` exists for callers that have already
 * rendered the body (the editor does, to reuse it for the PDF branch) and for
 * server-side callers that never had a Y.Doc at all.
 */
export interface ExportSource {
  /** The live document. Authoritative: its `meta.schemaVersion` decides. */
  ydoc?: YDoc | null;
  /** Pre-rendered canvas body markdown, when the caller already has it. */
  bodyMarkdown?: string | null;
}

/**
 * `DocumentData` as it actually comes off a page-shaped document.
 *
 * `body` is the canvas content and `comments` are the threads anchored to text
 * ranges rather than to sections — neither has a home in the legacy
 * `DocumentData`, which predates the canvas. Declared here rather than widening
 * `types/document.ts` so nothing outside export has to care.
 */
export interface ExportableDocument extends DocumentData {
  /** Canvas body, as markdown. Present ⇒ page-shaped ⇒ `sections` is not the document. */
  body?: string;
  /** Canvas comments: anchored to text, so filed flat instead of per section. */
  comments?: CommentThread[];
}

/**
 * The schema version carried on an exported `meta` object.
 *
 * The Y `meta` map is copied key-for-key into `DocumentData.meta` (see
 * `useDocumentExport`), so a converted document's JSON DOES carry
 * `schemaVersion` even though `DocumentMeta` never declared the field. That
 * makes a JSON-only export self-describing, which is the difference between a
 * server-side render being right and being confidently wrong.
 *
 * This is the meta-object counterpart of `readSchemaVersion`, not a second
 * gate: the threshold constant is imported, and whenever a Y.Doc is available
 * `isCanvasDocument` decides instead.
 */
function metaSchemaVersion(doc: Pick<DocumentData, 'meta'>): number {
  const raw = (doc.meta as unknown as Record<string, unknown> | undefined)?.['schemaVersion'];
  return typeof raw === 'number' ? raw : 0;
}

/**
 * Is this a page, rather than a stack of sections?
 *
 * Note what is NOT consulted: `doc.sections.length`. On a converted document
 * that array is full and frozen, and reading it is how export shipped
 * pre-conversion content.
 */
export function isPageShapedExport(
  doc: Pick<DocumentData, 'meta'>,
  source?: ExportSource,
): boolean {
  if (source?.ydoc) return isCanvasDocument(source.ydoc);
  if (source?.bodyMarkdown != null) return true;
  if (typeof (doc as ExportableDocument).body === 'string') return true;
  return metaSchemaVersion(doc) >= CANVAS_SCHEMA_VERSION;
}

// ---------------------------------------------------------------------------
// Canvas body → markdown
// ---------------------------------------------------------------------------

/** Blocks whose tags are stripped to whitespace when flattening to plain text. */
const BLOCK_TAGS =
  /<\/?(paragraph|heading|blockquote|codeblock|bulletlist|orderedlist|listitem|tasklist|taskitem|horizontalrule|hardbreak|macro|doc)[^>]*>/gi;

/**
 * A body fragment as plain text: structure removed, words kept.
 */
export function canvasBodyToPlainText(
  frag: { toString(): string } | null | undefined,
): string {
  const xml = frag?.toString();
  if (!xml) return '';
  return xml
    .replace(BLOCK_TAGS, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/**
 * A body fragment as markdown, with its structure intact.
 *
 * ## yjs LOWERCASES every node name
 *
 * `Y.XmlFragment.toString()` walks its children calling
 * `nodeName.toLocaleLowerCase()` (yjs `YXmlElement.toString`). So the fragment
 * that holds a ProseMirror `bulletList` serialises as `<bulletlist>`, `codeBlock`
 * as `<codeblock>`, `taskItem` as `<taskitem>`.
 *
 * A serializer that switches on the camelCase ProseMirror spellings therefore
 * appears to work: `heading` and `paragraph` are already lowercase and match.
 * Everything else — every list, task list, code block and horizontal rule —
 * falls through to the default branch and comes out as loose text. The export
 * is plausible, complete-looking, and has quietly lost every list in the
 * document. Both this repo and realtime-modules shipped that bug.
 *
 * Hence: names are lowercased on read, and every `case` below is written
 * lowercase. Do not "fix" them back to camelCase.
 */
export function canvasBodyToMarkdown(
  frag: { toString(): string } | null | undefined,
): string {
  const xml = frag?.toString()?.trim();
  if (!xml) return '';
  // Node/SSR has no DOMParser. Falling back to the plain-text flattening keeps
  // the words rather than returning an empty document.
  if (typeof DOMParser === 'undefined') return canvasBodyToPlainText(frag);

  const parsed = new DOMParser().parseFromString(`<doc>${xml}</doc>`, 'text/xml');
  if (parsed.querySelector('parsererror')) return canvasBodyToPlainText(frag);

  const textOf = (el: Element) => (el.textContent ?? '').replace(/\s+/g, ' ').trim();
  const named = (el: Element) => el.nodeName.toLowerCase();

  const block = (el: Element, depth: number): string[] => {
    const name = named(el);
    const indent = '  '.repeat(depth);
    switch (name) {
      case 'heading': {
        const level = Number(el.getAttribute('level') ?? '1');
        return [`${'#'.repeat(Math.min(Math.max(level || 1, 1), 6))} ${textOf(el)}`];
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
              ? li.getAttribute('checked') === 'true'
                ? '- [x] '
                : '- [ ] '
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
      // A diagram is a picture; markdown has nowhere to put it, and dropping it
      // silently would misrepresent the document's length.
      case 'macro':
        return [`_[${el.getAttribute('data-macro') ?? 'macro'}]_`];
      default:
        return textOf(el) ? [textOf(el)] : [];
    }
  };

  const lines: string[] = [];
  for (const el of Array.from(parsed.documentElement.children)) {
    lines.push(...block(el, 0), '');
  }
  return lines.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

/**
 * The canvas body markdown for an export, from whichever source the caller has.
 *
 * Returns `''` — not null — when there is a page but it is empty, so callers
 * can tell "this document has no body" from "this document is not a page"
 * using `isPageShapedExport` instead of overloading a falsy string.
 */
function resolveBodyMarkdown(doc: ExportableDocument, source?: ExportSource): string {
  if (source?.bodyMarkdown != null) return source.bodyMarkdown;
  if (source?.ydoc) {
    const frag = canvasBody(source.ydoc);
    if (frag) return canvasBodyToMarkdown(frag);
  }
  if (typeof doc.body === 'string') return doc.body;
  return '';
}

// ---------------------------------------------------------------------------
// Markdown export
// ---------------------------------------------------------------------------

function taskToMarkdown(item: TaskItem): string {
  const checked = item.status === 'done' || item.status === 'acked';
  return `- [${checked ? 'x' : ' '}] ${item.text}`;
}

function commentToMarkdown(thread: CommentThread, depth: number = 0): string {
  const indent = '  '.repeat(depth);
  const lines: string[] = [];
  lines.push(`${indent}> **${thread.displayName}**: ${thread.text}`);
  for (const reply of thread.replies ?? []) {
    lines.push(commentToMarkdown(reply, depth + 1));
  }
  return lines.join('\n');
}

function sectionToMarkdown(section: Section): string {
  const lines: string[] = [`## ${section.title}`, ''];

  // Section body content (stored on the Section or via contentMarkdown/contentText cast)
  const content =
    ((section as unknown as Record<string, unknown>)['contentMarkdown'] as string | undefined) ??
    ((section as unknown as Record<string, unknown>)['contentText'] as string | undefined);
  if (content) {
    lines.push(content, '');
  }

  const items = Array.isArray(section.items) ? section.items : [];
  if (items.length > 0) {
    for (const item of items) {
      lines.push(taskToMarkdown(item));
    }
    lines.push('');
  }

  // Comments
  const sectionComments = (section as unknown as Record<string, unknown>)['comments'] as CommentThread[] | undefined;
  if (sectionComments && sectionComments.length > 0) {
    lines.push(`### Comments (${sectionComments.length})`, '');
    for (const thread of sectionComments) {
      lines.push(commentToMarkdown(thread));
    }
    lines.push('');
  }

  return lines.join('\n');
}

/**
 * Convert a full document to a markdown string.
 *
 * Pass `source.ydoc` whenever you have it. Without it this falls back to what
 * the JSON itself says (`body`, or `meta.schemaVersion`), which is correct but
 * only as fresh as the snapshot.
 */
export function exportToMarkdown(doc: DocumentData, source?: ExportSource): string {
  const data = doc as ExportableDocument;
  const parts: string[] = [`# ${data.meta?.title ?? 'Document'}`, ''];

  if (isPageShapedExport(data, source)) {
    // REPLACES the section list, never appends to it. On a converted document
    // both roots are populated and only one of them is the document; emitting
    // both would present pre-conversion content as current.
    const body = resolveBodyMarkdown(data, source);
    if (body) parts.push(body, '');

    const anchored = data.comments ?? [];
    if (anchored.length > 0) {
      parts.push(`## Comments (${anchored.length})`, '');
      for (const thread of anchored) parts.push(commentToMarkdown(thread));
      parts.push('');
    }

    return parts.join('\n').trimEnd() + '\n';
  }

  for (const section of data.sections ?? []) {
    parts.push(sectionToMarkdown(section));
  }

  return parts.join('\n').trimEnd() + '\n';
}

// ---------------------------------------------------------------------------
// Plain-text export
// ---------------------------------------------------------------------------

const STATUS_LABEL: Record<TaskItem['status'], string> = {
  pending: 'PENDING',
  acked: 'ACKED',
  done: 'DONE',
  rejected: 'REJECTED',
};

function taskToPlainText(item: TaskItem): string {
  return `[${STATUS_LABEL[item.status]}] ${item.text}`;
}

function sectionToPlainText(section: Section): string {
  const lines: string[] = [section.title, ''];

  const content =
    ((section as unknown as Record<string, unknown>)['contentMarkdown'] as string | undefined) ??
    ((section as unknown as Record<string, unknown>)['contentText'] as string | undefined);
  if (content) {
    lines.push(content, '');
  }

  const items = Array.isArray(section.items) ? section.items : [];
  if (items.length > 0) {
    for (const item of items) {
      lines.push(taskToPlainText(item));
    }
    lines.push('');
  }

  return lines.join('\n');
}

/**
 * Convert a full document to plain text (no markdown syntax).
 *
 * Same gate as `exportToMarkdown` — see `isPageShapedExport`.
 */
export function exportToPlainText(doc: DocumentData, source?: ExportSource): string {
  const data = doc as ExportableDocument;
  const parts: string[] = [data.meta?.title ?? 'Document', ''];

  if (isPageShapedExport(data, source)) {
    const frag = source?.ydoc ? canvasBody(source.ydoc) : null;
    // The fragment, when there is one, is the better source: it flattens
    // without going through markdown syntax that would then have to be undone.
    const body = frag
      ? canvasBodyToPlainText(frag)
      : stripMarkdown(resolveBodyMarkdown(data, source));
    if (body) parts.push(body, '');
    return parts.join('\n').trimEnd() + '\n';
  }

  for (const section of data.sections ?? []) {
    parts.push(sectionToPlainText(section));
  }

  return parts.join('\n').trimEnd() + '\n';
}

/** Remove the markdown syntax a caller-supplied `bodyMarkdown` already applied. */
function stripMarkdown(md: string): string {
  return md
    .split('\n')
    .map((line) =>
      line
        .replace(/^#{1,6}\s+/, '')
        .replace(/^>\s?/, '')
        .replace(/^(\s*)[-*]\s+\[([ xX])\]\s+/, (_m, indent: string, mark: string) =>
          `${indent}[${mark.toLowerCase() === 'x' ? 'DONE' : 'PENDING'}] `,
        )
        .replace(/^(\s*)[-*]\s+/, '$1')
        .replace(/^(\s*)\d+\.\s+/, '$1')
        .replace(/^```.*$/, ''),
    )
    .join('\n')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

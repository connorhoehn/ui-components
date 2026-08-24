// Phase 51 / hub#71 — Link Block reader renderer (read-only viewer).

import type { SectionRendererProps } from '../types';

interface LinkRow { label: string; url: string }
interface LinksMeta { links?: LinkRow[] }

// `section.metadata` is untyped bag-of-anything that round-trips through the
// CRDT and the server, so an entry can be null or a non-object. Reading
// `l.url` off one of those threw and blanked the whole document; skip them
// and render the links that are well-formed.
function isLinkRow(l: unknown): l is LinkRow {
  return typeof l === 'object' && l !== null && typeof (l as LinkRow).url === 'string';
}

export default function LinkBlockReaderRenderer({ section }: SectionRendererProps) {
  const m = (section.metadata ?? {}) as LinksMeta;
  const links = Array.isArray(m.links) ? m.links.filter((l) => isLinkRow(l) && l.url) : [];

  if (links.length === 0) {
    return (
      <div
        data-testid={`link-block-reader-empty-${section.id}`}
        className="text-text-tertiary text-[13px] italic"
      >
        No links.
      </div>
    );
  }

  return (
    <ul
      data-testid={`link-block-reader-${section.id}`}
      className="list-none m-0 p-0 flex flex-col gap-1"
    >
      {links.map((l, idx) => (
        <li key={idx} className="text-[13px]">
          <a
            href={l.url}
            target="_blank"
            rel="noreferrer noopener"
            className="text-primary font-medium no-underline"
          >
            {l.label || l.url}
          </a>
        </li>
      ))}
    </ul>
  );
}

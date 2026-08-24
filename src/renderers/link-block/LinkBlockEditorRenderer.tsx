// Phase 51 / hub#71 — Link Block editor renderer.
//
// Stores an array of { label, url } pairs in section.metadata.links.
// The editor lets the user add/remove rows, edit label and url inline.

import type { SectionRendererProps } from '../types';

interface LinkRow { label: string; url: string }
interface LinksMeta { links?: LinkRow[] }

// Same defence as the reader: `section.metadata.links` is untyped data off
// the wire, and a null/non-object entry used to throw on `l.label`.
function isLinkRow(l: unknown): l is LinkRow {
  return typeof l === 'object' && l !== null;
}

function readLinks(section: SectionRendererProps['section']): LinkRow[] {
  const m = (section.metadata ?? {}) as LinksMeta;
  if (!Array.isArray(m.links)) return [];
  return m.links.filter(isLinkRow).map((l) => ({
    label: typeof l.label === 'string' ? l.label : '',
    url: typeof l.url === 'string' ? l.url : '',
  }));
}

export default function LinkBlockEditorRenderer({
  section, editable, onUpdateSection,
}: SectionRendererProps) {
  const links = readLinks(section);

  const setLinks = (next: LinkRow[]): void => {
    onUpdateSection?.({
      metadata: { ...(section.metadata ?? {}), links: next },
    });
  };

  const addLink = (): void => setLinks([...links, { label: '', url: '' }]);
  const updateLink = (idx: number, patch: Partial<LinkRow>): void => {
    setLinks(links.map((l, i) => i === idx ? { ...l, ...patch } : l));
  };
  const removeLink = (idx: number): void => {
    setLinks(links.filter((_, i) => i !== idx));
  };

  return (
    <div data-testid={`link-block-editor-${section.id}`} className="flex flex-col gap-1.5">
      {links.length === 0 && (
        <div
          data-testid={`link-block-empty-${section.id}`}
          className="text-text-tertiary text-xs italic py-1"
        >
          No links yet.
        </div>
      )}
      {links.map((l, idx) => (
        <div key={idx} className="flex items-center gap-1.5">
          <input
            type="text"
            data-testid={`link-block-label-${section.id}-${idx}`}
            value={l.label}
            placeholder="Label"
            onChange={(e) => updateLink(idx, { label: e.target.value })}
            disabled={!editable}
            className="flex-1 px-2 py-1 text-[13px] border border-border-emphasis rounded"
          />
          <input
            type="url"
            data-testid={`link-block-url-${section.id}-${idx}`}
            value={l.url}
            placeholder="https://example.com"
            onChange={(e) => updateLink(idx, { url: e.target.value })}
            disabled={!editable}
            className="flex-[2] px-2 py-1 text-[13px] border border-border-emphasis rounded"
          />
          {editable && (
            <button
              type="button"
              data-testid={`link-block-remove-${section.id}-${idx}`}
              onClick={() => removeLink(idx)}
              className="border-none bg-transparent text-danger-fg cursor-pointer text-sm px-1.5 py-0.5"
            >
              ×
            </button>
          )}
        </div>
      ))}
      {editable && (
        <button
          type="button"
          data-testid={`link-block-add-${section.id}`}
          onClick={addLink}
          className="self-start mt-1 px-3 py-1 text-xs bg-transparent border border-dashed border-border-emphasis text-primary rounded-md cursor-pointer"
        >
          + Add link
        </button>
      )}
    </div>
  );
}

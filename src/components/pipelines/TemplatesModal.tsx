import { useEffect, useMemo, useRef, useState } from 'react';
import Modal from '../shared/Modal';
import { cn } from '../../lib/cn';
import { savePipeline } from './persistence/pipelineStorage';
import { useIdentityContext } from '../../contexts/IdentityContext';
import { pipelineTemplates, type PipelineTemplate } from './templates';
import { scaffoldPrerequisites } from './templates/scaffoldPrerequisites';
import type {
  PipelineDefinition,
  PipelineEdge,
  PipelineNode,
} from '../../types/pipeline';

interface TemplatesModalProps {
  open: boolean;
  onClose: () => void;
  /** New API: invoked after the template has been persisted with the new id. */
  onCreated?: (pipelineId: string) => void;
  /** Legacy API: invoked with the raw template; caller is responsible for
   * persistence + navigation. Kept for backwards-compat. */
  onSelect?: (template: PipelineTemplate) => void;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function cloneAndRegenerateIds(def: PipelineDefinition): PipelineDefinition {
  const idMap = new Map<string, string>();
  const nodes: PipelineNode[] = def.nodes.map((n) => {
    const fresh = crypto.randomUUID();
    idMap.set(n.id, fresh);
    return {
      ...n,
      id: fresh,
      data: JSON.parse(JSON.stringify(n.data)) as PipelineNode['data'],
      position: { ...n.position },
    };
  });
  const edges: PipelineEdge[] = def.edges.map((e) => ({
    ...e,
    id: crypto.randomUUID(),
    source: idMap.get(e.source) ?? e.source,
    target: idMap.get(e.target) ?? e.target,
  }));

  const now = new Date().toISOString();
  return {
    ...def,
    id: crypto.randomUUID(),
    name: `${def.name} (copy)`,
    status: 'draft',
    version: 1,
    publishedVersion: undefined,
    publishedSnapshot: undefined,
    nodes,
    edges,
    createdAt: now,
    updatedAt: now,
  };
}

function triggerLabel(def: PipelineDefinition): string {
  const ev = def.triggerBinding?.event ?? 'manual';
  if (ev === 'schedule') return 'Schedule';
  if (ev === 'webhook') return 'Webhook';
  if (ev === 'manual') return 'Manual';
  return ev.startsWith('document.') ? `On ${ev}` : ev;
}

// ---------------------------------------------------------------------------
// Card
// ---------------------------------------------------------------------------

interface TemplateCardProps {
  template: PipelineTemplate;
  meta: { nodeCount: number; trigger: string };
  onPick: (t: PipelineTemplate) => void;
}

function TemplateCard({ template, meta, onPick }: TemplateCardProps) {
  return (
    <div
      data-testid={`template-card-${template.id}`}
      className="flex flex-col gap-2 w-[220px] min-h-[200px] p-3.5 bg-surface border border-border rounded-[10px] font-[inherit]"
    >
      <div className="flex items-center gap-2.5">
        <span className="text-2xl" aria-hidden>{template.icon}</span>
        <div className="text-sm font-bold text-text-primary overflow-hidden text-ellipsis">
          {template.name}
        </div>
      </div>
      <div
        data-testid={`template-meta-${template.id}`}
        className="text-[11px] text-text-tertiary flex gap-2"
      >
        <span>{meta.nodeCount} node{meta.nodeCount === 1 ? '' : 's'}</span>
        <span aria-hidden>·</span>
        <span>{meta.trigger}</span>
      </div>
      <div className="text-xs text-text-secondary leading-[1.4] flex-1">
        {template.description}
      </div>
      {template.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {template.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-[#f1f5f9] text-text-secondary lowercase"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      <button
        type="button"
        data-testid={`template-use-${template.id}`}
        onClick={() => onPick(template)}
        className="mt-auto px-2.5 py-1.5 text-xs font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit]"
      >
        Use this template
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Modal
// ---------------------------------------------------------------------------

export default function TemplatesModal({
  open, onClose, onCreated, onSelect,
}: TemplatesModalProps) {
  const { userId } = useIdentityContext();
  const [search, setSearch] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setSearch('');
      setTimeout(() => searchRef.current?.focus(), 30);
    }
  }, [open]);

  const thumbnails = useMemo(() => {
    const map = new Map<string, { nodeCount: number; trigger: string }>();
    for (const t of pipelineTemplates) {
      const def = t.build(userId || 'anonymous');
      map.set(t.id, { nodeCount: def.nodes.length, trigger: triggerLabel(def) });
    }
    return map;
  }, [userId, open]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return pipelineTemplates;
    return pipelineTemplates.filter((t) =>
      t.name.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.tags.some((tag) => tag.toLowerCase().includes(q)),
    );
  }, [search]);

  const handlePick = (template: PipelineTemplate) => {
    if (onCreated) {
      const fresh = template.build(userId || 'anonymous');
      const def = cloneAndRegenerateIds(fresh);
      savePipeline(def);
      onClose();
      onCreated(def.id);

      if (template.prerequisites) {
        scaffoldPrerequisites(template.prerequisites).then((result) => {
          if (result.errors.length > 0) {
            // eslint-disable-next-line no-console
            console.warn('[TemplatesModal] scaffold errors:', result.errors);
          }
        });
      }
      return;
    }
    if (onSelect) {
      onSelect(template);
    }
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && filtered.length > 0) {
      e.preventDefault();
      handlePick(filtered[0]);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Pipeline templates"
      maxWidth={760}
      backdropTestId="templates-modal"
      rawChildren
    >
      <div className="text-[13px] text-text-secondary mb-3">
        Pick a template to spawn a new pipeline with prebuilt nodes and edges.
      </div>
      <input
        ref={searchRef}
        type="search"
        data-testid="templates-search"
        placeholder="Search templates…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleSearchKeyDown}
        className="w-full px-3 py-2 text-[13px] mb-3.5 border border-border-field rounded-md font-[inherit] bg-[#f9fafb] text-text-primary outline-none"
      />
      {filtered.length === 0 ? (
        <div
          data-testid="templates-empty"
          className="text-center p-8 text-[13px] text-text-tertiary"
        >
          No templates match "{search}".
        </div>
      ) : (
        <div
          data-testid="templates-grid"
          className="grid grid-cols-[repeat(3,220px)] gap-4 justify-center max-h-[60vh] overflow-y-auto p-2"
        >
          {filtered.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              meta={thumbnails.get(template.id) ?? { nodeCount: 0, trigger: '—' }}
              onPick={handlePick}
            />
          ))}
        </div>
      )}
    </Modal>
  );
}

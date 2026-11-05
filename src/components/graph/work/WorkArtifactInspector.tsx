import { useId } from 'react';
import { Tabs, TabPanel } from '../../shared/Tabs';
import { Select } from '../../forms/Select';
import { Button } from '../../ui/Button';
import { IconButton } from '../../ui/IconButton';
import { PREVIEW_FIT } from './WorkActivityNode';
import { cn } from '../../../lib/cn';
import type { WorkActivityNodeDetail, WorkGraphNodeData, WorkGraphSelection } from './types';

/** Which revision and page the selection names, falling back to the newest. */
export function resolveArtifactSelection(
  artifact: NonNullable<WorkActivityNodeDetail['artifact']>,
  selection: Extract<WorkGraphSelection, { kind: 'node' }>,
) {
  const revision = selection.revisionId ? artifact.revisions.find((item) => item.id === selection.revisionId) : artifact.revisions.at(-1);
  const slides = revision?.slides ?? [];
  const slide = slides.find((item) => item.id === selection.anchorId) ?? slides.find((item) => item.id === revision?.anchorId) ?? slides[0];
  return { revision, slides, slide };
}

/**
 * The artifact body of a detail pane: which revisions exist, what the selected
 * one looks like, and which pages it has. A pending attempt is never a
 * revision — it cannot be selected, opened or referenced.
 */
export function WorkArtifactInspector({ node, artifact, selection, onSelectionChange, onOpen, onReference, quiet = false }: {
  node: WorkGraphNodeData;
  artifact: NonNullable<WorkActivityNodeDetail['artifact']>;
  selection: Extract<WorkGraphSelection, { kind: 'node' }>;
  onSelectionChange: (selection: WorkGraphSelection) => void;
  onOpen?: (selection: Exclude<WorkGraphSelection, null>) => void;
  onReference?: (selection: Exclude<WorkGraphSelection, null>) => void;
  /** Suppress the pending-attempt line when the pane's banner already says it. */
  quiet?: boolean;
}) {
  const tabsId = useId();
  const { revision, slides, slide } = resolveArtifactSelection(artifact, selection);
  const position = slide ? slides.indexOf(slide) : -1;
  const target = { ...selection, revisionId: revision?.id, anchorId: slide?.id ?? revision?.anchorId };
  const canOpen = node.capabilities.includes('view-document') || node.capabilities.includes('edit-document');
  const pending = artifact.pending;
  const goTo = (anchorId: string) => onSelectionChange({ kind: 'node', id: node.id, revisionId: revision?.id, anchorId });
  // A generating attempt is shown as a label only; a failed one is not offered
  // at all, because there is nothing behind it to select.
  const items = [
    ...artifact.revisions.map((item) => ({ id: item.id, label: item.label })),
    ...(pending?.status === 'generating' ? [{ id: pending.id, label: `${pending.label} · Generating`, disabled: true }] : []),
  ];
  return (
    <div className="space-y-3">
      {artifact.revisions.length > 0 && (
        <section data-ui-part="" className="space-y-1.5">
          <h3 className="text-[10px] font-semibold uppercase tracking-wide text-text-tertiary">Revisions</h3>
          <Tabs idPrefix={tabsId} aria-label="Available revisions" variant="segmented" size="sm" className="w-full [&>button]:flex-1" items={items} value={revision?.id ?? ''} onValueChange={(revisionId) => { if (revisionId !== pending?.id) onSelectionChange({ kind: 'node', id: node.id, revisionId }); }} />
        </section>
      )}
      {pending?.status === 'generating' && !quiet && <p role="status" className="text-xs text-text-secondary">{pending.label} is generating. You can review available revisions.{pending.message ? ` ${pending.message}` : ''}</p>}
      {pending?.status === 'failed' && !quiet && <p role="status" className="text-xs text-danger-fg">{pending.label} could not be generated.{pending.message ? ` ${pending.message}` : ''}</p>}
      {revision ? (
        <TabPanel idPrefix={tabsId} id={revision.id} when={revision.id} className="space-y-2">
          <div aria-label={`${revision.label} preview`} className={cn('aspect-video overflow-hidden rounded-lg border border-border bg-surface', PREVIEW_FIT)}>
            {slide?.preview ?? revision.preview ?? <span className="flex h-full items-center justify-center text-sm text-text-secondary">Preview unavailable</span>}
          </div>
          {slides.length > 0 && slide && (
            <div className="flex items-center gap-1">
              <IconButton size="sm" aria-label="Previous slide" disabled={position <= 0} onClick={() => goTo(slides[position - 1]!.id)}>‹</IconButton>
              <span className="flex-1 text-center text-xs text-text-secondary">Slide {slide.index} of {slides.length}</span>
              <IconButton size="sm" aria-label="Next slide" disabled={position >= slides.length - 1} onClick={() => goTo(slides[position + 1]!.id)}>›</IconButton>
              <Select size="sm" aria-label="Slide" className="w-32" value={slide.id} options={slides.map((item) => ({ value: item.id, label: `${item.index}. ${item.title}` }))} onChange={(event) => goTo(event.target.value)} />
            </div>
          )}
          {artifact.onOpenPreview && <Button size="sm" variant="secondary" fullWidth onClick={() => artifact.onOpenPreview!(revision.id, slide?.id ?? revision.anchorId)}>Open larger preview</Button>}
          {!slide && <p className="text-xs text-text-secondary">{revision.anchorLabel ?? revision.label}</p>}
        </TabPanel>
      ) : (
        <p className="text-sm text-text-secondary">{selection.revisionId ? 'The selected revision is unavailable.' : 'No revision is available yet.'}</p>
      )}
      <div className="flex flex-wrap gap-2">
        {canOpen && onOpen && revision && <Button size="sm" variant="secondary" onClick={() => onOpen(target)}>Open presentation</Button>}
        {onReference && revision && <Button size="sm" variant="secondary" onClick={() => onReference(target)}>Reference in chat</Button>}
      </div>
    </div>
  );
}

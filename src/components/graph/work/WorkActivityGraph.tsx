import { useEffect, useRef, useState } from 'react';
import { cn } from '../../../lib/cn';
import { ChatSidePanelFrame } from '../../social/ChatSidePanelRegistry';
import { Button } from '../../ui/Button';
import { Select } from '../../forms/Select';
import { WorkActivityCanvas } from './WorkActivityCanvas';
import { WorkArtifactInspector } from './WorkArtifactInspector';
import { WorkEntityList } from './WorkEntityList';
import { WorkInspector } from './WorkInspector';
import { WorkTimeWindow } from './WorkTimeWindow';
import type { WorkActivityPresentation, WorkGraphProps } from './types';

/** The host owns transport, authorization and state continuity. No chat or executor here. */
export function WorkActivityGraph(props: WorkGraphProps & { activity: WorkActivityPresentation }) {
  const { nodes, edges, selection, activity, onSelectionChange } = props;
  const root = useRef<HTMLElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const [list, setList] = useState(false);
  const node = selection?.kind === 'node' ? nodes.find((item) => item.id === selection.id) : undefined;
  const edge = selection?.kind === 'edge' ? edges.find((item) => item.id === selection.id && nodes.some((n) => n.id === item.fromId) && nodes.some((n) => n.id === item.toId)) : undefined;
  const validSelection = !!(node || edge);
  const artifact = node && !node.locked && node.disclosure !== 'existence' ? activity.details?.[node.id]?.artifact : undefined;
  useEffect(() => { if (selection && !validSelection) onSelectionChange(null); }, [selection, validSelection, onSelectionChange]);
  useEffect(() => {
    if (selection && root.current?.contains(document.activeElement) && document.activeElement instanceof HTMLElement && !document.activeElement.closest('[data-testid="activity-inspector"]')) returnFocus.current = document.activeElement;
  }, [selection]);
  const close = () => { onSelectionChange(null); requestAnimationFrame(() => { if (returnFocus.current?.isConnected) returnFocus.current.focus(); }); };
  return <section ref={root} aria-label="Shared work graph" className={cn('flex h-full min-h-0 min-w-0 flex-col bg-surface', props.className)} onKeyDown={(event) => { if (event.key === 'Escape' && selection) { event.stopPropagation(); close(); } }}>
    {props.state === 'partial' && <p role="status" className="border-b border-warning-border bg-warning-bg px-3 py-1 text-xs text-warning-fg">Some work sources are delayed or unavailable.</p>}
    <WorkTimeWindow activity={activity} timezone={props.timezone} />
    <div className="flex shrink-0 items-center gap-2 border-b border-border px-3 py-1 text-xs text-text-secondary">
      <span>{activity.efforts.length} activities</span>
      <Select aria-label="Focus activity" size="sm" value={activity.view.focusedEffortId ?? ''} className="w-auto min-w-0 max-w-[50%]" options={[{ value: '', label: 'All activities' }, ...activity.efforts.map((effort) => ({ value: effort.id, label: effort.title }))]} onChange={(event) => activity.onViewChange({ ...activity.view, focusedEffortId: event.target.value || null, overviewViewport: activity.view.focusedEffortId ? activity.view.overviewViewport : props.viewport })} />
      <span className="ml-auto">Pan or focus to explore</span>
    </div>
    <div className="flex min-h-0 min-w-0 flex-1">
      <WorkActivityCanvas {...props} />
      {validSelection && <ChatSidePanelFrame title={node?.locked ? 'Restricted work item' : node?.title || edge?.label || 'Relationship'} onClose={close} className="w-72 max-w-[65%] shrink-0" data-testid="activity-inspector">
        {node && artifact && selection?.kind === 'node' ? <WorkArtifactInspector node={node} artifact={artifact} selection={selection} onSelectionChange={onSelectionChange} onOpen={props.onOpen} onReference={props.onReference} /> : <WorkInspector {...props} />}
      </ChatSidePanelFrame>}
    </div>
    <div className="shrink-0 border-t border-border px-2 py-1"><Button size="sm" variant="ghost" aria-expanded={list} onClick={() => setList(!list)}>{list ? 'Hide accessible list' : 'View as accessible list'}</Button></div>
    {list && <div className="max-h-60 shrink-0 overflow-auto p-3"><WorkEntityList {...props} /></div>}
  </section>;
}

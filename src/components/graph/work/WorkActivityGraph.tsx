import { useEffect, useRef, useState } from 'react';
import { cn } from '../../../lib/cn';
import { ChatSidePanelFrame } from '../../social/ChatSidePanelRegistry';
import { Button } from '../../ui/Button';
import { WorkActivityCanvas } from './WorkActivityCanvas';
import { limitWorkEfforts, WORK_ACTIVITY_DEFAULT_MAX_EFFORTS } from './effortLayout';
import { WorkActivityHeader } from './WorkActivityHeader';
import { WorkEntityList } from './WorkEntityList';
import { WorkInspector } from './WorkInspector';
import { WorkNodePane } from './WorkNodePane';
import { WorkTimeWindow } from './WorkTimeWindow';
import type { WorkActivityPresentation, WorkGraphProps } from './types';

/** Below this the canvas would drop under ~480px, so the pane lies over it. */
const SPLIT_MINIMUM = 820;

/** The host owns transport, authorization and state continuity. No chat or executor here. */
export function WorkActivityGraph(props: WorkGraphProps & { activity: WorkActivityPresentation }) {
  const { nodes, edges, selection, activity, onSelectionChange, onMaxEffortsChange } = props;
  const root = useRef<HTMLElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const [list, setList] = useState(false);
  const [wide, setWide] = useState(true);
  // Controlled only when the host is listening; otherwise `maxEfforts` is the
  // starting point and the panel owns the value, so the control works for a
  // host that passes neither.
  const [ownCap, setOwnCap] = useState(props.maxEfforts ?? WORK_ACTIVITY_DEFAULT_MAX_EFFORTS);
  const maxEfforts = onMaxEffortsChange ? props.maxEfforts ?? WORK_ACTIVITY_DEFAULT_MAX_EFFORTS : ownCap;
  const changeMaxEfforts = (next: number) => {
    if (!onMaxEffortsChange) { setOwnCap(next); return; }
    onMaxEffortsChange(next);
  };
  const shownEffortCount = limitWorkEfforts(activity.efforts, nodes, { max: maxEfforts }).length;
  const node = selection?.kind === 'node' ? nodes.find((item) => item.id === selection.id) : undefined;
  const edge = selection?.kind === 'edge' ? edges.find((item) => item.id === selection.id && nodes.some((n) => n.id === item.fromId) && nodes.some((n) => n.id === item.toId)) : undefined;
  const validSelection = !!(node || edge);
  const { window: range, bounds, onWindowChange, onEarlier } = activity;
  const placement = activity.detailsPlacement ?? 'auto';
  const overlay = placement === 'overlay' || (placement === 'auto' && !wide);
  useEffect(() => { if (selection && !validSelection) onSelectionChange(null); }, [selection, validSelection, onSelectionChange]);
  useEffect(() => {
    if (selection && root.current?.contains(document.activeElement) && document.activeElement instanceof HTMLElement && !document.activeElement.closest('[data-testid="activity-inspector"]')) returnFocus.current = document.activeElement;
  }, [selection]);
  useEffect(() => {
    const element = body.current;
    if (!element || typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(([entry]) => setWide(entry.contentRect.width >= SPLIT_MINIMUM));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  const close = () => { onSelectionChange(null); requestAnimationFrame(() => { if (returnFocus.current?.isConnected) returnFocus.current.focus(); }); };
  const earlier = () => {
    if (onEarlier) { onEarlier(); return; }
    const duration = Math.max(60_000, range.end - range.start);
    const start = Math.max(bounds.start, range.start - duration);
    onWindowChange({ start, end: start + duration, following: false });
  };
  // The pane is a column of its own: the canvas measures narrower and re-fits
  // once, rather than being covered by something it cannot lay out around.
  const paneClass = overlay ? 'absolute inset-y-0 right-0 z-10 w-[min(340px,85%)] shadow-lg' : 'w-[340px] max-w-[45%] shrink-0';
  return <section ref={root} aria-label="Shared work graph" className={cn('flex h-full min-h-0 min-w-0 flex-col bg-surface', props.className)} onKeyDown={(event) => { if (event.key === 'Escape' && selection) { event.stopPropagation(); close(); } }}>
    {activity.title && <WorkActivityHeader title={activity.title} subtitle={activity.subtitle} expanded={activity.expanded ?? activity.mode === 'full'} onExpand={activity.onExpand} onPopOut={activity.onPopOut} onClose={activity.onClose} effortCount={activity.efforts.length} maxEfforts={maxEfforts} onMaxEffortsChange={changeMaxEfforts} />}
    {props.state === 'partial' && <p role="status" className="border-b border-warning-border bg-warning-bg px-3 py-1 text-xs text-warning-fg">Some work sources are delayed or unavailable.</p>}
    <div ref={body} className="relative flex min-h-0 min-w-0 flex-1">
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <WorkTimeWindow activity={activity} timezone={props.timezone} />
        <WorkActivityCanvas {...props} maxEfforts={maxEfforts} onViewAsList={() => setList(true)} />
        <div className="flex h-9 shrink-0 items-center justify-between gap-2 border-t border-border px-4 text-[10px] text-text-tertiary" data-testid="work-activity-footer">
          {activity.view.focusedEffortId
            ? <Button size="sm" variant="ghost" onClick={() => activity.onViewChange({ ...activity.view, focusedEffortId: null })}>← All activities</Button>
            : <span>{shownEffortCount < activity.efforts.length ? `Showing ${shownEffortCount} of ${activity.efforts.length} parallel activities` : `${activity.efforts.length} parallel activities`} · Newest work first</span>}
          <Button size="sm" variant="ghost" disabled={range.start <= bounds.start} onClick={earlier}>← Earlier work</Button>
        </div>
      </div>
      {placement !== 'none' && validSelection && (node && selection?.kind === 'node'
        ? <WorkNodePane node={node} detail={activity.details?.[node.id]} selection={selection} onSelectionChange={onSelectionChange} onClose={close} onOpen={props.onOpen} onReference={props.onReference} className={paneClass} />
        : <ChatSidePanelFrame title={edge?.label || 'Relationship'} onClose={close} className={paneClass} data-testid="activity-inspector"><WorkInspector {...props} /></ChatSidePanelFrame>)}
    </div>
    <div className="shrink-0 border-t border-border px-2 py-1"><Button size="sm" variant="ghost" aria-expanded={list} onClick={() => setList(!list)}>{list ? 'Hide accessible list' : 'View as accessible list'}</Button></div>
    {list && <div className="max-h-60 shrink-0 overflow-auto p-3"><WorkEntityList {...props} /></div>}
  </section>;
}

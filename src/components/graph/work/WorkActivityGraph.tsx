import { useEffect, useRef, useState } from 'react';
import { cn } from '../../../lib/cn';
import { ChatSidePanelFrame } from '../../social/ChatSidePanelRegistry';
import { Button } from '../../ui/Button';
import { WorkActivityCanvas } from './WorkActivityCanvas';
import { limitWorkEfforts, WORK_ACTIVITY_ALL_EFFORTS, WORK_ACTIVITY_DEFAULT_MAX_EFFORTS, WORK_CANVAS_READABLE_ZOOM } from './effortLayout';
import { WorkActivityHeader } from './WorkActivityHeader';
import { WorkEntityList } from './WorkEntityList';
import { WorkInspector } from './WorkInspector';
import { WorkNodePane } from './WorkNodePane';
import { WorkTimeWindow } from './WorkTimeWindow';
import type { WorkActivityPresentation, WorkEntityListGroup, WorkGraphProps } from './types';

/** Below this the canvas would drop under ~480px, so the pane lies over it. */
const SPLIT_MINIMUM = 820;
/**
 * Below this panel height the accessible list cannot sit under the canvas
 * without squeezing the canvas under its floor (header, time window, a 160 px
 * canvas, the footer, the toggle and a 240 px list). A shorter panel shows the
 * list IN the canvas region instead, so nothing draws over the footer.
 */
const LIST_BELOW_MINIMUM = 720;

/** The host owns transport, authorization and state continuity. No chat or executor here. */
export function WorkActivityGraph(props: WorkGraphProps & { activity: WorkActivityPresentation }) {
  const { nodes, edges, selection, activity, onSelectionChange, onMaxEffortsChange } = props;
  const root = useRef<HTMLElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const [list, setList] = useState(false);
  const [wide, setWide] = useState(true);
  const [short, setShort] = useState(false);
  // The selection whose automatic list the viewer dismissed ("Show the graph").
  const [graphFor, setGraphFor] = useState<string | null>(null);
  // Controlled only when the host is listening; otherwise `maxEfforts` is the
  // starting point and the panel owns the value, so the control works for a
  // host that passes neither.
  const [ownCap, setOwnCap] = useState(props.maxEfforts ?? WORK_ACTIVITY_DEFAULT_MAX_EFFORTS);
  const maxEfforts = onMaxEffortsChange ? props.maxEfforts ?? WORK_ACTIVITY_DEFAULT_MAX_EFFORTS : ownCap;
  const changeMaxEfforts = (next: number) => {
    if (!onMaxEffortsChange) { setOwnCap(next); return; }
    onMaxEffortsChange(next);
  };
  // The list shows what the canvas shows: the same cap, the same kept effort
  // (focused, or holding the selection), the same order — not every item of
  // every activity.
  const selectedNodeId = selection?.kind === 'node' ? selection.id : null;
  const focusedEffortId = activity.view.focusedEffortId ?? null;
  const keepEffortId = focusedEffortId ?? (selectedNodeId ? activity.efforts.find((effort) => effort.nodeIds.includes(selectedNodeId))?.id ?? null : null);
  const shownEfforts = limitWorkEfforts(activity.efforts, nodes, { max: maxEfforts, keepEffortId });
  const shownEffortCount = shownEfforts.length;
  const listEfforts = focusedEffortId ? shownEfforts.filter((effort) => effort.id === focusedEffortId) : shownEfforts;
  const listGroups: WorkEntityListGroup[] | undefined = activity.efforts.length === 0 ? undefined : listEfforts.map((effort) => ({ id: effort.id, title: effort.title, subtitle: effort.subtitle, nodeIds: [...new Set([...effort.nodeIds, ...(effort.contextNodeIds ?? [])])] }));
  if (listGroups && selectedNodeId && nodes.some((item) => item.id === selectedNodeId) && !listGroups.some((group) => group.nodeIds.includes(selectedNodeId))) listGroups.unshift({ id: '__selected', title: 'Selected', nodeIds: [selectedNodeId] });
  const listEdgeIds = listGroups ? new Set(listEfforts.flatMap((effort) => effort.edgeIds)) : null;
  if (listEdgeIds && selection?.kind === 'edge') listEdgeIds.add(selection.id);
  const listEdges = listEdgeIds ? edges.filter((item) => listEdgeIds.has(item.id)) : edges;
  const hiddenEfforts = focusedEffortId ? 0 : activity.efforts.length - shownEffortCount;
  const listFooter = hiddenEfforts > 0
    ? <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border pt-2 text-xs text-text-tertiary" data-testid="work-activity-list-more"><span>Showing {shownEffortCount} of {activity.efforts.length} activities · Newest work first</span><Button size="sm" variant="secondary" onClick={() => changeMaxEfforts(WORK_ACTIVITY_ALL_EFFORTS)}>Show all {activity.efforts.length} activities</Button></div>
    : undefined;
  const entityList = <WorkEntityList {...props} edges={listEdges} groups={listGroups} footer={listFooter} />;
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
  // The section's own height does not depend on where the list goes, so this
  // cannot flip back and forth the way measuring the body would.
  useEffect(() => {
    const element = root.current;
    if (!element || typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(([entry]) => setShort(entry.contentRect.height < LIST_BELOW_MINIMUM));
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
  // A node's pane is open and the fitted graph is too small to read: the list
  // is the only readable view left, so the canvas region shows it — the canvas
  // stays mounted underneath (same size, same fit) and returns when the pane
  // closes. The viewer can still ask for the graph for this selection.
  // Placement 'none' counts too: that host draws the pane itself (Active Now
  // lays it over this canvas), and the canvas under it is just as unreadable.
  const paneOpen = validSelection;
  const selectionKey = selection ? `${selection.kind}:${selection.id}` : null;
  const autoList = paneOpen && props.viewport.zoom < WORK_CANVAS_READABLE_ZOOM && graphFor !== selectionKey;
  const listInRegion = autoList || (list && short);
  const listBelow = list && !listInRegion;
  const listShown = listInRegion || listBelow;
  const toggleList = () => {
    if (!listShown) { setList(true); return; }
    setList(false);
    if (autoList) setGraphFor(selectionKey);
  };
  const paneClass = overlay ? 'absolute inset-y-0 right-0 z-10 w-[min(340px,85%)] shadow-lg' : 'w-[340px] max-w-[45%] shrink-0';
  return <section ref={root} aria-label="Shared work graph" className={cn('flex h-full min-h-0 min-w-0 flex-col bg-surface', props.className)} onKeyDown={(event) => { if (event.key === 'Escape' && selection) { event.stopPropagation(); close(); } }}>
    {activity.title && <WorkActivityHeader title={activity.title} subtitle={activity.subtitle} expanded={activity.expanded ?? activity.mode === 'full'} onExpand={activity.onExpand} onPopOut={activity.onPopOut} onClose={activity.onClose} effortCount={activity.efforts.length} maxEfforts={maxEfforts} onMaxEffortsChange={changeMaxEfforts} />}
    {props.state === 'partial' && <p role="status" className="border-b border-warning-border bg-warning-bg px-3 py-1 text-xs text-warning-fg">Some work sources are delayed or unavailable.</p>}
    <div ref={body} className="relative flex min-h-0 min-w-0 flex-1">
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <WorkTimeWindow activity={activity} timezone={props.timezone} />
        <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden" data-testid="work-activity-region" data-list={listInRegion ? 'region' : undefined}>
          <div className={cn('flex min-h-0 flex-1 flex-col', listInRegion && 'invisible')} aria-hidden={listInRegion || undefined} inert={listInRegion || undefined}>
            <WorkActivityCanvas {...props} maxEfforts={maxEfforts} onViewAsList={() => setList(true)} />
          </div>
          {listInRegion && <div className="absolute inset-0 overflow-auto bg-surface p-3" data-testid="work-activity-list-region">{entityList}</div>}
        </div>
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
    <div className="shrink-0 border-t border-border px-2 py-1"><Button size="sm" variant="ghost" aria-expanded={listShown} onClick={toggleList} data-testid="work-activity-list-toggle">{autoList ? 'Show the graph' : listShown ? 'Hide accessible list' : 'View as accessible list'}</Button></div>
    {listBelow && <div className="max-h-60 min-h-0 shrink-0 overflow-auto border-t border-border p-3" data-testid="work-activity-list-below">{entityList}</div>}
  </section>;
}

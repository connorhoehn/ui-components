import { useEffect, useMemo, useState } from 'react';
import type { WorkGraphEdgeData, WorkGraphNodeData, WorkGraphSelection } from './types';

interface Props {
  day: string;
  timezone: string;
  nodes: WorkGraphNodeData[];
  edges: WorkGraphEdgeData[];
  selection: WorkGraphSelection;
  onSelectionChange: (selection: WorkGraphSelection) => void;
}

interface Activity {
  key: string;
  selection: Exclude<WorkGraphSelection, null>;
  label: string;
  minute: number;
  time: string;
  live: boolean;
}

function localParts(date: Date, timezone: string): { day: string; minute: number; time: string } {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone, year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(date);
  const value = (type: string) => parts.find((part) => part.type === type)?.value ?? '00';
  return {
    day: `${value('year')}-${value('month')}-${value('day')}`,
    minute: Number(value('hour')) * 60 + Number(value('minute')),
    time: `${value('hour')}:${value('minute')}`,
  };
}

function activityFor(
  kind: 'node' | 'edge',
  item: WorkGraphNodeData | WorkGraphEdgeData,
  label: string,
  day: string,
  timezone: string,
): Activity | null {
  const stamp = item.updatedAt || item.startedAt;
  if (!stamp) return null;
  const date = new Date(stamp);
  if (Number.isNaN(date.getTime())) return null;
  const local = localParts(date, timezone);
  if (local.day !== day) return null;
  return {
    key: `${kind}:${item.id}`,
    selection: { kind, id: item.id },
    label,
    minute: local.minute,
    time: local.time,
    live: item.status === 'running' && !item.endedAt,
  };
}

/** Activity derived solely from the viewer-visible graph supplied by the host. */
export function WorkActivityTimeline({ day, timezone, nodes, edges, selection, onSelectionChange }: Props) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const activities = useMemo(() => {
    const labels = new Map(nodes.map((node) => [node.id, node.locked ? 'Restricted work item' : node.title.trim() || 'Untitled work item']));
    return [
      ...nodes.map((node) => activityFor('node', node, labels.get(node.id)!, day, timezone)),
      ...edges.map((edge) => activityFor('edge', edge, `${labels.get(edge.fromId) ?? 'Work item'} → ${labels.get(edge.toId) ?? 'Work item'}`, day, timezone)),
    ].filter((activity): activity is Activity => activity !== null)
      .sort((a, b) => a.minute - b.minute || a.key.localeCompare(b.key));
  }, [day, timezone, nodes, edges]);
  const clusters = new Map<number, Activity[]>();
  for (const activity of activities) {
    const hour = Math.floor(activity.minute / 60);
    const group = clusters.get(hour) ?? [];
    group.push(activity);
    clusters.set(hour, group);
  }
  const localNow = localParts(now, timezone);
  const today = localNow.day === day;

  return (
    <div className="rounded-lg border border-border bg-surface px-4 py-3" aria-label={`Activity on ${day}`} data-testid="work-activity-timeline">
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-text-primary">Activity over the day</h2>
          <p className="text-xs text-text-secondary">Select a time to inspect visible work and its branches.</p>
        </div>
        <span className="shrink-0 text-xs text-text-secondary">{timezone}</span>
      </div>
      <div className="relative h-10 border-b border-border">
        {[0, 6, 12, 18, 24].map((hour) => (
          <span key={hour} aria-hidden="true" className="absolute bottom-0 h-2 border-l border-border" style={{ left: `${hour / 24 * 100}%` }} />
        ))}
        {Array.from(clusters, ([hour, group]) => {
          const selected = group.some((item) => selection?.kind === item.selection.kind && selection.id === item.selection.id);
          const live = group.some((item) => item.live);
          return (
            <button
              key={hour}
              type="button"
              aria-label={`${group.length} visible ${group.length === 1 ? 'item' : 'items'} around ${String(hour).padStart(2, '0')}:00. Select latest.`}
              onClick={() => onSelectionChange(group[group.length - 1].selection)}
              className={`absolute bottom-1 h-6 min-w-6 rounded-full ${selected ? 'bg-primary' : live ? 'bg-success' : 'bg-border-emphasis'}`}
              style={{ left: `${(hour + .5) / 24 * 100}%`, transform: 'translateX(-50%)' }}
            />
          );
        })}
        {today ? (
          <span aria-hidden="true" className="pointer-events-none absolute bottom-0 top-0 border-l-2 border-primary" style={{ left: `${localNow.minute / 1440 * 100}%` }} />
        ) : null}
      </div>
      <div className="mt-1 flex justify-between text-[11px] text-text-secondary" aria-hidden="true">
        <span>12 AM</span><span>6 AM</span><span>12 PM</span><span>6 PM</span><span>12 AM</span>
      </div>
      <p className="mt-2 text-xs text-text-secondary">
        {activities.length === 0 ? 'No visible activity recorded for this day.' : `${activities.length} visible work ${activities.length === 1 ? 'item' : 'items'} across ${clusters.size} ${clusters.size === 1 ? 'hour' : 'hours'}.`}
        {today ? ` Now ${localNow.time}.` : ''}
      </p>
      {activities.length > 0 ? (
        <details className="mt-2 text-xs">
          <summary className="cursor-pointer text-primary">Browse activity</summary>
          <ol className="mt-2 max-h-36 space-y-1 overflow-y-auto">
            {activities.map((activity) => (
              <li key={activity.key}>
                <button
                  type="button"
                  className={`w-full rounded px-2 py-1 text-left hover:bg-surface-hover ${selection?.kind === activity.selection.kind && selection.id === activity.selection.id ? 'font-semibold text-primary' : 'text-text-primary'}`}
                  onClick={() => onSelectionChange(activity.selection)}
                  aria-current={selection?.kind === activity.selection.kind && selection.id === activity.selection.id ? 'true' : undefined}
                >
                  <time>{activity.time}</time> · {activity.label}{activity.live ? ' · active' : ''}
                </button>
              </li>
            ))}
          </ol>
        </details>
      ) : null}
    </div>
  );
}

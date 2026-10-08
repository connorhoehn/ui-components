import type { WorkGraphNodeData, WorkGraphNodeKind } from './types';

/** The glyph each kind of work carries on its card and in the legend. */
export const WORK_NODE_KIND_ICONS: Record<WorkGraphNodeKind, string> = { project: '▱', terminal: '⌘', agent: '✦', run: '▶', document: '▤', change: '⌥', conversation: '◌', meeting: '◉', transcript: '▤', task: '☑' };

/**
 * The accent bar says what KIND of work this is — the one channel that never
 * moves. Status owns the dot and, when something is wrong or in flight, the
 * border. Keeping them apart is why a finished meeting still reads as a
 * meeting. The legend paints from the same map, so the two cannot drift.
 */
export const WORK_NODE_KIND_ACCENT: Record<WorkGraphNodeKind, { bar: string; chip: string }> = {
  meeting: { bar: 'bg-cat-human', chip: 'bg-cat-human/10 text-cat-human' },
  conversation: { bar: 'bg-cat-human', chip: 'bg-cat-human/10 text-cat-human' },
  transcript: { bar: 'bg-cat-sink', chip: 'bg-cat-sink/10 text-cat-sink' },
  terminal: { bar: 'bg-cat-sink', chip: 'bg-cat-sink/10 text-cat-sink' },
  document: { bar: 'bg-cat-source', chip: 'bg-cat-source/10 text-cat-source' },
  project: { bar: 'bg-cat-source', chip: 'bg-cat-source/10 text-cat-source' },
  task: { bar: 'bg-cat-source', chip: 'bg-cat-source/10 text-cat-source' },
  run: { bar: 'bg-cat-ai', chip: 'bg-cat-ai/10 text-cat-ai' },
  agent: { bar: 'bg-cat-ai', chip: 'bg-cat-ai/10 text-cat-ai' },
  change: { bar: 'bg-cat-transform', chip: 'bg-cat-transform/10 text-cat-transform' },
};

/** What a reader calls each kind, in the legend's order (work, then who/where, then output). */
export const WORK_NODE_KIND_LABELS: Record<WorkGraphNodeKind, string> = {
  project: 'Project', task: 'Task', run: 'Run', agent: 'Agent', change: 'Change',
  document: 'Document', conversation: 'Conversation', meeting: 'Meeting', transcript: 'Transcript', terminal: 'Terminal',
};

/** The kinds present in `nodes`, in legend order, each with how many there are. */
export function workNodeKindCounts(nodes: readonly Pick<WorkGraphNodeData, 'kind'>[]): Array<{ kind: WorkGraphNodeKind; count: number }> {
  const counts = new Map<WorkGraphNodeKind, number>();
  for (const node of nodes) counts.set(node.kind, (counts.get(node.kind) ?? 0) + 1);
  return (Object.keys(WORK_NODE_KIND_LABELS) as WorkGraphNodeKind[])
    .filter((kind) => counts.has(kind))
    .map((kind) => ({ kind, count: counts.get(kind)! }));
}

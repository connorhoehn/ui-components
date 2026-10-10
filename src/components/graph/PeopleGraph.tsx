// graph/PeopleGraph.tsx — "who matches this question", as a graph plus a list.
//
// The query sits in the middle; each person hangs off it on an edge labelled
// by the tag that matched, and the people are grouped (coloured, listed in the
// legend) by that same tag. Under the graph — beside it when the container is
// wide — the same people as rows with Message / Open, because a graph is good
// for seeing the shape of an answer and bad for acting on it.

import { useMemo, useState } from 'react';
import { cn } from '../../lib/cn';
import { Avatar } from '../shared/Avatar';
import Chip from '../shared/Chip';
import EmptyState from '../shared/EmptyState';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { NodeGraph, graphGroupPalette } from './NodeGraph';
import { graphGroups } from './layout';
import type { GraphEdge, GraphNode } from './types';
import { DensityProvider } from '../shared/Density';

export interface GraphPerson {
  id: string;
  name: string;
  title?: string;
  avatarUrl?: string;
  tags?: string[];
  /** Relevance to the query; scales the node. */
  score?: number;
}

export interface PeopleGraphProps {
  people: GraphPerson[];
  /** What the people were found for; becomes the centre node. */
  query?: string;
  onOpenPerson?: (id: string) => void;
  onMessagePerson?: (id: string) => void;
  /** Pixel height of the graph area. */
  graphHeight?: number;
  className?: string;
  'data-testid'?: string;
}

export const PEOPLE_GRAPH_QUERY_NODE_ID = '__query__';

/**
 * The tag that explains why this person is here: the first tag the query
 * mentions (or that mentions the query), else the person's first tag.
 */
export function matchingTag(person: GraphPerson, query: string | undefined): string | undefined {
  const tags = person.tags ?? [];
  if (tags.length === 0) return undefined;
  const q = (query ?? '').trim().toLowerCase();
  if (q) {
    const hit = tags.find((t) => {
      const tl = t.toLowerCase();
      return q.includes(tl) || tl.includes(q);
    });
    if (hit) return hit;
  }
  return tags[0];
}

/** The nodes and edges PeopleGraph draws; exported so a host can test or reuse the mapping. */
export function peopleToGraph(people: GraphPerson[], query: string | undefined): { nodes: GraphNode[]; edges: GraphEdge[] } {
  const centre: GraphNode = {
    id: PEOPLE_GRAPH_QUERY_NODE_ID,
    label: query?.trim() || 'Everyone',
    sublabel: `${people.length} ${people.length === 1 ? 'person' : 'people'}`,
    group: 'center',
  };
  const nodes: GraphNode[] = [centre];
  const edges: GraphEdge[] = [];
  for (const p of people) {
    const tag = matchingTag(p, query);
    nodes.push({ id: p.id, label: p.name, sublabel: p.title, group: tag, weight: p.score, avatarUrl: p.avatarUrl });
    edges.push({ from: PEOPLE_GRAPH_QUERY_NODE_ID, to: p.id, label: tag, weight: p.score });
  }
  return { nodes, edges };
}

export function PeopleGraph({
  people, query, onOpenPerson, onMessagePerson, graphHeight = 300, className, 'data-testid': testId = 'people-graph',
}: PeopleGraphProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { nodes, edges } = useMemo(() => peopleToGraph(people, query), [people, query]);
  const groups = useMemo(() => graphGroups(nodes), [nodes]);

  if (people.length === 0) {
    return (
      <DensityProvider density="compact"><EmptyState
        icon="🕸️"
        title="No people found"
        body={query ? `Nothing matched “${query}”.` : 'There is nobody to show yet.'}
        testId={`${testId}-empty`}
        className={className}
      /></DensityProvider>
    );
  }

  return (
    <div className={cn('@container flex min-h-0 flex-col gap-3 p-3', className)} data-testid={testId}>
      <div className="flex min-h-0 flex-col gap-3 @lg:flex-row">
        <NodeGraph
          nodes={nodes}
          edges={edges}
          layout="radial"
          height={graphHeight}
          selectedId={selectedId}
          onSelect={(n) => setSelectedId(n.id === PEOPLE_GRAPH_QUERY_NODE_ID ? null : n.id)}
          className="@lg:flex-1"
          data-testid={`${testId}-graph`}
        />
        <ul className="flex min-w-0 flex-col gap-2 @lg:w-[260px] @lg:shrink-0" aria-label="People" data-testid={`${testId}-list`}>
          {people.map((p) => {
            const tag = matchingTag(p, query);
            const selected = p.id === selectedId;
            return (
              <li key={p.id}>
                <Card
                  padding="none"
                  className={cn('flex cursor-pointer items-center gap-3 p-2', selected && 'ring-2 ring-primary')}
                  onClick={() => setSelectedId(selected ? null : p.id)}
                  data-testid={`${testId}-row-${p.id}`}
                  data-selected={selected || undefined}
                >
                  <span className={cn('h-2 w-2 shrink-0 rounded-full', graphGroupPalette(tag, groups).bg)} aria-hidden />
                  <Avatar name={p.name} src={p.avatarUrl} size={28} />
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate text-[13px] font-medium text-text-primary">{p.name}</span>
                    {p.title && <span className="truncate text-[11px] text-text-tertiary">{p.title}</span>}
                    {tag && <span className="mt-0.5"><Chip size="xs">{tag}</Chip></span>}
                  </span>
                  <span className="flex shrink-0 items-center gap-1">
                    {onMessagePerson && (
                      <Button size="sm" variant="secondary" onClick={(e) => { e.stopPropagation(); onMessagePerson(p.id); }} data-testid={`${testId}-message-${p.id}`}>
                        Message
                      </Button>
                    )}
                    {onOpenPerson && (
                      <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); onOpenPerson(p.id); }} data-testid={`${testId}-open-${p.id}`}>
                        Open
                      </Button>
                    )}
                  </span>
                </Card>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default PeopleGraph;

// graph/graphPanelRenderer.tsx — a ChatSidePanelRenderer for kind `graph`.
//
// The side-panel registry gives a host the FRAME and asks for a BODY per
// kind. This is the body for a graph, ready-made: the host supplies `load`
// (how a ChatSidePanelRef becomes data) and gets loading, error and both
// graph shapes for free:
//
//   <ChatSidePanelProvider renderers={{ graph: createGraphPanelRenderer({ load }) }}>
//
// `load` may answer with raw nodes/edges (drawn by NodeGraph) or with people
// and a query (drawn by PeopleGraph). A `title` in the answer replaces the
// frame's provisional title through `api.setTitle`.

import { useCallback, useEffect, useState, type ReactNode } from 'react';
import type { ChatSidePanelRef } from '../social/chatCommands';
import type { ChatSidePanelApi, ChatSidePanelRenderer } from '../social/ChatSidePanelRegistry';
import { InlineAlert } from '../shared/InlineAlert';
import SkeletonCard from '../shared/SkeletonCard';
import { Spinner } from '../shared/Spinner';
import { Button } from '../ui/Button';
import { NodeGraph } from './NodeGraph';
import { PeopleGraph, type GraphPerson } from './PeopleGraph';
import type { GraphEdge, GraphLayout, GraphNode } from './types';

export interface GraphPanelNodesData {
  title?: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
  layout?: GraphLayout;
}

export interface GraphPanelPeopleData {
  title?: string;
  people: GraphPerson[];
  query?: string;
}

export type GraphPanelData = GraphPanelNodesData | GraphPanelPeopleData;

export function isPeopleGraphData(data: GraphPanelData): data is GraphPanelPeopleData {
  return Array.isArray((data as GraphPanelPeopleData).people);
}

export interface CreateGraphPanelRendererOptions {
  /** Fetches what the panel shows. Called once per panel (kind + id); a throw becomes the error state. */
  load: (panel: ChatSidePanelRef) => Promise<GraphPanelData>;
  onOpenPerson?: (id: string, ctx: { panel: ChatSidePanelRef; api: ChatSidePanelApi }) => void;
  onMessagePerson?: (id: string, ctx: { panel: ChatSidePanelRef; api: ChatSidePanelApi }) => void;
  /** Node picked in a raw nodes/edges graph. */
  onSelectNode?: (node: GraphNode, ctx: { panel: ChatSidePanelRef; api: ChatSidePanelApi }) => void;
  /** Pixel height of the graph area. */
  graphHeight?: number;
  'data-testid'?: string;
}

/** One line for an embedder: `renderers={{ graph: createGraphPanelRenderer({ load }) }}`. */
export function createGraphPanelRenderer(options: CreateGraphPanelRendererOptions): ChatSidePanelRenderer {
  return (panel, api) => <GraphPanelBody panel={panel} api={api} options={options} />;
}

type LoadState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ready'; data: GraphPanelData };

interface GraphPanelBodyProps {
  panel: ChatSidePanelRef;
  api: ChatSidePanelApi;
  options: CreateGraphPanelRendererOptions;
}

export function GraphPanelBody({ panel, api, options }: GraphPanelBodyProps): ReactNode {
  const { load, onOpenPerson, onMessagePerson, onSelectNode, graphHeight = 300, 'data-testid': testId = 'graph-panel' } = options;
  const [state, setState] = useState<LoadState>({ status: 'loading' });
  const [attempt, setAttempt] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setState({ status: 'loading' });
    load(panel).then(
      (data) => {
        if (cancelled) return;
        setState({ status: 'ready', data });
        if (data.title) api.setTitle(data.title);
      },
      (err: unknown) => {
        if (cancelled) return;
        setState({ status: 'error', message: err instanceof Error ? err.message : String(err) });
      },
    );
    return () => { cancelled = true; };
    // The parent keys the body by kind:id, so `panel` identity is the fetch key; `attempt` is the retry.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [panel.kind, panel.id, attempt]);

  const retry = useCallback(() => setAttempt((a) => a + 1), []);
  const ctx = { panel, api };

  if (state.status === 'loading') {
    return (
      <div className="relative flex flex-col gap-3 p-3" data-testid={`${testId}-loading`} aria-busy="true">
        <SkeletonCard height={graphHeight} rounded="lg" />
        <SkeletonCard height={44} />
        <SkeletonCard height={44} />
        <div className="absolute inset-0 flex items-center justify-center">
          <Spinner size="md" aria-label="Loading graph" />
        </div>
      </div>
    );
  }
  if (state.status === 'error') {
    return (
      <div className="flex flex-col gap-2 p-3" data-testid={`${testId}-error`}>
        <InlineAlert tone="error">Could not load this graph: {state.message}</InlineAlert>
        <Button size="sm" variant="secondary" onClick={retry} className="self-start" data-testid={`${testId}-retry`}>Try again</Button>
      </div>
    );
  }
  const { data } = state;
  if (isPeopleGraphData(data)) {
    return (
      <PeopleGraph
        people={data.people}
        query={data.query ?? panel.params?.q ?? panel.params?.query}
        graphHeight={graphHeight}
        onOpenPerson={onOpenPerson ? (id) => onOpenPerson(id, ctx) : undefined}
        onMessagePerson={onMessagePerson ? (id) => onMessagePerson(id, ctx) : undefined}
        data-testid={`${testId}-people`}
      />
    );
  }
  return (
    <div className="p-3" data-testid={`${testId}-nodes`}>
      <NodeGraph
        nodes={data.nodes}
        edges={data.edges}
        layout={data.layout ?? 'force'}
        height={graphHeight}
        selectedId={selectedId}
        onSelect={(node) => { setSelectedId(node.id); onSelectNode?.(node, ctx); }}
        data-testid={`${testId}-graph`}
      />
    </div>
  );
}

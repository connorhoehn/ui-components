// src/integrations/realtime-modules/WrappedWorkGraph.tsx
//
// The work graph wired to a useWorkGraph() return from realtime-modules
// (`client/work-graph`). The hook owns the snapshot/stream handshake; this
// owns the presentation state the components need (selection, viewport) and
// the mapping from the hook's records to the graph components' arrays.
//
// By default it draws the accessible list (`WorkEntityList`) and the
// inspector (`WorkInspector`), which need nothing beyond React. The canvas
// (`WorkGraph`, React Flow) lives in `/graph` and pulls the optional
// `@xyflow/react` peer, so it is injected rather than imported here:
//
//   import { WorkGraph } from '@connorhoehn/ui-components/graph';
//   <WrappedWorkGraph workGraph={useWorkGraph({ scope, transport })} canvas={WorkGraph} />
//
// That keeps `/integrations/realtime-modules` loadable without React Flow.
// The hook's status maps onto the components' `state`: loading/idle →
// `loading`, an error → `error` (with Retry calling the hook's `retry`),
// `partial` → `partial`, ready with no nodes → `empty`.

import { useMemo, useState, type ComponentType } from 'react';
import type { RMUseWorkGraphReturn } from './types';
import type {
  WorkGraphEdgeData,
  WorkGraphNodeData,
  WorkGraphProps,
  WorkGraphSelection,
  WorkGraphSourceState,
  WorkGraphViewport,
  WorkGraphCapability,
} from '../../components/graph/work/types';
import { WorkEntityList } from '../../components/graph/work/WorkEntityList';
import { WorkInspector } from '../../components/graph/work/WorkInspector';
import { Stack } from '../../components/ui/Stack';
import { Button } from '../../components/ui/Button';
import { InlineAlert } from '../../components/shared/InlineAlert';
import LoadingState from '../../components/shared/LoadingState';
import EmptyState from '../../components/shared/EmptyState';

/** What an injected canvas receives: the `/graph` `WorkGraph`'s own props. */
export type WrappedWorkGraphCanvasProps = WorkGraphProps;

export interface WrappedWorkGraphProps {
  /** Return value of `useWorkGraph({ scope, transport })` from realtime-modules. */
  workGraph: RMUseWorkGraphReturn;
  /** The canvas: pass `WorkGraph` from `@connorhoehn/ui-components/graph`. Omitted: the list and the inspector. */
  canvas?: ComponentType<WrappedWorkGraphCanvasProps>;
  /** Controlled selection. Omit to let the component own it. */
  selection?: WorkGraphSelection;
  onSelectionChange?: (selection: WorkGraphSelection) => void;
  onOpen?: (selection: Exclude<WorkGraphSelection, null>) => void;
  onReference?: (selection: Exclude<WorkGraphSelection, null>) => void;
  onRequestCollaboration?: (selection: Exclude<WorkGraphSelection, null>, capability: WorkGraphCapability) => void;
  /** The list's heading. Default "Work". */
  heading?: string;
  /** A status word for a node in place of its raw status. */
  statusLabelOf?: (node: WorkGraphNodeData) => string | undefined;
  className?: string;
  'data-testid'?: string;
}

const ERROR_TEXT: Record<NonNullable<RMUseWorkGraphReturn['error']>, string> = {
  'snapshot-unavailable': 'The work graph could not be loaded.',
  'invalid-snapshot': 'The work graph came back in a shape this page cannot read.',
  'invalid-query': 'This view asked for work it is not allowed to see.',
  'stream-unavailable': 'Live updates are unavailable; the graph may be out of date.',
};

/** The hook's records as the graph components' arrays and state. */
export function adaptWorkGraphState(result: RMUseWorkGraphReturn): {
  nodes: WorkGraphNodeData[];
  edges: WorkGraphEdgeData[];
  sources: WorkGraphSourceState[];
  state: NonNullable<WorkGraphProps['state']>;
  errorMessage?: string;
} {
  const nodes = Object.values(result.graph?.nodes ?? {}).map((n) => ({ ...n }) as WorkGraphNodeData);
  const ids = new Set(nodes.map((n) => n.id));
  // An edge whose end is not in this viewer's graph cannot be drawn or named.
  const edges = Object.values(result.graph?.edges ?? {}).filter((e) => ids.has(e.fromId) && ids.has(e.toId)).map((e) => ({ ...e }) as WorkGraphEdgeData);
  const sources = Object.values(result.graph?.sources ?? {}).map((s) => ({ ...s }) as WorkGraphSourceState);
  const status = result.status;
  const state: NonNullable<WorkGraphProps['state']> =
    status === 'error' || result.error === 'snapshot-unavailable' || result.error === 'invalid-snapshot' || result.error === 'invalid-query' ? 'error'
      : status === 'idle' || status === 'loading' || status === 'invalidated' || status === 'refetch-required' ? 'loading'
        : status === 'partial' || result.error === 'stream-unavailable' ? 'partial'
          : nodes.length === 0 ? 'empty'
            : 'ready';
  return { nodes, edges, sources, state, ...(result.error ? { errorMessage: ERROR_TEXT[result.error] } : {}) };
}

export function WrappedWorkGraph({
  workGraph,
  canvas: Canvas,
  selection: controlled,
  onSelectionChange,
  onOpen,
  onReference,
  onRequestCollaboration,
  heading = 'Work',
  statusLabelOf,
  className,
  'data-testid': testId = 'wrapped-work-graph',
}: WrappedWorkGraphProps) {
  const adapted = useMemo(() => adaptWorkGraphState(workGraph), [workGraph]);
  const [own, setOwn] = useState<WorkGraphSelection>(null);
  const [viewport, setViewport] = useState<WorkGraphViewport>({ x: 0, y: 0, zoom: 1 });
  const selection = controlled !== undefined ? controlled : own;
  const select = (next: WorkGraphSelection) => {
    if (controlled === undefined) setOwn(next);
    onSelectionChange?.(next);
  };
  const retry = () => workGraph.retry();

  if (Canvas) {
    return (
      <div data-wrapped-work-graph="canvas" data-state={adapted.state} data-testid={testId} className={className}>
        <Canvas
          nodes={adapted.nodes}
          edges={adapted.edges}
          sources={adapted.sources}
          state={adapted.state}
          errorMessage={adapted.errorMessage}
          selection={selection}
          viewport={viewport}
          day={workGraph.graph?.scope?.day}
          timezone={workGraph.graph?.scope?.timezone}
          onSelectionChange={select}
          onViewportChange={setViewport}
          onRetry={retry}
          onOpen={onOpen}
          onReference={onReference}
          onRequestCollaboration={onRequestCollaboration}
        />
      </div>
    );
  }

  let body;
  if (adapted.state === 'loading') {
    body = <LoadingState label="Loading work…" testId={`${testId}-loading`} />;
  } else if (adapted.state === 'error') {
    body = (
      <InlineAlert tone="error" data-testid={`${testId}-error`}>
        <Stack gap="sm" align="start">
          <span>{adapted.errorMessage ?? 'The work graph is unavailable.'}</span>
          <Button variant="secondary" size="sm" onClick={retry}>Retry</Button>
        </Stack>
      </InlineAlert>
    );
  } else if (adapted.state === 'empty') {
    body = <EmptyState title="No work yet" description="Work you can see appears here as it starts." />;
  } else {
    const unavailable = adapted.sources.filter((s) => s.health !== 'available');
    body = (
      <Stack gap="lg">
        {adapted.state === 'partial' && (
          <InlineAlert tone="warning" data-testid={`${testId}-partial`}>
            {adapted.errorMessage ?? (unavailable.length
              ? unavailable.map((s) => s.message || `${s.source} is ${s.health}.`).join(' ')
              : 'Some work sources are unavailable or delayed.')}
          </InlineAlert>
        )}
        <WorkInspector
          nodes={adapted.nodes}
          edges={adapted.edges}
          selection={selection}
          onSelectionChange={select}
          onOpen={onOpen}
          onReference={onReference}
          onRequestCollaboration={onRequestCollaboration}
        />
        <WorkEntityList
          nodes={adapted.nodes}
          edges={adapted.edges}
          selection={selection}
          onSelectionChange={select}
          onOpen={onOpen}
          onReference={onReference}
          onRequestCollaboration={onRequestCollaboration}
          heading={heading}
          statusLabelOf={statusLabelOf}
        />
      </Stack>
    );
  }
  return (
    <section aria-label={heading} data-wrapped-work-graph="list" data-state={adapted.state} data-testid={testId} className={className}>
      {body}
    </section>
  );
}

export default WrappedWorkGraph;

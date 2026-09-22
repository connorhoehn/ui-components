// A day with nine parallel efforts fits into one pane at about 0.12 zoom,
// which is a map of the work rather than anything anyone can read. The canvas
// therefore draws the newest two by default and says so, instead of drawing
// all nine illegibly.

import type { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { WorkActivityCanvas } from '../WorkActivityCanvas';
import { WORK_ACTIVITY_ALL_EFFORTS, WORK_ACTIVITY_DEFAULT_MAX_EFFORTS, limitWorkEfforts } from '../effortLayout';
import type {
  WorkActivityPresentation,
  WorkGraphEdgeData,
  WorkGraphNodeData,
  WorkGraphProps,
  WorkGraphSelection,
} from '../types';

interface FlowNode { id: string; type: string }

let captured: FlowNode[] = [];

vi.mock('@xyflow/react', () => ({
  ReactFlow: (props: { nodes: FlowNode[]; children?: ReactNode }) => {
    captured = props.nodes;
    return <div data-testid="react-flow" />;
  },
  Handle: () => null,
  Background: () => null,
  Controls: () => null,
  EdgeLabelRenderer: ({ children }: { children: ReactNode }) => children,
  MarkerType: { ArrowClosed: 'arrow' },
  Position: { Top: 'top', Bottom: 'bottom', Left: 'left', Right: 'right' },
}));
vi.mock('../../../pipelines/canvas/edges/AnimatedEdge', () => ({ default: () => null }));

const now = Date.parse('2026-09-22T12:00:00Z');
const EFFORT_COUNT = 5;

// Deliberately OLDEST first, so keeping the newest two cannot be mistaken for
// keeping the first two the host happened to list.
const scenario = () => {
  const nodes: WorkGraphNodeData[] = [];
  const edges: WorkGraphEdgeData[] = [];
  const efforts = [];
  for (let index = 0; index < EFFORT_COUNT; index++) {
    const updatedAt = new Date(now - (EFFORT_COUNT - index) * 60_000).toISOString();
    nodes.push({ id: `run-${index}`, kind: 'run', title: `Run ${index}`, status: 'running', disclosure: 'details', capabilities: [], updatedAt });
    nodes.push({ id: `doc-${index}`, kind: 'document', title: `Doc ${index}`, status: 'running', disclosure: 'details', capabilities: [], updatedAt });
    edges.push({ id: `edge-${index}`, fromId: `run-${index}`, toId: `doc-${index}`, relation: 'produced', status: 'running', disclosure: 'details', capabilities: [], updatedAt });
    efforts.push({ id: `effort-${index}`, title: `Effort ${index}`, nodeIds: [`run-${index}`, `doc-${index}`], edgeIds: [`edge-${index}`] });
  }
  return { nodes, edges, efforts };
};

function makeProps(selection: WorkGraphSelection = null): WorkGraphProps & { activity: WorkActivityPresentation } {
  const { nodes, edges, efforts } = scenario();
  return {
    nodes,
    edges,
    selection,
    viewport: { x: 0, y: 0, zoom: 1 },
    onSelectionChange: vi.fn(),
    onViewportChange: vi.fn(),
    background: 'plain',
    activity: {
      efforts,
      activeEdgeIds: [],
      mode: 'full',
      window: { start: now - 3_600_000, end: now, following: true },
      bounds: { start: now - 86_400_000, end: now },
      temporalMode: 'recent',
      view: { focusedEffortId: null, expandedSourceEfforts: [], canvasInitialized: true },
      onWindowChange: vi.fn(),
      onViewChange: vi.fn(),
    },
  };
}

/** Frame ids are `["effort", <id>]`; read the effort back out of them. */
const drawnEfforts = () => captured
  .filter((node) => node.type === 'effort')
  .map((node) => (JSON.parse(node.id) as [string, string])[1]);

beforeEach(() => { captured = []; });

describe('WorkActivityCanvas effort cap', () => {
  it('draws the newest two efforts by default, not everything the host has', () => {
    render(<WorkActivityCanvas {...makeProps()} />);
    expect(WORK_ACTIVITY_DEFAULT_MAX_EFFORTS).toBe(2);
    expect(drawnEfforts()).toEqual(['effort-3', 'effort-4']);
  });

  it('honours a larger cap, still newest first and still in source order', () => {
    render(<WorkActivityCanvas {...makeProps()} maxEfforts={3} />);
    expect(drawnEfforts()).toEqual(['effort-2', 'effort-3', 'effort-4']);
  });

  it('draws every effort when the cap is lifted', () => {
    render(<WorkActivityCanvas {...makeProps()} maxEfforts={WORK_ACTIVITY_ALL_EFFORTS} />);
    expect(drawnEfforts()).toHaveLength(EFFORT_COUNT);
  });

  it('treats a non-finite cap as no cap at all', () => {
    render(<WorkActivityCanvas {...makeProps()} maxEfforts={Number.POSITIVE_INFINITY} />);
    expect(drawnEfforts()).toHaveLength(EFFORT_COUNT);
  });

  it('never hides the effort the selection is inside, displacing the oldest shown', () => {
    render(<WorkActivityCanvas {...makeProps({ kind: 'node', id: 'doc-0' })} />);
    // effort-0 is the OLDEST of five, so the cap would normally drop it; it is
    // the one being looked at, so effort-3 — the older of the newest two —
    // gives up its place instead.
    expect(drawnEfforts()).toEqual(['effort-0', 'effort-4']);
  });

  it('keeps a focused effort even when it is not among the newest', () => {
    const props = makeProps();
    props.activity.view = { ...props.activity.view, focusedEffortId: 'effort-1' };
    render(<WorkActivityCanvas {...props} />);
    expect(drawnEfforts()).toEqual(['effort-1']);
  });
});

describe('limitWorkEfforts', () => {
  it('returns the whole list untouched when there is nothing to hide', () => {
    const { nodes, efforts } = scenario();
    expect(limitWorkEfforts(efforts, nodes, { max: EFFORT_COUNT }).map((effort) => effort.id))
      .toEqual(efforts.map((effort) => effort.id));
  });

  it('falls back to source order when no node carries a usable timestamp', () => {
    const { nodes, efforts } = scenario();
    const undated = nodes.map((node) => ({ ...node, updatedAt: 'not a date' }));
    expect(limitWorkEfforts(efforts, undated, { max: 2 }).map((effort) => effort.id))
      .toEqual(['effort-0', 'effort-1']);
  });
});
